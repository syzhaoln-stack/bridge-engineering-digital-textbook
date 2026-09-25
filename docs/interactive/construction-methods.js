(async()=>{
 'use strict';const $=id=>document.getElementById(id),frame=$('method-frame'),origin=location.origin;
 let catalog;try{catalog=await(await fetch('../assets/bridge-lab/methods-catalog.json')).json();}catch{$('method-loading').textContent='工法资料暂未载入，请刷新。';return;}
 const types=Object.fromEntries(Object.entries({girder:'梁桥',arch:'拱桥'}).filter(([id])=>catalog.methods.some(m=>m.bridge===id)));
 const methods=catalog.methods;
 let selected,bridge,ready=false,progress=0,playing=false,request=0,viewKey='',manualCamera=false,lastFrame=0,lastSend=0,elapsed=0,observation='construction',renderer='';
 const send=d=>frame.contentWindow?.postMessage({source:'bridge-book-guide',...d},origin);
 function segmentAt(p){const segments=selected.segments||[{at:0,to:1,beat:selected.id,stage:0,view:'construction'}];return segments.filter(s=>p>=s.at).at(-1)||segments[0];}
 function localProgress(segment){return Math.max(0,Math.min(1,(progress-segment.at)/Math.max(.001,(segment.to??1)-segment.at)));}
 function setView(resetCamera=false,requestedView=null){if(!ready)return;const s=segmentAt(progress);request++;viewKey=s.beat;if(resetCamera){manualCamera=false;observation='construction';}if(requestedView){manualCamera=false;observation=requestedView;}send({type:'set-view',bridge:selected.bridge,beat:s.beat,stage:s.stage??0,view:observation==='deck'?'deck':s.view||'construction',progress:localProgress(s),autoRotate:false,keepCamera:manualCamera,requestId:request});}
 function seek(p){progress=Math.max(0,Math.min(1,p));const s=segmentAt(progress);if(s.beat!==viewKey)setView();else if(ready)send({type:'set-progress',bridge:selected.bridge,beat:s.beat,progress:localProgress(s)});updateLabels();}
 function updateLabels(){
  $('method-progress').value=progress;$('progress-text').textContent=Math.round(progress*100)+'%';
  if(!playing)$('method-play').textContent=progress>=1?'再看一遍':'播放施工';
  $('method-detail').hidden=!['girder_launching_gantry','girder_cantilever_cast','girder_cantilever_precast','suspension_cable_deck','cable_balanced_cantilever'].includes(selected.id);
  const cues=selected.cueStops||selected.stages.map((label,i)=>({at:i/selected.stages.length,label}));let active=0;cues.forEach((cue,i)=>{if(progress+.00001>=cue.at)active=i;});
  $('current-cue').textContent=cues[active].label;document.querySelectorAll('.method-stages li').forEach((li,i)=>li.classList.toggle('active',i===active));
 }
 function select(id){
  selected=methods.find(m=>m.id===id)||methods[0];bridge=selected.bridge;progress=0;playing=false;elapsed=0;viewKey='';manualCamera=false;observation='construction';$('method-play').textContent='播放施工';$('method-detail').hidden=!['girder_launching_gantry','girder_cantilever_cast','girder_cantilever_precast','suspension_cable_deck'].includes(selected.id);
  document.querySelectorAll('[data-bridge]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.bridge===bridge)));
  $('method-options').replaceChildren(...methods.filter(m=>m.bridge===bridge).map(m=>{const b=document.createElement('button');b.textContent=m.title;b.dataset.method=m.id;b.setAttribute('aria-pressed',String(m.id===selected.id));b.onclick=()=>select(m.id);return b;}));
  $('method-title').textContent=selected.title;$('method-type-label').textContent=types[bridge]+' · 典型施工路径';$('method-intro').textContent=selected.description||'看清设备先做什么、构件怎样到位，以及荷载如何转交给永久结构。';
  const comparisons={girder_cantilever_cast:{formation:'梁段在模板内浇筑成形',support:'黄色挂篮：底模承托新浇混凝土',other:'girder_cantilever_precast',label:'对照：桥面吊机怎样拼装 →'},girder_cantilever_precast:{formation:'完整预制节段从桥下吊入',support:'蓝色吊机：吊具悬吊，接入后卸钩',other:'girder_cantilever_cast',label:'对照：挂篮怎样浇筑 →'}};
  const comparison=comparisons[selected.id];$('method-comparison').hidden=!comparison;
  if(comparison){$('comparison-formation').textContent=comparison.formation;$('comparison-support').textContent=comparison.support;$('compare-method').textContent=comparison.label;$('compare-method').onclick=()=>{const p=progress,wasPlaying=playing,view=observation;select(comparison.other);seek(p);if(view==='deck')setView(false,view);playing=wasPlaying;$('method-play').textContent=playing?'暂停施工':'播放施工';};}
  const stops=selected.cueStops||selected.stages.map((label,i)=>({at:i/selected.stages.length,label}));
  $('method-stages').replaceChildren(...stops.map(cue=>{const li=document.createElement('li'),b=document.createElement('button');b.textContent=cue.label;b.onclick=()=>seek(cue.at);li.append(b);return li;}));
  $('method-scope').textContent=[selected.scope,selected.visual_scope].filter(Boolean).join(' ');const d=selected.dimensions||{};$('method-dimensions').textContent=d.summary||[d.span_arrangement?`跨径：${d.span_arrangement.join(' + ')} m`:d.main_span?`主跨：${d.main_span} m`:d.span?`跨度：${d.span} m`:'',(d.width||d.deck_width)?`桥宽：${d.width||d.deck_width} m`:'',d.deck_elevation?`桥面高程：${d.deck_elevation} m`:'',d.saddle_elevation?`鞍座高程：${d.saddle_elevation} m`:'',d.main_span_cable_sag?`成桥垂度：${d.main_span_cable_sag} m`:'',d.shortest_hanger?`跨中吊杆：${d.shortest_hanger} m`:''].filter(Boolean).join('；');
  $('method-sources').replaceChildren(...(selected.sources||[]).map(s=>{const li=document.createElement('li'),a=document.createElement('a');a.textContent=s.title;a.href=s.url;a.target='_blank';a.rel='noopener';li.append(a);if(s.supports){const p=document.createElement('p');p.textContent=s.supports;li.append(p);}return li;}));
  history.replaceState(null,'','#'+selected.id);updateLabels();
  const nextRenderer=selected.renderer||'godot';
  $('method-lesson').hidden=!selected.lesson;if(selected.lesson)$('method-lesson').href=selected.lesson;$('method-lesson').textContent=nextRenderer==='composite'?'打开完整受力课堂 ↗':'打开完整拱桥专题 ↗';
  $('method-results').hidden=nextRenderer!=='composite';$('method-results').replaceChildren();
  if(renderer!==nextRenderer||!frame.getAttribute('src')){renderer=nextRenderer;ready=false;manualCamera=false;$('method-loading').hidden=false;$('method-play').disabled=true;frame.src=selected.page?selected.page:'../assets/bridge-lab/app/index.html?bridge='+bridge+'&guide=1';}
  else if(ready)setView(true);
 }
 window.addEventListener('message',event=>{if(event.origin!==origin||event.source!==frame.contentWindow)return;let d=event.data;if(typeof d==='string'){try{d=JSON.parse(d);}catch{return;}}if(d?.source!=='bridge-lab')return;
  if(selected.renderer==='composite'&&d.metrics){
   const r=d.metrics,number=(n,digits=3)=>Number.isFinite(n)?n.toFixed(digits):'—';
   const rows=[['混凝土板顶 σ',r.active?number(r.concreteTop)+' MPa':'未参与'],['混凝土板底 σ',r.active?number(r.concreteBottom)+' MPa':'未参与'],['混凝土合压力',r.active?number(Math.abs(r.concreteForce)/1000,1)+' kN':'—'],['钢梁合拉力',r.active?number(Math.abs(r.steelForce)/1000,1)+' kN':'—'],['跨中挠度',number(r.delta1)+' + '+number(r.delta2)+' = '+number(r.deltaTotal)+' mm']];
   $('method-results').replaceChildren(...rows.map(([label,value])=>{const row=document.createElement('p'),b=document.createElement('b');row.textContent=label+' ';b.textContent=value;row.append(b);return row;}));
  }
  if(d.type==='ready'){ready=true;$('method-play').disabled=false;setView();}
  if(d.type==='applied'&&Number(d.requestId)===request){$('method-loading').hidden=true;$('method-state').textContent=manualCamera?'自由视角 · 施工继续':'可拖动模型改变视角';seek(progress);}
  if(d.type==='interaction'){manualCamera=true;$('method-state').textContent='自由视角 · 施工继续';}
  if(d.type==='rejected'){$('method-state').textContent='此工法未载入，请刷新或选择另一项。';playing=false;}
 });
 $('method-play').onclick=()=>{if(!ready)return;if(progress>=1)seek(0);playing=!playing;$('method-play').textContent=playing?'暂停施工':'播放施工';};
 $('method-reset').onclick=()=>setView(true);$('method-detail').onclick=()=>setView(false,'deck');$('method-progress').oninput=e=>seek(+e.target.value);
 $('bridge-types').replaceChildren(...Object.entries(types).map(([id,title])=>{const b=document.createElement('button');b.textContent=title;b.dataset.bridge=id;b.onclick=()=>select(methods.find(m=>m.bridge===id).id);return b;}));
 function animate(now){const dt=Math.min(.1,(now-lastFrame)/1000);lastFrame=now;if(playing)elapsed+=dt;else elapsed=0;if(playing&&now-lastSend>65){lastSend=now;seek(progress+elapsed*(+$('method-speed').value)/(selected.playbackSeconds||30));elapsed=0;if(progress>=1){playing=false;$('method-play').textContent='再看一遍';}}requestAnimationFrame(animate);}
 document.addEventListener('visibilitychange',()=>{if(document.hidden){playing=false;$('method-play').textContent='播放施工';}});
 window.addEventListener('hashchange',()=>{const id=location.hash.slice(1);if(id!==selected?.id&&methods.some(m=>m.id===id))select(id);});
 select(location.hash.slice(1));requestAnimationFrame(animate);
 window.BridgeMethods={get state(){return{id:selected.id,bridge,progress,playing,ready,request,beat:segmentAt(progress).beat,manualCamera,observation};},select,seek};
})();
