import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';

const $=s=>document.querySelector(s);
const MODEL_MANIFEST='../../assets/publication/blender-train/models/train-stream.json';
const LABELS={'01_Body':'车体与鼻锥','02_Livery':'涂装与标识','03_Glass':'风挡、车窗与灯具','04_Doors':'车门与密封','05_Bogies':'转向架与轮对','06_Underfloor':'车下设备','07_Roof':'受电弓与车顶设备','08_Interior':'座椅与驾驶台（示意）','09_Gangway':'车间连接','10_Track':'钢轨与轨道环境'};
const EXPLOSION={'01_Body':[0,4,0],'02_Livery':[0,4,0],'03_Glass':[0,6,2],'04_Doors':[0,3,4],'05_Bogies':[0,0,0],'06_Underfloor':[0,1,-3],'07_Roof':[0,8,0],'08_Interior':[0,1,0],'09_Gangway':[0,4,0],'10_Track':[0,0,0]};
const SHELL=['01_Body','02_Livery','03_Glass','04_Doors','07_Roof','09_Gangway'];
const PRESETS={
 whole:{title:'两节车全貌',note:'先找到车体、车轮和受电弓，再选一个部位靠近看。轨道默认隐藏，可在构件分组里打开。',direction:[-.7,.55,1.4],accept:()=>true},
 nose:{title:'靠近车头',note:'看风挡、雨刷和车灯的位置。隐藏外壳，还能看到后面的驾驶台。',direction:[-1,.35,1.05],accept:(name)=>name.startsWith('C1_')||name.startsWith('Bogie_00_'),frame:name=>/^C1_.*(Nose|Windshield|CabSideWindow|Lamp)/.test(name)},
 bogie:{title:'车轮上面有什么',note:'这是头车前方的一副转向架。点一点车轮、车轴和弹簧，看看它们怎样排列。',direction:[-.9,.48,1.35],accept:name=>name.startsWith('Bogie_00_')},
 interior:{title:'看进车厢',note:'移开头车的外壳，只看地板、座椅和驾驶台。这里的座椅布置是示意。',direction:[-.38,1.05,1.25],accept:(name,group)=>group==='08_Interior'&&name.startsWith('C1_')}
};
const canvas=$('#canvas'),stage=$('#stage'),meshes=[],groups=new Map(),enabledGroups=new Map(),groupOrigins=new Map(),meshOrigins=new Map(),hidden=new Set();
let renderer,scene,camera,controls,root,selected,oldMaterial,boxHelper,loadPromise,currentPreset='whole',isolatedMesh=null,framePending=false,lastFrame=0,startPointer,loading=false,transport=null;
const raycaster=new THREE.Raycaster();
function init(){
 if(renderer)return;
 renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:false});renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1;
 scene=new THREE.Scene();scene.background=new THREE.Color('#e8eff4');camera=new THREE.PerspectiveCamera(42,1,.02,1500);
 const sky=document.createElement('canvas');sky.width=512;sky.height=256;const ctx=sky.getContext('2d'),gradient=ctx.createLinearGradient(0,0,0,256);
 gradient.addColorStop(0,'#a6bacb');gradient.addColorStop(.36,'#ffffff');gradient.addColorStop(.58,'#c4ced5');gradient.addColorStop(1,'#576c7a');ctx.fillStyle=gradient;ctx.fillRect(0,0,512,256);
 const texture=new THREE.CanvasTexture(sky);texture.mapping=THREE.EquirectangularReflectionMapping;texture.colorSpace=THREE.SRGBColorSpace;
 const pmrem=new THREE.PMREMGenerator(renderer);scene.environment=pmrem.fromEquirectangular(texture).texture;scene.environmentIntensity=.6;texture.dispose();pmrem.dispose();
 scene.add(new THREE.HemisphereLight(0xe6f0ff,0x697783,1.3));
 for(const [position,color,intensity]of[[[15,40,30],0xfff3df,2],[[-30,20,-40],0xc8dfff,.9],[[20,-10,20],0xd7e7f0,.55]]){const light=new THREE.DirectionalLight(color,intensity);light.position.set(...position);scene.add(light);}
 controls=new OrbitControls(camera,canvas);controls.enableDamping=!matchMedia('(prefers-reduced-motion: reduce)').matches;controls.dampingFactor=.12;controls.minDistance=.15;controls.maxDistance=500;controls.autoRotateSpeed=.65;controls.listenToKeyEvents(canvas);controls.addEventListener('change',requestRender);
 new ResizeObserver(resize).observe(stage);resize();
 canvas.addEventListener('pointerdown',e=>startPointer={x:e.clientX,y:e.clientY,button:e.button});
 canvas.addEventListener('pointerup',e=>{if(startPointer?.button===0&&Math.hypot(e.clientX-startPointer.x,e.clientY-startPointer.y)<5)pick(e.clientX,e.clientY);});
 canvas.addEventListener('contextmenu',e=>e.preventDefault());document.addEventListener('visibilitychange',()=>{if(!document.hidden)requestRender();});
}
function resize(){if(!renderer)return;const w=stage.clientWidth,h=stage.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/Math.max(h,1);camera.updateProjectionMatrix();if(root)frameBox(presetBounds(),camera.position.clone().sub(controls.target));else requestRender();}
function requestRender(){if(framePending||!renderer||document.hidden)return;framePending=true;requestAnimationFrame(draw);}
function draw(time){framePending=false;controls.update(Math.min((time-lastFrame)/1000,.05));lastFrame=time;boxHelper?.update();renderer.render(scene,camera);if(controls.autoRotate)requestRender();}
function groupOf(mesh){return mesh.userData.trainGroup||'';}
function nameOf(mesh){return mesh.userData.component_id||mesh.name;}
function isVisible(mesh){for(let p=mesh;p;p=p.parent)if(!p.visible)return false;return true;}
function scopeAccepts(mesh){return PRESETS[currentPreset].accept(nameOf(mesh),groupOf(mesh));}
function bounds(list){const box=new THREE.Box3();root?.updateMatrixWorld(true);for(const mesh of list)box.expandByObject(mesh);return box;}
function visibleMeshes(){return meshes.filter(isVisible);}
function visibleBounds(){return bounds(visibleMeshes());}
function presetBounds(){
 const list=visibleMeshes(),frame=PRESETS[currentPreset].frame;
 if(frame&&!isolatedMesh){const focused=list.filter(m=>frame(nameOf(m)));if(focused.length)return bounds(focused);}
 return bounds(list);
}
function frameBox(box,direction){
 if(box.isEmpty())return;
 const center=box.getCenter(new THREE.Vector3()),dir=direction.clone().normalize();
 if(!dir.lengthSq())dir.set(-1,.5,1).normalize();
 const right=new THREE.Vector3().crossVectors(camera.up,dir).normalize(),up=new THREE.Vector3().crossVectors(dir,right).normalize();
 const tanV=Math.tan(THREE.MathUtils.degToRad(camera.fov)/2),tanH=tanV*camera.aspect;let distance=.3;
 for(const x of[box.min.x,box.max.x])for(const y of[box.min.y,box.max.y])for(const z of[box.min.z,box.max.z]){const v=new THREE.Vector3(x,y,z).sub(center),depth=v.dot(dir);distance=Math.max(distance,depth+Math.abs(v.dot(right))/tanH*1.14,depth+Math.abs(v.dot(up))/tanV*1.14);}
 const damping=controls.enableDamping;controls.enableDamping=false;controls.update();controls.target.copy(center);camera.position.copy(center).addScaledVector(dir,distance);camera.near=Math.max(.005,Math.min(.15,distance/200));camera.updateProjectionMatrix();controls.update();controls.enableDamping=damping;requestRender();
}
function clearSelected(){
 if(selected){for(const material of Array.isArray(selected.material)?selected.material:[selected.material])material.dispose();selected.material=oldMaterial;}
 selected=null;oldMaterial=null;if(boxHelper){scene.remove(boxHelper);boxHelper.dispose();boxHelper=null;}
 for(const id of['focus','hide-one','isolate'])$('#'+id).disabled=true;$('#detail').textContent='单击一个构件，查看名称。';
}
function friendlyName(name,group){
 const car=name.startsWith('C1_')?'头车 · ':name.startsWith('C2_')?'中间车 · ':'';
 const words=[[/BodyShell/,'车体外壳'],[/DriverConsole/,'驾驶台'],[/WindshieldCenter/,'前风挡中间分隔'],[/WindshieldSeal/,'前风挡密封'],[/Windshield/,'前风挡'],[/CabSideWindow/,'驾驶室侧窗'],[/WiperBlade/,'雨刷刮片'],[/WiperArm/,'雨刷臂'],[/PassengerWindow/,'客室车窗'],[/WindowGasket/,'车窗密封'],[/LampLens|LED/,'车灯'],[/LampHousing/,'车灯灯罩'],[/CouplerHatchSeal/,'鼻锥舱盖接缝'],[/NoseSideSeam/,'车头侧面分缝'],[/NoseEmblem/,'车头标识'],[/Floor/,'地板'],[/Headrest/,'座椅头枕'],[/SeatBack/,'座椅靠背'],[/SeatCushion|SeatBase|SeatPad/,'座椅坐垫'],[/SeatLeg/,'座椅支腿'],[/Seat/,'座椅'],[/brakecaliper/i,'制动钳'],[/brakedisc/i,'制动盘'],[/axlebox/i,'轴箱'],[/air_spring/i,'空气弹簧'],[/air_ring/i,'空气弹簧外形环'],[/primary_spring|coil/i,'螺旋弹簧'],[/spring/i,'弹簧'],[/damper/i,'减振器'],[/wheel/i,'车轮'],[/flange/i,'轮缘'],[/axle/i,'车轴'],[/bolster/i,'摇枕示意'],[/frame/i,'构架'],[/hub/i,'轮毂'],[/Pantograph.*Contact|ContactStrip/i,'受电弓接触条'],[/Pantograph/i,'受电弓构件'],[/Insulator/i,'绝缘子'],[/Door.*window/i,'车门玻璃'],[/Door/i,'车门构件'],[/Coupler/i,'车钩'],[/Gangway/i,'车间风挡'],[/Rail/i,'钢轨'],[/Sleeper/i,'轨枕'],[/Fastener|Clip/i,'轨道扣件'],[/Belt|ribbon|mask|sweep|Fuxing|CR400AF|ChinaRail|red_/i,'涂装或车身标识'],[/Louver|Grille/i,'设备通风百叶']];
 for(const[pattern,label]of words)if(pattern.test(name))return car+label;
 return car+(LABELS[group]||'列车构件');
}
function refreshSearch(){
 if(!root)return;
 const query=$('#search').value.trim().toLowerCase(),list=visibleMeshes().filter(m=>`${friendlyName(nameOf(m),groupOf(m))} ${nameOf(m)}`.toLowerCase().includes(query));
 $('#part-list').replaceChildren();
 for(const mesh of list.slice(0,80)){const option=document.createElement('option');option.value=mesh.uuid;option.textContent=`${friendlyName(nameOf(mesh),groupOf(mesh))} · ${nameOf(mesh)}`;$('#part-list').append(option);}
 $('#part-list').selectedIndex=-1;$('#search-note').textContent=list.length>80?`找到 ${list.length} 件，先列出 80 件；输入名称可缩小范围。`:`找到 ${list.length} 件当前可见构件。`;
}
function syncGroups(){
 for(const input of $('#groups').querySelectorAll('input')){const key=input.dataset.group,eligible=meshes.filter(m=>groupOf(m)===key&&scopeAccepts(m));const visible=eligible.filter(isVisible).length;input.checked=enabledGroups.get(key)!==false;input.disabled=!eligible.length;input.closest('label').classList.toggle('unavailable',!eligible.length);input.closest('label').querySelector('small').textContent=`${visible}/${eligible.length}`;}
 const shellOff=SHELL.every(key=>enabledGroups.get(key)===false);$('#shell').textContent=shellOff?'恢复外壳':'隐藏外壳';$('#shell').setAttribute('aria-pressed',String(shellOff));$('#shell').disabled=!meshes.some(m=>SHELL.includes(groupOf(m))&&scopeAccepts(m));
 const canSeparate=new Set(visibleMeshes().map(groupOf)).size>1;
 $('#explode').disabled=!canSeparate;$('#assembled').disabled=!canSeparate;
 $('#explode-note').textContent=canSeparate?'只拉开显示位置；回到 0% 即恢复装配位置。':'回到“两节车全貌”，可以拉开车体、内装和车下部件。';
}
function applyVisibility(){
 if(!root)return;root.traverse(o=>o.visible=true);
 for(const mesh of meshes)mesh.visible=scopeAccepts(mesh)&&enabledGroups.get(groupOf(mesh))!==false&&!hidden.has(mesh.uuid)&&(!isolatedMesh||mesh===isolatedMesh);
 if(selected&&!isVisible(selected))clearSelected();syncGroups();refreshSearch();$('#status').textContent=`当前显示 ${visibleMeshes().length} 个构件`;requestRender();
}
function buildGroups(){
 $('#groups').replaceChildren();
 for(const[key]of[...groups].sort(([a],[b])=>a.localeCompare(b))){const label=document.createElement('label'),input=document.createElement('input'),text=document.createElement('span'),count=document.createElement('small');input.type='checkbox';input.dataset.group=key;input.checked=enabledGroups.get(key)!==false;text.textContent=LABELS[key];input.addEventListener('change',()=>{isolatedMesh=null;enabledGroups.set(key,input.checked);applyVisibility();});label.append(input,text,count);$('#groups').append(label);}
}
function setExplosion(value,fit=false){
 const amount=Math.max(0,Math.min(100,Number(value)||0));$('#explode').value=String(amount);$('#amount').textContent=`${amount}%`;if(!root)return;
 for(const[key,object]of groups)object.position.copy(groupOrigins.get(key)).addScaledVector(new THREE.Vector3(...(EXPLOSION[key]||[0,0,0])),amount/100);
 root.updateMatrixWorld(true);if(fit)frameBox(visibleBounds(),camera.position.clone().sub(controls.target));requestRender();
}
function restoreDisplay(){clearSelected();hidden.clear();isolatedMesh=null;for(const key of groups.keys())enabledGroups.set(key,key!=='10_Track');applyVisibility();}
function applyPreset(key){
 if(!PRESETS[key])return;currentPreset=key;$('#view-title').textContent=PRESETS[key].title;$('#view-note').textContent=PRESETS[key].note;
 for(const button of document.querySelectorAll('[data-preset]'))button.setAttribute('aria-pressed',String(button.dataset.preset===key));
 if(!root)return;controls.autoRotate=false;$('#spin').setAttribute('aria-pressed','false');setExplosion(0);restoreDisplay();frameBox(presetBounds(),new THREE.Vector3(...PRESETS[key].direction));
}
async function sha256(buffer){
 if(!globalThis.crypto?.subtle)return null;
 const hash=await crypto.subtle.digest('SHA-256',buffer);
 return Array.from(new Uint8Array(hash),v=>v.toString(16).padStart(2,'0')).join('');
}
async function loadCompressedModel(){
 const manifestURL=new URL(MODEL_MANIFEST,location.href),response=await fetch(manifestURL);
 if(!response.ok)throw new Error('模型清单 HTTP '+response.status);
 const manifest=await response.json();
 if(manifest.encoding!=='gzip'||!Array.isArray(manifest.parts)||!manifest.parts.length||manifest.parts.reduce((n,p)=>n+p.bytes,0)!==manifest.compressed_bytes)throw new Error('模型分块清单不完整');
 if(typeof DecompressionStream!=='function')throw new Error('当前浏览器不支持模型解压，请更新浏览器后重试');
 const compressed=new Uint8Array(manifest.compressed_bytes);let offset=0;
 for(let i=0;i<manifest.parts.length;i++){
  const part=manifest.parts[i],url=new URL(part.file,manifestURL);
  if(url.origin!==manifestURL.origin||url.pathname.substring(0,url.pathname.lastIndexOf('/')+1)!==manifestURL.pathname.substring(0,manifestURL.pathname.lastIndexOf('/')+1))throw new Error('模型分块路径无效');
  const r=await fetch(url);if(!r.ok)throw new Error(`第 ${i+1} 块 HTTP ${r.status}`);
  const blocks=[];let received=0;
  if(r.body){const reader=r.body.getReader();while(true){const{done,value}=await reader.read();if(done)break;blocks.push(value);received+=value.byteLength;$('#status').textContent=`下载列车 ${Math.min(100,Math.round(100*(offset+received)/manifest.compressed_bytes))}% · ${i+1}/${manifest.parts.length}`;}}
  else{const b=new Uint8Array(await r.arrayBuffer());blocks.push(b);received=b.byteLength;}
  if(received!==part.bytes)throw new Error(`第 ${i+1} 块大小不符，请重试`);
  const bytes=new Uint8Array(received);let n=0;for(const b of blocks){bytes.set(b,n);n+=b.byteLength;}
  const hash=await sha256(bytes);if(hash&&hash!==part.sha256)throw new Error(`第 ${i+1} 块校验失败，请重试`);
  compressed.set(bytes,offset);offset+=received;
 }
 const compressedHash=await sha256(compressed);if(compressedHash&&compressedHash!==manifest.compressed_sha256)throw new Error('模型压缩数据校验失败');
 $('#status').textContent='下载完成，正在解压模型…';
 const buffer=await new Response(new Blob([compressed]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer();
 if(buffer.byteLength!==manifest.original_bytes)throw new Error('解压后模型大小不符');
 $('#status').textContent='正在校验并打开模型…';const hash=await sha256(buffer);
 if(hash&&hash!==manifest.original_sha256)throw new Error('解压后模型校验失败');
 transport={encoding:'gzip',parts:manifest.parts.length,download_bytes:offset,original_bytes:buffer.byteLength,original_sha256:hash,sha256_verified:!!hash};
 return new GLTFLoader().parseAsync(buffer,'');
}
async function loadModel(){
 if(root)return true;if(loadPromise)return loadPromise;loading=true;$('#load').disabled=true;$('#load').textContent='正在载入…';$('#status').textContent='正在读取列车模型';
 loadPromise=(async()=>{try{init();const gltf=await loadCompressedModel();root=gltf.scene;scene.add(root);
  root.traverse(o=>{if(LABELS[o.name]){groups.set(o.name,o);groupOrigins.set(o.name,o.position.clone());enabledGroups.set(o.name,o.name!=='10_Track');}if(o.isMesh){meshes.push(o);meshOrigins.set(o.uuid,{position:o.position.clone(),scale:o.scale.clone(),quaternion:o.quaternion.clone()});let p=o;while(p&&!LABELS[p.name])p=p.parent;o.userData.trainGroup=p?.name||'';o.geometry.computeBoundingBox();}});
  buildGroups();for(const id of['save','reset','all','explode','assembled','fit','side','top','spin','shell','search','part-list'])$('#'+id).disabled=false;$('#cover').classList.add('hidden');applyPreset(currentPreset);return true;
 }catch(error){$('#load').disabled=false;$('#load').textContent='重试载入';$('#status').textContent='载入失败：'+error.message;console.error(error);return false;}finally{loading=false;loadPromise=null;}})();return loadPromise;
}
function selectMesh(mesh){
 if(!mesh||!isVisible(mesh))return;clearSelected();selected=mesh;oldMaterial=mesh.material;
 const highlight=m=>{const copy=m.clone();if(copy.emissive){copy.emissive.set('#bc760b');copy.emissiveIntensity=.45;}else copy.color?.set('#d4a53b');return copy;};mesh.material=Array.isArray(oldMaterial)?oldMaterial.map(highlight):highlight(oldMaterial);
 boxHelper=new THREE.BoxHelper(mesh,0xc78c21);scene.add(boxHelper);$('#detail').textContent=friendlyName(nameOf(mesh),groupOf(mesh));$('#detail').title=nameOf(mesh);for(const id of['focus','hide-one','isolate'])$('#'+id).disabled=false;requestRender();
}
function pick(x,y){if(!root)return;const r=canvas.getBoundingClientRect(),point=new THREE.Vector2((x-r.left)/r.width*2-1,-(y-r.top)/r.height*2+1);root.updateMatrixWorld(true);raycaster.setFromCamera(point,camera);const hit=raycaster.intersectObjects(visibleMeshes(),false)[0];if(hit)selectMesh(hit.object);else{clearSelected();requestRender();}}
async function savePNG(){
 if(!renderer||!root)return;$('#save').disabled=true;
 try{renderer.render(scene,camera);const blob=await new Promise((resolve,reject)=>canvas.toBlob(v=>v?resolve(v):reject(new Error('PNG export failed')),'image/png'));const url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download=`train-${currentPreset}-${new Date().toISOString().replace(/[:.]/g,'-')}.png`;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);$('#status').textContent='已保存当前三维画面';}catch(error){$('#status').textContent='保存失败，请重试';console.error(error);}finally{$('#save').disabled=false;requestRender();}
}
$('#load').onclick=loadModel;for(const b of document.querySelectorAll('[data-preset]'))b.onclick=()=>applyPreset(b.dataset.preset);
$('#reset').onclick=()=>applyPreset('whole');$('#all').onclick=restoreDisplay;
$('#shell').onclick=()=>{isolatedMesh=null;const off=SHELL.every(k=>enabledGroups.get(k)===false);for(const key of SHELL)enabledGroups.set(key,off);applyVisibility();};
$('#explode').oninput=e=>setExplosion(e.target.value);$('#explode').onchange=()=>frameBox(visibleBounds(),camera.position.clone().sub(controls.target));$('#assembled').onclick=()=>setExplosion(0,true);$('#fit').onclick=()=>frameBox(visibleBounds(),camera.position.clone().sub(controls.target));
$('#side').onclick=()=>frameBox(presetBounds(),new THREE.Vector3(0,.015,1));$('#top').onclick=()=>frameBox(presetBounds(),new THREE.Vector3(0,1,.001));
$('#focus').onclick=()=>{if(selected)frameBox(bounds([selected]),camera.position.clone().sub(controls.target));};
$('#hide-one').onclick=()=>{if(selected){hidden.add(selected.uuid);isolatedMesh=null;applyVisibility();}};
$('#isolate').onclick=()=>{if(selected){isolatedMesh=selected;applyVisibility();frameBox(bounds([selected]),camera.position.clone().sub(controls.target));}};
$('#spin').onclick=e=>{controls.autoRotate=!controls.autoRotate;e.currentTarget.setAttribute('aria-pressed',String(controls.autoRotate));requestRender();};$('#save').onclick=savePNG;
$('#search').oninput=refreshSearch;$('#part-list').onchange=e=>selectMesh(meshes.find(m=>m.uuid===e.target.value));

// Read-only QA observations. No Three.js scene objects are exposed.
window.trainAssembly=Object.freeze({
 snapshot:({names=false}={})=>({loaded:!!root,loading,transport,preset:currentPreset,meshCount:meshes.length,groupCount:groups.size,visibleCount:visibleMeshes().length,selected:selected?nameOf(selected):null,hiddenCount:hidden.size,isolated:!!isolatedMesh,explosion:Number($('#explode').value),groups:[...groups].map(([key,o])=>({name:key,enabled:enabledGroups.get(key),offset:o.position.clone().sub(groupOrigins.get(key)).toArray()})),meshLocalTransformsIntact:meshes.every(m=>{const b=meshOrigins.get(m.uuid);return m.position.equals(b.position)&&m.scale.equals(b.scale)&&m.quaternion.equals(b.quaternion);}),camera:camera?{position:camera.position.toArray(),target:controls.target.toArray()}:null,...(names?{visibleNames:visibleMeshes().map(nameOf)}:{})}),
 projectMesh:name=>{const mesh=meshes.find(m=>nameOf(m)===name);if(!mesh||!camera)return null;const p=bounds([mesh]).getCenter(new THREE.Vector3()).project(camera),r=canvas.getBoundingClientRect();return{x:r.left+(p.x+1)*r.width/2,y:r.top+(1-p.y)*r.height/2,visible:isVisible(mesh)};}
});
