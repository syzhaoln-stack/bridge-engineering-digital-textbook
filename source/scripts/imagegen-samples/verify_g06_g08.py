"""Read PNGs and source copies; write technical file checks to candidate JSON only."""
from pathlib import Path
import json, hashlib
from datetime import datetime, timezone
from PIL import Image
B=Path(__file__).resolve().parents[2]
O=B/'assets/publication/imagegen-samples'
items=[]
ids=[f'{g}-{v}' for g in ['G06','G07','G08'] for v in 'ABC']
for ident in ids+['G07-B-v1']:
 p=O/f'{ident}.png';j=O/f'{ident}.json'
 m=json.loads(j.read_text(encoding='utf-8'))
 assert m['prompt'] and m['source_figure_ids'] and m['dimensions_contract'] and m['visual_review']
 with Image.open(p) as im:
  im.verify()
 with Image.open(p) as im:
  size=list(im.size);fmt=im.format
 assert size[0]*2==size[1]*3,(ident,size)
 original=Path(m['original_image_path'])
 assert original.is_file()
 digest=hashlib.sha256(p.read_bytes()).hexdigest()
 assert digest==hashlib.sha256(original.read_bytes()).hexdigest()
 for r in m['reference_image_paths']:
  assert (B/r).is_file(),r
 checks={'format':fmt,'pixel_size':size,'aspect_ratio':'3:2','bytes':p.stat().st_size,'sha256':digest,'same_bytes_as_original':True,'checked_at_utc':datetime.now(timezone.utc).isoformat(),'note':'File integrity and format checks only; geometric/visual review is recorded separately.'}
 m['file_checks']=checks
 j.write_text(json.dumps(m,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
 items.append({'id':ident,'main_candidate':ident in ids,'png':str(p.relative_to(B)).replace('\\','/'),'json':str(j.relative_to(B)).replace('\\','/'),'visual_status':m['visual_review']['status'],'file_checks':checks})
 (O/'G06-G08-file-checks.json').write_text(json.dumps({'main_candidate_count':9,'superseded_reference_count':1,'items':items},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps({'main_candidates':len(ids),'all_files':len(items),'png_json_pairs':len(items),'sizes':sorted(set(tuple(i['file_checks']['pixel_size']) for i in items)),'all_original_hashes_match':True,'visual_statuses':{i['id']:i['visual_status'] for i in items}},ensure_ascii=True,indent=2))
