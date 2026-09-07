"""Assemble 24 reviewed candidates without replacing the forty parameter figures."""
from pathlib import Path
import hashlib,json,re,shutil
from datetime import date
from PIL import Image

BOOK=Path(__file__).resolve().parents[2]
OUT=BOOK/'assets/publication/imagegen-samples'
REPORT=BOOK/'素材汇总/生成图选样'
RECORDS=OUT/'public-records';RECORDS.mkdir(exist_ok=True)
figs={f['id']:f for f in json.loads((BOOK/'assets/publication/priority-40/manifest.json').read_text(encoding='utf-8'))['figures']}
profiles=[
 ('G01','整座桥与一辆车','F01','references/G01-reference.png','两跨20+20m，桥宽10.8m；货车6×2.2×3m。车长只有全桥的15%。','用在认识整桥、支承与基础的位置。受力箭头另用原参数图。'),
 ('G02','同一块木条，换个放法','F06','G02-geometry-reference.png','两根木条均1.00×0.10×0.020m；支承中心距0.80m；其中一根绕长轴转90°。','适合生活问题的开场。图中没有加载，不能据此比较实测挠度。'),
 ('G03','桥面下面，梁怎样连在一起','F13','references/G03-reference.png','跨度20m、桥宽10.8m；5根梁，梁距2.4m；内部横隔在5、10、15m，另有两端横梁。','三版只作画风参考。生成器改动了T梁截面或板的表达；正式构造继续由参数模型绘制。'),
 ('G04','桥还没接到下一个桥墩','F19','G04-geometry-reference.png','桥宽12m、梁高2.5m；桥墩间距45m；前端20m导梁距下一墩5m；后段设岸上台座。','用于引出施工中支承位置变化。它与F19的12m简化算例不是同一模型。'),
 ('G05','斜拉桥：先看塔、索和桥面','F24','G05-geometry-reference.png','120+300+120m；桥宽22.5m；桥面以上塔高90m；主梁高2m为教学假设。','用于认识普通斜拉桥的整体外形。具体索锚位置、截面和车道横断面依参数图核对。'),
 ('G06','悬索桥的主缆一直通向哪里','F27','references/G06-reference.png','150+500+150m；桥宽24m；主缆垂度50m；最低主缆高于桥面12.5m。','用于区分主缆、吊杆、桥塔和独立地锚。不会从生成图片推算索力。'),
 ('G07','桥墩下面，还有多深','F32','references/G07-B-fixed-geometry-reference.png','承台8×6×2m；2排×4根桩，桩长20m、直径1m。B版修复了八桩可辨认布局。','A/C桩数或比例未通过，先选画风；B也须与参数底稿并列，不能靠像素量桩径。'),
 ('G08','涂层下面，钢材发生了什么','F36','references/G08-reference.png','I梁示例长1.8m、高0.9m，翼缘宽0.45m；翼缘20mm、腹板8mm为底稿尺寸。','适合观察锈蚀与剥漆。锈斑不等于减薄量；此I梁不是F36的矩形钢条算例。'),
]
forced_revision={'G03-A','G03-B','G03-C','G05-B','G05-C','G07-A','G07-C'}
def read(p):return json.loads(p.read_text(encoding='utf-8-sig'))
def public(value):
    if isinstance(value,dict):return {k:public(v) for k,v in value.items() if k not in {'original_path','original_image_path','previous_original_paths'}}
    if isinstance(value,list):return [public(v) for v in value]
    if isinstance(value,str) and re.match(r'^[A-Za-z]:[\\/]',value):return value.replace('\\','/').split('/')[-1]
    return value
def review_text(r):
    if isinstance(r,str):return r
    if not isinstance(r,dict):return '尚未提供复核文字。'
    values=[]
    for key in ['observed','findings','observations','proportion_review','limitations']:
        v=r.get(key)
        if v:values.extend(v if isinstance(v,list) else [v])
    return '\n'.join(str(x) for x in values)

