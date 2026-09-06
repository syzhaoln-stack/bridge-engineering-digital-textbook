"""D03/D05 graphical layers. No audio, subtitles or scene timing are changed.
Run this file to build all 12 phases and write checks-b.json (no video render).
"""
from pathlib import Path
from functools import lru_cache
from datetime import datetime, timezone
import json, hashlib
from manim_helpers import *

HERE=Path(__file__).resolve().parent
BOOK=HERE.parents[1]
PHASES={'D03':['plain','tendon','load','service','construction','summary'],
        'D05':['coarse','two','converge','wrong','ai','summary']}


def poly(points,color=BLUE,w=4):
    out=VMobject(color=color,stroke_width=w)
    out.set_points_as_corners([np.array([x,y,0.]) for x,y in points])
    return out


def moment(x,y,clockwise=False,color=ORANGE):
    a=np.linspace(.25*np.pi,1.8*np.pi,35)
    if clockwise:a=a[::-1]
    pts=np.c_[x+.32*np.cos(a),y+.32*np.sin(a)]
    tangent=np.array([-np.sin(a[-1]),np.cos(a[-1])])*(-1 if clockwise else 1)
    normal=np.array([-tangent[1],tangent[0]])
    tip=pts[-1];base=tip-.17*tangent
    head=Polygon(*[np.array([*p,0.]) for p in
                   [tip,base+.07*normal,base-.07*normal]],
                 fill_color=color,fill_opacity=1,stroke_width=0)
    return VGroup(poly(pts,color,3),head)


def stress_values(P_kN=0.,M_kNm=108.,e_m=.15):
    """Compression positive. Tendon is below centroid; external M is sagging."""
    b=.3;h=.6;A=b*h;I=b*h**3/12;W=I/(h/2)
    axial=P_kN*1000/A/1e6
    pre_bend=P_kN*1000*e_m/W/1e6
    external=M_kNm*1000/W/1e6
    return {'top_MPa':axial-pre_bend+external,
            'bottom_MPa':axial+pre_bend-external,
            'axial_MPa':axial,'prestress_bending_MPa':pre_bend,
            'external_bending_MPa':external,'A_m2':A,'I_m4':I,'W_m3':W,
            'P_kN':P_kN,'M_kNm':M_kNm,'e_m':e_m}


def stress_bar(value,y,label=None,zero=3.15,scale=.34):
    color=TEAL if value>=0 else RED;end=zero+scale*value
    g=VGroup(Rectangle(width=max(abs(scale*value),.012),height=.23,
                      fill_color=color,fill_opacity=.88,stroke_width=0)
             .move_to([(zero+end)/2,y,0]))
    valx=end+(.48 if value>=0 else -.5)
    g.add(tx(f'{value:+.2f}',valx,y,23,color,width=1.02))
    if label:g.add(tx(label,.75,y,17,INK,width=1.1))
    return g


def stress_chart(values,phase):
    g=VGroup(tx('边缘应力 / MPa',3.5,1.85,24,INK,width=5.6))
    if phase=='summary':
        construction=stress_values(450,0);service=stress_values(450,108)
        g.add(ln(3.15,-1.5,3.15,1.35,GRAY,1.5))
        for y,label,value in [(1.1,'施工上缘',construction['top_MPa']),
                              (.48,'施工下缘',construction['bottom_MPa']),
                              (-.45,'使用上缘',service['top_MPa']),
                              (-1.07,'使用下缘',service['bottom_MPa'])]:
            g.add(stress_bar(value,y,label))
        g.add(ln(.25,-.02,6.3,-.02,GRAY,1))
    else:
        g.add(ln(3.15,-.85,3.15,1.1,GRAY,1.5),tx('上缘',3.15,1.28,18),tx('下缘',3.15,.0,18))
        g.add(stress_bar(values['top_MPa'],.86),stress_bar(values['bottom_MPa'],-.43))
        g.add(tx('0',3.15,-1.0,17,GRAY))
    g.add(tx('拉（−）',1.6,-1.72,21,RED),tx('压（+）',4.85,-1.72,21,TEAL))
    return g


