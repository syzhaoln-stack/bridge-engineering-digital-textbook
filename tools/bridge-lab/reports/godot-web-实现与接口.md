# Godot Web V1

该工程从已经验证的桌面版本复制交互核心，原桌面工程保持不变。`bridge_core.gd` 保留工程坐标转换、分组与施工状态求交、爆炸、选取、隔离和教学弯矩展示；`studio.gd` 提供 HTTP 资源加载、移动界面、触控与 Web 验证入口。

## 发布结构

```text
web/
  app/index.html + index.js + index.wasm + index.pck
  manifest.json
  assets/models/{girder,arch,cable_stayed,suspension}.glb
  assets/environments/{id}_{low,standard}.glb
  analysis/{id}.json
  ABOUT.html
```

模型、桥址环境、受力 JSON 在 PCK 外。首屏只请求体积很小的 manifest，按梁桥、拱桥、斜拉桥、悬索桥显示启动卡片；用户选择后才下载对应主体。背景默认关闭，勾选时才请求当前画质的独立环境。背景与主体共用原始坐标原点，环境不进入构件选取或施工数组。

`source/godot_prepare_manifest.py` 从本地资产报告收集真实字节数，生成发布 manifest 并复制模型、环境和受力示例；不复制含本机路径的内部审计报告，不覆盖 ABOUT、许可证或 app 导出文件。桥型公开字段使用白名单，原梁桥本地源路径不会进入发布 manifest。

下载进度读取 HTTPRequest 实际接收字节与 Content-Length；服务器未提供总量时使用已核验的文件字节数。下载完成后明确显示解析阶段，不用假百分比模拟解析。网络失败提供重试、取消；背景失败不影响主体操作。

## 内存与渲染

切桥前取消旧请求，清空构件数组、元数据、三角形缓存、选中材质、覆盖层和背景，再释放旧场景。每次请求携带递增代号，迟到的响应不会覆盖新桥。背景关闭或画质切换时释放原背景，下一次按需重载。

保留真实米制几何、构件编号和施工字段。运行时纹理缺失 mipmap 时生成共享替换纹理，避免逐网格重复。真实三角形点选增加包围盒候选排序，找到前方实体后跳过更远候选。

正常运行不逐帧遍历构件重算显隐；只在组、施工、隐藏、隔离等状态改变时更新。自动旋转默认关闭。手机默认完整主体，用户可以主动选择「简洁显示」隐藏附属与车辆，再恢复显隐。

手机采用两级方向光阴影及 2× 抗锯齿；桌面采用四级阴影及 4× 抗锯齿。WebKit 单独关闭 MSAA，减少可选的 framebuffer resolve 路径；Chrome 等平台仍保留抗锯齿。WebKit 模拟浏览器仍有非致命的 glBlitFramebuffer 控制台警告，兼容结论以最终浏览器记录为准。不使用 SSAO 等高开销屏幕效果。环境提供真实 512 与 1K 纹理选择，主体不随该选项改变。

相机近平面取 `max(0.05, 距离×0.02)`，远平面随桥长、高程和观察距离变化；不使用固定的 0.15—16000 m 大范围。原 T 梁桥标线仅高于路面约 1.5—2 mm，动态裁剪提升手机远景深度精度；放大细部时近平面自动靠近，无需改变原模型高程。

## 手机操作

适配 320×740、390×844 竖屏及横屏。操作面板默认收起，展开后在面板内滚动，触控目标至少 44 px。单指旋转、双指缩放与平移、轻触选构件；触摸从界面控件开始时不会转动桥梁，触摸生成的后续鼠标事件不会重复选取。

屏幕方向改变只按新旧视口比例调整相机距离，保留用户缩放的相对程度、显隐和施工状态，不调用会重置工程显示状态的复位操作。

抽屉与桥型选择采用显式纵向手势滚动，8 CSS px 后判定滚动；使用 Godot 的 `NOTIFICATION_SCROLL_BEGIN` 取消子按钮待触发点击，避免滑动时误切组。施工与爆炸滑条区域保留原生拖动。网页尺寸变化后等待两帧再读取稳定的 Canvas CSS 尺寸。

界面和三维标注都使用嵌入的 Noto Sans SC 字体，许可证随工程保留。发布端可对用到的中文字符制作字体子集。

## 验证入口

通过 HTTP 服务运行 `source/godot_web_smoke.ps1 -BaseUrl http://127.0.0.1:8765/`，验证实际 HTTP 主体/背景/受力加载及交互状态，输出 `docs/godot-web-http-smoke.json`。这项验证不等同于浏览器视觉或真手机性能测试。

`source/godot_touch_smoke.gd` 通过原生引擎真实 InputEvent 分发补充验证 390×844 布局、触摸滚动、取消复选框误点击、保持相机与施工状态、释放手势和动态裁剪；报告为 `docs/godot-touch-smoke.json`。浏览器触摸事件另行实测。

只有 URL 包含 `?qa=1` 时，页面提供 `window.bridgeLabQA(action, argument)` 和只读快照 `window.bridgeLabState`。普通入口不安装这些接口。

| action | argument | 作用 |
|---|---|---|
| load | `girder` / `arch` / `cable_stayed` / `suspension` | 选择并下载桥型 |
| stage | 从 0 开始的阶段索引 | 切施工阶段 |
| explode | 0—1 数值 | 设置爆炸量 |
| group | `{key:'03_Deck',visible:false}` 或相同 JSON 字符串 | 设置分组显隐 |
| background | 布尔值 | 背景下载 / 释放 |
| quality | `low` / `standard` | 背景纹理画质 |
| analysis | 布尔值 | 教学弯矩显示 |
| select | component_id 字符串 | 选择构件 |
| isolate / hide / restore | 无 | 隔离 / 隐藏 / 恢复 |
| reset / restart / pause | 无 | 复位 / 重播施工 / 暂停 |
| drawer | 布尔值 | 打开 / 收起操作抽屉 |
| chooser / detail | 无 | 桥型选择 / 结构细部 |
| retry / cancel | 无 | 请求重试 / 取消 |
| backdrop | 0 / 1 / 2 | 灰蓝 / 深色 / 浅色底色 |

快照包含当前桥型、加载状态、构件数量、可见数量、阶段、爆炸量、背景状态、受力状态、选中构件、缓存数量、相机、视口和请求清单。浏览器测试仍应实际点击、触控、检查网络请求和截图，不能仅凭该接口认定手机操作通过。

工程 API 依据：Godot 官方 [GLTFDocument](https://docs.godotengine.org/en/stable/classes/class_gltfdocument.html) 和 [HTTPRequest](https://docs.godotengine.org/en/stable/classes/class_httprequest.html)。本实现使用 `append_from_buffer` 读取自包含 GLB，并为并行任务使用独立 HTTPRequest。
