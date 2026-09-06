import * as THREE from '../../interactive/vendor/three.module.js';
import {vehicleAsset} from './vehicle-asset-data.js';
export function physicalDeck(group,result,mode,point,overview=false){
 const q=result.p,o=result[mode],length=o.nx/q.n*q.L,B=q.B,labels=[],pick=[];
 function box(parent,x,y,z,sx,sy,sz,c,opacity=1){const m=new THREE.Mesh(new THREE.BoxGeometry(sx,sy,sz),new THREE.MeshStandardMaterial({color:c,roughness:.8,transparent:opacity<1,opacity}));m.position.set(x,y,z);parent.add(m);return m;}
 // The girders illustrate the vertical support lines used by the plate model.
 function girder(x,z,len,alongX=false){const g=new THREE.Group();g.position.set(x,-.43,z);if(alongX)g.rotation.y=Math.PI/2;group.add(g);box(g,0,0,0,.13,.5,len,0x527784);box(g,0,.25,0,.5,.1,len,0x789aa5);box(g,0,-.25,0,.5,.1,len,0x789aa5);}
 for(let x=0;x<=length+.001;x+=q.L)girder(x,-B/2,B+.5);
 if(mode==='simple'&&q.edgeSupport!=='simple'){box(group,1.5*q.L+.025,-q.t/2,-B/2,q.L-.05,q.t,B,0xd6cebc);girder(2*q.L,-B/2,B+.5);labels.push({text:'断开的右跨 · 无轮载',at:new THREE.Vector3(1.5*q.L,0,-B/2),kind:'edge'});}
 if(q.edgeSupport==='simple'){
  // Transverse diaphragms have a different physical role and appearance from main girders.
  for(const z of [0,-B])box(group,length/2,-.43,z,length,.58,.14,0xb28d62);
  labels.push({text:'横隔板',at:new THREE.Vector3(length/2,-.6,0),kind:'support'});
 }
 // Give the flat shell an identifiable slab thickness; side faces follow nodal w.
 const perimeter=[];for(let i=0;i<=o.nx;i++)perimeter.push(point(i,0));for(let j=1;j<=q.n;j++)perimeter.push(point(o.nx,j));for(let i=o.nx-1;i>=0;i--)perimeter.push(point(i,q.n));for(let j=q.n-1;j>=0;j--)perimeter.push(point(0,j));
 const side=[];for(let i=0;i<perimeter.length;i++){const a=perimeter[i],b=perimeter[(i+1)%perimeter.length],c=a.clone().add(new THREE.Vector3(0,-q.t,0)),d=b.clone().add(new THREE.Vector3(0,-q.t,0));for(const v of [a,b,c,b,d,c])side.push(v.x,v.y,v.z);}
 const sg=new THREE.BufferGeometry();sg.setAttribute('position',new THREE.Float32BufferAttribute(side,3));sg.computeVertexNormals();group.add(new THREE.Mesh(sg,new THREE.MeshStandardMaterial({color:0xc2b7a4,side:THREE.DoubleSide})));
 labels.push({text:q.edgeSupport==='simple'?(mode==='full'?'三道主梁':'两侧主梁'):'主梁托住板',at:new THREE.Vector3(length,-.5,-B*.6),kind:'support'});
 labels.push({text:q.edgeSupport==='simple'?(mode==='full'?'连续板 · 两端有横隔板':'四边简支教学模型'):'这里是自由边',at:new THREE.Vector3(length*.35,0,0),kind:'edge'});
 if(mode==='simple'&&q.edgeSupport!=='simple')labels.push({text:'两块板在这里分开',at:new THREE.Vector3(q.L,0,-B/2),kind:'cut'});

 function guide(a,b,text){if(!document.getElementById('showDimensions')?.checked)return;const geo=new THREE.BufferGeometry().setFromPoints([a,b]);group.add(new THREE.Line(geo,new THREE.LineBasicMaterial({color:0x945f28})));for(const v of [a,b]){const g=new THREE.BufferGeometry().setFromPoints([v.clone().add(new THREE.Vector3(0,.09,0)),v.clone().add(new THREE.Vector3(0,-.09,0))]);group.add(new THREE.Line(g,new THREE.LineBasicMaterial({color:0x945f28})));}labels.push({text,at:a.clone().lerp(b,.5),kind:'dimension'});}
 for(let x=0;x<length-.01;x+=q.L)guide(new THREE.Vector3(x,.08,.45),new THREE.Vector3(x+q.L,.08,.45),'主梁间距 2.40 m');
 guide(new THREE.Vector3(length+.45,.08,0),new THREE.Vector3(length+.45,.08,-B),'沿行车方向取 7.20 m');
 if(document.getElementById('showDimensions')?.checked)labels.push({text:'板厚 0.22 m',at:new THREE.Vector3(0,-q.t/2,-B*.5),kind:'dimension'});

 if(!overview){
 const near=q.carX-q.track/2,far=q.carX+q.track/2;
 guide(new THREE.Vector3(0,.06,-(q.carY??B/2)),new THREE.Vector3(near,.06,-(q.carY??B/2)),`左轮到主梁 ${near.toFixed(2)} m`);
 guide(new THREE.Vector3(far,.06,-(q.carY??B/2)),new THREE.Vector3(q.L,.06,-(q.carY??B/2)),`右轮到主梁 ${(q.L-far).toFixed(2)} m`);
 if(q.edgeSupport==='simple'&&document.getElementById('showDimensions')?.checked)labels.push({text:'两道横隔板间距 7.20 m',at:new THREE.Vector3(-.4,.1,-B/2),kind:'dimension'});
 if(document.getElementById('showTransfer')?.checked)o.reactions.girder.forEach((r,i)=>labels.push({text:`主梁 ${i+1}：${(r/1000).toFixed(1)} kN`,at:new THREE.Vector3(i*q.L,-.65,-B*.5),kind:'reaction'}));
 }
 if(document.getElementById('showTransfer')?.checked&&!overview&&q.edgeSupport==='simple')labels.push({text:`横隔板支承合计 ${(o.reactions.diaphragm.reduce((a,b)=>a+b,0)/1000).toFixed(1)} kN`,at:new THREE.Vector3(length/2,-.6,-B),kind:'reaction'});
 if(overview){
  // Context only: show where the analyzed patch sits on a 20 m teaching bridge.
  const W=2*q.L;box(group,W/2,-2.5,-4,32,.08,10,0x73adb4);for(const z of [9,-17])box(group,W/2,-2.4,z,32,.3,16,0xb6c5a5);for(let z=-13;z<6;z+=1.5)box(group,q.L,.025,z,.07,.012,.65,0xf1ead6);
  box(group,W/2,-q.t/2,3,W,q.t,6,0x9caeb4);box(group,W/2,-q.t/2,-10.6,W,q.t,6.8,0x9caeb4);
  if(mode==='simple')box(group,1.5*q.L,-q.t/2,-B/2,q.L,q.t,B,0x9caeb4);
  for(const x of [-.3,W+.3]){box(group,x,-q.t/2,-4,.6,q.t,20,0x9caeb4);box(group,x,.35,-4,.09,.7,20,0x55717c);}
  for(const x of [0,q.L,2*q.L])girder(x,-4,20);
  for(const z of [5.5,-13.5]){box(group,W/2,-1.05,z,W+.8,.65,.55,0x74858a);for(const x of [.6,W-.6])box(group,x,-2.2,z,.6,2,.65,0x9ba8a9);}
  const outline=[new THREE.Vector3(0,.035,0),new THREE.Vector3(length,.035,0),new THREE.Vector3(length,.035,-B),new THREE.Vector3(0,.035,-B),new THREE.Vector3(0,.035,0)];group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(outline),new THREE.LineBasicMaterial({color:0xe28e30})));
  labels.length=0;labels.push({text:'橙框：取这块桥面来看',at:new THREE.Vector3(length/2,.1,0),kind:'dimension'},{text:'整桥示意 · 20 m',at:new THREE.Vector3(W/2,0,-13.5),kind:'dimension'});
 }
 const car=new THREE.Group();group.add(car);car.position.x=q.carX;
 function height(x,y){const i=Math.max(0,Math.min(o.nx,Math.round(x/q.L*q.n))),j=Math.max(0,Math.min(q.n,Math.round(y/B*q.n)));return point(i,j).y;}
 const base=height(q.carX,q.carY??B/2);car.position.y=base;
 for(const part of vehicleAsset){
  const wheel=part.name.startsWith('wheel-'),cx=part.center[0]*1.8,cy=(q.carY??B/2)+(part.center[2]-.2)*1.8;
  const shift=wheel?height(q.carX+cx,cy)-base:0,positions=[],colors=[];
  for(let i=0;i<part.positions.length;i+=3){positions.push(part.positions[i]*1.8,part.positions[i+1]*1.8+shift,-(q.carY??B/2)-(part.positions[i+2]-.2)*1.8);const c=new THREE.Color().setRGB(...part.colors.slice(i,i+3)).convertSRGBToLinear();colors.push(c.r,c.g,c.b);}
  const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geometry.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));geometry.computeVertexNormals();
  const m=new THREE.Mesh(geometry,new THREE.MeshStandardMaterial({vertexColors:true,roughness:.75,side:THREE.DoubleSide}));m.name='kenney-'+part.name;car.add(m);pick.push(m);
 }
 for(const w of result.wheels){
  const z=-w.y,h=height(w.x,w.y);
  const contact=box(car,w.x-q.carX,h+.013-base,z,.35,.018,.25,0xe36f42,.85);pick.push(contact);
  if(overview)continue;
  const arrowLength=1.6+.4*w.force/30000,arrow=new THREE.ArrowHelper(new THREE.Vector3(0,-1,0),new THREE.Vector3(w.x-q.carX,h+arrowLength+.07-base,z),arrowLength,0xba4c2e,.16,.07);for(const m of [arrow.line.material,arrow.cone.material]){m.depthTest=false;}arrow.renderOrder=3;car.add(arrow);
  labels.push({text:`↓ ${(w.force/1000).toFixed(0)} kN`,at:new THREE.Vector3(w.x,h+arrowLength+.13,w.y*-1),kind:'load'});
 }
 if(document.getElementById('hideVehicle')?.checked&&!overview)car.children.filter(x=>x.name.startsWith('kenney-')).forEach(x=>x.visible=false);
 return {car,pick,labels};
}

