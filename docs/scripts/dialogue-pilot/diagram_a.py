"""Deterministic mechanical drawings for three dialogue lessons (SI-derived units)."""
from manim_helpers import *
import math,json
from pathlib import Path

YS=np.array([-4.8,-2.4,0,2.4,4.8])
def reactions(e=0,k=None):
    k=np.ones(5) if k is None else np.array(k,float)
    mat=np.array([[k.sum(),(k*YS).sum()],[(k*YS).sum(),(k*YS**2).sum()]])
    a,b=np.linalg.solve(mat,np.array([120,120*e]))
    r=k*(a+b*YS);r[np.abs(r)<1e-10]=0
    return r,a+b*YS

def spring(x,top,bottom,color=BLUE):
    yy=np.linspace(bottom+.12,top-.12,9)
    pts=[[x,bottom,0],[x,yy[0],0]]+[[x+(.12 if i%2 else -.12),v,0] for i,v in enumerate(yy[1:-1])]+[[x,yy[-1],0],[x,top,0]]
    return VMobject(color=color,stroke_width=2.4).set_points_as_corners(pts)

def bridge(e=0,k=None,negative=False,clipped=False):
    r,u=reactions(e,k);g=VGroup();scale=.008
    x=YS*.58;top=.75
    g.add(DashedLine([-3.2,top,0],[3.2,top,0],color=GRAY,stroke_width=1.5))
    curve=VMobject(color=TEAL,stroke_width=9).set_points_as_corners([[xx,top-v*scale,0] for xx,v in zip(x,u)])
    g.add(curve)
    for i,(xx,rr,uu) in enumerate(zip(x,r,u)):
        ty=top-uu*scale
        g.add(spring(xx,ty,-.45,RED if rr<0 else BLUE),ln(xx-.25,-.48,xx+.25,-.48,GRAY,2),tx(str(i+1),xx,-.72,20,GRAY))
        if abs(rr)>1e-6:g.add(arr(xx,-1.25 if rr>0 else -.85,xx,-.89 if rr>0 else -1.27,RED if rr<0 else BLUE,3))
        display=max(0,rr) if clipped else rr
        g.add(tx(f'{display:.1f}' if k is not None else f'{display:.0f}',xx,-1.61,27,RED if rr<0 else BLUE))
    px=e*.58;pu=np.interp(e,YS,u)
    g.add(arr(px,2.1,px,top-pu*scale+.12),tx('120 kN',px+.65,2.08,24,ORANGE))
    g.add(tx('各梁分担的车辆力 / kN'+('（约数）' if k is not None else ''),0,-2.02,21,GRAY),tx('虚线：加车前的位置',-4.77,.87,19,GRAY,width=2.8))
    return g

def d01(phase):
    if phase=='summary':return summary([('总共压了多少？','分担力的总和要对上'),('能不能一起变形？','连接约束各梁的位移'),('谁更容易下沉？','刚度也参与分配')])
    if phase=='decompose':
        g=VGroup();r,_=reactions(2.4)
        for col,(title,values,color) in enumerate([('正中间的 120 kN',np.full(5,24),BLUE),('偏到一边的作用',r-24,ORANGE),('两部分加起来',r,TEAL)]):
            cx=-4.35+col*4.35;g.add(tx(title,cx,2.02,25,color,width=3.7),ln(cx-1.58,.4,cx+1.58,.4,GRAY,1.5))
            for i,v in enumerate(values):
                xx=cx+(i-2)*.64;hh=v*.022
                if abs(hh)>.01:g.add(Rectangle(width=.39,height=abs(hh),fill_color=color,fill_opacity=.85,stroke_width=0).move_to([xx,.4+hh/2,0]))
                g.add(tx(f'{0 if abs(v)<1e-8 else v:.0f}',xx,.4+hh+(.23 if v>=0 else -.23),21,color),tx(str(i+1),xx,-.91,17,GRAY))
        g.add(tx('+',-2.16,.42,34,ORANGE),tx('=',2.17,.42,34,TEAL),tx('和截面“压一下，再弯一下”相似：平均项 + 偏心项',0,-1.58,26,INK,width=12.6),tx('类比的是分解思路；梁间分配还要满足连接与刚度条件。',0,-2.04,20,GRAY,width=12.5));return g
    e=3.6 if phase in {'negative','clip'} else 2.4 if phase=='offset' else 0
    k=[1,1,.35,1,1] if phase=='soft' else None
    g=bridge(e,k,clipped=phase=='clip')
    label={'center':'五根一样硬，车放在正中间','soft':'只把中间一根变软','offset':'五根一样硬，车向右移 2.4 m','negative':'再向右移：e = 3.6 m','clip':'把负数删掉，再算一次总账'}[phase]
    g.add(tx(label,0,2.52,25,TEAL,width=11.5))
    if phase=='soft':g.add(tx('中间分到约 8%\n未舍入合力 120 kN\n横向连接保持直线',4.76,.52,22,TEAL,width=2.9))
    elif phase=='negative':g.add(tx('−12 是车辆造成的增量\n还没有加上桥的自重',4.77,.49,22,RED,width=2.9))
    elif phase=='clip':g.add(tx('合力：132 ≠ 120 kN\n力矩：374.4 ≠ 432 kN·m',4.65,.49,22,RED,width=3.2))
    else:g.add(tx('向下压得越多\n弹簧反力通常越大',4.77,.42,24,TEAL,width=2.8))
    return g

