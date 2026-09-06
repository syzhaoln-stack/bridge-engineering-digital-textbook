"""Original teaching figures F20–F40; run --representatives or --all.
No web assets; geometry and curves are generated from the stated models.
"""
from figlib import *
from matplotlib.patches import Arc
from PIL import Image, ImageDraw, ImageFont
import argparse, math, re, hashlib
from datetime import datetime, timezone
from matplotlib.text import Text

SOURCE='scripts/priority-figures/group_b.py'
CH={5:'chapters/ch04.qmd',6:'chapters/ch05.qmd',7:'chapters/ch06.qmd',8:'chapters/ch07.qmd',9:'chapters/ch09-wind.qmd',10:'chapters/ch10-lifecycle.qmd',11:'chapters/ch10-fem.qmd'}
META={}

def finish(fig,id,title,ch,heading,caption,assumptions,checks=(),data=None):
    source=BOOK/CH[ch]; rows=source.read_text(encoding='utf-8').splitlines()
    hits=[i+1 for i,s in enumerate(rows) if re.sub(r'^#+\s+','',s).strip()==heading]
    assert hits,(id,heading)
    fig.canvas.draw();renderer=fig.canvas.get_renderer();outside=[]
    for item in fig.findobj(match=Text):
        if not item.get_visible() or not item.get_text().strip():continue
        bb=item.get_window_extent(renderer)
        if bb.x0 < -2 or bb.y0 < -2 or bb.x1 > fig.bbox.width+2 or bb.y1 > fig.bbox.height+2:outside.append(item.get_text())
    assert not outside,(id,'text outside figure',outside)
    meta=export(fig,id,title,ch,heading,caption,assumptions,SOURCE,list(checks))
    meta.update(chapter_file=CH[ch],heading_line=hits[0],calculation_data=data or {},diagram_kind='teaching_model_or_schematic',dimensions_note='标注尺寸用于定义模型；示意图不供量图施工',layout_preflight={'text_outside_canvas':outside,'source_header_confirmed':True})
    (OUT/f'{id}.json').write_text(json.dumps(meta,ensure_ascii=False,indent=2),encoding='utf-8');META[id]=meta

def panel(ax,x,y,title,width=5.5):
    text(ax,x,y,title,16,ha='left',weight='bold')
    line(ax,[x,x+width],[y-.3,y-.3],LIGHT,1.4)

def clamp(ax,x,y,side='left',h=.8):
    line(ax,[x,x],[y-h/2,y+h/2],INK,3)
    s=-1 if side=='left' else 1
    for yy in np.linspace(y-h/2,y+h/2,7):line(ax,[x,x+s*.22],[yy,yy-.12],GRAY,1)

def basefix(ax,x,y):
    line(ax,[x-.35,x+.35],[y,y],INK,2)
    for xx in np.linspace(x-.3,x+.3,6):line(ax,[xx,xx-.1],[y,y-.18],GRAY,1)

def udl(ax,x0,x1,y,base,label=None,n=7):
    line(ax,[x0,x1],[y,y],ORANGE,1)
    for x in np.linspace(x0,x1,n):arrow(ax,x,y,x,base,color=ORANGE,lw=1.4)
    if label:text(ax,(x0+x1)/2,y+.3,label,13,ORANGE)

def curvarrow(ax,x,y,r=.4,label=None,color=TEAL):
    th=np.linspace(-.65*np.pi,.65*np.pi,60);xx=x+r*np.cos(th);yy=y+r*np.sin(th)
    line(ax,xx,yy,color,1.6);arrow(ax,xx[-5],yy[-5],xx[-1],yy[-1],color=color,lw=1.6)
    if label:text(ax,x+r+.3,y,label,12,color,ha='left')

def solve_beam(n,L=20.,E=34e9,I=.1,q=20000.,boundary='ss',target=.37):
    """Cubic Hermite EB bending FE; downward w and dw/dx positive."""
    h=L/n;nd=2*(n+1);K=np.zeros((nd,nd));F=np.zeros(nd)
    k=E*I/h**3*np.array([[12,6*h,-12,6*h],[6*h,4*h*h,-6*h,2*h*h],[-12,-6*h,12,-6*h],[6*h,2*h*h,-6*h,4*h*h]])
    f=q*h*np.array([.5,h/12,.5,-h/12])
    for j in range(n):
        ds=np.arange(2*j,2*j+4);K[np.ix_(ds,ds)]+=k;F[ds]+=f
    fixed=[0,nd-2] if boundary=='ss' else [0,1,nd-2,nd-1]
    free=np.setdiff1d(np.arange(nd),fixed);u=np.zeros(nd)
    if len(free):u[free]=np.linalg.solve(K[np.ix_(free,free)],F[free])
    R=K@u-F;assert abs(R[::2].sum()+q*L)<1e-5
    if len(free):assert np.max(np.abs(R[free]))<1e-4
    x=target*L;j=min(int(x/h),n-1);s=(x-j*h)/h
    N=np.array([1-3*s*s+2*s**3,h*(s-2*s*s+s**3),3*s*s-2*s**3,h*(-s*s+s**3)])
    w=float(N@u[2*j:2*j+4]);return w,u,R

def f20():
    title='把拱压低，拱脚要多推多少？'
    fig,ax=new(title,'模型：等高拱脚的抛物线三铰拱；竖向荷载按水平投影均布。图示几何不按比例；不计二阶效应。')
    L=120.;q=180.;H=lambda f:q*L*L/(8*f);V=q*L/2
    for j,f in enumerate([20,30]):
        x0=.7+6*j;x1=x0+4.6;y0=2.7;rise=1.1*f/20
        panel(ax,x0,6.4,f'矢高 f = {f} m',4.6)
        xs=np.linspace(x0,x1,130);u=(xs-x0)/(x1-x0);ys=y0+4*rise*u*(1-u)
        line(ax,xs,ys,BLUE,4)
        for x,y in [(x0,y0),((x0+x1)/2,y0+rise),(x1,y0)]:ax.add_patch(Circle((x,y),.065,ec=INK,fc='white',lw=1.5,zorder=4))
        support(ax,x0,y0);support(ax,x1,y0)
        for x in np.linspace(x0+.3,x1-.3,7):
            u=(x-x0)/(x1-x0);arrow(ax,x,5.2,x,y0+4*rise*u*(1-u)+.12,lw=1.3)
        text(ax,(x0+x1)/2,5.55,'q = 180 kN/m',13,ORANGE)
        arrow(ax,x0-0.5,y0+.02,x0+.38,y0+.02,color=RED)
        arrow(ax,x1+.5,y0+.02,x1-.38,y0+.02,color=RED)
        arrow(ax,x0,1.95,x0,y0-.04,color=TEAL,lw=1.8)
        arrow(ax,x1,1.95,x1,y0-.04,color=TEAL,lw=1.8)
        text(ax,(x0+x1)/2,2.22,f'H = {H(f)/1000:.1f} MN（两端向内）',15,RED)
        dim(ax,x0,1.6,x1,1.6,'L = 120 m')
        dim(ax,(x0+x1)/2,y0,(x0+x1)/2,y0+rise,f'f = {f} m',offset=(.68,0))
        text(ax,(x0+x1)/2,.55,f'两端竖向反力仍各为 {V/1000:.1f} MN ↑',13,TEAL)
    assert H(20)==16200 and H(24)==13500 and H(30)==10800
    finish(fig,'F20',title,5,'跨径、矢高与矢跨比','相同跨度和竖向均布荷载下，三铰抛物线拱矢高由20 m增至30 m，水平推力由16.2 MN降至10.8 MN；竖向反力不变。',['三铰、等高拱脚','抛物线拱轴','均布荷载以水平投影计','一阶静力'],['H=qL²/(8f)：16200/13500/10800 kN','竖向平衡2V=qL'],{'L_m':L,'q_kN_per_m':q,'f_m':[20,24,30],'H_kN':[H(f) for f in [20,24,30]],'V_kN':V})

