"""Meter-based original G01/G03 geometry references, no generated-image editing."""
from pathlib import Path
import json, math
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.colors import to_rgba
from mpl_toolkits.mplot3d.art3d import Poly3DCollection

BOOK=Path(__file__).resolve().parents[2]
OUT=BOOK/'assets/publication/imagegen-samples/references';OUT.mkdir(parents=True,exist_ok=True)

def box(ax,c,size,color,alpha=1):
    ax._gparts.append({'shape':'box','center':list(c),'size':list(size),'color':color,'alpha':alpha})
    x,y,z=c;dx,dy,dz=np.array(size)/2
    p=np.array([[x+a*dx,y+b*dy,z+c*dz] for a,b,c in [(-1,-1,-1),(1,-1,-1),(1,1,-1),(-1,1,-1),(-1,-1,1),(1,-1,1),(1,1,1),(-1,1,1)]])
    faces=[[p[i] for i in ids] for ids in [(0,1,2,3),(4,5,6,7),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7)]]
    ax._gfaces.extend(faces);ax._gcolors.extend([to_rgba(color,alpha)]*len(faces))

def wheel(ax,x,y,z,r=.4):
    ax._gparts.append({'shape':'wheel','center':[x,y,z],'radius':r,'width':.26,'color':'#253942','alpha':1})
    faces=[];t=np.linspace(0,2*np.pi,24)
    a=np.array([[x+r*np.cos(v),y-.13,z+r*np.sin(v)] for v in t]);b=a+[0,.26,0]
    faces=[a,b]+[[a[i],a[i+1],b[i+1],b[i]] for i in range(len(t)-1)]
    ax._gfaces.extend(faces);ax._gcolors.extend([to_rgba('#253942')]*len(faces))

def truck(ax,start,y,road):
    first=len(ax._gparts)
    # Envelope 6.0 x 2.2 x 3.0 m, wheels touch road at z=road.
    box(ax,(start+3,y,road+.65),(6,2.2,.35),'#425361')
    box(ax,(start+2.1,y,road+1.9),(4.2,2.2,2.2),'#d9a63e')
    box(ax,(start+5.25,y,road+1.6),(1.5,2.2,1.6),'#e5ba55')
    box(ax,(start+5.92,y,road+1.95),(.12,1.9,.55),'#93b4c0')
    for x in [start+1,start+5]:
        for yy in [y-.875,y+.875]:wheel(ax,x,yy,road+.4)
    for part in ax._gparts[first:]:part['asset_id']='truck'

def setup(limits,elev=18,azim=-59):
    fig=plt.figure(figsize=(12,8),facecolor='#fcfcf9');ax=fig.add_axes([0,0,1,1],projection='3d')
    ax.set_facecolor('#fcfcf9');ax.set_proj_type('ortho');ax.view_init(elev=elev,azim=azim)
    ax._gfaces=[];ax._gcolors=[];ax._gparts=[]
    for name,lim in zip('xyz',limits):getattr(ax,'set_'+name+'lim')(lim)
    ax.set_box_aspect([b-a for a,b in limits]);ax.set_axis_off();return fig,ax

