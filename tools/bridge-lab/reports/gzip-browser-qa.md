# Godot Web gzip 浏览器回归（2026-09-09）

本地强制 gzip 回归通过。测试使用独立 Chrome 移动模拟会话，390 × 844 CSS px、DPR 3，通过 CDP 禁用缓存，在 `http://127.0.0.1:8767/app/index.html?qa=1` 运行实际 Godot Web 引擎。此测试模拟压缩 CDN 行为；真实 GitHub Pages CDN 由发布任务另行验收。

## 修复前复现

旧导出 `8c0eb34b34e223235a27da9213d6b01181840d2ed550d1edf22c87d978d7e3fd`：

- `manifest.json` 返回 HTTP 200、`Content-Encoding: gzip`、`Content-Length: 2877`、`Cache-Control: no-store`。
- 实际引擎 `manifest_count=0`、`failure="manifest"`，未能展示四桥选择内容。
- 浏览器控制台出现 `Condition "err != 0 && err != 1" is true. Returning: FAILED` 和 `core/io/stream_peer_gzip.cpp:117` 两条错误。
- 截图：`gzip-before-mobile.png`，1170 × 2532 设备像素。

## 修复后结果

统一请求工厂对 Web 设置 `accept_gzip=false`，保留原生客户端的 gzip 处理。新导出 PCK 为 257,532 bytes，SHA-256 `6d9f403b81bb310895703f4e9d2f74d6d789d8ff2d6b6c8cb68703bf596e944c`；浏览器资源记录解码后大小 257,532、响应压缩体大小 253,561，确认使用新包。

浏览器逐个记录响应头，13/13 项均 HTTP 200 且实际带 `Content-Encoding: gzip`：清单 1 项、主体 GLB 4 项、512 档环境 GLB 4 项、教学受力 JSON 4 项。验收还等待引擎完成解析和场景实例化，不以 HTTP 200 作为唯一通过依据。

| 桥型 | 构件总数 | 成桥可见数 | 教学受力数据就绪 | 512 背景加载 |
|---|---:|---:|---|---|
| 梁 | 2424 | 2424 | 是 | 是 |
| 拱 | 1843 | 1771 | 是 | 是 |
| 斜拉 | 1782 | 1678 | 是 | 是 |
| 悬索 | 4749 | 4381 | 是 | 是 |

四桥 `loading=false`、`environment_loading=false`、`environment_quality="low"`、`failure=""`，全部 `analysis_ready=true` 和 `environment_loaded=true`。背景逐桥关闭后能释放，再切换下一桥。修复后此次浏览器控制台错误为 0；未出现 gzip 二次解压报错。

仓库证据：

- [gzip-after-browser-result.json](gzip-after-browser-result.json)：完整响应头、引擎状态、PCK 传输记录与 errors 数组。

以下大图和重现实验脚本留在本地工作副本 `桥梁实验室_WebV1_20260909`，没有重复打入公开站点：

- `gzip-after-browser-output.txt`：浏览器执行原始输出。
- `gzip-after-girder-mobile.png`、`gzip-after-arch-mobile.png`、`gzip-after-cable_stayed-mobile.png`、`gzip-after-suspension-mobile.png`：带背景的设备像素截图。
- 可重复脚本：`source/browser_gzip_before.js`、`source/browser_gzip_after.js`。

本轮仅验证 gzip 修复和加载链路，未修改模型、材质或交互实现，未自行发布。