def f31():
    title='“固定支座”到底固定了哪些方向？'
    fig,ax=new(title,'平面箭头表示允许的位移方向，不是力。下图为压紧接触时的理想平移约束；实际转角能力由支座类型和设计确定。')
    for j,(name,dx,dy) in enumerate([('固定支座',False,False),('纵向活动支座',True,False),('多向活动支座',True,True)]):
        x=2+4*j;panel(ax,x-1.55,6.45,name,3.2)
        ax.add_patch(Rectangle((x-1.05,3.5),2.1,1.65,facecolor=LIGHT,edgecolor=INK,lw=2))
        ax.add_patch(Circle((x,4.33),.52,facecolor='white',edgecolor=GRAY,lw=1.5))
        if dx:dim(ax,x-1.4,4.33,x+1.4,4.33,'',color=TEAL);text(ax,x,3.08,'沿 x 可移动',14,TEAL)
        else:text(ax,x,3.08,'u_x = 0',14,RED)
        if dy:dim(ax,x,3.5,x,5.65,'',color=TEAL);text(ax,x,2.6,'沿 y 可移动',14,TEAL)
        else:text(ax,x,2.6,'u_y = 0',14,RED)
        text(ax,x,1.8,'竖向承压：u_z = 0',13,INK)
        if not dx:line(ax,[x-.25,x+.25],[4.13,4.53],RED,2);line(ax,[x-.25,x+.25],[4.53,4.13],RED,2)
    arrow(ax,.3,.7,1.3,.7,label='x 桥轴',color=TEAL,offset=(.1,-.32),size=11)
    arrow(ax,.3,.7,.3,1.55,label='y 横向',color=TEAL,offset=(.2,.25),size=11)
    text(ax,7,.7,'限制平移 ≠ 把梁端转角全部锁死',17,BLUE)
    finish(fig,'F31',title,8,'支承体系的自由度表达','理想固定、纵向活动和多向活动支座的平移约束对照。青色双箭头代表可移动方向，红色标记代表被约束的平移；固定支座不等于梁固端。',['仅列平移自由度，不规定θx/θy/θz全部锁死','压紧接触、忽略摩阻的理想化','x沿桥轴、y横桥向、z竖直'],['三个面板的ux/uy约束分别为(0,0)/(free,0)/(free,free)','无力或力矩箭头混入位移图例'])

def f39():
    title='网格越来越细，为什么答案仍可能错？'
    fig,ax=new(title,'实算：Euler–Bernoulli 梁，线弹性小变形；均布荷载的一致节点力。目标为 x=7.4 m 处向下位移，不是网格节点最大值。')
    for j,bc in enumerate(['ss','ff']):
        x0=.8+6*j;x1=x0+4.4;y=5.4;line(ax,[x0,x1],[y,y],BLUE,3)
        udl(ax,x0,x1,6.12,y+.05,'q = 20 kN/m',7)
        if bc=='ss':support(ax,x0,y);support(ax,x1,y,'roller')
        else:clamp(ax,x0,y);clamp(ax,x1,y,'right')
        text(ax,(x0+x1)/2,4.62,'任务：简支梁' if bc=='ss' else '错误草稿：两端锁住转角',14,TEAL if bc=='ss' else RED)
    graph=fig.add_axes([.105,.22,.50,.36]);ns=[1,2,4,8,16,32]
    ss=[solve_beam(n)[0]*1000 for n in ns];ff=[solve_beam(n,boundary='ff')[0]*1000 for n in ns]
    q=20000;L=20;EI=34e9*.1;x=7.4
    true=q*x*(L**3-2*L*x*x+x**3)/(24*EI)*1000;wrong=q*x*x*(L-x)**2/(24*EI)*1000
    assert abs(ss[-1]-true)<1e-5 and abs(ff[-1]-wrong)<1e-5
    graph.plot(ns,ss,'o-',color=TEAL,label='正确边界：简支');graph.plot(ns,ff,'s-',color=RED,label='错误边界：两端固支');graph.axhline(true,color=TEAL,ls='--',lw=1)
    graph.set_xscale('log',base=2);graph.set_xticks(ns,[str(n) for n in ns]);graph.set_ylim(-.5,13.5);axes_style(graph,'单元数 N','向下位移 / mm');graph.legend(loc='center right',fontsize=10,frameon=False)
    text(ax,9.4,3.25,f'简支解析值\n{true:.4f} mm',18,TEAL)
    text(ax,9.4,2.05,f'错误边界也会收敛\n→ {wrong:.4f} mm',16,RED)
    text(ax,9.4,.85,'L = 20 m\nE = 34 GPa，I = 0.100 m⁴',12,INK)
    finish(fig,'F39',title,11,'第三层：网格与目标响应','以真实三次Hermite梁单元计算同一均布荷载：两端固支的错误边界也随网格加密收敛，但收敛值不等于任务要求的简支梁答案。',['简支梁任务，两端固支为故障对照','均布q，常EI，忽略剪切变形','目标位移取x=0.37L并按形函数恢复'],['所有网格竖向反力和=qL','自由DOF残差小于1e-4 N','32单元与各自解析值差<1e-5 mm'],{'N':ns,'ss_mm':ss,'wrong_fixed_mm':ff,'ss_exact_mm':true,'fixed_exact_mm':wrong,'target_x_m':x})

def arch_response(x,L=120.,f=24.,q=180.,half=False):
    x=np.asarray(x);y=4*f*x*(L-x)/L**2
    if half:
        RA=3*q*L/8;RB=q*L/8;H=q*L*L/(16*f)
        m0=RA*x-q/2*np.minimum(x,L/2)**2-q*L/2*np.maximum(x-L/2,0)
        v=RA-q*np.minimum(x,L/2)
    else:RA=RB=q*L/2;H=q*L*L/(8*f);m0=q*x*(L-x)/2;v=RA-q*x
    M=m0-H*y;phi=np.arctan(4*f*(L-2*x)/L**2);N=H*np.cos(phi)+v*np.sin(phi)
    return y,m0/H,M,N,H,RA,RB

def f21():
    title='压力线离开拱轴，弯矩从哪里来？'
    fig,ax=new(title,'实算：L=120 m、f=24 m 的三铰抛物线拱，左半跨 q=180 kN/m。压力线作图的竖向距离 Δy 与截面偏心距 e 不同。')
    xs=np.linspace(0,120,241);ya,yp,M,N,H,ra,rb=arch_response(xs,half=True)
    graph=fig.add_axes([.09,.28,.47,.49]);graph.plot(xs,ya,color=BLUE,lw=3,label='拱轴 y_a');graph.plot(xs,yp,color=RED,lw=2.5,ls='--',label='压力线作图 y_p=M0/H')
    graph.plot([30,30],[18,24],color=ORANGE,lw=2);graph.annotate('Δy = 6.0 m',xy=(30,21),xytext=(52,29),arrowprops={'arrowstyle':'->','color':ORANGE},color=ORANGE,fontsize=12)
    for x in np.linspace(5,55,6):graph.annotate('',xy=(x,30),xytext=(x,34),arrowprops={'arrowstyle':'-|>','color':ORANGE})
    graph.scatter([0,60,120],[0,24,0],fc='white',ec=INK,s=35,zorder=5);graph.set(xlim=(-4,124),ylim=(-1,36));axes_style(graph,'水平位置 x / m','相对拱脚高度 / m');graph.legend(loc='lower center',fontsize=10,frameon=False)
    y,p,m,n,h,*_=arch_response([30],half=True);e=float(m[0]/n[0]);assert abs(m[0]-40500)<1e-8
    text(ax,9.2,5.8,'左四分点 x = 30 m',17,INK)
    text(ax,9.2,4.75,'H = 6.750 MN\nM = H Δy = +40.500 MN·m',15,RED)
    text(ax,9.2,3.25,f'局部截面：N = {n[0]/1000:.3f} MN\ne = M/N = {e:.3f} m',15,BLUE)
    ax.add_patch(Rectangle((7.1,1.2),4.2,1.25,fc=LIGHT,ec='none'))
    text(ax,9.2,1.83,'先用力矩核对，再谈偏心。\n不能把竖向距离直接叫 e。',14,INK)
    finish(fig,'F21',title,5,'压力线与合理拱轴','同一左半跨均布荷载下，压力线作图与拱轴出现偏离。在左四分点，竖向差6 m对应M=HΔy=40.5 MN·m；沿截面法向计算的压力中心偏心为M/N，二者不可混用。',['仅该三铰拱、该荷载','y_p=M0/H为图解关系','N为局部轴向分量；不判定截面是否满足承载要求'],['四分点M=40500 kN·m','N=Hcosφ+V0sinφ','M=H(yp−ya)'],{'quarter_M_kNm':float(m[0]),'quarter_N_kN':float(n[0]),'quarter_e_m':e,'quarter_vertical_gap_m':6.})

