(()=>{'use strict';
const $=id=>document.getElementById(id),T=window.CORE_TEACHING;
let current,lastValue,correct='',checked=false,ran=false,body='';
function build(){const u=CoreLab.unit,z=CoreLab.setup;current=u.id;checked=false;ran=false;
body=`// 当前单元：${u.title}\n// v：${z.label}${z.unit?'（'+z.unit+'）':''}\n// p：本单元预设；z：页面公开的参数与假定\n// 压应力及作用效应的符号约定见模型说明\nlet value=0, read={}, diagram={};\n${T.code[u.model]}\nreturn value;`;
$('calculation-code').textContent=body;$('code-result').textContent='';
$('code-dependencies').textContent='参数预设：'+u.preset+'。输出：'+z.output+(z.outunit?'（'+z.outunit+'）':'')+'。'+(u.model==='influence'?'影响线求解依赖下方完整源码中的 createInfluenceModel；这里展示荷载遍历与积分部分。':'这里摘取正在驱动画面的计算分支；下方完整源码包含参数定义、读数和绘图。');
const bad=T.distractors[u.model]||['本页给定的教学数值可直接作为任何实桥的设计取值。','不核对荷载、材料与边界条件，也能把本页结果直接迁移到其他结构。'];
let options=[{id:'valid',text:z.boundary},{id:'wrong1',text:bad[0]},{id:'wrong2',text:bad[1]}];
const shift=[...u.id].reduce((s,c)=>s+c.charCodeAt(0),0)%3;options=options.slice(shift).concat(options.slice(0,shift));correct='valid';
$('boundary-options').replaceChildren(...options.map(o=>{const label=document.createElement('label'),input=document.createElement('input');input.type='radio';input.name='boundary-answer';input.value=o.id;input.onchange=()=>{checked=false;$('boundary-feedback').textContent='选择已改变，请重新核对。';};label.append(input,document.createTextNode(o.text));return label;}));$('boundary-feedback').textContent='';$('self-check-summary').textContent='完成预测、调参和条件判断后，可导出三项记录。';
}
function sync(){if(!window.CoreLab)return;if(current!==CoreLab.unit.id)build();if(lastValue!==CoreLab.value){ran=false;$('code-result').textContent='';lastValue=CoreLab.value;}$('code-input').textContent=String(Number(CoreLab.value.toPrecision(7)));}
$('run-code').onclick=()=>{const u=CoreLab.unit,z=CoreLab.setup;let influence;
if(u.model==='influence'){influence=window.createInfluenceModel();influence.configure('continuous','mid');}
// Only the repository-owned, read-only excerpt is executed; no submitted student code is evaluated.
const value=Function('u','v','m','p','z','root','influence','erf',body)(u,CoreLab.value,u.model,u.preset,z,window,influence,CoreModels.erf),expected=CoreLab.result.value,ok=Math.abs(value-expected)<=1e-9*Math.max(1,Math.abs(expected));ran=ok;
$('code-result').textContent=`代码输出 ${Number(value.toPrecision(7))}；画面读数 ${Number(expected.toPrecision(7))}。${ok?'两者一致。':'不一致，请停止采用本次结果并检查模型。'}`;
};
$('check-boundary').onclick=()=>{const answer=document.querySelector('input[name="boundary-answer"]:checked')?.value;if(!answer){$('boundary-feedback').textContent='先选出符合本页计算的一项。';return;}checked=true;const ok=answer===correct;$('boundary-feedback').textContent=ok?'判断正确。迁移时请逐项核对这些假定；公式相似不代表适用范围相同。':'这项扩大了模型适用范围或混淆了概念。请打开“模型假定与类比边界”，对照后再选。';const a=CoreLab.attempt();$('self-check-summary').textContent=`当前客观核对：${Number(a.predictionPassed)+Number(a.passed)+Number(ok)}/3 项符合本页模型。开放解释题仍需论证和讨论。`;window.dispatchEvent(new CustomEvent('bridge:attempt',{detail:a}));};
window.CoreTeaching={record:()=>({boundaryAnswer:document.querySelector('input[name="boundary-answer"]:checked')?.value||'',boundaryChecked:checked,boundaryPassed:checked&&document.querySelector('input[name="boundary-answer"]:checked')?.value===correct,codeCompared:ran})};
window.addEventListener('core:render',sync);sync();
})();
