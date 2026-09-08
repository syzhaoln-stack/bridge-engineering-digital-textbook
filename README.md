# 桥梁工程智能设计 · 数字教材公开预览

本仓库是本轮数字教材的独立版本，包含11个专业章节、交互实验与桥梁思维公众课样讲。它与[旧版《我所理解的桥梁工程》](https://github.com/syzhaoln-stack/bridge-engineering-textbook)分开维护；旧仓库保持原状。

- [在线阅读整本教材](https://syzhaoln-stack.github.io/bridge-engineering-digital-textbook/)
- [新增40幅图、5段双人对话、100个独立交互及3本Notebook](https://syzhaoln-stack.github.io/bridge-engineering-digital-textbook/visual-update.html)
- [8处内容、24张GPT生成图选样与比例复核](https://syzhaoln-stack.github.io/bridge-engineering-digital-textbook/interactive/imagegen-review.html)
- [桥梁、列车与钢筋笼：旋转、消隐、拆分](https://syzhaoln-stack.github.io/bridge-engineering-digital-textbook/interactive/bridge-assembly/index.html)
- [作者选样、Blender构造图与钢筋观察](https://syzhaoln-stack.github.io/bridge-engineering-digital-textbook/blender-model-review.html)
- [先试公众课第一讲](https://syzhaoln-stack.github.io/bridge-engineering-digital-textbook/interactive/public-course.html)
- [图片数量、来源与出版制作计划](https://syzhaoln-stack.github.io/bridge-engineering-digital-textbook/publication-images.html)
- [各章实验入口](https://syzhaoln-stack.github.io/bridge-engineering-digital-textbook/interactive/learning-map.html)
- [配筋、空间投影与桥梁建造游戏](https://syzhaoln-stack.github.io/bridge-engineering-digital-textbook/legacy-tools.html)
- [从桥梁看世界：改一个条件，看看受力怎样变](https://syzhaoln-stack.github.io/bridge-engineering-digital-textbook/bridge-thinking.html)

## 当前内容与完成程度

教材有11个专业章节；公众课有12讲提纲及第1讲样页，未录制12讲课程视频。已有关联教具可直接操作。几何展示、教学模型和工程设计结果各自说明适用范围。AI辅助CAD尚未形成新版教学单元，没有作为已完成功能列入。

原资料库统计为781个外部参考候选文件、31个自制静态图文件及125张视频海报。本轮另新增40幅原创参数图（SVG+PNG）、5个双人Manim样片和100个独立HTML实验页；100页复用29类模型，3本Notebook已执行验证。公开包不包含参考原图，只提供[元数据登记表](docs/assets/publication/image-reference-register.csv)和数量说明；正式出版采用数量尚未确定。

## 文件目录

- `docs/`：GitHub Pages发布快照。
- `source/`：经过公开筛选的Quarto正文、图件、计算与交互源码。
- `reports/`：用图制作计划及授权、AI和CAD流程说明。
- `public-export.json`：来源版本和排除范围记录。

作者申报材料、内部参考图与筛图记录、原始工作仓库历史未进入本仓库。图像来源见站内说明；第三方程序和Kenney车辆资产保留相应许可。公开访问不代表全书和所有素材统一采用某一种开源许可。

## 本地构建

安装Quarto和Python后，运行`quarto render source --to html`；构建结果在`source/_site/`。当前Pages从`main`分支的`docs/`发布，更新时应先检查构建结果再同步到该目录。默认交互可本地运行；外部课程与投影工作台需要联网，部分正文公式使用在线MathJax。

来源工作版本：`8fc39170967086233a32be85b9209c39682f56b9`。这是不携带内部资料与旧历史的公开导出，不能将此仓库的首次提交误认为教材首次写作。
