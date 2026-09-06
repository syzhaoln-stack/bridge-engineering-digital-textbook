'use strict';
const model=createInfluenceModel(),$=id=>document.getElementById(id),svg=$('scene'),NS='http://www.w3.org/2000/svg';
const st={structure:'continuous',target:'mid',direction:1,load:'zones',active:Array(20).fill(false),cars:[.18,.46,.78]};
let history=[],saved=null,painting=null,dragging=null,lastCell=null;
const clone=x=>JSON.parse(JSON.stringify(x)),L=80,q=10,P=100,gap=.08;
const fmt=v=>(v>1e-7?'+':'')+(Math.abs(v)<1e-7?0:v).toFixed(2)+' kN·m';
function remember(){history.push(clone(st));if(history.length>30)history.shift();}
function configure(){model.configure(st.structure,st.target);}
function scale(){return st.load==='zones'?q*L*L:P*L;}
function contributions(){
  const vals=st.load==='zones'?st.active.map((on,i)=>on?model.eta((i+.5)/20)/20*scale():0):st.cars.map(x=>model.eta(x)*scale());
  return {plus:vals.filter(v=>v>0).reduce((a,b)=>a+b,0),minus:vals.filter(v=>v<0).reduce((a,b)=>a+b,0),total:vals.reduce((a,b)=>a+b,0)};
}
function optimum(direction=st.direction){if(st.load==='zones')return {value:model.zoneResponse(model.pattern(direction))*scale(),positions:null};const v=model.vehicleOptimum(direction,gap);return {...v,value:v.value*scale()};}
function el(tag,a={},text){const e=document.createElementNS(NS,tag);Object.entries(a).forEach(([k,v])=>e.setAttribute(k,v));if(text!==undefined)e.textContent=text;return e;}
const add=(tag,a,t)=>{const e=el(tag,a,t);svg.append(e);return e;};
function draw(){
  configure();const focus=document.activeElement?.dataset?.cell;svg.replaceChildren();
  const X=x=>75+950*x,Y0=321,pts=Array.from({length:241},(_,i)=>({x:i/240,y:model.eta(i/240)})),max=Math.max(...pts.map(p=>Math.abs(p.y)),1e-9),S=104/max;
  add('text',{x:75,y:30,fill:'#183348','font-size':17},st.load==='zones'?'桥面布载区 · 涂布 / 擦除':'直接拖动三个集中力 · 保持最小间距6.4 m');
  add('line',{x1:75,x2:1025,y1:159,y2:159,stroke:'#536e80','stroke-width':10});
  for(const s of model.supports()){const x=X(s/40);add('path',{d:`M${x} 167l-14 23h28Z`,fill:'#637f90'});add('text',{x,y:210,'text-anchor':'middle',fill:'#54687a','font-size':13},(s/40*L).toFixed(0)+' m');}
  const tx=X(model.targetX());add('line',{x1:tx,x2:tx,y1:55,y2:436,stroke:'#89743e','stroke-dasharray':'5 6'});add('text',{x:tx+8,y:57,fill:'#715a20','font-size':13},'固定观察截面');
  for(let i=0;i<20;i++){
    const eta=model.eta((i+.5)/20),positive=eta>1e-10,negative=eta< -1e-10,color=positive?'#086fa1':negative?'#b44916':'#758897';
    if(st.load==='zones'){
      const on=st.active[i];add('rect',{x:X(i/20)+2,y:95,width:43.5,height:51,rx:3,fill:on?color:'#f2f6f9',stroke:color,'stroke-dasharray':negative?'4 2':'none','stroke-width':on?2:1,role:'button',tabindex:0,'aria-pressed':String(on),'aria-label':`第${i+1}区段 ${i*4}到${(i+1)*4}米，影响线${positive?'正':negative?'负':'零'}号，${on?'已布载':'未布载'}`,'data-cell':i});
      add('text',{x:X((i+.5)/20),y:128,'text-anchor':'middle',fill:on?'white':color,'font-size':20,'pointer-events':'none'},positive?'+':negative?'−':'0');
      if(on)add('path',{d:`M${X((i+.5)/20)} 72v17m-5-6l5 6 5-6`,fill:'none',stroke:color,'stroke-width':2,'pointer-events':'none'});
    }
  }
  if(st.load==='three')st.cars.forEach((x,i)=>{
    const g=add('g',{transform:`translate(${X(x)},101)`,role:'slider',tabindex:0,'aria-label':`集中力${i+1}的位置`,'aria-valuemin':0,'aria-valuemax':80,'aria-valuenow':(x*80).toFixed(1),'data-car':i,style:'cursor:grab'});
    g.append(el('rect',{x:-24,y:-20,width:48,height:66,rx:6,fill:'#e9f3f9',stroke:'#086fa1'}),el('path',{d:'M0 -9v48m-8-10l8 10 8-10',fill:'none',stroke:'#086fa1','stroke-width':4}),el('text',{x:0,y:-27,'text-anchor':'middle','font-size':14,fill:'#086fa1'},`P${i+1}`));
  });
  add('line',{x1:64,x2:1045,y1:Y0,y2:Y0,stroke:'#5c6b76','stroke-width':1.5});
  add('text',{x:47,y:Y0+5,fill:'#54687a','font-size':15},'0');
  add('text',{x:75,y:236,fill:'#086fa1','font-size':15},'＋ 正区（增大目标弯矩）');add('text',{x:75,y:442,fill:'#b44916','font-size':15},'− 负区（减小目标弯矩）');
  for(const sign of [1,-1]){
    const c=sign>0?'#086fa1':'#b44916',coords=pts.map(p=>[X(p.x),Y0-(sign*p.y>0?p.y:0)*S]);
    const area=`M${X(0)},${Y0} `+coords.map(p=>'L'+p.join(',')).join(' ')+` L${X(1)},${Y0}Z`;
    add('path',{d:area,fill:c,'fill-opacity':.13});
    let d='',active=false;for(const p of pts){if(sign*p.y>=0){d+=(active?'L':'M')+X(p.x)+','+(Y0-p.y*S)+' ';active=true;}else active=false;}
    add('path',{d,fill:'none',stroke:c,'stroke-width':3,'stroke-dasharray':sign<0?'7 3':'none'});
  }
  add('text',{x:1025,y:466,'text-anchor':'end',fill:'#54687a','font-size':12},'横坐标＝向下单位力的位置；纵坐标＝固定截面的弯矩影响线（m）');
  for(const p of pts.filter((_,i)=>i%30===0)){if(Math.abs(p.y)<1e-9)continue;add('text',{x:X(p.x),y:Y0-p.y*S+(p.y>0?-8:19),'text-anchor':'middle',fill:p.y>0?'#086fa1':'#b44916','font-size':12},(p.y*L>0?'+':'')+(p.y*L).toFixed(2));}
  const r=contributions(),best=optimum();$('plus').textContent=fmt(r.plus);$('minus').textContent=fmt(r.minus);$('total').textContent=fmt(r.total);$('optimum').textContent=fmt(best.value);
  const observed=st.target==='support'?'中支点':st.structure==='simple'?'跨中':'左跨跨中';
  $('goal').textContent=`固定观察${observed}弯矩，求${st.direction>0?'正向最大值 Mmax':'反向最小值 Mmin'}。${st.direction>0?'正号区加载增大结果，负号区加载抵消结果。':'负号区加载减小结果，正号区加载抵消反向效应。'}`;
  $('explanation').textContent=st.structure==='simple'?'这个截面的影响线全为非负值，没有负号区。可分段均布荷载的最大值对应满布，最小值对应不布载。':st.target==='support'?'中支点弯矩影响线在两跨内均为负。求最小值时两跨满布；可分段均布荷载的最大值为不布载时的0。':'左跨跨中弯矩影响线在左跨为正、右跨为负。求最大值时保留左跨荷载；求最小值时保留右跨荷载。全桥满布会出现正负抵消。';
  $('gesture').textContent=st.load==='zones'?'按住桥面并划过区段，连续涂布或擦除。键盘：Tab定位，空格切换，左右箭头移动。':'直接拖动集中力箭头。键盘：Tab定位，左右箭头每次移动0.4 m；三个力保持至少6.4 m间距。';
  document.querySelectorAll('[data-direction]').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.direction===st.direction)));
  $('target').disabled=st.structure==='simple';$('target').value=st.target;$('structure').value=st.structure;$('load').value=st.load;
  for(const id of ['positive','negative','full','clear'])$(id).disabled=st.load!=='zones';
  $('undo').disabled=!history.length;$('restore').disabled=!saved;
  if(saved){const compatible=['structure','target','load'].every(k=>saved.state[k]===st[k]);$('comparison').textContent=compatible?`方案A ${fmt(saved.value)}；当前方案B ${fmt(r.total)}；B−A ${fmt(r.total-saved.value)}。`:'方案A属于另一模型或观察截面，恢复后可在相同条件下比较。';}
  if(focus!==undefined)svg.querySelector(`[data-cell="${focus}"]`)?.focus({preventScroll:true});
}
function invalidate(){ $('feedback').textContent='布载已改变，请重新验证。'; }
function change(fn){remember();fn();invalidate();draw();}
function position(event){const pt=svg.createSVGPoint();pt.x=event.clientX;pt.y=event.clientY;return pt.matrixTransform(svg.getScreenCTM().inverse());}
function setCar(i,x){const sorted=st.cars.map((p,j)=>({p,j})).sort((a,b)=>a.p-b.p),rank=sorted.findIndex(v=>v.j===i),lo=rank?sorted[rank-1].p+gap:0,hi=rank<2?sorted[rank+1].p-gap:1;st.cars[i]=Math.min(hi,Math.max(lo,x));}
svg.addEventListener('pointerdown',e=>{
  const car=e.target.closest('[data-car]');if(car){remember();dragging=+car.dataset.car;svg.setPointerCapture(e.pointerId);e.preventDefault();return;}
  const cell=e.target.closest('[data-cell]');if(cell){remember();lastCell=+cell.dataset.cell;painting=!st.active[lastCell];st.active[lastCell]=painting;svg.setPointerCapture(e.pointerId);invalidate();draw();e.preventDefault();}
});
svg.addEventListener('pointermove',e=>{if(painting===null&&dragging===null)return;const p=position(e);if(dragging!==null)setCar(dragging,(p.x-75)/950);else if(p.y>65&&p.y<160){const i=Math.max(0,Math.min(19,Math.floor((p.x-75)/950*20)));for(let j=Math.min(i,lastCell);j<=Math.max(i,lastCell);j++)st.active[j]=painting;lastCell=i;}invalidate();draw();});
for(const evt of ['pointerup','pointercancel','lostpointercapture'])svg.addEventListener(evt,()=>{painting=null;dragging=null;lastCell=null;});
svg.addEventListener('keydown',e=>{const cell=e.target.closest('[data-cell]'),car=e.target.closest('[data-car]');if(cell){const i=+cell.dataset.cell;if(e.key===' '||e.key==='Enter'){e.preventDefault();change(()=>st.active[i]=!st.active[i]);}else if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();svg.querySelector(`[data-cell="${Math.max(0,Math.min(19,i+(e.key==='ArrowRight'?1:-1)))}"]`)?.focus();}}else if(car&&['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();const i=+car.dataset.car;change(()=>setCar(i,st.cars[i]+(e.key==='ArrowRight'?.005:-.005)));svg.querySelector(`[data-car="${i}"]`)?.focus();}});
$('structure').onchange=e=>change(()=>{st.structure=e.target.value;if(st.structure==='simple')st.target='mid';});
$('target').onchange=e=>change(()=>st.target=e.target.value);$('load').onchange=e=>change(()=>st.load=e.target.value);
document.querySelectorAll('[data-direction]').forEach(b=>b.onclick=()=>change(()=>st.direction=+b.dataset.direction));
$('positive').onclick=()=>change(()=>st.active=model.pattern(1));$('negative').onclick=()=>change(()=>st.active=model.pattern(-1));
$('full').onclick=()=>change(()=>st.active.fill(true));$('clear').onclick=()=>change(()=>st.active.fill(false));
$('best').onclick=()=>change(()=>{if(st.load==='zones')st.active=model.pattern(st.direction);else st.cars=optimum().positions;});
$('undo').onclick=()=>{if(history.length){Object.assign(st,history.pop());invalidate();draw();}};
$('save').onclick=()=>{saved={state:clone(st),value:contributions().total};draw();};$('restore').onclick=()=>{if(saved)change(()=>Object.assign(st,clone(saved.state)));};
function attempt(){
  const result=contributions(),ref=optimum().value,range=Math.max(Math.abs(optimum(1).value),Math.abs(optimum(-1).value),1e-9),error=Math.abs(result.total-ref)/range;
  return {schema:'bridge-learning-attempt/v1',resource:'continuous-influence-loading',timestamp:new Date().toISOString(),state:clone(st),units:{length:'m',moment:'kN m'},parameters:{L,q,P,minPointGap:gap*L},result,reference:ref,relativeGap:error,passed:error<=.05};
}
$('check').onclick=()=>{const record=attempt();$('feedback').textContent=(record.passed?'已接近目标。':'还可以调整。')+`当前 ${fmt(record.result.total)}，参考 ${fmt(record.reference)}；相对响应尺度差距 ${(record.relativeGap*100).toFixed(1)}%。`+(record.passed?' 请解释保留这些区段的原因。':' 检查是否在抵消目标的区段放了荷载，或遗漏了同号区。');window.dispatchEvent(new CustomEvent('bridge:attempt',{detail:record}));};
$('export').onclick=()=>{const url=URL.createObjectURL(new Blob([JSON.stringify(attempt(),null,2)],{type:'application/json'})),a=document.createElement('a');a.href=url;a.download='影响线布载记录.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
window.influenceLab={state:st,model,contributions,optimum,attempt,setState(p){Object.assign(st,p);draw();}};
draw();
