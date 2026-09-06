
import * as THREE from '../../interactive/vendor/three.module.js';
import { OrbitControls } from '../../interactive/vendor/controls/OrbitControls.js';

const $ = id => document.getElementById(id);
const NS = 'http://www.w3.org/2000/svg';
const GAMMA = 25;       // concrete teaching density, kN/m³
const ELASTIC_E = 34e9; // Pa, comparison only
const state = {
  type:'box', mode:'explore', viewTarget:'section', target:null, records:[],
  values:{span:32,liveLoad:70,cut:50,split:1.2}
};

const VIEW_TARGETS = {
  plan:{name:'平面',plane:'x–y',axis:'z',desired:new THREE.Vector3(0,1,0)},
  elevation:{name:'立面',plane:'x–z',axis:'y',desired:new THREE.Vector3(0,0,-1)},
  section:{name:'横断面',plane:'y–z',axis:'x',desired:new THREE.Vector3(1,0,0)}
};

const TYPES = {
  solid:{
    name:'实心矩形',note:'外包矩形是其余截面的共同基准。',
    defaults:{B:3.0,H:1.8},
    fields:[['B','截面宽度 B',1.0,12,0.1,'m'],['H','截面高度 H',0.5,3.8,0.05,'m']]
  },
  box:{
    name:'单箱单室',note:'材料被推向顶板、底板和两片腹板；空腔靠近形心轴。',
    defaults:{B:9.6,H:2.4,tw:0.38,tt:0.28,tb:0.24},
    fields:[['B','箱梁总宽 B',4,14,0.1,'m'],['H','箱梁总高 H',1.2,3.8,0.05,'m'],['tw','腹板厚 tw',0.18,0.9,0.01,'m'],['tt','顶板厚 tt',0.16,0.7,0.01,'m'],['tb','底板厚 tb',0.16,0.7,0.01,'m']]
  },
  tee:{
    name:'T 梁',note:'翼缘远离形心轴，腹板把上下材料连成共同工作的截面。',
    defaults:{B:2.5,H:1.9,tw:0.28,tf:0.22},
    fields:[['B','翼缘宽度 B',1.2,4.0,0.05,'m'],['H','梁高 H',0.8,3.0,0.05,'m'],['tw','腹板厚 tw',0.16,0.7,0.01,'m'],['tf','翼缘厚 tf',0.14,0.5,0.01,'m']]
  },
  hollow:{
    name:'空心板',note:'多个纵向孔洞减少自重；孔径、孔数与净距必须同时受约束。',
    defaults:{B:1.25,H:0.62,n:4,d:0.20},
    fields:[['B','板宽 B',0.8,2.4,0.05,'m'],['H','板高 H',0.35,1.2,0.01,'m'],['n','孔洞数量 n',2,6,1,''],['d','孔洞直径 d',0.08,0.45,0.01,'m']]
  }
};

const TARGETS = {
  solid:{B:3.4,H:1.65},
  box:{B:10.2,H:2.55,tw:0.34,tt:0.27,tb:0.22},
  tee:{B:2.8,H:2.05,tw:0.24,tf:0.24},
  hollow:{B:1.40,H:0.68,n:4,d:0.23}
};

// Range inputs fall back to browser-chosen midpoint values when `value` is
// undefined, so seed the active section before building either model or UI.
Object.assign(state.values,TYPES[state.type].defaults);

function V(mx,my,mz){ return new THREE.Vector3(mx,mz,-my); }
function clamp(v,a,b){ return Math.max(a,Math.min(b,v)); }
function pct(v){ return `${Math.round(v*100)}%`; }
function number(v,d=2){ return Number.isFinite(v)?v.toFixed(d):'—'; }

function sanitize(){
  const p=state.values;
  if(state.type==='box'){
    p.tw=clamp(p.tw,.12,p.B/2-.12);
    const maxSlab=Math.max(.12,p.H-.18);
    p.tt=clamp(p.tt,.1,maxSlab);
    p.tb=clamp(p.tb,.1,Math.max(.1,p.H-p.tt-.15));
  }
  if(state.type==='tee'){
    p.tw=clamp(p.tw,.1,p.B-.1); p.tf=clamp(p.tf,.1,p.H-.1);
  }
  if(state.type==='hollow'){
    p.n=Math.round(p.n);
    const maxDByHeight=p.H-.14;
    const maxDByWidth=(p.B-.14)/(p.n+.18);
    p.d=clamp(p.d,.05,Math.max(.05,Math.min(maxDByHeight,maxDByWidth)));
  }
}

