/* Read-only source disclosure. Snapshots are generated from the authoring files. */
(()=>{
  const files=window.BRIDGE_PAGE_SOURCES;if(!files?.length)return;
  const section=document.createElement('section');section.className='bridge-source-viewer';
  const style=document.createElement('style');style.textContent='.bridge-source-viewer{font:14px/1.65 "Microsoft YaHei",sans-serif;max-width:1160px;margin:24px auto;padding:18px;border:1px solid #ccd9e3;border-radius:8px;background:#f4f8fb;color:#20384b}.bridge-source-viewer>h2{font-size:18px;margin:0 0 7px}.bridge-source-viewer details{margin:9px 0;background:white;border:1px solid #dce4ec;padding:10px}.bridge-source-viewer summary{cursor:pointer;font-weight:600}.bridge-source-viewer pre{overflow:auto;max-height:460px;padding:15px;background:#152b3a;color:#e2edf3;font:12px/1.6 Consolas,monospace;white-space:pre;tab-size:2}.bridge-source-viewer button{border:1px solid #8099ab;background:white;color:#174564;padding:6px 12px;margin:7px 9px 0 0;cursor:pointer}.bridge-source-viewer summary:focus-visible,.bridge-source-viewer button:focus-visible{outline:3px solid #b36514;outline-offset:3px}.bridge-source-viewer p{font-size:13px;margin:5px 0}.bridge-source-viewer .status{min-height:1.5em}@media(max-width:600px){.bridge-source-viewer{margin:15px 10px;padding:12px}}';document.head.append(style);
  const h=document.createElement('h2');h.textContent='查看本页代码';section.append(h);
  const intro=document.createElement('p');intro.textContent='展开可查看计算和绘图实现，下载后可继续复算与修改。代码对应当前页面，第三方库只列出处，不重复展示打包文件。';section.append(intro);
  const status=document.createElement('p');status.className='status';status.setAttribute('role','status');status.setAttribute('aria-live','polite');
  for(const file of files){
    const d=document.createElement('details'),s=document.createElement('summary'),pre=document.createElement('pre'),code=document.createElement('code');s.textContent=file.name;code.textContent=file.text;pre.append(code);d.append(s);
    const copy=document.createElement('button');copy.type='button';copy.textContent='复制代码';copy.onclick=async()=>{try{await navigator.clipboard.writeText(file.text);status.textContent='已复制 '+file.name;}catch{const range=document.createRange();range.selectNodeContents(code);const selection=getSelection();selection.removeAllRanges();selection.addRange(range);status.textContent='浏览器未开放剪贴板，已选中代码，可按Ctrl+C复制。';}};
    const download=document.createElement('button');download.type='button';download.textContent='下载源文件';download.onclick=()=>{const url=URL.createObjectURL(new Blob([file.text],{type:'text/plain;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download=file.name.split('/').pop();a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};d.append(copy,download,pre);section.append(d);
  }
  section.append(status);document.body.append(section);
})();
