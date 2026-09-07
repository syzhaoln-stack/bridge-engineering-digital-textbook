"""Attach 40 original figures to exact textbook headings and build one review entrance."""
from pathlib import Path
import json,re,html,hashlib
from PIL import Image,ImageOps,ImageDraw,ImageFont
BOOK=Path(__file__).resolve().parents[1]
FOLDER=BOOK/'assets/publication/priority-40'
figs=[json.loads((FOLDER/f'F{i:02}.json').read_text(encoding='utf-8')) for i in range(1,41)]
assert len({f['id'] for f in figs})==40
grouped={}
for f in figs:
    for ext in ['svg','png']:assert (BOOK/f[ext]).is_file()
    assert f['visual_review']!='pending',f['id']
    grouped.setdefault(f['chapter_file'],[]).append(f)

def figure(f):
    ident=f['id'];notes='；'.join(f['assumptions'])
    return f'''\n\n<!-- PRIORITY-FIGURE {ident} START -->
![{f['caption']}](../{f['svg']}){{#fig-priority-{ident} width=100% fig-alt="{f['title']}。{f['caption']}"}}

<details class="figure-method"><summary>查看模型条件与绘图代码</summary><p>{html.escape(notes)}</p><p>课程组原创参数绘图 · {ident} · <a href="../{f['source_script']}">绘图 Python</a> · <a href="../scripts/priority-figures/figlib.py">公共绘图函数</a> · <a href="../{f['png']}" download>下载 PNG</a> · <a href="../{f['svg']}" download>下载 SVG</a></p></details>
<!-- PRIORITY-FIGURE {ident} END -->\n\n'''

for path,items in grouped.items():
    file=BOOK/path;s=file.read_text(encoding='utf-8')
    s=re.sub(r'\n*<!-- PRIORITY-FIGURE F\d{2} START -->.*?<!-- PRIORITY-FIGURE F\d{2} END -->\n*','\n\n',s,flags=re.S)
    s=re.sub(r'<!-- PRIORITY-CHAPTER-GALLERY START -->.*?<!-- PRIORITY-CHAPTER-GALLERY END -->\s*','',s,flags=re.S)
    # Locate the full heading text, never a guessed slug or approximate substring.
    for f in reversed(items):
        matches=list(re.finditer(r'(?m)^#{2,6}\s+'+re.escape(f['heading'])+r'\s*$',s))
        assert matches,(f['id'],f['heading'],len(matches))
        if len(matches)>1:
            # Some chapters repeat a heading in a later checklist. The audited
            # source line disambiguates the introductory discussion from that list.
            ranked=sorted(matches,key=lambda m:abs(s.count('\n',0,m.start())+1-f['heading_line']))
            best=ranked[0]
            assert abs(s.count('\n',0,best.start())+1-f['heading_line'])<120,(f['id'],'ambiguous heading')
            f['resolved_heading_occurrence']=matches.index(best)+1
        else:best=matches[0]
        pos=best.end();s=s[:pos]+figure(f)+s[pos:]
    cards=''.join(f'<a href="#fig-priority-{f["id"]}"><img src="../{f["svg"]}" loading="lazy" alt="{html.escape(f["title"])}"><span>{html.escape(f["title"])}</span></a>' for f in items)
    gallery=f'<!-- PRIORITY-CHAPTER-GALLERY START -->\n<details class="priority-chapter-gallery"><summary>从本章的 {len(items)} 幅新图开始</summary><div class="priority-thumb-grid">{cards}</div></details>\n<!-- PRIORITY-CHAPTER-GALLERY END -->\n'
    marker='<!-- VISUAL-ENTRY END -->';assert marker in s,path
    s=s.replace(marker,marker+'\n'+gallery,1)
    file.write_text(s,encoding='utf-8',newline='\n')