def prestress_beam(P_kN,M_kNm,phase):
    g=VGroup();left=-5.65;right=-.85;cy=1.08
    g.add(Rectangle(width=right-left,height=.62,stroke_color=BLUE,stroke_width=3,
                    fill_color=PALE,fill_opacity=1).move_to([(left+right)/2,cy,0]))
    if not P_kN:g.add(tx('混凝土',-3.25,1.71,22,BLUE))
    # Pure-bending segment: opposing end couples. No fictitious point-load/span is introduced.
    if M_kNm:
        g.add(moment(left-.37,cy,True),moment(right+.36,cy,False))
        g.add(tx('外加弯矩 108 kN·m',-3.25,.56,21,ORANGE,width=4.9))
    else:g.add(tx('外荷载尚未加上',-3.25,.56,21,GRAY,width=4.7))
    if P_kN:
        yp=cy-.155
        g.add(arr(left-.68,yp,left+.9,yp,TEAL,5),arr(right+.68,yp,right-.9,yp,TEAL,5))
        g.add(tx('混凝土：两端向内压450 kN',-3.25,1.71,22,TEAL,width=4.9))
        # Isolate the tendon in another row: its end actions are outward.
        gy=-.04;g.add(ln(left+.45,gy,right-.45,gy,RED,4),arr(left+.45,gy,left-.05,gy,RED,4),arr(right-.45,gy,right+.05,gy,RED,4))
        g.add(tx('单独看钢索：两端向外拉',-3.25,-.35,19,RED,width=5.2))
    else:
        g.add(ln(left+.45,-.02,right-.45,-.02,GRAY,2),tx('尚未张拉钢索',-3.25,-.33,19,GRAY))
    # Actual section proportions; lower tendon eccentricity e/h=1/4.
    sx=-4.75;sy=-1.15
    g.add(Rectangle(width=.54,height=1.08,stroke_color=BLUE,stroke_width=2,
                    fill_color=PALE,fill_opacity=1).move_to([sx,sy,0]))
    g.add(DashedLine([sx-.38,sy,0],[sx+.38,sy,0],color=GRAY,stroke_width=1.3))
    g.add(Dot([sx,sy-.27,0],radius=.06,color=RED if P_kN else GRAY))
    g.add(tx('h=0.60 m',sx-.95,sy,17,GRAY,width=1.15),tx('b=0.30 m',sx,-1.92,17,GRAY,width=1.25))
    g.add(ln(sx+.48,sy,sx+.7,sy,GRAY,1.5),ln(sx+.48,sy-.27,sx+.7,sy-.27,GRAY,1.5),ln(sx+.6,sy,sx+.6,sy-.27,GRAY,1.5))
    g.add(tx('偏在下方\ne=0.15 m',-2.85,-1.18,20,INK,width=2.05))
    return g


def build_prestress(phase):
    settings={'plain':(0,108),'tendon':(450,0),'load':(450,108),
              'service':(450,108),'construction':(450,0),'summary':(450,108)}
    P,M=settings[phase];values=stress_values(P,M)
    heading={'plain':'先分清：被拉开的是谁？',
             'tendon':'钢索被拉长，混凝土却被夹紧',
             'load':'外荷载加上来：先前的压力抵消一部分拉应力',
             'service':'这个使用工况，两边都在受压',
             'construction':'车还没来，上缘也可能已经受拉',
             'summary':'先建立受力状态，再把各个阶段分别核对'}[phase]
    g=VGroup(tx(heading,0,2.35,27,INK,width=12.7),prestress_beam(P,M,phase),stress_chart(values,phase))
    if phase=='construction':
        g.add(SurroundingRectangle(g[2][4],color=RED,buff=.09,stroke_width=2))
    return g


@lru_cache(None)
def beam_solution(n,boundary):
    L=20.;E=34e9;I=.1;q=20000.;h=L/n;nd=2*(n+1)
    K=np.zeros((nd,nd));F=np.zeros(nd)
    k=E*I/h**3*np.array([[12,6*h,-12,6*h],[6*h,4*h*h,-6*h,2*h*h],[-12,-6*h,12,-6*h],[6*h,2*h*h,-6*h,4*h*h]])
    f=q*h*np.array([.5,h/12,.5,-h/12])
    for i in range(n):
        ds=np.arange(2*i,2*i+4);K[np.ix_(ds,ds)]+=k;F[ds]+=f
    fixed_dofs=[0,nd-2] if boundary=='ss' else [0,1,nd-2,nd-1]
    free=np.setdiff1d(np.arange(nd),fixed_dofs);u=np.zeros(nd)
    if len(free):u[free]=np.linalg.solve(K[np.ix_(free,free)],F[free])
    R=K@u-F
    assert abs(R[::2].sum()+q*L)<1e-5
    if len(free):assert np.max(np.abs(R[free]))<1e-4
    return u,R