function rectRing(B,H){ return [[-B/2,-H/2],[B/2,-H/2],[B/2,H/2],[-B/2,H/2]]; }
function circleRing(cy,cz,r,n=64){
  return Array.from({length:n},(_,i)=>{const a=2*Math.PI*i/n;return[cy+r*Math.cos(a),cz+r*Math.sin(a)]});
}
function sectionDefinition(values=state.values,type=state.type){
  const p=values, outer=rectRing(p.B,p.H), holes=[];
  if(type==='solid') return {outer,holes,B:p.B,H:p.H};
  if(type==='box'){
    const wi=Math.max(.08,p.B-2*p.tw), hi=Math.max(.08,p.H-p.tt-p.tb);
    const zc=(p.tb-p.tt)/2;
    holes.push(rectRing(wi,hi).map(([y,z])=>[y,z+zc]));
    return {outer,holes,B:p.B,H:p.H};
  }
  if(type==='tee'){
    const zTop=p.H/2, zFlange=zTop-p.tf, zBottom=-p.H/2;
    return {outer:[[-p.tw/2,zBottom],[p.tw/2,zBottom],[p.tw/2,zFlange],[p.B/2,zFlange],[p.B/2,zTop],[-p.B/2,zTop],[-p.B/2,zFlange],[-p.tw/2,zFlange]],holes:[],B:p.B,H:p.H};
  }
  const edge=.07+p.d/2;
  const usable=Math.max(0,p.B-2*edge);
  for(let i=0;i<p.n;i++){
    const y=p.n===1?0:-usable/2+usable*i/(p.n-1);
    holes.push(circleRing(y,0,p.d/2));
  }
  return {outer,holes,B:p.B,H:p.H};
}

function ringProperties(points){
  let twiceA=0,cyN=0,czN=0,iyN=0;
  for(let i=0;i<points.length;i++){
    const [y0,z0]=points[i],[y1,z1]=points[(i+1)%points.length];
    const c=y0*z1-y1*z0;
    twiceA+=c; cyN+=(y0+y1)*c; czN+=(z0+z1)*c;
    iyN+=(z0*z0+z0*z1+z1*z1)*c;
  }
  const signedA=twiceA/2;
  const sign=Math.sign(signedA)||1;
  const A=Math.abs(signedA);
  return {A,cy:cyN/(6*signedA),cz:czN/(6*signedA),Iy0:Math.abs(iyN/12)*sign/sign};
}
function sectionProperties(def){
  const outer=ringProperties(def.outer), holes=def.holes.map(ringProperties);
  const A=outer.A-holes.reduce((s,h)=>s+h.A,0);
  const cy=(outer.A*outer.cy-holes.reduce((s,h)=>s+h.A*h.cy,0))/A;
  const cz=(outer.A*outer.cz-holes.reduce((s,h)=>s+h.A*h.cz,0))/A;
  const Iy0=outer.Iy0-holes.reduce((s,h)=>s+h.Iy0,0);
  const Iy=Iy0-A*cz*cz;
  const zTop=Math.max(...def.outer.map(p=>p[1])),zBottom=Math.min(...def.outer.map(p=>p[1]));
  const Wtop=Iy/Math.max(1e-9,zTop-cz),Wbottom=Iy/Math.max(1e-9,cz-zBottom);
  return {A,cy,cz,Iy,W:Math.min(Wtop,Wbottom),zTop,zBottom};
}

function makeThreeShape(def){
  const shape=new THREE.Shape();
  def.outer.forEach(([y,z],i)=>i?shape.lineTo(y,z):shape.moveTo(y,z)); shape.closePath();
  def.holes.forEach(ring=>{
    const path=new THREE.Path();
    ring.slice().reverse().forEach(([y,z],i)=>i?path.lineTo(y,z):path.moveTo(y,z)); path.closePath();
    shape.holes.push(path);
  });
  return shape;
}

