"""Render stored Notebook outputs with static, offline KaTeX mathematics.

This module never executes code cells. build_notebooks.py calls render_html after
its normal execution; `python notebooks/render_html.py --existing` regenerates
only the three HTML previews from the existing executed .ipynb files.
"""
from pathlib import Path
import hashlib, json, re, subprocess, sys
from datetime import datetime, timezone
import nbformat
from nbconvert import HTMLExporter
from bs4 import BeautifulSoup, NavigableString

HERE=Path(__file__).resolve().parent
MATH=re.compile(r'(?<!\\)(\$\$(?P<display>.+?)\$\$|\$(?!\$)(?P<inline>(?:\\.|[^$\\])+?)\$(?!\$))',re.S)

def digest(path): return hashlib.sha256(path.read_bytes()).hexdigest()

def render_html(nb,title,ident):
    html,_=HTMLExporter(template_name="lab").from_notebook_node(nb)
    soup=BeautifulSoup(html,"html.parser")
    # These notebooks contain Markdown, code, saved text and PNG outputs only.
    # Remove nbconvert's MathJax/require/Mermaid CDN scripts; calculations remain
    # pre-executed, and download functionality is added back as a local script.
    for script in list(soup.find_all("script")):script.decompose()
    soup.title.string=title
    replacements=[];formulas=[]
    for region in soup.select(".jp-RenderedMarkdown"):
        for text in list(region.find_all(string=True)):
            if any(p.name in {"pre","code","script","style"} for p in text.parents):continue
            found=list(MATH.finditer(str(text)))
            if not found:continue
            indices=[]
            for match in found:
                indices.append(len(formulas))
                formulas.append({"tex":match.group("display") if match.group("display") is not None else match.group("inline"),"display":match.group("display") is not None})
            replacements.append((text,found,indices))
    assert formulas,ident+": no mathematical formulas found"
    run=subprocess.run(["node",str(HERE/"render_math.cjs")],input=json.dumps(formulas,ensure_ascii=False),text=True,encoding="utf-8",capture_output=True,timeout=30)
    if run.returncode:raise RuntimeError(run.stderr)
    result=json.loads(run.stdout);rendered=result["rendered"]
    assert len(rendered)==len(formulas)
    for text,matches,indices in replacements:
        source=str(text);parts=[];pos=0
        for match,index in zip(matches,indices):
            if match.start()>pos:parts.append(NavigableString(source[pos:match.start()]))
            fragment=BeautifulSoup(rendered[index]["html"],"html.parser")
            if r"\begin{bmatrix}" in rendered[index]["tex"]:
                box=fragment.select_one(".katex-display")
                box["tabindex"]="0";box["role"]="region";box["aria-label"]="矩阵公式，窄屏可左右滑动或使用方向键查看完整内容"
                hint=fragment.new_tag("span",attrs={"class":"math-scroll-hint"})
                hint.string="左右滑动，可查看完整矩阵与荷载向量。"
                box.insert_after(hint)
            parts.extend(list(fragment.contents));pos=match.end()
        if pos<len(source):parts.append(NavigableString(source[pos:]))
        text.replace_with(*parts)
    assert len(soup.select(".katex"))==len(formulas)
    for region in soup.select(".jp-RenderedMarkdown"):
        for text in region.find_all(string=True):
            if any("katex" in p.get("class",[]) or p.name in {"pre","code","annotation"} for p in text.parents):continue
            assert not MATH.search(str(text)),ident+": unrendered math delimiter"
    link=soup.new_tag("link",rel="stylesheet",href="vendor/katex/katex.min.css")
    soup.head.append(link)
    style=soup.new_tag("style",id="notebook-static-math")
    style.string=".jp-RenderedMarkdown .katex-display{max-width:100%;overflow-x:auto;overflow-y:hidden;padding:.45em 0}.jp-RenderedMarkdown .katex{font-size:1.08em}.jp-RenderedMarkdown .katex-display>.katex{white-space:nowrap}.jp-RenderedMarkdown{overflow-wrap:anywhere}.math-scroll-hint{display:none}@media(max-width:600px){.math-scroll-hint{display:block;font:12px/1.6 sans-serif;color:#607681;margin:-.2em 0 .8em}}"
    soup.head.append(style)
    nav=BeautifulSoup(f'<nav style="padding:14px 24px;background:#e8f2f1;font:16px sans-serif"><a href="../interactive/course-package.html">返回课程包</a> · <a href="{ident}.ipynb" data-notebook-download="{ident}.ipynb" download>下载 Notebook</a> · <a href="{ident}.py" data-notebook-download="{ident}.py" download>下载 Python</a> · 已运行结果；浏览器不执行 Python</nav>',"html.parser").nav
    soup.body.insert(0,nav)
    script=soup.new_tag("script",src="downloads.js");soup.body.append(script)
    soup.html["data-math-rendering"]="static-katex"
    soup.html["data-math-version"]=result["version"]
    soup.html["data-math-count"]=str(len(formulas))
    final=str(soup)
    return final,{"id":ident,"engine":"KaTeX "+result["version"],"formula_count":len(formulas),"display_count":sum(f["display"] for f in formulas),"formulas":formulas,"external_runtime_scripts":[],"source_code_cells_unchanged":True}

if __name__=="__main__":
    if sys.argv[1:]!=["--existing"]:raise SystemExit("Use --existing to regenerate only HTML from the saved .ipynb outputs")
    manifest=json.loads((HERE/"manifest.json").read_text(encoding="utf-8"))
    tracked=[HERE/Path(n[key]).name for n in manifest["notebooks"] for key in ["ipynb","python"]]
    before={p.name:digest(p) for p in tracked}
    records=[]
    for n in manifest["notebooks"]:
        p=HERE/Path(n["ipynb"]).name
        nb=nbformat.read(p,as_version=4)
        html,record=render_html(nb,n["title"],n["id"])
        (HERE/(n["id"]+".html")).write_text(html,encoding="utf-8")
        record["ipynb_sha256"]=digest(p);record["python_sha256"]=digest(HERE/(n["id"]+".py"))
        records.append(record)
    assert before=={p.name:digest(p) for p in tracked},"Stored calculation files changed"
    result={"status":"PASS","time":datetime.now(timezone.utc).isoformat(),"method":"render saved outputs; no code-cell execution","ipynb_and_python_hashes_unchanged":before,"notebooks":records}
    (HERE/"math-render-manifest.json").write_text(json.dumps(result,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    print(json.dumps({"status":"PASS","notebooks":len(records),"formulas":sum(r["formula_count"] for r in records),"code_cells_reexecuted":0},ensure_ascii=False))