def save(id,fig,contract):
    tagged=[p for p in fig.axes[0]._gparts if p.get('asset_id')=='truck']
    lows=[];highs=[]
    for p in tagged:
        size=np.array(p['size'] if p['shape']=='box' else [2*p['radius'],p['width'],2*p['radius']])
        lows.append(np.array(p['center'])-size/2);highs.append(np.array(p['center'])+size/2)
    if tagged:
        measured=(np.max(highs,axis=0)-np.min(lows,axis=0)).round(8).tolist()
        contract['assets'][0].update({'measured_size_m':measured,'transverse_center_m':1.75,'yaw_deg':0,'measurement_method':'union of actual scene part bounding boxes, prior to camera projection'})
    (OUT/f'{id}-geometry.json').write_text(json.dumps(fig.axes[0]._gparts,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    ax=fig.axes[0];ax.add_collection3d(Poly3DCollection(ax._gfaces,facecolors=ax._gcolors,edgecolors='#607983',linewidths=.25))
    fig.savefig(OUT/f'{id}-reference.png',dpi=160);plt.close(fig)
    (OUT/f'{id}-dimensions.json').write_text(json.dumps(contract,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')

ys=[-4.8,-2.4,0,2.4,4.8]
fig,ax=setup([(-2,42),(-8,8),(-3,13)],18,-65)
for span in [0,20]:
    for y in ys:box(ax,(span+10,y,7.2),(19.96,.4,1.2),'#a9b8ba')
    box(ax,(span+10,0,7.9),(19.96,10.8,.2),'#b6c7ca')
    for x in [span+5,span+10,span+15]:box(ax,(x,0,7.25),(.24,10,.9),'#a4b6b9')
    for y in [-5.25,5.25]:box(ax,(span+10,y,8.5),(19.96,.18,1),'#597e87')
for x in [0,20,40]:
    for y in ys:box(ax,(x,y,6.5),(.65,.7,.2),'#304954')
box(ax,(20,0,6.1),(2.3,10.2,.6),'#b6bdb9')
box(ax,(20,0,2.4),(2,2.5,6.8),'#b9bdb6')
box(ax,(20,0,-1.6),(7,6,1.2),'#b9b6a9')
for x in [0,40]:box(ax,(x,0,3.2),(2,10.8,6.4),'#c2c2b7')
truck(ax,5,1.75,8)
save('G01',fig,{'units':'m','evidence_type':'teaching_assumption','source_figure_ids':['F01'],
 'bridge':{'type':'girder','spans':[20,20],'total_length':40,'deck_width':10.8,'girder_depth':1.2,'girder_count':5,'girder_y':ys},
 'road':{'lane_widths':[3.5,3.5],'other_widths':[1.9,1.9]},
 'assets':[{'id':'truck','kind':'truck','target_size_m':[6,2.2,3],'measured_size_m':[6,2.2,3],'import_scale_xyz':[1,1,1]}],
 'extra':{'deck_level':8,'central_pier_width_xy':[2,2.5],'footing_size':[7,6,1.2],'footing_top_z':-1},
 'notes':['New scene model inspired by F01, not a real bridge.','Six-meter truck is 0.15 of total bridge length and 0.30 of one span.','No force magnitude inferred from this geometry.']})

fig,ax=setup([(-1,21),(-7,7),(-.2,6.6)],24,-58)
for y in ys:
    box(ax,(10,y,1.1),(20,.28,1),'#538591')
    box(ax,(10,y,1.7),(20,.8,.2),'#739ca4')
for x in [0,5,10,15,20]:box(ax,(x,0,1.3),(.24,10.0,1),'#b4c5c9')
box(ax,(10,0,1.9),(20,10.8,.2),'#d4e6e9',.19)
truck(ax,7,1.75,2)
save('G03',fig,{'units':'m','evidence_type':'teaching_assumption','source_figure_ids':['F13'],
 'bridge':{'type':'girder','spans':[20],'total_length':20,'deck_width':10.8,'girder_depth':1.2,'girder_count':5,'girder_y':ys,'diaphragm_x':[5,10,15],'expected_diaphragm_x':[5,10,15]},
 'road':{'lane_widths':[3.5,3.5],'other_widths':[1.9,1.9]},
 'assets':[{'id':'truck','kind':'truck','target_size_m':[6,2.2,3],'measured_size_m':[6,2.2,3],'import_scale_xyz':[1,1,1]}],
 'extra':{'deck_thickness':.2,'end_crossbeams':[0,20],'deck_level':2,'wheel_track':1.75,'wheelbase':4},
 'notes':['F13 core dimensions preserved: span 20m, deck width 10.8m, girder spacing 2.4m and three interior diaphragms. The original figure uses d for girder spacing; it is not girder depth.','Vehicle is a new teaching envelope, not a calibrated axle-load model.','Deck transparency is display-only; do not change any girder or diaphragm station.']})
print('G01/G03 meter references and contracts written')