const viewport=$('viewport');
const scene=new THREE.Scene(); scene.background=new THREE.Color(0xf5f8f7);
const camera=new THREE.PerspectiveCamera(35,1,.05,300);
const renderer=new THREE.WebGLRenderer({antialias:true});
renderer.setPixelRatio(Math.min(devicePixelRatio||1,2)); renderer.outputColorSpace=THREE.SRGBColorSpace;
renderer.shadowMap.enabled=true; renderer.shadowMap.type=THREE.PCFSoftShadowMap; viewport.prepend(renderer.domElement);
const controls=new OrbitControls(camera,renderer.domElement); controls.enableDamping=true; controls.dampingFactor=.08;
scene.add(new THREE.HemisphereLight(0xffffff,0x9eabb0,1.35));
const key=new THREE.DirectionalLight(0xffffff,1.35);key.position.set(10,14,-9);key.castShadow=true;key.shadow.mapSize.set(2048,2048);scene.add(key);
const rim=new THREE.DirectionalLight(0x8fcfd2,.6);rim.position.set(-12,7,10);scene.add(rim);
const modelGroup=new THREE.Group();scene.add(modelGroup);
const grid=new THREE.GridHelper(60,30,0x9fb0b5,0xd4dfe1);grid.material.transparent=true;grid.material.opacity=.42;scene.add(grid);
const axisMat={x:0xb34e45,y:0x2e756a,z:0x275f75};
function axisLine(from,to,color){const g=new THREE.BufferGeometry().setFromPoints([from,to]);scene.add(new THREE.Line(g,new THREE.LineBasicMaterial({color})));}
axisLine(V(0,0,0),V(4,0,0),axisMat.x);axisLine(V(0,0,0),V(0,4,0),axisMat.y);axisLine(V(0,0,0),V(0,0,3),axisMat.z);

function clearGroup(group){
  while(group.children.length){const c=group.children[0];group.remove(c);c.traverse?.(o=>{o.geometry?.dispose();if(o.material){(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>m.dispose())}})}
}
function transformExtrusion(geometry,length,centerX){
  const pos=geometry.attributes.position;
  for(let i=0;i<pos.count;i++){
    const y=pos.getX(i),z=pos.getY(i),x=centerX+pos.getZ(i)-length/2;
    const v=V(x,y,z); pos.setXYZ(i,v.x,v.y,v.z);
  }
  pos.needsUpdate=true;geometry.computeVertexNormals();geometry.computeBoundingBox();geometry.computeBoundingSphere();return geometry;
}
function transformFace(geometry,x){
  const pos=geometry.attributes.position;
  for(let i=0;i<pos.count;i++){const v=V(x,pos.getX(i),pos.getY(i));pos.setXYZ(i,v.x,v.y,v.z)}
  pos.needsUpdate=true;geometry.computeVertexNormals();return geometry;
}
function addSegment(def,length,centerX){
  if(length<.03)return;
  const geo=transformExtrusion(new THREE.ExtrudeGeometry(makeThreeShape(def),{depth:length,bevelEnabled:false,curveSegments:48,steps:1}),length,centerX);
  const mat=new THREE.MeshStandardMaterial({color:0xc9bdac,roughness:.78,metalness:0,side:THREE.DoubleSide});
  const mesh=new THREE.Mesh(geo,mat);mesh.castShadow=true;mesh.receiveShadow=true;modelGroup.add(mesh);
  const edge=new THREE.LineSegments(new THREE.EdgesGeometry(geo,22),new THREE.LineBasicMaterial({color:0x53666c,transparent:true,opacity:.72}));modelGroup.add(edge);
}
function addCutFace(def,x,opacity=1){
  const geo=transformFace(new THREE.ShapeGeometry(makeThreeShape(def),48),x);
  const mesh=new THREE.Mesh(geo,new THREE.MeshBasicMaterial({color:0xe27a36,transparent:true,opacity,side:THREE.DoubleSide,polygonOffset:true,polygonOffsetFactor:-1}));
  modelGroup.add(mesh);
}
function rebuildModel(fit=false){
  sanitize(); clearGroup(modelGroup);
  const p=state.values,def=sectionDefinition(),L=p.span,cutX=(p.cut/100-.5)*L,gap=p.split;
  const leftLen=cutX+L/2,rightLen=L/2-cutX;
  addSegment(def,leftLen,(-L/2+cutX)/2-gap/2);
  addSegment(def,rightLen,(cutX+L/2)/2+gap/2);
  addCutFace(def,cutX-gap/2,.96); if(gap>.04)addCutFace(def,cutX+gap/2,.72);
  grid.position.y=-p.H/2-.28;
  $('stationTag').textContent=`x = ${number(cutX,2)} m`;
  $('modelLabel').textContent=`${TYPES[state.type].name} · 毛截面`;
  if(fit)fitCamera();
  renderSection(); updateMetrics(); updateTask();
}
function fitCamera(){
  const box=new THREE.Box3().setFromObject(modelGroup),size=new THREE.Vector3();box.getSize(size);const center=new THREE.Vector3();box.getCenter(center);
  const d=Math.max(size.x,size.y,size.z)*1.15;
  controls.target.copy(center);camera.position.copy(center).add(new THREE.Vector3(d*.62,d*.48,d*.72));camera.near=Math.max(.02,d/200);camera.far=Math.max(200,d*8);camera.updateProjectionMatrix();controls.update();
}

