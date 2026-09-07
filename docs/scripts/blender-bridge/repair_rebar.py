"""A declared teaching reinforcement arrangement, not a reinforcement design.

Read and repair an in-memory copy only. Dimensions are metres; record both
the source curves and the evaluated solids before making any changes.
"""
import bpy, json, math
from mathutils import Vector

YC=-11.65
GROUPS={
 'lower_longitudinal':'下部纵向普通钢筋',
 'web_longitudinal':'腹板纵向构造钢筋',
 'flange_longitudinal':'翼缘纵向分布钢筋',
 'upper_erection':'上部纵向架立钢筋',
 'main_stirrup':'腹板闭合双肢箍',
 'flange_tie':'翼缘横向闭合联系筋',
 'prestress_duct':'预应力孔道',
 'anchor':'孔道端部锚具外形示意'}

def actual_record(o):
 deps=bpy.context.evaluated_depsgraph_get();ev=o.evaluated_get(deps);me=ev.to_mesh()
 points=[ev.matrix_world@v.co for v in me.vertices]
 result={'object':o.name,'type':o.type,'evaluated_bounds_m':[[min(p[i] for p in points)for i in range(3)],[max(p[i]for p in points)for i in range(3)]],'evaluated_vertex_count':len(points)}
 ev.to_mesh_clear()
 if o.type=='CURVE':
  result['tube_radius_m']=o.data.bevel_depth
  result['splines']=[{'closed':s.use_cyclic_u,'points_m':[list(o.matrix_world@Vector(p.co[:3]))for p in s.points]}for s in o.data.splines]
 return result

def setcurve(o,points,radius,closed=False):
 d=o.data.copy();o.data=d;d.splines.clear();s=d.splines.new('POLY');s.points.add(len(points)-1)
 inv=o.matrix_world.inverted()
 for p,co in zip(s.points,points):p.co=(*(inv@Vector(co)),1)
 s.use_cyclic_u=closed;d.bevel_depth=radius;d.bevel_resolution=3;d.resolution_u=2;d.use_fill_caps=not closed
 return o

def tag(o,group,radius=None):
 o['component_id']=o.name
 o['category']='08_Rebar';o['rebar_group']=group;o['label']=GROUPS[group]
 o['scope']='教学几何布置；非原图完整配筋；未校核承载力、锚固、疲劳与施工净距'
 if radius is not None:o['diameter_m']=radius*2
 o['girder_reference']='C1_S2_Girder1'

