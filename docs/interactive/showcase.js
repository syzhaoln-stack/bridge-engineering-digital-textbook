'use strict';
(() => {
 const D=window.SHOWCASE_DATA,$=s=>document.querySelector(s);
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const duration=s=>`${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,'0')}`;
 let videoKind='dialogue',videoLimit=10,imageKind='ai',imageLimit=6,lessonLimit=12,currentVideo;
 const player=$('#player');
 const videoNotes={dialogue:'双人合成配音样片 · Manim 绘制 · 1080p',manim:'早期 Manim 原理动画 · 无旁白 · 较低清晰度版本',core:'Manim 配音短讲 · 本地合成语音 · 1080p'};
 function chooseVideo(v,play=false){
  currentVideo=v;player.pause();player.removeAttribute('src');player.replaceChildren();player.load();player.poster=v.poster;$('#start-video').hidden=false;$('#start-video').textContent=v.kind==='dialogue'?'▶ 播放这段讨论':'▶ 播放这段视频';
  if(v.subtitle){const track=document.createElement('track');Object.assign(track,{kind:'subtitles',srclang:'zh',label:'中文字幕',src:v.subtitle});player.append(track);}
  $('#video-title').textContent=v.title;$('#video-id').textContent=`${v.id} · ${duration(v.duration)}`;$('#video-note').textContent=videoNotes[v.kind];
  $('#video-file').href=v.src;$('#video-script').hidden=!v.script;if(v.script)$('#video-script').href=v.script;
  $('#video-script').textContent=v.kind==='dialogue'?'阅读对话脚本 ↗':'阅读讲解稿 ↗';$('#video-error').hidden=true;
  renderVideos();if(play)startVideo();
 }
 function startVideo(){player.src=currentVideo.src;$('#start-video').hidden=true;player.play().catch(()=>{$('#start-video').hidden=false;});}
 $('#start-video').addEventListener('click',startVideo);
 function renderVideos(){
  const q=$('#video-search').value.trim().toLowerCase();const all=D.videos.filter(v=>v.kind===videoKind&&(v.title+v.id).toLowerCase().includes(q));
  $('#video-count').textContent=`共 ${all.length} 段${all.length>videoLimit?` · 已显示 ${videoLimit} 段`:''}`;
  $('#video-list').innerHTML=all.slice(0,videoLimit).map(v=>`<button class="video-item" data-id="${v.id}" aria-pressed="${v.id===currentVideo?.id}"><img src="${esc(v.poster)}" alt="" loading="lazy"><span><b>${esc(v.title)}</b><small>${v.id} · ${duration(v.duration)}</small></span></button>`).join('')||'<p>没有找到。试试缩短关键词。</p>';
  $('#video-more').hidden=all.length<=videoLimit;
 }
 $('#video-list').addEventListener('click',e=>{const b=e.target.closest('[data-id]');if(b)chooseVideo(D.videos.find(v=>v.id===b.dataset.id),true);});
 $('#video-tabs').addEventListener('click',e=>{const b=e.target.closest('[data-kind]');if(!b)return;videoKind=b.dataset.kind;videoLimit=10;$('#video-search').value='';$('#video-tabs').querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));chooseVideo(D.videos.find(v=>v.kind===videoKind));});
 $('#video-search').addEventListener('input',()=>{videoLimit=10;renderVideos();});$('#video-more').addEventListener('click',()=>{videoLimit+=10;renderVideos();});
 player.addEventListener('error',()=>{$('#video-error').hidden=false;});
 const imageNotes={ai:'24 张 GPT 生图样稿，优先展示已选画法。已选 8 张中，5 张进入正文试排、3 张仍需修正构造；这些是生成情境图。点击图片可放大。',figure:'40 幅自制参数化原理图：用箭头、尺寸和计算关系解释受力。已插入教材；点击可放大查看，图注保留适用条件。',blender:'6 幅桥梁构造图与 2 幅钢筋图，来自同一套 Blender 教学模型。点击查看整图与尺寸说明。'};
 function renderImages(){
  const all=D.images.filter(x=>x.kind===imageKind);$('#image-note').textContent=imageNotes[imageKind];
  $('#image-grid').innerHTML=all.slice(0,imageLimit).map(x=>`<article class="image-card"><button data-id="${x.id}" aria-label="放大：${esc(x.title)}"><img src="${esc(x.thumb||x.src)}" alt="${esc(x.title)}" loading="lazy">${imageKind==='ai'?`<span class="badge ${x.revision?'warning':''}">${x.revision?'构造待修正':x.selected?'已选 · 正文试排':'备选画法'}</span>`:''}</button><div class="image-copy"><small>${x.id}</small><h3>${esc(x.title)}</h3>${imageKind==='ai'?`<p>${esc(x.note)}</p>`:''}${x.link?`<p><a href="${esc(x.link)}">在教材中阅读 ↗</a></p>`:''}</div></article>`).join('');
  $('#image-more').hidden=all.length<=imageLimit;$('#image-more').textContent=`继续看图 · 还有 ${Math.max(0,all.length-imageLimit)} 幅`;
 }
 $('#image-tabs').addEventListener('click',e=>{const b=e.target.closest('[data-kind]');if(!b)return;imageKind=b.dataset.kind;imageLimit=6;$('#image-tabs').querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));renderImages();});
 $('#image-more').addEventListener('click',()=>{imageLimit+=12;renderImages();});
 const dialog=$('#image-dialog');
 $('#image-grid').addEventListener('click',e=>{const b=e.target.closest('button[data-id]');if(!b)return;const x=D.images.find(v=>v.id===b.dataset.id);$('#lightbox-title').textContent=x.id+' · '+x.title;$('#lightbox-image').src=x.src;$('#lightbox-image').alt=x.title;$('#lightbox-note').textContent=x.note;$('#lightbox-source').href=x.src;dialog.showModal();});
 $('#close-image').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
 D.chapters.forEach(c=>{const o=document.createElement('option');o.value=c.id;o.textContent=`第 ${c.id} 章 · ${c.title}`;$('#lesson-chapter').append(o);});
 function renderLessons(){const chapter=$('#lesson-chapter').value,q=$('#lesson-search').value.trim().toLowerCase();const all=D.lessons.filter(x=>(!chapter||x.chapter===Number(chapter))&&(x.title+x.insight+x.id).toLowerCase().includes(q));$('#lesson-count').textContent=`找到 ${all.length} 个教学页 · 显示 ${Math.min(lessonLimit,all.length)} 个`;$('#lesson-list').innerHTML=all.slice(0,lessonLimit).map(x=>`<a href="${esc(x.src)}" target="_blank" rel="noopener"><small>${x.id} · ${esc(x.chapter_title)}</small>${esc(x.title)} ↗</a>`).join('')||'<p>没有找到。可清空关键词或选择全部章节。</p>';$('#lesson-more').hidden=all.length<=lessonLimit;}
 ['#lesson-chapter','#lesson-search'].forEach(s=>$(s).addEventListener('input',()=>{lessonLimit=12;renderLessons();}));$('#lesson-more').addEventListener('click',()=>{lessonLimit+=12;renderLessons();});
 $('#notebook-links').innerHTML=D.notebooks.map(x=>`<a href="${esc(x.src)}" target="_blank" rel="noopener">${esc(x.title)} ↗</a>`).join('');
 document.addEventListener('visibilitychange',()=>{if(document.hidden)player.pause();});
 chooseVideo(D.videos[0]);renderImages();renderLessons();
})();