def f22():
    title='荷载只放一半，拱就一定更轻松吗？'
    fig,ax=new(title,'实算：同一 L=120 m、f=24 m 的三铰抛物线拱；q=180 kN/m 按水平投影计。下方曲线正负采用 M=M0−Hy。')
    xs=np.linspace(0,120,241);result={}
    for j,half in enumerate([False,True]):
        x0=.8+6*j;x1=x0+4.4;y0=4.9;u=np.linspace(0,1,100);line(ax,x0+u*4.4,y0+.75*4*u*(1-u),BLUE,3)
        support(ax,x0,y0);support(ax,x1,y0);ax.add_patch(Circle(((x0+x1)/2,y0+.75),.06,fc='white',ec=INK,zorder=5))
        for x in np.linspace(x0+.1,(x0+x1)/2 if half else x1-.1,6):
            v=(x-x0)/4.4;arrow(ax,x,6.25,x,y0+.75*4*v*(1-v)+.1,lw=1.3)
        text(ax,(x0+x1)/2,6.65,'左半跨受载' if half else '满跨受载',16)
        yy,yp,M,N,H,ra,rb=arch_response(xs,half=half);result[str(half)]={'H_kN':H,'RA_kN':ra,'RB_kN':rb,'M_min_kNm':float(M.min()),'M_max_kNm':float(M.max())}
        graph=fig.add_axes([.11+.50*j,.25,.35,.30]);graph.axhline(0,color=GRAY,lw=1);graph.plot(xs,M/1000,color=RED if half else TEAL,lw=3);graph.fill_between(xs,0,M/1000,color=RED if half else TEAL,alpha=.14)
        graph.set(xlim=(0,120),ylim=(-46,46),xticks=[0,30,60,90,120]);axes_style(graph,'x / m','弯矩 / MN·m')
        text(ax,(x0+x1)/2,.0,'M = 0（此特定工况）' if not half else '左四分点 +40.5；右四分点 −40.5',13,TEAL if not half else RED)
    assert abs(result['False']['M_max_kNm'])<1e-7;assert abs(result['True']['M_max_kNm']-40500)<1e-7
    finish(fig,'F22',title,5,'第二步：半跨作用与压力线偏离','抛物线拱在满跨均布荷载下弯矩为零；仅在左半跨加载会形成一正一负的弯矩。总竖向荷载减小并不意味着每个截面弯矩减小。',['无自重以外另加项，比较的q相同','拱轴与边界保持不变','一阶三铰拱'],['满跨M全域≈0','半跨左右四分点M=±40500 kN·m','两工况RA+RB等于各自总荷载'],result)

def f23():
    title='桥墩“动了十毫米”，到底是哪一种动？'
    fig,ax=new(title,'输入示意，不是计算后的变形图。青色箭头为规定支承位移，大小放大；本图不预填拱内力或实际变形。')
    names=['两脚一起下沉','只有右脚下沉','两脚水平远离']
    for j,name in enumerate(names):
        x0=.45+4*j;x1=x0+3.05;y0=3.35;u=np.linspace(0,1,80);line(ax,x0+u*3.05,y0+1.15*4*u*(1-u),BLUE,3)
        panel(ax,x0,6.1,name,3.1);support(ax,x0,y0);support(ax,x1,y0)
        if j==0:
            for x in [x0,x1]:arrow(ax,x,2.75,x,1.85,color=TEAL);text(ax,(x0+x1)/2,1.2,'两端 Δz = −10 mm',13,TEAL)
            text(ax,(x0+x1)/2,.35,'理想共同平移不迫使拱弯曲',11,INK)
        elif j==1:
            arrow(ax,x1,2.75,x1,1.85,color=TEAL);text(ax,(x0+x1)/2,1.2,'左端 0；右端 −10 mm',13,TEAL)
            text(ax,(x0+x1)/2,.35,'差异位移：需带边界另算',11,INK)
        else:
            arrow(ax,x0,2.45,x0-.4,2.45,color=TEAL);arrow(ax,x1,2.45,x1+.4,2.45,color=TEAL)
            text(ax,(x0+x1)/2,1.2,'左端 −5；右端 +5 mm',13,TEAL);text(ax,(x0+x1)/2,.35,'相对张开 10 mm',12,INK)
        dim(ax,x0,5.1,x1,5.1,'同一初始跨径 L',offset=(0,.3))
    finish(fig,'F23',title,5,'温度、收缩徐变与基础变位','相同“10 mm”可以是共同沉降、差异沉降或相对水平张开。必须先定义运动对象、方向与边界，再计算三铰、两铰或无铰拱的附加响应。',['规定运动输入示意，不含响应计算','共同平移判断忽略地基额外约束、动力和几何变化','具体内力取决于结构边界与刚度'],['两端同移与相对位移分开','位移箭头未标成力','−5至+5的相对张开为10 mm'])

def iso(x,y,z):return np.array([.55+.69*x+.40*y,1.6+.15*x-.20*y+.85*z])
def iso_line(ax,a,b,color=INK,lw=2):
    a=iso(*a);b=iso(*b);line(ax,[a[0],b[0]],[a[1],b[1]],color,lw)
def iso_arrow(ax,a,b,color=ORANGE):
    a=iso(*a);b=iso(*b);arrow(ax,*a,*b,color=color,lw=2)

def f24():
    title='车的重量，怎样经过拉索到达桥塔？'
    fig,ax=new(title,'参数化空间构造示意；索、梁、塔共同工作，图中箭头只标所示部位的作用方向，不按箭头长度分配荷载。')
    corners=[iso(x,y,0) for x,y in [(0,-.65),(10,-.65),(10,.65),(0,.65)]];ax.add_patch(Polygon(corners,fc=LIGHT,ec=INK,lw=1.7))
    for y in [-.65,.65]:
        iso_line(ax,(5,y,-.6),(5,y,3.9),BLUE,5)
        for x in [1,2.3,3.6,6.4,7.7,9]:iso_line(ax,(5,y,3.7),(x,y,0),GRAY,1.3)
    iso_line(ax,(5,-.65,3.9),(5,.65,3.9),BLUE,3)
    iso_arrow(ax,(8,0,1.2),(8,0,.05));point=iso(8,0,1.3);text(ax,*point,'车轮作用 P ↓',12,ORANGE)
    iso_arrow(ax,(8.65,-.65,.25),(7.75,-.65,1.08),RED)
    iso_arrow(ax,(5,-.65,2.4),(5,-.65,1.2),RED)
    iso_arrow(ax,(5,-.65,-1.3),(5,-.65,-.63),TEAL)
    text(ax,2.2,1.15,'梁：局部受弯，并承受索的水平分力',12,INK)
    text(ax,4.75,6.55,'塔：承受竖向分力及不平衡水平分力',12,BLUE)
    text(ax,9.85,5.8,'看一根索在梁端的作用',14,INK)
    bx,by=9.9,3.4;ax.add_patch(Circle((bx,by),.08,fc=INK));arrow(ax,bx,by,bx-1.35,by+1.65,'T',RED,offset=(-.1,.22));arrow(ax,bx,by,bx,by+1.65,'竖向分力',TEAL,offset=(.65,0),size=11);arrow(ax,bx,by,bx-1.35,by,'水平分力',TEAL,offset=(0,-.35),size=11)
    line(ax,[bx-1.35,bx],[by+1.65,by+1.65],GRAY,1,ls=':');line(ax,[bx-1.35,bx-1.35],[by,by+1.65],GRAY,1,ls=':')
    text(ax,9.8,1.4,'索只拉，不把梁“托成铰支点”。\n索、梁、塔的刚度仍共同起作用。',12,INK)
    finish(fig,'F24',title,6,'结构组成、体系选择与传力','双索面斜拉体系的参数化轴测示意及单根索在梁端的分力。斜拉索向塔传力，也给主梁引入轴向作用；塔的竖向和不平衡水平作用最终需由基础承担。',['构件定位与分力示意，无全桥数值结果','只展示一根索的作用方向，不据箭头比例量取索力','索为受拉构件'],['斜索T的水平/竖向分量方向相容','轴测投影由同一坐标函数生成','两索面及塔梁连接位置明确'])

