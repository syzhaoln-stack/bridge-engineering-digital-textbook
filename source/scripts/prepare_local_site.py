"""Bundle Quarto's two local ES modules into a deferred classic script for file://.

This narrowly handles the installed Quarto layout; unexpected imports fail loudly
instead of silently producing a broken bundle. Original vendor sources remain.
"""
from pathlib import Path
import re
ROOT=Path(__file__).resolve().parents[1];SITE=ROOT/'_site';vendor=SITE/'site_libs/quarto-html'
main=(vendor/'quarto.js').read_text(encoding='utf-8');tabs=(vendor/'tabsets/tabsets.js').read_text(encoding='utf-8')
imports=re.findall(r'^import .*?;\s*$',main,re.M)
assert len(imports)==1 and './tabsets/tabsets.js' in imports[0],'Quarto module imports changed; review the local bundler'
assert re.findall(r'^export\s+\w+\s+(\w+)',tabs,re.M)==['init'],'Quarto tabset exports changed'
main=main.replace(imports[0],'',1);tabs=tabs.replace('export function init()', 'function init()',1)
assert not re.search(r'^\s*(import|export)\s',main+'\n'+tabs,re.M),'Unexpected module statement'
bundle='// Local-file compatibility bundle. Original Quarto sources remain alongside this file.\n(()=>{\n"use strict";\nconst tabsets=(()=>{\n'+tabs+'\nreturn {init};\n})();\n'+main+'\n})();\n'
(vendor/'quarto-local.js').write_text(bundle,encoding='utf-8')
count=0
for p in [*SITE.glob('*.html'),*(SITE/'chapters').glob('*.html')]:
    original=p.read_text(encoding='utf-8');text=original
    text,n=re.subn(r'<script src="([^"]*site_libs/quarto-html/)quarto\.js" type="module"></script>',r'<script src="\1quarto-local.js" defer></script>',text)
    text=re.sub(r'\s*<script src="[^"]*site_libs/quarto-html/tabsets/tabsets\.js" type="module"></script>','',text)
    text=re.sub(r'(<div class="sidebar-item-container">)[ \t]+',r'\1',text)
    text=re.sub(r'(</a>)[ \t]+(\n[ \t]*</div>\n[ \t]*<ul id="quarto-sidebar-section-4")',r'\1\2',text)
    text=re.sub(r'(?m)(^\s*<ul id="quarto-sidebar-section-4"[^>]*>)[ \t]+$',r'\1',text)
    if p.name in {'core-thinking.html','core-resources.html','bridge-thinking.html','course-guide.html','legacy-tools.html','publication-images.html'}:text=re.sub(r'[ \t]+(?=\n)','',text)
    if text!=original:p.write_text(text,encoding='utf-8');count+=1
print('Prepared local Quarto scripts for',count,'book pages')
import runpy
runpy.run_path(str(ROOT/'scripts/sync_core_reading.py'))
