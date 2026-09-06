"""Core micro-lessons: model-derived motion, spoken explanation and transfer question.
Run with CORE_UNIT=C02U01 python -m manim ... CoreLesson
"""
import json,os,wave,math,textwrap
from pathlib import Path
import numpy as np
from manim import *
ROOT=Path(__file__).resolve().parents[2]
BLUE='#176EA0';INK='#17324D';ORANGE='#BE661B';GREY='#718697';LIGHT='#DCE6ED';GREEN='#26755D'
def txt(s,size=24,color=INK):
    t=Text(str(s),font='Microsoft YaHei',font_size=size,color=color)
    return t
def wrap(s,n=36):return '\n'.join(s[i:i+n] for i in range(0,len(s),n))
def fit(t,width):
    if t.width>width:t.scale_to_fit_width(width)
    return t
def poly(points,color=BLUE,width=4):
    p=VMobject(color=color,stroke_width=width);p.set_points_as_corners([np.array([x,y,0]) for x,y in points]);return p
def arrow(a,b,color=ORANGE):return Arrow([*a,0],[*b,0],buff=0,color=color,stroke_width=4,max_tip_length_to_length_ratio=.2)
def diagram(d,limits):
    k=d['kind'];g=VGroup();line=lambda a,b,c=INK:g.add(Line([*a,0],[*b,0],color=c,stroke_width=4))
    def supports(y=-.6):
        for x in [-2.25,2.25]:g.add(Polygon([x,y,0],[x-.18,y-.25,0],[x+.18,y-.25,0],color=INK,fill_color=WHITE,fill_opacity=1))
    if k=='stress':
        g.add(Rectangle(width=1,height=2,color=INK).move_to([-1.6,0,0]))
        # Signed stress diagram uses one fixed scale for all states.
        a,b=d['profile'];base=-.3;s=2.3/max(1,limits['stress']);line((base,-1.15),(base,1.15),GREY)
        g.add(poly([(base,1),(base+a*s,1),(base+b*s,-1),(base,-1)],BLUE))
        for t in np.linspace(0,1,9):
            q=a+(b-a)*t
            if abs(q)>.03:g.add(arrow((base,1-2*t),(base+q*s,1-2*t),BLUE if q>=0 else ORANGE))
        ep=[-1.6,d.get('e',0)*2,0];g.add(Circle(radius=.085,color=ORANGE).move_to(ep),Cross(stroke_color=ORANGE,stroke_width=2).scale(.045).move_to(ep),txt('N',16,ORANGE).move_to(np.array(ep)+RIGHT*.24))
    elif k in ['beam','influence']:
        line((-2.25,-.6),(2.25,-.6));supports()
        a=d.get('a',.5)
        if k=='beam' and d.get('deflection') is not None:
            for x in np.linspace(-2.05,2.05,9):g.add(arrow((x,.7),(x,-.5)))
            line((-2.05,.7),(2.05,.7),ORANGE)
        elif not d.get('negative'):g.add(arrow((-2.25+4.5*a,1.1),(-2.25+4.5*a,-.5)))
        if k=='influence':
            g.add(Polygon([0,-.6,0],[-.18,-.85,0],[.18,-.85,0],color=INK))
            line((-2.4,-.15),(2.4,-.15),GREY);g.add(txt('0',15,GREY).move_to([-2.55,-.15,0]),txt('+ 正区',18,BLUE).move_to([-1.1,.45,0]),txt('− 负区',18,ORANGE).move_to([1.15,-1.1,0]))
            pts=d['points'];s=1.3/max(abs(y) for _,y in pts);g.add(poly([(-2.25+4.5*x,-.15+y*s) for x,y in pts],BLUE));g.add(poly([(-2.25+4.5*x,-.15+y*s) for x,y in pts if x>=.5],ORANGE))
            if d.get('negative'):
                for x in np.linspace(.5,.5+.5*a,9):g.add(arrow((-2.25+4.5*x,1.35),(-2.25+4.5*x,.95)))
        elif d.get('deflection') is not None:
            amp=.8*d['deflection']/max(1,limits['deflection']);g.add(poly([(x,-.6-amp*(1-(x/2.25)**2)) for x in np.linspace(-2.25,2.25,41)],BLUE))
        else:
            for x,r in zip([-2.25,2.25],d.get('profile',[.5,.5])):g.add(arrow((x,-1.55),(x,-1.55+.65*r),BLUE))
    elif k=='scale':
        s=min(3,d['scale']);g.add(Rectangle(width=1.4,height=.3,color=GREY).move_to([-1.6,-.8,0]));g.add(Rectangle(width=1.4*s,height=.3*s,color=BLUE,fill_color=BLUE,fill_opacity=.12).move_to([.65,.45,0]))
    elif k=='section':
        g.add(Rectangle(width=2.5,height=2.5,color=BLUE,fill_color=BLUE,fill_opacity=.18));r=max(.001,d['r']);g.add(Rectangle(width=2.5*r,height=2.5*r,color=BLUE,fill_color=WHITE,fill_opacity=1))
    elif k=='thermal':
        r=d['r'];line((-2,-.3),(2,-.3));g.add(Rectangle(width=.15,height=1.3,color=INK).move_to([-2.2,-.3,0]));g.add(Rectangle(width=.15,height=1.3,color=BLUE).move_to([2+(1-r)*.45,-.3,0]));g.add(arrow((-1.3,.6),(-1.3+.8*(1-r),.6),BLUE));g.add(arrow((1.3,-1.1),(1.3-.8*r-.02,-1.1)))
    elif k=='springs':
        def spring(x,y,length,col):
            pts=[(x,y)]+[(x+(.13 if i%2 else -.13),y-length*i/12) for i in range(1,12)]+[(x,y-length)];g.add(poly(pts,col,3))
        if d['series']:spring(-.4,1.4,1,BLUE);spring(-.4,.4,1.5,ORANGE);line((-1,1.4),(.2,1.4))
        else:
            spring(-1,1.2,1.8,BLUE);spring(1,1.2,1.8,ORANGE);line((-1.7,-.6),(1.7,-.6));line((-1.7,1.2),(1.7,1.2));g.add(arrow((0,-1.5),(0,-.7)))
    elif k=='pier':
        h=d['height'];top=-1.3+1.3*h;line((-.9,-1.3),(.9,-1.3));line((-.35,-1.3),(-.35,top));line((.35,-1.3),(.35,top));line((-.35,top),(.35,top));g.add(arrow((-1.5,top),(-.4,top)));g.add(txt(f'H/H0={h:.2f}',20).move_to([1.25,.15,0]));amp=.5*h**3/8;g.add(poly([(amp*(t*t*(3-t)/2),-1.3+1.3*h*t) for t in np.linspace(0,1,31)],BLUE))
    elif k=='waterfall':
        vals=d['values'];levels=[0]
        for v in vals:levels.append(levels[-1]+v)
        sc=1.8/max(1,limits['waterfall']);xs=np.linspace(-1.8,1.8,len(vals));line((-2.35,-.9),(2.35,-.9),GREY)
        for i,(x,v) in enumerate(zip(xs,vals)):
            lo=min(levels[i],levels[i+1]);hi=max(levels[i],levels[i+1]);col=BLUE if v>=0 else ORANGE;g.add(Rectangle(width=.65,height=max(.006,(hi-lo)*sc),color=col,fill_color=col,fill_opacity=.55).move_to([x,-.9+(lo+hi)/2*sc,0]));g.add(txt(f'{v:+.2g}',17,col).move_to([x,-1.2,0]));
            if i<len(vals)-1:line((x+.325,-.9+levels[i+1]*sc),(xs[i+1]-.325,-.9+levels[i+1]*sc),GREY)
        g.add(txt(f'累计效应 {levels[-1]:.2f}',20).move_to([0,1.45,0]))
    elif k=='tendon':
        f=d['sag'];g.add(poly([(4.5*(t-.5),-.4-8*f*4*t*(1-t)) for t in np.linspace(0,1,41)],BLUE));line((-2.25,-.4),(2.25,-.4),GREY)
        for x in np.linspace(-1.9,1.9,7):g.add(arrow((x,-1.4),(x,-.65),BLUE))
        for x in [-2.25,2.25]:g.add(arrow((x,.7),(x,-.35)))
        g.add(txt('向上等效荷载 + 两端向下分力',19).move_to([0,1.3,0]))
    elif k=='buckling':
        amp=min(1,d['ratio'])*.65;g.add(poly([(amp*math.sin(math.pi*t),1.3-2.6*t) for t in np.linspace(0,1,41)],BLUE));line((-.7,-1.3),(.7,-1.3));g.add(arrow((0,1.85),(0,1.4)))
    elif k in ['cable','arch']:
        f=d.get('sag',d.get('f',.1));sgn=1 if k=='arch' else -1;g.add(poly([(4.5*(t-.5),sgn*4*f*4*t*(1-t)) for t in np.linspace(0,1,41)],BLUE));line((-2.25,0),(2.25,0),GREY)
        for i,t in enumerate(np.linspace(.1,.9,9)):
            a=d.get('a',0);length=.3*(1+(a if t<.5 else -a));g.add(arrow((4.5*(t-.5),1.8),(4.5*(t-.5),1.8-length-.03)))
        if k=='arch' and d.get('a',0)>0:g.add(poly([(4.5*(x-.5),-1+y*15) for x,y in d['points']],ORANGE))
    elif k=='angle':
        a=math.radians(d['angle']);line((-2,-.9),(2,-.9));line((-2,-.9),(-2,1.5));line((1.8,-.9),(1.8-3.4*math.cos(a),-.9+3.4*math.sin(a)),BLUE);g.add(arrow((1.8,-.2),(1.8,-.9)))
    elif k in ['bars','transverse','matrix']:
        vals=d['values'];s=1.4/max(1,limits['bars']);xs=np.linspace(-1.8,1.8,len(vals));line((-2.4,0),(2.4,0),GREY)
        for x,v in zip(xs,vals):
            h=max(.005,abs(v)*s);g.add(Rectangle(width=.55,height=h,color=BLUE if v>=0 else ORANGE,fill_color=BLUE if v>=0 else ORANGE,fill_opacity=.55).move_to([x,math.copysign(h/2,v),0]))
    elif k=='oscillator':
        a=min(d.get('amplitude',1),30)/30*.7+.2;f=d.get('frequency',1);g.add(poly([(x,a*math.sin((x+2.5)*math.pi*f)) for x in np.linspace(-2.5,2.5,81)],BLUE));line((-2.5,0),(2.5,0),GREY)
    elif k=='wind':
        g.add(Rectangle(width=2.4,height=.45,color=INK,fill_color=LIGHT,fill_opacity=1));u=d.get('speed',20)
        for y in [-.9,-.5,.5,.9]:g.add(arrow((-2.6,y),(-2.6+u/25,y),BLUE))
        for i in range(4):g.add(Arc(radius=.18,start_angle=0,angle=1.7*math.pi,color=ORANGE).move_to([1.5+i*.32,(-1)**i*.45,0]))
    elif k=='distribution':
        mean=d.get('mean',0);sd=max(1,d.get('sd',10));g.add(poly([(x,1.4*math.exp(-.5*(x*20/sd)**2)-.8) for x in np.linspace(-2.5,2.5,81)],BLUE));line((-2.5,-.8),(2.5,-.8),GREY);g.add(fit(txt(f'中心 {mean:.2f}  /  离散 {sd:.2f}',21),5).move_to([0,1.1,0]))
    elif k=='mesh':
        n=d['n'];line((-2.3,-1),(2.3,-1),GREY);g.add(poly([(-2.3+4.6*t,-1+2*t*t) for t in np.linspace(0,1,81)],GREY,5));g.add(poly([(-2.3+4.6*t,-1+2*t*t) for t in np.linspace(0,1,n+1)],BLUE,3));
        for t in np.linspace(0,1,min(n+1,21)):g.add(Dot([-2.3+4.6*t,-1+2*t*t,0],radius=.035,color=BLUE))
    return g
