(()=>{'use strict';const $=id=>document.getElementById(id);let result=null,row=.25,prediction=null;
const fmt=x=>(1000*x).toFixed(4),text=(x,y,t,extra='')=>`<text x="${x}" y="${y}" fill="#40535c" font-size="17" ${extra}>${t}</text>`;
function color(w,max){const a=Math.min(1,Math.abs(w)/max),base=w<0?[34,102,174]:[180,85,36];return `rgb(${base.map(c=>Math.round(245*(1-a)+c*a)).join(',')})`;}
function map(id,o,max){const n=result.p.n,jSel=Math.round(row*n),W=600,H=150,X=60,Y=28;let s='';
 for(let j=0;j<o.ny;j++)for(let i=0;i<o.nx;i++){const k=j*(o.nx+1)+i,v=(o.w[k]+o.w[k+1]+o.w[k+o.nx+1]+o.w[k+o.nx+2])/4;s+=`<rect x="${X+i*W/o.nx}" y="${Y+H-(j+1)*H/o.ny}" width="${W/o.nx+.2}" height="${H/o.ny+.2}" fill="${color(v,max)}"/>`;}
 for(let i=0;i<=o.nx;i+=n){const x=X+i*W/o.nx;s+=`<path d="M${x},${Y}v${H}" stroke="#1a3b41" stroke-width="3"/>`+text(x,Y+H+30,`${i/n*4} m`,'text-anchor="middle"');}
 const y=Y+H-jSel/n*H;s+=`<path d="M${X},${y}h${W}" stroke="#be317d" stroke-width="2" stroke-dasharray="7 4"/>`;
 s+=text(6,24,'y ↑')+text(10,Y+H,'0')+text(10,Y+10,`${result.p.B}`)+text(610,233,'x →');
 if(result.p.load==='patch'){const x=X+W/(o.nx/n)*.25,width=W/(o.nx/n)*.5;s+=`<rect x="${x}" y="${Y+H/2}" width="${width}" height="${H/2}" fill="none" stroke="#1c1c1c" stroke-width="2" stroke-dasharray="4 3"/>`;}
 $(id).innerHTML=s;
}
function redraw(){if(!result)return;const r=result,n=r.p.n,j=Math.round(row*n);row=j/n;const max=Math.max(...r.full.w.map(Math.abs),...r.simple.w.map(Math.abs),1e-12);
 $('legend').innerHTML=`<div class="bar"></div><div class="labels"><span>${fmt(-max)} mm · 下挠</span><span>0</span><span>+${fmt(max)} mm · 上翘</span></div>`;map('fullMap',r.full,max);map('simpleMap',r.simple,max);
 const at=(o,i)=>o.w[j*(o.nx+1)+i],curves=[{o:r.full,color:'#b45524',name:'连续板'},{o:r.retained,color:'#8752a5',name:'保留接口',dash:true},{o:r.simple,color:'#2266ae',name:'简支板'},{v:r.beam,color:'#23816b',name:'简支梁'}];
 const vals=curves.flatMap(c=>Array.from({length:n+1},(_,i)=>c.v?c.v[i]:at(c.o,i))),lo=Math.min(...vals,0)*1.13,hi=Math.max(...vals,0)+Math.max(Math.abs(lo)*.08,1e-9),py=v=>36+(hi-v)/(hi-lo)*220;
 let s='';for(let k=0;k<=4;k++){const v=hi+(lo-hi)*k/4,y=py(v);s+=`<path d="M92,${y}H866" stroke="#dce4df"/>`+text(82,y+5,(1000*v).toFixed(2),'text-anchor="end"');}
 s+=text(10,22,'w / mm');for(let i=0;i<=4;i++)s+=text(92+i*774/4,286,String(i),'text-anchor="middle"');s+=text(806,310,'x / m');
 for(const c of curves){const path=Array.from({length:n+1},(_,i)=>`${i?'L':'M'}${92+i/n*774},${py(c.v?c.v[i]:at(c.o,i))}`).join(' ');s+=`<path d="${path}" fill="none" stroke="${c.color}" stroke-width="${c.dash?2:3}" ${c.dash?'stroke-dasharray="6 5"':''}/>`;}
 $('profile').innerHTML=s;$('sampleLabel').textContent=`当前截线 y = ${(row*r.p.B).toFixed(3)} m（y/B = ${row.toFixed(3)}）。黑色虚线框为偏置面荷载范围。`;
 const descriptions=['保持两跨整体与转角连续','从整体传入切口转角','去掉邻跨转角约束','全宽合力相同，舍弃横向自由度'];
 $('metrics').innerHTML=curves.map((c,i)=>`<tr><td style="color:${c.color}">${c.name}</td><td>${fmt(c.v?c.v[n/2]:at(c.o,n/2))}</td><td>${descriptions[i]}</td></tr>`).join('');
 const v1=at(r.full,n/2),v2=at(r.simple,n/2),v3=r.beam[n/2];
 $('conclusion').textContent=`保留接口后，左跨节点位移的最大相对复现误差为 ${r.interfaceError.toExponential(2)}。当前取样点改为简支后，下挠绝对值变化 ${((Math.abs(v2)/Math.max(Math.abs(v1),1e-15)-1)*100).toFixed(1)}%；梁与简支板该点位移相差 ${(Math.abs(v3-v2)/Math.max(Math.abs(v2),1e-15)*100).toFixed(1)}%。连续板中支点左侧切口传递的合弯矩幅值约 ${(Math.abs(r.cutMoment)/1000).toFixed(2)} kN·m，简支切口不保留它。这些是当前工况结果，不是通用修正系数。`;
 $('checks').textContent=`本次两跨模型 ${2*n*n} 个 MITC4 单元，${(2*n+1)*(n+1)} 个节点；单跨 ${n*n} 个单元。整体竖向力平衡相对残差 ${r.full.checks.forceRelative.toExponential(2)}，关于 y 轴的力矩平衡相对残差 ${r.full.checks.momentRelative.toExponential(2)}，自由自由度残差比 ${r.full.checks.freeResidualRelative.toExponential(2)}。改变网格时对照同一取样位置，并注意离散截线会取最近节点。`;
 globalThis.plateResult=r;
}
async function run(){const b=$('run');b.disabled=true;$('status').textContent='正在组装并求解，请稍候…';await new Promise(resolve=>setTimeout(resolve,30));try{result=PlateChain.run({B:+$('width').value,nu:+$('nu').value,n:+$('mesh').value,load:$('load').value});redraw();$('status').textContent='计算完成 · 当前显示为静态解';}catch(e){$('status').textContent='计算失败：'+e.message;console.error(e);}finally{b.disabled=false;}}
 $('run').onclick=run;$('reset').onclick=()=>{$('width').value='3';$('nu').value='0.2';$('mesh').value='12';$('load').value='uniform';row=.25;run();};
 for(const id of ['width','nu','mesh','load'])$(id).onchange=()=>{$('status').textContent='参数已改变；图中仍为上次结果，请重新计算。';};
 document.querySelectorAll('[data-y]').forEach(b=>b.onclick=()=>{row=+b.dataset.y;redraw();});
 for(const id of ['fullMap','simpleMap'])$(id).addEventListener('click',e=>{const svg=$(id),pt=svg.createSVGPoint();pt.x=e.clientX;pt.y=e.clientY;const p=pt.matrixTransform(svg.getScreenCTM().inverse());row=Math.max(0,Math.min(1,1-(p.y-28)/150));redraw();});
 $('predictSave').onclick=()=>{if(!$('predict').value){$('prediction').textContent='请先选择预测。';return;}prediction={choice:$('predict').value,reason:$('reason').value};$('prediction').textContent=prediction.choice==='more'?'已记录。默认工况计算支持“增大”；请用转角约束解释原因，并检查其他工况。':'已记录。默认工况下释放邻跨约束会增大左跨中部下挠。请比较曲线后修改解释。';};
 $('checkQuiz').onclick=()=>{$('quizFeedback').textContent=$('quiz').value==='no'?'解释正确。该对称板的响应会随荷载镜像，固定 y 点的局部响应不必相同；梁的积分荷载没有改变。':$('quiz').value==='yes'?'还不成立。总荷载与纵向合力不能唯一确定横向局部响应；切换截线检查差异。':'请先选择解释。';};
 $('export').onclick=()=>{if(!result)return;const payload={kind:'plate-model-transfer',prediction,currentReason:$('reason').value,quiz:$('quiz').value,transfer:$('transfer').value,row,result};const a=document.createElement('a'),url=URL.createObjectURL(new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}));a.href=url;a.download='板梁简化_学习记录.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};run();
})();