def plank(cx,cy,factor=1,color=BLUE):
    w=2.15*factor;h=.16*factor;d=.4*factor
    g=VGroup(Polygon([cx-w/2,cy,0],[cx+w/2,cy,0],[cx+w/2+d,cy+.3*factor,0],[cx-w/2+d,cy+.3*factor,0],fill_color=color,fill_opacity=.55,stroke_color=color),Rectangle(width=w,height=h,color=color,fill_opacity=.85).move_to([cx,cy-h/2,0]),support(cx-w/2+.16*factor,cy-h),support(cx+w/2-.16*factor,cy-h,True))
    for xx in np.linspace(cx-w/2+.24,cx+w/2-.24,5):g.add(arr(xx,cy+.93,xx,cy+.32,ORANGE,2.5))
    return g

def d02(phase):
    if phase=='summary':return summary([('所有尺寸一起变大','先分清长度、面积、体积'),('同材料，只承受自重','重量 ∝ 尺寸³，弯曲应力 ∝ 尺寸'),('只把跨度拉长','条件变了，挠度的增长也变了')])
    g=VGroup();factor=2 if phase not in {'small'} else 1
    g.add(plank(-3.8,.56),plank(2.3,.56,factor,TEAL))
    g.add(tx('原来的一块',-3.65,2.1,26,BLUE),tx('长、宽、厚都 ×2' if factor==2 else '先从同一块搁板出发',2.3,2.1,26,TEAL,width=6))
    if phase in {'small','scale'}:
        g.add(tx('跨度 L',-3.8,-.42,23,BLUE),tx('跨度 2L' if factor==2 else '跨度 L',2.3,-.72,23,TEAL),tx('先猜：重量变成几倍？',0,-1.6,33,ORANGE))
    elif phase=='volume':
        g.add(tx('长度 ×2',-3.6,-1.13,29,BLUE),tx('宽度 ×2',0,-1.13,29,BLUE),tx('厚度 ×2',3.6,-1.13,29,BLUE),tx('体积与重量：2 × 2 × 2 = 8 倍',0,-1.96,30,ORANGE))
    elif phase=='stress':
        for xx,a,b in [(-4,'自重','×8'),(0,'弯曲应力','×2'),(4,'下沉距离','×4')]:g.add(tx(a,xx,-1.05,25,INK),tx(b,xx,-1.78,37,ORANGE))
    elif phase=='span':
        g=VGroup(plank(-3.8,.5),plank(2.3,.5,1.7,TEAL))
        # Actual alternate geometry has constant thickness/width; replace decorative plank.
        g=VGroup(ln(-5.8,.5,-3,.5,BLUE,9),support(-5.8,.5),support(-3,.5,True),ln(-1.6,.5,4,.5,TEAL,9),support(-1.6,.5),support(4,.5,True))
        for l,r in [(-5.8,-3),(-1.6,4)]:
            for xx in np.arange(l+.15,r,.4):g.add(arr(xx,1.5,xx,.65,ORANGE,2))
        g.add(tx('截面不变，单位长度的重量也不变',0,2.22,28,TEAL,width=12),tx('L',-4.4,-.45,26,BLUE),tx('2L',1.2,-.45,26,TEAL),tx('只把跨度变成 2 倍：下沉距离变成 16 倍',0,-1.35,30,ORANGE,width=12.6),tx('简支梁均布荷载：δ = 5qL⁴ / (384EI)',0,-2.05,24,INK))
    return g

