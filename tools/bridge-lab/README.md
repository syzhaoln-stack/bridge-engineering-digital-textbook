# 四类桥梁实验室 · Web V1

教学顺序：梁 → 拱 → 斜拉 → 悬索。入口位于第一篇第1章四类体系比较之后。

## 保留与分发

- `godot/`：可编辑 Godot 4.7 stable 工程、独立构件交互逻辑和中文加载页面。
- `../../source/assets/bridge-lab/`：完整静态 Web 运行目录。`app/` 为引擎与界面，`assets/models/` 为四桥主体，`assets/environments/` 为可选环境，`analysis/` 为独立结构数据。
- `../../docs/assets/bridge-lab/`：GitHub Pages 发布副本。
- `reports/`：资产体积、几何保真、字体子集与浏览器验收记录。

网页使用 Godot 4.7 单线程、Compatibility/WebGL 2.0。可部署整个运行目录到 HTTPS 静态服务；学生设备运行渲染和交互，无需服务器为每位学生渲染桥梁。完整模型仍保留独立构件，选择、消隐、爆炸、阶段展示不依赖服务端。

用本地 HTTP 服务预览整本教材：在仓库根目录运行 `python -m http.server 8000 --directory docs`，浏览 `http://localhost:8000/interactive/bridge-lab/`。不要直接双击运行 `.wasm` 或用 `file://` 打开 Godot 页面。

Godot编辑器运行预览也需要此HTTP服务；运行参数可设为 `--base-url=http://localhost:8000/assets/bridge-lab/`。迁移到独立站点时，保持外部资产的相对目录；“返回教材”链接对应本书目录，可按新站点入口调整。

## 更新 Godot 展示

安装 Godot **4.7 stable 标准版**及相同版本的 Web 导出模板。编辑本目录 `godot/project.godot` 后运行：

```text
python tools/bridge-lab/export_web.py --godot /path/to/godot
```

脚本更新 `source` 中的 Web 引擎文件，再同步完整运行目录到 `docs`，不提交或推送。浏览器验证后再提交。导出预设关闭线程，GLB 明确排除出 PCK；运行时图像直接来自 GLB，未启用导入纹理的移动压缩变体，不影响移动浏览器加载。

中文字体依据实际界面与模型名称取子集（Bridge Lab Sans，来源 Noto Sans SC，OFL）。新增文字后若出现缺字，应重新生成字体子集或替换为包含对应字符的 OFL 字体，并保留许可。

## 数据与测试

`manifest.json` 规定顺序、尺寸、阶段和外部资源路径。环境标准档为已有1K贴图，流畅档最高512；T梁河道和两端接引路是新增教学背景。主体没有减面或精度量化，仅共享完全重复数据、压缩无透明通道色图。

`analysis/schema.json` 定义结果接口。当前数据为 `teaching_demo`，界面显著标明示意；实际分析结果需要工况、单位、坐标、符号和构件关联。不得把曲线或施工显隐动画解释为实桥/施工验算。

只在 URL 带 `?qa=1` 时启用 `window.bridgeLabQA` 和 `window.bridgeLabState`，用于核对请求、阶段、构件数量与状态释放；普通访问没有测试界面。手势和真实按钮仍须浏览器操作验证。

许可和出处见运行目录 `ABOUT.html` 与 `licenses/`。公开包提供来源链接，不包含整套参考图纸或本机内部材料。
