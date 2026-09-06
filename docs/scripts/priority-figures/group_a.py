"""Original figures F01-F19. Values are teaching examples unless caption states book values."""
from figlib import *
from matplotlib.patches import Arc
import math, json, argparse
from PIL import Image, ImageOps, ImageDraw
SOURCE='scripts/priority-figures/group_a.py'
META={
'F01':(1,'桥梁的基本组成'),'F02':(1,'结构体系与传力'),'F03':(1,'尺度判断从无量纲关系开始'),
'F04':(2,'轴力、偏心与截面核心'),'F05':(2,'轴力、偏心与截面核心'),'F06':(2,'形心、截面二次矩与截面模量'),'F07':(2,'第一级：理想临界值与数量级'),'F08':(2,'截面初始应力'),
'F09':(3,'影响线的计算对象'),'F10':(3,'车辆最不利布载与影响线接口'),'F11':(3,'新增完整计算单一：30 m简支梁的轴组与均布作用'),'F12':(3,'新增完整计算单五：相关性对线性可靠度的影响'),
'F13':(4,'桥面板、横隔构件与局部受力'),'F14':(4,'横向板带与连续板'),'F15':(4,'杠杆法的物理基础'),'F16':(4,'刚性横梁与偏心受压思路'),'F17':(4,'不等刚度横向相容'),'F18':(4,'连续梁'),'F19':(4,'顶推施工')}
FILES={1:'chapters/ch01.qmd',2:'chapters/ch02-foundations.qmd',3:'chapters/ch02.qmd',4:'chapters/ch03.qmd'}

def save(fig,id,title,caption,assumptions,checks):
    ch,h=META[id]
    lines=(BOOK/FILES[ch]).read_text(encoding='utf-8-sig').splitlines()
    hs=[(i+1,s.lstrip('#').strip()) for i,s in enumerate(lines) if s.startswith('#')]
    match=[i for i,s in hs if s==h];assert match,(id,h)
    m=export(fig,id,title,ch,h,caption,assumptions,SOURCE,checks)
    m.update({'chapter_file':FILES[ch],'heading_line':match[0],'figure_kind':'calculated' if any(isinstance(x,dict) for x in checks) else 'schematic','visual_review':'pending','technical_review':'formula_assertions_passed' if any(isinstance(x,dict) for x in checks) else 'schematic_boundary_declared'})
    (OUT/f'{id}.json').write_text(json.dumps(m,ensure_ascii=False,indent=2),encoding='utf-8')

def ck(name,value,expected,tol=1e-8,unit=''):
    value=float(value);expected=float(expected);assert abs(value-expected)<=tol,(name,value,expected)
    return {'name':name,'value':value,'expected':expected,'tolerance':tol,'unit':unit,'passed':True}

def poly(ax,pts,fc=LIGHT,ec=INK,lw=1.4,alpha=1):
    ax.add_patch(Polygon(pts,closed=True,facecolor=fc,edgecolor=ec,lw=lw,alpha=alpha))
def leader(ax,x,y,xx,yy,label,ha='left',size=13,color=INK):
    line(ax,[x,xx],[y,yy],color,1)
    ax.plot(x,y,'o',ms=3,color=color)
    text(ax,xx+(.1 if ha=='left' else -.1),yy,label,size,color,ha)
def panel(ax,x,title,sub=''):
    text(ax,x,6.6,title,17)
    if sub:text(ax,x,6.13,sub,11.5,GRAY)
def beam(ax,x0,x1,y,ends=True,color=INK,lw=6):
    line(ax,[x0,x1],[y,y],color,lw)
    if ends:support(ax,x0,y);support(ax,x1,y,'roller')
def fixed(ax,x,y,h=.8,vertical=False):
    if vertical:
        line(ax,[x-.4,x+.4],[y,y],INK,3)
        for a in np.arange(-.4,.4,.12):line(ax,[x+a,x+a-.12],[y,y-.17],GRAY,1)
    else:
        line(ax,[x,x],[y-h/2,y+h/2],INK,3)
        for a in np.arange(-h/2,h/2,.13):line(ax,[x,x-.16],[y+a,y+a-.13],GRAY,1)
def stress(ax,x0,y0,y1,bot,top,scale=.35,color=BLUE,label=True):
    zz=np.linspace(y0,y1,9);ss=np.linspace(bot,top,9)
    line(ax,[x0,x0],[y0-.12,y1+.12],GRAY,1,ls='--')
    for za,sv in zip(zz,ss):
        if abs(sv)>1e-9:arrow(ax,x0,za,x0+scale*sv,za,color=color if sv>=0 else RED,lw=1.5)
    line(ax,[x0+scale*bot,x0+scale*top],[y0,y1],color,2)
    if label:
        text(ax,x0+scale*top,y1+.32,f'{top:.2f}',12,color)
        text(ax,x0+scale*bot,y0-.32,f'{bot:.2f}',12,color if bot>=0 else RED)

def f04():
    title='同一个偏心压力，为什么一边压得更多？'
    fig,ax=new(title,'教学例：矩形 b = 0.30 m，h = 0.60 m；N = 600 kN，e = 0.05 m，M = Ne = 30 kN·m。\n均质线弹性、完整截面、平截面；本图压应力为正，z 向上，正 M 使上缘压应力增加。')
    b,h,N,e=.3,.6,600,.05;A=b*h;I=b*h**3/12;mean=N/A/1000;delta=N*e*h/2/I/1000
    vals=[(mean,mean),( -delta,delta),(mean-delta,mean+delta)]
    for x,name,sub,v in zip([2,6,10],['① 中心压力','② 偏心产生的弯矩','③ 两项相加'],['N/A：每处同样大','Mz/I：上、下缘方向相反','σc = N/A + Mz/I'],vals):
        panel(ax,x,name,sub)
        poly(ax,[[x-1.25,2.2],[x-.6,2.2],[x-.6,4.6],[x-1.25,4.6]],fc=LIGHT)
        line(ax,[x-1.4,x-.4],[3.4,3.4],GRAY,1,ls='--')
        stress(ax,x-.25,2.2,4.6,*v,scale=.28)
        text(ax,x,1.1,f'下缘 {v[0]:.2f} → 上缘 {v[1]:.2f} MPa',12)
        text(ax,x-1.28,4.8,'z ↑',11,GRAY)
    text(ax,4,3.4,'+',27,ORANGE);text(ax,8,3.4,'=',27,ORANGE)
    text(ax,6,.35,'合力仍是 600 kN；多出的不是另一份荷载，而是作用线偏移的效果。',14,TEAL)
    z=np.linspace(-h/2,h/2,1001);sig=N/A+N*e*z/I
    checks=[ck('stress integral N',np.trapezoid(sig*b,z),N,1e-6,'kN'),ck('stress integral moment',np.trapezoid(sig*b*z,z),N*e,1e-4,'kN·m'),ck('top compression',mean+delta,5,1e-9,'MPa')]
    save(fig,'F04',title,'把同一偏心压力分为中心压力和等效弯矩。三幅应力箭头使用同一比例；正值为压应力，负值为拉应力。', ['教学参数；不计开裂与材料非线性','应力图为截面计算，不是极限承载力验算'],checks)

def project(x,y,z=0):return np.array([2.0+.32*x+.22*y,2.65+.15*y+.9*z])
def prism(ax,x0,x1,y0,y1,z0,z1,fc=LIGHT,ec=INK):
    v=lambda x,y,z:project(x,y,z)
    poly(ax,[v(x0,y0,z0),v(x1,y0,z0),v(x1,y0,z1),v(x0,y0,z1)],fc,ec)
    poly(ax,[v(x1,y0,z0),v(x1,y1,z0),v(x1,y1,z1),v(x1,y0,z1)],fc,ec)
    poly(ax,[v(x0,y0,z1),v(x1,y0,z1),v(x1,y1,z1),v(x0,y1,z1)],fc,ec)