def f25():
    title='只调一组索，怎样得到矩阵的一列？'
    fig,ax=new(title,'数值沿用正文构造的程序测试矩阵，不代表图示桥的实算结果。各行量纲不同，不能跨行比较数字大小。')
    x0,x1,y=1.,7.,4.75;line(ax,[x0,x1],[y,y],BLUE,3);support(ax,x0,y);support(ax,x1,y,'roller');line(ax,[2.4,2.4],[4.45,6.4],BLUE,4)
    for i,x in enumerate([3.7,5.0,6.3],1):line(ax,[2.4,x],[6.35,y],ORANGE if i==2 else GRAY,2);text(ax,x,5.05,f'S{i}',12,ORANGE if i==2 else INK)
    arrow(ax,2.4,6.5,3.25,6.5,color=TEAL,lw=1.7);text(ax,3.6,6.5,'u_t',11,TEAL);curvarrow(ax,4.5,4.0,.3,'M_c',RED);arrow(ax,7,3.8,7,4.55,'R_e',TEAL,offset=(.38,0),size=11)
    text(ax,9.7,5.5,'这次只改 S2：\nΔT = [0, 1, 0] MN',16,ORANGE)
    labels=['弯矩系数 / (MN·m/MN)','位移系数 / (mm/MN)','反力系数 / (MN/MN)'];A=np.array([[-2,-1,-.4],[.5,-.6,-1.1],[.1,.3,.6]]);inp=np.array([0.,1.,0.]);out=A@inp
    for j in range(3):text(ax,3.25+1.05*j,3.55,f'S{j+1}',12,GRAY)
    for i in range(3):
        text(ax,1.45,2.85-.75*i,labels[i],10,ha='center')
        for j in range(3):
            x=3.25+1.05*j;yc=2.85-.75*i;ax.add_patch(Rectangle((x-.47,yc-.3),.94,.6,fc='#fff0df' if j==1 else LIGHT,ec='white'))
            text(ax,x,yc,f'{A[i,j]:+.1f}',15,ORANGE if j==1 else INK)
    arrow(ax,6.6,2.15,7.5,2.15,color=GRAY);text(ax,9.6,2.15,'−1.0 MN·m\n−0.6 mm\n+0.3 MN',17,ORANGE,linespacing=1.8)
    text(ax,5.9,.15,'每次只改变一个索组，把各观测量的增量放进同一列。',14,INK)
    assert np.allclose(A@np.array([1.5,1.,.5]),[-4.2,-.4,.75])
    finish(fig,'F25',title,6,'第三步：建立教学索力影响矩阵','固定模型状态和输出定义，仅将第二索组增大1 MN时，三项响应增量就是影响矩阵第二列；矩阵沿用正文明确声明的教学测试数据，构件定位图不冒充矩阵来源模型。',['教学构造矩阵，不是具体桥的计算','列为索组增量，行依次为弯矩、位移、反力','仅线性局部影响，不直接用于调索设计'],['A·[0,1,0]=[−1,−0.6,+0.3]','A·[1.5,1,0.5]=[−4.2,−0.4,+0.75]','各行单位单独标注'],{'A':A.tolist(),'increment_MN':inp.tolist(),'response':out.tolist(),'row_units':['MN·m/MN','mm/MN','MN/MN']})

def f26():
    title='合龙以后，桥还是刚才那个受力体系吗？'
    fig,ax=new(title,'施工阶段概念图：只示构件激活与连接改变，不表示实际变形或索力。合龙前状态、温度、索力和材料龄期需继承。')
    for j,closed in enumerate([False,True]):
        y=4.65-3.1*j;text(ax,.35,y+1.6,'合龙前：两个独立悬臂' if not closed else '合龙后：新增跨间连续约束',16,ha='left')
        for tower,tip,back in [(2.5,5.72,1),(9.5,6.28,11)]:
            line(ax,[tower,tower],[y-.65,y+1.3],BLUE,4);basefix(ax,tower,y-.65)
            line(ax,[back,tip],[y,y],BLUE,4)
            for anchor in np.linspace(back,tip,5):line(ax,[tower,anchor],[y+1.25,y],GRAY,1)
            for x in np.linspace(min(back,tip)+.3,max(back,tip)-.3,5):arrow(ax,x,y+.55,x,y+.08,lw=1.2)
        if closed:
            line(ax,[5.72,6.28],[y,y],ORANGE,5);text(ax,6,y-.75,'合龙段 / 连接',13,ORANGE)
        else:
            dim(ax,5.72,y-.6,6.28,y-.6,'间隙',offset=(0,-.3));text(ax,9.5,y-.95,'还要检查：高差、转角',12,GRAY)
    finish(fig,'F26',title,6,'合龙与体系转换','合龙前两侧悬臂分别承担施工荷载；合龙后新增连接使体系连续。不能只把成桥模型一次加载，就认为已重现施工状态。',['示意图不含变形和内力结果','施工荷载、临时边界和初始状态需按阶段定义','图中塔基仅作支承定位，不指定实际构造'],['合龙前中间断开、合龙后连接激活','两幅荷载方向向下','无预填施工弯矩或索力'])

def f27():
    title='悬索桥的重量，最后交给了谁？'
    fig,ax=new(title,'地锚式悬索桥构件与力路示意，不是成桥索力解。橙/红箭头为所标部位的力；长度不代表分担比例。')
    deck=2.55;line(ax,[1,11],[deck,deck],BLUE,5)
    for tx in [3,9]:line(ax,[tx,tx],[1.1,5.75],BLUE,6);ax.add_patch(Rectangle((tx-.38,.8),.76,.35,fc=LIGHT,ec=INK))
    xs=np.linspace(3,9,120);ys=3.+(xs-6)**2*(2.75/9);line(ax,xs,ys,INK,3)
    for x in np.linspace(3.35,8.65,15):line(ax,[x,x],[deck,3+(x-6)**2*(2.75/9)],GRAY,1.3)
    for a,t in [(1,3),(11,9)]:line(ax,[a,t],[1.4,5.75],INK,3);ax.add_patch(Rectangle((a-.5,.9),1,.5,fc=LIGHT,ec=INK,lw=2))
    arrow(ax,6,3.9,6,deck+.07,'桥面荷载',ORANGE,offset=(.7,0),size=12)
    arrow(ax,4.25,deck+.1,4.25,3.7,color=RED);text(ax,3.6,3.55,'吊索拉梁',11,RED)
    arrow(ax,1.02,1.45,1.5,2.45,color=RED);text(ax,1.35,2.75,'主缆拉锚碇',11,RED)
    arrow(ax,3,.1,3,.85,color=TEAL);arrow(ax,9,.1,9,.85,color=TEAL)
    text(ax,6,6.45,'主缆：受拉',16,INK);text(ax,10.1,5.7,'索塔 / 鞍座',13,BLUE);text(ax,6,1.9,'加劲梁：把荷载分配给吊索',14,BLUE)
    text(ax,1,.42,'锚碇',13,INK);text(ax,11,.42,'锚碇',13,INK);dim(ax,3,1.25,9,1.25,'主跨 L',offset=(0,-.28))
    finish(fig,'F27',title,7,'组成、体系与荷载路径','地锚式悬索桥中，桥面经加劲梁、吊索和主缆传力，索塔与锚碇共同承担主缆传来的作用。自锚式的主缆水平分力路径不同，不能套用本图。',['地锚式','构件和受力方向示意，非数值分析','索塔、锚碇和基础均须另行设计'],['15根主跨吊索连到主缆与梁','锚碇受主缆拉力方向指向索塔','基础反力示意向上'])

