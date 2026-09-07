"""Read the imported case; create a corrected derivative GLB and six view-only renders.
Run with Blender background. Never saves over the source blend.
"""
import bpy, bmesh, json, re, shutil, math, hashlib, sys
from pathlib import Path
from mathutils import Vector

BOOK=Path(__file__).resolve().parents[2]
CASE=Path(sys.argv[sys.argv.index('--case')+1]).resolve() if '--case' in sys.argv else BOOK.parent/'三维案例_公路桥与复兴号_20260907'
OUT=BOOK/'assets/publication/blender-bridge'
for d in ['models','renders','original','records']:(OUT/d).mkdir(parents=True,exist_ok=True)
SOURCE=CASE/'blender/Highway_3x30m_T_girder.blend'
shutil.copy2(CASE/'renders/bridge_overview.png',OUT/'original/bridge_overview.png')
bpy.ops.wm.open_mainfile(filepath=str(SOURCE))
sc=bpy.context.scene
sc.unit_settings.system='METRIC';sc.unit_settings.scale_length=1
patches=[]
stations=[[.600,7.780,14.980,22.180,29.360],[30.640,37.820,45,52.180,59.360],[60.640,67.820,75.020,82.220,89.400]]
def pts(o):return [o.matrix_world@v.co for v in o.data.vertices]
def xmid(o):
 p=pts(o);return (min(v.x for v in p)+max(v.x for v in p))/2
def shift_x(o,delta):
 inv=o.matrix_world.inverted()
 for v in o.data.vertices:v.co=inv@(o.matrix_world@v.co+Vector((delta,0,0)))
 o.data.update()
for o in list(sc.objects):
 m=re.fullmatch(r'C([12])_Abutment(0|90)_Stem',o.name)
 if m:
  target=(-1.75,1.20) if m[2]=='0' else (88.80,91.75)
  pv=pts(o);lo=min(v.x for v in pv);hi=max(v.x for v in pv);inv=o.matrix_world.inverted()
  for v in o.data.vertices:
   q=o.matrix_world@v.co;q.x=target[0]+(q.x-lo)/(hi-lo)*(target[1]-target[0]);v.co=inv@q
  for mod in o.modifiers:
   if mod.type=='BEVEL':mod.width=.045
  patches.append({'object':o.name,'old_x':[lo,hi],'new_x':target,'bevel_m':.045,'scope':'教学台身支承几何修正；保留y/z'})
 m=re.fullmatch(r'C([12])_S([123])_Diaphragm([1-5])_([1-4])',o.name)
 n=re.fullmatch(r'DiaphragmClosure_([01])_([012])_([0-4])_([0-3])',o.name)
 if m or n:
  si=int(m[2])-1 if m else int(n[2]);st=int(m[3])-1 if m else int(n[3]);old=xmid(o);new=stations[si][st]
  shift_x(o,new-old);patches.append({'object':o.name,'old_station_m':old,'new_station_m':new})
assert len([x for x in patches if 'new_x'in x])==4
assert len([x for x in patches if 'new_station_m'in x])==240

# Remove scenery and its geometry from this in-memory derivative, before export.
def groupof(o):
 return o.get('category','') or (o.parent.name if o.parent else '')
export_groups={'01_Girders','02_Diaphragms','03_Deck','04_Bearings','05_Substructure','06_Foundations','07_Furniture','08_Rebar','09_Markings'}
for o in list(sc.objects):
 if not (groupof(o) in export_groups or o.name in export_groups) or o.type in {'LIGHT','CAMERA'}:
  bpy.data.objects.remove(o,do_unlink=True)

sys.path.insert(0,str(Path(__file__).resolve().parent))
from repair_rebar import repair
rebar_contract=repair(OUT)

def mat(name,color,rough=.75,metal=0,texture=False):
 m=bpy.data.materials.new(name);m.use_nodes=True;m.diffuse_color=(*color,1)
 p=m.node_tree.nodes.get('Principled BSDF');p.inputs['Base Color'].default_value=(*color,1);p.inputs['Roughness'].default_value=rough;p.inputs['Metallic'].default_value=metal
 if texture:
  ns=m.node_tree.nodes;lk=m.node_tree.links;tex=ns.new('ShaderNodeTexNoise');tex.inputs['Scale'].default_value=95;tex.inputs['Detail'].default_value=2
  coord=ns.new('ShaderNodeTexCoord');lk.new(coord.outputs['Object'],tex.inputs['Vector']);b=ns.new('ShaderNodeBump');b.inputs['Strength'].default_value=.12;b.inputs['Distance'].default_value=.0007;lk.new(tex.outputs['Fac'],b.inputs['Height']);lk.new(b.outputs['Normal'],p.inputs['Normal'])
 return m
