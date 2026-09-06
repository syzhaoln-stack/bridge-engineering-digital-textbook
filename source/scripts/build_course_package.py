"""Assemble the existing 110 units; do not copy videos or alter chapter sources."""
from pathlib import Path
from datetime import datetime, timezone
import argparse, json, hashlib, re
BOOK=Path(__file__).resolve().parents[1]
PAGE=BOOK/"interactive/course-package.html"
OMITTED={
 "C01U08":("C11U04","共同位移下按刚度分担，在矩阵入门单元继续练习。"),
 "C02U08":("C08U01","热应变约束的同一模型，在支座自由度单元继续练习。"),
 "C03U08":("C04U04","固定响应与移动单位荷载，在梁桥影响线单元继续练习。"),
 "C04U03":("C02U04","空心截面几何效率保留在力学基础单元。"),
 "C05U10":("C05U02","不对称加载检验拱轴的同一模型，保留在本章合理拱轴单元。"),
 "C06U10":("C06U02","调整一根索的影响矩阵路径已保留；候选补充记录习惯。"),
 "C07U07":("C07U03","主缆荷载与张力的同一模型已保留；锚碇场景继续保留候选。"),
 "C08U07":("C04U06","不等刚度横向分担保留在梁桥对应单元。"),
 "C09U09":("C09U03","气动系数条件的同一模型保留在本章前一单元。"),
 "C10U03":("C09U06","阻尼放大模型已保留，跨灾种迁移仍保留为候选。"),
}
def write_lessons(units):
    from html import escape
    template=(BOOK/"interactive/core-learning.html").read_text(encoding="utf-8")
    chosen=[u for u in units if u["id"] not in OMITTED]
    assert len(chosen)==100
    selected_ids={u["id"] for u in chosen}
    assert all(sum(u["chapter"]==c for u in chosen)==(10 if c==11 else 9) for c in range(1,12))
    output=BOOK/"interactive/lessons";output.mkdir(parents=True,exist_ok=True)
    styles="""<style>
body.lesson-page .workbench{display:block;max-width:1140px;margin:20px auto}
body.lesson-page .workbench>aside{display:none!important}
body.lesson-page header{max-width:1140px;margin:auto;gap:12px}
body.lesson-page .lesson-context{font-size:13px;color:#637c77}
@media(max-width:720px){body.lesson-page header{padding:16px;flex-wrap:wrap}body.lesson-page .workbench{margin:0}}
</style>"""
    for u in chosen:
        uid=u["id"]
        doc=template.replace("<head>",'<head><base href="../"><script>document.querySelector("base").href=new URL("../",location.href).href;</script>',1)
        doc=re.sub(r"<title>.*?</title>","<title>"+escape(u["title"])+" · "+uid+"</title>",doc,count=1)
        doc=doc.replace("</head>",styles+"</head>",1)
        doc=doc.replace("<body>",'<body class="lesson-page" data-unit="'+uid+'">',1)
        header='<header><a href="course-package.html?unit='+uid+'">← 课程包</a><span>'+uid+' · '+escape(u["chapter_title"])+'</span><a href="course-package.html?unit='+uid+'">讲解、视频与下载</a></header>'
        doc=re.sub(r"<header>.*?</header>",lambda _:header,doc,count=1,flags=re.S)
        doc=doc.replace('<h1 id="title"></h1>','<h1 id="title">'+escape(u["title"])+'</h1>',1)
        # The existing engine changes its query string. Restore this page's
        # canonical path after initialization, with a frozen asset base.
        closing='<script>(()=>{const ids=new Set('+json.dumps(sorted(selected_ids))+');history.replaceState(null,"",new URL("lessons/'+uid+'.html"+location.search,document.baseURI));function links(){document.querySelectorAll("#related a[data-unit]").forEach(a=>{const id=a.dataset.unit;a.onclick=null;a.href=ids.has(id)?"lessons/"+id+".html":"course-package.html?unit="+id;});const full=document.getElementById("student-full");if(full)full.href="lessons/'+uid+'.html?view=full";const menu=document.getElementById("student-menu");if(menu){menu.textContent="返回课程包";menu.onclick=()=>{location.href=new URL("course-package.html?unit='+uid+'",document.baseURI).href;};}}links();window.addEventListener("core:render",links);})();</script>'
        doc=doc.replace("</body>",closing+"</body>",1)
        assert '<iframe' not in doc.lower() and 'data-unit="'+uid+'"' in doc
        (output/(uid+".html")).write_text(doc,encoding="utf-8")
    return chosen