def f28():
    title='缆索垂得更深，锚碇要拉住的力会变多少？'
    fig,ax=new(title,'实算：单根理想索，L=400 m；q=100 kN/m 沿水平投影均布。忽略索弹性伸长、温度与支点移动。')
    L=400.;q=100.;fvals=[40.,80.];Hs=[q*L*L/(8*f) for f in fvals];V=q*L/2
    for j,f in enumerate(fvals):
        x0=.8+6*j;x1=x0+4.4;ytop=5.3;rise=f/40*.8;u=np.linspace(0,1,100);yy=ytop-4*rise*u*(1-u);line(ax,x0+4.4*u,yy,BLUE,3)
        for x in [x0,x1]:ax.add_patch(Circle((x,ytop),.065,fc='white',ec=INK,zorder=5));arrow(ax,x,ytop-.7,x,ytop-.06,color=TEAL,lw=1.5)
        arrow(ax,x0+.25,ytop,x0-.45,ytop,color=RED);arrow(ax,x1-.25,ytop,x1+.45,ytop,color=RED)
        line(ax,[x0,x1],[ytop,ytop],GRAY,1,ls=':');dim(ax,(x0+x1)/2,ytop-rise,(x0+x1)/2,ytop,f'f = {f:.0f} m',offset=(.8,0))
        for x in np.linspace(x0+.4,x1-.4,7):
            uu=(x-x0)/4.4;yy0=ytop-4*rise*uu*(1-uu);arrow(ax,x,yy0-.05,x,yy0-.55,lw=1.2)
        dim(ax,x0,2.3,x1,2.3,'L = 400 m');text(ax,(x0+x1)/2,6.25,f'垂跨比 f/L = {f/L:.2f}',15)
        text(ax,(x0+x1)/2,1.35,f'H = {Hs[j]/1000:.0f} MN',22,RED);text(ax,(x0+x1)/2,.5,f'支点竖向分力仍各为 {V/1000:.0f} MN',13,TEAL)
    assert Hs==[50000,25000]
    finish(fig,'F28',title,7,'抛物线近似','在水平投影均布荷载的理想索模型中，垂度由40 m增至80 m，水平分力H从50 MN减至25 MN，竖向分力仍各20 MN。H是水平分量，不是支点索力总值。',['抛物线索，等高支点','不含弹性伸长和索自重沿索长差异','图示纵横比不供量图'],['H=qL²/(8f)','V=qL/2','T_s=sqrt(H²+V²)，未把H标成T'],{'L_m':L,'q_kN_per_m':q,'f_m':fvals,'H_kN':Hs,'V_kN':V,'Ts_kN':[float(np.hypot(h,V)) for h in Hs]})

def f29():
    title='一根绳拉紧以后，为什么更难横向拨动？'
    fig,ax=new(title,'小扰动教学模型：原先拉直的绳长 L=10 m，初张力 T0 由两端维持；中点横向 P=1 kN。忽略增量伸长，竖向变形放大20倍。')
    L=10.;P=1.;vals=[]
    for j,T0 in enumerate([50.,100.]):
        x0=.8+6*j;x1=x0+4.4;yc=4.65;d=P*L/(4*T0);v=d*20*.44;mid=(x0+x1)/2
        panel(ax,x0,6.3,f'T0 = {T0:.0f} kN',4.4);line(ax,[x0,x1],[yc,yc],GRAY,1.5,ls='--');line(ax,[x0,mid,x1],[yc,yc-v,yc],BLUE,3)
        clamp(ax,x0,yc);clamp(ax,x1,yc,'right');arrow(ax,mid,yc-v+.8,mid,yc-v+.06,'P',ORANGE,offset=(.3,0));arrow(ax,mid-.35,yc-v+.35*v/2.2,mid-1.1,yc-v+1.1*v/2.2,color=RED);arrow(ax,mid+.35,yc-v+.35*v/2.2,mid+1.1,yc-v+1.1*v/2.2,color=RED)
        dim(ax,x0,3.2,x1,3.2,'L = 10 m');text(ax,mid,2.25,f'δ ≈ PL/(4T0) = {d*1000:.0f} mm',16,BLUE);text(ax,mid,1.3,f'横向切线刚度 4T0/L = {4*T0/L:.0f} kN/m',13,TEAL);vals.append(d)
    text(ax,6,.25,'这是受拉直绳的结果，不直接代表整座悬索桥，也不能用于受压桥塔。',13,INK)
    assert vals==[.05,.025];assert max(2*d/L for d in vals)<=.01
    finish(fig,'F29',title,7,'几何刚度和切线响应','同长、同一小横向荷载下，提高初张力会提高拉直绳的横向切线刚度，线性扰动位移近似反比于初张力。图示变形放大20倍，斜拉方向只作示意。',['只适用于初始拉直且有恒定预张力的绳','小斜率、忽略荷载引起的张力增量','没有将直绳结果当作全桥初应力有限元结果'],['δ为50/25 mm','2δ/L≤0.01','两侧竖向分力之和近似P'],{'T0_kN':[50,100],'delta_mm':[50,25],'tangent_stiffness_kN_per_m':[20,40]})

def f30():
    title='温度一样升高，为什么有的伸长、有的受压？'
    fig,ax=new(title,'实算：仅考虑均匀温升的一维轴向模型；L=20 m，α=12×10^(-6)/K，ΔT=30 K，E=200 GPa，A=0.020 m²。忽略温度梯度和弯曲。')
    alpha=12e-6;L=20.;dt=30.;E=200e9;A=.02;dl=alpha*L*dt;sig=E*alpha*dt;N=sig*A
    for j,fixed in enumerate([False,True]):
        x0=.85+6*j;x1=x0+4.25;y=4.5;panel(ax,x0,6.25,'轴向伸长被阻止' if fixed else '右端允许轴向移动',4.3)
        ax.add_patch(Rectangle((x0,y-.2),x1-x0,.4,fc='#ffefdc',ec=INK,lw=2));clamp(ax,x0,y)
        if fixed:
            clamp(ax,x1,y,'right');arrow(ax,x0-.6,y,x0+.65,y,color=RED);arrow(ax,x1+.6,y,x1-.65,y,color=RED)
            text(ax,(x0+x1)/2,3.35,f'压应力 = {sig/1e6:.0f} MPa',19,RED);text(ax,(x0+x1)/2,2.4,f'压力 N = {N/1000:.0f} kN',15,RED);text(ax,(x0+x1)/2,1.1,'ΔL = 0',17,INK)
        else:
            line(ax,[x1+.5,x1+.5],[y-.4,y+.5],TEAL,1.5,ls='--');arrow(ax,x1,y+.7,x1+.5,y+.7,color=TEAL)
            text(ax,(x0+x1)/2,3.35,f'自由伸长 = {dl*1000:.1f} mm',19,TEAL);text(ax,(x0+x1)/2,2.4,'N = 0（理想无摩阻）',15,TEAL);dim(ax,x0,1.25,x1,1.25,'L = 20 m')
        text(ax,(x0+x1)/2,5.45,'均匀温升 30 K',14,ORANGE)
    assert abs(dl*1000-7.2)<1e-10 and abs(N/1000-1440)<1e-8
    finish(fig,'F30',title,8,'自由温度位移','同样均匀温升下，自由伸缩产生7.2 mm轴向伸长；完全限制该伸长则在本一维弹性模型中产生72 MPa压应力、1440 kN压力。支座约束改变的是允许发生的运动。',['轴向杆模型，不模拟桥面温度梯度','均匀温升、常材料参数、小变形','自由端无摩阻；受约束端刚性'],['αLΔT=7.2 mm','EαΔT=72 MPa','N=EAαΔT=1440 kN'],{'free_elongation_mm':dl*1000,'restrained_stress_MPa':sig/1e6,'restrained_force_kN':N/1000})

def f32():
    title='基础把桥的重量交给哪一层土？'
    fig,ax=new(title,'竖向中心受压的力路示意，不是承载力计算。橙色为墩传下的作用，青色为土对基础的支承作用；箭头长度不表示分担比例。')
    panel(ax,.6,6.45,'浅基础：主要由基底接触传力',5.2);panel(ax,6.6,6.45,'桩基础：桩侧与桩端共同传力',5.2)
    for x0 in [.6,6.6]:
        ax.add_patch(Rectangle((x0,.55),5.1,3.7,fc='#f4f0e7',ec='none'));line(ax,[x0,x0+5.1],[4.25,4.25],GRAY,1.4);line(ax,[x0,x0+5.1],[1.05,1.05],GRAY,1,ls=':')
    ax.add_patch(Rectangle((2.35,3.15),.9,2,fc=LIGHT,ec=INK,lw=2));ax.add_patch(Rectangle((1.45,2.7),2.7,.45,fc=LIGHT,ec=INK,lw=2));arrow(ax,2.8,6,2.8,5.18,'N',ORANGE,offset=(.4,0))
    for x in np.linspace(1.6,4,6):arrow(ax,x,1.75,x,2.65,color=TEAL,lw=1.7)
    text(ax,3,1.28,'基底接触压力向上',13,TEAL)
    ax.add_patch(Rectangle((8.45,4.3),.9,.9,fc=LIGHT,ec=INK,lw=2));ax.add_patch(Rectangle((7.55,3.9),2.7,.4,fc=LIGHT,ec=INK,lw=2));arrow(ax,8.9,6,8.9,5.23,'N',ORANGE,offset=(.4,0))
    for x in [8,9.8]:
        ax.add_patch(Rectangle((x-.17,1.05),.34,2.85,fc='white',ec=INK,lw=2))
        for yy in [1.9,2.7]:
            for xx in [x-.33,x+.33]:arrow(ax,xx,yy-.3,xx,yy+.28,color=TEAL,lw=1.3)
        arrow(ax,x,.42,x,1.0,color=TEAL,lw=2)
    text(ax,11,2.65,'桩侧\n摩阻',12,TEAL);text(ax,8.9,.25,'桩端阻力 ↑',12,TEAL)
    finish(fig,'F32',title,8,'桩基础','浅基础与桩基础的竖向荷载路径对照。桩基础通过桩侧摩阻及桩端阻力传力；箭头只示方向，实际分担与群桩效应取决于土层、桩、承台和荷载状态。',['中心竖向受压','土反力方向示意，未指定分配百分比','不代表水平受力、负摩阻或抗拔情景'],['外部作用向下、承压支承作用向上','基底接触与桩侧/桩端作用位置分开','未把单桩承载力简单乘桩数'])