def deflection(x,n,boundary):
    u,_=beam_solution(n,boundary);h=20/n;j=min(int(x/h),n-1);s=(x-j*h)/h
    N=np.array([1-3*s*s+2*s**3,h*(s-2*s*s+s**3),3*s*s-2*s**3,h*(-s*s+s**3)])
    return float(N@u[2*j:2*j+4])*1000


def beam_picture(center,n,bc,reveal=False,flag=False):
    x0=center-2.5;x1=center+2.5;y=1.22
    g=VGroup(ln(x0,y,x1,y,GRAY,2))
    if bc=='ss':g.add(support(x0,y),support(x1,y,True))
    else:g.add(fixed(x0,y),fixed(x1,y).rotate(PI,about_point=[x1,y,0]))
    for x in np.linspace(x0,x1,9):g.add(arr(x,1.98,x,y+.09,ORANGE,2.3))
    for x in np.linspace(x0,x1,n+1):g.add(Dot([x,y,0],radius=.032,color=BLUE))
    # Both diagrams share the same vertical magnification, not individually normalized.
    xs=np.linspace(0,20,121);ws=[deflection(x,n,bc) for x in xs]
    g.add(poly([(x0+x/4,y-.045*w) for x,w in zip(xs,ws)],TEAL if bc=='ss' else RED,4))
    xt=x0+7.4/4;wt=deflection(7.4,n,bc)
    g.add(ln(xt,y,xt,y-.045*wt,TEAL if bc=='ss' else RED,2),Dot([xt,y-.045*wt,0],radius=.045,color=TEAL if bc=='ss' else RED))
    label='允许端部转动' if bc=='ss' else '端部转角锁住'
    g.add(tx(label,center,2.37,23,TEAL if bc=='ss' else RED,width=5.25))
    g.add(tx(f'{n} 单元'+(f' · {wt:.3f} mm' if reveal else ''),center,.28,21,TEAL if bc=='ss' else RED,width=5.2))
    if flag:g.add(SurroundingRectangle(VGroup(*g[:3]),color=RED,buff=.08,stroke_width=2))
    return g


def convergence_plot(nmax):
    g=VGroup();x0=-5.32;y0=-1.61;dx=1.03;sy=.105
    g.add(ln(x0,y0,.09,y0,GRAY,1.5),ln(x0,y0,x0,.0,GRAY,1.5))
    for value in [0,6,12]:
        yy=y0+sy*value;g.add(ln(x0,yy,.08,yy,PALE,1),tx(str(value),x0-.28,yy,15,GRAY))
    g.add(tx('向下位移 / mm',-4.1,.06,17,GRAY,width=2.7))
    ns=[1,2,4,8,16,32]
    for j,n in enumerate(ns):g.add(tx(str(n),x0+j*dx,y0-.2,15,GRAY))
    g.add(tx('单元数',.65,y0-.2,16,GRAY,width=1.1))
    for bc,color in [('ss',TEAL),('ff',RED)]:
        pts=[]
        for j,n in enumerate(ns):
            if n<=nmax:
                p=(x0+j*dx,y0+sy*deflection(7.4,n,bc));pts.append(p);g.add(Dot([*p,0],radius=.035,color=color))
        if len(pts)>1:g.add(poly(pts,color,2.6))
    return g