groups=[];items=[];files={'manifest.json'}
for gid,title,fig,reference,dims,usage in profiles:
    assert (OUT/reference).is_file(),reference
    group={'id':gid,'title':title,'figure':fig,'chapter_url':'../'+figs[fig]['chapter_file'].replace('.qmd','.html')+'#fig-priority-'+fig,
      'original_url':'../'+figs[fig]['png'],'reference_url':'../assets/publication/imagegen-samples/'+reference,
      'dimensions_summary':dims,'usage':usage,'variants':[]}
    for variant in 'ABC':
        id=gid+'-'+variant;d=read(OUT/(id+'.json'))
        image=d.get('image') or d.get('project_path') or d.get('workspace_image')
        image=Path(image.replace('\\','/')).name;f=OUT/image
        assert f.is_file(),f
        with Image.open(f) as im: size=list(im.size);im.verify()
        assert size==[1536,1024],(id,size)
        original=d.get('original_path') or d.get('original_image_path')
        assert original and Path(original).is_file(),(id,'missing original')
        digest=hashlib.sha256(f.read_bytes()).hexdigest()
        assert digest==hashlib.sha256(Path(original).read_bytes()).hexdigest(),(id,'copy differs')
        review=d.get('visual_review',{});status=d.get('scale_status') or (review.get('review_status') or review.get('status') if isinstance(review,dict) else None) or '已作外观复看，非精确尺寸图'
        needs=id in forced_revision or bool(d.get('needs_revision')) or (isinstance(review,dict) and review.get('acceptable_for_textbook_structure') is False)
        status='画风参考；结构细节待修正' if needs else ('外观关系已复看；精确尺寸以参数底稿为准' if re.match(r'^[a-z_]+$',status) else status)
        p=public(d);p.update({'id':id,'status':'needs_revision_style_reference_only' if needs else 'context_candidate_for_author_selection','needs_revision':needs,'scale_status':status,'original_filename':Path(original).name,'image':image,'sha256':digest,'pixel_size':size})
        (RECORDS/(id+'.json')).write_text(json.dumps(p,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
        item={'id':id,'style':{'A':'写实场景','B':'三维教具','C':'线稿淡彩'}[variant],'image':'../assets/publication/imagegen-samples/'+image,
          'review':review_text(review),'scale_status':status,'needs_revision':needs,'metadata_url':'../assets/publication/imagegen-samples/public-records/'+id+'.json'}
        group['variants'].append(item);items.append({'id':id,'image':image,'metadata':'public-records/'+id+'.json','needs_revision':needs,'sha256':digest})
        files.update([image,'public-records/'+id+'.json'])
    groups.append(group)
assert len(items)==24
for p in (OUT/'references').iterdir():
    if p.suffix in {'.png','.json','.svg'} and 'check' not in p.name.lower():files.add(p.relative_to(OUT).as_posix())
for pattern in ['G??-geometry-reference.png','G??-dimension_contract.json']:
    files.update(p.name for p in OUT.glob(pattern))
data={'schema':'imagegen-review/v1','date':date.today().isoformat(),'groups':groups}
(BOOK/'interactive/imagegen-review-data.js').write_text('window.IMAGEGEN_REVIEW = '+json.dumps(data,ensure_ascii=False,indent=2)+';\n',encoding='utf-8')
manifest={'schema':'imagegen-candidates/v1','date':date.today().isoformat(),'count':24,'groups':8,'variants_per_group':3,'needs_revision_count':sum(x['needs_revision'] for x in items),'scope':'AI context/style candidates; not calibrated engineering images; original F01-F40 retained','items':items,'public_files':sorted(files)}
(OUT/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
REPORT.mkdir(parents=True,exist_ok=True)
(REPORT/'24张选样清单.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps({'candidates':24,'needs_revision':manifest['needs_revision_count'],'all_images_verified':True},ensure_ascii=False))