def f33():
    title='风速翻倍，推桥面的力也只翻倍吗？'
    fig,ax=new(title,'实算：空气密度ρ=1.225 kg/m³；阻力系数 C_D=1.2、参考面积 A=10 m² 固定。仅静力阻力，不代表涡振、抖振或颤振。')
    V=np.linspace(0,45,200);pressure=.5*1.225*V*V;graph=fig.add_axes([.095,.25,.47,.52]);graph.plot(V,pressure,color=BLUE,lw=3);graph.scatter([10,20,40],[61.25,245,980],color=ORANGE,zorder=4)
    for x,val in [(10,61.25),(20,245),(40,980)]:graph.annotate(f'{val:g} Pa',(x,val),(x+2,val+80),fontsize=11,color=INK)
    axes_style(graph,'参考风速 U / (m/s)','动压 ½ρU² / Pa');graph.set(xlim=(0,46),ylim=(0,1250))
    vals=[]
    for j,v in enumerate([10,20,40]):
        y=5.55-1.65*j;F=.5*1.225*v*v*1.2*10/1000;vals.append(F)
        text(ax,9.15,y+.38,f'U = {v} m/s',14,BLUE);ax.add_patch(Rectangle((7.7,y-.35),1,.42,fc=LIGHT,ec=INK,lw=2));arrow(ax,7,y-.14,7.65,y-.14,color=BLUE,lw=1.6)
        arrow(ax,8.85,y-.14,8.9+F/5,y-.14,color=ORANGE,lw=2);text(ax,9.7,y-.64,f'D = {F:.3f} kN',16,ORANGE)
    assert np.allclose(vals,[.735,2.94,11.76]);assert vals[1]/vals[0]==4
    finish(fig,'F33',title,9,'风速平方关系','固定气密度、阻力系数和面积时，风速10、20、40 m/s对应静力阻力0.735、2.940、11.760 kN；速度翻倍，动压和阻力均变为4倍。蓝色箭头示来流，橙色箭头示阻力。',['ρ、C_D、A固定','静力阻力D=½ρU²C_DA','未引入任何桥型专用系数或规范风速'],['单位Pa×m²=N','10→20→40 m/s阻力每次×4'],{'U_m_per_s':[10,20,40],'dynamic_pressure_Pa':[61.25,245,980],'drag_kN':vals,'CD':1.2,'A_m2':10})

def f34():
    title='同样大小的周期力，为什么能激起更大的振动？'
    fig,ax=new(title,'实算：线性单自由度在简谐外力下的稳态位移；r=外力频率/固有频率。纵轴相对静位移 F0/k 归一，不是桥梁风速响应曲线。')
    graph=fig.add_axes([.1,.24,.5,.52]);r=np.linspace(0,2,1601);vals={}
    for z,c in [(.02,RED),(.05,ORANGE),(.10,TEAL)]:
        R=1/np.sqrt((1-r*r)**2+(2*z*r)**2);graph.plot(r,R,color=c,lw=2.3,label=f'阻尼比 ζ={z:.2f}');vals[str(z)]=float(1/(2*z));assert abs(R[800]-1/(2*z))<1e-10
    axes_style(graph,'频率比 r','位移动力放大系数');graph.set(xlim=(0,2),ylim=(0,27));graph.legend(frameon=False,loc='upper right',fontsize=11)
    # Separate oscillator makes the plotted quantity concrete.
    clamp(ax,8,4.45);zz=np.linspace(8,9.3,13);zy=4.45+np.array([0,.16,-.16,.16,-.16,.16,-.16,.16,-.16,.16,-.16,.16,0]);line(ax,zz,zy,BLUE,1.8)
    ax.add_patch(Rectangle((9.3,3.95),1.1,1.,fc=LIGHT,ec=INK,lw=2));text(ax,9.85,4.45,'m',17);arrow(ax,10.45,4.45,11.6,4.45,'F0 sinωt',ORANGE,offset=(0,.36),size=11)
    dim(ax,9.25,3.25,10.45,3.25,'位移 x(t)',color=TEAL);text(ax,8.6,5.15,'弹簧 k',12,BLUE)
    line(ax,[8,8.55],[3.7,3.7],BLUE,1.5);ax.add_patch(Rectangle((8.55,3.53),.5,.34,fill=False,ec=BLUE,lw=1.5));line(ax,[8.8,8.8],[3.56,3.84],BLUE,1.5);line(ax,[8.8,9.3,9.3],[3.7,3.7,4.0],BLUE,1.5);line(ax,[8,8],[3.7,4.45],BLUE,1.5);text(ax,8.6,3.12,'阻尼 c',11,BLUE)
    text(ax,9.75,2.0,'r = 1 时\n放大系数 = 1/(2ζ)',16,INK);text(ax,9.75,.7,'这里改变的是阻尼，\n外力幅值仍相同。',13,GRAY)
    finish(fig,'F34',title,9,'单自由度模型','单自由度简谐稳态响应随频率比与阻尼改变。阻尼比0.02、0.05、0.10在r=1时的位移放大系数分别为25、10、5；该模型不直接描述桥梁颤振。',['线性单自由度，简谐力恒幅','已达稳态，不是启动瞬态','ζ>0；忽略非线性'],['r=1时R=1/(2ζ)','未截平共振峰','归一分母为F0/k'],{'amplification_at_r1':vals})

def f35():
    title='桥面两边一起动，和一上一下，是同一种振动吗？'
    fig,ax=new(title,'振型形状示意，不含求解频率或真实振幅；相位可以整体反号。青色箭头表示瞬时位移方向，虚线为未变形位置，不是荷载。')
    def project(x,y,z,shift):return np.array([shift+.72*x+.40*y,3.5+.14*x-.35*y+z])
    for j,kind in enumerate(['bend','torsion']):
        shift=.65+6*j;panel(ax,shift,6.4,'竖向弯曲：两侧同向' if j==0 else '扭转：两侧反向',4.8)
        strips=[]
        for x in np.linspace(0,5.5,17):
            amplitude=.68*np.sin(np.pi*x/5.5)
            zz=[-amplitude,-amplitude] if kind=='bend' else [-amplitude,+amplitude]
            a=project(x,-.65,zz[0],shift);b=project(x,.65,zz[1],shift);strips.append([a,b]);line(ax,[a[0],b[0]],[a[1],b[1]],GRAY,1)
        for i in range(16):ax.add_patch(Polygon([*strips[i],strips[i+1][1],strips[i+1][0]],fc=LIGHT,ec='none',zorder=0))
        for side in [0,1]:line(ax,[p[side][0] for p in strips],[p[side][1] for p in strips],BLUE,2.5)
        for yy in [-.65,.65]:
            a=project(0,yy,0,shift);b=project(5.5,yy,0,shift);line(ax,[a[0],b[0]],[a[1],b[1]],GRAY,1.2,ls='--')
        for yy,sign in [(-.65,-1),(.65,-1 if j==0 else 1)]:
            a=project(2.75,yy,0,shift);b=project(2.75,yy,sign*.68,shift);arrow(ax,*a,*b,color=TEAL,lw=2)
        cx=shift+2.4;line(ax,[cx-1,cx+1],[1.6,1.6],GRAY,1.5,ls='--')
        if j==0:line(ax,[cx-1,cx+1],[1.15,1.15],BLUE,3);text(ax,cx,.38,'h_L ≈ h_R：中心线移动',13)
        else:line(ax,[cx-1,cx+1],[1.1,2.1],BLUE,3);text(ax,cx,.38,'θ ≈ (h_R−h_L) / b_s',13)
    finish(fig,'F35',title,9,'弯曲、扭转和耦合模态','参数化桥面带的纯竖弯与纯扭转形状对照，以及同一横截面的观察方式。真实桥梁可能有耦合模态；需同一断面同步测量才可用两侧位移分解。',['示意模态形状，无特征值求解','小转角且横截面近似刚体','非畸变截面；没有声称现实模态均为纯弯/纯扭'],['竖弯两边同号','扭转两边反号、中心不平移','位移箭头和荷载图例分开'])