def build_fem(phase):
    n={'coarse':2,'two':4,'converge':32,'wrong':32,'ai':32,'summary':32}[phase]
    reveal=phase not in {'coarse','two'}
    g=VGroup(beam_picture(-3.43,n,'ss',reveal),beam_picture(3.43,n,'ff',reveal,phase in {'wrong','ai'}),convergence_plot(n))
    messages={
        'coarse':[('同一根梁，同一份荷载',INK),('先看图上的支承',BLUE)],
        'two':[('两端能不能转动',INK),('会改变下沉量',BLUE)],
        'converge':[('简支 → 11.2720 mm',TEAL),('固支 → 2.1308 mm',RED)],
        'wrong':[('数值可以越来越稳定',INK),('模型仍可能答错问题',RED)],
        'ai':[('任务：端部转角自由',TEAL),('草稿：把转角设为零',RED)],
        'summary':[('先核对支承与荷载',INK),('再用解析基准验算',TEAL)],
    }
    for i,(label,color) in enumerate(messages[phase]):g.add(tx(label,3.7,-.62-.63*i,24,color,width=5.4))
    g.add(tx('变形统一放大180倍；两图使用相同纵向比例。观察点为距左端7.4 m。',0,-2.03,16,GRAY,width=12.7))
    return g


def build_b(ident,phase):
    if ident not in PHASES or phase not in PHASES[ident]:raise ValueError((ident,phase))
    g=build_prestress(phase) if ident=='D03' else build_fem(phase)
    # Leave the subtitle and character-name regions untouched.
    assert isinstance(g,VGroup)
    assert g.get_left()[0]>=-6.8 and g.get_right()[0]<=6.8,(ident,phase,'horizontal',g.get_left(),g.get_right())
    assert g.get_bottom()[1]>=-2.23 and g.get_top()[1]<=2.71,(ident,phase,'vertical',g.get_bottom(),g.get_top())
    return g


def checks():
    prestress={'plain':stress_values(0,108),'prestress_only':stress_values(450,0),'service':stress_values(450,108)}
    assert np.allclose([prestress['plain'][k] for k in ['top_MPa','bottom_MPa']],[6,-6])
    assert np.allclose([prestress['prestress_only'][k] for k in ['top_MPa','bottom_MPa']],[-1.25,6.25])
    assert np.allclose([prestress['service'][k] for k in ['top_MPa','bottom_MPa']],[4.75,.25])
    ns=[1,2,4,8,16,32];ss=[deflection(7.4,n,'ss') for n in ns];ff=[deflection(7.4,n,'ff') for n in ns]
    ref=json.loads((BOOK/'assets/publication/priority-40/F39.json').read_text(encoding='utf-8'))['calculation_data']
    assert np.allclose(ss,ref['ss_mm'],atol=1e-9,rtol=0) and np.allclose(ff,ref['wrong_fixed_mm'],atol=1e-9,rtol=0)
    x=7.4;L=20;EI=34e9*.1;q=20000
    ss_exact=q*x*(L**3-2*L*x*x+x**3)/(24*EI)*1000;ff_exact=q*x*x*(L-x)**2/(24*EI)*1000
    assert abs(ss[-1]-ss_exact)<1e-5 and abs(ff[-1]-ff_exact)<1e-5
    boundaries=[]
    for ident,phases in PHASES.items():
        for phase in phases:
            g=build_b(ident,phase);boundaries.append({'id':ident,'phase':phase,'x_min':float(g.get_left()[0]),'x_max':float(g.get_right()[0]),'y_min':float(g.get_bottom()[1]),'y_max':float(g.get_top()[1]),'within_contract':True})
    result={'checked_at_utc':datetime.now(timezone.utc).isoformat(),'source_sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),'passed':True,'D03':{'values':prestress,'sign':'compression positive, tendon below centroid','model_limit':'uncracked linear elastic stress demonstration; no losses/selfweight/crack or reinforcement design','external_moment_graphic':'opposing end couples, no unspecified vertical point-load/span introduced'},'D05':{'N':ns,'ss_mm':ss,'fixed_mm':ff,'ss_exact_mm':ss_exact,'fixed_exact_mm':ff_exact,'F39_match':True,'reaction_balance_tolerance_N':1e-5,'free_DOF_residual_tolerance_N':1e-4,'deformation_magnification':180,'end_deflection_checks':[deflection(x,32,bc) for bc in ['ss','ff'] for x in [0,20]]},'phase_bounds':boundaries,'visual_status':'VGroup coordinates checked; full rendered video/keyframes pending root render'}
    (HERE/'checks-b.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
    print('D03/D05: mechanical checks and all 12 phase bounds passed. Root may render.')


if __name__=='__main__':checks()
