import * as THREE from '../../interactive/vendor/three.module.js';
import {OrbitControls} from '../../interactive/vendor/controls/OrbitControls.js';
import {vehicleAsset} from './vehicle-asset-data.js';
import {spanShape} from './transverse-model.mjs';

// Existing scene coordinates: x transverse, y upward, z longitudinal.
// Calculated w is downward-positive; displayed y = y0 - magnification * w.
export function createTransverseScene({host,onMove,onSelect}){
 const scene=new THREE.Scene();scene.background=new THREE.Color('#e5eeea');
 const renderer=new THREE.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));host.prepend(renderer.domElement);
 const camera=new THREE.PerspectiveCamera(40,1,.1,160),controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=true;controls.minDistance=5;controls.maxDistance=75;
 scene.add(new THREE.HemisphereLight(0xffffff,0x647b79,2.3));const sun=new THREE.DirectionalLight(0xffffff,2);sun.position.set(6,13,-10);scene.add(sun);
 const whole=new THREE.Group(),section=new THREE.Group(),guides=new THREE.Group(),truck=new THREE.Group();scene.add(whole,section,guides,truck);
 let result,d,options={},count=0,view='iso',labels=[],movable=[],decks=[],girders=[],diaphragms=[],dragging=false,dragOffset=0,down;
 const material=color=>new THREE.MeshStandardMaterial({color,roughness:.8,side:THREE.DoubleSide});
 function clear(group){group.traverse(o=>{o.geometry?.dispose();if(Array.isArray(o.material))o.material.forEach(m=>m.dispose());else o.material?.dispose();});group.clear();}
 function register(mesh){movable.push({mesh,original:mesh.geometry.attributes.position.array.slice()});return mesh;}
 function box(parent,x,y,z,w,h,l,color,deforms=false,segments=1){const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,l,2,1,segments),material(color));mesh.position.set(x,y,z);parent.add(mesh);if(deforms)register(mesh);return mesh;}
 function line(points,color=0x839c9b,dashed=false){const geometry=new THREE.BufferGeometry().setFromPoints(points.map(p=>new THREE.Vector3(...p))),mat=dashed?new THREE.LineDashedMaterial({color,dashSize:.20,gapSize:.12}):new THREE.LineBasicMaterial({color});const mesh=new THREE.Line(geometry,mat);mesh.computeLineDistances();guides.add(mesh);return mesh;}
 function label(text,x,y,z,kind=''){const el=document.createElement('span');el.className='scene-label '+kind;el.textContent=text;host.append(el);labels.push({el,at:new THREE.Vector3(x,y,z)});}
 function arrow(x,y0,y1,z,color){const len=Math.abs(y1-y0);if(len<.008)return;const sign=Math.sign(y1-y0),shaft=new THREE.Mesh(new THREE.CylinderGeometry(.026,.026,Math.max(.004,len-.09),8),material(color));shaft.position.set(x,(y0+y1)/2-sign*.045,z);guides.add(shaft);const head=new THREE.Mesh(new THREE.ConeGeometry(.10,Math.min(.18,len*.45),10),material(color));head.position.set(x,y1-sign*Math.min(.09,len*.225),z);if(sign<0)head.rotation.z=Math.PI;guides.add(head);}
 function dimension(a,b,text){line([a,b],0x9a7642);const delta=new THREE.Vector3(...b).sub(new THREE.Vector3(...a)).normalize(),tick=Math.abs(delta.x)>.5?[0,0,.2]:[.2,0,0];for(const p of [a,b])line([p.map((v,i)=>v-tick[i]),p.map((v,i)=>v+tick[i])],0x9a7642);label(text,...a.map((v,i)=>(v+b[i])/2));}
 function diaphragm(parent,z){const shape=new THREE.Shape();shape.moveTo(-5.4,-1.25);shape.lineTo(5.4,-1.25);shape.lineTo(5.4,-.26);shape.lineTo(-5.4,-.26);shape.closePath();for(let i=0;i<count-1;i++){const left=result.ys[i]+.35,right=result.ys[i+1]-.35;const hole=new THREE.Path();hole.moveTo(left,-1.02);hole.lineTo(left,-.52);hole.lineTo(right,-.52);hole.lineTo(right,-1.02);hole.closePath();shape.holes.push(hole);}const mesh=new THREE.Mesh(new THREE.ExtrudeGeometry(shape,{depth:.16,bevelEnabled:false}),material(0xb6a17c));mesh.position.z=z-.08;parent.add(mesh);register(mesh);diaphragms.push(mesh);}
 function bridgePart(parent,length,segments){
  const deck=box(parent,0,-.11,0,10.8,.22,length,0x8a9fa5,true,segments);deck.material.transparent=true;decks.push(deck);
  for(const [i,x] of result.ys.entries())for(const [y,w,h] of [[-.83,.2,1.05],[-.29,.7,.12],[-1.37,.6,.14]]){const mesh=box(parent,x,y,0,w,h,length,0x537e89,true,segments);mesh.userData.girder=i;girders.push(mesh);}
 }
 function build(){clear(whole);clear(section);movable=[];decks=[];girders=[];diaphragms=[];count=result.ys.length;
  bridgePart(whole,d.span,40);for(const z of [-d.span/4,0,d.span/4])diaphragm(whole,z);
  for(const z of [-d.span/2,d.span/2]){box(whole,0,-1.72,z,11.5,.42,.8,0x95aaa3);for(const x of result.ys)box(whole,x,-1.48,z,.45,.08,.40,0x425c63);for(const x of [-3.6,3.6])box(whole,x,-2.60,z,.7,1.35,.85,0xb4c0b9);}
  for(const x of [-5.28,5.28])box(whole,x,.18,0,.13,.38,d.span,0x6f898c,true,40);
  bridgePart(section,.34,1);diaphragm(section,0);
 }
 for(const part of vehicleAsset){const positions=[],colors=[];for(let i=0;i<part.positions.length;i+=3){positions.push(part.positions[i]*1.8,part.positions[i+1]*1.8,-(part.positions[i+2]-.2)*1.8);const c=new THREE.Color().setRGB(...part.colors.slice(i,i+3)).convertSRGBToLinear();colors.push(c.r,c.g,c.b);}const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));g.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));g.computeVertexNormals();truck.add(new THREE.Mesh(g,new THREE.MeshStandardMaterial({vertexColors:true,roughness:.75,side:THREE.DoubleSide})));}
 function component(x){if(options.mode==='settlement')return d.centerSettlement;if(options.mode==='rotation')return d.theta*(x-d.stiffnessCenter);return d.u0+d.theta*x;}
 function factor(){return options.revealed&&options.deform?options.scale:0;}
 function displacement(x,z){return component(x)*spanShape(z,d.span)*factor();}
 function applyGeometry(){for(const {mesh,original} of movable){const a=mesh.geometry.attributes.position;for(let i=0;i<a.count;i++){const j=i*3;a.array[j+1]=original[j+1]-displacement(original[j]+mesh.position.x,original[j+2]+mesh.position.z);}a.needsUpdate=true;mesh.geometry.computeVertexNormals();mesh.geometry.computeBoundingSphere();mesh.geometry.computeBoundingBox();}
  const wheelPhi=spanShape(1.458,d.span),tilt=options.mode==='settlement'?0:d.theta*factor()*wheelPhi;truck.position.set(result.carX,-component(result.carX)*factor()*wheelPhi,0);truck.rotation.z=-Math.atan(tilt);
 }
 function drawGuides(){clear(guides);labels.forEach(l=>l.el.remove());labels=[];const cut=view==='section',z=cut?-.32:0;
  if(options.revealed){
   if(options.deform){line([[-5.4,0,z],[5.4,0,z]],0x64827f,true);if(innerWidth>=760)label('未变形的位置',5.4,0,z,'reference-label');
    if(!cut)for(const x of result.ys)line([[x,0,-d.span/2],[x,0,d.span/2]],0x93a9a4,true);
    const steps=Array.from({length:35},(_,i)=>-5.4+i*10.8/34);line(steps.map(x=>[x,-displacement(x,0),z]),0x256d80);
    for(const i of (innerWidth<760?[options.selected]:[...new Set([0,options.selected,count-1])])){const x=result.ys[i],w=component(x);arrow(x,0,-w*factor(),z-.08,w<0?0xa05535:0x256d80);if(!(innerWidth<760&&options.dimensions))label(`${i+1}号梁 ${Math.abs(w)<1e-10?'不升不降':(w<0?'↑ 上移 ':'↓ 下沉 ')+(Math.abs(w)*1000).toFixed(2)+' mm'}`,x,-w*factor(),z-.12);}
    if(options.mode==='total'&&d.insideDeck){line([[d.zeroX,.10,cut?-.7:-4],[d.zeroX,.10,cut?.7:4]],0xa06e29,true);label('不升不降的位置',d.zeroX,.15,cut?.55:3,'zero-label');}
    if(options.mode==='rotation'){line([[d.stiffnessCenter,.1,cut?-.7:-4],[d.stiffnessCenter,.1,cut?.7:4]],0xa06e29,true);label('绕刚度中心看转动分量',d.stiffnessCenter,.15,cut?.55:3,'zero-label');}
   }else label(`${options.selected+1}号主梁`,result.ys[options.selected],-.7,cut?-.4:-6);
   if(!cut)for(const dx of [-.81,.81])for(const wheelZ of [-1.458,1.458]){const x=result.carX+dx,y=-displacement(x,wheelZ);arrow(x,y+3.6,y+.1,wheelZ,0xb16431);}
  }
  if(options.diaphragms){if(cut)label('跨中横隔板',0,-1.3-displacement(0,0),-.35);else for(const [i,dz] of [-d.span/4,0,d.span/4].entries())if(innerWidth>=760||i===1&&!options.dimensions)label(`${i===1?'跨中':'四分点'}横隔板 · 距端 ${(dz+d.span/2).toFixed(0)} m`,-5,-.5-displacement(-5,dz),dz);}
  if(options.dimensions){const dz=cut?-.6:-d.span/2-1;
   if(options.dimensionType==='span'&&!cut){dimension([6.3,0,-d.span/2],[6.3,0,d.span/2],`跨度 L = ${d.span.toFixed(2)} m`);for(let i=0;i<4;i++)dimension([-6.3,0,-d.span/2+i*d.span/4],[-6.3,0,-d.span/2+(i+1)*d.span/4],`${(d.span/4).toFixed(2)} m`);}
   else if(options.dimensionType==='vehicle'&&!cut){dimension([result.carX-.81,.1,-2.3],[result.carX+.81,.1,-2.3],'轮距 1.62 m');dimension([result.carX+1.5,.1,-1.458],[result.carX+1.5,.1,1.458],'轴距 2.916 m');line([[0,.1,-4],[0,.1,4]],0x839c9b,true);if(Math.abs(result.carX)>.01)dimension([0,.12,3],[result.carX,.12,3],`车位偏心 e = ${result.carX.toFixed(2)} m`);else label('车辆合力在桥中线 · e = 0',0,.1,3);}
   else {dimension([-5.4,.5,dz],[5.4,.5,dz],'桥面全宽 B = 10.80 m');dimension([result.ys[0],-.2,dz],[result.ys[1],-.2,dz],`梁距 d = ${(9.6/(count-1)).toFixed(2)} m`);}
  }
 }
 function update(r,deformation,display){result=r;d=deformation;options={...display};if(count!==r.ys.length)build();whole.visible=view!=='section';section.visible=view==='section';truck.visible=!options.hideVehicle;
  for(const deck of decks){deck.material.opacity=options.transparent?.23:1;deck.material.depthWrite=!options.transparent;}
  for(const mesh of diaphragms)mesh.material.color.set(options.diaphragms?0xc88730:0xb6a17c);
  for(const mesh of girders){const i=mesh.userData.girder;mesh.material.color.set(options.revealed?(i===options.selected?0xc78331:r.R[i]< -1e-9?0xaa6654:0x417d8c):0x537e89);}
  applyGeometry();drawGuides();
 }
 function zoom(){return innerWidth<760?(view==='section'?.65:.36):1;}
 function home(type='iso'){view=type;controls.target.set(0,-.35,0);if(type==='top')camera.position.set(0,28,.01);else if(type==='section')camera.position.set(0,1.5,-23);else if(type==='under')camera.position.set(14,-9,-22);else camera.position.set(15,10,-23);camera.zoom=zoom();camera.updateProjectionMatrix();controls.update();if(result)update(result,d,options);}
 const ray=e=>{const r=renderer.domElement.getBoundingClientRect(),rc=new THREE.Raycaster();rc.setFromCamera(new THREE.Vector2(2*(e.clientX-r.left)/r.width-1,1-2*(e.clientY-r.top)/r.height),camera);return rc;};
 renderer.domElement.addEventListener('pointerdown',e=>{down={x:e.clientX,y:e.clientY};if(truck.visible&&ray(e).intersectObject(truck,true).length){dragging=true;controls.enabled=false;const v=new THREE.Vector3();ray(e).ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0,1,0),-truck.position.y),v);dragOffset=v.x-result.carX;renderer.domElement.setPointerCapture(e.pointerId);}},true);
 renderer.domElement.addEventListener('pointermove',e=>{if(!dragging)return;const v=new THREE.Vector3();if(ray(e).ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0,1,0),-truck.position.y),v))onMove(v.x-dragOffset);});
 renderer.domElement.addEventListener('pointerup',e=>{if(dragging){dragging=false;controls.enabled=true;return;}if(!down||Math.hypot(e.clientX-down.x,e.clientY-down.y)>5)return;const hit=ray(e).intersectObjects(girders.filter(m=>m.parent.visible),true)[0];if(hit)onSelect(hit.object.userData.girder);});renderer.domElement.addEventListener('pointercancel',()=>{dragging=false;controls.enabled=true;});
 host.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight'].includes(e.key))return;e.preventDefault();const delta=camera.position.clone().sub(controls.target).applyAxisAngle(new THREE.Vector3(0,1,0),e.key==='ArrowLeft'?.15:-.15);camera.position.copy(controls.target).add(delta);controls.update();});
 new ResizeObserver(()=>{camera.aspect=host.clientWidth/host.clientHeight;camera.zoom=zoom();camera.updateProjectionMatrix();renderer.setSize(host.clientWidth,host.clientHeight,false);if(result)drawGuides();}).observe(host);
 function frame(){requestAnimationFrame(frame);controls.update();const occupied=[];for(const l of labels){const p=l.at.clone().project(camera);l.el.style.display=Math.abs(p.z)>1?'none':'block';const width=l.el.offsetWidth,height=l.el.offsetHeight,half=width/2,x=Math.max(half+8,Math.min(host.clientWidth-half-8,(p.x*.5+.5)*host.clientWidth));let y=(-p.y*.5+.5)*host.clientHeight;for(let pass=0;pass<labels.length;pass++)for(const r of occupied)if(x-half<r.right+4&&x+half>r.left-4&&y>r.top-4&&y-height<r.bottom+4)y=r.top-6;occupied.push({left:x-half,right:x+half,top:y-height,bottom:y});l.el.style.left=x+'px';l.el.style.top=y+'px';}renderer.render(scene,camera);}home();frame();
 return {update,home,screenStep(){return new THREE.Vector3(1,0,0).project(camera).x>new THREE.Vector3(0,0,0).project(camera).x?.2:-.2;},project(x,z=0){const v=new THREE.Vector3(x,result?-displacement(x,z):0,z).project(camera),r=renderer.domElement.getBoundingClientRect();return{x:r.left+(v.x+1)*r.width/2,y:r.top+(1-v.y)*r.height/2};},debug(){return{view,terrainCount:0,span:d.span,diaphragmZ:[-d.span/4,0,d.span/4],supportZ:[-d.span/2,d.span/2],dimensions:options.dimensions,scale:factor(),sectionVisible:section.visible,midspanY:result.ys.map(x=>-displacement(x,0)),endY:result.ys.map(x=>-displacement(x,d.span/2)),zeroX:d.zeroX,geometry:movable.filter(v=>v.mesh.parent===whole).map(({mesh,original})=>{let max=0;for(let i=0;i<original.length;i+=3)max=Math.max(max,Math.abs(mesh.geometry.attributes.position.array[i+1]-original[i+1]));return max;})};}};
}