def f36():
    title='少了十分之一厚度，梁就只软十分之一吗？'
    fig,ax=new(title,'几何实算、状态为教学假设：矩形钢条 b=200 mm，E不变；仅上下表面减薄，宽度不变。并非桥梁寿命或防护效果预测。')
    b=200.;h0=100.;I0=b*h0**3/12;vals=[]
    for j,(h,label,c) in enumerate([(100,'初始状态',BLUE),(90,'假定未干预状态',RED),(98,'假定较早防护状态',TEAL)]):
        cx=2+4*j;panel(ax,cx-1.5,6.3,label,3.1);height=1.35*h/h0;ax.add_patch(Rectangle((cx-1.1,4.8-1.35/2),2.2,1.35,fill=False,ec=GRAY,ls='--',lw=1.3));ax.add_patch(Rectangle((cx-1.1,4.8-height/2),2.2,height,fc=LIGHT,ec=c,lw=2.5))
        dim(ax,cx-1.1,3.43,cx+1.1,3.43,'b = 200 mm');text(ax,cx,5.98,f'h = {h} mm',13,c)
        area=h/h0;ratio=h**3/h0**3;vals.append({'h_mm':h,'A_ratio':area,'I_ratio':ratio,'deflection_ratio':1/ratio})
        text(ax,cx,2.63,f'面积剩余 {100*area:.0f}%',15,c);text(ax,cx,1.8,f'抗弯刚度剩余 {100*ratio:.1f}%',15,c);text(ax,cx,.85,f'同荷载挠度为原来的 {1/ratio:.3f} 倍',12,INK)
    assert abs(vals[1]['I_ratio']-.729)<1e-12
    finish(fig,'F36',title,10,'钢构件腐蚀至截面性能','同宽矩形钢条上下表面减薄的几何比较：高度减少10%，面积减少10%，惯性矩减少27.1%，同边界同荷载下线弹性挠度增加约37.2%。防护列只是指定剩余厚度的比较，不是预报寿命。',['矩形截面，宽度与E保持不变','仅上下表面均匀损失，不模拟点蚀、疲劳或局部屈曲','维护列为假设状态，不表示涂层能恢复已损失钢材'],['A=bh，I=bh³/12','同梁同荷载δ与EI成反比','h90：I/I0=.729'],{'states':vals,'maintenance_note':'同一假定比较时点，无真实年限或实桥观测'})

def f37():
    title='把地震力降下来，还要为哪一种变化留空间？'
    fig,ax=new(title,'教学指定谱读数：m=1000 t，g=9.81 m/s²；F=mS_a，S_d=S_a(T/2π)²。不是某规范反应谱，也不是实际桥梁隔震效果预测。')
    m=1e6;g=9.81;data=[]
    for j,(T,sa,label) in enumerate([(.5,.4,'较短周期方案'),(2.,.15,'较长周期方案')]):
        cx=3+6*j;panel(ax,cx-2.2,6.35,label,4.5);ax.add_patch(Rectangle((cx-1.25,4.65),2.5,.4,fc=LIGHT,ec=INK,lw=2));text(ax,cx,5.45,'同一上部质量 m',13)
        # Spring denotes effective horizontal stiffness; no literal bearing detail is claimed.
        y=4.2;xs=np.linspace(cx-1.1,cx+1.1,11);ys=y+np.array([0,.15,-.15,.15,-.15,.15,-.15,.15,-.15,.15,0]);line(ax,xs,ys,BLUE,2)
        line(ax,[cx-1.5,cx+1.5],[3.7,3.7],GRAY,2);line(ax,[cx-1.3,cx-1.3],[3.7,4.2],GRAY,2);line(ax,[cx-1.3,cx-1.1],[4.2,4.2],BLUE,1.5);line(ax,[cx+1.1,cx+1.1],[4.2,4.65],BLUE,1.5);arrow(ax,cx+1.4,4.85,cx+.3,4.85,color=ORANGE);text(ax,cx+1.45,4.3,'等效惯性力',11,ORANGE)
        F=m*sa*g/1000;Sd=sa*g*(T/(2*np.pi))**2*1000;data.append({'T_s':T,'Sa_g':sa,'F_kN':F,'Sd_mm':Sd})
        text(ax,cx,3.12,f'T = {T:.1f} s；S_a = {sa:.2f} g',14,INK);text(ax,cx,2.17,f'力需求 {F:.0f} kN',19,ORANGE);text(ax,cx,1.15,f'位移需求 {Sd:.0f} mm',19,TEAL)
        dim(ax,cx-.85,.35,cx+.85,.35,'需要核对净空 / 限位',offset=(0,-.24),color=TEAL)
    assert data[1]['F_kN']<data[0]['F_kN'] and data[1]['Sd_mm']>data[0]['Sd_mm']
    finish(fig,'F37',title,10,'减隔震与位移控制','在本图明确指定的两组教学谱读数下，较长周期方案的等效力需求降低，但谱位移需求增大；隔震选择必须同时核查梁端位移、限位、管线和防落梁空间。图中的弹簧表示等效水平刚度。',['m相同；使用指定Sa而非实际场地谱','线性谱等效示例，无滞回或多模态求解','惯性作用箭头仅表方向；应按实际绝对加速度取负向'],['F=mSa','Sd=Sa(T/2π)²','1000 t换算为1e6 kg'],{'scenarios':data})

def f38():
    title='电脑里的一个节点，对应桥上的什么位置？'
    fig,ax=new(title,'平面梁的几何与离散示意；L=20 m、跨中P=120 kN。自由度箭头示意可描述的运动，具体正负号须与局部坐标统一。')
    x0,x1,y=.9,11.1,5.3;ax.add_patch(Rectangle((x0,y-.14),x1-x0,.28,fc=LIGHT,ec=INK,lw=2));support(ax,x0,y-.14);support(ax,x1,y-.14,'roller');arrow(ax,6,6.65,6,5.49,'P = 120 kN',ORANGE,offset=(1,0),size=13)
    text(ax,2.4,6.32,'实际构件轴线',15,BLUE);dim(ax,x0,4.37,x1,4.37,'L = 20 m')
    nodes=np.linspace(x0,x1,5);yy=3.12
    for j in range(4):line(ax,nodes[j:j+2],[yy,yy],BLUE if j%2==0 else TEAL,4);text(ax,(nodes[j]+nodes[j+1])/2,2.55,f'单元 {j+1}',12,GRAY)
    for j,x in enumerate(nodes):ax.add_patch(Circle((x,yy),.085,fc='white',ec=INK,lw=2,zorder=5));text(ax,x+(.65 if j==2 else 0),3.62,f'节点 {j+1}',12)
    support(ax,nodes[0],yy);support(ax,nodes[-1],yy,'roller');arrow(ax,6,4.0,6,3.24,color=ORANGE,lw=1.8)
    text(ax,8.3,1.55,'此处跨中荷载恰好落在节点3。\n若不在节点，需按位置正确映射。',13,INK)
    cx,cy=2,1.02;ax.add_patch(Circle((cx,cy),.07,fc=INK));arrow(ax,cx,cy,cx+.95,cy,'u_x',TEAL,offset=(0,-.28),size=11);arrow(ax,cx,cy,cx,cy+.9,'u_z',TEAL,offset=(-.38,0),size=11);curvarrow(ax,cx,cy,.48,None,TEAL);text(ax,cx+.75,cy+.75,'θ_y',12,TEAL)
    text(ax,3.4,.13,'位移：m；转角：rad',11,GRAY)
    finish(fig,'F38',title,11,'自由度、局部坐标与单元关系','同一20 m简支梁从构件轴线到四个梁单元、五个节点的映射；跨中集中力施加在节点3。节点既有位置也携带自由度，单元连接节点并使用材料与截面刚度。',['平面梁离散示意，不含求解结果','支座与荷载位置由同一几何生成','θy仅作转动自由度图示，正负随坐标统一'],['4单元/5节点','P位于L/2=10 m并落在节点3','两端约束与构件图一致'],{'L_m':20,'nodes_x_m':[0,5,10,15,20],'connectivity':[[1,2],[2,3],[3,4],[4,5]],'P_kN':120,'load_node':3})

