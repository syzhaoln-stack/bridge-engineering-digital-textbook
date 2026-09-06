// Contextual interface: the scene stays visible; only the selected tool is expanded.
export function installPlayUI(api){
 if(new URLSearchParams(location.search).get('workbench')==='full')return;
 const $=id=>document.getElementById(id);document.body.classList.add('play-view');
 const visual=document.querySelector('.visual'),scene=$('scene');let opened='',invoker=null;
 const hud=document.createElement('section');hud.id='playHud';hud.innerHTML='<p class="play-kicker">桥面 · 从整桥走近一块板</p><h1 id="playTitle">车下面的桥面，怎样接住重量？</h1><p id="playGoal">先找到橙框：我们将单独观察这块桥面。</p><button id="playAction">走近，看看车下的桥面 →</button><p id="playMetric" role="status"></p>';scene.append(hud);
 const dock=document.createElement('nav');dock.id='playDock';dock.setAttribute('aria-label','探索工具');dock.innerHTML='<button data-drawer="move">挪车</button><button data-drawer="connect">换连接</button><button data-drawer="look">换个看法</button><button data-drawer="challenge">挑个问题</button><button data-drawer="trials">我的方案</button><button id="playWhole">回看整桥</button><button data-drawer="notes">说明与代码</button>';visual.append(dock);
 const drawer=document.createElement('section');drawer.id='playDrawer';drawer.hidden=true;drawer.setAttribute('role','region');drawer.setAttribute('aria-label','当前工具');drawer.innerHTML='<header><strong id="drawerTitle"></strong><button id="closeDrawer" aria-label="收起当前工具">收起 ×</button></header>';visual.append(drawer);
 const panels={};for(const name of ['move','connect','look','challenge','trials','notes']){const p=document.createElement('div');p.dataset.panel=name;p.hidden=true;drawer.append(p);panels[name]=p;}
 const move=panels.move;move.append($('carX').closest('label'),document.querySelector('.story-nudge'),$('carY').closest('label'),$('wheelForce').closest('label'),$('wheelTotal'));
 panels.connect.append(document.querySelector('.story-steps'));const support=document.createElement('details');support.innerHTML='<summary>这些连接有什么区别？</summary>';support.append($('supportNote'));panels.connect.append(support);
 panels.look.append($('hideVehicle').closest('label'),$('showDimensions').closest('label'),$('showColors').closest('label'),$('showTransfer').closest('label'),$('underneath'));
 const presentation=document.createElement('details');presentation.innerHTML='<summary>视角、放大倍数与计算网格</summary>';presentation.append(document.querySelector('.toolbar'),$('autoShape').closest('label'),$('showMesh').closest('label'));panels.look.append(presentation);
 const profile=document.createElement('details');profile.innerHTML='<summary>再看一条横向截面</summary>';profile.append($('plateProfile'));panels.look.append(profile);
 panels.challenge.append(document.querySelector('.mission-picker'),$('missionCard'));
 panels.trials.append($('trialTray'));
 const notes=panels.notes;notes.append(document.querySelector('.readouts'));for(const d of [...$('storyControls').querySelectorAll('details')])notes.append(d);notes.append(document.querySelector('.sources'));const code=document.createElement('a');code.href=location.pathname+'?lesson=planar&workbench=full';code.target='_blank';code.textContent='打开完整实验台与代码';notes.append(code);
 const titles={move:'把车挪到哪里？',connect:'桥面怎样连在一起？',look:'这次想看清什么？',challenge:'挑一个问题，也可以随时换',trials:'留下两个方案，再比较',notes:'需要时再查'};
 function open(name,button){opened=name;invoker=button;drawer.hidden=false;$('drawerTitle').textContent=titles[name];Object.entries(panels).forEach(([key,p])=>p.hidden=key!==name);dock.querySelectorAll('[data-drawer]').forEach(b=>b.setAttribute('aria-expanded',String(b.dataset.drawer===name)));$('closeDrawer').focus();}
 function close(){opened='';drawer.hidden=true;dock.querySelectorAll('[data-drawer]').forEach(b=>b.setAttribute('aria-expanded','false'));invoker?.focus();}
 dock.querySelectorAll('[data-drawer]').forEach(b=>{b.setAttribute('aria-expanded','false');b.onclick=()=>opened===b.dataset.drawer?close():open(b.dataset.drawer,b);});$('closeDrawer').onclick=close;document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!drawer.hidden){e.stopPropagation();close();}});
 $('playWhole').onclick=()=>{$('wholeBridge').click();close();};
 $('playAction').onclick=()=>{const s=api.state();if(s.overview){$('localPlate').click();}else if(!s.revealed){$('reveal').click();}else{$('keepTrial').click();$('playMetric').textContent=$('trialStatus').textContent;}};
 function sync(){const s=api.state();if(!s.result)return;document.body.dataset.sceneStage=s.overview?'whole':'local';$('playTitle').innerHTML=s.overview?'车的重量，<br>怎样传到桥下面？':'挪一挪车，<br>桥面哪里跟着变？';$('playGoal').textContent=s.overview?'先找到橙框：我们将单独观察这块桥面。':s.revealed?'拖动车身挪位置；空白处拖动可旋转。':'轮子压在这里。先看看板会怎样弯曲。';$('playAction').textContent=s.overview?'走近，看看车下的桥面 →':s.revealed?'记下这个方案':'看看桥面怎样弯曲';$('playMetric').textContent=!s.overview&&s.revealed?`最多下沉 ${(-Math.min(...s.result[s.mode].w)*1000).toFixed(3)} mm · 图形放大 ${$('scale').value} 倍`:'';}
 window.addEventListener('deck:update',sync);sync();window.DeckPlay={open,close};
}