manifest={'schema':'priority-40/v1','date':'2026-09-07','count':40,'origin':'40 original parameterized diagrams; not reproduced scans','formats':['SVG','PNG 2400x1440'],'figures':figs}
(FOLDER/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')

intro='''# 看图、听一段，再动手 {.unnumbered}

<div class="visual-batch-hero"><p class="batch-kicker">桥梁思维 · 新一批图与实验</p><p class="batch-lead">一辆车停在桥上，五根梁一定平均分吗？先听两个人争论，再亲手改变条件，看看自己的判断能不能站住。</p><div class="batch-actions"><a class="batch-primary" href="#dialogues">先听一段对话</a><a href="interactive/course-package.html">选一个实验动手</a><a href="#forty-figures">翻看 40 幅新图</a><a href="#notebooks">边读边算</a></div></div>

**新增选样：**[8 处内容 × 3 种画法，比较 24 张 GPT 生成候选图](interactive/imagegen-review.html)。每处可对照参数底稿、放大图片并记录选择。7 张有明确构造待修项，已单独标出；原有 40 幅参数图继续保留。

## 先听一段对话 {#dialogues}

小周从生活里的经验出发，阿宁和他一起拆开看。有时直觉有道理，有时还少了一个条件。看完之后，换一个条件再试。

'''
parts=[intro]
routes={'D01':'interactive/lessons/C04U06.html','D02':'interactive/lessons/C01U06.html','D03':'interactive/lessons/C04U07.html','D04':'interactive/lessons/C03U09.html','D05':'interactive/lessons/C11U07.html'}
for ident in ['D01','D02','D03','D04','D05']:
    spec=json.loads((BOOK/f'scripts/dialogue-pilot/specs/{ident}.json').read_text(encoding='utf-8'))
    audio=json.loads((BOOK/f'assets/videos/dialogue-pilot/{ident}-dialogue.json').read_text(encoding='utf-8'))
    length=round(audio['duration_ms']/1000);timestamp=f'{length//60}:{length%60:02}'
    turns=''.join(f'<p><strong>{spec["roles"][t["speaker"]]["name"]}：</strong>{html.escape(t["text"])}</p>' for t in spec['turns'])
    parts.append(f'''### {spec['title']} {{#{ident.lower()}}}

<video class="dialogue-player" controls preload="metadata" playsinline poster="assets/videos/dialogue-pilot/{ident}-poster.jpg" aria-label="{html.escape(spec['title'])}"><source src="assets/videos/dialogue-pilot/{ident}-dialogue.mp4" type="video/mp4"><track kind="captions" src="assets/videos/dialogue-pilot/{ident}-dialogue.vtt" srclang="zh" label="中文"><a href="assets/videos/dialogue-pilot/{ident}-dialogue.mp4">下载视频</a></video>

<p class="batch-media-meta">{timestamp} · 双人合成声音 · <a href="{routes[ident]}">同主题实验（模型条件另列）→</a> · <a href="assets/videos/dialogue-pilot/{ident}-dialogue.mp4" download>下载视频</a></p>

<details><summary>读对话 / 看制作代码</summary>{turns}<p><a href="scripts/dialogue-pilot/dialogue_manim.py">Manim 主场景</a> · <a href="scripts/dialogue-pilot/diagram_a.py">横向分布、尺度与加载图</a> · <a href="scripts/dialogue-pilot/diagram_b.py">预应力与有限元图</a> · <a href="scripts/dialogue-pilot/manim_helpers.py">公共绘图函数</a> · <a href="assets/videos/dialogue-pilot/{ident}-script.md">完整脚本</a></p></details>

''')
parts.append('''## 选一个问题动手

[进入 100 个交互实验](interactive/course-package.html){.btn .btn-primary}

先猜一个结果，改变参数，再比较眼前的变化。实验保留自由探索，做错后可以调整重试。每页都能查看模型条件和计算代码。

<details><summary>资源数量怎么算？</summary><p>本轮交付 100 个可独立打开的交互 HTML 页面，按教学问题区分。它们复用已有力学引擎，不能计作 100 套独立求解器。课程包保留 110 个编号单元的映射，其中另 10 个列为候选；原来的单人讲解视频保留，这次新增的是上面 5 个双人样片。</p></details>

## 翻看 40 幅新图 {#forty-figures}

点图片看大图，点“回到正文”接着读。箭头表示作用或传递方向；曲线和数值图注明模型条件。下面的图均由参数与绘图程序生成，保留可继续编辑的 SVG 和 Python 源码。

''')
for path,items in grouped.items():
    chapter=items[0]['chapter'];cards=[]
    for f in items:
        cards.append(f'<article><a href="{f["svg"]}" target="_blank"><img src="{f["svg"]}" loading="lazy" alt="{html.escape(f["title"])}"></a><h4>{f["id"]} · {html.escape(f["title"])}</h4><p>{html.escape(f["caption"])}</p><p><a href="{path.replace(".qmd",".html")}#fig-priority-{f["id"]}">回到正文</a> · <a href="{f["png"]}" download>PNG</a> · <a href="{f["svg"]}" download>SVG</a></p></article>')
    parts.append(f'<details class="batch-chapter" {"open" if chapter==1 else ""}><summary>第 {chapter} 章 · {len(items)} 幅</summary><div class="batch-gallery">'+''.join(cards)+'</div></details>\n\n')
parts.append('''## 边读边算 {#notebooks}

每份 Notebook 按“问题 → 图与公式 → 代码 → 结果 → 自己试一试”的顺序组织。网页可直接阅读已执行的结果；下载 `.ipynb` 后可在 Jupyter 中修改参数并重新运行。

| 主题 | 直接阅读 | 下载运行 |
|---|---|---|
| 五根梁怎样分担车辆的重量？ | [图文与已运行结果](notebooks/A-transverse.html) | [Notebook](notebooks/A-transverse.ipynb) · [Python](notebooks/A-transverse.py) |
| “变大一倍”到底改变了什么？ | [图文与已运行结果](notebooks/B-scaling.html) | [Notebook](notebooks/B-scaling.ipynb) · [Python](notebooks/B-scaling.py) |
| 网格更细，为什么还要查支承？ | [图文与已运行结果](notebooks/C-beam-fem.html) | [Notebook](notebooks/C-beam-fem.ipynb) · [Python](notebooks/C-beam-fem.py) |

普通静态网页不会在后台运行 Python；不安装软件时，可以先使用上方对应的 HTML 实验。课程包中的数值模型与 Notebook 分别列出尺寸和假定，比较前先核对是否同一工况。

<details><summary>制作与复核记录</summary><p>40 幅原创图为本轮重点图试排稿，已插入对应章节并完成制作者逐图检查。5 部影片使用 Manim 的确定性图形和双人神经语音，保留分镜、逐句文稿、字幕和源码。本轮未使用 Seedance；生成式镜头可用于情境开场，力、位移与支承条件继续由计算和程序控制。</p><p><a href="assets/publication/priority-40/manifest.json">40 图清单与逐图条件</a> · <a href="interactive/course-package-data.json">教学单元资源清单</a> · <a href="notebooks/manifest.json">Notebook 执行记录</a> · <a href="assets/videos/dialogue-pilot/manifest.json">5 个视频与复核记录</a> · <a href="publication-images.html">参考图与出版制作说明</a></p></details>
''')
(BOOK/'visual-update.qmd').write_text(''.join(parts),encoding='utf-8')
# Contact sheets are review aids, excluded from the formal count.
font=ImageFont.truetype('C:/Windows/Fonts/msyh.ttc',18)
for start in range(1,41,8):
    page=Image.new('RGB',(1400,1820),'#f1f5f6');draw=ImageDraw.Draw(page)
    for j,n in enumerate(range(start,min(start+8,41))):
        im=Image.open(FOLDER/f'F{n:02}.png').convert('RGB');im.thumbnail((680,415));x=10+(j%2)*700;y=10+(j//2)*450
        page.paste(im,(x,y));draw.text((x+5,y+418),f'F{n:02}',font=font,fill='#173c50')
    page.save(FOLDER/f'review-sheet-{start:02}.jpg',quality=90)
print(json.dumps({'figures':40,'chapters':len(grouped),'videos':5,'landing':'visual-update.qmd'},ensure_ascii=False))