def f40():
    title='AI给了一个数，怎样知道它算的是你的问题？'
    fig,ax=new(title,'沿用正文单根等效梁基准：L=20 m，P=120 kN，E=34 GPa，I=0.100 m⁴；不计自重。不是全桥设计，图形不按挠度缩放。')
    P=120000.;L=20.;E=34e9;I=.1;correct=P*L**3/(48*E*I)*1000;bad_unit=correct*1000;bad_bc=correct/4
    cases=[('任务一致：简支','ss',f'{correct:.3f} mm',TEAL),('单位错：把 GPa 当 MPa','ss',f'形式值 {bad_unit:.0f} mm',RED),('边界错：转角被锁住','ff',f'{bad_bc:.3f} mm',RED)]
    for j,(name,bc,val,c) in enumerate(cases):
        x0=.45+4*j;x1=x0+3.1;y=4.75;panel(ax,x0,6.3,name,3.1);line(ax,[x0,x1],[y,y],BLUE,3);arrow(ax,(x0+x1)/2,5.9,(x0+x1)/2,y+.05,lw=1.8)
        if bc=='ss':support(ax,x0,y);support(ax,x1,y,'roller')
        else:clamp(ax,x0,y);clamp(ax,x1,y,'right')
        text(ax,(x0+x1)/2,3.65,val,18,c)
        msg=['与独立解析式核对','已超出小变形适用域\n拒收该线性结果','反力总和仍可正确\n但不符合转角自由'][j];text(ax,(x0+x1)/2,2.65,msg,12,c)
    names=['写清要求','建立模型','运行计算','独立核对','修改再算']
    for j,n in enumerate(names):
        x=.8+2.5*j;text(ax,x,.95,n,13,INK)
        if j<4:arrow(ax,x+.72,.95,x+1.62,.95,color=GRAY,lw=1.3)
    assert abs(correct-5.88235294117647)<1e-10 and abs(bad_bc-1.4705882352941175)<1e-10
    finish(fig,'F40',title,11,'AI交来一份计算，先检查什么？ {#ai-check-case}','同一等效梁任务的正确模型、弹性模量单位错误、两端固支边界错误对照。单位错的5882 mm只是超出小变形适用域的线性公式形式值，不能采纳；反力平衡也不能单独识别错误边界。',['单根等效梁，暂不计自重','正确基准为线弹性小变形简支梁','单位故障仅为诊断；不把越域大位移当作物理预测'],['正确δ=PL³/(48EI)=5.88235 mm','错误E小1000倍→线性形式值大1000倍并拒收','固定端集中力δ=PL³/(192EI)=1.47059 mm'],{'correct_mm':correct,'unit_error_formal_value_mm':bad_unit,'unit_error_accepted':False,'wrong_boundary_mm':bad_bc})

def contact(ids,name):
    w=1000;h=650;out=Image.new('RGB',(w,65+h*len(ids)),'#eef3f5');d=ImageDraw.Draw(out);font=ImageFont.truetype('C:/Windows/Fonts/msyh.ttc',25)
    d.text((20,15),'首批制图 · '+', '.join(ids),font=font,fill=INK)
    for j,id in enumerate(ids):
        im=Image.open(OUT/f'{id}.png').convert('RGB');im.thumbnail((w-24,h-45));out.paste(im,((w-im.width)//2,65+j*h));d.text((20,65+j*h+h-40),id,font=font,fill=INK)
    out.save(OUT/name)

def mark_reviewed():
    """Explicit invocation only after viewing this batch; --all resets to pending."""
    notes={
        20:'逐张目视：两端水平推力向内、竖向支反力向上；20/30m工况和数值可分辨。',
        21:'逐张目视：拱轴/压力线图例、左半跨加载、Δy标注和e=M/N明确区分。',
        22:'逐张目视并复查：已移开与横坐标重叠的结论文字；正负弯矩区和单位可读。',
        23:'逐张目视：三种位移输入各自标方向；明确不画未经计算的响应形状。',
        24:'逐张目视：双索面、桥塔、桥面定位及单索分力方向可辨；没有伪称全桥实算。',
        25:'逐张目视并复查：三列标题分别对齐；各行影响系数量纲和输出量纲分列。',
        26:'逐张目视并复查：修正竖向塔柱的地面固定符号；合龙前断开、合龙后连接。',
        27:'逐张目视：加劲梁、吊索、主缆、索塔、锚碇及基础力路可辨。',
        28:'逐张目视：索支点水平分力向外、竖向分力向上，40/80m垂度对照清楚。',
        29:'逐张目视：T0两工况、位移放大说明、红色张力箭头沿各自示意绳线。',
        30:'逐张目视：自由伸长的位移箭头与受约束压力分色，指数缺字已消除。',
        31:'逐张目视：ux/uy缺字已消除；活动方向箭头不穿过下方说明。',
        32:'逐张目视：基底、桩侧与桩端土反力位置可辨，方向与中心受压情景一致。',
        33:'逐张目视：动压坐标、来流/阻力箭头及三组单位读数可辨。',
        34:'逐张目视并复查：共振峰未截平，增补了实际可辨的并联阻尼器符号。',
        35:'逐张目视：两侧同向/反向、未变形虚线和横截面提取相互对应。',
        36:'逐张目视：三种剩余高度、面积/EI/位移倍率分列；维护为假设状态而非年限预测。',
        37:'逐张目视并复查：等效水平弹簧连接至质量和地基，力与位移取舍并列。',
        38:'逐张目视并复查：节点3文字已避开荷载箭头，转角标签已避开平移箭头。',
        39:'逐张目视：任务与错误边界、收敛曲线、解析基准与单位均可读。',
        40:'逐张目视：三种草稿支承与位移读数可辨，越域形式值明确拒收，流程箭头分色。',
    }
    stamp=datetime.now(timezone.utc).isoformat();source_hash=hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
    for n in range(20,41):
        id=f'F{n}';p=OUT/f'{id}.json';meta=json.loads(p.read_text(encoding='utf-8'))
        with Image.open(OUT/f'{id}.png') as im:
            assert im.size==(2400,1440),(id,im.size)
            assert abs(im.info.get('dpi',(0,0))[0]-200)<.1
        assert meta['layout_preflight']['text_outside_canvas']==[]
        meta.update(visual_review='passed_self_review',visual_review_notes=notes[n],visual_reviewed_at_utc=stamp,visual_review_source_sha256=source_hash,review_limit='制作者逐图图面自查与脚本数值断言；仍为专业/出版复核稿，不代替独立工程签审',file_sha256={ext:hashlib.sha256((OUT/f'{id}.{ext}').read_bytes()).hexdigest() for ext in ['svg','png']})
        p.write_text(json.dumps(meta,ensure_ascii=False,indent=2),encoding='utf-8')
    print('21 figures: headings, 200dpi PNG, canvas text bounds, numerical assertions and individual visual review recorded.')

if __name__=='__main__':
    ap=argparse.ArgumentParser();ap.add_argument('--representatives',action='store_true');ap.add_argument('--all',action='store_true');ap.add_argument('--mark-reviewed',action='store_true');opt=ap.parse_args()
    if opt.mark_reviewed:mark_reviewed()
    else:
        for fn in ([f20,f21,f22,f23,f24,f25,f26,f27,f28,f29,f30,f31,f32,f33,f34,f35,f36,f37,f38,f39,f40] if opt.all else [f20,f31,f39]):fn()
        contact(['F20','F31','F39'],'F20-F31-F39-contact.png')
        print('Exported:',','.join(META))