mats={'concrete':mat('Teaching concrete',(0.66,.68,.68),texture=True),'sub':mat('Substructure warm concrete',(.61,.63,.61),texture=True),'diaphragm':mat('Diaphragm light blue grey',(.42,.58,.63),texture=True),'joint':mat('Wet joint pale blue',(.64,.77,.78)), 'road':mat('Asphalt subdued',(.20,.24,.27)), 'rubber':mat('Elastomer',(.07,.09,.11)), 'blue':mat('Support pale blue enamel',(.15,.44,.57),.35,.25),'steel':mat('Metal satin',(.43,.49,.53),.4,.6),'rebar':mat('Rebar dark steel',(.19,.23,.25),.5,.35),'duct':mat('Duct neutral bronze',(.52,.48,.36),.4,.5),'line':mat('White marking',(.92,.92,.90)), 'dark':mat('Joint dark',(.13,.17,.19))}
for o in sc.objects:
 if o.type not in {'MESH','CURVE','FONT'}:continue
 cat=groupof(o);old=' '.join(m.name for m in o.data.materials if m)
 key='concrete'
 if cat=='02_Diaphragms':key='diaphragm'
 elif cat=='06_Foundations' or cat=='05_Substructure':key='sub'
 elif 'WetJoint'in o.name:key='joint'
 elif 'Asphalt'in o.name:key='road'
 elif 'Elastomer'in o.name:key='rubber'
 elif 'Plate'in o.name:key='blue'
 elif o.name.startswith('Rebar_'):key='rebar'
 elif 'duct'in old.lower():key='duct'
 elif cat=='09_Markings':key='line'
 elif 'seal'in old or 'FormJoint'in o.name or 'FormRing'in o.name:key='dark'
 elif 'steel'in old.lower() or 'Steel'in o.name or 'Anchor'in o.name or 'Nut'in o.name:key='steel'
 o.data.materials.clear();o.data.materials.append(mats[key]);o.hide_set(False);o.hide_render=False;o.hide_viewport=False
bpy.context.view_layer.update()
bpy.ops.object.select_all(action='DESELECT')
for o in sc.objects:o.select_set(True)
if '--render-only' not in sys.argv:
 bpy.ops.export_scene.gltf(filepath=str(OUT/'models/highway_t_girder.glb'),export_format='GLB',use_selection=True,export_apply=True,export_extras=True,export_yup=True,export_cameras=False,export_lights=False)
 (OUT/'records/geometry-changes.json').write_text(json.dumps({'source_case':CASE.name,'source_blend':'blender/Highway_3x30m_T_girder.blend','source_blend_sha256':hashlib.sha256(SOURCE.read_bytes()).hexdigest(),'units':'m','changes':patches,'diaphragm_stations_m':stations,'no_original_files_modified':True,'excluded_groups':['90_Set','91_Traffic','99_Studio'],'status':'pending_independent_geometry_review'},ensure_ascii=False,indent=2),encoding='utf-8')
if '--render-only' not in sys.argv:
 record_path=OUT/'records/geometry-changes.json'
 record=json.loads(record_path.read_text(encoding='utf-8'))
 record['reinforcement_changes']='rebar-geometry-contract.json'
 record['glb_sha256']=hashlib.sha256((OUT/'models/highway_t_girder.glb').read_bytes()).hexdigest()
 record_path.write_text(json.dumps(record,ensure_ascii=False,indent=2),encoding='utf-8')
print('GLB_READY',str(OUT/'models/highway_t_girder.glb'),flush=True)

sc.render.engine='CYCLES';sc.cycles.samples=32;sc.cycles.use_denoising=True;sc.cycles.max_bounces=6
try:
 prefs=bpy.context.preferences.addons['cycles'].preferences;prefs.compute_device_type='OPTIX';prefs.get_devices()
 for d in prefs.devices:d.use=d.type=='OPTIX'
 sc.cycles.device='GPU'
except:sc.cycles.device='CPU'
sc.render.image_settings.file_format='PNG';sc.render.image_settings.color_mode='RGBA';sc.render.film_transparent=True;sc.render.resolution_percentage=100
sc.view_settings.view_transform='AgX';sc.view_settings.look='AgX - Medium High Contrast'
world=bpy.data.worlds.new('Teaching neutral studio');world.use_nodes=True;world.node_tree.nodes['Background'].inputs[0].default_value=(.83,.88,.93,1);world.node_tree.nodes['Background'].inputs[1].default_value=.40;sc.world=world
def light(name,loc,target,energy,size):
 d=bpy.data.lights.new(name,'AREA');d.energy=energy;d.shape='DISK';d.size=size;o=bpy.data.objects.new(name,d);sc.collection.objects.link(o);o.location=loc;o.rotation_euler=(Vector(target)-o.location).to_track_quat('-Z','Y').to_euler()
