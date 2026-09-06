from pathlib import Path
import json,copy
HERE=Path(__file__).resolve().parent
base=json.loads((HERE/'dialogue.json').read_text(encoding='utf-8'))
(HERE/'specs').mkdir(exist_ok=True)
(HERE/'specs/D01.json').write_text(json.dumps(base,ensure_ascii=False,indent=2),encoding='utf-8')
items={
'D02':('把搁板放大一倍，为什么不是重一倍？',[
('zhou','small','一块搁板不够大，我照着原样放大一倍。料多用一倍，总该够了吧？'),
('ning','scale','你说的放大，是只加长，还是长、宽、厚全都变成两倍？先拿两个盒子比一下。'),
('zhou','scale','全都两倍嘛，模样还一样。等等，这里面，能塞进去八个小盒子？'),
('ning','volume','对。同样材料，体积变成八倍，自重也变成八倍。这只是重量，还不是它弯得怎样。'),
('zhou','stress','那它也变厚、变宽了，扛弯的本事肯定跟着涨。是不是正好抵消？'),
('ning','stress','在这根只受自重的简支梁里，并没有抵消。按相同比例放大后，弯曲应力变成两倍，下沉量变成四倍。前提是材料相同，而且仍能用线弹性小变形来算。'),
('zhou','span','我家的搁板一般不变厚，只是两个支架离远了。那还能套刚才的四倍吗？'),
('ning','span','不能。若截面和每米荷载不变，只把跨度加倍，下沉量会变成十六倍。你换了放大的方式，比较的就已经是另一个问题。'),
('zhou','summary','那问大桥有没有尺度问题，得先问到底什么变大、什么没变，不能只盯着长度。'),
('ning','summary','是。先说清缩放条件，再看长度、面积、体积和响应各按什么比例变化。这种比较方法，叫尺度分析。')]),
'D03':('本来怕被拉开，为什么还要先拉钢索？',[
('zhou','plain','混凝土怕拉开，我听明白了。可你又说，先使劲拉里面的钢索。这不是跟自己对着干吗？'),
('ning','tendon','先看谁在被拉。钢索拉长后，端头通过锚具把这股力传给梁，梁被往里压。钢索受拉，和混凝土受压，可以同时发生。'),
('zhou','tendon','像把一排书两头夹紧，再托起来？钢索在使劲，书反而挤在一起？'),
('ning','load','可以借这个感觉，但真实梁还会弯。车压上来，下边有被拉开的趋势；提前形成的压力，可以抵消其中一部分。这种提前建立的受力状态，叫预应力。'),
('zhou','service','那我把钢索拉得越紧，不就越保险？最好哪儿都不出现拉力。'),
('ning','construction','先别只看车上桥以后。车还没来，梁也已经受到了这股力。索放得偏、拉得太大，另一边也可能先出现拉应力。'),
('zhou','construction','哦，使用时看着挺好，不代表施工时就没问题。那我得把两个时候都看一遍。'),
('ning','summary','对。本例只对比两个明示的线弹性工况。设计还要看损失、裂缝、承载力和构造。普通钢筋主要在开裂后的受拉区承担拉力；预应力还主动改变了加载前的状态，不能当成只是多放几根钢筋。')]),
'D04':('车越多，桥的每一处都更不利吗？',[
('zhou','empty','车越多，桥越累。要找最危险的时候，那就把能放车的地方全放满，还用算？'),
('ning','target','先指一个要看的地方。我们只看这根简支梁，距离左端四米的截面剪力，并约定图上的正方向。你把一个力从左边慢慢移过去。'),
('zhou','move','刚过那条线，数就跳到另一边了？同一个东西往下压，怎么这边的影响还会换号？'),
('ning','signs','因为我们盯着一个截面，并把梁在这里分开来画受力图。荷载在截面左边还是右边，进入哪一块的平衡式不同。把每个车位的影响连起来，就得到这张影响线。'),
('zhou','all','所以如果我只想让这个正方向的剪力尽量大，把左边也塞满车，反而可能抵消一些？'),
('ning','positive','对，在这里的独立可布均布荷载模型中，正号区加载，能把这个响应推大；负号区加载，会往另一个方向推。找最小值就反过来。'),
('zhou','axles','可真车的轮子连在一起，总不能想把哪个轮子放哪儿，就放哪儿吧？'),
('ning','summary','这句很关键。影响线告诉你各处怎样影响指定响应；真实车辆还得整体移动，遵守轴距、车道和相应加载规则。找最不利，要先说清看什么，再说允许怎样摆。')]),
'D05':('网格都这么细了，怎么还可能算错？',[
('zhou','coarse','以前你嫌模型太粗。现在我把网格切得密密麻麻，结果都不怎么变了，这回总该信电脑了吧？'),
('ning','two','我们给它同一根梁、同一份荷载。左边允许梁端转动，右边把两头的转角也锁住。先猜，哪根更容易下沉？'),
('zhou','two','当然是左边。像搁板搭在支架上，和两头死死夹住，能一样吗？'),
('ning','converge','看，左边算到大约十一点二七毫米，右边只有二点一三毫米。网格越来越细，两边的结果都稳定下来了。'),
('zhou','wrong','那右边是很稳定地，算了一个我根本没要它算的东西？精细地答错了题？'),
('ning','wrong','正是。网格收敛只说明这个模型的数值近似趋于稳定，不能替你证明支承、荷载和材料选对了。'),
('zhou','ai','那让人工智能写脚本，也一样。代码能跑、图也漂亮，只能说明它跑完了。还得问，它有没有把我的意思理解错。'),
('ning','summary','所以先用能手算的小例子核对，再检查力和位移的条件，然后逐步加复杂性。计算越方便，越要讲清楚模型究竟代表什么。')])}
for ident,(title,turns) in items.items():
    spec=copy.deepcopy(base);spec.update(id=ident,title=title,turns=[{'speaker':a,'scene':b,'text':c} for a,b,c in turns])
    spec['model']={
      'D02':{'description':'同材料线弹性简支梁，所有尺寸同比放大且仅自重；另例固定截面和线荷载，仅改变跨度。','scale':2,'checks':'checks-a.json'},
      'D03':{'description':'未开裂弹性截面应力，压为正；预压力偏在下方；施工与使用工况分别计算。','b_m':.3,'h_m':.6,'P_kN':450,'e_m':.15,'service_M_kNm':108,'checks':'checks-b.json'},
      'D04':{'description':'简支梁剪力影响线；左段右切面向下为正。独立可布均布荷载与整体移动的车辆分别讨论。','L_m':10,'a_m':4,'q_kN_per_m':10,'checks':'checks-a.json'},
      'D05':{'description':'Euler–Bernoulli梁，比较简支与两端固支；观察同一个x位置，有限元细化1至32单元。','L_m':20,'q_kN_per_m':20,'E_GPa':34,'I_m4':.1,'observed_x_m':7.4,'checks':'checks-b.json'}
    }[ident]
    spec['production_note']='原创双人教学剧本及合成声音，无真人声音模仿。'+spec['model']['description']
    spec['sources']={'D02':['chapters/ch01.qmd','core-thinking.qmd'],'D03':['chapters/ch02-foundations.qmd'],'D04':['chapters/ch02.qmd','chapters/ch03.qmd'],'D05':['chapters/ch10-fem.qmd']}[ident]
    (HERE/f'specs/{ident}.json').write_text(json.dumps(spec,ensure_ascii=False,indent=2),encoding='utf-8')
    audio_meta=HERE.parents[1]/f'assets/videos/dialogue-pilot/{ident}-dialogue.json'
    if audio_meta.exists():
        existing=json.loads(audio_meta.read_text(encoding='utf-8'))
        for key in ['model','production_note','sources']:existing[key]=spec[key]
        audio_meta.write_text(json.dumps(existing,ensure_ascii=False,indent=2),encoding='utf-8')
print('Prepared five dialogue scripts')
