/** Rigid transverse connection + positive vertical spring stiffnesses.
 * P and R: kN; transverse coordinate: m. a,b are scaled compatibility unknowns,
 * not bridge displacements. No longitudinal response or design distribution m.
 */
export function distribute({count=5,spacing=2.4,carX=0,total=120,edgeRatio=1}={}){
 if(![4,5,6,8].includes(count)||![spacing,carX,total,edgeRatio].every(Number.isFinite)||spacing<=0||total<=0||edgeRatio<=0)throw Error('Invalid transverse input');
 const ys=Array.from({length:count},(_,i)=>(i-(count-1)/2)*spacing),ks=ys.map((_,i)=>i===count-1?edgeRatio:1),A=ks.reduce((a,b)=>a+b,0),B=ks.reduce((s,k,i)=>s+k*ys[i],0),C=ks.reduce((s,k,i)=>s+k*ys[i]**2,0),D=A*C-B*B;
 const a=total*(C-B*carX)/D,b=total*(A*carX-B)/D,R=ks.map((k,i)=>{const r=k*(a+b*ys[i]);return Math.abs(r)<1e-10?0:r;}),eta=R.map(r=>r/total),force=R.reduce((a,b)=>a+b,0),moment=R.reduce((s,r,i)=>s+r*ys[i],0);
 return{ys,ks,R,eta,a,b,total,carX,width:(count-1)*spacing+1.2,checks:{forceResidual:force-total,momentResidual:moment-total*carX},negative:R.map((r,i)=>r< -1e-9?i:null).filter(i=>i!==null)};
}

/** Convert the relative-stiffness solution into an explicit teaching deformation.
 * EI: kN·m²; span: m; k0 = 48 EI / span³: kN/m. Each longitudinal girder is
 * represented by a simply supported beam with its equivalent force R at midspan.
 * Positive w is DOWN. These are displacements of that stated model, not a
 * four-wheel spatial bridge analysis. a,b in distribute remain unchanged.
 * The stiffness center translates by centerSettlement. zeroX instead identifies
 * the point with zero TOTAL vertical displacement; it is not a physical pivot.
 */
export function deformationOf(result,{span=20,EI=3.4e6}={}){
 if(![span,EI].every(Number.isFinite)||span<=0||EI<=0)throw Error('Invalid deformation stiffness or span');
 const {ys,ks,a,b,width}=result;
 if(!Array.isArray(ys)||!Array.isArray(ks)||ys.length!==ks.length||ys.length<2||!ys.every(Number.isFinite)||!ks.every(k=>Number.isFinite(k)&&k>0)||![a,b,width].every(Number.isFinite)||width<=0)throw Error('Invalid transverse result');
 const k0=48*EI/span**3,A=ks.reduce((sum,k)=>sum+k,0);
 const stiffnessCenter=ks.reduce((sum,k,i)=>sum+k*ys[i],0)/A;
 const u0=a/k0,theta=b/k0,w=ys.map(y=>u0+theta*y);
 const centerSettlement=u0+theta*stiffnessCenter;
 // A zero slope is pure translation. Avoid a meaningless far-away axis caused
 // by floating-point cancellation when a load is at the stiffness center.
 const zeroX=Math.abs(theta)<=1e-14?null:-u0/theta;
 const insideDeck=zeroX!==null&&Math.abs(zeroX)<=width/2+1e-10;
 return{k0,w,u0,theta,stiffnessCenter,centerSettlement,zeroX,insideDeck,span,EI};
}

/** Normalized simply supported beam shape for an equivalent midspan point load.
 * z is measured from midspan in metres. At supports z=±span/2 the value is 0;
 * at midspan it is 1. Outside the span the shape is held at 0 for scene geometry.
 */
export function spanShape(z,span=20){
 if(![z,span].every(Number.isFinite)||span<=0)throw Error('Invalid span coordinate');
 const t=Math.max(0,span/2-Math.abs(z));
 return t*(3*span**2-4*t**2)/span**3;
}