function svgEl(name,attrs={}){const el=document.createElementNS(NS,name);Object.entries(attrs).forEach(([k,v])=>el.setAttribute(k,v));return el;}
function renderSection(){
  const svg=$('sectionSvg');svg.replaceChildren();
  const def=sectionDefinition(),props=sectionProperties(def),target=state.mode==='match'&&state.target?sectionDefinition(state.target,state.type):null;
  const pad=48,sw=560,sh=300,scale=Math.min((sw-2*pad)/def.B,(sh-2*pad)/def.H),cx=sw/2,cy=sh/2;
  const point=([y,z])=>[cx+y*scale,cy-z*scale];
  const ringPath=ring=>ring.map((p,i)=>`${i?'L':'M'} ${number(point(p)[0],2)} ${number(point(p)[1],2)}`).join(' ')+' Z';
  const pathData=[ringPath(def.outer),...def.holes.map(ringPath)].join(' ');
  svg.appendChild(svgEl('path',{d:pathData,fill:'#c9bdac',stroke:'#304b55','stroke-width':'2','fill-rule':'evenodd'}));
  if(target){
    const td=[ringPath(target.outer),...target.holes.map(ringPath)].join(' ');
    svg.appendChild(svgEl('path',{d:td,fill:'none',stroke:'#198c91','stroke-width':'2.5','stroke-dasharray':'9 7','fill-rule':'evenodd','vector-effect':'non-scaling-stroke'}));
  }
  const yAxis=cy-props.cz*scale;
  svg.appendChild(svgEl('line',{x1:pad-8,y1:yAxis,x2:sw-pad+8,y2:yAxis,stroke:'#e27a36','stroke-width':'2','stroke-dasharray':'10 5'}));
  const c=point([props.cy,props.cz]);svg.appendChild(svgEl('circle',{cx:c[0],cy:c[1],r:'4.5',fill:'#e27a36'}));
  const label=svgEl('text',{x:c[0]+8,y:c[1]-8,fill:'#7d4a2a','font-size':'12','font-family':'Bahnschrift,Consolas,monospace'});label.textContent='C / 形心轴';svg.appendChild(label);
  const dimColor='#245f73';
  svg.appendChild(svgEl('line',{x1:cx-def.B*scale/2,y1:sh-24,x2:cx+def.B*scale/2,y2:sh-24,stroke:dimColor,'stroke-width':'1.5'}));
  const btxt=svgEl('text',{x:cx,y:sh-29,fill:dimColor,'text-anchor':'middle','font-size':'12','font-family':'Bahnschrift,Consolas,monospace'});btxt.textContent=`B = ${number(def.B,2)} m`;svg.appendChild(btxt);
  const hx=sw-27;svg.appendChild(svgEl('line',{x1:hx,y1:cy-def.H*scale/2,x2:hx,y2:cy+def.H*scale/2,stroke:dimColor,'stroke-width':'1.5'}));
  const htxt=svgEl('text',{x:hx-7,y:cy,fill:dimColor,'text-anchor':'middle','font-size':'12','font-family':'Bahnschrift,Consolas,monospace',transform:`rotate(-90 ${hx-7} ${cy})`});htxt.textContent=`H = ${number(def.H,2)} m`;svg.appendChild(htxt);
  $('targetKey').classList.toggle('show',Boolean(target));
  $('sectionNote').textContent=TYPES[state.type].note;
}

