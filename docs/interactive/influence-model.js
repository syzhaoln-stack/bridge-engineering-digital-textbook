/* Euler–Bernoulli beam, normalized total length L=1 and EI=1.
   Vertical displacement is positive upward. A unit load acts downward.
   eta(x) is the sagging-positive moment at a fixed section due to that load.
   Zone response is composite-midpoint integration of q * eta(x), not an axle model. */
(function(root){
  'use strict';
  function createInfluenceModel(){
    const N=40,h=1/N,nd=2*(N+1),K=Array.from({length:nd},()=>Array(nd).fill(0));
    const ke=[[12,6*h,-12,6*h],[6*h,4*h*h,-6*h,2*h*h],[-12,-6*h,12,-6*h],[6*h,2*h*h,-6*h,4*h*h]];
    for(let e=0;e<N;e++){const d=[2*e,2*e+1,2*e+2,2*e+3];for(let i=0;i<4;i++)for(let j=0;j<4;j++)K[d[i]][d[j]]+=ke[i][j]/h**3;}
    let structure='continuous',target='mid';
    const solvers={},cache=new Map();
    function supports(){return structure==='simple'?[0,N]:[0,N/2,N];}
    function configure(s,t){structure=s;target=s==='simple'?'mid':t;}
    function targetX(){return structure==='simple'?.5:target==='support'?.5:.25;}
    function solver(){
      if(solvers[structure])return solvers[structure];
      const fixed=supports().map(i=>2*i),free=Array.from({length:nd},(_,i)=>i).filter(i=>!fixed.includes(i));
      const A=free.map(i=>free.map(j=>K[i][j])),L=A.map(row=>row.map(()=>0));
      for(let i=0;i<A.length;i++)for(let j=0;j<=i;j++){
        let v=A[i][j];for(let k=0;k<j;k++)v-=L[i][k]*L[j][k];
        if(i===j && v<=0)throw Error('Non-positive stiffness pivot');
        L[i][j]=i===j?Math.sqrt(v):v/L[j][j];
      }
      return solvers[structure]={free,L};
    }
    function point(x){
      x=Math.max(0,Math.min(1,x));const key=structure+'|'+x.toFixed(8);
      if(cache.has(key))return cache.get(key);
      const F=Array(nd).fill(0);let e=Math.min(N-1,Math.floor(x/h)),r=(x-e*h)/h;
      const shapes=[1-3*r*r+2*r*r*r,h*(r-2*r*r+r*r*r),3*r*r-2*r*r*r,h*(-r*r+r*r*r)];
      [2*e,2*e+1,2*e+2,2*e+3].forEach((d,i)=>F[d]-=shapes[i]);
      const {free,L}=solver(),n=free.length,y=Array(n).fill(0),u=Array(n).fill(0),U=Array(nd).fill(0);
      for(let i=0;i<n;i++){let v=F[free[i]];for(let k=0;k<i;k++)v-=L[i][k]*y[k];y[i]=v/L[i][i];}
      for(let i=n-1;i>=0;i--){let v=y[i];for(let k=i+1;k<n;k++)v-=L[k][i]*u[k];u[i]=v/L[i][i];}
      free.forEach((d,i)=>U[d]=u[i]);const R={};
      supports().forEach(si=>{let v=-F[2*si];for(let j=0;j<nd;j++)v+=K[2*si][j]*U[j];R[si/N]=v;});
      cache.set(key,R);return R;
    }
    function eta(x){
      const a=targetX(),R=point(x);let M=0;
      for(const [p,v] of Object.entries(R))if(+p<=a+1e-10)M+=v*(a-p);
      if(x<=a)M-=a-x;
      return Math.abs(M)<1e-10?0:M;
    }
    function zoneResponse(active){return active.reduce((s,on,i)=>s+(on?eta((i+.5)/active.length)/active.length:0),0);}
    function pattern(direction,count=20){return Array.from({length:count},(_,i)=>direction*eta((i+.5)/count)>1e-10);}
    function vehicleOptimum(direction,gap=.08){
      const n=201,sep=Math.ceil(gap*(n-1)),values=Array.from({length:n},(_,i)=>direction*eta(i/(n-1)));
      let dp=values.map((v,i)=>({v,ids:[i]}));
      for(let k=2;k<=3;k++){
        let best=null;const next=Array(n).fill(null);
        for(let i=0;i<n;i++){
          const j=i-sep;if(j>=0 && dp[j] && (!best||dp[j].v>best.v))best=dp[j];
          if(best)next[i]={v:best.v+values[i],ids:[...best.ids,i]};
        }dp=next;
      }
      const best=dp.filter(Boolean).reduce((a,b)=>a.v>b.v?a:b);
      return {value:direction*best.v,positions:best.ids.map(i=>i/(n-1))};
    }
    return {configure,supports,targetX,point,eta,zoneResponse,pattern,vehicleOptimum};
  }
  root.createInfluenceModel=createInfluenceModel;
  if(typeof module!=='undefined'&&module.exports)module.exports={createInfluenceModel};
})(typeof window!=='undefined'?window:globalThis);