light('Teaching large softbox',(25,-28,65),(40,0,5),12000,55)
light('Teaching fill',(55,42,30),(40,0,7),8000,45)
light('Teaching underside bounce',(30,-15,-4),(35,-6,11),3000,28)
originals=[o for o in sc.objects if o.type in {'MESH','CURVE','FONT'}]
only_view=sys.argv[sys.argv.index('--only')+1] if '--only' in sys.argv else None
viewcopies=[];manifest=json.loads((OUT/'manifest.json').read_text(encoding='utf-8')) if only_view and (OUT/'manifest.json').exists() else []
def visible(predicate):
 for o in originals:o.hide_render=not predicate(o)
 for o in viewcopies:o.hide_render=True
 return [o for o in originals if not o.hide_render]
def bounds(objects):
 deps=bpy.context.evaluated_depsgraph_get();points=[]
 for o in objects:
  ev=o.evaluated_get(deps);points.extend(ev.matrix_world@Vector(p) for p in ev.bound_box)
 return points
def camera_for(name,objects,direction,width,height,margin=1.15):
 points=bounds(objects);lo=Vector([min(p[i]for p in points)for i in range(3)]);hi=Vector([max(p[i]for p in points)for i in range(3)]);target=(lo+hi)/2
 direction=Vector(direction).normalized();d=bpy.data.cameras.new(name);cam=bpy.data.objects.new(name,d);sc.collection.objects.link(cam);cam.location=target+direction*180;cam.rotation_euler=(-direction).to_track_quat('-Z','Y').to_euler();d.type='ORTHO';d.clip_start=.05;d.clip_end=1000
 inv=cam.rotation_euler.to_matrix().transposed();projected=[inv@(p-target)for p in points];ex=max(p.x for p in projected)-min(p.x for p in projected);ey=max(p.y for p in projected)-min(p.y for p in projected)
 # Blender horizontal sensor fit: ortho_scale is the horizontal frame extent.
 d.sensor_fit='HORIZONTAL';d.ortho_scale=max(ex,ey*width/height)*margin;sc.camera=cam;sc.render.resolution_x=width;sc.render.resolution_y=height
 return cam