def truck_iso(ax,x,y):
    # 6.0 m overall teaching silhouette, 2.2 m body width, axle spacing 3.5 m.
    prism(ax,x,x+3.7,y-1.1,y+1.1,1.55,2.65,BLUE)
    prism(ax,x+3.8,x+5.4,y-1.1,y+1.1,1.55,2.45,ORANGE)
    for wx in [x+1,x+4.5]:
        for wy in [y-1.1,y+1.1]:
            px,py=project(wx,wy,1.47);ax.add_patch(Circle((px,py),.105,color=INK,zorder=8))
    q=project(x+5.41,y-.85,2.05);q2=project(x+5.41,y+.85,2.35)
    line(ax,[q[0],q2[0]],[q[1],q2[1]],LIGHT,3)

def f13():
    title='车轮下面，桥面板靠哪些构件支承？'
    fig,ax=new(title,'参数化构造示意：L = 20 m，B = 10.8 m，5 根主梁间距 2.4 m；桥面板厚 0.22 m，梁高 1.20 m。\n3 道跨内横隔板位于 L/4、L/2、3L/4；另画两端横梁。均为教学布置，不代表所有桥型。')
    # Draw furthest members first; deck ghost outline keeps diaphragm bodies visible.
    for x in [0,20]:
        prism(ax,x-.28,x+.28,-5,5,-.55,-.1,GRAY)
        for y in [-4.8,-2.4,0,2.4,4.8]:prism(ax,x-.2,x+.2,y-.32,y+.32,-.1,.06,ORANGE)
    for y in [4.8,2.4,0,-2.4,-4.8]:prism(ax,0,20,y-.16,y+.16,0,1.2,BLUE)
    for x in [20,15,10,5,0]:prism(ax,x-.12,x+.12,-4.8,4.8,.23,1.05,TEAL)
    outline=[project(x,y,1.42) for x,y in [(0,-5.4),(20,-5.4),(20,5.4),(0,5.4)]]
    poly(ax,outline,fc=LIGHT,ec=GRAY,alpha=.28)
    for y in [-5.5,5.4]:
        p0=project(0,y,1.42);p1=project(20,y,1.42);line(ax,[p0[0],p1[0]],[p0[1],p1[1]],GRAY,1.2,ls='--')
    truck_iso(ax,9,.4)
    for wx in [10,13.5]:
        px,py=project(wx,-.7,1.42);arrow(ax,px,py+.8,px,py+.07,color=RED,lw=2)
    a=project(4,-4.8,.65);leader(ax,*a,1.0,3.8,'主梁：沿桥长方向',ha='left',size=12)
    a=project(15,-1.0,.9);leader(ax,*a,9.5,4.7,'横隔板：连接主梁',size=12)
    a=project(4,4.8,1.42);leader(ax,*a,3.2,6.5,'桥面板：本图透明显示',size=12)
    a=project(20,-4.8,-.02);leader(ax,*a,9.3,1.0,'支座',size=12)
    a=project(5,-4.8,.3);leader(ax,*a,3.5,1.7,'跨内位置：5、10、15 m',size=12)
    a=project(0,-6.8,-.3);z=project(20,-6.8,-.3);dim(ax,*a,*z,'L = 20 m',offset=(0,-.27))
    a=project(21,-5.4,1.42);z=project(21,5.4,1.42);dim(ax,*a,*z,'B = 10.8 m',offset=(.8,0))
    text(ax,9.6,6.8,'横断面：5 根主梁',11.5,INK)
    line(ax,[8.25,10.95],[6.23,6.23],GRAY,3)
    for yi in [-4.8,-2.4,0,2.4,4.8]:
        xi=9.6+yi*.25
        poly(ax,[[xi-.045,5.76],[xi+.045,5.76],[xi+.045,6.2],[xi-.045,6.2]],BLUE)
    dim(ax,9.6,5.48,10.2,5.48,'d = 2.4 m',offset=(0,-.25))
    text(ax,6,.07,'整桥看清方向，再从两根主梁之间取出一块桥面板。',14,TEAL)
    save(fig,'F13',title,'轴测整桥以5根纵向主梁、3道跨内横隔板和两端横梁定位桥面板的空间支承。透明桥面仅为揭示内部构造；车辆轮载向下。',['所有几何为明确教学例；纵横比例由坐标统一投影','横隔板为有高度的实体连接，不是路面横线','此图不计算荷载分担或板内应力'],['geometry: 5 longitudinal girders, spacing 2.4 m','interior diaphragms at x=5,10,15 m; end members separate','L=20 m and B=10.8 m annotation endpoints match geometry'])

def f16():
    title='车偏到一侧，总重量怎样分到五根梁？'
    fig,ax=new(title,'统一五梁教学例：y = −4.8、−2.4、0、2.4、4.8 m，偏心 e = +2.4 m；本图横向合力 P = 120 kN 为教学值。\n刚性横梁、五根等竖向刚度、线弹性小位移；反力向上为正。这里的 Ri 是分配模型反力，不是规范系数。')
    pos=np.array([-4.8,-2.4,0,2.4,4.8]);P,e=120,2.4;avg=np.ones(5)*P/5;ecc=P*e*pos/(pos@pos);tot=avg+ecc
    for xc,name,arr in zip([2,6,10],['① 共同下沉','② 只看转动部分','③ 合起来'],[avg,ecc,tot]):
        panel(ax,xc,name)
        y=4.65;line(ax,[xc-1.45,xc+1.45],[y,y],INK,5)
        if xc==2:arrow(ax,xc,5.65,xc,y+.1,'120 kN',offset=(.65,.1))
        elif xc==6:
            ax.add_patch(Arc((xc,5.25),1.2,.6,theta1=-90,theta2=180,color=ORANGE,lw=2));arrow(ax,xc+.15,4.96,xc-.02,4.95,color=ORANGE,lw=1.6);text(ax,xc,5.75,'Pe = 288 kN·m',11,ORANGE)
        else:arrow(ax,xc+.72,5.65,xc+.72,y+.1,'120 kN',offset=(.55,.05));dim(ax,xc,5.15,xc+.72,5.15,'e',offset=(0,.18))
        # Deformation is a plane line, plus labelled reaction bars.
        xx=xc+pos*.3;v=arr/120
        line(ax,[xc-1.45,xc+1.45],[3.6,3.6],GRAY,1,ls='--')
        line(ax,xx,3.6-v,BLUE,2.5)
        text(ax,xc,2.83,'变形趋势（放大）',10.5,GRAY)
        for k,(x,r) in enumerate(zip(xx,arr)):
            line(ax,[x,x],[1.3,1.3+r*.020],TEAL if r>=0 else RED,14)
            text(ax,x,1.3+r*.020+(.22 if r>=0 else -.22),f'{r:.0f}',12,TEAL if r>=0 else RED)
            text(ax,x,.25,str(k+1),11,GRAY)
        line(ax,[xc-1.5,xc+1.5],[1.3,1.3],GRAY,1)
    text(ax,4,4,'+',26,ORANGE);text(ax,8,4,'=',26,ORANGE)
    text(ax,6,-.12,'柱长表示 Ri（kN）；下方数字 1—5 为梁号。  0 + 12 + 24 + 36 + 48 = 120 kN',12,INK)
    checks=[ck('sum Ri',tot.sum(),P,1e-9,'kN'),ck('sum Ri yi',tot@pos,P*e,1e-9,'kN·m'),ck('eccentric component sum',ecc.sum(),0,1e-9,'kN')]
    save(fig,'F16',title,'平均分担24 kN/梁与偏心分量−24、−12、0、12、24 kN相加，得到0、12、24、36、48 kN。合力和合矩均与外作用一致。',['刚性横梁与等刚度；忽略扭转柔度、板局部和横隔离散','向下位移为正，图中只示意放大的线性位移趋势'],checks)

