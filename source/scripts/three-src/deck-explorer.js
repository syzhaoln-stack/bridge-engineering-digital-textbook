// Open-ended experiments: snapshots and grading reference the same FE results as the drawing.
export function installExplorer(api){
 const $=id=>document.getElementById(id),intro=$('storyIntro');
 intro.querySelector('.story-kicker').textContent='桥面实验场 · 自己选一个问题';
 intro.querySelector('h1').innerHTML='车停在哪里，<br>桥面会有什么不同？';
 intro.querySelector('.story-lead').textContent='拖动车辆，转到桥下面看看。你可以随时换问题，也可以只管试。';
 intro.querySelector('.story-lead').nextElementSibling.remove();
 const chooser=document.createElement('label');chooser.className='mission-picker';chooser.innerHTML='想试什么？<select id="mission"><option value="free">自由试一试</option><option value="lift">哪里停车，另一跨抬起最多？</option><option value="support">加上横隔板，会有什么变化？</option><option value="weight">车重增加，下沉也按比例增加吗？</option></select>';
 intro.querySelector('.guess').before(chooser);
 const mission=document.createElement('div');mission.id='missionCard';mission.innerHTML='<p id="missionPrompt"></p><button id="missionCheck">核对我的尝试</button><p id="missionFeedback" role="status"></p><details id="missionHints"><summary>给我一点提示</summary><p id="missionHint"></p><button id="moreHint">再给一点提示</button></details>';
 intro.querySelector('.story-steps').before(mission);
 intro.querySelector('.story-steps').before(Object.assign(document.createElement('p'),{className:'case-label',textContent:'桥面怎样连接？可以随时切换'}));
 for(const b of intro.querySelectorAll('[data-case]'))b.textContent={continuous:'连着的两跨',cut:'两跨之间断开',four:'单块板 · 两道横隔板','continuous-four':'两跨连续 · 两道横隔板'}[b.dataset.case];
 $('storyControls').querySelector('h2').textContent='这次想怎么试？';
 $('underneath').before(intro.querySelector('.case-label'),intro.querySelector('.story-steps'));
 document.querySelector('[data-case=continuous]').setAttribute('aria-pressed','true');
 const tray=document.createElement('section');tray.id='trialTray';tray.innerHTML='<div class="trial-actions"><button id="keepTrial">记下这个方案</button><button id="resetTrial" class="secondary">恢复最初场景</button></div><p id="trialStatus" role="status">留住一次结果，再换个办法比较。</p><details><summary>我的方案对照 <span id="trialCount">0</span></summary><div class="trial-scroll"><table><thead><tr><th>方案</th><th>车位 x / m</th><th>总重 / kN</th><th>最多下沉 / mm</th><th>无车跨的中部 / mm<br>＋上抬，−下沉</th><th>再试</th></tr></thead><tbody id="trials"></tbody></table></div><button id="exportTrials">导出我的探索记录</button></details>';
 document.querySelector('.visual').append(tray);
 const attribution=document.createElement('p');attribution.className='asset-credit';attribution.innerHTML='车辆外形：<a href="https://kenney.nl/assets/car-kit" target="_blank" rel="noopener">Kenney · CC0</a> · <a href="assets/kenney-car/README.md">来源与改动</a>';document.querySelector('.sources').append(attribution);
 let saved=[],hints=0,checking=false,best=null;const done=new Set();
 const definitions={
  free:['任选车位、车重和连接方式。记下两个方案，看看哪些变化与你预想的一样。',['先拖住车身横着挪，再松手看读数。','也可以用右侧的左右按钮挪车。换个视角不会改变计算结果。']],
  lift:['保持两跨连在一起、每轮 30 kN，保持纵向车位3.60 m，只横向挪动车辆。目标：在 9 个允许车位中，让无车跨的中部向上移动得最多。',['先观察无车跨的中部的读数，试着向左和向右各挪一次。','横向每次移动 0.05 m。先找读数变大的方向，再比较相邻位置。']],
  support:['比较“断开后的左跨”和“加两道横隔板后的单块板”。车位和车重保持相同，各记一个方案，再核对。',['先选“两跨之间断开”，显示变形并记下方案。','再选“单块板 · 加两道横隔板”。看看板下面多了哪两道支承。']],
  weight:['支承和车位不变，只改每轮重量。分别记下两个不同车重的方案，比较总重量和最多下沉的倍数。',['先记录当前方案，再换一个每轮重量。','用后一次下沉量除以前一次下沉量；总重量也同样相除。']]
 };
 function current(){const s=api.state();if(!s.result)return null;const r=s.result,o=r[s.mode],n=r.p.n;return{case:s.case,carX:r.p.carX,carY:r.p.carY,wheelForce:r.p.wheelForce,down:-Math.min(...o.w)*1000,right:s.case.startsWith('continuous')?r.full.w[(n/2)*(2*n+1)+n*1.5]*1000:null,checks:o.checks,solver:'MITC4, linear elastic, n=16',time:new Date().toISOString()};}
 function ready(){const s=api.state();if(s.busy||s.dirty){$('missionFeedback').textContent='等当前计算更新后再核对。';return false;}return !!s.result;}
 const name=c=>({continuous:'两跨相连',cut:'左跨单独',four:'四边支承','continuous-four':'连续且有横隔板'})[c];
 function render(){ $('trialCount').textContent=String(saved.length);$('trials').replaceChildren();saved.forEach((s,i)=>{const tr=document.createElement('tr');for(const value of [`${i+1} · ${name(s.case)}`,s.carX.toFixed(2),s.wheelForce*4/1000,s.down.toFixed(3),s.right===null?'—':s.right.toFixed(3)]){const td=document.createElement('td');td.textContent=value;tr.append(td);}const td=document.createElement('td'),b=document.createElement('button');b.textContent='恢复';b.setAttribute('aria-label','恢复方案 '+(i+1));b.onclick=()=>api.change(s);td.append(b);tr.append(td);$('trials').append(tr);});}
 $('keepTrial').onclick=()=>{if(!ready())return;if(!api.state().revealed){$('trialStatus').textContent='先点“显示变形”，再记下看到的结果。';return;}if(saved.length>=12){$('trialStatus').textContent='本轮已保留 12 个方案；可先导出，再刷新开始新一轮。';return;}saved.push(current());render();$('trialStatus').textContent=`已记下方案 ${saved.length}。可以换车位、车重或支承，结果留在下面的对照表里。`;};
 $('resetTrial').onclick=()=>api.change({case:'continuous',carX:1.2,carY:3.6,wheelForce:30000});
 function showHint(){const list=definitions[$('mission').value][1];$('missionHint').textContent=list[Math.min(hints,list.length-1)];$('moreHint').hidden=hints>=list.length-1;}
 $('moreHint').onclick=()=>{hints++;showHint();};
 $('mission').onchange=()=>{hints=0;$('missionHints').open=false;const key=$('mission').value;$('missionPrompt').textContent=definitions[key][0];$('missionFeedback').textContent=done.has(key)?'你已经核对过这项；也可以继续找别的例子。':'';$('missionCheck').hidden=key==='free';showHint();};
 $('mission').onchange();
 $('missionCheck').onclick=async()=>{if(checking||!ready())return;const key=$('mission').value,c=current();checking=true;$('missionCheck').disabled=true;try{
  let message='',ok=false;
  if(key==='lift'){
   if(c.case!=='continuous'||c.wheelForce!==30000||c.carY!==3.6){message='这项挑战只比较车位：请恢复“两跨相连”、每轮 30 kN、纵向车位3.60 m。其他问题仍可自由尝试。';}
   else{if(best===null){$('missionFeedback').textContent='正在用相同条件独立比较 9 个车位…';best=-Infinity;const searchParameters={...api.state().result.p};for(let i=0;i<9;i++){const r=await api.solve({...searchParameters,carX:1+i*.05});const n=r.p.n;best=Math.max(best,r.full.w[(n/2)*(2*n+1)+n*1.5]*1000);}}const gap=(best-c.right)/best;ok=gap<.002;message=ok?`这个车位达到了本题 9 个位置中的最大上抬：${c.right.toFixed(3)} mm。试试解释：车为什么能影响没有车的那一跨？`:`当前无车跨的中部上抬 ${c.right.toFixed(3)} mm，距本题最大值还差 ${(gap*100).toFixed(1)}%。再比较一个相邻车位。`;}
  }else{
   let pair=null;for(let i=saved.length-1;i>=0&&!pair;i--)for(let j=i-1;j>=0;j--){const a=saved[j],b=saved[i],sameX=a.carX===b.carX&&a.carY===b.carY;if(key==='support'&&sameX&&a.wheelForce===b.wheelForce&&[a.case,b.case].sort().join()==='cut,four'){pair=a.case==='cut'?[a,b]:[b,a];break;}if(key==='weight'&&sameX&&a.case===b.case&&a.wheelForce!==b.wheelForce){pair=[a,b];break;}}
   if(!pair)message='还没有一组能直接比较的方案。'+definitions[key][0];
   else{const [a,b]=pair;ok=true;message=key==='support'?`在相同车位和车重下，最多下沉从 ${a.down.toFixed(3)} 变为 ${b.down.toFixed(3)} mm，减少 ${(100*(1-b.down/a.down)).toFixed(1)}%。再看看两方向怎样一起弯曲。本例把横隔板所在边简化为竖向支承；没有计算横隔板自身的柔度。`:`这组方案的总重量变为 ${(b.wheelForce/a.wheelForce).toFixed(2)} 倍，下沉变为 ${(b.down/a.down).toFixed(2)} 倍。这个比例来自线弹性且支承不变的模型；若开裂或支承脱空，还能这样推吗？`;}
  }
  if(ok)done.add(key);if($('mission').value===key){$('missionFeedback').textContent=message;$('missionFeedback').dataset.passed=String(ok);}
 }catch(e){$('missionFeedback').textContent='这次计算没有完成，请重试。'+e.message;best=null;}finally{checking=false;$('missionCheck').disabled=false;}};
 $('exportTrials').onclick=()=>{const url=URL.createObjectURL(new Blob([JSON.stringify({schema:'bridge-exploration/v1',records:saved,checked:[...done]},null,2)],{type:'application/json'})),a=document.createElement('a');a.href=url;a.download='桥面探索记录.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
 document.querySelector('.guess').hidden=true;$('reveal').textContent='显示变形，开始试';$('storyHint').textContent='拖动车身挪位置；空白处拖动旋转。也可以用右侧按钮操作。';
 window.DeckExplorer={get records(){return structuredClone(saved)},get completed(){return [...done]}};
}
