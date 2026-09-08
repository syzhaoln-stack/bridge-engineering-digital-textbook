import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';

const $=selector=>document.querySelector(selector);
const MODEL='../../assets/publication/blender-bridge/models/highway_t_girder.glb?v=rebar-20260907';
const LABELS={'01_Girders':'预制 T 梁','02_Diaphragms':'横隔板 / 连续段','03_Deck':'桥面 / 湿接缝','04_Bearings':'支座 / 垫石','05_Substructure':'墩台 / 盖梁','06_Foundations':'桩基 / 承台','07_Furniture':'护栏 / 排水 / 伸缩缝','08_Rebar':'代表性配筋 / 孔道','09_Markings':'道路标线'};
const EXPLOSION={'06_Foundations':-3,'05_Substructure':0,'04_Bearings':1,'01_Girders':3,'02_Diaphragms':5,'08_Rebar':7,'03_Deck':10,'07_Furniture':13,'09_Markings':10};
// glTF coordinates: X along the bridge; Y up; Z across the bridge.
// Presets only filter visibility and move the camera. Model geometry is unchanged.
const PRESETS={
 whole:{title:'整座桥',note:'先看桥面、主梁和墩柱的位置，再选择一个局部。',direction:[1,.55,1.2],accept:()=>true},
 span:{title:'一幅桥的中间一跨',note:'移开铺装和湿接缝，看看五片主梁之间，横隔板怎样连接。',direction:[1,.65,1.15],accept:name=>/^C1_S2_(Girder\d+|Diaphragm\d+_\d+)$/.test(name)||name.startsWith('DiaphragmClosure_0_1_')||name.startsWith('FormJoint_0_1_')},
 underside:{title:'从梁底看',note:'向上看主梁与横隔板的交接；拖动模型，还可以换一个方向。',direction:[1,-.55,1.15],accept:name=>PRESETS.span.accept(name)},
 pier:{title:'墩与基础',note:'这是一幅桥的一处桥墩：盖梁下是两根墩柱，承台下是六根桩。',direction:[1,.35,1.2],accept:name=>name.startsWith('C1_Pier30_')||name.startsWith('PierFormRing_0_30_')}
};
const canvas=$('#canvas'),stage=$('#stage');
let renderer,scene,camera,controls,root,selected,oldMaterial,boxHelper,loadPromise;
let currentPreset='whole',isolatedMesh=null,framePending=false,lastFrame=0,startPointer,loading=false;
const groups=new Map(),meshes=[],originalGroupPositions=new Map(),originalMeshPositions=new Map(),enabledGroups=new Map();
const hiddenMeshes=new Set();
const raycaster=new THREE.Raycaster();
function init(){
 if(renderer)return;
 renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:false});
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1;
 scene=new THREE.Scene();scene.background=new THREE.Color('#e8eff4');camera=new THREE.PerspectiveCamera(42,1,.03,1500);
 const sky=document.createElement('canvas');sky.width=512;sky.height=256;
 const ctx=sky.getContext('2d'),gradient=ctx.createLinearGradient(0,0,0,256);
 gradient.addColorStop(0,'#a6bacb');gradient.addColorStop(.36,'#ffffff');gradient.addColorStop(.58,'#c4ced5');gradient.addColorStop(1,'#576c7a');ctx.fillStyle=gradient;ctx.fillRect(0,0,512,256);
 const texture=new THREE.CanvasTexture(sky);texture.mapping=THREE.EquirectangularReflectionMapping;texture.colorSpace=THREE.SRGBColorSpace;
 const pmrem=new THREE.PMREMGenerator(renderer);scene.environment=pmrem.fromEquirectangular(texture).texture;scene.environmentIntensity=.6;texture.dispose();pmrem.dispose();
 scene.add(new THREE.HemisphereLight(0xe6f0ff,0x697783,1.3));
 for(const [position,color,intensity] of [[[50,80,30],0xfff3df,2],[[-30,30,-50],0xc8dfff,.9],[[45,-25,25],0xd7e7f0,.6]]){const light=new THREE.DirectionalLight(color,intensity);light.position.set(...position);scene.add(light);}
 controls=new OrbitControls(camera,canvas);controls.enableDamping=!matchMedia('(prefers-reduced-motion: reduce)').matches;controls.dampingFactor=.12;controls.minDistance=.5;controls.maxDistance=600;controls.autoRotateSpeed=.8;controls.addEventListener('change',requestRender);
 new ResizeObserver(resize).observe(stage);resize();
 canvas.addEventListener('pointerdown',event=>startPointer={x:event.clientX,y:event.clientY,button:event.button});
 canvas.addEventListener('pointerup',event=>{if(startPointer?.button===0&&Math.hypot(event.clientX-startPointer.x,event.clientY-startPointer.y)<5)pick(event.clientX,event.clientY);});
 canvas.addEventListener('contextmenu',event=>event.preventDefault());
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)requestRender();});
}
function resize(){
 if(!renderer)return;
 const width=stage.clientWidth,height=stage.clientHeight,direction=controls?camera.position.clone().sub(controls.target):null;
 renderer.setSize(width,height,false);camera.aspect=width/Math.max(height,1);camera.updateProjectionMatrix();
 if(root&&direction?.lengthSq()>0)frameBox(visibleBounds(),direction);else requestRender();
}
function requestRender(){if(framePending||!renderer||document.hidden)return;framePending=true;requestAnimationFrame(draw);}
function draw(time){framePending=false;controls.update(Math.min((time-lastFrame)/1000,.05));lastFrame=time;if(boxHelper)boxHelper.update();renderer.render(scene,camera);if(controls.autoRotate)requestRender();}
function groupOf(mesh){for(let node=mesh;node;node=node.parent)if(LABELS[node.name])return node.name;return '';}
function meshName(mesh){return mesh.userData.component_id||mesh.name;}
function isVisible(object){for(let parent=object;parent;parent=parent.parent)if(!parent.visible)return false;return true;}
function scopeAccepts(mesh){return PRESETS[currentPreset].accept(meshName(mesh));}
function applyVisibility(){
 if(!root)return;
 // Reset every parent and child first: a previous isolation must never survive reset.
 root.traverse(node=>node.visible=true);
 for(const mesh of meshes)mesh.visible=scopeAccepts(mesh)&&enabledGroups.get(groupOf(mesh))!==false&&!hiddenMeshes.has(mesh)&&(!isolatedMesh||mesh===isolatedMesh);
 if(selected&&!isVisible(selected))clearSelected();
 syncGroups();requestRender();
}
function syncGroups(){
 for(const input of $('#groups').querySelectorAll('input')){
  const key=input.dataset.group,count=meshes.filter(mesh=>groupOf(mesh)===key&&scopeAccepts(mesh)).length;
  input.checked=enabledGroups.get(key)!==false;input.disabled=count===0;
  input.closest('label').classList.toggle('unavailable',count===0);input.closest('label').title=count===0?'当前观察范围内没有这类构件':'';
 }
}
function buildGroups(){
 const box=$('#groups');box.replaceChildren();
 for(const [key] of [...groups].sort(([a],[b])=>a.localeCompare(b))){
  const label=document.createElement('label'),input=document.createElement('input'),text=document.createElement('span');
  input.type='checkbox';input.dataset.group=key;input.checked=true;text.textContent=LABELS[key];
  input.addEventListener('change',()=>{isolatedMesh=null;enabledGroups.set(key,input.checked);applyVisibility();});label.append(input,text);box.append(label);
 }
}
async function loadModel(){
 if(root)return true;if(loadPromise)return loadPromise;
 loading=true;$('#load').disabled=true;$('#load').textContent='正在载入…';$('#status').textContent='正在读取桥梁模型';
 loadPromise=(async()=>{
  try{
   init();const gltf=await new GLTFLoader().loadAsync(MODEL,event=>{if(event.total)$('#status').textContent=`读取模型 ${Math.round(100*event.loaded/event.total)}%`;});
   root=gltf.scene;scene.add(root);
   root.traverse(object=>{if(LABELS[object.name]){groups.set(object.name,object);originalGroupPositions.set(object.name,object.position.clone());enabledGroups.set(object.name,true);}if(object.isMesh){meshes.push(object);originalMeshPositions.set(object.uuid,object.position.clone());}});
   buildGroups();for(const id of ['save','reset','all','explode','side','top','end','fit','spin'])$('#'+id).disabled=false;
   $('#cover').classList.add('hidden');$('#status').textContent='模型已打开';applyPreset(currentPreset);requestRender();return true;
  }catch(error){$('#load').disabled=false;$('#load').textContent='重试载入';$('#status').textContent='载入失败，请通过教材网站或本地网页服务打开';console.error(error);return false;}
  finally{loading=false;loadPromise=null;}
 })();return loadPromise;
}
function clearSelected(){
 if(selected){for(const material of Array.isArray(selected.material)?selected.material:[selected.material])material.dispose();selected.material=oldMaterial;}
 selected=null;oldMaterial=null;
 if(boxHelper){scene.remove(boxHelper);boxHelper.dispose();boxHelper=null;}
 $('#focus').disabled=true;$('#isolate').disabled=true;$('#hide').disabled=true;$('#detail').textContent='单击模型中的构件，查看它的名称。';
}
function visibleBounds(){const box=new THREE.Box3();root?.updateMatrixWorld(true);for(const mesh of meshes)if(isVisible(mesh))box.expandByObject(mesh);return box;}
function frameBox(box,direction){
 if(box.isEmpty())return;
 const center=box.getCenter(new THREE.Vector3()),dir=direction.clone().normalize();
 const right=new THREE.Vector3().crossVectors(camera.up,dir).normalize(),up=new THREE.Vector3().crossVectors(dir,right).normalize();
 const tanV=Math.tan(THREE.MathUtils.degToRad(camera.fov)/2),tanH=tanV*camera.aspect;
 let distance=2;
 for(const x of [box.min.x,box.max.x])for(const y of [box.min.y,box.max.y])for(const z of [box.min.z,box.max.z]){
  const vector=new THREE.Vector3(x,y,z).sub(center),depth=vector.dot(dir);
  distance=Math.max(distance,depth+Math.abs(vector.dot(right))/tanH*1.15,depth+Math.abs(vector.dot(up))/tanV*1.15);
 }
 // Flush residual damping before placing a deliberate preset camera.
 const damping=controls.enableDamping;controls.enableDamping=false;controls.update();
 controls.target.copy(center);camera.position.copy(center).addScaledVector(dir,distance);camera.near=Math.max(.02,Math.min(.25,distance/100));camera.updateProjectionMatrix();controls.update();controls.enableDamping=damping;requestRender();
}
function setExplosion(value){
 const amount=Math.max(0,Math.min(100,Number(value)||0));$('#explode').value=String(amount);$('#amount').textContent=`${amount}%`;
 if(!root)return;
 for(const [key,object] of groups)object.position.copy(originalGroupPositions.get(key)).add(new THREE.Vector3(0,(EXPLOSION[key]||0)*amount/100,0));
 root.updateMatrixWorld(true);requestRender();
}
function applyPreset(key){
 if(!PRESETS[key])throw new Error('Unknown preset: '+key);
 currentPreset=key;$('#view-title').textContent=PRESETS[key].title;$('#view-note').textContent=PRESETS[key].note;
 for(const button of document.querySelectorAll('[data-preset]'))button.setAttribute('aria-pressed',String(button.dataset.preset===key));
 if(!root)return;
 clearSelected();isolatedMesh=null;hiddenMeshes.clear();for(const key of groups.keys())enabledGroups.set(key,true);
 controls.autoRotate=false;$('#spin').setAttribute('aria-pressed','false');setExplosion(0);applyVisibility();frameBox(visibleBounds(),new THREE.Vector3(...PRESETS[key].direction));
}
function friendlyName(name){
 let match;if((match=name.match(/^C(\d+)_S(\d+)_Girder(\d+)$/)))return `第 ${match[1]} 幅 · 第 ${match[2]} 跨 · 第 ${match[3]} 片 T 梁`;
 if((match=name.match(/^C(\d+)_S(\d+)_Diaphragm(\d+)_(\d+)$/)))return `第 ${match[1]} 幅 · 第 ${match[2]} 跨\n第 ${match[3]} 道横隔板 · 第 ${match[4]} 梁间`;
 if(name.startsWith('DiaphragmClosure_'))return '横隔板之间的现浇连接段';
 if(name.endsWith('_PileCap'))return '承台';if(name.includes('_Pile'))return '桩';if(name.endsWith('_Cap'))return '盖梁';if(name.includes('_Column'))return '墩柱';if(name.includes('_TieBeam'))return '系梁';
 return LABELS[groupOf(selected)]||'桥梁构件';
}
function selectMesh(mesh){
 clearSelected();selected=mesh;oldMaterial=mesh.material;
 const highlight=material=>{const copy=material.clone();if(copy.emissive){copy.emissive.set('#b7770c');copy.emissiveIntensity=.42;}else copy.color?.set('#dfab39');return copy;};
 mesh.material=Array.isArray(oldMaterial)?oldMaterial.map(highlight):highlight(oldMaterial);
 boxHelper=new THREE.BoxHelper(mesh,0xc78c21);scene.add(boxHelper);
 $('#detail').textContent=friendlyName(meshName(mesh));$('#detail').title=meshName(mesh);$('#focus').disabled=false;$('#isolate').disabled=false;$('#hide').disabled=false;requestRender();
}
function pick(x,y){
 if(!root)return;const rect=canvas.getBoundingClientRect(),point=new THREE.Vector2((x-rect.left)/rect.width*2-1,-(y-rect.top)/rect.height*2+1);
 root.updateMatrixWorld(true);raycaster.setFromCamera(point,camera);const hit=raycaster.intersectObjects(meshes.filter(isVisible),false)[0];
 if(hit)selectMesh(hit.object);else{clearSelected();requestRender();}
}
async function savePNG(){
 if(!renderer||!root)return;
 $('#save').disabled=true;
 try{
  renderer.render(scene,camera);
  const blob=await new Promise((resolve,reject)=>canvas.toBlob(value=>value?resolve(value):reject(new Error('PNG export failed')),'image/png'));
  const url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download=`bridge-${currentPreset}-${new Date().toISOString().replace(/[:.]/g,'-')}.png`;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  $('#status').textContent='已保存当前视角（不含尺寸标注）';
 }catch(error){$('#status').textContent='保存失败，请重试';console.error(error);}finally{$('#save').disabled=false;requestRender();}
}
$('#load').onclick=loadModel;
for(const button of document.querySelectorAll('[data-preset]'))button.onclick=()=>applyPreset(button.dataset.preset);
$('#reset').onclick=()=>applyPreset('whole');$('#all').onclick=()=>applyPreset('whole');
$('#explode').oninput=event=>setExplosion(event.target.value);
$('#side').onclick=()=>frameBox(visibleBounds(),new THREE.Vector3(0,.03,1));
$('#top').onclick=()=>frameBox(visibleBounds(),new THREE.Vector3(0,1,.001));
$('#end').onclick=()=>frameBox(visibleBounds(),new THREE.Vector3(1,0,0));
$('#fit').onclick=()=>frameBox(visibleBounds(),camera.position.clone().sub(controls.target));
$('#focus').onclick=()=>{if(selected)frameBox(new THREE.Box3().setFromObject(selected),camera.position.clone().sub(controls.target));};
$('#isolate').onclick=()=>{if(selected){isolatedMesh=selected;applyVisibility();}};
$('#hide').onclick=()=>{if(selected){hiddenMeshes.add(selected);isolatedMesh=null;clearSelected();applyVisibility();}};
$('#spin').onclick=event=>{controls.autoRotate=!controls.autoRotate;event.currentTarget.setAttribute('aria-pressed',String(controls.autoRotate));requestRender();};
$('#save').onclick=savePNG;