def influence(x):return -x/10 if x<4 else 1-x/10
def d04(phase):
    if phase=='summary':return summary([('先说清楚要找什么','哪个截面？什么内力？哪个方向？'),('再决定车放在哪里','正值区与负值区贡献相反'),('最后带上实际限制','车轴距离、车道、允许加载范围')])
    g=VGroup();xmap=lambda v:-5.7+1.14*v
    beam_y=1.28;zero=-.62;sy=1.85
    g.add(ln(xmap(0),beam_y,xmap(10),beam_y,BLUE,7),support(xmap(0),beam_y),support(xmap(10),beam_y,True),ln(xmap(4),.89,xmap(4),1.6,RED,2.5),arr(xmap(4)+.18,1.19,xmap(4)+.18,.6,TEAL,3),tx('V 正向（左段右切面）',xmap(4)-1.95,.72,18,TEAL,width=3.4))
    if phase in {'empty','target','move'}:g.add(tx('看这里：距左端 4 m',xmap(4),2.18,25,RED))
    g.add(ln(xmap(0),zero,xmap(10),zero,GRAY,1.5),tx('0',-6.13,zero,20,GRAY))
    g.add(ln(xmap(0),zero,xmap(4),zero-.4*sy,RED,4),ln(xmap(4),zero+.6*sy,xmap(10),zero,TEAL,4),DashedLine([xmap(4),zero-.4*sy,0],[xmap(4),zero+.6*sy,0],color=GRAY,stroke_width=1.5))
    for v in [0,4,10]:g.add(tx(f'{v} m',xmap(v),-1.65,22,GRAY))
    g.add(tx('车轴要一起移动，不能拆开任意放' if phase=='axles' else '一个向下的单位力，移到各处时的剪力贡献',0,-2.06,23,GRAY,width=12.8))
    if phase in {'empty','target'}:g.add(tx('观察一个截面的剪力，不是整座桥的“总危险”',0,2.56,23,INK,width=12.4))
    elif phase in {'signs','all','positive'}:
        selected=np.arange(.4,9.9,.58) if phase=='all' else np.arange(4.4,9.9,.58) if phase=='positive' else [2,7]
        for x in selected:g.add(arr(xmap(x),2.02,xmap(x),1.43,RED if x<4 else TEAL,2))
        g.add(Polygon([xmap(0),zero,0],[xmap(4),zero-.4*sy,0],[xmap(4),zero,0],fill_color=RED,fill_opacity=.15,stroke_width=0),Polygon([xmap(4),zero,0],[xmap(4),zero+.6*sy,0],[xmap(10),zero,0],fill_color=TEAL,fill_opacity=.17,stroke_width=0))
        title={'signs':'左边贡献为负，右边贡献为正','all':'q = 10 kN/m，铺满：18 − 8 = 10 kN','positive':'同样的 q，只铺正值区：V = 18 kN'}[phase]
        g.add(tx(title,0,2.5,25,TEAL,width=12.5))
    elif phase=='axles':
        for x,p in [(5.4,40),(7.4,60),(9.4,60)]:g.add(arr(xmap(x),2.15,xmap(x),1.43,ORANGE,3),tx(str(p),xmap(x),2.38,19,ORANGE))
        g.add(tx('三轴车辆 · 轴重 / kN',-3.66,2.42,24,INK,width=3.55))
    elif phase=='move':
        # The arrow moves continuously and the point follows the signed influence line.
        x_initial=5+4.3*math.sin(-.32)
        arrow=arr(xmap(x_initial),2.05,xmap(x_initial),1.45,ORANGE,4)
        dot=Dot([xmap(x_initial),zero+sy*influence(x_initial),0],radius=.075,color=ORANGE)
        value=DecimalNumber(influence(x_initial),num_decimal_places=2,font_size=25,color=ORANGE).move_to([4.15,2.58,0])
        g.add(arrow,dot,tx('当前单位力贡献',2,2.57,22,INK),value)
        elapsed=[0.]
        def update(mob,dt):
            elapsed[0]+=dt;x=5+4.3*math.sin(elapsed[0]*.5-.32)
            arrow.put_start_and_end_on([xmap(x),2.05,0],[xmap(x),1.45,0]);dot.move_to([xmap(x),zero+sy*influence(x),0]);value.set_value(influence(x))
        g.add_updater(update)
    return g

def build_a(ident,phase):return {'D01':d01,'D02':d02,'D04':d04}[ident](phase)

if __name__=='__main__':
    checks={}
    for e in [0,2.4,3.6]:
        r,u=reactions(e);assert abs(r.sum()-120)<1e-10 and abs(r@YS-120*e)<1e-10
        checks[str(e)]={'reactions_kN':r.tolist(),'sum_kN':r.sum(),'moment_kNm':float(r@YS)}
    r,u=reactions(0,[1,1,.35,1,1]);assert np.ptp(u)<1e-10
    checks['soft-middle-share']=float(r[2]/120)
    assert np.allclose(reactions(2.4)[0],[0,12,24,36,48])
    assert np.allclose(reactions(3.6)[0],[-12,6,24,42,60])
    checks['influence']={'positive_uniform_q10_kN':18,'negative_uniform_q10_kN':-8,'all_uniform_q10_kN':10,'sign':'positive section shear downward on right face of left cut; V=RA-P_left'}
    checks['scaling']={'all_linear_dimensions_2_weight':8,'stress':2,'deflection':4,'span_only_deflection':16}
    (Path(__file__).parent/'checks-a.json').write_text(json.dumps(checks,ensure_ascii=False,indent=2),encoding='utf-8')
    print('Mechanical checks passed')
