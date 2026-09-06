/* Deterministic classroom example: an equivalent simply supported beam,
   not a full bridge design. SI units; x along the span; w positive upward. */
(function(root){
 const contract={version:'teaching-beam/1',purpose:'先用等效梁核对量级，不作完整桥梁设计',span:{value:20,unit:'m'},width:{value:10.8,unit:'m',role:'geometry only'},E:{value:34,unit:'GPa'},I:{value:.1,unit:'m^4'},P:{value:120,unit:'kN'},supports:'simple',loadPosition:'midspan',selfWeight:'excluded in this stated benchmark',elements:16};
 function solveDraft(fault='none'){
  if(!['none','unit','support','load'].includes(fault))throw Error('Unknown draft');
  const L=contract.span.value,n=contract.elements,le=L/n,E=fault==='unit'?contract.E.value:contract.E.value*1e9,I=contract.I.value,P=contract.P.value*1000,applied=fault==='load'?.8*P:P,nd=2*(n+1),K=Array.from({length:nd},()=>Array(nd).fill(0)),F=Array(nd).fill(0);
  const base=[[12,6*le,-12,6*le],[6*le,4*le*le,-6*le,2*le*le],[-12,-6*le,12,-6*le],[6*le,2*le*le,-6*le,4*le*le]];
  for(let e=0;e<n;e++)for(let a=0;a<4;a++)for(let b=0;b<4;b++)K[2*e+a][2*e+b]+=E*I/le**3*base[a][b];
  F[n]=-applied;const fixed=fault==='support'?[0,1,2*n,2*n+1]:[0,2*n],free=Array.from({length:nd},(_,i)=>i).filter(i=>!fixed.includes(i)),A=free.map(i=>free.map(j=>K[i][j])),C=A.map(r=>r.map(()=>0));
  for(let i=0;i<A.length;i++)for(let j=0;j<=i;j++){let a=A[i][j];for(let k=0;k<j;k++)a-=C[i][k]*C[j][k];if(i===j&&a<=0)throw Error('Stiffness is not positive definite');C[i][j]=i===j?Math.sqrt(a):a/C[j][j];}
  const y=Array(free.length).fill(0),x=Array(free.length).fill(0),u=Array(nd).fill(0);
  for(let i=0;i<free.length;i++){let v=F[free[i]];for(let j=0;j<i;j++)v-=C[i][j]*y[j];y[i]=v/C[i][i];}
  for(let i=free.length-1;i>=0;i--){let v=y[i];for(let j=i+1;j<free.length;j++)v-=C[j][i]*x[j];x[i]=v/C[i][i];}free.forEach((d,i)=>u[d]=x[i]);
  const reactions=K.map((row,i)=>row.reduce((v,k,j)=>v+k*u[j],-F[i])),R=reactions[0]+reactions[2*n],expected=P*L**3/(48*34e9*I),actual=-u[n],relative=Math.abs(actual-expected)/expected;
  const checks=[
   {name:'单位是否与任务书一致',pass:Math.abs(E-34e9)<1,detail:`脚本采用 E=${E.toExponential(3)} Pa；任务书要求 34 GPa = 3.4×10¹⁰ Pa。`},
   {name:'支承是否与任务书一致',pass:fixed.length===2,detail:fixed.length===2?'端部竖向位移受约束，转角放开。':'草稿额外固定了两端转角，已改变问题。'},
   {name:'总荷载是否完整',pass:Math.abs(R-P)/P<1e-8,detail:`支反力合计 ${(R/1000).toFixed(2)} kN；任务书要求 ${(P/1000).toFixed(2)} kN。`},
   {name:'求解器内部是否平衡',pass:Math.abs(R-applied)/applied<1e-8,detail:'用反力合计与实际装入的荷载比较；这一项单独通过，仍可能漏载。'},
   {name:'独立公式是否对得上',pass:relative<1e-7,detail:`当前下沉 ${(actual*1000).toPrecision(5)} mm；任务书的简支梁基准 ${(expected*1000).toFixed(3)} mm。`}
  ];
  const dofs=Array.from({length:nd},(_,index)=>({index,node:Math.floor(index/2),quantity:index%2?'bending_rotation':'vertical_displacement',unit:index%2?'rad':'m',positive:index%2?'dw/dx':'upward'}));
  const reactionComponents=reactions.map((value,dof)=>({dof,node:Math.floor(dof/2),quantity:dof%2?'bending_moment':'vertical_force',unit:dof%2?'N*m':'N',value,constrained:fixed.includes(dof)}));
  return {fault,contract,model:{L,n,E,I,applied,fixed,dofs,dofConvention:'Each node has [upward displacement w, rotation dw/dx]; generalized reactions are the conjugate vertical force and bending moment.',units:{length:'m',force:'N',moment:'N*m',stress:'Pa',rotation:'rad'},nodes:Array.from({length:n+1},(_,i)=>({id:i,x:i*le,y:0,z:0})),elements:Array.from({length:n},(_,i)=>({id:i,type:'Euler-Bernoulli 2D',nodes:[i,i+1]}))},u,reactions,reactionComponents,expected,actual,checks,passed:checks.every(c=>c.pass)};
 }
 root.AIDesignModel={contract,solveDraft};if(typeof module!=='undefined'&&module.exports)module.exports=root.AIDesignModel;
})(typeof window==='undefined'?globalThis:window);
