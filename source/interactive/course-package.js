(()=>{"use strict";
const $=id=>document.getElementById(id),data=JSON.parse($("package-data").textContent),units=data.units;
let selectedId=new URLSearchParams(location.search).get("unit")||"C04U05",activeTab="script";
if(!units.some(u=>u.id===selectedId))selectedId=units[0]?.id;
const text=(el,value)=>el.textContent=value;
const chapters=[...new Map(units.map(u=>[u.chapter,u.chapter_title])).entries()];
for(const [id,title] of chapters){const o=document.createElement("option");o.value=id;o.textContent="第"+id+"章 · "+title;$("chapter").append(o)}
text($("summary"),data.counts.units+"个学习单元 · "+data.counts.standalone_lessons+"个独立交互页 · "+data.counts.videos+"条已有核心视频 · "+data.counts.notebooks+"个可重跑Notebook"+(data.counts.figures?" · "+data.counts.figures+"张自制配图":""));
function filter(){
 const q=$("search").value.trim().toLowerCase(),ch=$("chapter").value;
 const found=units.filter(u=>(!ch||String(u.chapter)===ch)&&(!q||[u.id,u.title,u.insight,u.transfer,u.model].join(" ").toLowerCase().includes(q)));
 $("unitList").replaceChildren();text($("resultCount"),"找到"+found.length+"个单元");
 for(const u of found){const b=document.createElement("button");b.className="unit";b.dataset.unit=u.id;b.setAttribute("aria-current",String(u.id===selectedId));const id=document.createElement("small");id.textContent=u.id+" · "+(u.standalone?"独立交互":"候选保留");const title=document.createElement("span");title.textContent=u.title;b.append(id,title);b.onclick=()=>{select(u.id);if(matchMedia("(max-width:760px)").matches)$("detail").scrollIntoView({behavior:"smooth",block:"start"})};$("unitList").append(b)}
 if(!found.length){const p=document.createElement("p");p.className="note";p.textContent="换个关键词，或选择全部章节再试试。";$("unitList").append(p)}
}
function link(id,href){$(id).href=href}
function downloadText(filename,contents,type="text/plain;charset=utf-8"){
 const blob=new Blob([contents],{type}),url=URL.createObjectURL(blob),a=document.createElement("a");
 a.href=url;a.download=filename;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function select(id){
 const u=units.find(x=>x.id===id);if(!u)return;selectedId=id;
 $("video").pause();$("video").replaceChildren();$("video").removeAttribute("src");
 text($("unitId"),u.id+" · 第"+u.chapter+"章 · "+u.chapter_title);text($("unitTitle"),u.title);text($("insight"),u.insight);text($("transfer"),u.transfer);
 link("launch",u.interaction.href);text($("launch"),u.standalone?"开始独立交互 →":"打开候选单元 →");link("download",u.download_href);$("download").download=u.id+".json";
 $("download").onclick=e=>{e.preventDefault();downloadText(u.id+".json",JSON.stringify({schema_version:1,unit_id:u.id,assets_relative_to:"book root",note:"这是带资源引用的清单，不含视频文件；使用时保留教材目录或提供教材站点根地址。",unit:u},null,2)+"\n","application/json;charset=utf-8")};
 $("scriptText").replaceChildren();for(const para of u.narration){const p=document.createElement("p");p.textContent=para;$("scriptText").append(p)}
 link("scriptDownload",u.assets.narration.href);$("scriptDownload").download=u.id+"-讲解.txt";
 $("scriptDownload").onclick=e=>{e.preventDefault();downloadText(u.id+"-讲解.txt",u.narration.join("\n\n")+"\n")};
 $("video").src=u.assets.video.href;$("video").poster=u.assets.poster.href;
 const track=document.createElement("track");track.kind="subtitles";track.srclang="zh";track.label="中文";track.src=u.assets.subtitles.href;track.default=true;$("video").append(track);
 link("videoDownload",u.assets.video.href);link("vttDownload",u.assets.subtitles.href);
 text($("videoInfo"),u.id+" · "+u.video_metadata.duration.toFixed(1)+"秒 · "+u.video_metadata.width+"×"+u.video_metadata.height+" · 原有本地合成语音");
 $("modelSetup").replaceChildren();
 for(const [k,v] of [["改变什么",u.setup.label],["输入单位",u.setup.unit||"无量纲 / 以模型说明为准"],["观察什么",u.setup.output],["输出单位",u.setup.outunit||"比例 / 以模型说明为准"],["关系",u.setup.formula],["适用条件",u.setup.boundary]]){
 const dt=document.createElement("dt"),dd=document.createElement("dd");dt.textContent=k;dd.textContent=v;$("modelSetup").append(dt,dd)}
 text($("setupJson"),JSON.stringify({unit:u.id,model:u.model,preset:u.preset,...u.setup},null,2));text($("modelNote"),u.model+" / "+u.preset+"。"+u.model_note+"本课程包共"+data.counts.model_keys+"个模型键。");
 link("modelSource",u.assets.model_source.href);link("modelDependency",u.assets.model_dependency.href);link("renderDownload",u.assets.render_data.href);
 $("notebookList").replaceChildren();
 if(!u.notebooks.length){const p=document.createElement("p");p.textContent="这个单元暂未配Notebook。可以先用上面的交互、视频和计算数据探索。";$("notebookList").append(p)}
 for(const nb of u.notebooks){const card=document.createElement("article");card.className="notebook";const h=document.createElement("h3"),p=document.createElement("p"),links=document.createElement("div");h.textContent=nb.title;p.textContent=nb.mapping_note;links.className="links";for(const [label,key,download] of [["查看运行结果","html",false],["下载.ipynb","ipynb",true],["下载Python","python",true]]){const a=document.createElement("a");a.textContent=label;a.href="../"+nb[key];if(download){a.download=nb[key].split("/").pop();a.dataset.notebookDownload=a.download;}links.append(a)}card.append(h,p,links);$("notebookList").append(card)}
 $("figureSection").hidden=!u.figures.length;$("figureList").replaceChildren();for(const f of u.figures){
 const fig=document.createElement("figure"),im=document.createElement("img"),cap=document.createElement("figcaption"),zoom=document.createElement("a");
 fig.dataset.figure=f.id;im.src=f.href;im.alt=f.id+" · "+f.title;im.loading="lazy";
 zoom.href=f.svg?.href||f.href;zoom.target="_blank";zoom.rel="noopener";zoom.setAttribute("aria-label","放大查看 "+f.id+" "+f.title);zoom.append(im);
 const title=document.createElement("strong"),note=document.createElement("p"),details=document.createElement("details"),summary=document.createElement("summary"),caption=document.createElement("p");
 title.textContent=f.id+" · "+f.title;note.className="figure-mapping";note.textContent=f.mapping_note;summary.textContent="图注与适用条件";caption.textContent=f.caption;details.append(summary,caption);
 if(f.assumptions?.length){const ul=document.createElement("ul");for(const text of f.assumptions){const li=document.createElement("li");li.textContent=text;ul.append(li)}details.append(ul)}
 const links=document.createElement("p");links.className="figure-links";
 for(const [label,href] of [["放大查看SVG",f.svg?.href],["查看PNG原图",f.href]]){if(!href)continue;const a=document.createElement("a");a.textContent=label;a.href=href;a.target="_blank";a.rel="noopener";links.append(a)}
 cap.append(title,note,details,links);fig.append(zoom,cap);$("figureList").append(fig);
}
 history.replaceState(null,"","?unit="+encodeURIComponent(id));filter();
 window.CoursePackage={selectedId:id,unit:u,counts:data.counts,activeTab};
}
function tab(name){
 activeTab=name;document.querySelectorAll("[data-tab]").forEach(b=>{const active=b.dataset.tab===name;b.setAttribute("aria-selected",String(active));b.tabIndex=active?0:-1;$("panel-"+b.dataset.tab).hidden=!active});
 if(name!=="video")$("video").pause();if(window.CoursePackage)window.CoursePackage.activeTab=name;
}
document.querySelectorAll("[data-tab]").forEach(b=>{b.onclick=()=>tab(b.dataset.tab);b.onkeydown=e=>{const order=["script","video","code","notebook"];if(!["ArrowLeft","ArrowRight","Home","End"].includes(e.key))return;e.preventDefault();const i=order.indexOf(activeTab),next=e.key==="Home"?0:e.key==="End"?3:(i+(e.key==="ArrowRight"?1:3))%4;tab(order[next]);$("tab-"+order[next]).focus()}});
$("search").oninput=filter;$("chapter").onchange=filter;select(selectedId);tab("script");
})();