def repair(out):
 source=[o for o in bpy.context.scene.objects if o.name.startswith(('Rebar_','Prestress_'))]
 (out/'records/rebar-source-measured.json').write_text(json.dumps({'source':'原最终.blend，修改前直接实测','objects':[actual_record(o)for o in source]},ensure_ascii=False,indent=2),encoding='utf-8')
 changes=[]
 coords=[(-.23,10.60),(0,10.60),(.23,10.60),(-.18,10.76),(.18,10.76),(-.046,11.15),(.046,11.15),(-.046,11.65),(.046,11.65),(-.70,12.42),(-.35,12.42),(-.044,12.444),(.35,12.42),(.70,12.42),(.044,12.444)]
 template=bpy.data.objects['Rebar_Longitudinal11']
 new=template.copy();new.data=template.data.copy();new.name='Rebar_Longitudinal14';bpy.context.scene.collection.objects.link(new)
 for j,(y,z)in enumerate(coords):
  o=bpy.data.objects[f'Rebar_Longitudinal{j}'];r=.014 if j<5 else .006 if j<9 else .010
  group='lower_longitudinal'if j<5 else 'web_longitudinal'if j<9 else 'upper_erection'if j in(11,14)else 'flange_longitudinal'
  setcurve(o,[(30.42,YC+y,z),(59.58,YC+y,z)],r);tag(o,group,r)
  changes.append({'object':o.name,'group':group,'y_offset_m':y,'z_m':z,'diameter_m':r*2,'x_range_m':[30.42,59.58]})
 outline=[(-.27,10.55),(.27,10.55),(.27,10.68),(.06,10.97),(.06,12.46),(-.06,12.46),(-.06,10.97),(-.27,10.68)]
 for k in range(143):
  x=30.53+.2*k;o=bpy.data.objects[f'Rebar_Stirrup{k}']
  setcurve(o,[(x,YC+y,z)for y,z in outline],.006,True);tag(o,'main_stirrup',.006);o['station_m']=x;o['closed_loop_schematic']=True
  f=o.copy();f.data=o.data.copy();f.name=f'Rebar_FlangeTie{k}';bpy.context.scene.collection.objects.link(f)
  setcurve(f,[(x+.04,YC+y,z)for y,z in [(-.75,12.34),(.75,12.34),(.75,12.46),(-.75,12.46)]],.006,True)
  tag(f,'flange_tie',.006);f['station_m']=x+.04;f['closed_loop_schematic']=True
 for j,base in enumerate([10.80,10.94,11.08]):
  o=bpy.data.objects[f'Prestress_Duct{j}'];points=[]
  for k in range(101):
   t=k/100;points.append((30.47+t*29.06,YC,base+.98*(2*t-1)**2))
  setcurve(o,points,.031);tag(o,'prestress_duct',.031)
  o['representation']='孔道外包络圆管；不包含钢绞线，非原图实际线形'
  o['centerline_base_z_m']=base;o['rise_m']=.98;o['x_range_m']=[30.47,59.53]
  for end,point in enumerate([points[0],points[-1]]):
   a=bpy.data.objects.get(f'Prestress_Anchor{j}_{end}')
   if a:
    old=a.location.copy();a.location=Vector(point);tag(a,'anchor')
 contract={'units':'m','source':'原模型08_Rebar为representative non-design rebar cage，本次为教学几何修正','girder':'C1_S2_Girder1','girder_axis_y_m':YC,'ordinary_section_x_m':44.73,
  'counts':{'longitudinal':15,'lower_longitudinal':5,'web_longitudinal':4,'flange_longitudinal':4,'upper_erection':2,'main_stirrup':143,'flange_tie':143,'prestress_duct':3,'anchor':6},
  'longitudinal':changes,'main_stirrup':{'centerline_yz_m':outline,'radius_m':.006,'stations_m':[30.53+.2*k for k in range(143)],'closed':True},
  'flange_tie':{'centerline_yz_m':[[-.75,12.34],[.75,12.34],[.75,12.46],[-.75,12.46]],'radius_m':.006,'x_offset_from_main_stirrup_m':.04,'closed':True},
  'ducts':{'diameter_m':.062,'y_offset_m':0,'centerline_bases_z_m':[10.80,10.94,11.08],'rise_m':.98,'equation':'x=30.47+29.06*t; z=z_base+0.98*(2*t-1)^2; 0<=t<=1','representation':'孔道外包络，不是钢绞线'},
  'cover_reference':{'source':'TL30_source.pdf第8页§6.3.2(3)','minimum_net_cover_m':.030,'scope':'梁体钢筋净保护层；本次实体几何检查不等于配筋设计验证'},
  'disclosures':['新增1根架立筋，纵筋14→15根','腹板4根构造筋φ20→教学φ12，以消除原纵筋与箍肢穿插并给孔道留空间','下部第2排纵筋内收；主箍提前收窄并包围上部架立筋','143道翼缘闭合联系筋为新增教学构造，独立于腹板双肢箍','三孔道从横向布置改为腹板中央竖向错层，修复原孔道实体穿出薄腹板问题','闭合路径只表达包围关系；弯钩、弯曲半径、锚固长度、施工净距与完整配筋表均未设计','孔道端块仅锚具外形示意；不表达真实锚固区设计'],
  'labels':GROUPS,'status':'pending_independent_solid_geometry_review'}
 bpy.context.view_layer.update()
 (out/'records/rebar-geometry-contract.json').write_text(json.dumps(contract,ensure_ascii=False,indent=2),encoding='utf-8')
 return contract
