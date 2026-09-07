"""Two separate reinforcement views. Does not alter the six bridge views."""
import bpy,json,hashlib,math
from bpy_extras.object_utils import world_to_camera_view
from mathutils import Vector

def render_rebar(sc,out,originals,viewcopies,visible,copy_cut,camera_for,mat,contract):
 # These materials and view cuts are applied only after the GLB export.
 colors={'lower_longitudinal':(.13,.19,.24),'web_longitudinal':(.28,.36,.39),'flange_longitudinal':(.26,.38,.34),'upper_erection':(.04,.36,.45),'main_stirrup':(.61,.21,.10),'flange_tie':(.55,.38,.19),'prestress_duct':(.57,.49,.26),'anchor':(.25,.31,.35)}
 materials={k:mat('Rebar view '+k,c,.52,.25)for k,c in colors.items()}
 for o in originals:
  if o.get('rebar_group')in materials:
   o.data.materials.clear();o.data.materials.append(materials[o['rebar_group']])
 ghost=bpy.data.materials.new('View only transparent concrete');ghost.use_nodes=True
 ns=ghost.node_tree.nodes;ns.clear();output=ns.new('ShaderNodeOutputMaterial');mix=ns.new('ShaderNodeMixShader');mix.inputs[0].default_value=.075
 trans=ns.new('ShaderNodeBsdfTransparent');body=ns.new('ShaderNodeBsdfPrincipled');body.inputs['Base Color'].default_value=(.55,.64,.68,1);body.inputs['Roughness'].default_value=.85
 lk=ghost.node_tree.links;lk.new(trans.outputs[0],mix.inputs[1]);lk.new(body.outputs[0],mix.inputs[2]);lk.new(mix.outputs[0],output.inputs['Surface'])
 sc.cycles.samples=48;sc.cycles.transparent_max_bounces=24
 bpy.data.objects['Teaching underside bounce'].hide_render=True
 # A local, broad light avoids an excessively dark 12 mm bar cage.
 d=bpy.data.lights.new('Rebar local softbox','AREA');d.energy=900;d.shape='DISK';d.size=14
 lamp=bpy.data.objects.new('Rebar local softbox',d);sc.collection.objects.link(lamp);lamp.location=(44,-22,22);lamp.rotation_euler=(Vector((45,-11.65,11.5))-lamp.location).to_track_quat('-Z','Y').to_euler()
 manifest=[]
 def render(id,filename,objects,direction,height,title,notes,labels):
  cam=camera_for(id,objects,direction,2400,height,1.18)
  sc.render.filepath=str(out/'renders'/filename)
  print('RENDER_START',filename,flush=True);bpy.ops.render.render(write_still=True);print('RENDER_DONE',filename,flush=True)
  anchors=[]
  for name,xyz in labels:
   q=world_to_camera_view(sc,cam,Vector(xyz));anchors.append({'label':name,'world_m':xyz,'image_px':[round(q.x*2400,1),round((1-q.y)*height,1)]})
  manifest.append({'id':id,'image':'renders/'+filename,'title':title,'pixels':[2400,height],'sha256':hashlib.sha256((out/'renders'/filename).read_bytes()).hexdigest(),'visible_objects':[o.name for o in objects],'camera':{'type':'ORTHO','location_m':list(cam.location),'rotation_euler_rad':list(cam.rotation_euler),'ortho_scale_m':cam.data.ortho_scale},'frame_semantics':notes,'label_anchors':anchors,'dimension_facts':['单片中跨边梁，模型梁长29.30 m，梁高2.00 m','15根普通纵筋；143道腹板主箍和143道独立翼缘联系筋','三条φ62 mm孔道为外包络示意，不含钢绞线'],'geometry_contract':'records/rebar-geometry-contract.json','status':'pending_visual_and_independent_geometry_review'})
  (out/'rebar-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
 beam=bpy.data.objects['C1_S2_Girder1']
 objs=visible(lambda o:o.name==beam.name or bool(o.get('rebar_group')))
 beam.data.materials.clear();beam.data.materials.append(ghost)
 render('R01','rebar_overview.png',objs,(-.14,-1,.20),650,'把混凝土变透明，看一片梁里的钢筋和孔道','全长视图；仅混凝土改为半透明，钢筋/孔道均保持实际教学模型尺寸；其他桥梁构件隐藏。密集线条是143道箍筋，间距0.20 m。',[('腹板闭合双肢箍',(42.13,-11.71,11.45)),('上部纵向架立钢筋',(47,-11.694,12.444)),('预应力孔道',(38,-11.65,11.167))])
 visible(lambda o:False);section=[]
 planes=[((44.705,0,0),(1,0,0)),((44.795,0,0),(-1,0,0))]
 for o in originals:
  group=o.get('rebar_group')
  if group in('main_stirrup','flange_tie') and not 44.705<o.get('station_m',0)<44.795:continue
  if group=='prestress_duct':
   # A hollow section display symbol replaces the solid outer-envelope cap.
   # Its ring thickness is only a graphic convention, not a duct specification.
   verts=[];faces=[];base=o.get('centerline_base_z_m')
   for x in(44.705,44.795):
    z=base+.98*(2*(x-30.47)/29.06-1)**2
    for r in(.031,.0285):
     verts.extend((x,-11.65+r*math.cos(a*math.tau/48),z+r*math.sin(a*math.tau/48))for a in range(48))
   for k in range(48):
    n=(k+1)%48
    faces.extend([(k,n,96+n,96+k),(48+k,144+k,144+n,48+n),(k,48+k,48+n,n),(96+k,96+n,144+n,144+k)])
   me=bpy.data.meshes.new('Duct hollow section display');me.from_pydata(verts,[],faces);me.materials.append(materials['prestress_duct'])
   cut=bpy.data.objects.new('ViewHollowSection_'+o.name,me);sc.collection.objects.link(cut);section.append(cut);viewcopies.append(cut)
   continue
  if o.name==beam.name or group not in(None,'anchor'):
   cut=copy_cut(o,'RebarSection_'+o.name,planes)
   if len(cut.data.vertices):section.append(cut)
   else:cut.hide_render=True
 # Perpendicular view keeps the T shape and the closed wrapping relationships legible.
 render('R02','rebar_section.png',section,(-1,0,0),1900,'上部钢筋由什么围住','截取x=44.705～44.795 m，包含主箍x=44.730 m和翼缘联系筋x=44.770 m。半透明T梁背景保留真实外边界；纵筋端面是切开的实体钢筋。孔道断面以空心环显示，环厚仅为识别空腔的显示符号；完整GLB仍保留孔道外包络，不含钢绞线。',[('腹板闭合双肢箍',(44.73,-11.71,11.7)),('上部纵向架立钢筋',(44.72,-11.694,12.444)),('翼缘横向闭合联系筋',(44.77,-12.40,12.40)),('翼缘纵向分布钢筋',(44.71,-12.0,12.42)),('腹板纵向构造钢筋',(44.71,-11.696,11.65)),('下部纵向普通钢筋',(44.71,-11.88,10.60)),('预应力孔道',(44.71,-11.65,10.94))])
