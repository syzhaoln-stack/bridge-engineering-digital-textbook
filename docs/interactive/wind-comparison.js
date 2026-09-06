// Compare the same deterministic 0–20 s teaching signal, without changing animation time.
(()=>{const lab=window.windPhenomenaLab;if(!lab?.sampleWindow)return;
const panel=document.createElement('section');panel.className='note';panel.innerHTML='<h2>把两次结果放在一起</h2><p>取 0–20 秒内的最大、最小位移，以差值的一半表示晃动幅度。数值为示意单位，不是实桥毫米数。</p><p id="amplitudeNow"></p><button id="keepAmplitude">保存当前基准</button> <button id="doubleWind">风速增加一倍</button><p id="amplitudeComparison" aria-live="polite">先保存一次读数。</p>';
document.querySelector('.evidence').append(panel);let base=null;const now=document.getElementById('amplitudeNow'),comparison=document.getElementById('amplitudeComparison');
function update(){const a=lab.sampleWindow();now.textContent=`风速 ${a.U} m/s；晃动幅度 ${a.amplitude.toFixed(3)}（示意单位）`;
if(!base)return;
if(a.mode!==base.mode||a.shape!==base.shape||a.z!==base.z){comparison.textContent='外形、阻尼或作用机制已改变。请重新保存基准，再只改变风速。';return;}
comparison.textContent=`基准 ${base.U} m/s，幅度 ${base.amplitude.toFixed(3)}；当前 ${a.U} m/s，幅度 ${a.amplitude.toFixed(3)}。`+(base.amplitude>1e-10?`幅度为原来的 ${(a.amplitude/base.amplitude).toFixed(3)} 倍。`:'基准没有往复晃动，不能计算倍数。');}
document.getElementById('keepAmplitude').onclick=()=>{base=lab.sampleWindow();update();};document.getElementById('doubleWind').onclick=()=>{if(!base)base=lab.sampleWindow();const wind=document.getElementById('wind'),target=base.U*2;if(target>+wind.max){comparison.textContent='翻倍后超出本页风速范围，请先选择不超过 21 m/s 的基准。';return;}wind.value=target;wind.dispatchEvent(new Event('input',{bubbles:true}));update();};
document.querySelectorAll('.controls input').forEach(e=>e.addEventListener('input',update));document.querySelectorAll('#modes button,#shape button').forEach(e=>e.addEventListener('click',update));update();
})();
