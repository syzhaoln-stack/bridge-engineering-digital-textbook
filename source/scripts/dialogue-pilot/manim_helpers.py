from manim import *
import numpy as np
INK='#173c50';BLUE='#247f9e';TEAL='#00898b';ORANGE='#d8792b';RED='#b74959';GRAY='#718895';PALE='#edf5f7'
FONT='Microsoft YaHei'
def tx(s,x=0,y=0,size=25,color=INK,width=None):
    t=Text(str(s),font=FONT,font_size=size,color=color,line_spacing=.7)
    if width and t.width>width:t.scale_to_fit_width(width)
    return t.move_to([x,y,0])
def ln(x,y,xx,yy,color=INK,w=4):return Line([x,y,0],[xx,yy,0],color=color,stroke_width=w)
def arr(x,y,xx,yy,color=ORANGE,w=4):return Arrow([x,y,0],[xx,yy,0],buff=0,color=color,stroke_width=w,max_tip_length_to_length_ratio=.22)
def support(x,y,roller=False):
    g=VGroup(Polygon([x,y,0],[x-.18,y-.28,0],[x+.18,y-.28,0],color=INK,fill_opacity=0,stroke_width=2))
    b=y-.32
    if roller:
        for z in [-.10,.10]:g.add(Circle(radius=.055,color=INK,stroke_width=1.5).move_to([x+z,b-.02,0]))
        b-=.11
    g.add(ln(x-.27,b,x+.27,b,GRAY,2));return g
def fixed(x,y):
    g=VGroup(ln(x,y-.4,x,y+.4,INK,4))
    for dy in np.linspace(-.35,.3,6):g.add(ln(x-.18,y+dy-.12,x,y+dy,GRAY,1.5))
    return g
def block(label,x,y,w=3.4,h=.78,color=BLUE):
    return VGroup(RoundedRectangle(width=w,height=h,corner_radius=.07,stroke_color=color,stroke_width=1.5,fill_color=PALE,fill_opacity=1).move_to([x,y,0]),tx(label,x,y,24,color,width=w-.25))
def summary(lines):
    g=VGroup()
    for i,(left,right) in enumerate(lines):
        y=1.7-i*1.25;g.add(block(left,-3.3,y,5.1),arr(-.35,y,.45,y,TEAL,3),block(right,3.4,y,5.1,color=TEAL))
    return g
