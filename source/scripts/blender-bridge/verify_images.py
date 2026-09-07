"""Check the actual PNG framing and record the manual visual review separately."""
from pathlib import Path
from PIL import Image
import json, hashlib
root=Path(__file__).resolve().parents[2]/'assets/publication/blender-bridge'
manifest_path=root/'manifest.json'
items=json.loads(manifest_path.read_text(encoding='utf-8'))
assert len(items)==6
reviews={
 'B01':'全桥两端桥台、上部结构及全部基础进入画面；未以本场景替换原两跨简支反力示意。',
 'B02':'第一跨五梁和五道横隔板完整，三道跨内横隔板可辨；剖去梁翼缘上部与隐藏铺装的语义已记录。',
 'B03':'普通跨内真实网格截面完整呈现五片T梁，左右边梁未裁切；淡蓝接缝不是应力颜色。',
 'B04':'第一跨梁底完整，两端与跨内横隔板可见；桥底无遮挡环境，不表示加载后的变形。',
 'B05':'中墩单个支承局部，梁端/连续段/支座/垫石/盖梁的上下关系清楚；切块边缘不是构件真实端部。',
 'B06':'一幅一个墩位，自盖梁至全部桩尖进入画面；六桩采用错开投影方向，自然遮挡仍可通过交互旋转核对。',
}
checks=[]
for item in items:
 p=root/item['image'];im=Image.open(p);im.load()
 assert im.width==2400 and im.mode=='RGBA',(item['id'],im.size,im.mode)
 assert list(im.size)==item['pixels']
 alpha=im.getchannel('A');bbox=alpha.point(lambda x:255 if x>32 else 0).getbbox()
 assert bbox
 margins=[bbox[0]/im.width,bbox[1]/im.height,(im.width-bbox[2])/im.width,(im.height-bbox[3])/im.height]
 passed=min(margins)>.02
 assert passed,(item['id'],margins)
 item['review_status']='visually_reviewed_candidate'
 item['visual_review_notes']=reviews[item['id']]
 item['file_sha256']=hashlib.sha256(p.read_bytes()).hexdigest()
 item['frame_check']={'alpha_threshold':32,'content_bounds_px':list(bbox),'edge_margin_fraction':margins,'minimum_margin_required':.02,'passed':passed,'scope':'检测实际渲染像素未碰画面边界；不替代几何与图义审核'}
 checks.append({'id':item['id'],'file':item['image'],'pixels':list(im.size),'rgba':True,**item['frame_check']})
manifest_path.write_text(json.dumps(items,ensure_ascii=False,indent=2),encoding='utf-8')
(root/'records/render-qa.json').write_text(json.dumps({'images':checks,'passed':True,'count':6,'manual_review':'逐张view_image检查最终PNG；构图修正后重看','scope':'图面/像素/文件检查；非力学或结构安全验算'},ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'count':6,'passed':True,'minimum_margin':min(min(c['edge_margin_fraction'])for c in checks)},ensure_ascii=False))
