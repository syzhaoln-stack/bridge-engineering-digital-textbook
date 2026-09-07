"""One-off repair of copied object IDs, preserving all GLB BIN bytes."""
from pathlib import Path
import json,struct,hashlib

OUT=Path(__file__).resolve().parents[2]/'assets/publication/blender-bridge'
p=OUT/'models/highway_t_girder.glb';before=p.read_bytes()
json_len,json_type=struct.unpack_from('<II',before,12)
assert json_type==0x4E4F534A
doc=json.loads(before[20:20+json_len]);tail=before[20+json_len:]
changes=[]
for node in doc['nodes']:
 extra=node.get('extras',{})
 if extra.get('rebar_group') and extra.get('component_id')!=node['name']:
  changes.append({'object':node['name'],'previous_component_id':extra.get('component_id'),'component_id':node['name']})
  extra['component_id']=node['name']
assert changes
payload=json.dumps(doc,ensure_ascii=False,separators=(',',':')).encode('utf-8')
payload+=b' '*((-len(payload))%4)
after=struct.pack('<III',0x46546C67,2,20+len(payload)+len(tail))+struct.pack('<II',len(payload),json_type)+payload+tail
assert after[20+len(payload):]==tail
p.write_bytes(after)
oldsha=hashlib.sha256(before).hexdigest();newsha=hashlib.sha256(after).hexdigest()
record={'scope':'Only node extras.component_id; no geometry, transform, material or image change','previous_glb_sha256':oldsha,'glb_sha256':newsha,'bin_and_following_chunks_unchanged':True,'bin_and_following_chunks_sha256':hashlib.sha256(tail).hexdigest(),'changes':changes}
(OUT/'records/rebar-id-metadata-patch.json').write_text(json.dumps(record,ensure_ascii=False,indent=2),encoding='utf-8')
for relative in['records/geometry-changes.json','records/rebar-render-qa.json']:
 q=OUT/relative;s=q.read_text(encoding='utf-8');q.write_text(s.replace(oldsha,newsha),encoding='utf-8')
print(json.dumps({'changes':len(changes),'glb_sha256':newsha,'bin_unchanged':True},ensure_ascii=False))