def shot(id,name,objects,direction,caption,facts,notes='',height=1500):
 if only_view and id not in only_view.split(','):return
 cam=camera_for(id,objects,direction,2400,height)
 sc.render.filepath=str(OUT/'renders'/name)
 print('RENDER_START',name,flush=True);bpy.ops.render.render(write_still=True);print('RENDER_DONE',name,flush=True)
 manifest[:]=[m for m in manifest if m['id']!=id]
 manifest.append({'id':id,'image':'renders/'+name,'title':caption,'dimension_facts':facts,'display_notes':notes,'visible_objects':[o.name for o in objects],'camera':{'type':'ORTHO','location_m':list(cam.location),'rotation_euler_rad':list(cam.rotation_euler),'ortho_scale_m':cam.data.ortho_scale},'pixels':[2400,height],'geometry_source':'同一修正Blender模型；视图剖切副本未进入GLB','background':'transparent','review_status':'pending_visual_review'})
 manifest.sort(key=lambda m:m['id'])
 (OUT/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
def copy_cut(o,name,planes):
 deps=bpy.context.evaluated_depsgraph_get();me=bpy.data.meshes.new_from_object(o.evaluated_get(deps));me.transform(o.matrix_world);bm=bmesh.new();bm.from_mesh(me)
 for co,no in planes:
  bmesh.ops.bisect_plane(bm,geom=list(bm.verts)+list(bm.edges)+list(bm.faces),dist=.000001,plane_co=co,plane_no=no,clear_inner=True)
  ed=[e for e in bm.edges if e.is_boundary]
  if ed:bmesh.ops.holes_fill(bm,edges=ed,sides=0)
 bm.to_mesh(me);bm.free();me.update();ob=bpy.data.objects.new(name,me);sc.collection.objects.link(ob);viewcopies.append(ob)
 return ob

if '--rebar-only' in sys.argv:
 from render_rebar import render_rebar
 render_rebar(sc,OUT,originals,viewcopies,visible,copy_cut,camera_for,mat,rebar_contract)
 print('REBAR_RENDERS_READY',flush=True)
 sys.exit(0)

bpy.data.objects['Teaching underside bounce'].hide_render=True
objs=visible(lambda o:groupof(o)not in {'08_Rebar'})
shot('B01','bridge_overall.png',objs,(1,-1,.60),'这座桥从桥面一直延伸到地下',[ '3×30 m；双幅每幅12.50 m；全宽25.50 m','每跨每幅5片T梁，共30片；梁高2 m'],'移除环境与车辆；基础显露仅用于观察。')
bpy.data.objects['Teaching underside bounce'].hide_render=False

objs=visible(lambda o:(o.name.startswith('C1_S1_') and groupof(o)in {'01_Girders','02_Diaphragms'})or o.name.startswith('DiaphragmClosure_0_0_'))
upper=[]
for o in list(objs):
 if re.fullmatch(r'C1_S1_Girder[1-5]',o.name):
  o.hide_render=True;objs.remove(o);upper.append(copy_cut(o,'ViewCut_'+o.name,[((0,0,12.28),(0,0,-1))]))
objs+=upper
shot('B02','bridge_single_span_top.png',objs,(1,-1,1.0),'沿桥长的主梁由横隔板联系起来',['一幅第一跨；跨度30 m，5片主梁，梁间距2.575 m','横隔板站位0.600、7.780、14.980、22.180、29.360 m'],'仅此视图在z=12.28 m剖去主梁翼缘顶部以显露内部连接；铺装与湿接缝隐藏。剖切不是实际施工状态。')

visible(lambda o:False);section=[]
for o in originals:
 if o.name.startswith('C1_S1_')and(any(k in o.name for k in ['Girder','WetJoint','Topping','Asphalt']))and o.type=='MESH':
  section.append(copy_cut(o,'Section_'+o.name,[((13.9,0,0),(1,0,0)),((14.1,0,0),(-1,0,0))]))
shot('B03','bridge_five_girder_section.png',section,(-1,0,0),'一幅桥面下面有五片T梁',['单幅宽12.50 m；4×2.575+2×1.10=12.50 m','梁高2 m；铺装混凝土0.10 m+沥青0.10 m'],'从同一网格截取x=13.90～14.10 m普通跨内横断面；淡蓝表示湿接缝，颜色不代表应力。',height=950)

objs=visible(lambda o:(o.name.startswith('C1_S1_')and groupof(o)in {'01_Girders','02_Diaphragms','03_Deck'})or o.name.startswith('DiaphragmClosure_0_0_'))
shot('B04','bridge_underside_diaphragms.png',objs,(-1,-.9,-.55),'从桥底区分主梁和横隔板',['第一跨单幅；5片主梁；横隔板按修正站位布置'],'环境、其他跨及墩柱隐藏；颜色用于识别构件，不是计算结果。')

# A local cut through the first girder line at the interior pier; other girders hidden.
visible(lambda o:False);support=[]
for o in originals:
 if o.name in {'C1_S1_Girder1','C1_S2_Girder1','C1_ContinuityDiaphragm_30'}:
  support.append(copy_cut(o,'SupportView_'+o.name,[((28.6,0,0),(1,0,0)),((31.4,0,0),(-1,0,0)),((0,-12.6,0),(0,1,0)),((0,-10.7,0),(0,-1,0))]))
 elif o.name.startswith('C1_Support2_1_'):
  o.hide_render=False;support.append(o)
 elif o.name=='C1_Pier30_Cap':
  support.append(copy_cut(o,'SupportView_'+o.name,[((28.0,0,0),(1,0,0)),((32,0,0),(-1,0,0)),((0,-12.65,0),(0,1,0)),((0,-10.45,0),(0,-1,0))]))
shot('B05','bridge_support_connection.png',support,(-1,-1,.35),'梁、支座、垫石和盖梁在哪里接触',['梁底z=10.50 m，支座顶板顶z=10.50 m','永久支承线x=30 m；垫石顶z=10.08 m'],'仅取一个支承附近的局部剖开副本；支座细部为教学构造，不据外形判断自由度。')

bpy.data.objects['Teaching underside bounce'].hide_render=True
objs=visible(lambda o:o.name.startswith('C1_Pier30_')and groupof(o)in {'05_Substructure','06_Foundations'}and 'FormRing'not in o.name)
shot('B06','bridge_single_pier_foundation.png',objs,(1,-.55,.25),'桥墩下面的承台把六根桩联系起来',['承台5.30×10.20×1.90 m；六桩2×3布置','桩径1.20 m；模型桩端z=-12.00 m、桩顶z=-0.65 m','两根墩柱直径1.60 m；本下部结构为教学假设'],'完整桩尖入画；省略土体以观察构件，不表示真实基坑或承载力。')
print('ALL_RENDERS_READY',flush=True)