def read(path):return json.loads(path.read_text(encoding="utf-8-sig"))
def digest(path):return hashlib.sha256(path.read_bytes()).hexdigest()
def asset(path,kind):
    p=BOOK/path
    if not p.is_file():raise FileNotFoundError(path)
    return {"kind":kind,"path":path,"href":"../"+path,"bytes":p.stat().st_size}
def main():
    ap=argparse.ArgumentParser()
    default_mapping=BOOK/"notebooks/priority-40-mapping.json"
    ap.add_argument("--figure-metadata",type=Path,default=default_mapping if default_mapping.is_file() else None,help="Figure mapping JSON; defaults to notebooks/priority-40-mapping.json when present")
    args=ap.parse_args()
    units=read(BOOK/"interactive/core-lab/units.json")
    chosen=write_lessons(units)
    videos=read(BOOK/"assets/videos/core/manifest.json")
    by_video={v["id"]:v for v in videos["videos"]}
    ids={u["id"] for u in units}
    assert len(units)==110 and len(ids)==110,"Expected the existing 110 unique units"
    assert len(by_video)==110 and set(by_video)==ids,"Video manifest unit-key mismatch"
    nb_manifest=read(BOOK/"notebooks/manifest.json")
    notebooks=nb_manifest["notebooks"]
    assert len(notebooks)==3 and all(n["executed"] and n["error_count"]==0 for n in notebooks)
    for n in notebooks:
        assert set(n["unit_ids"])<=ids
        for key in ["ipynb","python","html"]:asset(n[key],"notebook")
        n.pop("outputs",None)
    packages=BOOK/"notebooks/course-packages";packages.mkdir(parents=True,exist_ok=True)
    exports=BOOK/"notebooks/course-data";exports.mkdir(parents=True,exist_ok=True)
    figure_map={u["id"]:[] for u in units}
    figure_info={"status":"not_mapped","source":None,"count":0,"mapped_units":0,"references":0}
    if args.figure_metadata:
        source=args.figure_metadata.resolve()
        figures=read(source)["figures"]
        assert len({f["id"] for f in figures})==len(figures),"Duplicate figure id"
        mapped_ids=set()
        for f in figures:
            matches=f.get("unit_ids",[])
            assert set(matches)<=ids and len(matches)==len(set(matches)),"Unknown or repeated figure unit id"
            for key in ["path"]+(["svg"] if f.get("svg") else []):
                resolved=(BOOK/f[key]).resolve()
                assert resolved.is_relative_to(BOOK.resolve()),"Figure path leaves book"
                assert resolved.is_file(),"Missing figure: "+f[key]
                fmt="png" if key=="path" else "svg"
                if f.get("file_sha256",{}).get(fmt):
                    assert digest(resolved)==f["file_sha256"][fmt],f["id"]+" figure bytes changed; review mapping"
            if not matches:continue
            a=asset(f["path"],"figure")
            svg=asset(f["svg"],"figure_svg") if f.get("svg") else None
            for uid in matches:
                note=f.get("unit_notes",{}).get(uid,"")
                assert note.strip(),f["id"]+" needs a specific unit mapping note for "+uid
                figure_map[uid].append({**a,"id":f["id"],"title":f["title"],"svg":svg,
                    "caption":f.get("caption",""),"assumptions":f.get("assumptions",[]),"mapping_note":note,
                    "origin":f.get("origin"),"status":f.get("status"),"source_manifest":f.get("source_manifest"),
                    "file_sha256":f.get("file_sha256",{})})
            mapped_ids.add(f["id"])
        figure_info={"status":"mapped","source":str(source.relative_to(BOOK)).replace("\\","/") if source.is_relative_to(BOOK) else source.name,
            "source_sha256":digest(source),"count":len(mapped_ids),"mapped_units":sum(bool(v) for v in figure_map.values()),
            "references":sum(len(v) for v in figure_map.values())}
    records=[]
    for u in units:
        uid=u["id"];render_path=BOOK/f"scripts/core-render/{uid}.json";render=read(render_path)
        assert all(render[k]==u[k] for k in ["id","chapter","model","preset"]),uid+" render key mismatch"
        v=by_video[uid]
        assert v["chapter"]==u["chapter"],uid+" video chapter mismatch"
        narration=render.get("narration",[])
        assert narration and all(isinstance(t,str) and t.strip() for t in narration),uid+" empty script"
        (exports/(uid+".json")).write_bytes(render_path.read_bytes())
        (exports/(uid+".txt")).write_text("\n\n".join(narration)+"\n",encoding="utf-8")
        assets={
            "video":asset(f"assets/videos/core/{uid}.mp4","video"),
            "subtitles":asset(f"assets/videos/core/{uid}.vtt","subtitles"),
            "poster":asset(f"assets/videos/core/posters/{uid}.jpg","poster"),
            "narration":asset(f"notebooks/course-data/{uid}.txt","narration"),
            "render_data":asset(f"notebooks/course-data/{uid}.json","render_data"),
            "model_source":asset("interactive/core-lab/models.js","shared_model_source"),
            "model_dependency":asset("interactive/influence-model.js","shared_dependency"),
        }
        assert (BOOK/assets["subtitles"]["path"]).read_text(encoding="utf-8-sig").startswith("WEBVTT"),uid+" invalid VTT header"
        standalone=uid not in OMITTED
        interaction_href=f"lessons/{uid}.html" if standalone else f"core-learning.html?unit={uid}"
        r={**u,"standalone":standalone,"candidate_note":None if standalone else OMITTED[uid][1],
           "interaction":{"href":interaction_href,"path":"interactive/"+interaction_href},
           "narration":narration,"setup":render["setup"],"assets":assets,"video_metadata":v,
           "notebooks":[n for n in notebooks if uid in n["unit_ids"]],
           "figures":figure_map[uid],
           "provenance":{"unit_source":"interactive/core-lab/units.json","render_source":f"scripts/core-render/{uid}.json","render_sha256":digest(render_path),
                         "render_copy_sha256":digest(exports/(uid+".json"))},
           "download_href":f"../notebooks/course-packages/{uid}.json",
           "model_note":"多个单元共享models.js，并由model与preset选择条件；不是每单元一套独立求解器。"}
        exported={"schema_version":1,"unit_id":uid,"assets_relative_to":"book root",
                  "note":"这是带资源引用的清单，不含视频文件；使用时保留教材目录或提供教材站点根地址。","unit":r}
        (packages/(uid+".json")).write_text(json.dumps(exported,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
        records.append(r)
    data={"schema_version":1,"built_at":datetime.now(timezone.utc).isoformat(),"title":"桥梁工程·110单元课程包",
          "counts":{"units":len(records),"chapters":len({u["chapter"] for u in records}),"standalone_lessons":len(chosen),"retained_candidates":len(OMITTED),
                    "model_keys":len({u["model"] for u in records}),"videos":len(by_video),"notebooks":len(notebooks),
                    "units_with_notebook":sum(bool(u["notebooks"]) for u in records),"figures":figure_info["count"],
                    "units_with_figures":figure_info["mapped_units"],"figure_references":figure_info["references"]},
          "sources":{"units_sha256":digest(BOOK/"interactive/core-lab/units.json"),
                     "video_manifest_sha256":digest(BOOK/"assets/videos/core/manifest.json"),
                     "models_sha256":digest(BOOK/"interactive/core-lab/models.js")},
          "selection":{"rule":"第1至10章各9个，第11章10个；保留110总目录。","omitted":[{"id":uid,"covered_by":v[0],"reason":v[1]} for uid,v in OMITTED.items()]},
          "figure_mapping":figure_info,"notebooks":notebooks,"units":records}
    (BOOK/"interactive/course-package-data.json").write_text(json.dumps(data,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    html=PAGE.read_text(encoding="utf-8")
    payload=json.dumps(data,ensure_ascii=False,separators=(",",":")).replace("</","<\\/")
    html=re.sub(r"<!-- PACKAGE_DATA_START -->.*?<!-- PACKAGE_DATA_END -->",
                lambda _: '<!-- PACKAGE_DATA_START --><script type="application/json" id="package-data">'+payload+'</script><!-- PACKAGE_DATA_END -->',
                html,flags=re.S)
    PAGE.write_text(html,encoding="utf-8")
    print(json.dumps({"status":"PASS",**data["counts"],"file_checks":"all linked local resources present","figure_mapping":figure_info},ensure_ascii=False))
if __name__=="__main__":main()
