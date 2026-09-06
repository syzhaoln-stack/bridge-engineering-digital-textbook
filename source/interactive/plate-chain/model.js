/* SI units. Flat MITC4 plate; in-plane and drilling DOFs suppressed only because
   this linear flat transverse-load problem is uncoupled. No cracking or curvature. */
(()=>{'use strict';
const S=globalThis.PlateShell;
function model(p,spans){
  const {n,L,B,E,nu,t}=p,ny=n,nx=spans*n,nodes=[],elements=[],supports=[];
  const id=(i,j)=>j*(nx+1)+i;
  for(let j=0;j<=ny;j++)for(let i=0;i<=nx;i++){
    nodes.push({x:i*L/n,y:j*B/ny,z:0});
    supports.push({node:id(i,j),ux:true,uy:true,rz:true,uz:i%n===0||(p.edgeSupport==='simple'&&(j===0||j===ny))});
  }
  for(let j=0;j<ny;j++)for(let i=0;i<nx;i++)elements.push({id:elements.length,type:'shell4',group:'plate',nodes:[id(i,j),id(i+1,j),id(i+1,j+1),id(i,j+1)]});
  const m={nodes,elements,supports,properties:{plate:{E,nu,t}}},a=S.assembleShellModel(m),F=new Float64Array(a.ndof);
  for(const e of a.elementData){
    const x=e.nodes.reduce((v,k)=>v+k.x,0)/4,y=e.nodes.reduce((v,k)=>v+k.y,0)/4;
    if(p.load==='wheels'){
      const ex0=e.nodes[0].x,ex1=e.nodes[1].x,ey0=e.nodes[0].y,ey1=e.nodes[3].y;
      for(const wheel of wheels(p)){
        const a=Math.max(ex0,wheel.x-.175),b=Math.min(ex1,wheel.x+.175),c=Math.max(ey0,wheel.y-.125),d=Math.min(ey1,wheel.y+.125);
        if(b<=a||d<=c)continue;
        // Integrate the actual rectangular contact overlap using 2x2 Gauss quadrature.
        for(const gx of [-1/Math.sqrt(3),1/Math.sqrt(3)])for(const gy of [-1/Math.sqrt(3),1/Math.sqrt(3)]){
          const point=[(a+b)/2+gx*(b-a)/2,(c+d)/2+gy*(d-c)/2,0],force=-wheel.force/(.35*.25)*(b-a)*(d-c)/4;
          const f=S.shell4PointLoad(e.nodes,point,[0,0,force]).load;e.dofs.forEach((dof,k)=>F[dof]+=f[k]);
        }
      }
      continue;
    }
    const x0=p.patchX*L,y0=p.patchY*B;
    const pressure=p.load==='uniform'?p.p:(x>x0&&x<x0+L/2&&y>y0&&y<y0+B/2?4*p.p:0);
    const f=S.shell4PressureLoad(e.nodes,-pressure);
    e.dofs.forEach((d,k)=>F[d]+=f[k]);
  }
  return {m,a,F,nx,ny,id,fixed:S.constrainedDofs(supports)};
}
function solve(o,values=new Map()){
  const fixed=[...new Set([...o.fixed,...values.keys()])],rhs=o.F.slice();
  for(let i=0;i<rhs.length;i++)for(const [d,v] of values)rhs[i]-=o.a.K[i][d]*v;
  const U=S.solveFactoredSystem(S.factorConstrainedSystem(o.a.K,fixed),rhs);
  for(const [d,v] of values)U[d]=v;
  const R=o.F.map((v,i)=>o.a.K[i].reduce((sum,k,j)=>sum+k*U[j],-v));
  const fixedSet=new Set(fixed); let freeResidual=0,total=0,reaction=0,momentLoad=0,momentReaction=0,zeroError=0;
  for(let i=0;i<U.length;i++){
    if(!fixedSet.has(i))freeResidual=Math.max(freeResidual,Math.abs(R[i]));
    else zeroError=Math.max(zeroError,Math.abs(U[i]-(values.get(i)||0)));
    if(i%6===2){total+=o.F[i];reaction+=R[i];momentLoad+=o.m.nodes[(i-2)/6].x*o.F[i];momentReaction+=o.m.nodes[(i-2)/6].x*R[i];}
    if(i%6===4){momentLoad-=o.F[i];momentReaction-=R[i];}
  }
  return {...o,U,R,checks:{appliedForce:total,appliedFirstMomentX:momentLoad,forceRelative:Math.abs(total+reaction)/Math.max(1,Math.abs(total)),momentRelative:Math.abs(momentLoad+momentReaction)/Math.max(1,Math.abs(momentLoad)),freeResidualRelative:freeResidual/Math.max(1,Math.abs(total)),prescribedError:zeroError}};
}
function beam(p){
  const {n,L,B,E,t}=p,h=L/n,EI=E*B*t**3/12,K=S.zeros(2*(n+1)),F=new Float64Array(2*(n+1));
  for(let i=0;i<n;i++){
    const k=[[12,6*h,-12,6*h],[6*h,4*h*h,-6*h,2*h*h],[-12,-6*h,12,-6*h],[6*h,2*h*h,-6*h,4*h*h]],x=(i+.5)*h;
    const q=p.load==='uniform'?p.p*B:(x>p.patchX*L&&x<(p.patchX+.5)*L?2*p.p*B:0),f=p.load==='wheels'?[0,0,0,0]:[-q*h/2,-q*h*h/12,-q*h/2,q*h*h/12];
    if(p.load==='wheels')for(const wheel of wheels(p)){
      const a=Math.max(i*h,wheel.x-.175),b=Math.min((i+1)*h,wheel.x+.175);if(b<=a)continue;
      for(const [g,weight] of [[-Math.sqrt(3/5),5/9],[0,8/9],[Math.sqrt(3/5),5/9]]){
        const xx=(a+b)/2+g*(b-a)/2,r=(xx-i*h)/h,N=[1-3*r*r+2*r*r*r,h*(r-2*r*r+r*r*r),3*r*r-2*r*r*r,h*(-r*r+r*r*r)];
        for(let k=0;k<4;k++)f[k]-=N[k]*wheel.force/.35*(b-a)/2*weight;
      }
    }
    for(let a=0;a<4;a++){F[2*i+a]+=f[a];for(let b=0;b<4;b++)K[2*i+a][2*i+b]+=EI/h**3*k[a][b];}
  }
  const U=S.solveFactoredSystem(S.factorConstrainedSystem(K,[0,2*n]),F);
  return Array.from({length:n+1},(_,i)=>U[2*i]);
}
function wheels(p){return [-(p.track??1.4)/2,(p.track??1.4)/2].flatMap(dx=>[-(p.axle??1.5)/2,(p.axle??1.5)/2].map(dy=>({x:p.carX+dx,y:(p.carY??p.B/2)+dy,force:p.wheelForce})));}
function run(options={}){
  const p={L:4,B:3,t:.16,E:30e9,nu:.2,p:10000,n:8,load:'uniform',patchX:.25,patchY:0,carX:2,wheelForce:30000,edgeSupport:'free',...options};
  if(![4,8,12,16].includes(p.n)||p.B<=0||p.E<=0||p.t<=0||p.nu<0||p.nu>=.5)throw Error('Invalid plate parameters');
  const full=solve(model(p,2)),single=model(p,1),values=new Map();
  // Transfer the solved cut-edge rotations. w is already zero at the support line.
  for(let j=0;j<=p.n;j++)for(const d of [3,4])values.set(6*single.id(p.n,j)+d,full.U[6*full.id(p.n,j)+d]);
  const retained=solve(single,values),simple=solve(single),bw=beam(p);
  let wError=0,wMax=0,rotationError=0,cutMoment=0;
  for(let j=0;j<=p.n;j++)for(let i=0;i<=p.n;i++){
    const a=6*single.id(i,j),b=6*full.id(i,j);
    wError=Math.max(wError,Math.abs(retained.U[a+2]-full.U[b+2]));wMax=Math.max(wMax,Math.abs(full.U[b+2]));
    for(const d of [3,4])rotationError=Math.max(rotationError,Math.abs(retained.U[a+d]-full.U[b+d]));
  }
  for(let j=0;j<=p.n;j++)cutMoment+=retained.R[6*single.id(p.n,j)+4];
  function compact(o){const girder=Array(o.nx/p.n+1).fill(0),diaphragm=[0,0];for(let j=0;j<=o.ny;j++)for(let i=0;i<=o.nx;i++){const force=o.R[6*o.id(i,j)+2];if(i%p.n===0)girder[i/p.n]+=force;else if(p.edgeSupport==='simple'&&(j===0||j===o.ny))diaphragm[j===0?0:1]+=force;}return {reactions:{girder,diaphragm},nx:o.nx,ny:o.ny,w:o.m.nodes.map((_,i)=>o.U[6*i+2]),checks:o.checks};}
  return {p,full:compact(full),retained:compact(retained),simple:compact(simple),beam:bw,cutMoment,interfaceError:wError/Math.max(wMax,1e-15),interfaceRotationError:rotationError,wheels:p.load==='wheels'?wheels(p):[]};
}
globalThis.PlateChain={run,beam};
})();
