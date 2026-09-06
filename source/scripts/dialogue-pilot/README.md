# 五个双人 Manim 样片

两个原创角色：小周从生活直觉追问，阿宁先讲清现象，再用术语概括。各片时长约1–3分钟，保留独立配音、逐句脚本、SRT/VTT、分镜、确定性图层与模型检查。

生成路径：

1. `python scripts/dialogue-pilot/make_specs.py` 写入5份对话规格。
2. `python scripts/dialogue-pilot/synthesize.py --id D01` 合成逐轮语音（逐个ID运行；网络服务可用性会变化，已有语音可直接复用）。
3. `python scripts/dialogue-pilot/diagram_a.py` 与 `python scripts/dialogue-pilot/diagram_b.py` 核对数值及图面范围。
4. `python scripts/dialogue-pilot/produce.py --render` 在相互独立的缓存目录渲染1080p/30fps影片、合并声音、完整解码并输出抽帧联系表。
5. 实际打开联系表和代表帧复看，再核查网页播放、拖动进度与资源链接。

依赖：Python、Manim Community 0.19.0、NumPy、Pillow、edge-tts、pydub、ffmpeg/ffprobe，Microsoft YaHei中文字体；Manim数字对象可能需要本机TeX支持。Python路径和库安装因机器不同需调整。静态GitHub Pages直接播放已渲染MP4，不会在线运行Manim。

语音采用 `zh-CN-YunyangNeural`、`zh-CN-XiaoxiaoNeural`；未进行真人声音模仿。本轮没有调用Seedance或生成式视频。字幕按每轮实测音频时长拆分，句内时间为比例估计，尚未做逐字强制对齐。技术核验与视觉抽帧不能代替听众对对话节奏、音色和趣味性的评价。

本轮绘图模型：D01五梁刚性横向连接；D02几何相似自重与仅增跨度；D03未开裂弹性预应力截面；D04简支梁剪力影响线；D05真实Euler–Bernoulli梁有限元。各片保留自己的尺寸和假定，同主题HTML实验可能采用不同模型，比较数字前先核对条件。
