"""Meter-based original geometry references for image-generation candidates G06--G08."""
from pathlib import Path
import json, math
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d.art3d import Poly3DCollection
B=Path(__file__).resolve().parents[2]
O=B/'assets/publication/imagegen-samples/references';O.mkdir(parents=True,exist_ok=True)
CONTRACTS={
'G06':{'source_figure_ids':['F27'],'units':'m','model_status':'teaching geometry, not a named real bridge or design result','coordinate_convention':'x longitudinal, y transverse, z vertical; water z=0','spans':[150,500,150],'deck_x_range':[-150,650],'tower_x':[0,500],'deck_width':24,'deck_surface_z':25,'saddle_z':87.5,'main_cable_low_z':37.5,'main_cable_sag':50,'main_span_sag_ratio':.1,'side_to_main_span_ratio':.3,'main_cable_planes_y':[-11.5,11.5],'tower_leg_centres_y':[-13.5,13.5],'tower_leg_width':3,'lane_widths':[3.5,3.5,3.5,3.5],'median_width':2,'side_strip_widths':[3,3],'outer_strip_widths':[1,1],'main_cable_diameter':.6,'hanger_diameter':.08,'anchorage_cable_end_x':[-150,650],'anchorage_cable_end_z':8,'visual_detail_assumptions':{'deck_girder_depth':2.2,'tower_leg_x_depth':4,'tower_top_z':91,'tower_crosshead_top_z':87.5,'tower_crosshead_depth':4,'hanger_spacing':10,'anchorage_block_xyz_size':[20,10,12],'no_vehicles':True},'notes':['Two ground-anchored main cables pass over both tower saddles to independent bank anchorage blocks.','Vertical main-span hangers; no fan stays.','Main-span cable z=37.5+50*((x-250)/250)^2. Side-span cable represented straight to separate anchor, not a solved cable profile.','Diameters are visual teaching assumptions; force cannot be read from thickness.','Parent supplied JTG ratio check; this generation script does not certify a code design.']},
'G07':{'source_figure_ids':['F32'],'units':'m','model_status':'teaching pile-group cutaway, not a named real foundation','coordinate_convention':'z up, ground z=0','cap_size_xyz':[8,6,2],'cap_top_z':-1,'cap_bottom_z':-3,'pile_count':8,'pile_rows':2,'piles_per_row':4,'pile_x':[-2.7,-.9,.9,2.7],'pile_y':[-1.8,1.8],'pile_diameter':1,'pile_length':20,'pile_top_z':-3,'pile_bottom_z':-23,'pier_size_xy':[2,2.5],'pier_top_z':8,'pier_bottom_z':-1,'soil_layer_z':[0,-7,-15,-24],'soil_note':'schematic layers for contact context only, no measured geology, strength, side/end load share or stresses','no_people':True,'visual_detail_assumptions':{'soil_cutaway_xy_size':[10,8]}},
'G08':{'source_figure_ids':['F36'],'units':'m','model_status':'corrosion context image; NOT the rectangular 10-percent thinning calculation in F36','coordinate_convention':'x member length, y flange width, z section depth','beam_length':1.8,'section_depth':.90,'flange_width':.45,'flange_thickness':.020,'web_thickness':.008,'length_to_depth_ratio':2,'depth_to_width_ratio':2,'flange_to_depth_ratio':.020/.9,'web_to_depth_ratio':.008/.9,'surface_condition':'local surface rust and coating peeling only; do not infer material loss, remaining thickness, strength or service life','no_hands':True,'no_instruments':True}
}
assert sum(CONTRACTS['G06']['lane_widths'])+2+6+2==24
assert 87.5-37.5==50 and 37.5>25
assert len(CONTRACTS['G07']['pile_x'])*len(CONTRACTS['G07']['pile_y'])==8
assert -3-(-23)==20 and -1-(-3)==2
assert 1.8/.9==2 and .9/.45==2

def box(ax,c,size,color,alpha=1,edge='#405462',lw=.4):
 x,y,z=c;dx,dy,dz=np.array(size)/2
 p=np.array([[x+a*dx,y+b*dy,z+c*dz] for a,b,c in [(-1,-1,-1),(1,-1,-1),(1,1,-1),(-1,1,-1),(-1,-1,1),(1,-1,1),(1,1,1),(-1,1,1)]])
 faces=[[p[i] for i in ids] for ids in [(0,1,2,3),(4,5,6,7),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7)]]
 ax.add_collection3d(Poly3DCollection(faces,facecolors=color,edgecolors=edge,linewidths=lw,alpha=alpha))
