# 三个可以重新计算的桥梁Notebook

先在课程包选择对应单元，再打开HTML看本次已运行结果；要改参数，请下载.ipynb，在Jupyter中打开，重新启动内核并运行全部。浏览器里的HTML不会执行Python。

| Notebook | 对应单元 | 本次计算 |
|---|---|---|
| [A · 五梁分担](A-transverse.html) | C04U05、C04U10、C02U01—03 | 120 kN、五梁。e=2.4 m时右梁48 kN；e=3.6 m时双向模型左梁−12 kN。另一个单向弹簧模型为[0,0,10,40,70] kN |
| [B · 两种放大](B-scaling.html) | C01U04—07、C04U09 | 全尺寸相似且只受自重：尺寸2倍、挠度4倍。只加跨度且q、I不变：挠度16倍 |
| [C · 梁有限元](C-beam-fem.html) | C11U03、C11U05、C11U07 | 均布荷载、Euler–Bernoulli梁；用单元中点误差看加密，用简支/固支解析解检查边界 |

A与原核心四梁归一视频的参数不同；C是梁有限元进阶算例，原C11U03/07的核心演示为函数插值。页面已分别写明，不能直接把数字或模型名称混用。其余单元目前没有Notebook，不以共享链接冒充每单元独立制作。

运行环境：Python 3，numpy、matplotlib、ipykernel；重建脚本另需nbformat、nbclient、nbconvert、beautifulsoup4和Node.js；KaTeX已随本目录提供。先安装JupyterLab或使用已有Jupyter环境。

```sh
python -m pip install numpy matplotlib ipykernel nbformat nbclient nbconvert beautifulsoup4 jupyterlab
python -m jupyterlab
# 在Jupyter中打开下载的ipynb，修改参数格，重新启动并运行全部。
# 在本教材目录重建三本及HTML：
python notebooks/build_notebooks.py
```

三个.ipynb均使用nbformat构造，并用nbclient逐格执行、保留输出和自检断言。Python源码由相同单元格导出。manifest.json记录实际执行、单元格数、错误数和结果；不是人工填入一张“预期输出”截图。

供课程组接入Quarto的示例（本轮没有修改全书QMD或配置）：

```markdown
{{< embed notebooks/A-transverse.ipynb#fig-transverse >}}
{{< embed notebooks/B-scaling.ipynb#fig-scaling echo=true >}}
{{< embed notebooks/C-beam-fem.ipynb#fig-fem >}}
```

路径相对引用它的文档；在chapters目录内引用时改为../notebooks/…。每幅图的单元格已设置id、label和tag。Quarto默认使用.ipynb已有输出；需要渲染时重算，应显式使用`quarto render notebook.ipynb --execute`。嵌入功能和默认执行行为依据[Quarto Python文档](https://quarto.org/docs/computations/python.html)与[Notebook嵌入文档](https://quarto.org/docs/authoring/notebook-embed.html)，访问日期2026-09-06。正式整站嵌入由主任务完成，本轮不宣称已经集成。

`course-packages/`保留110份单元JSON清单，`course-data/`保存对应讲解文本与core-render JSON的轻量副本，方便网页发布时保持引用有效。没有复制MP4。单元清单内assets路径相对教材根目录，不能把单个JSON当成包含视频的离线压缩包。

100个独立交互页的选取记录在interactive/course-package-data.json的selection字段中：第1至10章各9页，第11章10页，其余10个单元保留候选。独立页面复用29类模型键的共享引擎，不等于100套独立求解器。



40张自制配图的映射保存在priority-40-mapping.json，关联72个单元、84处图位；其他38个单元无合适配图。每处关联有简短说明，特别标明不同模型或参数条件。课程包的普通重建默认读取此映射；请连同assets/publication/priority-40目录发布。只复核配图接入时运行`python notebooks/qa/check_files.py --skip-python`和`node notebooks/qa/check_course_figures.cjs`，不必重复运行未改变的100个单元引擎。


Notebook公式已改为构建时KaTeX静态HTML＋MathML，本地CSS和字体位于vendor/katex/，不再依赖MathJax CDN或浏览器执行数学脚本。只更新数学HTML、不重跑计算时：

```sh
python notebooks/render_html.py --existing
node notebooks/qa/check_notebook_math.cjs
```

3本合计12处公式；17格计算及原.ipynb/.py保持不变。窄屏中的矩阵可局部横向滚动，页面已标明操作。发布时必须保留vendor/katex/katex.min.css、fonts/及MIT许可；构建时使用同目录katex.min.js。版本、下载来源和逐文件哈希见vendor/katex/provenance.json；离线、禁用页面JavaScript的实际验证见qa/notebook-math-verification.json。
