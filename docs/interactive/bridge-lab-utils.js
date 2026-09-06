function bindRange(state,id,render){
  const input=document.getElementById(id),out=document.getElementById(id+'-out');
  const update=()=>{state[id]=Number(input.value);const n=(String(input.step).split('.')[1]||'').length;out.textContent=Number(input.value).toFixed(Math.min(n,3))+(input.dataset.unit||'');render()};
  input.addEventListener('input',update);update();
}
function bindSelect(state,id,render){const input=document.getElementById(id);input.addEventListener('change',()=>{state[id]=input.value;render()});state[id]=input.value}
function exportSvg(svg,fileName){
  const copy=svg.cloneNode(true);copy.setAttribute('xmlns','http://www.w3.org/2000/svg');
  const css=getComputedStyle(document.documentElement);const style=document.createElementNS('http://www.w3.org/2000/svg','style');
  style.textContent=`.axis{stroke:#81959f;stroke-width:1}.grid{stroke:#e3eaee;stroke-width:1}.structure{stroke:#183342;stroke-width:5;fill:none}.force{stroke:#c7632d;stroke-width:3;fill:none}.reaction{stroke:#146c94;stroke-width:3;fill:none}.dim{stroke:#7e919a;stroke-width:1.2;fill:none}.label{fill:#183342;font:15px sans-serif}.small{fill:#607783;font:13px sans-serif}.curve{stroke:#146c94;stroke-width:3;fill:none}.curve2{stroke:#c7632d;stroke-width:3;fill:none}.curve3{stroke:#2d7b68;stroke-width:3;fill:none}.point{fill:#c7632d;stroke:#fff;stroke-width:2}.solid{fill:#d9e7ed;stroke:#183342;stroke-width:2}.void{fill:#fff;stroke:#183342;stroke-width:2}.support{fill:#eaf2f5;stroke:#183342;stroke-width:2}`;
  copy.insertBefore(style,copy.firstChild);const blob=new Blob([new XMLSerializer().serializeToString(copy)],{type:'image/svg+xml'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=fileName;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),1000);
}