def f01():
    title='车的重量，最后传到了哪里？'
    fig,ax=new(title,'双跨简支梁桥示意；只追踪左跨车辆的竖向作用，不画构件自重，省略配筋、铺装和地质细节。\n橙色箭头表示向下的作用传递；地基向基础提供反力。图中不表示应力大小。')
    # Clear cut-away elevation with a local bearing inset.
    for x in [1.1,5.8,10.5]:
        poly(ax,[[x-.8,.8],[x+.8,.8],[x+.8,1.15],[x-.8,1.15]],GRAY)
        for px in [x-.5,x+.5]:poly(ax,[[px-.1,-.1],[px+.1,-.1],[px+.1,.8],[px-.1,.8]],LIGHT)
        poly(ax,[[x-.33,1.15],[x+.33,1.15],[x+.5,3.1],[x-.5,3.1]],LIGHT)
        poly(ax,[[x-.66,3.1],[x+.66,3.1],[x+.66,3.4],[x-.66,3.4]],GRAY)
        for bx in [x-.35,x+.35]:poly(ax,[[bx-.13,3.4],[bx+.13,3.4],[bx+.13,3.57],[bx-.13,3.57]],ORANGE)
    for l,r in [(.65,5.7),(5.9,10.95)]:
        poly(ax,[[l,3.58],[r,3.58],[r,3.98],[l,3.98]],BLUE)
        poly(ax,[[l-.12,3.98],[r+.12,3.98],[r+.12,4.15],[l-.12,4.15]],LIGHT)
    line(ax,[.2,11.6],[.25,.25],GRAY,1,ls='--');text(ax,10.4,-.02,'地基（示意）',11,GRAY)
    poly(ax,[[2.1,4.42],[4.2,4.42],[4.2,5.13],[2.1,5.13]],BLUE)
    poly(ax,[[4.2,4.42],[4.95,4.42],[4.95,4.95],[4.6,5.05],[4.2,5.05]],ORANGE)
    for x in [2.6,4.55]:ax.add_patch(Circle((x,4.36),.19,color=INK));arrow(ax,x,5.65,x,4.2,color=ORANGE)
    text(ax,3.5,6,'车辆作用',16)
    for x in [1.1,5.8]:
        arrow(ax,x,3.25,x,1.5,color=ORANGE,lw=3)
        arrow(ax,x-.5,-.2,x-.5,.6,color=TEAL,lw=2)
    leader(ax,7.8,4.11,8.4,5.7,'桥面板 → 主梁',size=14)
    leader(ax,5.45,3.49,6.6,4.8,'支座',size=14)
    leader(ax,5.55,2.25,6.5,2.65,'桥墩',size=14)
    leader(ax,5.8,.9,7.3,1.25,'基础',size=14)
    leader(ax,1.05,2.3,2.0,2.65,'端支承体简化显示',size=11)
    save(fig,'F01',title,'由车辆、桥面板、主梁、支座、墩台、基础到地基的竖向传力路径。基础处向上箭头表示地基对基础的反力。',['非实桥构造图；不表示材料应力和反力大小','桥台用简化端支承体表现，未绘台背土和附属设施'],['load path is continuous from superstructure to ground','reaction and applied load directions distinguished'])

def f02():
    title='同样向下的重量，为什么需要不同的支承？'
    fig,ax=new(title,'统一教学比较：水平跨度 L = 12 m，按水平投影均布 q = 10 kN/m；拱矢高、索垂度均 f = 3 m。\n反力箭头表示支承对结构的作用；拱与索为理想柔性轴力模型。真实桥梁还存在弯曲、连接和施工约束。')
    for xc,name in [(2,'梁：主要靠弯曲'),(6,'拱：主要受压'),(10,'索：只能受拉')]:
        panel(ax,xc,name)
        t=np.linspace(-1,1,101);x=xc+1.4*t
        if xc==2:yy=np.full_like(t,3.8);beam(ax,x[0],x[-1],3.8)
        elif xc==6:
            yy=3+1.5*(1-t*t);line(ax,x,yy,BLUE,7);support(ax,x[0],3);support(ax,x[-1],3)
        else:
            yy=4.5-1.5*(1-t*t);line(ax,x,yy,TEAL,5)
            for xp in [x[0],x[-1]]:ax.add_patch(Circle((xp,4.5),.09,ec=INK,fc='white',lw=1.5))
        for tt in np.linspace(-.85,.85,7):
            xp=xc+1.4*tt;yp=np.interp(xp,x,yy);arrow(ax,xp,5.5,xp,yp+.1,color=ORANGE,lw=1.5)
        text(ax,xc,5.8,'q = 10 kN/m',11,ORANGE)
        if xc==2:
            arrow(ax,x[0],2.7,x[0],3.65,color=TEAL);arrow(ax,x[-1],2.7,x[-1],3.65,color=TEAL)
            text(ax,xc,1.72,'左右各 V = 60 kN',12);text(ax,xc,1.13,'跨中 M = 180 kN·m',12,BLUE)
            text(ax,xc,.52,'理想竖向荷载下 H = 0',11,GRAY)
        elif xc==6:
            arrow(ax,x[0]-.15,1.9,x[0]-.15,2.9,color=TEAL);arrow(ax,x[-1]+.15,1.9,x[-1]+.15,2.9,color=TEAL)
            arrow(ax,x[0]-.65,2.78,x[0]+.08,2.78,color=RED);arrow(ax,x[-1]+.65,2.78,x[-1]-.08,2.78,color=RED)
            text(ax,xc,1.72,'V = 60 kN；H = 60 kN',12);text(ax,xc,1.13,'拱脚需要向内的反力',12,RED)
        else:
            arrow(ax,x[0],4.5,x[0]-.42,4.9,color=TEAL);arrow(ax,x[-1],4.5,x[-1]+.42,4.9,color=TEAL)
            text(ax,xc,1.72,'V = 60 kN；H = 60 kN',12);text(ax,xc,1.13,'索端需要向外的拉住力',12,TEAL)
        dim(ax,x[0],2.5 if xc==2 else .35,x[-1],2.5 if xc==2 else .35,'12 m')
    checks=[ck('each vertical reaction',10*12/2,60,1e-9,'kN'),ck('arch/cable horizontal reaction',10*12**2/(8*3),60,1e-9,'kN'),ck('beam midspan moment',10*12**2/8,180,1e-9,'kN·m')]
    save(fig,'F02',title,'同一竖向均布荷载下，理想梁以弯曲平衡，抛物线拱需要向内水平反力，抛物线索需要向外水平反力。相同的反力量级不代表结构性能相同。',['荷载沿水平投影均布；几何小斜率不是H公式必需条件','图示轴线与指定荷载相配；偏载后不能继续假定拱内无弯矩'],checks)

