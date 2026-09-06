"""Build and execute three small teaching notebooks. Writes only this directory."""
from pathlib import Path
import json, sys, time, platform, textwrap, base64
from datetime import datetime, timezone
import nbformat
from nbclient import NotebookClient
from render_html import render_html

HERE = Path(__file__).resolve().parent
HERE.mkdir(parents=True, exist_ok=True)

def md(text): return nbformat.v4.new_markdown_cell(textwrap.dedent(text).strip())
def code(text, label=None):
    c=nbformat.v4.new_code_cell(textwrap.dedent(text).strip())
    if label:
        c["id"]=label
        c["metadata"]["tags"]=[label]
        c["source"]="#| label: "+label+"\n"+c["source"]
    return c
setup=code("""
import sys
import numpy as np
import matplotlib.pyplot as plt
plt.rcParams.update({"font.sans-serif":["Microsoft YaHei","SimHei","DejaVu Sans"],
                     "axes.unicode_minus":False, "figure.dpi":120})
print("Python", sys.version.split()[0], "；NumPy", np.__version__)
""")
intro="本页HTML展示已运行的Python结果，不会在浏览器里重新执行Python。下载.ipynb，在Jupyter打开，改参数后选择“重新启动内核并运行全部”。依赖：Python 3、numpy、matplotlib、ipykernel。"
A=[
md("# 车靠边走，五根梁怎样重新分担？\n\n先猜：120 kN的车停在桥中线右侧2.4 m时，最右梁会分到一半车重吗？\n\n"+intro),
md("## 先把比较的对象说清楚\n五根梁竖向刚度相同，横向连接理想化为刚杆。这里只算车辆的增量，不计恒载。R表示横向分到各梁的等效力，不是实际支座的总反力。\n\n对应核心单元C04U05、C04U10和C02U01—03。原核心视频是四梁归一模型，本页是五梁、120 kN的独立算例；先对齐模型再比较数字。"),
setup,
md("## 改一个参数\n先只改车位e。y是各梁离桥中线的距离；长度用m，力用kN。"),
code("""
P=120.0
y=np.array([-4.8,-2.4,0.0,2.4,4.8])
e=2.4
assert P>0 and np.isfinite(e)
print("各梁位置/m：", y, "；车位/m：",e)
""","parameters-transverse"),
md(r"""## 平均分担，再平衡偏心力矩
刚杆的竖向位移沿宽度排成直线；等刚度使力也线性变化。对称位置满足$\sum y_i=0$，所以
$$R_i=\frac{P}{5}+\frac{P e y_i}{\sum_j y_j^2}.$$
第一项合计P，第二项合计零；第二项提供Pe的力矩。"""),
code("""
def distribute(e,P=120.0):
    return P/len(y)+P*e*y/np.dot(y,y)
R=distribute(e,P)
print("R / kN =",np.round(R,6))
print("最右梁分担比例 =",round(R[-1]/P,6))
print("合力 / kN =",R.sum(),"；力矩 / kN·m =",R@y)
assert np.isclose(R.sum(),P) and np.isclose(R@y,P*e)
"""),
md("## 把两次摆法放在一起\n蓝色是中心车位，橙色是当前车位。负柱子是车辆作用在这个双向传力模型中的负分量。"),
code("""
fig,ax=plt.subplots(figsize=(8,3.5))
i=np.arange(5)
ax.bar(i-.18,distribute(0,P),.36,label="车在中线")
ax.bar(i+.18,R,.36,label=f"车位 e={e:g} m",color="#be7048")
ax.axhline(0,color="#455a64",lw=.8)
ax.set(xticks=i,xticklabels=[f"{j}号梁" for j in range(1,6)],ylabel="车辆分担力 / kN")
ax.legend();ax.grid(axis="y",alpha=.2);fig.tight_layout();plt.show()
""","fig-transverse"),
md("## 算出负数，要直接删掉吗？\n把e改为3.6 m，先用原模型算。再取**另一个模型**：刚性横梁放在五个等刚度、只能承压的弹簧上。它的开口接触状态需要重新求解。下面的a、b是取共同相对刚度为1后的归一量，不是实桥毫米位移。"),
code("""
def compression_only(e,P=120.0):
    for mask in range(1,1<<len(y)):
        active=np.array([bool(mask&(1<<i)) for i in range(len(y))])
        if active.sum()<2: continue
        ya=y[active]
        G=np.array([[len(ya),ya.sum()],[ya.sum(),ya@ya]],float)
        a,b=np.linalg.solve(G,[P,P*e])
        u=a+b*y
        if np.all(u[active]>=-1e-9) and np.all(u[~active]<=1e-9):
            return np.where(active,np.maximum(u,0),0),u,active
    raise ValueError("当前荷载没有本页可稳定求解的接触组")
signed=distribute(3.6)
clipped=np.maximum(signed,0)
contact,u,active=compression_only(3.6)
for name,r in [("原双向模型",signed),("直接删负数",clipped),("另一个单向模型",contact)]:
    print(name,":",np.round(r,4),"；合力",round(r.sum(),4),"；力矩",round(r@y,4))
assert np.allclose(signed,[-12,6,24,42,60])
assert np.allclose(contact,[0,0,10,40,70])
assert np.isclose(contact.sum(),120) and np.isclose(contact@y,432)
assert np.all(u[~active]<=1e-9)
"""),
md(r"""## 与偏心受压，哪一步相像？
在线弹性、未开裂、平截面假设内，压应力可写为$\sigma=N/A+My/I$。矩形截面沿偏心方向高度h，有$\sigma_{\min}=N/A(1-6e/h)$。平均部分加线性增减，是共同的思路。
但一个结果是连续截面的应力，另一个是离散梁分担力；$h/6$不是钢筋混凝土大、小偏心受压的分界。"""),
code("""
mean_stress=10.0 # MPa
eccentric_ratio=1/6
sigma_min=mean_stress*(1-6*eccentric_ratio)
print("e/h=1/6时，未开裂矩形截面的最小压应力 / MPa =",sigma_min)
assert np.isclose(sigma_min,0)
for pos in [-3.6,0,2.4,3.6]:
    r=distribute(pos)
    assert np.isclose(r.sum(),120) and np.isclose(r@y,120*pos)
print("自检通过：合力、合矩、两个已知工况和截面核心基准。")
""","checks-transverse"),
md("## 合上结果，自己解释\n1. 车重翻倍，R和R/P分别怎样变？\n2. 只看总力对了，能否确认分配正确？\n3. 真实支座出现脱空，需要把哪些恒载与活载、连接条件一起检查？\n\n**本次默认结果：**最右梁48 kN，占40%。3.6 m时原模型左梁−12 kN，不能据此断言计入恒载后的实桥支座已经脱空。"),
]
B=[
md("# 跨度都变成两倍，为什么挠度有两种答案？\n\n先选：4倍还是16倍？先别算，问清楚截面和荷载是否一起变。\n\n"+intro),
md("## 两组试验，只比较同一输出\nA组：全部长度同形放大、材料不变，荷载只取自重。B组：只增跨度，截面、材料及均布线荷载q保持不变。两组都用简支梁的小变形线弹性弯曲模型。对应C01U04—07、C04U09。"),
setup,
md("## 给基准梁定尺寸\nb和h是矩形截面宽、高；q为沿跨度每米的力。此处只做教学比较，不是成桥设计参数建议。"),
code("""
L0,b0,h0=20.0,.6,1.2 # m
E=34e9 # Pa
rho,g=2500.0,9.81 # kg/m³, m/s²
lam=2.0
assert min(L0,b0,h0,E,rho,g,lam)>0
A0=b0*h0
I0=b0*h0**3/12
q0=rho*g*A0 # N/m；B组固定此基准线荷载
""","parameters-scaling"),
md(r"""## 先看量之间怎样相连
$$M_{\max}=qL^2/8,\quad \sigma_{\max}=M_{\max}/W,\quad w_{\max}=5qL^4/(384EI),\quad W=bh^2/6.$$
A组有$q\propto\lambda^2,\ I\propto\lambda^4$；B组的q、I不变。两组的“跨度加倍”不是同一个实验。"""),
code("""
def beam(L,b,h,q):
    A=b*h; I=b*h**3/12; W=b*h*h/6
    moment=q*L*L/8
    w=5*q*L**4/(384*E*I)
    return {"长度":L,"面积":A,"体积":A*L,"惯性矩":I,
            "总重或总载":q*L,"应力":moment/W,"挠度":w,"挠跨比":w/L}
base=beam(L0,b0,h0,q0)
similar=beam(lam*L0,lam*b0,lam*h0,q0*lam**2)
span_only=beam(lam*L0,b0,h0,q0)
print("输出         全尺寸+自重 / 基准   只加跨度+固定q / 基准")
for key in base:
    print(f"{key:8s} {similar[key]/base[key]:12.4f} {span_only[key]/base[key]:16.4f}")
"""),
md("## 让跨度从1倍走到3倍\n纵轴是挠度相对基准的倍数。曲线不是荷载—位移曲线，不能用它判断材料已进入非线性。"),
code("""
factors=np.linspace(1,3,61)
a=[beam(t*L0,t*b0,t*h0,q0*t*t)["挠度"]/base["挠度"] for t in factors]
b=[beam(t*L0,b0,h0,q0)["挠度"]/base["挠度"] for t in factors]
fig,ax=plt.subplots(figsize=(8,3.5))
ax.plot(factors,a,label="全尺寸放大；自重",lw=2)
ax.plot(factors,b,label="只加跨度；固定线荷载",lw=2,color="#be7048")
ax.set(xlabel="跨度与基准之比 λ",ylabel="挠度 / 基准挠度")
ax.legend();ax.grid(alpha=.25);fig.tight_layout();plt.show()
""","fig-scaling"),
md("## 改参数之后，保留两道已知题\n下面独立检验λ=2，不随你上方选择的λ改变。"),
code("""
sa=beam(2*L0,2*b0,2*h0,4*q0)
sb=beam(2*L0,b0,h0,q0)
expected={"长度":2,"面积":4,"体积":8,"惯性矩":16,"总重或总载":8,"应力":2,"挠度":4,"挠跨比":2}
for key,value in expected.items(): assert np.isclose(sa[key]/base[key],value)
assert np.isclose(sb["挠度"]/base["挠度"],16)
assert np.isclose(sb["应力"]/base["应力"],4)
print("自检通过：相似自重挠度4倍；只加跨度且q不变挠度16倍。")
print("当前A组 w/L =",f"{similar['挠跨比']:.6f}",
      "；当前B组 w/L =",f"{span_only['挠跨比']:.6f}")
""","checks-scaling"),
md("## 再解释一次\nA组相似放大两倍，自重8倍、惯性矩16倍、应力2倍、挠度4倍；B组只加跨度，在q、I不变时挠度16倍。\n\n1. 若保持总集中力不变，能不能继续用自重那列？\n2. 如果w/L越来越大，是否还应无条件信任小变形计算？\n3. 这些尺度幂律与混凝土开裂导致的荷载响应非线性有什么不同？"),
]
C=[
md("# 网格越来越细，能把错误的支座修好吗？\n\n先猜：把简支梁误画成两端固支，再加密网格，答案会回到简支梁吗？\n\n"+intro),
md("## 今天只做一根均布荷载梁\nEuler–Bernoulli梁单元，每个节点两个自由度：向下位移w和转角dw/dx。线弹性、小变形、等截面；不含剪切变形和局部应力。对应C11U03、C11U05、C11U07的进阶计算；原C11U03/07核心演示是函数插值，这里才组装梁有限元。"),
setup,
md("## 固定材料和荷载，再选择网格"),
code("""
L=20.0 # m
E=34e9 # Pa
I=.1 # m⁴
q=20e3 # N/m，向下为正
n=4 # 单元数
assert min(L,E,I,q)>0 and isinstance(n,int) and n>=2
""","parameters-fem"),
md(r"""## 先准备独立的答案
简支梁：$w(x)=qx(L^3-2Lx^2+x^3)/(24EI)$，跨中$5qL^4/(384EI)$。
两端固支梁：$w(x)=qx^2(L-x)^2/(24EI)$，跨中$qL^4/(384EI)$。
$$K_e=\frac{EI}{\ell^3}\begin{bmatrix}12&6\ell&-12&6\ell\\6\ell&4\ell^2&-6\ell&2\ell^2\\-12&-6\ell&12&-6\ell\\6\ell&2\ell^2&-6\ell&4\ell^2\end{bmatrix},\quad
f_e=q[\ell/2,\ell^2/12,\ell/2,-\ell^2/12]^T.$$
f中的第1、3项是力N，第2、4项是广义节点力矩N·m，不能把四项都当力相加。"""),
code("""
def solve_beam(n,support="simple"):
    length=L/n
    ke=E*I/length**3*np.array([[12,6*length,-12,6*length],
       [6*length,4*length**2,-6*length,2*length**2],
       [-12,-6*length,12,-6*length],
       [6*length,2*length**2,-6*length,4*length**2]],float)
    fe=q*np.array([length/2,length**2/12,length/2,-length**2/12])
    K=np.zeros((2*(n+1),2*(n+1)));F=np.zeros(2*(n+1))
    for j in range(n):
        dofs=np.arange(2*j,2*j+4)
        K[np.ix_(dofs,dofs)]+=ke;F[dofs]+=fe
    fixed=[0,2*n] if support=="simple" else [0,1,2*n,2*n+1]
    free=np.setdiff1d(np.arange(len(F)),fixed)
    u=np.zeros_like(F)
    u[free]=np.linalg.solve(K[np.ix_(free,free)],F[free])
    return u,K@u-F

def displacement(x,u,n):
    ell=L/n
    j=min(n-1,int(x/ell));s=(x-j*ell)/ell
    H=np.array([1-3*s*s+2*s**3,ell*(s-2*s*s+s**3),
                3*s*s-2*s**3,ell*(-s*s+s**3)])
    return H@u[2*j:2*j+4]

def exact(x,support="simple"):
    return q*x*(L**3-2*L*x*x+x**3)/(24*E*I) if support=="simple" else q*x*x*(L-x)**2/(24*E*I)

u,reactions=solve_beam(n)
xnodes=np.linspace(0,L,n+1)
print("节点位移/mm：",np.round(u[::2]*1000,6))
print("两端竖向反力/N（向下为正）：",np.round(reactions[[0,2*n]],4))
print("两端广义力矩/N·m：",np.round(reactions[[1,2*n+1]],4))
assert np.isclose(reactions[::2].sum()+q*L,0,atol=1e-5)
assert np.isclose(reactions[::2]@xnodes+reactions[1::2].sum()+q*L*L/2,0,atol=1e-3)
"""),
md("## 节点算得准，单元中间也一样准吗？\n均布荷载下，这个等截面梁的节点位移可能非常精确；但单元内用三次函数插值，解析曲线是四次函数。看每个单元中点的误差，才能看到这次网格加密改变了什么。"),
code("""
rows=[]
for cells in [2,4,8,16]:
    displ,_=solve_beam(cells)
    mids=(np.arange(cells)+.5)*L/cells
    midpoint_error=max(abs(displacement(x,displ,cells)-exact(x)) for x in mids)
    node_error=max(abs(displ[2*j]-exact(j*L/cells)) for j in range(cells+1))
    rows.append((cells,node_error*1000,midpoint_error*1000))
print("单元数 | 最大节点误差/mm | 最大单元中点误差/mm")
for row in rows:print(f"{row[0]:5d} | {row[1]:16.9g} | {row[2]:20.9g}")
assert all(rows[i+1][2]<rows[i][2] for i in range(len(rows)-1))
"""),
md("## 让边界也接受检查\n两种模型分别向自己的解析解收敛。网格加密不能把“固支”改成“简支”。"),
code("""
xs=np.linspace(0,L,161)
fig,axes=plt.subplots(1,2,figsize=(9,3.5))
axes[0].plot(xs,[1000*exact(x) for x in xs],label="简支解析",lw=2)
for cells in [2,4]:
    uu,_=solve_beam(cells)
    axes[0].plot(xs,[1000*displacement(x,uu,cells) for x in xs],label=f"{cells}单元",ls="--")
axes[0].set(xlabel="沿跨度x / m",ylabel="向下位移 / mm");axes[0].legend()
for support,label in [("simple","简支"),("fixed","固支")]:
    uu,_=solve_beam(8,support)
    axes[1].plot(xs,[1000*displacement(x,uu,8) for x in xs],label=label)
axes[1].set(xlabel="沿跨度x / m",ylabel="向下位移 / mm");axes[1].legend()
for ax in axes:
    ax.grid(alpha=.2)
    ax.invert_yaxis()  # 正位移向下，与本例挠曲方向保持一致。
fig.tight_layout();plt.show()
""","fig-fem"),
code("""
simple,_=solve_beam(8,"simple")
fixed,rf=solve_beam(8,"fixed")
ws=displacement(L/2,simple,8)
wf=displacement(L/2,fixed,8)
assert np.isclose(ws,5*q*L**4/(384*E*I),rtol=1e-8)
assert np.isclose(wf,q*L**4/(384*E*I),rtol=1e-8)
assert np.isclose(ws/wf,5)
assert np.isclose(abs(rf[1]),q*L*L/12,rtol=1e-8)
assert np.isclose(abs(rf[-1]),q*L*L/12,rtol=1e-8)
print(f"简支跨中 {ws*1000:.6f} mm；固支跨中 {wf*1000:.6f} mm；比值 {ws/wf:.3f}")
print("自检通过：力、力矩、位移解析解及固端力矩。")
""","checks-fem"),
md("## 这次检验说明了什么？\n默认参数下，简支跨中12.254902 mm、固支2.450980 mm，相差5倍。改变参数后以本次输出为准。\n\n1. 只有节点误差很小，能否推出局部应力已可靠？\n2. 若漏了一半荷载，求解器的内部平衡是否还能成立？\n3. 把这根梁用于真实桥面轮载前，还缺哪些横向、连接和荷载信息？\n\n本例只验证指定线性梁实现及边界；不能外推为整桥、非线性或规范设计已验收。"),
]
definitions=[
("A-transverse","车靠边走，五根梁怎样重新分担？",A,["C04U05","C04U10","C02U01","C02U02","C02U03"],"fig-transverse","五梁120 kN，与原核心四梁归一示例参数不同。"),
("B-scaling","跨度都变成两倍，为什么挠度有两种答案？",B,["C01U04","C01U05","C01U06","C01U07","C04U09"],"fig-scaling","全尺寸自重与只增跨度、q不变是两组不同控制条件。"),
("C-beam-fem","网格越来越细，能把错误的支座修好吗？",C,["C11U03","C11U05","C11U07"],"fig-fem","本页组装梁FEM；原核心网格单元为函数插值演示。")
]
manifest={"schema_version":1,"created":datetime.now(timezone.utc).isoformat(),"browser_python_execution":False,"notebooks":[]}
for ident,title,cells,units,label,note in definitions:
    nb=nbformat.v4.new_notebook(cells=cells,metadata={"kernelspec":{"name":"python3","display_name":"Python 3 (ipykernel)","language":"python"},"language_info":{"name":"python","version":platform.python_version()}})
    start=time.perf_counter()
    NotebookClient(nb,timeout=90,kernel_name="python3",resources={"metadata":{"path":str(HERE)}}).execute()
    nbformat.validate(nb)
    errors=[o for c in nb.cells if c.cell_type=="code" for o in c.get("outputs",[]) if o.output_type=="error"]
    assert not errors
    path=HERE/(ident+".ipynb");nbformat.write(nb,path)
    py=["# -*- coding: utf-8 -*-","# Exported from the executed teaching notebook; figures appear through matplotlib."]
    for c in nb.cells:
        if c.cell_type=="code":py.extend(["\n# %%",c.source])
        else:py.extend(["\n# %% [markdown]"]+["# "+line for line in c.source.splitlines()])
    (HERE/(ident+".py")).write_text("\n".join(py)+"\n",encoding="utf-8")
    html,_=render_html(nb,title,ident)
    (HERE/(ident+".html")).write_text(html,encoding="utf-8")
    outputs=[o.text for c in nb.cells if c.cell_type=="code" for o in c.get("outputs",[]) if o.output_type=="stream"]
    manifest["notebooks"].append({"id":ident,"title":title,"unit_ids":units,"ipynb":"notebooks/"+ident+".ipynb","python":"notebooks/"+ident+".py","html":"notebooks/"+ident+".html","embed_cell":label,"mapping_note":note,"executed":True,"code_cells":sum(c.cell_type=="code" for c in nb.cells),"error_count":len(errors),"seconds":round(time.perf_counter()-start,2),"outputs":outputs})
    print(ident,"executed",flush=True)
