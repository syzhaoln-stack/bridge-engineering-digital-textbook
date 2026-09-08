"""Inventory existing, public teaching assets; do not count duplicate formats."""
from pathlib import Path
import json
ROOT=Path(__file__).resolve().parents[2]
def read(p):return json.loads((ROOT/p).read_text(encoding='utf-8-sig'))
def exists(p):
 assert (ROOT/p).is_file(),p
 return '../'+p
D={'date':'2026-09-08','images':[],'videos':[],'lessons':[],'notebooks':[]}
ledger=read('assets/publication/imagegen-samples/selection/application-ledger.json')
names=['整桥与传力路径','搁板与尺度变化','桥面下面的构造','桥梁施工场景','斜拉桥与拉索','悬索桥与主缆','桥墩与地下基础','钢梁腐蚀与耐久']
for x in ledger['items']:
 meta=read('assets/publication/imagegen-samples/public-records/'+x['id']+'.json')
 D['images'].append(dict(id=x['id'],title=names[int(x['id'][1:3])-1],kind='ai',src=exists('assets/publication/imagegen-samples/'+x['image']),note=meta.get('style','')+' · '+x['action'],selected=x['selected'],revision=x['needs_revision']))
D['images'].sort(key=lambda x:(not x['selected'],x['revision'],x['id']))
for x in read('assets/publication/priority-40/manifest.json')['figures']:
 D['images'].append(dict(id=x['id'],title=x['title'],kind='figure',src=exists(x['svg']),note=x['caption'],link='../'+x['chapter_file'].replace('.qmd','.html')+'#fig-priority-'+x['id']))
for name in ['manifest','rebar-manifest']:
 for x in read('assets/publication/blender-bridge/'+name+'.json'):
  D['images'].append(dict(id=x['id'],title=x['title'],kind='blender',src=exists('assets/publication/blender-bridge/'+x['image']),note='；'.join(x['dimension_facts'])))
for x in read('assets/videos/dialogue-pilot/manifest.json')['videos']:
 D['videos'].append(dict(id=x['id'],title=x['title'],kind='dialogue',src=exists(x['video']),poster=exists(x['poster']),duration=x['duration_seconds'],subtitle=exists('assets/videos/dialogue-pilot/'+x['id']+'-dialogue.vtt'),script=exists('assets/videos/dialogue-pilot/'+x['id']+'-script.md')))
for x in read('assets/videos/manim/manifest.json')['videos']:
 D['videos'].append(dict(id=x['code'],title=x['title'],kind='manim',src=exists('assets/videos/manim/'+x['file']),poster=exists('assets/videos/manim/'+x['poster']),duration=x['duration_seconds']))
units=read('interactive/course-package-data.json')
for x in units['units']:
 a=x['assets']
 D['videos'].append(dict(id=x['id'],title=x['title'],kind='core',chapter=x['chapter'],src=exists(a['video']['path']),poster=exists(a['poster']['path']),duration=x['video_metadata']['duration'],subtitle=exists(a['subtitles']['path']),script=exists(a['narration']['path'])))
 if x['standalone']:
  D['lessons'].append(dict(id=x['id'],title=x['title'],chapter=x['chapter'],chapter_title=x['chapter_title'],insight=x['insight'],src=exists(x['interaction']['path'])))
for x in units['notebooks']:D['notebooks'].append(dict(title=x['title'],src=exists(x['html']),download=exists(x['ipynb'])))
from PIL import Image
thumb_dir=ROOT/'assets/publication/showcase-thumbnails'
thumb_dir.mkdir(exist_ok=True)
for x in D['images']:
 if x['kind'] in {'ai','blender'}:
  source=(ROOT/'interactive'/x['src']).resolve(); dest=thumb_dir/(x['id']+'.webp')
  with Image.open(source) as im:
   im.thumbnail((900,600));im.convert('RGB').save(dest,'WEBP',quality=82)
  x['thumb']=exists(dest.relative_to(ROOT).as_posix())
D['chapters']=[{'id':x['chapter'],'title':x['chapter_title']} for x in units['units'][::10]]
assert len(D['videos'])==len(list((ROOT/'assets/videos').rglob('*.mp4')))==130
assert len(D['lessons'])==len(list((ROOT/'interactive/lessons').glob('*.html')))==100
assert len({x['src'] for x in D['images']})==72
D['counts']={'ai_images':24,'selected_ai_images':8,'ai_in_text':5,'selected_ai_revision':3,'parameter_figures':40,'blender_figures':8,'dialogue_videos':5,'early_manim_videos':15,'core_manim_videos':110,'standalone_interactives':100,'shared_model_types':units['counts']['model_keys'],'three_d_cases':3,'notebooks':3,'chapters':11}
(ROOT/'interactive/showcase-data.js').write_text('window.SHOWCASE_DATA = '+json.dumps(D,ensure_ascii=False,separators=(',',':'))+';\n',encoding='utf-8')
(ROOT/'interactive/showcase-inventory.json').write_text(json.dumps(D,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps(D['counts'],ensure_ascii=False))