def f03():
    title='把一座桥原样放大两倍，还能照搬原来的判断吗？'
    fig,ax=new(title,'几何相似教学例：全部长度乘 s，材料弹性模量与重度不变；只比较自重作用下的等截面简支梁。\nq∝s²，M∝s⁴，截面模量 W∝s³，所以弹性弯曲应力 σ∝s；不是所有放大方式都遵循这组比例。')
    panel(ax,3,'原尺寸 s = 1');panel(ax,8.5,'全部尺寸 s = 2')
    for xc,length,height in [(3,2.8,.24),(8.2,5.6,.48)]:
        y=4.45;poly(ax,[[xc-length/2,y-height],[xc+length/2,y-height],[xc+length/2,y],[xc-length/2,y]],BLUE)
        support(ax,xc-length/2,y-height);support(ax,xc+length/2,y-height,'roller')
        for xx in np.linspace(xc-length/2+.2,xc+length/2-.2,7):arrow(ax,xx,5.45,xx,y+.05,color=ORANGE,lw=1.4 if length<3 else 2.8)
        dim(ax,xc-length/2,3.7,xc+length/2,3.7,'L' if length<3 else '2L')
    vals=[('长度',2),('面积 A',4),('总自重 G',8),('二次矩 I',16)]
    for i,(name,v) in enumerate(vals):
        xx=1.7+i*2.9;text(ax,xx,2.6,name,14);text(ax,xx,1.92,f'× {v}',25,BLUE)
    line(ax,[.6,11.4],[1.33,1.33],GRAY,1)
    text(ax,3, .72,'自重弯曲应力：× 2',18,RED);text(ax,8.8,.72,'不是“每个量都 × 2”',16,INK)
    b,h,L,g=.3,.6,6,25
    def v(s):
        A=b*h*s*s;I=b*(h*s)**3*s/12;W=I/(h*s/2);q=g*A;M=q*(L*s)**2/8;return A,I,q*L*s,M/W
    a1,i1,w1,s1=v(1);a2,i2,w2,s2=v(2)
    checks=[ck('area scaling',a2/a1,4),ck('I scaling',i2/i1,16),ck('self-weight scaling',w2/w1,8),ck('self-weight bending stress scaling',s2/s1,2)]
    save(fig,'F03',title,'几何相似、材料和重度相同的梁，将尺度乘2后面积、自重和二次矩分别乘4、8和16，而自重弯曲应力乘2。',['只比较给定简支等截面梁与自重；不含车辆、风、稳定或施工','所有尺寸同时缩放，不能用于只增跨度或只增板宽的情形'],checks)

def f05():
    title='压力移到哪里，截面边缘才开始出现拉应力？'
    fig,ax=new(title,'同一矩形截面：b = 0.30 m，h = 0.60 m，N = 600 kN；压应力为正，图中 z 向上。\n完整均质线弹性截面；h/6 是单向偏心无拉应力的核心界限，不是钢筋混凝土大、小偏心受压的分界。')
    mean=600/(.3*.6)/1000;checks=[]
    for xc,r,label in [(2,0,'作用线穿过形心'),(6,1/6,'恰好到核心边界'),(10,1/3,'超出核心范围')]:
        panel(ax,xc,('e/h = 1/6' if r==1/6 else 'e/h = 1/3') if r else 'e/h = 0',label)
        xb=xc-1.25;y0,y1=2.15,4.75
        poly(ax,[[xb,y0],[xb+.65,y0],[xb+.65,y1],[xb,y1]],LIGHT)
        # Middle third in the direction of eccentricity, with point load entering the section.
        poly(ax,[[xb,3.45-2.6/6],[xb+.65,3.45-2.6/6],[xb+.65,3.45+2.6/6],[xb,3.45+2.6/6]],TEAL,TEAL,alpha=.16)
        line(ax,[xb-.1,xb+.8],[3.45,3.45],GRAY,1,ls='--')
        ax.plot(xb+.325,3.45+2.6*r,'o',ms=9,color=ORANGE)
        text(ax,xb+.325,5.05,'N 作用点',11,ORANGE)
        low,high=mean*(1-6*r),mean*(1+6*r)
        stress(ax,xc-.05,y0,y1,low,high,.15)
        text(ax,xc,1.15,f'下缘 {low:.2f}   上缘 {high:.2f} MPa',12)
        text(ax,xc,.55,['全截面均匀受压','下缘压应力刚好为零','下缘出现拉应力'][round(r*6)],13,RED if r>1/6 else TEAL)
        checks.append(ck(f'edge stress sum e/h={r}',low+high,2*mean,1e-9,'MPa'))
    save(fig,'F05',title,'移动同一个压力作用点，比较矩形截面的均匀、三角形和带拉区的线性应力图。绿色带仅标示本方向的中间三分之一核心范围。',['只讨论单向偏心，双向偏心核心为菱形','出现拉区后若材料开裂，不再沿用完整弹性应力图作为实际状态'],checks)

def f06():
    title='同一块板竖着放、横着放，为什么弯起来不一样？'
    fig,ax=new(title,'矩形截面教学例：0.20 m × 0.60 m，面积均为 0.12 m²；比较同一水平形心轴 y 的二次矩 Iy。\n在材料、梁长、竖向荷载和支承相同的Euler–Bernoulli梁模型中，挠度与 Iy 成反比。')
    for xc,b,h,name in [(3,.2,.6,'立放'),(9,.6,.2,'平放')]:
        panel(ax,xc,name,f'b = {b:.2f} m，h = {h:.2f} m')
        sc=4;yc=4;poly(ax,[[xc-b*sc/2,yc-h*sc/2],[xc+b*sc/2,yc-h*sc/2],[xc+b*sc/2,yc+h*sc/2],[xc-b*sc/2,yc+h*sc/2]],LIGHT)
        arrow(ax,xc-1.6,yc,xc+1.65,yc,color=GRAY,lw=1);text(ax,xc+1.8,yc,'y',12,GRAY)
        arrow(ax,xc,yc-1.5,xc,yc+1.65,color=GRAY,lw=1);text(ax,xc,yc+1.85,'z',12,GRAY)
        I=b*h**3/12;text(ax,xc,1.7,f'Iy = bh³/12 = {I:.4f} m⁴',16,BLUE)
    text(ax,6,2.8,'同样的面积',14,GRAY)
    text(ax,6,.6,'立放的 Iy 是平放的 9 倍；相同作用下，弹性挠度只有 1/9。',17,TEAL)
    checks=[ck('equal area',.2*.6,.6*.2,1e-12,'m²'),ck('second moment ratio',(.2*.6**3)/(.6*.2**3),9,1e-9)]
    save(fig,'F06',title,'明确指出弯曲轴后比较矩形转向前后的二次矩。面积相同不表示抗弯刚度相同。',['均质线弹性；关于相同方向的形心轴','不据此判定整体最优；还需考虑侧向稳定、剪切和构造'],checks)

def f07():
    title='同样长的压杆，端部能不能转动有多大影响？'
    fig,ax=new(title,'统一教学例：杆的实际长度 L = 3 m，E = 200 GPa，I = 0.000008 m⁴；Pcr = π²EI/(KL)²。\n理想直、等截面、轴心受压、线弹性；虚线为原轴线，蓝线是任意放大的屈曲模态，不是实际挠度。')
    checks=[];s=np.linspace(0,1,200)
    for xc,K,name,mode in [(2,1,'两端理想铰支',np.sin(np.pi*s)),(6,2,'下端固结、上端自由',1-np.cos(np.pi*s/2)),(10,.5,'两端固结、无侧移',1-np.cos(2*np.pi*s))]:
        panel(ax,xc,name);yy=2.0+3*s
        line(ax,[xc,xc],[2,5],GRAY,1,ls='--');line(ax,xc+.35*mode,yy,BLUE,3)
        if K==1:
            for y in [2,5]:ax.add_patch(Circle((xc,y),.09,fc='white',ec=INK,lw=2))
            line(ax,[xc-.3,xc+.3],[1.83,1.83],INK,2);line(ax,[xc-.3,xc+.3],[5.17,5.17],INK,2)
        else:
            fixed(ax,xc,2,vertical=True)
            if K==.5:fixed(ax,xc,5,vertical=True)
        arrow(ax,xc,5.95,xc,5.28,'P',offset=(.28,0),color=ORANGE)
        dim(ax,xc-1.1,2,xc-1.1,5,'L',offset=(-.22,0))
        P=math.pi**2*200e9*8e-6/(K*3)**2/1000
        text(ax,xc,1.25,f'K = {K:g}；Le = {K*3:g} m',14);text(ax,xc,.55,f'Pcr = {P:.0f} kN',16,BLUE)
        checks.append(ck(f'Pcr K={K}',P,math.pi**2*1600/(K*3)**2,1e-6,'kN'))
    save(fig,'F07',title,'实际长度相同，理想端部约束不同，计算长度和理想临界力不同。图中L始终是实际长度，Le=KL是计算长度。',['三种理想边界：不计局部屈曲、初始缺陷和屈服','真实塔柱/拱肋和弹性连接不应仅按外观选择K'],checks)