// Read-only snapshots support repeatable screenshot and UI checks; no scene objects escape.
window.bridgeAssembly=Object.freeze({
 load:loadModel,
 setPreset:key=>applyPreset(key),
 snapshot:({names=false}={})=>({loaded:!!root,loading,preset:currentPreset,groupCount:groups.size,meshCount:meshes.length,visibleCount:meshes.filter(isVisible).length,selected:selected?meshName(selected):null,explosion:Number($('#explode').value),gridCount:scene?scene.children.filter(object=>object.isGridHelper||object.type==='GridHelper').length:0,meshLocalPositionsIntact:meshes.every(mesh=>mesh.position.equals(originalMeshPositions.get(mesh.uuid))),groupOffsets:[...groups].map(([key,object])=>({name:key,offset:object.position.clone().sub(originalGroupPositions.get(key)).toArray()})),camera:camera?{position:camera.position.toArray(),target:controls.target.toArray()}:null,...(names?{visibleNames:meshes.filter(isVisible).map(meshName)}:{})}),
 projectMesh:name=>{const mesh=meshes.find(mesh=>meshName(mesh)===name);if(!mesh||!camera)return null;const point=new THREE.Box3().setFromObject(mesh).getCenter(new THREE.Vector3()).project(camera),rect=canvas.getBoundingClientRect();return {x:rect.left+(point.x+1)*rect.width/2,y:rect.top+(1-point.y)*rect.height/2,visible:isVisible(mesh)};}
});