function updateMetrics(){
  const p=state.values,def=sectionDefinition(),s=sectionProperties(def),solid=sectionProperties({outer:rectRing(def.B,def.H),holes:[],B:def.B,H:def.H});
  const areaRatio=s.A/solid.A,inertiaRatio=s.Iy/solid.Iy,eff=(s.Iy/s.A)/(solid.Iy/solid.A);
  const qSelf=GAMMA*s.A,q=qSelf+p.liveLoad,q0=GAMMA*solid.A+p.liveLoad;
  const spanIndex=Math.pow((s.Iy/q)/(solid.Iy/q0),.25);
  const L=p.span,deflection=5*(q*1000)*Math.pow(L,4)/(384*ELASTIC_E*s.Iy);
  const moment=(q*1000)*L*L/8,stress=moment/s.W/1e6;
  $('savedMassHero').textContent=pct(1-areaRatio);$('keptIHero').textContent=pct(inertiaRatio);
  $('efficiencyLead').textContent=`${number(s.Iy/s.A,3)} m² · ${number(eff,2)}× 基准`;
  $('areaRatio').textContent=pct(areaRatio);$('inertiaRatio').textContent=pct(inertiaRatio);$('spanRatio').textContent=pct(spanIndex);
  $('areaBar').style.width=`${clamp(areaRatio*100,0,100)}%`;$('inertiaBar').style.width=`${clamp(inertiaRatio*100,0,100)}%`;$('spanBar').style.width=`${clamp(spanIndex*100,0,120)}%`;
  $('areaValue').textContent=`${number(s.A,3)} m²`;$('inertiaValue').textContent=`${number(s.Iy,3)} m⁴`;$('selfWeightValue').textContent=`${number(qSelf,1)} kN/m`;
  $('deflectionValue').textContent=`${number(deflection*1000,1)} mm`;$('stressValue').textContent=`${number(stress,2)} MPa`;$('centroidValue').textContent=`${number(s.cz+def.H/2,3)} m`;
  state.lastMetrics={areaRatio,inertiaRatio,eff,spanIndex};
}

function renderControls(){
  const host=$('sectionControls');host.replaceChildren();
  const title=document.createElement('div');title.className='control-title';title.innerHTML='<span>截面几何</span><span class="tiny-label">geometry</span>';host.appendChild(title);
  TYPES[state.type].fields.forEach(([key,label,min,max,step,unit])=>{
    const wrap=document.createElement('div');wrap.className='control';
    const lab=document.createElement('label');lab.htmlFor=`p-${key}`;lab.innerHTML=`<span>${label}</span><output id="po-${key}"></output>`;
    const input=document.createElement('input');input.type='range';input.id=`p-${key}`;input.min=min;input.max=max;input.step=step;input.value=state.values[key];input.dataset.param=key;
    input.addEventListener('input',()=>{state.values[key]=+input.value;sanitize();syncOutputs();rebuildModel(false)});
    wrap.append(lab,input);host.appendChild(wrap);
  });
  host.classList.add('control-group');syncOutputs();
}
function syncOutputs(){
  const schema=TYPES[state.type];schema.fields.forEach(([key,_label,_min,_max,step,unit])=>{const out=$(`po-${key}`);if(out)out.textContent=`${number(state.values[key],String(step).includes('.')?2:0)} ${unit}`.trim()});
  $('oSpan').textContent=`${state.values.span} m`;$('oLiveLoad').textContent=`${state.values.liveLoad} kN/m`;$('oCut').textContent=`${state.values.cut}% L`;$('oSplit').textContent=`${number(state.values.split,1)} m`;
}