class CoreLesson(Scene):
    def construct(self):
        self.camera.background_color=WHITE
        ident=os.environ.get('CORE_UNIT','C02U01');spec=json.loads((ROOT/f'scripts/core-render/{ident}.json').read_text(encoding='utf-8'));z=spec['setup'];states=spec['states']
        limits={'stress':max([abs(x) for s in states for x in s['diagram'].get('profile',[])]+[1]),'bars':max([abs(x) for s in states for x in s['diagram'].get('values',[])]+[1]),'deflection':max([s['diagram'].get('deflection',0) for s in states]+[1])}
        limits['waterfall']=max([abs(v) for state in states for v in np.cumsum(state['diagram'].get('values',[0]))]+[1])
        self.add(fit(txt(spec['title'],34),12.8).move_to([0,3.42,0]),txt(f'{ident}  ·  {spec["chapter_title"]}',18,GREY).move_to([0,2.92,0]))
        self.add(Line([-6.6,2.62,0],[6.6,2.62,0],color=LIGHT))
        self.add(txt('结构 / 分量示意',20,GREY).move_to([-3.65,2.26,0]),fit(txt(z['output']+(' / '+z['outunit'] if z['outunit'] else ''),22),6).move_to([3.15,2.26,0]))
        samples=spec['samples'];ys=[p[1] for p in samples];ylo=min(0,min(ys));yhi=max(ys);span=max(1e-4,yhi-ylo);ylo-=span*.08;yhi+=span*.12
        def xy(x,y):return np.array([.1+6.2*(x-z['min'])/(z['max']-z['min']),-1.2+2.95*(y-ylo)/(yhi-ylo),0])
        self.add(Line(xy(z['min'],ylo),xy(z['max'],ylo),color=GREY),Line(xy(z['min'],ylo),xy(z['min'],yhi),color=GREY))
        for val in [z['min'],z['max']]:self.add(txt(f'{val:.3g}',17,GREY).move_to(xy(val,ylo)+DOWN*.2))
        for val in [min(ys),max(ys)]:self.add(txt(f'{val:.3g}',17,GREY).next_to(xy(z['min'],val),LEFT,buff=.12))
        self.add(fit(txt(z['label'],20),6).move_to([3.2,-1.82,0]));shape=diagram(states[0]['diagram'],limits).shift(LEFT*3.65);self.add(shape)
        question=fit(txt('先预测，再观察',27,ORANGE),5).move_to([3.1,.3,0]);self.add(question)
        formula=fit(txt(z['formula'],24),12.7).move_to([0,-2.35,0]);self.add(formula)
        self.add(fit(txt(wrap(z['boundary'],78),15,GREY),12.8).move_to([0,-3.76,0]))
        phase=txt('预测',19,BLUE).move_to([-6,2.92,0]);self.add(phase)
        footer=fit(txt(wrap(spec['narration'][0],43),23),12.8).move_to([0,-3.08,0]);self.add(footer)
        durations=[];timeline=[];total=0
        for i in range(4):
            wav=ROOT/f'tmp/core-narration/{ident}-{i}.wav'
            with wave.open(str(wav)) as w:dur=w.getnframes()/w.getframerate()
            durations.append(max(dur+.6,4));timeline.append((total,total+dur,spec['narration'][i]));total+=max(dur+.6,4)
        self.add_sound(str(ROOT/f'tmp/core-narration/{ident}-0.wav'));self.wait(durations[0])
        self.remove(question,footer,phase);phase=txt('观察',19,BLUE).move_to([-6,2.92,0]);self.add(phase)
        footer=fit(txt(wrap('只改变一个参数。灰点保留初始状态，蓝点显示当前响应。',43),23),12.8).move_to([0,-3.08,0]);self.add(footer)
        curve=poly([(xy(x,y)[0],xy(x,y)[1]) for x,y in samples],BLUE,4);self.add(curve)
        dot=Dot(xy(z['start'],states[0]['value']),radius=.07,color=BLUE);self.add(Dot(xy(z['start'],states[0]['value']),radius=.08,color=GREY),dot)
        val=fit(txt(f'{z["label"]}={z["start"]:.3g}   →   {states[0]["value"]:.4g}',22),6.1).move_to([3.15,-.05,0]);self.add(val)
        # Keep the changing number outside the plot to avoid covering the response curve.
        val.move_to([-3.65,-1.82,0])
        self.add_sound(str(ROOT/f'tmp/core-narration/{ident}-1.wav'))
        for s in states[1:]:
            target=diagram(s['diagram'],limits).shift(LEFT*3.65);num=fit(txt(f'{z["label"]}={s["x"]:.3g}   →   {s["value"]:.4g}',22),5.7).move_to([-3.65,-1.82,0]);val.become(num);self.play(Transform(shape,target),dot.animate.move_to(xy(s['x'],s['value'])),run_time=durations[1]/24,rate_func=linear)
        self.remove(footer,phase);phase=txt('解释',19,BLUE).move_to([-6,2.92,0]);self.add(phase);footer=fit(txt(wrap(spec['insight'],43),23),12.8).move_to([0,-3.08,0]);self.add(footer);self.add_sound(str(ROOT/f'tmp/core-narration/{ident}-2.wav'));self.wait(durations[2])
        self.remove(footer,phase);phase=txt('迁移',19,BLUE).move_to([-6,2.92,0]);self.add(phase);footer=fit(txt(wrap(spec['transfer'],43),24,ORANGE),12.8).move_to([0,-3.08,0]);self.add(footer);self.add_sound(str(ROOT/f'tmp/core-narration/{ident}-3.wav'));self.wait(durations[3])
        meta=ROOT/f'tmp/core-narration/{ident}-timing.json';meta.write_text(json.dumps({'duration':total,'segments':timeline,'voice':'Microsoft Huihui Desktop / local SAPI'},ensure_ascii=False),encoding='utf-8')
