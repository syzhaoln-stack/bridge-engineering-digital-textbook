"""Common visual conventions for the first 40 original teaching figures."""
from pathlib import Path
import json
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.font_manager import FontProperties
from matplotlib.patches import Polygon, Circle, Rectangle, FancyArrowPatch
import numpy as np

BOOK=Path(__file__).resolve().parents[2]
OUT=BOOK/'assets/publication/priority-40'
OUT.mkdir(parents=True,exist_ok=True)
FONT=FontProperties(fname='C:/Windows/Fonts/msyh.ttc')
plt.rcParams.update({'font.family':FONT.get_name(),'axes.unicode_minus':False,'svg.fonttype':'none','font.size':13,'axes.labelsize':13,'axes.spines.top':False,'axes.spines.right':False,'axes.titleweight':'bold','savefig.facecolor':'white'})
INK='#173c50';BLUE='#247f9e';TEAL='#00898b';ORANGE='#d8792b';RED='#b74959';GRAY='#7b919c';LIGHT='#edf5f7';PALE='#f7f9fa'

def new(title,note='',size=(12,7.2)):
    fig=plt.figure(figsize=size,facecolor='white')
    fig.text(.055,.945,title,fontproperties=FONT,fontsize=23,color=INK,weight='bold',va='top')
    ax=fig.add_axes([.05,.13,.9,.72]);ax.set(xlim=(0,12),ylim=(0,7));ax.axis('off')
    fig.text(.055,.045,note,fontproperties=FONT,fontsize=10.5,color=GRAY,va='bottom',linespacing=1.6)
    return fig,ax

def text(ax,x,y,s,size=14,color=INK,ha='center',va='center',**kw):
    return ax.text(x,y,s,fontproperties=FONT,fontsize=size,color=color,ha=ha,va=va,**kw)

def line(ax,x,y,color=INK,lw=3,**kw):return ax.plot(x,y,color=color,lw=lw,**kw)

def arrow(ax,x,y,xx,yy,label=None,color=ORANGE,lw=2.5,offset=(0,.22),size=13):
    a=FancyArrowPatch((x,y),(xx,yy),arrowstyle='-|>',mutation_scale=17,linewidth=lw,color=color)
    ax.add_patch(a)
    if label:text(ax,(x+xx)/2+offset[0],(y+yy)/2+offset[1],label,size,color)
    return a

def dim(ax,x,y,xx,yy,label,offset=(0,-.28),color=GRAY):
    a=FancyArrowPatch((x,y),(xx,yy),arrowstyle='<->',mutation_scale=11,linewidth=1,color=color);ax.add_patch(a)
    text(ax,(x+xx)/2+offset[0],(y+yy)/2+offset[1],label,12,color)

def support(ax,x,y,kind='pin',scale=1,color=INK):
    w=.23*scale;h=.35*scale
    ax.add_patch(Polygon([[x,y],[x-w,y-h],[x+w,y-h]],closed=True,fill=False,edgecolor=color,lw=1.5))
    bottom=y-h
    if kind=='roller':
        for dx in [-.12,.12]:ax.add_patch(Circle((x+dx*scale,bottom-.06*scale),.06*scale,fill=False,edgecolor=color,lw=1))
        bottom-=.13*scale
    ax.plot([x-.31*scale,x+.31*scale],[bottom-.04*scale]*2,color=color,lw=1)
    for dx in np.arange(-.3,.3,.12):ax.plot([x+dx*scale,x+(dx-.09)*scale],[bottom-.06*scale,bottom-.16*scale],color=color,lw=.7)

def axes_style(ax,xlabel='',ylabel=''):
    ax.spines[['top','right']].set_visible(False);ax.spines[['left','bottom']].set_color(GRAY)
    ax.tick_params(colors=GRAY,labelsize=11);ax.grid(alpha=.13);ax.set_axisbelow(True)
    ax.set_xlabel(xlabel);ax.set_ylabel(ylabel);return ax

def export(fig,id,title,chapter,heading,caption,assumptions,source,checks=None):
    for ext in ['svg','png']:fig.savefig(OUT/f'{id}.{ext}',dpi=200)
    plt.close(fig)
    meta={'id':id,'title':title,'chapter':chapter,'heading':heading,'caption':caption,'assumptions':assumptions,'source_script':source,'svg':f'assets/publication/priority-40/{id}.svg','png':f'assets/publication/priority-40/{id}.png','origin':'original_parameterized_drawing','status':'draft_for_review','checks':checks or [],'visual_review':'pending'}
    (OUT/f'{id}.json').write_text(json.dumps(meta,ensure_ascii=False,indent=2),encoding='utf-8')
    return meta
