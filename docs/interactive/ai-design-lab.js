(() => {
 const $ = id => document.getElementById(id);
 let current, verified = false;

 function readableSceneLabels() {
  if (!current) return;
  const narrow = $('scene').clientWidth < 500;
  const textSize = Math.max(19, 14 * 800 / Math.max(240, $('scene').clientWidth));
  const labels = $('scene').querySelectorAll('text');
  labels.forEach(label => label.setAttribute('font-size', String(textSize)));
  if (labels[1]) labels[1].textContent = narrow
   ? `L = ${current.model.L} m · ${current.model.fixed.length === 4 ? '端部转角固定' : '端部转角可变'}`
   : `支承中心间 L = ${current.model.L} m · ${current.model.fixed.length === 4 ? '两端转角固定' : '两端转角可变'}`;
 }

 function render() {
  verified = false;
  current = undefined;
  $('checks').hidden = true;
  $('checks').replaceChildren();
  $('verdict').textContent = '';
  $('verify').disabled = true;
  $('export').disabled = true;
  try {
   current = AIDesignModel.solveDraft($('draft').value);
   $('result').removeAttribute('role');
   $('result').textContent = `草稿算出的跨中下沉：${(current.actual * 1000).toPrecision(5)} mm`;
   if (Math.abs(current.actual) > current.model.L) {
    const warning = document.createElement('small');
    warning.dataset.modelWarning = 'true';
    warning.style.cssText = 'display:block;color:#8b521a;font-size:15px;margin-top:8px';
    warning.textContent = '数值已远超跨度，超出小变形模型范围；这条归一曲线不能解释为真实变形。';
    $('result').append(warning);
   }
   const { n, L, E, applied, fixed } = current.model;
   const max = Math.max(...current.u.filter((v, i) => i % 2 === 0).map(Math.abs));
   const points = [];
   for (let i = 0; i <= n; i++) points.push(`${80 + 640 * i / n},${130 - (max ? 80 * current.u[2 * i] / max : 0)}`);
   const clamped = fixed.length === 4;
   const supports = clamped
    ? '<g data-support="fixed"><rect x="64" y="100" width="16" height="64" fill="url(#wall)"/><rect x="720" y="100" width="16" height="64" fill="url(#wall)"/><path d="M80 100V164 M720 100V164" stroke="#61796b" stroke-width="4"/></g>'
    : '<g data-support="simple"><path d="M80 135l-16 25h32z M720 135l-16 25h32z" fill="#9eae9c"/><path d="M60 164H100 M700 174H740" stroke="#61796b" stroke-width="3"/><circle cx="711" cy="167" r="4" fill="#9eae9c"/><circle cx="729" cy="167" r="4" fill="#9eae9c"/></g>';
   $('scene').setAttribute('aria-label', `当前草稿的等效梁：${clamped ? '两端固支，转角被固定' : '两端简支，转角可变'}；跨中向下荷载 ${applied / 1000} kN；蓝线是归一显示的计算变形`);
   $('scene').innerHTML = `<defs><pattern id="wall" width="7" height="7" patternUnits="userSpaceOnUse"><rect width="7" height="7" fill="#d8e0d2"/><path d="M-1 1L1-1 M0 7L7 0 M6 8L8 6" stroke="#738878" stroke-width="1.5"/></pattern></defs><path d="M80 130H720" stroke="#93aaa2" stroke-width="7"/>${supports}<polyline points="${points.join(' ')}" fill="none" stroke="#26748b" stroke-width="4"/><path d="M400 25V110m-9-14 9 14 9-14" stroke="#b88038" stroke-width="4" fill="none"/><text x="430" y="60" fill="#5c644e" font-size="19">${(applied / 1000).toFixed(0)} kN</text><text x="400" y="254" text-anchor="middle" fill="#526c62" font-size="18">支承中心间 L = ${L} m · ${clamped ? '两端转角固定' : '两端转角可变'}</text>`;
   $('draftInput').textContent = JSON.stringify({ E_Pa: E, I_m4: current.model.I, load_N: applied, span_m: L, endRotations: clamped ? 'fixed' : 'free', elements: n }, null, 2);
   readableSceneLabels();
   $('verify').disabled = false;
   $('export').disabled = false;
  } catch (error) {
   $('scene').replaceChildren();
   $('scene').setAttribute('aria-label', '当前草稿未能计算');
   $('draftInput').textContent = '';
   $('result').setAttribute('role', 'alert');
   $('result').textContent = '这份草稿未能计算。请重新选择草稿 A—D，检查结果前先解决输入或求解问题。';
  }
 }

 $('draft').onchange = render;
 $('verify').onclick = () => {
  if (!current) return;
  verified = true;
  $('checks').replaceChildren();
  for (const c of current.checks) {
   const li = document.createElement('li');
   li.className = c.pass ? '' : 'fail';
   const b = document.createElement('b');
   b.textContent = (c.pass ? '通过 · ' : '需修正 · ') + c.name;
   const small = document.createElement('small');
   small.textContent = c.detail;
   li.append(b, small);
   $('checks').append(li);
  }
  $('checks').hidden = false;
  $('verdict').textContent = current.passed
   ? '这一基准通过。现在可以进入更完整的模型，但还不能据此宣布整座桥设计合格。'
   : '已有检查指出草稿偏离了任务书。换一份草稿，看看“能求解”和“回答了原问题”有什么不同。';
 };

 $('export').onclick = () => {
  if (!current) return;
  const a = document.createElement('a');
  const url = URL.createObjectURL(new Blob([JSON.stringify({ ...current, verificationViewed: verified, timestamp: new Date().toISOString() }, null, 2)], { type: 'application/json' }));
  a.href = url;
  a.download = 'AI辅助桥梁基准_模型与检查.json';
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
 };
 $('prompt').textContent = '请按任务书生成等效简支梁模型和可运行脚本，显式转换单位。把输入、边界、荷载、求解和检查分开；给出节点与单元表、支反力及跨中位移。用独立闭式解核对，并分别检查任务要求与实际装入的荷载。不得补入未给定的工程参数。说明这个基准不能回答什么。';
 $('code').textContent = AIDesignModel.solveDraft.toString();
 render();
 new ResizeObserver(readableSceneLabels).observe($('scene'));
 window.AIDesignLab = { get result() { return current; } };
})();