def f08():
    title='普通钢筋和预应力，分别在什么时候开始起作用？'
    fig,ax=new(title,'截面应力采用压为正；右侧教学示例 A = 0.18 m²，I = 0.0054 m⁴，h = 0.60 m，中心预压力 P = 600 kN。\n只示意普通钢筋受拉机制；右侧按完整线弹性截面计算，外弯矩 M = 30 kN·m；不计损失、自重及开裂。')
    panel(ax,3,'普通钢筋：随构件变形受力','本图只示意受拉区机制，不作承载力计算')
    panel(ax,9,'预应力：外荷载前先建立初始应力','本例使用中心预压力，便于单独比较')
    beam(ax,.8,5.15,4.2);line(ax,[.9,5.05],[4.01,4.01],ORANGE,3)
    for x in [2,3,4]:arrow(ax,x,5.3,x,4.3,color=BLUE)
    for x in [2.4,3.15,3.8]:line(ax,[x,x+.06,x+.01],[3.98,4.12,4.26],RED,1.2)
    arrow(ax,2.8,3.35,2.1,3.35,color=ORANGE);arrow(ax,3.2,3.35,3.9,3.35,color=ORANGE)
    text(ax,3,2.75,'外荷载使受拉侧伸长\n钢筋与混凝土共同变形',14)
    text(ax,3,1.25,'图中裂缝仅为机制示意\n不是按图判断是否已开裂',11,GRAY)
    for xc,name,bot,top in [(7.1,'施加预压后',3.333333,3.333333),(10.1,'再加外弯矩后',1.666667,5)]:
        text(ax,xc+.45,5.25,name,13)
        stress(ax,xc,2.3,4.5,bot,top,.23)
        text(ax,xc+.5,1.6,f'下 {bot:.2f} / 上 {top:.2f} MPa',11)
    arrow(ax,8.45,3.5,9.2,3.5,color=GRAY,lw=1.5)
    text(ax,9,.62,'预压改变起点；不等于所有阶段都没有拉应力。',13,TEAL)
    checks=[ck('uniform prestress',600/.18/1000,10/3,1e-10,'MPa'),ck('bending edge stress',30*.3/.0054/1000,5/3,1e-10,'MPa')]
    save(fig,'F08',title,'左侧普通钢筋随构件变形承担拉力，为机制示意；右侧中心预压力先形成均匀压应力，再叠加外弯矩，是明确参数的截面计算。',['两侧表达不同机制，不作等配筋等成本比较','实际预应力还包括偏心、束形、损失、施工阶段和次内力','不能把钢筋出现拉力等同于必然已有可见裂缝'],checks)

def eta_m(x,L=30):
    x=np.asarray(x);return np.where((x>=0)&(x<=L),np.minimum(x,L-x)/2,0.)

def f09():
    title='同一辆车换个位置，跨中弯矩会怎样变？'
    fig,ax=new(title,'教学例：L = 30 m，简支梁，固定观察跨中 C；向下移动力 P = 100 kN。\n下图是 C 截面的弯矩影响线：横坐标为荷载位置，不是同一工况下沿梁分布的弯矩图；ηM 的单位是 m。')
    X=lambda x:1+x/3
    beam(ax,1,11,5.0);ax.plot(X(15),5,'o',color=RED,ms=8);text(ax,X(15),5.48,'固定观察截面 C',14,RED)
    arrow(ax,X(6),6.25,X(6),5.15,'100 kN',offset=(.7,0));arrow(ax,3.5,6.05,5.1,6.05,'移动车辆',offset=(0,.28),color=GRAY,lw=1.4)
    dim(ax,1,4.28,11,4.28,'30 m')
    xx=np.linspace(0,30,301);ee=eta_m(xx);yb=1.5;scale=.27
    ax.fill_between(X(xx),yb,yb+scale*ee,color=BLUE,alpha=.12);line(ax,X(xx),yb+scale*ee,BLUE,3)
    line(ax,[.8,11.2],[yb,yb],GRAY,1);text(ax,.63,3.1,'ηM\n(m)',12,GRAY)
    for x in [0,6,15,24,30]:
        e=float(eta_m(x));line(ax,[X(x),X(x)],[yb,yb+scale*e],GRAY,1,ls='--')
        if x in [6,15,24]:
            ax.plot(X(x),yb+scale*e,'o',ms=7,color=ORANGE);text(ax,X(x)+(.85 if x==15 else 0),yb+scale*e+.29,f'η = {e:g} m',12,BLUE)
            text(ax,X(x),.55,f'x = {x} m\nM = {100*e:.0f} kN·m',12)
        else:text(ax,X(x),yb-.22,str(x),11,GRAY)
    checks=[ck('eta at left',eta_m(0),0,unit='m'),ck('eta at right',eta_m(30),0,unit='m'),ck('eta at midspan',eta_m(15),7.5,unit='m'),ck('load at 6m statics',100*(30-6)/30*15-100*(15-6),100*eta_m(6),unit='kN·m')]
    save(fig,'F09',title,'移动力相同，跨中弯矩随影响线纵标变化。6 m、15 m、24 m三个位置分别得到300、750、300 kN·m。',['线弹性简支梁；固定跨中正弯矩为目标','不含动力放大或车辆规范模型'],checks)

def f10():
    title='想让同一截面的剪力最大，荷载该放在哪一边？'
    fig,ax=new(title,'教学例：L = 30 m，截面 C 距左支点 a = 12 m；可自由布置的向下均布荷载 q = 10 kN/m。\n符号定义：VC = RA − C左侧荷载总和；对左段自由体，正 VC 在切口处向下。只讨论这个定义下的正、负极值。')
    L,a,q=30,12,10;checks=[]
    for xc,positive,name in [(3,True,'求最大正剪力'),(9,False,'求最小负剪力')]:
        panel(ax,xc,name)
        X=lambda t:xc-2.05+t/30*4.1
        beam(ax,X(0),X(30),4.9);line(ax,[X(a),X(a)],[4.63,5.15],RED,2);text(ax,X(a),5.35,'C',12,RED)
        lo,hi=(a,L) if positive else (0,a)
        for x in np.linspace(lo+.4,hi-.4,9):arrow(ax,X(x),6.0,X(x),5.06,color=TEAL if positive else RED,lw=1.5)
        text(ax,xc,6.25,'只覆盖正区' if positive else '只覆盖负区',12,TEAL if positive else RED)
        text(ax,xc-1.36,3.94,'ηV（无量纲）',11,GRAY);base=2.7;sc=1.8;xl=np.linspace(0,a,101);xr=np.linspace(a,L,101);yl=-xl/L;yr=1-xr/L
        line(ax,[X(0),X(L)],[base,base],GRAY,1)
        line(ax,X(xl),base+sc*yl,RED,2.5);line(ax,X(xr),base+sc*yr,TEAL,2.5)
        ax.fill_between(X(xr if positive else xl),base,base+sc*(yr if positive else yl),color=TEAL if positive else RED,alpha=.16)
        line(ax,[X(a),X(a)],[base+sc*(-a/L),base+sc*(1-a/L)],GRAY,1,ls=':')
        for yy in [-a/L,1-a/L]:ax.plot(X(a),base+sc*yy,'o',mfc='white',mec=RED if yy<0 else TEAL,ms=6)
        text(ax,X(a)-.38,base+sc*(-a/L)-.25,'−0.4',11,RED);text(ax,X(a)+.38,base+sc*(1-a/L)+.2,'+0.6',11,TEAL)
        text(ax,X(0),base-.22,'0',11,GRAY);text(ax,X(L),base-.22,'30 m',11,GRAY)
        area=(L-a)**2/(2*L) if positive else -a*a/(2*L);V=q*area
        text(ax,xc,1.15,f'VC = {V:+.0f} kN',22,TEAL if positive else RED)
        text(ax,xc,.52,f'影响线有号面积 × q = {area:g} m × 10 kN/m',11.5)
        RA=q*(hi-lo)*(1-(lo+hi)/(2*L));vstat=RA-(q*a if not positive else 0)
        checks.append(ck(name,V,vstat,1e-9,'kN'))
    save(fig,'F10',title,'固定截面剪力影响线在C处有单位跃变。覆盖右侧正区得到+54 kN，覆盖左侧负区得到−24 kN。改变目标符号，需要改变加载区段。',['向下均布荷载可独立覆盖任意同号区，非规范车道加载规则','在C左、右紧邻取不同极限值；不为恰落C的集中力指定唯一剪力值'],checks)