function setType(type){
  state.type=type;state.target=null;Object.assign(state.values,TYPES[type].defaults);sanitize();
  document.querySelectorAll('[data-type]').forEach(b=>b.classList.toggle('active',b.dataset.type===type));
  renderControls();rebuildModel(true);
}
function cameraAngle(){
  const dir=camera.position.clone().sub(controls.target).normalize(),desired=VIEW_TARGETS[state.viewTarget].desired;
  return THREE.MathUtils.radToDeg(Math.acos(clamp(dir.dot(desired),-1,1)));
}
function matchScore(){
  if(!state.target)return 0;
  const fields=TYPES[state.type].fields;let total=0;
  fields.forEach(([key,,min,max])=>{total+=Math.abs(state.values[key]-state.target[key])/(max-min)});
  return Math.round(clamp(100*(1-total/fields.length*5),0,100));
}
function updateMemory(){
  document.querySelectorAll('[data-memory-step]').forEach(item=>item.classList.toggle('current',item.dataset.memoryStep===state.mode));
  const svg=$('memorySvg'),memoryKey=`${state.mode}:${state.viewTarget}:${state.type}`;
  if(svg.dataset.key===memoryKey)return;
  svg.dataset.key=memoryKey;svg.replaceChildren();
  const draw=(name,attrs={},label='')=>{const el=svgEl(name,attrs);if(label)el.textContent=label;svg.appendChild(el);return el};
  const label=(x,y,value,extra={})=>draw('text',{x,y,fill:'#4f666e','font-size':'10','font-family':'Microsoft YaHei, sans-serif',...extra},value);
  if(state.mode==='explore'){
    draw('rect',{x:22,y:20,width:102,height:74,rx:5,fill:'#c9bdac',stroke:'#304b55','stroke-width':2});
    draw('rect',{x:48,y:40,width:50,height:34,rx:5,fill:'#f7faf9',stroke:'#e27a36','stroke-width':2,'stroke-dasharray':'6 4',class:'memory-pulse'});
    draw('path',{d:'M136 57 H174 M166 50 L174 57 L166 64',fill:'none',stroke:'#657a82','stroke-width':2});
    draw('rect',{x:188,y:21,width:88,height:72,rx:5,fill:'#c9bdac',stroke:'#304b55','stroke-width':2});
    draw('rect',{x:205,y:39,width:54,height:36,rx:4,fill:'#f7faf9',stroke:'#304b55','stroke-width':1.5});
    label(73,113,'先剖开，空白才成为可核对的空腔',{'text-anchor':'middle'});label(232,113,'删掉后要追问谁接手任务',{'text-anchor':'middle'});
    $('memoryNow').textContent=`当前调用：${TYPES[state.type].name}。移动剖切位置和拆分距离，让三维实体、橙色剖面与二维轮廓保持同一对应。`;
    return;
  }
  if(state.mode==='view'){
    const view=VIEW_TARGETS[state.viewTarget],origin=[70,72];
    const axes={x:[132,72],y:[34,98],z:[70,20]};
    Object.entries(axes).forEach(([axis,[x,y]])=>{const active=axis===view.axis;draw('line',{x1:origin[0],y1:origin[1],x2:x,y2:y,stroke:active?'#e27a36':'#657a82','stroke-width':active?4:2,class:active?'memory-pulse':''});label(x+(axis==='x'?5:-2),y+(axis==='z'?-3:11),axis,{fill:active?'#b4521d':'#4f666e','font-weight':'700'});});
    draw('circle',{cx:origin[0],cy:origin[1],r:4,fill:'#17313b'});
    draw('rect',{x:160,y:22,width:78,height:72,rx:5,fill:'#e7f1f2',stroke:'#198c91','stroke-width':2,'stroke-dasharray':'7 5'});
    label(199,49,view.name,{'text-anchor':'middle','font-size':'13','font-weight':'700',fill:'#17313b'});label(199,68,view.plane,{'text-anchor':'middle','font-weight':'700',fill:'#198c91'});
    draw('circle',{cx:274,cy:58,r:9,fill:'none',stroke:'#17313b','stroke-width':2});draw('circle',{cx:274,cy:58,r:3,fill:'#17313b'});draw('path',{d:'M263 58 H243 M250 52 L243 58 L250 64',fill:'none',stroke:'#e27a36','stroke-width':2,class:'memory-pulse'});
    label(150,113,`视线 ∥ ${view.axis}：让 ${view.axis} 方向缩成一点`,{'text-anchor':'middle'});
    $('memoryNow').textContent=`当前调用：目标是${view.name} ${view.plane}。不找按钮，只旋转模型；当视线沿 ${view.axis} 轴时，${view.axis} 方向应在画面中积聚。`;
    return;
  }
  draw('rect',{x:28,y:22,width:104,height:76,rx:5,fill:'none',stroke:'#198c91','stroke-width':2.5,'stroke-dasharray':'7 5',class:'memory-pulse'});
  draw('rect',{x:48,y:43,width:64,height:34,rx:4,fill:'none',stroke:'#198c91','stroke-width':2,'stroke-dasharray':'7 5',class:'memory-pulse'});
  draw('rect',{x:36,y:18,width:98,height:80,rx:5,fill:'#c9bdac66',stroke:'#304b55','stroke-width':2});draw('rect',{x:55,y:39,width:58,height:38,rx:4,fill:'#f7faf9',stroke:'#304b55','stroke-width':1.5});
  draw('path',{d:'M156 35 H272 M156 61 H244 M156 87 H259',stroke:'#c8d5d8','stroke-width':8,'stroke-linecap':'round'});draw('circle',{cx:212,cy:35,r:6,fill:'#e27a36'});draw('circle',{cx:196,cy:61,r:6,fill:'#e27a36'});draw('circle',{cx:231,cy:87,r:6,fill:'#e27a36'});
  label(214,113,'一次只调一个参数，看哪段轮廓随它移动',{'text-anchor':'middle'});
  $('memoryNow').textContent=`当前调用：虚线是目标，实线是当前 ${TYPES[state.type].name}。一次只改宽度、高度或薄壁尺寸中的一项，直到能说出“这个参数控制哪一条边”。`;
}
function updateTask(){
  const title=$('taskTitle'),prompt=$('taskPrompt'),status=$('taskStatus'),meter=$('angleMeter'),targets=$('viewTargets');
  status.className='task-status';
  if(state.mode==='explore'){
    title.textContent='参数影响分析';prompt.textContent='增大截面空腔尺寸，比较材料面积与截面惯性矩的相对变化。';status.textContent='当前为自由分析模式，不计分。';meter.hidden=true;targets.hidden=true;$('taskSubmit').textContent='记录结论';$('targetKey').classList.remove('show');
  }else if(state.mode==='view'){
    const view=VIEW_TARGETS[state.viewTarget],angle=cameraAngle(),score=Math.round(clamp(100-angle*2.2,0,100));
    title.textContent=`旋转到${view.name}`;prompt.textContent=`不用标准视图按钮，只拖动模型，使视线沿 ${view.axis} 轴看去，让 ${view.axis} 方向积聚成一点，留下 ${view.plane}。`;status.textContent=`当前偏差 ${number(angle,1)}° · 即时分 ${score}`;meter.hidden=false;targets.hidden=false;meter.querySelector('i').style.width=`${score}%`;$('taskSubmit').textContent='提交视角';
  }else{
    const score=matchScore();title.textContent='按轮廓复形';prompt.textContent='虚线只给目标截面轮廓，不给尺寸。调整当前构件参数，使实线与虚线尽量重合。';status.textContent=`当前轮廓接近度 ${score} 分（提交后才记录）`;meter.hidden=false;targets.hidden=true;meter.querySelector('i').style.width=`${score}%`;$('taskSubmit').textContent='提交轮廓';
  }
  updateMemory();
}
function setMode(mode){
  state.mode=mode;document.querySelectorAll('[data-mode]').forEach(b=>b.classList.toggle('active',b.dataset.mode===mode));
  if(mode==='view'){
    const center=controls.target.clone(),d=Math.max(state.values.span*.65,12);camera.position.copy(center).add(new THREE.Vector3(d*.55,d*.42,d*.7));camera.lookAt(center);controls.update();
  }
  if(mode==='match')state.target={...TARGETS[state.type],span:state.values.span,liveLoad:state.values.liveLoad,cut:state.values.cut,split:state.values.split};
  else state.target=null;
  renderSection();updateTask();
}
function addRecord(label,score,key=label){
  state.records.unshift({label,score,key});state.records=state.records.slice(0,4);
  const host=$('sessionList');host.replaceChildren();state.records.forEach(r=>{const el=document.createElement('div');el.className='session-item';el.innerHTML=`<span>${r.label}</span><b>${r.score} 分</b>`;host.appendChild(el)});
}
function submitTask(){
  const status=$('taskStatus');
  if(state.mode==='explore'){
    const m=state.lastMetrics;status.textContent=m.inertiaRatio>m.areaRatio?'核对：惯性矩保留比例高于材料保留比例；靠近形心轴的材料对竖向抗弯贡献较小。':'当前截面没有体现出这一趋势；检查空腔是否真的位于形心轴附近。';status.className=`task-status ${m.inertiaRatio>m.areaRatio?'success':'error'}`;return;
  }
  const score=state.mode==='view'?Math.round(clamp(100-cameraAngle()*2.2,0,100)):matchScore();
  if(state.mode==='view'){
    const view=VIEW_TARGETS[state.viewTarget],key=`view:${state.type}:${state.viewTarget}`;
    addRecord(`${TYPES[state.type].name} · ${view.name}对准`,score,key);
    const transfers=new Set(state.records.filter(r=>r.score>=90&&String(r.key).startsWith('view:')).map(r=>r.key));
    status.textContent=score>=90?(transfers.size>=2?'迁移任务通过：已在两个不同构件或视图任务中完成无提示对准。':'第一轮通过：可更换梁型或目标视图，再完成一次无提示对准。'):score>=70?'接近目标：可依据右侧示意图继续减小目标轴在画面中的投影长度。':'尚未通过：请辨识桥向 x、横桥向 y、竖向 z，并继续调整至目标视线方向。';
  }else{
    addRecord(`${TYPES[state.type].name}复形`,score,`match:${state.type}`);
    status.textContent=score>=90?'通过：已经能无提示复现目标轮廓。':score>=70?'接近：再检查梁高、宽度和薄壁厚度中误差最大的一项。':'尚未通过：先只改一个参数，观察哪一段轮廓随它移动。';
  }
  status.className=`task-status ${score>=90?'success':'error'}`;
}
function resetTask(){
  if(state.mode==='match'){Object.assign(state.values,TYPES[state.type].defaults);renderControls();rebuildModel(true);return}
  if(state.mode==='view'){setMode('view');return}
  setType(state.type);
}