(HERE/"manifest.json").write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
print(json.dumps({"status":"PASS","notebooks":len(manifest["notebooks"]),"python":sys.executable},ensure_ascii=False))


# A local-script payload keeps downloads working under file://, where Edge ignores
# download attributes on ordinary local-file hyperlinks. Bytes are exact copies.
payload={}
for ident,*_ in definitions:
    for ext in [".ipynb",".py"]:
        p=HERE/(ident+ext)
        payload[p.name]=base64.b64encode(p.read_bytes()).decode("ascii")
js="window.NotebookDownloadFiles="+json.dumps(payload,separators=(",",":"))+";\n"
js += r'''(()=>{"use strict";
document.addEventListener("click",event=>{
 const target=event.target.closest("a[data-notebook-download]");if(!target)return;
 const filename=target.dataset.notebookDownload,encoded=window.NotebookDownloadFiles[filename];if(!encoded)return;
 event.preventDefault();const binary=atob(encoded),bytes=Uint8Array.from(binary,c=>c.charCodeAt(0));
 const url=URL.createObjectURL(new Blob([bytes],{type:filename.endsWith(".ipynb")?"application/x-ipynb+json":"text/x-python;charset=utf-8"}));
 const a=document.createElement("a");a.href=url;a.download=filename;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
});})();
'''
(HERE/"downloads.js").write_text(js,encoding="utf-8")
