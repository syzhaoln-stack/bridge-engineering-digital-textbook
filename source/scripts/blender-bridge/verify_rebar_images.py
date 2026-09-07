"""Pixel/framing checks for two reinforcement views, plus six-file regression."""
from pathlib import Path
import json,hashlib
from PIL import Image

BOOK=Path(__file__).resolve().parents[2]
OUT=BOOK/'assets/publication/blender-bridge'
manifest=json.loads((OUT/'rebar-manifest.json').read_text(encoding='utf-8'))
assert len(manifest)==2
checks=[]
for row in manifest:
 p=OUT/row['image'];im=Image.open(p);im.load()
 assert im.width==2400 and im.mode=='RGBA'
 alpha=im.getchannel('A');bbox=alpha.point(lambda v:255 if v>32 else 0).getbbox()
 margin=min(bbox[0]/im.width,bbox[1]/im.height,(im.width-bbox[2])/im.width,(im.height-bbox[3])/im.height)
 assert margin>.02,(p.name,bbox)
 assert row['sha256']==hashlib.sha256(p.read_bytes()).hexdigest()
 assert row['pixels']==[im.width,im.height]
 for label in row['label_anchors']:
  x,y=label['image_px'];assert 0<=x<=im.width and 0<=y<=im.height
 row['pixel_qa']={'alpha_bbox_px':bbox,'minimum_edge_margin_fraction':round(margin,4),'rgba_decodes':True,'labels_inside_frame':True}
 row['status']='visually_reviewed_candidate; independent_geometry_review_recorded_separately'
 checks.append({'image':row['image'],**row['pixel_qa']})
old=json.loads((OUT/'manifest.json').read_text(encoding='utf-8'))
assert len(old)==6
for row in old:assert row['file_sha256']==hashlib.sha256((OUT/row['image']).read_bytes()).hexdigest(),row['image']
(OUT/'rebar-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
(OUT/'records/rebar-render-qa.json').write_text(json.dumps({'checks':checks,'original_six_images_sha256_unchanged':True,'geometry_glb_sha256':hashlib.sha256((OUT/'models/highway_t_girder.glb').read_bytes()).hexdigest(),'manual_review':'逐张查看：全长完整，15纵筋/闭合主箍/翼缘联系筋分组可辨；截面普通钢筋为实心、孔道为空心显示环，保留真实T形外边界；透明背景用于白底书页。'},ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'two_rebar_images':'passed','original_six_images':'unchanged','checks':checks},ensure_ascii=False))
