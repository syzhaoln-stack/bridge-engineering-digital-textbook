"""Original orthographic geometry for an eight-pile material-only image edit."""
from pathlib import Path
_base=Path(__file__).with_name('geometry_c.py').read_text(encoding='utf-8')
exec(_base.split('\nfig,ax=setup')[0])
fig,ax=setup([(-5.5,5.5),(-4.5,4.5),(-24.5,9)],12,-76)
# Subtract almost all surrounding soil. Only a base bed and rear thin section remain.
for za,zb,col in [(0,-7,'#ded0b6'),(-7,-15,'#d3c7b0'),(-15,-23,'#bec2b7')]:
 box(ax,(0,4.2,(za+zb)/2),(9,.10,za-zb),col,.25,edge='none')
box(ax,(0,0,-23.4),(9,7.5,.8),'#c8c8bb',1,edge='#92988e',lw=.15)
centres=[]
for y,col in [(1.8,'#829aa5'),(-1.8,'#b7cbd3')]:
 for x in [-2.7,-.9,.9,2.7]:
  tube(ax,[[x,y,-23],[x,y,-3]],.5,col,64)
  centres.append([x,y])
box(ax,(0,0,-2),(8,6,2),'#a3b5bc',1,lw=.3)
box(ax,(0,0,3.5),(2,2.5,9),'#bdcdd2',1,lw=.3)
fig.savefig(O/'G07-B-fixed-geometry-reference.png',dpi=150,facecolor=fig.get_facecolor())
plt.close(fig)
assert len(centres)==8 and len(set(map(tuple,centres)))==8
(O/'G07-B-fixed-geometry-checks.json').write_text(json.dumps({'pile_centres':centres,'count':8,'diameter_m':1,'length_m':20,'camera':{'projection':'orthographic','elevation_degrees':12,'azimuth_degrees':-76},'view_note':'rear row darker from material shade only, no load or stress colors; rear soil mostly removed for inspection','checks':['eight distinct centers','top -3 meets cap bottom -3','bottom -23 meets soil top -23','true equal meter axis scale']},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(O/'G07-B-fixed-geometry-reference.png')