document.querySelectorAll('[data-type]').forEach(b=>b.addEventListener('click',()=>setType(b.dataset.type)));
document.querySelectorAll('[data-mode]').forEach(b=>b.addEventListener('click',()=>setMode(b.dataset.mode)));
document.querySelectorAll('[data-view-target]').forEach(b=>b.addEventListener('click',()=>{state.viewTarget=b.dataset.viewTarget;document.querySelectorAll('[data-view-target]').forEach(x=>x.classList.toggle('active',x===b));updateTask()}));
['span','liveLoad','cut','split'].forEach(id=>{$(id).value=state.values[id];$(id).addEventListener('input',()=>{state.values[id]=+$(id).value;syncOutputs();rebuildModel(id==='span')})});
$('taskSubmit').addEventListener('click',submitTask);$('taskReset').addEventListener('click',resetTask);

function resize(){const r=viewport.getBoundingClientRect();renderer.setSize(Math.max(1,r.width),Math.max(1,r.height),false);camera.aspect=r.width/Math.max(1,r.height);camera.updateProjectionMatrix()}
new ResizeObserver(resize).observe(viewport);
function animate(){requestAnimationFrame(animate);controls.update();if(state.mode==='view')updateTask();renderer.render(scene,camera)}

function selfTest(){
  const d={outer:rectRing(2,3),holes:[],B:2,H:3},s=sectionProperties(d);
  console.assert(Math.abs(s.A-6)<1e-9,'rectangle area');console.assert(Math.abs(s.Iy-4.5)<1e-9,'rectangle inertia');
  const b=sectionProperties({outer:rectRing(4,2),holes:[rectRing(3,1)],B:4,H:2});
  console.assert(Math.abs(b.A-5)<1e-9,'box area');console.assert(b.Iy>0&&b.Iy<8/12*8,'box inertia range');
}

selfTest();renderControls();syncOutputs();resize();rebuildModel(true);animate();