def f11():
    title='两根车轴一起上桥，怎样把各自的作用加起来？'
    fig,ax=new(title,'采用正文教学轴组：L = 30 m，120 kN 轴在 x = 11 m，180 kN 轴在 x = 15 m，轴距 4 m。\n目标为同一跨中截面的正弯矩；这里暂不加正文中的均布作用，不是规范车辆模型。')
    X=lambda x:1+x/3;beam(ax,1,11,5.1)
    for x,P in [(11,120),(15,180)]:
        arrow(ax,X(x),6.4,X(x),5.24,color=ORANGE,lw=2.5);text(ax,X(x)+(-.65 if x==11 else .65),6.5,f'{P} kN',14,ORANGE)
    dim(ax,X(11),4.45,X(15),4.45,'4 m',offset=(0,-.25))
    xx=np.linspace(0,30,301);base=2.0;scale=.25;line(ax,X(xx),base+scale*eta_m(xx),BLUE,3);line(ax,[1,11],[base,base],GRAY,1)
    for x,e in [(11,5.5),(15,7.5)]:
        line(ax,[X(x),X(x)],[base,base+scale*e],ORANGE,2,ls='--');ax.plot(X(x),base+scale*e,'o',color=ORANGE,ms=7)
        text(ax,X(x)+(-.55 if x==11 else .65),base+scale*e+.12,f'{e:g} m',13,BLUE)
    text(ax,1.2,3.5,'ηM (m)',12,BLUE)
    for x in [0,11,15,30]:text(ax,X(x),1.67,f'{x} m',11,GRAY)
    text(ax,3,.87,'120 × 5.5\n= 660 kN·m',16,BLUE);text(ax,6,.87,'180 × 7.5\n= 1350 kN·m',16,BLUE);text(ax,9.5,.87,'合计\n2010 kN·m',19,TEAL)
    text(ax,4.55,.82,'+',24,ORANGE);text(ax,7.75,.82,'=',24,ORANGE)
    moments=np.array([120,180])*eta_m(np.array([11,15]));RA=120*(1-11/30)+180*.5
    checks=[ck('total moment',moments.sum(),2010,unit='kN·m'),ck('static equilibrium crosscheck',RA*15-120*(15-11),2010,unit='kN·m'),ck('unit force ordinates',eta_m(15)-eta_m(11),2,unit='m')]
    save(fig,'F11',title,'两轴保持实际间距，在同一目标截面的影响线上分别读取纵标，再以轴重乘纵标后相加。120 kN轴贡献660，180 kN轴贡献1350 kN·m。',['线性叠加；两个贡献必须来自同一车辆位置','本图暂不加均布作用，正文加q后总数另算'],checks)

def f12():
    title='平均抗力比平均作用大，为什么还不能只看两个平均数？'
    fig,ax=new(title,'正文教学概率参数，非真实统计：μR = 10000、σR = 1000；μS = 7000、σS = 800 kN·m；相关系数 ρ = 0.20。\n假设 R、S 为联合正态，极限状态 g = R − S；本图说明概率模型，不给出真实桥梁的失效概率。')
    ax.set_visible(False)
    left=fig.add_axes([.085,.23,.37,.52]);right=fig.add_axes([.565,.23,.37,.52]);axes_style(left,'作用效应 S (kN·m)','抗力 R (kN·m)');axes_style(right,'余量 g = R − S (kN·m)','概率密度 (1/(kN·m))')
    xs=np.linspace(3500,11000,250);ys=np.linspace(6000,14000,250);S,R=np.meshgrid(xs,ys);u=(R-10000)/1000;v=(S-7000)/800;den=np.exp(-(u*u-2*.2*u*v+v*v)/(2*(1-.2**2)))
    left.contour(S,R,den,levels=[.02,.1,.3,.65],colors=[LIGHT,BLUE,TEAL,INK],linewidths=[2,1.8,1.5,1.4]);left.fill_between(xs,6000,np.clip(xs,6000,14000),color=RED,alpha=.09);left.plot([6000,11000],[6000,11000],ls='--',color=RED,lw=1.5)
    left.scatter([7000],[10000],color=ORANGE,zorder=5);left.text(7150,10300,'均值点',fontproperties=FONT,color=INK);left.text(9400,7400,'R < S',fontproperties=FONT,color=RED);left.set(xlim=(3500,11000),ylim=(6000,14000));left.set_title('联合密度：两者可能一起变化',fontproperties=FONT,fontsize=15,pad=18)
    mu=3000.;sd=math.sqrt(1000**2+800**2-2*.2*1000*800);beta=mu/sd;pf=.5*math.erfc(beta/math.sqrt(2));g=np.linspace(-3500,7000,1500);pdf=np.exp(-.5*((g-mu)/sd)**2)/(sd*math.sqrt(2*math.pi))
    right.plot(g,pdf,color=BLUE,lw=2.5);right.fill_between(g,0,pdf,where=g<0,color=RED,alpha=.6);right.axvline(0,color=RED,lw=1.3,ls='--');right.axvline(mu,color=GRAY,lw=1,ls=':');right.set_title('转成一个问题：g 会不会小于 0？',fontproperties=FONT,fontsize=15,pad=18)
    right.ticklabel_format(axis='y',style='sci',scilimits=(-3,-3));right.text(-3200,max(pdf)*.74,f'红色面积\nPf = {pf:.4%}',fontproperties=FONT,color=RED,fontsize=13);right.text(4300,max(pdf)*.80,f'μg = 3000\nσg = {sd:.1f}\nβ = {beta:.3f}',fontproperties=FONT,color=INK,fontsize=12)
    fig.text(.52,.135,'先声明分布、相关性和极限状态，概率数值才有明确含义。',ha='center',fontproperties=FONT,color=TEAL,fontsize=14)
    checks=[ck('sigma_g',sd,1148.9125293076058,1e-8,'kN·m'),ck('beta',beta,2.611164839,1e-7),ck('pdf mass on shown range',np.trapezoid(pdf,g),.9997509,5e-5),ck('failure probability',pf,.0045119,1e-6)]
    save(fig,'F12',title,'联合正态教学模型以g=R−S转化为一维余量分布；红色尾部为g<0的概率。联合图的阴影只是失效域，不是按几何面积计算概率。',['所有统计参数为正文教学值，非测量样本','线性极限状态与指定联合正态假设；不可将此Pf迁移到实际桥梁'],checks)

