(()=>{
 const {chapters,book}=window.BRIDGE_LEARNING_MAP,$=id=>document.getElementById(id),escape=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const href=c=>c.interactiveUrl.replace(/^interactive\//,'');let selected;
 function drawing(slug){
  const line=(x1,y1,x2,y2,color='#487c85',w=5)=>`<path d="M${x1},${y1}L${x2},${y2}" stroke="${color}" stroke-width="${w}" fill="none"/>`,txt=(x,y,t)=>`<text x="${x}" y="${y}" font-size="18" text-anchor="middle">${t}</text>`,arrow=(x,y)=>line(x,y,x,y+45,'#bb823e',4)+`<path d="M${x-7},${y+33}L${x},${y+45}L${x+7},${y+33}" fill="none" stroke="#bb823e" stroke-width="4"/>`,beam=()=>line(80,140,560,140)+`<path d="M80,145l-15,25h30z M560,145l-15,25h30z" fill="#9cafa0"/>`;
  let shapes='';
  if(slug==='ch01'){shapes=`<rect x="120" y="100" width="90" height="40" fill="#7fa5a6"/><rect x="350" y="60" width="180" height="80" fill="#4c7e87"/>`+txt(165,180,'小模型')+txt(440,180,'按比例放大');}
  else if(slug==='ch02-foundations'||slug==='ch03'){shapes=line(90,115,550,115)+arrow(420,35);for(let i=0;i<5;i++)shapes+=line(110+i*105,125,110+i*105,170,'#84a09b',10);shapes+=txt(320,208,slug==='ch03'?'同一辆车 · 多根主梁':'同样的压力 · 不同作用位置');}
  else if(slug==='ch02'){shapes=beam()+arrow(220,55)+`<circle cx="395" cy="140" r="8" fill="#c88737"/>`+txt(398,202,'固定看这一处')+txt(210,33,'荷载可以移动');}
  else if(slug==='ch04'){shapes=beam()+`<path d="M80,140Q320,-15 560,140" stroke="#487c85" stroke-width="9" fill="none"/>`+arrow(430,35)+arrow(490,65)+txt(215,208,'桥形不变，换一侧加载');}
  else if(slug==='ch05'){shapes=beam()+line(320,140,320,20);for(const x of [120,200,440,520])shapes+=line(x,140,320,35,'#bda26a',2);shapes+=txt(320,205,'调整一处，看多处响应');}
  else if(slug==='ch06'){shapes=`<path d="M80,45Q320,225 560,45 M80,45Q320,110 560,45" stroke="#487c85" stroke-width="5" fill="none"/>`+line(80,25,80,170,'#9bafa1',8)+line(560,25,560,170,'#9bafa1',8)+txt(320,210,'同样的竖向荷载 · 不同垂度');}
  else if(slug==='ch07'){shapes=beam()+line(80,65,560,65,'#bb823e',3)+txt(320,46,'温升后想伸长')+`<path d="M520,56l20,9-20,9" fill="none" stroke="#bb823e" stroke-width="3"/>`+txt(320,208,'哪些方向允许动？');}
  else if(slug==='ch09-wind'){shapes=`<path d="M65,125Q110,45 155,125T245,125T335,125T425,125T515,125" fill="none" stroke="#487c85" stroke-width="5"/>`+txt(320,45,'观察运动节奏')+txt(320,205,'先分清现象，再讨论幅值');}
  else if(slug==='ch10-lifecycle'){shapes=line(100,30,100,170,'#a3b3a4',2)+line(100,170,570,170,'#a3b3a4',2)+`<path d="M110,45Q310,75 530,145 M110,45Q310,60 530,85" fill="none" stroke="#487c85" stroke-width="5"/>`+txt(360,205,'同一时刻，比较不同劣化过程');}
  else {for(let i=0;i<5;i++){shapes+=line(180+i*65,45,130+i*65,160,'#759696',2)+line(180-i*12.5,45+i*28.75,440-i*12.5,45+i*28.75,'#759696',2);}shapes+=arrow(360,15)+txt(320,208,'先看空间受力，再选保留哪些信息');}
  return `<svg class="concept-picture" viewBox="0 0 640 240" role="img" aria-label="本章问题的概念示意">${shapes}</svg>`;
 }
 function show(slug){selected=chapters.find(c=>c.slug===slug)||chapters[0];const c=selected;document.querySelectorAll('#chapterList button').forEach(b=>b.setAttribute('aria-current',String(b.dataset.slug===c.slug)));
  $('chapterCard').innerHTML=`<h2>${escape(c.question)}</h2>${drawing(c.slug)}<p class="picture-caption">概念示意；进入实验后查看具体条件与计算结果</p><p class="action-note">${escape(c.action)}</p><div class="action-row"><button id="launchLab">动手试一试 →</button><a href="../chapters/${c.slug}.html">回到这一章</a></div><details class="guide-details"><summary>试过以后，想想这个方法还能用在哪里</summary><p><strong>观察：</strong>${c.observe.map(escape).join('；')}。</p><p>${escape(c.principle)}</p><p><strong>换个对象：</strong>${escape(c.analogy)}</p><p><strong>类比到这里为止：</strong>${escape(c.boundary)}</p></details><details class="guide-details"><summary>这一章的一组公式，可以怎样读？</summary><p>${escape(c.formula.intro)}</p><div class="symbol-flow">${c.formula.flow.map(s=>'<span>'+escape(s)+'</span>').join('')}</div><p>${escape(c.formula.symbols)}</p><a href="../chapters/${c.slug}.html#${encodeURIComponent(c.formula.heading)}">在正文中对照公式</a></details>`;
  $('launchLab').onclick=()=>{$('guide').hidden=true;$('experiment').hidden=false;$('experimentTitle').textContent=c.question;$('openFull').href=href(c);$('labFrame').src=href(c);window.scrollTo(0,0);};
  const active=$('chapterList').querySelector('[aria-current=true]');if(innerWidth<760)$('chapterList').scrollLeft=active.offsetLeft-$('chapterList').offsetLeft-($('chapterList').clientWidth-active.clientWidth)/2;
  const url=new URL(location.href);url.searchParams.set('chapter',c.slug);history.replaceState(null,'',url);}
 for(const [i,c] of chapters.entries()){const b=document.createElement('button');b.dataset.slug=c.slug;b.textContent=`${String(i+1).padStart(2,'0')} · ${c.title}`;b.onclick=()=>show(c.slug);$('chapterList').append(b);}
 $('backGuide').onclick=()=>{$('labFrame').src='about:blank';$('guide').hidden=false;$('experiment').hidden=true;};
 for(const t of book.topics){const section=document.createElement('section');section.innerHTML=`<h3>${escape(t.question)}</h3><p>${escape(t.thinking_tool)}。</p><p>换到${t.transfer.map(escape).join('、')}中再试。</p><details><summary>类比边界</summary><p>${escape(t.boundary)}</p></details><a href="${t.existing_href.replace(/^interactive\//,'')}">查看相应实验 →</a>`;$('transferTopics').append(section);}
 window.addEventListener('resize',()=>{const active=$('chapterList').querySelector('[aria-current=true]');if(active&&innerWidth<760)$('chapterList').scrollLeft=active.offsetLeft-$('chapterList').offsetLeft-($('chapterList').clientWidth-active.clientWidth)/2;});
 show(new URLSearchParams(location.search).get('chapter'));
})();