def tube(ax,p,r,color,segments=10):
 p=np.asarray(p,float);faces=[];last=None
 for i,q in enumerate(p):
  tangent=p[min(i+1,len(p)-1)]-p[max(0,i-1)];tangent/=np.linalg.norm(tangent)
  ref=np.array([0,1,0.]) if abs(tangent[1])<.9 else np.array([1,0,0.])
  u=np.cross(tangent,ref);u/=np.linalg.norm(u);v=np.cross(tangent,u)
  ring=np.array([q+r*(u*math.cos(t)+v*math.sin(t)) for t in np.linspace(0,2*math.pi,segments,endpoint=False)])
  if last is not None:
   for j in range(segments):faces.append([last[j],last[(j+1)%segments],ring[(j+1)%segments],ring[j]])
  else:faces.append(ring[::-1])
  last=ring
 faces.append(last)
 ax.add_collection3d(Poly3DCollection(faces,facecolors=color,edgecolors='none'))
def setup(limits,elev,azim):
 fig=plt.figure(figsize=(12,8),facecolor='#fcfcfa');ax=fig.add_axes([.015,.015,.97,.97],projection='3d',computed_zorder=False)
 ax.set_facecolor('#fcfcfa');ax.set_proj_type('ortho');ax.view_init(elev=elev,azim=azim)
 for dim,lim in zip(['x','y','z'],limits):getattr(ax,'set_'+dim+'lim')(lim)
 ax.set_box_aspect([hi-lo for lo,hi in limits]);ax.set_axis_off();return fig,ax

def finish(g,fig):
 fig.savefig(O/f'{g}-reference.png',dpi=150,facecolor=fig.get_facecolor());plt.close(fig)
 (O/f'{g}-dimensions.json').write_text(json.dumps(CONTRACTS[g],ensure_ascii=False,indent=2)+'\n',encoding='utf-8')

fig,ax=setup([(-190,690),(-95,95),(-8,125)],15,-69)
box(ax,(250,0,-.5),(420,160,1),'#dcecf0',.35,edge='none')
for xx in [-160,660]:
 box(ax,(xx,0,1),(55,90,2),'#eee9dc',.8,edge='none')
 for y in [-11.5,11.5]:box(ax,(xx,y,2),(20,10,12),'#bcb9af')
box(ax,(250,0,23.9),(800,24,2.2),'#8699a6')
box(ax,(250,0,25.03),(800,14+2,.06),'#b8c0c3',edge='none')
for y in [-12,12]:tube(ax,[[-150,y,26],[650,y,26]],.045,'#a9adb2',6)
for xx in [0,500]:
 for yy in [-13.5,13.5]:box(ax,(xx,yy,41.5),(4,3,99),'#aeb5b6')
 box(ax,(xx,0,85.5),(4,30,4),'#aeb5b6')
 # two saddles sit on the crosshead in the specified cable planes.
 for yy in [-11.5,11.5]:box(ax,(xx,yy,87.7),(3,1.2,.4),'#7f929b')
for y in [-11.5,11.5]:
 x=np.linspace(0,500,151);z=37.5+50*((x-250)/250)**2
 tube(ax,np.c_[x,np.full(len(x),y),z],.3,'#377887',12)
 for xx in [*range(10,500,10)]:
  zz=37.5+50*((xx-250)/250)**2;tube(ax,[[xx,y,25],[xx,y,zz]],.04,'#83979d',6)
 tube(ax,[[-150,y,8],[0,y,87.5]],.3,'#377887',12)
 tube(ax,[[500,y,87.5],[650,y,8]],.3,'#377887',12)
 # side-span deck is explicitly supported; no unsupported visual floating tail.
for xx in [-145,-75,575,645]:box(ax,(xx,0,10.4),(3,16,22),'#b9bebc')
finish('G06',fig)

fig,ax=setup([(-6,6),(-5,5),(-25,9)],15,-54)
# Only rear/side soil faces remain so the eight connected piles are inspectable.
for za,zb,col in [(0,-7,'#d9c6a2'),(-7,-15,'#cab99a'),(-15,-24,'#b1b5aa')]:
 box(ax,(0,4.5,(za+zb)/2),(10,.18,za-zb),col,.36,edge='none')
 box(ax,(5.1,0,(za+zb)/2),(.18,8,za-zb),col,.28,edge='none')
box(ax,(0,0,-23.5),(10,8,1),'#b8bab0',.6,edge='none')
for y in [1.8,-1.8]:
 for x in [-2.7,-.9,.9,2.7]:tube(ax,[[x,y,-23],[x,y,-3]],.5,'#b2bec2',20)
box(ax,(0,0,-2),(8,6,2),'#a3b0b5')
box(ax,(0,0,3.5),(2,2.5,9),'#b4bfc3')
finish('G07',fig)

fig,ax=setup([(-.2,2),(-.55,.55),(-.08,1.06)],18,-59)
box(ax,(.9,0,.010),(1.8,.45,.020),'#78909b')
box(ax,(.9,0,.890),(1.8,.45,.020),'#78909b')
box(ax,(.9,0,.45),(1.8,.008,.86),'#8aa0a9')
finish('G08',fig)
print('three dimension contracts and 1800x1200 references written',O)