def f14():
    title='一块板能向两边传力，取成梁以后保留了什么？'
    fig,ax=new(title,'左：2.4 m × 2.4 m的教学方板，四边简支，中心小矩形向下受力；蓝箭头只示意传力方向，不是计算力流。\n右：取1 m宽板带作为梁，两端简支。板带所分到的 Pb 要由选定方法确定，不能直接假设等于整块板的荷载。')
    panel(ax,3,'板：两个面内方向都可参与','俯视；四边仅约束竖向位移，转角可自由')
    poly(ax,[[1.1,2.1],[4.9,2.1],[4.9,5.4],[1.1,5.4]],LIGHT)
    for x in np.linspace(1.1,4.9,7):
        support(ax,x,2.1,scale=.45);poly(ax,[[x,5.4],[x-.1,5.6],[x+.1,5.6]],'white',INK,lw=.8)
    for y in np.linspace(2.1,5.4,7):
        poly(ax,[[1.1,y],[.9,y-.1],[.9,y+.1]],'white',INK,lw=.8);poly(ax,[[4.9,y],[5.1,y-.1],[5.1,y+.1]],'white',INK,lw=.8)
    poly(ax,[[2.77,3.5],[3.23,3.5],[3.23,4],[2.77,4]],ORANGE)
    ax.add_patch(Circle((3,3.75),.14,fill=False,ec='white',lw=1.5));line(ax,[2.91,3.09],[3.66,3.84],'white',1.5);line(ax,[2.91,3.09],[3.84,3.66],'white',1.5);text(ax,3,4.35,'向下局部作用',11,ORANGE)
    for xx,yy in [(1.3,3.75),(4.7,3.75),(3,2.35),(3,5.15),(1.45,2.5),(4.55,5.0)]:arrow(ax,3,3.75,xx,yy,color=BLUE,lw=1.8)
    dim(ax,1.1,1.5,4.9,1.5,'2.4 m');text(ax,3,.62,'荷载区的位置、大小和四边条件都重要。',12)
    panel(ax,9,'梁式板带：只保留一个主方向','侧视；原板的另一方向作用需说明如何等效')
    beam(ax,6.9,11.1,3.8);arrow(ax,9,5.4,9,3.95,'Pb',offset=(.3,0),color=ORANGE)
    dim(ax,6.9,2.95,11.1,2.95,'2.4 m');text(ax,9,2.23,'取出的宽度 b = 1 m',13)
    line(ax,[7.05,10.95],[3.55,3.55],BLUE,1,ls='--')
    text(ax,9,1.1,'两端简支不等于四边简支；\n需要比较同一目标量，检验简化。',14,TEAL)
    save(fig,'F14',title,'俯视四边简支板与侧视两端简支板带分别展示保留的运动和支承。两图不宣称自动等价，也没有用未经计算的彩色云图表示应力。',['纯几何及传力方向示意，无板有限元结果','方板和板带为教学几何；Pb分配与等效宽度必须另行确定'],['plate has four explicitly marked simply supported edges','strip has two endpoint supports','no claimed equal numerical response between different boundary models'])

def f15():
    title='只用力的平衡，什么时候能算出每个支点分担？'
    fig,ax=new(title,'左侧教学静定板段：P = 120 kN，a = 0.8 m，b = 1.6 m；两端简支，不保留其他主梁的连续约束。\n右侧保留三支承连续横梁，三个竖向反力不能仅靠合力与合矩两式定解，还需要刚度和变形协调。')
    panel(ax,3,'两支点之间：先把简化图式画清','这是杠杆关系可直接使用的静定板段')
    x0,x1=1,5;xp=x0+(x1-x0)/3;beam(ax,x0,x1,4.6);arrow(ax,xp,6.0,xp,4.75,'120 kN',offset=(.65,0))
    arrow(ax,x0,2.55,x0,4.35,'80 kN',offset=(-.55,0),color=TEAL);arrow(ax,x1,3.4,x1,4.35,'40 kN',offset=(.55,0),color=TEAL)
    dim(ax,x0,2.05,xp,2.05,'a = 0.8 m');dim(ax,xp,2.05,x1,2.05,'b = 1.6 m')
    text(ax,3,1.1,'R左 = Pb/(a+b)\nR右 = Pa/(a+b)',16,BLUE)
    panel(ax,9,'保留连续三支承：还缺什么条件？','不可直接把左图方法搬来算三个未知反力')
    beam(ax,7,11,4.6,ends=False)
    for x in [7,9,11]:support(ax,x,4.6,'roller' if x>7 else 'pin');arrow(ax,x,3.0,x,4.25,color=TEAL);text(ax,x,2.72,f'R{int((x-7)/2)+1}',13,TEAL)
    arrow(ax,8.0,6,8.0,4.75,'120 kN',offset=(.65,0));text(ax,9,1.7,'3 个反力未知数\n2 个平面竖向平衡条件',15)
    text(ax,9,.65,'补上共同变形与刚度，才能继续求解。',12,TEAL)
    checks=[ck('sum reactions',80+40,120,unit='kN'),ck('moment about left',40*2.4,120*.8,unit='kN·m')]
    save(fig,'F15',title,'两支点静定板段用相反力臂计算反力；若保留三支承连续横梁，则需额外的变形协调。图中特别区分简化后的图式和未释放的连续图式。',['左图荷载位于两支点之间；外悬臂另画图式','图为教学静力关系，不规定规范杠杆法的使用位置或系数'],checks)

def f17():
    title='某根梁的活载增量为负，就已经离开支承了吗？'
    fig,ax=new(title,'统一五梁教学例：y = −4.8、−2.4、0、2.4、4.8 m，等刚度刚性横梁；P = 120 kN，e = 3.6 m。\n另设恒载分担每梁 60 kN。反力向上为正；线性增量可以有负值，实际接触需检查包含已有作用的总反力。')
    pos=np.array([-4.8,-2.4,0,2.4,4.8]);G=np.full(5,60.);dR=120/5+120*3.6*pos/(pos@pos);total=G+dR
    for xc,name,arr in [(2,'① 已有恒载',G),(6,'② 新增活载',dR),(10,'③ 合起来',total)]:
        panel(ax,xc,name);xx=xc+.29*pos
        line(ax,[xc-1.45,xc+1.45],[4.9,4.9],GRAY,1,ls='--');line(ax,xx,4.9-arr*.006,BLUE,3)
        text(ax,xc,3.8,'位移趋势（放大）',11,GRAY)
        for i,(x,r) in enumerate(zip(xx,arr)):
            color=TEAL if r>=0 else RED
            line(ax,[x,x],[1.3,1.3+r*.014],color,15)
            text(ax,x,1.3+r*.014+(.25 if r>=0 else -.25),f'{r:.0f}',12,color)
            text(ax,x,.42,str(i+1),11,GRAY)
        line(ax,[xc-1.55,xc+1.55],[1.3,1.3],GRAY,1)
        text(ax,xc,5.55,'300 kN' if xc==2 else ('120 kN' if xc==6 else '420 kN'),13,ORANGE)
    text(ax,4,4.6,'+',26,ORANGE);text(ax,8,4.6,'=',26,ORANGE)
    text(ax,6,-.12,'梁 1：60 + (−12) = 48 kN，总量仍向上；本例不能据负增量判定脱空。',14,TEAL)
    checks=[ck('live sum',dR.sum(),120,unit='kN'),ck('live moment',dR@pos,120*3.6,unit='kN·m'),ck('total reaction',total.sum(),420,unit='kN'),ck('left total',total[0],48,unit='kN')]
    save(fig,'F17',title,'已有恒载、新增活载与总反力分别列示。梁1的活载增量为−12 kN，但总反力为+48 kN，不能把负增量直接解释为已脱空。',['此Ri为横向分配模型的反力；真实支座接触须定义对应对象并求总状态','若总接触力不满足单向接触，需重建模型，不可直接将负值截零','不在图中声称该简化模型已验证真实支座安全'],checks)