export function installStoryUI(){
 document.body.classList.add('story-mode');
 if(new URLSearchParams(location.search).get('lesson')==='planar')document.body.classList.add('plate-introduction');
 const task=document.createElement('div');task.id='storyIntro';task.innerHTML=`<p class="story-kicker">连续桥面板 · 轮载实验</p><h1>车轮向下压，<br>桥面也可能向上翘吗？</h1><p class="story-lead">一整块桥面，跨在三道主梁上。小车停在左跨；右跨没有车。</p><p>右边没有车，它会下沉、不动，还是向上翘？先选一个判断，再显示变形。</p><div class="guess"><button data-guess="down">也往下沉</button><button data-guess="still">几乎不动</button><button data-guess="up">会往上翘</button></div><button id="reveal" class="story-primary">显示变形，核对判断</button><p id="storyHint">可以先旋转，看清车轮和板下面的主梁。</p><div class="story-steps"><button data-case="continuous">① 一整块板</button><button data-case="cut">② 中间断开试试</button><button data-case="four">③ 换成四边托住</button><button data-case="continuous-four">两跨连续，同时设横隔板</button></div><details><summary>为什么这样设场景？</summary><p>根据教材“桥面板、横隔构件与局部受力”设置：桥面板把轮载传给主梁，连续性与边缘约束会改变响应。这里用可看清四轮的小车说明作用位置；参数为教学设置，不对应某辆规范车辆。</p></details><button id="expert" class="secondary">再看计算与 10 个练习 →</button>`;
 document.querySelector('.tasks').prepend(task);
 const panel=document.createElement('div');panel.id='storyControls';panel.innerHTML=`<h2>先只改一件事</h2><label>把小车挪到哪里？<input id="carX" type="range" min="1" max="1.4" step="0.05" value="1.2"></label><div class="story-nudge"><button id="carLeft">← 挪一点</button><button id="carRight">挪一点 →</button></div><p class="muted">也可以直接拖动车身，松开后更新计算。</p><label>每个车轮压多重？<select id="wheelForce"><option value="15000">15 kN / 轮</option><option value="30000" selected>30 kN / 轮</option><option value="45000">45 kN / 轮</option></select></label><p id="wheelTotal">四轮合计 120 kN</p><button id="underneath">看看板下面</button><label class="story-check"><input id="showMesh" type="checkbox"> 叠上计算网格</label><label class="story-check"><input id="showColors" type="checkbox"> 用颜色区分上下变形</label><p id="supportNote">三道主梁提供竖向约束；板连续跨过中梁。两侧边自由，不是四边固结。</p><details><summary>尺寸、边界和荷载</summary><p>跨向 x：主梁间距 2.40 m；沿主梁取 7.20 m 长板段；板厚 0.22 m。车辆等比例缩放：轮距 1.62 m、轴距 2.916 m，为本页教学设置。四个橙色矩形是轮胎接触区。每个接触面 0.35×0.25 m，合力等于该轮读数。E=34 GPa，ν=0.2。主梁在本例中只提供竖向约束，不模拟主梁本身的挠曲。</p><p>本场景采用双向竖向约束。若实际连接脱空，需另设接触条件。车体用于辨认轮位，未求解车辆悬架与动力。</p></details>`;
 document.querySelector('.parameters').prepend(panel);
 const back=document.createElement('button');back.id='backStory';back.textContent='回到小车场景';document.querySelector('.toolbar').append(back);
 const nav=document.createElement('div');nav.id='sceneViews';nav.innerHTML='<button id="wholeBridge">整桥：车在哪里</button><button id="localPlate">放大橙框，看局部板</button>';document.querySelector('.toolbar').prepend(nav);
 const moving=document.createElement('label');moving.innerHTML='沿行车方向挪车 / m<input id="carY" type="range" min="1.8" max="5.4" step="0.3" value="3.6">';document.getElementById('wheelTotal').before(moving);
 const display=document.createElement('div');display.innerHTML='<label class="story-check"><input id="showDimensions" type="checkbox"> 标出尺寸和轮距</label><label class="story-check"><input id="autoShape" type="checkbox" checked> 自动放大，看清弯曲形状</label><label class="story-check"><input id="hideVehicle" type="checkbox"> 隐去车身，只看轮载</label><p class="muted">自动放大时，各方案倍数可能不同。比较变形大小，请看 mm 读数；取消后可用相同倍数比较。</p>';document.getElementById('underneath').after(display);const transfer=document.createElement('div');transfer.innerHTML='<label class="story-check"><input id="showTransfer" type="checkbox"> 看力传给哪道主梁</label><details><summary>怎样从这里想到横向分布？</summary><p>先看轮载位置，再看桥面如何向两侧传力，最后看各道主梁收到多少力。图中反力正值表示向上托板，负值表示连接需要向下拉住板；采用可双向传力的理想约束，未模拟脱空。反力属于本局部板的理想支承线；真实桥梁的横向分配还要让主梁、横隔板一起变形，不能将这里的比例直接作为规范横向分布系数。</p><p>“响应范围”按当前最大竖向位移的10%标示，仅帮助观察远近变化；它不是铺装荷载扩散角，也不是规范有效分布宽度。横隔板存在时，它也分担支承反力。交点反力在本页计入主梁，只是统计分组，不能识别实桥交点在两个构件间的真实分担。</p></details>';display.after(transfer);document.getElementById('showColors').parentElement.lastChild.textContent=' 显示桥面响应范围';
 const basis=document.createElement('details');basis.innerHTML='<summary>这些尺寸从哪里来？</summary><p>教材第4章“任务与教学参数”：主梁间距 2.40 m、板厚 0.220 m、E=34 GPa、ν=0.20。沿桥取 7.20 m（3倍板跨）作为局部范围。</p><p>整桥长20 m、两侧各0.60 m悬臂，以及车辆轮距1.62 m、轴距2.916 m，均为位置演示的教学设置。车辆等比例缩放，不代表规范车辆。</p><p>本实验只施加四轮荷载，总力默认120 kN；教材1 m板带算例另含5.50 kN/m均布作用，不能把两个算例的位移直接视作同一答案。外部整桥不参与这次局部求解。</p><a href="../chapters/ch03.html" target="_blank">查看教材梁桥章</a>';document.getElementById('storyControls').append(basis);
 const profile=document.createElement('div');profile.id='plateProfile';profile.innerHTML='<p>穿过车辆中心的横向截面 · 虚线是原形</p><svg viewBox="0 0 600 120" aria-label="板的横向变形剖面"></svg>';document.querySelector('.visual').append(profile);

}
