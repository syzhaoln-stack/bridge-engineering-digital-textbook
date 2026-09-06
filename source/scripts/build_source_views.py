from pathlib import Path
import json,re,argparse
ROOT=Path(__file__).resolve().parents[1];INTER=ROOT/'interactive';OUT=INTER/'source-snapshots';OUT.mkdir(exist_ok=True)
parser=argparse.ArgumentParser();parser.add_argument('--only',nargs='*');args=parser.parse_args();pages=[INTER/name for name in args.only] if args.only else list(INTER.glob('*.html'))
for page in pages:
    text=page.read_text(encoding='utf-8-sig')
    text=re.sub(r'\s*<!-- SOURCE-VIEW START -->.*?<!-- SOURCE-VIEW END -->\s*','\n',text,flags=re.S)
    files=[{'name':page.name,'text':text}]
    for src in re.findall(r'<script[^>]+src=["\']([^"\']+)',text):
        p=INTER/src.split('?')[0]
        if 'bundles/' in src:p=ROOT/'scripts/three-src'/p.name.replace('.bundle.js','.js')
        if p.exists() and not any(x in str(p) for x in ['vendor','source-snapshots']) and p.suffix=='.js':
            files.append({'name':p.relative_to(ROOT).as_posix(),'text':p.read_text(encoding='utf-8-sig')})
    if page.name=='video-gallery.html':
        p=ROOT/'scripts/manim/bridge_series.py';files.append({'name':p.relative_to(ROOT).as_posix(),'text':p.read_text(encoding='utf-8-sig')})
    if page.name=='core-learning.html':
        p=ROOT/'scripts/manim/core_series.py';files.append({'name':p.relative_to(ROOT).as_posix(),'text':p.read_text(encoding='utf-8-sig')})
    if page.name=='fem-workbench.html':
        for name in ['deck-story-view.js','deck-explorer.js','deck-play-ui.js']:
            p=ROOT/'scripts/three-src'/name;files.append({'name':p.relative_to(ROOT).as_posix(),'text':p.read_text(encoding='utf-8-sig')})
    if page.name=='transverse-bridge.html':
        for name in ['transverse-model.mjs','transverse-scene.js','scene-shell.js']:
            p=ROOT/'scripts/three-src'/name;files.append({'name':p.relative_to(ROOT).as_posix(),'text':p.read_text(encoding='utf-8-sig')})
    (OUT/(page.stem+'.js')).write_text('window.BRIDGE_PAGE_SOURCES='+json.dumps(files,ensure_ascii=False)+';\n',encoding='utf-8')
    injection=f'\n<!-- SOURCE-VIEW START -->\n<script src="source-snapshots/{page.stem}.js"></script>\n<script src="source-viewer.js"></script>\n<!-- SOURCE-VIEW END -->\n'
    text=text.replace('</body>',injection+'</body>');page.write_text(text,encoding='utf-8')
print('Source views generated for',len(pages),'HTML pages')