def f18():
    title='把两跨接成一根梁，弯矩和下沉会怎样改变？'
    fig,ax=new(title,'教学解析比较：每跨 L = 12 m，两跨均布 q = 10 kN/m，EI = 600000 kN·m²；均为小挠度线弹性梁。\n正弯矩画在基线下，负弯矩画在上；位移向下，两图变形使用同一显示比例放大。连续梁中间支点竖向位移为零、梁体转角连续。')
    L,q,EI=12.,10.,600000.;x=np.linspace(0,L,501)
    Ms=q*x*(L-x)/2;ws=q*x*(L**3-2*L*x*x+x**3)/(24*EI)
    Mc=3*q*L*x/8-q*x*x/2;wc=q*(L**3*x-3*L*x**3+2*x**4)/(48*EI)
    t=(1+math.sqrt(33))/16;wm=q*L**4*(t-3*t**3+2*t**4)/(48*EI)
    for xc,name,M,w in [(3,'两跨独立简支梁',Ms,ws),(9,'两跨连续梁',Mc,wc)]:
        panel(ax,xc,name);X=lambda s:xc-2.35+s/(2*L)*4.7
        if xc==3:
            beam(ax,X(0),X(L)-.19,5.05,ends=False);beam(ax,X(L)+.19,X(2*L),5.05,ends=False);support(ax,X(0),5.05);support(ax,X(L)-.19,5.05,'roller',scale=.6);support(ax,X(L)+.19,5.05,scale=.6);support(ax,X(2*L),5.05,'roller')
        else:
            beam(ax,X(0),X(2*L),5.05);support(ax,X(L),5.05,'roller')
        for xx in np.linspace(0,2*L,12):arrow(ax,X(xx),5.94,X(xx),5.2,color=ORANGE,lw=1.2)
        text(ax,xc,6.12,'两跨都加载 q',11,ORANGE)
        for off,rev in [(0,False),(L,True)]:
            xx=X(x+off);mm=M[::-1] if rev else M;ww=w[::-1] if rev else w
            line(ax,xx,3.45-mm*.0045,BLUE,2.5);ax.fill_between(xx,3.45,3.45-mm*.0045,color=BLUE,alpha=.10)
            line(ax,xx,1.65-ww*110,TEAL,2.5)
        line(ax,[X(0),X(2*L)],[3.45,3.45],GRAY,1);line(ax,[X(0),X(2*L)],[1.65,1.65],GRAY,1,ls='--')
        text(ax,xc-2.45,3.65,'M',12,GRAY,ha='right');text(ax,xc-2.45,1.65,'w',12,GRAY,ha='right')
        if xc==3:text(ax,xc,2.3,'每跨 Mmax = +180 kN·m',13,BLUE);text(ax,xc,.52,'每跨最大下挠 4.50 mm',14,TEAL)
        else:
            text(ax,xc+1.08,4.30,'支点 −180 kN·m',11,RED)
            text(ax,xc,2.3,'跨内最大正弯矩 +101.25 kN·m',12,BLUE);text(ax,xc,.52,f'每跨最大下挠 {wm*1000:.2f} mm',14,TEAL)
    checks=[ck('simple midspan M',q*L*L/8,180,unit='kN·m'),ck('continuous interior M',Mc[-1],-180,unit='kN·m'),ck('continuous positive M maximum',9*q*L*L/128,101.25,unit='kN·m'),ck('simple max deflection',5*q*L**4/(384*EI)*1000,4.5,unit='mm'),ck('continuous endpoint deflection',wc[-1],0,1e-12,'m'),ck('continuous middle slope',q*(L**3-9*L*L**2+8*L**3)/(48*EI),0,1e-12),ck('reaction sum',2*(3*q*L/8)+5*q*L/4,2*q*L,unit='kN')]
    save(fig,'F18',title,'统一荷载和刚度下，连续性改变弯矩和变形：中支点产生负弯矩，跨内最大正弯矩减小。实际解析挠度曲线使用相同放大比例。',['两跨等跨、EI恒定、两跨全布均载；不是任意车辆位置的包络','中支点不沉降；不计收缩徐变、温度或预应力','解析式第一跨w=q(L³x−3Lx³+2x⁴)/(48EI)，第二跨镜像'],checks)

def f19():
    title='桥还没碰到下一个支点，悬空越长会怎样？'
    fig,ax=new(title,'教学阶段：已有两个支点相距12 m，梁尾恰在后支点，前端悬出 a；自重 q = 10 kN/m，前方新支点尚未接触。\n只比较这三个静定阶段；未设置导梁。判断全桥控制状态仍须比较各截面、反力、导梁及后方连续结构。')
    checks=[];X=lambda x:1.3+(x+12)*.32
    for a,y in [(3,5.55),(6,3.5),(9,1.45)]:
        RA=10*(144-a*a)/24;RB=10*(12+a)-RA;Mroot=-10*a*a/2;Mpos=RA*RA/20;maxabs=max(abs(Mroot),Mpos)
        beam(ax,X(-12),X(a),y,ends=False);support(ax,X(-12),y);support(ax,X(0),y,'roller')
        line(ax,[X(12),X(12)],[y-.55,y-.07],GRAY,1,ls='--');poly(ax,[[X(12),y],[X(12)-.2,y-.35],[X(12)+.2,y-.35]],'white',GRAY)
        for x in np.linspace(-11.5,a-.3,11):arrow(ax,X(x),y+.66,X(x),y+.1,color=ORANGE,lw=1.4)
        ax.plot(X(0),y,'o',ms=8,color=RED)
        dim(ax,X(0),y-.95,X(a),y-.95,f'a = {a} m',offset=(0,-.18))
        text(ax,X(-12),y-.81,f'RA {RA:.2f}',10.5,TEAL);text(ax,X(0)-.1,y-.81,f'RB {RB:.2f} kN',10.5,TEAL)
        text(ax,10.35,y+.55,f'根部 M = {Mroot:.0f} kN·m',13,RED)
        text(ax,10.35,y-.64,f'全梁 |M|max = {maxabs:.1f}\n'+('kN·m，正弯矩区' if Mpos>abs(Mroot) else 'kN·m，悬臂根部'),11.5)
        checks.extend([ck(f'a={a}: forces',RA+RB,10*(12+a),unit='kN'),ck(f'a={a}: moment about rear',RB*12,10*(12+a)*(12+a)/2,unit='kN·m'),ck(f'a={a}: root M',RA*12-10*12**2/2,Mroot,unit='kN·m')])
    text(ax,2.9,6.7,'已支承部分：12 m',13);text(ax,7.5,6.7,'向前推进 →',13,ORANGE);text(ax,X(12),.02,'新支点，尚未接触',10.5,GRAY)
    save(fig,'F19',title,'悬出长度3、6、9 m时，根部负弯矩分别为−45、−180、−405 kN·m。图中同时列出全梁最大绝对弯矩，避免将短悬臂阶段根部错误当作全梁控制点。',['每个阶段梁尾恰在后支点、支点距12 m；这是教学静定截取，不冒充真实完整顶推系统','均布自重；未接触前方支点；无导梁、摩擦、支点高差或非线性','显示的是阶段内力，非设计安全系数'],checks)

REG={f'F{i:02d}':globals()[f'f{i:02d}'] for i in range(1,20)}
def contact(ids,name):
    thumbs=[]
    for id in ids:
        im=Image.open(OUT/f'{id}.png').convert('RGB');im.thumbnail((800,480));t=Image.new('RGB',(820,520),'#e9eff2');t.paste(im,((820-im.width)//2,25));ImageDraw.Draw(t).text((12,5),id,fill='black');thumbs.append(t)
    cols=min(3,len(thumbs));rows=math.ceil(len(thumbs)/cols);sheet=Image.new('RGB',(cols*820,rows*520),'white')
    for i,im in enumerate(thumbs):sheet.paste(im,((i%cols)*820,(i//cols)*520))
    sheet.save(OUT/name)
if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--ids',default=','.join(REG));args=parser.parse_args();ids=args.ids.split(',')
    for id in ids:REG[id]()
    contact(ids,'group-a-contact.png')
    print('Generated',','.join(ids))
