/* CFST arch classroom. Original teaching geometry; no structural solver or invented stress results.
 * Canonical coordinates: x longitudinal, y transverse, z up, all in metres.
 * Three.js (MIT) is packaged in vendor/three.min.js; see LICENSE.three.txt.
 */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const clamp = (n, min = 0, max = 1) => Math.min(max, Math.max(min, n));
  const embedded = new URLSearchParams(location.search).get('embed') === 'construction';
  const state = {stage: embedded ? 0 : 4, progress: embedded ? 0 : 1, transparent: true, forces: true, playing: false, view: 'iso'};
  const contract = Object.freeze({units: 'm', evidence_type: 'teaching_assumption', span: 60, rise: 12, deckWidth: 8, ribSpacing: 6, pipeOuterDiameter: 1.2, pipeWallThickness: .02, laneWidths: [3.5,3.5], edgeWidths: [.5,.5], deckTop: 14.8, vehicleSize: [4.6,1.8,1.5], structuralResults: false});
  const stages = [
    {title:'空钢管分段架设', description:'临时支架先就位，空钢管从两侧拱脚向拱顶分段拼装。拱顶尚未合龙，不能把它视为完整承推力的拱。', note:'先有支架，后放管段：未合龙的空钢管由临时支架支承。', key:'支承未闭合管段', mechanism:'钢管先参与施工', text:'此时还没有混凝土。支架承担架设中的支承作用；空钢管及其连接须满足本阶段的施工要求。'},
    {title:'拱顶合龙与横联', description:'两侧管段在拱顶闭合，再完成两根拱肋之间的横联。临时支架仍保留，为后续灌注提供稳定施工条件。', note:'拱顶合龙＋两肋横联：先形成连续钢拱与空间联系，暂不卸架。', key:'闭合与空间稳定', mechanism:'横联把两根拱肋联系起来', text:'两根拱肋之间设置横向与斜向联系。平面内成拱不等于空间稳定，横联和临时支承各有作用。'},
    {title:'管内对称泵送', description:'混凝土从两侧拱脚进入钢管，沿拱肋向拱顶推进。切换“看管内填芯”，观察湿混凝土填入空管的过程。', note:'湿混凝土先增加施工荷载；尚未硬化时，不把它算作已经工作的组合核心。', key:'填芯仍处湿态', mechanism:'钢管同时是灌注模板', text:'此处将两侧同步灌注作理想化示意。湿混凝土的重量先由当时的钢管—支架系统承担；实际泵压与分段顺序需另行设计。'},
    {title:'混凝土硬化与逐步卸架', description:'先等待管内混凝土达到本施工方案要求，再对称、分步卸除临时支架。支承条件改变，荷载转移到已形成的组合拱肋与永久拱脚。', note:'硬化 → 达到卸架条件 → 分步卸架；拱脚的水平推力必须有永久基础承接。', key:'体系转换', mechanism:'硬化之后形成材料协同', text:'钢管约束核心混凝土的横向膨胀，核心混凝土抑制管壁向内局部屈曲。这里演示荷载路径转换，不计算卸架变形或应力。'},
    {title:'安装桥面并投入使用', description:'组合拱肋形成后安装拱上立柱和桥面，再出现使用荷载。观察桥面荷载经立柱传向拱肋，最后由永久拱脚基础承接。', note:'新增荷载：桥面 → 拱上立柱 → 钢管混凝土拱肋 → 永久拱脚基础。', key:'后续荷载共同承担', mechanism:'共同工作，也保留先期历史', text:'组合后新增荷载产生两材料的协同响应。钢管先前已有的施工应变并不会消失；两材料总应变不能被简单处理成“从零同时加载”。'}
  ];
  const viewport = $('viewport');
  if (!window.THREE) { viewport.insertAdjacentHTML('beforeend','<p class="webgl-error">三维依赖未加载，请确认 vendor/three.min.js 与本页一并保存。</p>'); return; }
  const T = window.THREE;
  let renderer;
  try { renderer = new T.WebGLRenderer({antialias:true, alpha:true}); }
  catch(error) { viewport.insertAdjacentHTML('beforeend','<p class="webgl-error">此浏览器暂无法初始化 WebGL，请启用硬件加速后重试。</p>'); return; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1,2));
  if ('outputColorSpace' in renderer) renderer.outputColorSpace = T.SRGBColorSpace;
  renderer.setClearColor(0xf3f7f7,0);
  viewport.appendChild(renderer.domElement);
  renderer.domElement.setAttribute('aria-label','可旋转与缩放的钢管混凝土上承式双肋拱桥模型');
  const scene = new T.Scene();
  const camera = new T.PerspectiveCamera(40,1,.1,500);
  const target = new T.Vector3(0,6.2,0);
  const V = (x,y,z) => new T.Vector3(x,z,-y);
  scene.add(new T.HemisphereLight(0xe9f7ff,0x8e9897,2.2));
  const sun = new T.DirectionalLight(0xffffff,2.1); sun.position.set(-15,60,35); scene.add(sun);
  const fillLight = new T.DirectionalLight(0xffeed8,.6); fillLight.position.set(30,15,-25); scene.add(fillLight);
  const mat = (color, extra = {}) => new T.MeshStandardMaterial({color,roughness:.65,metalness:.12,...extra});
  const materials = {
    steel:mat(0x238f97,{transparent:true,opacity:.25,depthWrite:false,side:T.DoubleSide,metalness:.45}),
    core:mat(0xe8bd7b,{roughness:.96,metalness:0}),
    temporary:mat(0xae94b1,{roughness:.8}),
    cross:mat(0x418a96,{metalness:.45}),
    foundation:mat(0xa8b5b4,{roughness:1,metalness:0}),
    deck:mat(0xb6c6c6,{roughness:.9,metalness:0}),
    road:mat(0x718386,{roughness:1,metalness:0}),
    markings:mat(0xece7c8), column:mat(0xa3bbbd),
    pump:mat(0xe3a856), glass:mat(0x355966), red:mat(0xcf6654), blue:mat(0x477d9b), wheel:mat(0x34484c)
  };
  const manifest = [];
  function identify(object,id,label,stage,temporary=false) {object.userData={component_id:id,label,installStage:stage,temporary};manifest.push(object.userData);return object;}
  function box(x,y,z,dx,dy,dz,material,group=scene) {const mesh=new T.Mesh(new T.BoxGeometry(dx,dz,dy),material);mesh.position.copy(V(x,y,z));group.add(mesh);return mesh;}
  function cylinder(a,b,r,material,group=scene) {const av=V(...a),bv=V(...b),direction=bv.clone().sub(av);const mesh=new T.Mesh(new T.CylinderGeometry(r,r,direction.length(),12),material);mesh.position.copy(av.clone().add(bv).multiplyScalar(.5));mesh.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),direction.normalize());group.add(mesh);return mesh;}
  function line(points,color=0x899e9f,group=scene) {const obj=new T.Line(new T.BufferGeometry().setFromPoints(points.map(p=>V(...p))),new T.LineBasicMaterial({color,transparent:true,opacity:.8}));group.add(obj);return obj;}
  function label(text,x,y,z,scale=1.7,color='#668389') {const c=document.createElement('canvas');c.width=512;c.height=96;const ctx=c.getContext('2d');ctx.font='500 32px "Microsoft YaHei",sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle='rgba(248,251,251,.92)';const w=Math.min(500,ctx.measureText(text).width+22);ctx.fillRect((512-w)/2,11,w,74);ctx.fillStyle=color;ctx.fillText(text,256,48);const texture=new T.CanvasTexture(c);const sprite=new T.Sprite(new T.SpriteMaterial({map:texture,depthTest:false,transparent:true}));sprite.position.copy(V(x,y,z));sprite.scale.set(scale*5.333,scale,1);scene.add(sprite);return sprite;}
  const archZ = x => 12 * (1-(x/30)**2);
  function archRingGeometry(x0,x1,outer=.6,inner=.58) {
    const pos=[], normals=[], indices=[], radial=24, longitudinal=4;
    // Separate outer and inner surfaces retain the actual 20 mm wall thickness.
    for (let surface=0;surface<2;surface++) for(let i=0;i<=longitudinal;i++){
      const x=x0+(x1-x0)*i/longitudinal, tangent=new T.Vector3(1,-24*x/900,0).normalize();
      const normal=new T.Vector3(-tangent.y,tangent.x,0), radius=surface===0?outer:inner;
      for(let j=0;j<=radial;j++){const a=j/radial*Math.PI*2;const n=normal.clone().multiplyScalar(Math.cos(a)).add(new T.Vector3(0,0,Math.sin(a)));pos.push(x+n.x*radius,archZ(x)+n.y*radius,n.z*radius);normals.push(n.x*(surface?-1:1),n.y*(surface?-1:1),n.z*(surface?-1:1));}
    }
    const stride=radial+1, surfaceSize=(longitudinal+1)*stride;
    for(let surface=0;surface<2;surface++) for(let i=0;i<longitudinal;i++)for(let j=0;j<radial;j++){const a=surface*surfaceSize+i*stride+j,b=a+stride;if(surface)indices.push(a,a+1,b,a+1,b+1,b);else indices.push(a,b,a+1,a+1,b,b+1);}
    for(const i of [0,longitudinal])for(let j=0;j<radial;j++){const a=i*stride+j,b=a+surfaceSize;indices.push(a,a+1,b,a+1,b+1,b);}
    const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(pos,3));g.setAttribute('normal',new T.Float32BufferAttribute(normals,3));g.setIndex(indices);return g;
  }
  class ArchCurve extends T.Curve {constructor(x0,x1,y){super();this.x0=x0;this.x1=x1;this.y=y;}getPoint(t){const x=this.x0+(this.x1-this.x0)*t;return V(x,this.y,archZ(x));}}
  const steelPieces=[], corePieces=[], crossPieces=[], falsework=[], columns=[], deckPieces=[], roadway=[], carGroups=[], pumpParts=[], reactions=[], loadArrows=[], archArrows=[];
  const ground=box(0,0,-2.6,83,31,.3,mat(0xe3ecea,{roughness:1,metalness:0}));
  for(const x of [-30,30]){
    const foundation=identify(box(x,0,-1.1,5.3,10,2.7,materials.foundation),`permanent-footing-${x<0?'left':'right'}`,'永久拱脚基础',0);foundation.userData.carriesHorizontalThrust=true;
    for(const y of [-3,3]) box(x,y,-.05,2.3,2.2,.6,materials.foundation);
  }
  for (const [rib,y] of [-3,3].entries()) for(let i=0;i<48;i++) {
    const x0=-30+i*1.25,x1=x0+1.25,steel=new T.Mesh(archRingGeometry(x0,x1),materials.steel);steel.position.z=-y;scene.add(steel);identify(steel,`rib-${rib}-steel-${i}`,'钢管拱肋',i===23||i===24?1:0);steelPieces.push({mesh:steel,x:(x0+x1)/2});
    const core=new T.Mesh(new T.TubeGeometry(new ArchCurve(x0,x1,y),4,.579,20,false),materials.core);scene.add(core);identify(core,`rib-${rib}-core-${i}`,'管内混凝土',2);corePieces.push({mesh:core,x:(x0+x1)/2});
  }
  for(const x of [-25,-20,-15,-10,-5,0,5,10,15,20,25]){
    const group=identify(new T.Group(),`falsework-${x}`,'临时支架',0,true);scene.add(group);
    const top=archZ(x)-.65;
    for(const y of [-3,3]){
      for(const side of [-.65,.65])cylinder([x+side,y,-2.3],[x+side,y,top],.07,materials.temporary,group);
      box(x,y,top,2,.95,.2,materials.temporary,group);
      box(x,y,-2.22,2,1.5,.2,materials.foundation,group);
      for(let z=-2.1;z<top-1;z+=2.1){const hi=Math.min(z+2.1,top);cylinder([x-.65,y,z],[x+.65,y,hi],.047,materials.temporary,group);cylinder([x+.65,y,z],[x-.65,y,hi],.047,materials.temporary,group);}
    }
    cylinder([x,-3,top-.2],[x,3,top-.2],.06,materials.temporary,group);
    falsework.push({group,x});
  }
  for(const x of [-25,-20,-15,-10,-5,0,5,10,15,20,25]){
    const group=identify(new T.Group(),`rib-transverse-${x}`,'两肋横联',1);scene.add(group);cylinder([x,-3,archZ(x)],[x,3,archZ(x)],.16,materials.cross,group);
    if(x<25){cylinder([x,-3,archZ(x)],[x+5,3,archZ(x+5)],.105,materials.cross,group);cylinder([x,3,archZ(x)],[x+5,-3,archZ(x+5)],.105,materials.cross,group);}
    crossPieces.push({group,x});
  }
  for(let i=0;i<13;i++){
    const x=-30+i*5,group=identify(new T.Group(),`spandrel-bent-${i}`,'拱上立柱与盖梁',4);scene.add(group);
    for(const y of [-3,3]){const base=archZ(x)+.58;cylinder([x,y,base],[x,y,14.2],.25,materials.column,group);box(x,y,base,.8,.8,.22,materials.column,group);}
    box(x,0,14.05,.8,7.3,.4,materials.column,group);columns.push({group,x,order:i});
  }
  for(let i=0;i<12;i++){
    const x=-27.5+i*5,group=identify(new T.Group(),`deck-segment-${i}`,'桥面及护栏',4);scene.add(group);
    box(x,0,14.45,5,8,.5,materials.deck,group);box(x,0,14.75,5,7,.1,materials.road,group);
    for(const y of [-3.78,3.78]){box(x,y,15.46,5,.08,.08,materials.cross,group);for(const dx of [-2,-1,0,1,2])box(x+dx,y,15.15,.07,.07,.7,materials.cross,group);}
    for(const dx of [-1.5,1.5])box(x+dx,0,14.814,1.5,.1,.025,materials.markings,group);
    for(const y of [-3.36,3.36])box(x,y,14.814,5,.08,.025,materials.markings,group);
    deckPieces.push({group,order:i});
  }
  function car(id,x,y,color,reverse=false){const g=identify(new T.Group(),id,'教学小客车（外观，不代表荷载数值）',4);scene.add(g);box(0,0,.7,4.6,1.8,.55,color,g);box(-.1,0,1.17,2.3,1.62,.58,materials.glass,g);box(0,0,1.49,1.9,1.62,.02,color,g);for(const axle of [-1.4,1.4])for(const side of [-.79,.79])cylinder([axle,side-.11,.32],[axle,side+.11,.32],.32,materials.wheel,g);g.position.copy(V(x,y,14.8));if(reverse)g.rotation.y=Math.PI;carGroups.push({group:g,x,y,reverse});}
  car('vehicle-1',-9,-1.75,materials.red);car('vehicle-2',13,1.75,materials.blue,true);
  for(const sign of [-1,1]){
    const g=identify(new T.Group(),`concrete-pump-${sign}`,'拱脚泵送设备（位置示意）',2,true);scene.add(g);box(sign*34,-6,-1,2.3,1.6,1.8,materials.pump,g);box(sign*34,-6,.1,1.6,1.1,.4,materials.pump,g);
    for(const y of [-3,3]){cylinder([sign*33,-6,-.1],[sign*31,y,-.1],.11,materials.pump,g);cylinder([sign*31,y,-.1],[sign*29.5,y,archZ(sign*29.5)],.11,materials.pump,g);}pumpParts.push(g);
  }
  function arrow(a,b,color,group=scene){const av=V(...a),bv=V(...b),dir=bv.clone().sub(av);const ar=new T.ArrowHelper(dir.clone().normalize(),av,dir.length(),color,.72,.38);group.add(ar);return ar;}
  for(const x of [-30,30]){
    // Reactions ON the arch: horizontal inward and vertical upward at each permanent springing.
    reactions.push(arrow([x+(x<0?-4:4),-4.7,.4],[x,-4.7,.4],0xc6793f));
    reactions.push(arrow([x,-4.7,-3],[x,-4.7,.1],0xc6793f));
  }
  for(const x of [-20,-10,0,10,20]) loadArrows.push(arrow([x,-1.75,19],[x,-1.75,15.3],0xc77847));
  for(const x of [-24,-16,-8,8,16,24]) {const sign=x<0?-1:1;archArrows.push(arrow([x,-4.15,archZ(x)],[x+sign*3.1,-4.15,archZ(x+sign*3.1)],0xc77847));}
  const pumpArrows=[];
  for(const sign of [-1,1])pumpArrows.push(arrow([sign*24,-3.85,archZ(sign*24)],[sign*21,-3.85,archZ(sign*21)],0xdba14c));
  line([[-30,-7,-2.1],[30,-7,-2.1]],0xa1b3b2);line([[-30,-7,-1.6],[-30,-7,-2.6]],0xa1b3b2);line([[30,-7,-1.6],[30,-7,-2.6]],0xa1b3b2);label('拱脚中心距 60 m',0,-7,-2.6,1.2);
  line([[34,4,0],[34,4,12]],0xa1b3b2);line([[33.5,4,0],[34.5,4,0]],0xa1b3b2);line([[33.5,4,12],[34.5,4,12]],0xa1b3b2);label('矢高 12 m',36.4,4,6.4,1.1);
  const footingLabel=label('基础对拱肋：向内、向上',-28,-6,-.1,1.05,'#97663c');
  const supportLabel=label('临时支架',-12,-4.5,2.8,.98,'#8d7490');
  let theta=.65,phi=1.18,distance=100, cameraDirty=true;
  function resize(){const w=viewport.clientWidth,h=viewport.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();cameraDirty=true;}
  function setView(view='iso'){state.view=view;distance=Math.max(83,74/(viewport.clientWidth/Math.max(1,viewport.clientHeight)));if(view==='side'){theta=0;phi=Math.PI/2;distance=Math.max(84,82/camera.aspect);}else if(view==='top'){theta=0;phi=.035;distance=Math.max(90,85/camera.aspect);}else{theta=.62;phi=1.12;}cameraDirty=true;document.querySelectorAll('.camera-controls button').forEach(b=>b.classList.toggle('active',b.id===`view-${view}`));}
  const pointers=new Map();let drag=null,pinchDistance=0;
  renderer.domElement.addEventListener('pointerdown',e=>{pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});renderer.domElement.setPointerCapture(e.pointerId);drag={x:e.clientX,y:e.clientY};if(pointers.size===2){const p=[...pointers.values()];pinchDistance=Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y);}send({type:'interaction'});});
  renderer.domElement.addEventListener('pointermove',e=>{if(!pointers.has(e.pointerId))return;pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});if(pointers.size===2){const p=[...pointers.values()],d=Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y);if(d&&pinchDistance)distance=clamp(distance*pinchDistance/d,38,230);pinchDistance=d;}else if(drag){theta-=(e.clientX-drag.x)*.006;phi=clamp(phi+(e.clientY-drag.y)*.005,.035,1.68);}drag={x:e.clientX,y:e.clientY};cameraDirty=true;});
  function endDrag(e){pointers.delete(e.pointerId);drag=null;pinchDistance=0;}
  renderer.domElement.addEventListener('pointerup',endDrag);renderer.domElement.addEventListener('pointercancel',endDrag);
  renderer.domElement.addEventListener('wheel',e=>{e.preventDefault();distance=clamp(distance*Math.exp(e.deltaY*.001),38,230);cameraDirty=true;send({type:'interaction'});},{passive:false});
  function derived(){const s=state.stage,p=state.progress;return {
    steel:s===0?p*.925:s===1?.925+p*.075:1,
    fill:s<2?0:s===2?p:1,
    hardened:s>3?1:s===3?clamp(p/.35):0,
    unload:s<3?0:s===3?clamp((p-.4)/.6):1,
    columns:s<4?0:clamp(p/.38),deck:s<4?0:clamp((p-.36)/.44),traffic:s===4&&p>=.82,
    combined:s>3||(s===3&&p>=.35)
  };}
  function update(){
    state.stage=clamp(Math.trunc(Number(state.stage)||0),0,4);state.progress=clamp(Number(state.progress)||0);
    const d=derived(),s=state.stage,p=state.progress,stage=stages[s];
    const erectThreshold=30*(1-d.steel),fillThreshold=30*(1-d.fill);
    steelPieces.forEach(v=>v.mesh.visible=d.steel>0&&Math.abs(v.x)>=erectThreshold-.001);
    corePieces.forEach(v=>v.mesh.visible=d.fill>0&&Math.abs(v.x)>=fillThreshold-.001);
    materials.steel.opacity=state.transparent?.25:1;materials.steel.transparent=state.transparent;materials.steel.depthWrite=!state.transparent;materials.steel.needsUpdate=true;
    materials.core.color.set(d.hardened>=1?0xe4b778:0xf0cca0);
    crossPieces.forEach(v=>v.group.visible=s>1||(s===1&&p>.2&&Math.abs(v.x)>=25*(1-clamp((p-.2)/.8))));
    falsework.forEach(v=>{const order=Math.abs(v.x)/25;v.group.visible=d.unload<1&&(d.unload===0||order>d.unload);});
    columns.forEach(v=>v.group.visible=d.columns>0&&Math.abs(v.x)>=30*(1-d.columns)-.001);
    deckPieces.forEach(v=>v.group.visible=d.deck>0&&Math.abs(-27.5+v.order*5)>=30*(1-d.deck)-.001);
    carGroups.forEach(v=>v.group.visible=d.traffic);
    pumpParts.forEach(v=>v.visible=s===2);
    pumpArrows.forEach((v,i)=>{v.visible=s===2&&p<1;const sign=i===0?-1:1,x=sign*Math.max(2,28*(1-p));v.position.copy(V(x,-3.85,archZ(x)));v.setDirection(V(x-sign*2.4,-3.85,archZ(x-sign*2.4)).sub(v.position).normalize());});
    const permanentActive=s===4||(s===3&&d.unload>0);
    reactions.forEach(v=>v.visible=state.forces&&permanentActive);
    archArrows.forEach(v=>v.visible=state.forces&&permanentActive);
    loadArrows.forEach(v=>v.visible=state.forces&&s===4&&d.deck>=1);
    footingLabel.visible=permanentActive;supportLabel.visible=d.unload===0;
    $('scene-title').textContent=stage.title;$('stage-number').textContent=`阶段 ${String(s+1).padStart(2,'0')} / 05`;$('stage-title').textContent=stage.title;$('stage-description').textContent=stage.description;$('stage-note').textContent=stage.note;$('key-status').textContent=stage.key;$('mechanism-title').textContent=stage.mechanism;$('mechanism-text').textContent=stage.text;
    $('scene-chip').textContent=s===0?'临时支架先就位':s===1?(p<1?'合龙中 · 支架保留':'钢拱闭合 · 支架保留'):s===2?`管内填充 ${Math.round(p*100)}% · 湿态`:s===3?(d.hardened<1?'养护硬化，尚不卸架':`达到卸架条件 · 卸架 ${Math.round(d.unload*100)}%`):(d.traffic?'组合拱肋承担后续荷载':'安装拱上结构');
    $('steel-status').textContent=d.steel<1?`架设 ${Math.round(d.steel*100)}%`:'连续闭合';
    $('core-status').textContent=d.fill===0?'尚未灌注':d.fill<1?`湿态 ${Math.round(d.fill*100)}%`:d.hardened<1?'已灌满 · 待硬化':'硬化 · 参与组合';
    $('support-status').textContent=d.unload===0?'保留':d.unload<1?'对称逐步卸除':'已卸除';
    $('section-core').setAttribute('fill',d.fill>0?'url(#concrete-hatch)':'#ffffff');$('section-label').textContent=d.fill===0?'管内暂为空':d.hardened<1?'湿混凝土填芯':'硬化混凝土核心';$('section-state').textContent=d.fill===0?'空心钢管截面':d.fill<1?'拱脚已灌注截面（拱顶尚未灌满）':d.hardened<1?'灌满但尚未形成硬化核心':'硬化后截面：外管与内芯协同';$('confinement-arrows').style.display=d.combined?'':'none';
    $('progress').value=p;$('progress-value').textContent=`${Math.round(p*100)}%`;$('transparent').checked=state.transparent;$('forces').checked=state.forces;$('play').textContent=state.playing?'暂停播放':'播放全过程';document.querySelectorAll('[data-stage]').forEach(b=>{const active=Number(b.dataset.stage)===s;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
    return d;
  }
  function stop(){state.playing=false;$('play').textContent='播放全过程';}
  function setStage(stage,progress=1){stop();state.stage=stage;state.progress=progress;update();}
  function send(message){if(embedded&&window.parent!==window)window.parent.postMessage({source:'bridge-lab',bridge:'arch',...message},location.origin);}
  const durations=[7,5,8,8,8];let last=0,lastUI=0;
  function animate(t){requestAnimationFrame(animate);const dt=Math.min((t-last)/1000,.06)||0;last=t;if(state.playing){state.progress+=dt/durations[state.stage];if(state.progress>=1){if(state.stage<4){state.stage++;state.progress=0;}else{state.progress=1;stop();}}if(t-lastUI>55){update();lastUI=t;}}if(cameraDirty){camera.position.set(target.x+distance*Math.sin(phi)*Math.sin(theta),target.y+distance*Math.cos(phi),target.z+distance*Math.sin(phi)*Math.cos(theta));camera.lookAt(target);cameraDirty=false;}renderer.render(scene,camera);}
  document.querySelectorAll('[data-stage]').forEach(b=>b.addEventListener('click',()=>setStage(Number(b.dataset.stage),1)));
  $('progress').addEventListener('input',e=>{stop();state.progress=Number(e.target.value);update();});
  $('play').addEventListener('click',()=>{if(state.playing)stop();else{if(state.stage===4&&state.progress>=1){state.stage=0;state.progress=0;}state.playing=true;}update();});
  $('restart').addEventListener('click',()=>{setStage(0,0);setView('iso');});
  $('transparent').addEventListener('change',e=>{state.transparent=e.target.checked;update();});$('forces').addEventListener('change',e=>{state.forces=e.target.checked;update();});
  for(const view of ['iso','side','top'])$(`view-${view}`).addEventListener('click',()=>setView(view));
  window.addEventListener('message',event=>{
    if(!embedded||event.source!==window.parent||event.origin!==location.origin)return;
    const m=event.data;if(!m||m.source!=='bridge-book-guide'||m.bridge!=='arch'||!['set-view','set-progress'].includes(m.type))return;
    const match=/^cfst_stage_([0-4])$/.exec(m.beat||'');const p=Number(m.progress);if(!match||!Number.isFinite(p))return;
    stop();state.stage=Number(match[1]);state.progress=clamp(p);if(m.type==='set-view'&&!m.keepCamera)setView('iso');const d=update();send({type:m.type==='set-view'?'applied':'progress-applied',requestId:m.requestId,stage:state.stage,progress:state.progress,teachingState:{steel:d.steel,fill:d.fill,hardened:d.hardened,unload:d.unload,qualitative:true}});
  });
  const dimensionProbe={span:Math.abs(-30-30),rise:archZ(0)-archZ(30),wallThickness:.6-.58,deckWidth:8,ribSpacing:6};
  window.cfstDemo={state,update,setStage,setView,stop,contract,manifest,dimensionProbe,scene,camera,renderer,derived,inventory:()=>({steel:steelPieces.filter(v=>v.mesh.visible).length,core:corePieces.filter(v=>v.mesh.visible).length,supports:falsework.filter(v=>v.group.visible).length,columns:columns.filter(v=>v.group.visible).length,decks:deckPieces.filter(v=>v.group.visible).length,vehicles:carGroups.filter(v=>v.group.visible).length,cross:crossPieces.filter(v=>v.group.visible).length})};
  new ResizeObserver(resize).observe(viewport);resize();setView('iso');update();requestAnimationFrame(animate);
  requestAnimationFrame(()=>send({type:'ready',renderer:'cfst',qualitative:true}));
})();
