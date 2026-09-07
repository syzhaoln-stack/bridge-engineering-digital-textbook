window.IMAGEGEN_REVIEW = {
  "schema": "imagegen-review/v1",
  "date": "2026-09-07",
  "groups": [
    {
      "id": "G01",
      "title": "整座桥与一辆车",
      "figure": "F01",
      "chapter_url": "../chapters/ch01.html#fig-priority-F01",
      "original_url": "../assets/publication/priority-40/F01.png",
      "reference_url": "../assets/publication/imagegen-samples/references/G01-reference.png",
      "dimensions_summary": "两跨20+20m，桥宽10.8m；货车6×2.2×3m。车长只有全桥的15%。",
      "usage": "用在认识整桥、支承与基础的位置。受力箭头另用原参数图。",
      "variants": [
        {
          "id": "G01-A",
          "style": "写实场景",
          "image": "../assets/publication/imagegen-samples/G01-A-v2.png",
          "review": "两跨、中央桥墩、承台及梁端五个支承可辨；小货车相对全桥长度接近底稿。道路与基础纹理仅作情境，未逐像素还原尺寸。",
          "scale_status": "参照底稿已校核，生成图已作外观比例复核；非精密尺寸图",
          "needs_revision": false,
          "metadata_url": "../assets/publication/imagegen-samples/public-records/G01-A.json"
        },
        {
          "id": "G01-B",
          "style": "三维教具",
          "image": "../assets/publication/imagegen-samples/G01-B.png",
          "review": "两跨、中央桥墩与下方独立基础、梁端五个支承保留；货车占整桥长度接近底稿，基础无土壤遮挡。栏杆和车身细节仅作示意。",
          "scale_status": "参照底稿已校核，生成图已作外观比例复核；非精密尺寸图",
          "needs_revision": false,
          "metadata_url": "../assets/publication/imagegen-samples/public-records/G01-B.json"
        },
        {
          "id": "G01-C",
          "style": "线稿淡彩",
          "image": "../assets/publication/imagegen-samples/G01-C.png",
          "review": "两跨和基础连接保留；右端五个支承与小货车的尺度关系可辨，适合章节引图。线条和材质有手绘自由度，不能从本图量尺寸。",
          "scale_status": "参照底稿已校核，生成图已作外观比例复核；非精密尺寸图",
          "needs_revision": false,
          "metadata_url": "../assets/publication/imagegen-samples/public-records/G01-C.json"
        }
      ]
    },
    {
      "id": "G02",
      "title": "同一块木条，换个放法",
      "figure": "F06",
      "chapter_url": "../chapters/ch02-foundations.html#fig-priority-F06",
      "original_url": "../assets/publication/priority-40/F06.png",
      "reference_url": "../assets/publication/imagegen-samples/G02-geometry-reference.png",
      "dimensions_summary": "两根木条均1.00×0.10×0.020m；支承中心距0.80m；其中一根绕长轴转90°。",
      "usage": "适合生活问题的开场。图中没有加载，不能据此比较实测挠度。",
      "variants": [
        {
          "id": "G02-A",
          "style": "写实场景",
          "image": "../assets/publication/imagegen-samples/G02-A.png",
          "review": "画面含两根直木条，左侧大面水平、右侧窄边水平，旋转90°的区别明显。\n四块支承分别承托两根木条，端部有悬出；未见浮空、手部、荷载箭头或虚假变形。\n木纹和普通工作台场景自然，两块材料长度在透视画面中近似相当。\n生成照片不是摄影测量结果；仅能确认相同长度与旋转关系大体呈现，无法从单一透视图认证毫米级尺寸、0.80m支承中心距及同体积。\n未施加载荷，不能据此比较挠度或验证受弯承载力；精确尺寸仍以几何底稿和参数合同为准。",
          "scale_status": "参照底稿已校核，生成图已作外观比例复核；非精确尺寸图",
          "needs_revision": false,
          "metadata_url": "../assets/publication/imagegen-samples/public-records/G02-A.json"
        },
        {
          "id": "G02-B",
          "style": "三维教具",
          "image": "../assets/publication/imagegen-samples/G02-B.png",
          "review": "两根木条为平放与立放，四块支承分别承托；没有增加荷载、人物、文字或变形。\n初版立放木条长边目视较平放木条短约8%–10%，已按同一几何底稿进行一次定向修正。\n修正后两根长边在共同视图中的长度更接近，立放截面的窄顶边、宽侧面辨识清楚，支承接触关系可见。\n图像生成保留的是可见关系，不是CAD约束；单张图不能认证1.00m长度、0.80m支承中心距、0.020m厚度或两木条的精确同体积。\n支承与端部悬出长度有视觉近似，不能从图片反推实验测量值；需要精确尺寸时使用随附确定性底稿。\n没有施加载荷，不能据图宣称刚度、挠度或承载力比较已经验证。",
          "scale_status": "参照底稿已校核，生成图已作外观比例复核；非精确尺寸图",
          "needs_revision": false,
          "metadata_url": "../assets/publication/imagegen-samples/public-records/G02-B.json"
        },
        {
          "id": "G02-C",
          "style": "线稿淡彩",
          "image": "../assets/publication/imagegen-samples/G02-C.png",
          "review": "钢笔轮廓配浅淡水彩，两根木条和四个支承完整，画面无字、无力箭头。\n平放的宽顶面和立放的宽侧面区分清楚；端面方向对应90°旋转，两根长边目视近似等长。\n条材无夸张挠曲、浮空或荷载，适合作为提出生活问题的场景。\n图像生成保留的是可见关系，不是CAD约束；单张图不能认证1.00m长度、0.80m支承中心距、0.020m厚度或两木条的精确同体积。\n支承与端部悬出长度有视觉近似，不能从图片反推实验测量值；需要精确尺寸时使用随附确定性底稿。\n没有施加载荷，不能据图宣称刚度、挠度或承载力比较已经验证。",
          "scale_status": "参照底稿已校核，生成图已作外观比例复核；非精确尺寸图",
          "needs_revision": false,
          "metadata_url": "../assets/publication/imagegen-samples/public-records/G02-C.json"
        }
      ]
    },
    {
      "id": "G03",
      "title": "桥面下面，梁怎样连在一起",
      "figure": "F13",
      "chapter_url": "../chapters/ch03.html#fig-priority-F13",
      "original_url": "../assets/publication/priority-40/F13.png",
      "reference_url": "../assets/publication/imagegen-samples/references/G03-reference.png",
      "dimensions_summary": "跨度20m、桥宽10.8m；5根梁，梁距2.4m；内部横隔在5、10、15m，另有两端横梁。",
      "usage": "三版只作画风参考。生成器改动了T梁截面或板的表达；正式构造继续由参数模型绘制。",
      "variants": [
        {
          "id": "G03-A",
          "style": "写实场景",
          "image": "../assets/publication/imagegen-samples/G03-A.png",
          "review": "五纵梁与三道内部横隔的整体网格可辨，车辆相对跨度接近底稿；近侧梁腹板被开口化，格间出现类似底板的表面，不能作为混凝土T梁构造详图。",
          "scale_status": "画风参考；结构细节待修正",
          "needs_revision": true,
          "metadata_url": "../assets/publication/imagegen-samples/public-records/G03-A.json"
        },
        {
          "id": "G03-B",
          "style": "三维教具",
          "image": "../assets/publication/imagegen-samples/G03-B.png",
          "review": "五纵梁、三道内部横隔与开放底部可辨；下缘被画成类似钢I梁的下翼缘，车辆朝向也与底稿相反，需按混凝土T梁截面重绘。",
          "scale_status": "画风参考；结构细节待修正",
          "needs_revision": true,
          "metadata_url": "../assets/publication/imagegen-samples/public-records/G03-B.json"
        },
        {
          "id": "G03-C",
          "style": "线稿淡彩",
          "image": "../assets/publication/imagegen-samples/G03-C.png",
          "review": "网格数量与卡车朝向大体对应底稿；板的透明面和格内表面容易被误认为底板，连接及T梁截面细节仍需参数图接管。",
          "scale_status": "画风参考；结构细节待修正",
          "needs_revision": true,
          "metadata_url": "../assets/publication/imagegen-samples/public-records/G03-C.json"
        }
      ]
    },
    {
      "id": "G04",
      "title": "桥还没接到下一个桥墩",
      "figure": "F19",
      "chapter_url": "../chapters/ch03.html#fig-priority-F19",
      "original_url": "../assets/publication/priority-40/F19.png",
      "reference_url": "../assets/publication/imagegen-samples/G04-geometry-reference.png",
      "dimensions_summary": "桥宽12m、梁高2.5m；桥墩间距45m；前端20m导梁距下一墩5m；后段设岸上台座。",
      "usage": "用于引出施工中支承位置变化。它与F19的12m简化算例不是同一模型。",
      "variants": [
        {
          "id": "G04-A",
          "style": "写实场景",
          "image": "../assets/publication/imagegen-samples/G04-A.png",
          "review": "后方已改为岸上土台与顶推台座承托，未再显示45m后悬臂。\n两个前方承重墩、橙色双导梁和独立待接触墩清楚，导梁前方保留空隙。\n写实材质与原构图基本保留；左端延伸出画面，岸台遮挡第一个支点。\n写实编辑扩大了左侧岸土范围，后端出画、第一支点被遮挡，台座起止位置无法逐一比对；不得把此版用作支点位置或45m台座长度图。\n为新教学情境，与F19原计算模型不同；导梁/支座/台座连接均未作承载或施工验算。\n尺寸合同为生成约束，不是从生成图测得的尺寸认证；箱梁内腔及局部连接不可据图施工。",
          "scale_status": "仅作宽泛工程情境候选；精确位置教学优先使用B/C或可计算底稿",
          "needs_revision": false,
          "metadata_url": "../assets/publication/imagegen-samples/public-records/G04-A.json"
        },
        {
          "id": "G04-B",
          "style": "三维教具",
          "image": "../assets/publication/imagegen-samples/G04-B.png",
          "review": "后方浅色连续台座置于岸台上，承托后段梁底，消除了45m后悬臂的表达。\n第一墩在岸台右侧部分可见，前方两墩和待接触墩仍可识别。\n前端双导梁、横向联系和空隙保留；全图无文字、人物、车辆或力箭头。\n教具/线绘中后段台座终点位于原第一支点附近，长细比例与参考大体一致；仍不能从透视生成图验证精确45m、2.5m和5m。\n为新教学情境，与F19原计算模型不同；导梁/支座/台座连接均未作承载或施工验算。\n尺寸合同为生成约束，不是从生成图测得的尺寸认证；箱梁内腔及局部连接不可据图施工。",
          "scale_status": "可供情境配图选择；台座与支承关系比原版清楚",
          "needs_revision": false,
          "metadata_url": "../assets/publication/imagegen-samples/public-records/G04-B.json"
        },
        {
          "id": "G04-C",
          "style": "线稿淡彩",
          "image": "../assets/publication/imagegen-samples/G04-C.png",
          "review": "后方浅色连续台座置于岸台上，承托后段梁底，消除了45m后悬臂的表达。\n第一墩在岸台右侧部分可见，前方两墩和待接触墩仍可识别。\n前端双导梁、横向联系和空隙保留；全图无文字、人物、车辆或力箭头。\n教具/线绘中后段台座终点位于原第一支点附近，长细比例与参考大体一致；仍不能从透视生成图验证精确45m、2.5m和5m。\n为新教学情境，与F19原计算模型不同；导梁/支座/台座连接均未作承载或施工验算。\n尺寸合同为生成约束，不是从生成图测得的尺寸认证；箱梁内腔及局部连接不可据图施工。",
          "scale_status": "可供情境配图选择；台座与支承关系比原版清楚",
          "needs_revision": false,
          "metadata_url": "../assets/publication/imagegen-samples/public-records/G04-C.json"
        }
      ]
    },
    {
      "id": "G05",
      "title": "斜拉桥：先看塔、索和桥面",
      "figure": "F24",
      "chapter_url": "../chapters/ch05.html#fig-priority-F24",
      "original_url": "../assets/publication/priority-40/F24.png",
      "reference_url": "../assets/publication/imagegen-samples/G05-geometry-reference.png",
      "dimensions_summary": "120+300+120m；桥宽22.5m；桥面以上塔高90m；主梁高2m为教学假设。",
      "usage": "用于认识普通斜拉桥的整体外形。具体索锚位置、截面和车道横断面依参数图核对。",
      "variants": [
        {
          "id": "G05-A",
          "style": "写实场景",
          "image": "../assets/publication/imagegen-samples/G05-A.png",
          "review": "完整两塔三跨桥梁入画，直斜索连向桥塔和桥面，未混入悬索桥的悬垂主缆。\n塔腿跨于桥面外侧，两岸桥台与塔下部可见；无放大车辆或人物。\n已针对初版主梁偏厚作一次定向修改，梁身竖向厚度减小。\n主跨长于两侧边跨，塔高相对主跨不呈现塔过低的极端比例；仍不能凭透视图核定120+300+120m、90m或2m，主梁竖向外观仍受护栏和斜视影响。\n桥面为侧视，四车道及0.5m塔腿净距无法逐项看清；不得当成车道布置或净距详图。\n索数、索径、锚具及塔梁连接不可由此进行计算或施工；索距只是图形教学假设。\n为虚构情境，不是实桥摄影，不与F24原无量纲绘图认作同一尺寸算例。",
          "scale_status": "可供桥型与空间关系情境选择；尺寸核对仍用参数底稿",
          "needs_revision": false,
          "metadata_url": "../assets/publication/imagegen-samples/public-records/G05-A.json"
        },
        {
          "id": "G05-B",
          "style": "三维教具",
          "image": "../assets/publication/imagegen-samples/G05-B.png",
          "review": "浅底三维教具风格、两塔和两端桥台完整入画，直斜索连接塔与桥面。\n塔腿位于桥面两侧，没有夸大人物和车辆；连续主梁与塔、端支承相接。\n经过一次定向修改，主梁外观变薄，但没有严格完成提示中的深度比例和中部塔横梁移除。\n长细梁相较初稿有改善；全桥透视仍不能核定120+300+120m及2m梁高，竖向腹板仍可能被渲染加厚。桥面车道线不足以清晰逐条核验四条车道。\n生成器添加了参考底稿没有的中部塔横梁，定向编辑仍保留；不能当作锁定构造的准确三维模型。\n部分索线投影叠合，锚点和0.5m塔腿净距不能逐个测量。\n只作桥型与教具风格候选；需要精确尺寸和模型拓扑的教学应使用可计算模型底稿。",
          "scale_status": "画风参考；结构细节待修正",
          "needs_revision": true,
          "metadata_url": "../assets/publication/imagegen-samples/public-records/G05-B.json"
        },
        {
          "id": "G05-C",
          "style": "线稿淡彩",
          "image": "../assets/publication/imagegen-samples/G05-C.png",
          "review": "细线淡彩风格明确，两塔三跨整体与水面情境可辨。\n直斜索仍由塔连向桥面，没有变成悬索桥，但跨中仍有两塔斜索互穿形成X。\n一次定向编辑未消除跨中互穿；还存在底稿没有的中部塔横梁。\n图像保持长桥整体轮廓，但跨度比例、塔高与车道净距均不能用此透视图作精确认证。\n跨中斜索连接不符合本组合同：左右塔最远索应各止于跨中之前/之后，保留约30m中间间隔，而非互穿。\n工程拓扑问题未解决，不能作为当前斜拉桥教学图直接采用。\n钢笔淡彩风格可供选择借鉴，内容需重绘或重新生成后另审。",
          "scale_status": "画风参考；结构细节待修正",
          "needs_revision": true,
          "metadata_url": "../assets/publication/imagegen-samples/public-records/G05-C.json"
        }
      ]
    },
    {
      "id": "G06",
      "title": "悬索桥的主缆一直通向哪里",
      "figure": "F27",
      "chapter_url": "../chapters/ch06.html#fig-priority-F27",
      "original_url": "../assets/publication/priority-40/F27.png",
      "reference_url": "../assets/publication/imagegen-samples/references/G06-reference.png",
      "dimensions_summary": "150+500+150m；桥宽24m；主缆垂度50m；最低主缆高于桥面12.5m。",
      "usage": "用于区分主缆、吊杆、桥塔和独立地锚。不会从生成图片推算索力。",
      "variants": [
        {
          "id": "G06-A",
          "style": "写实场景",
          "image": "../assets/publication/imagegen-samples/G06-A.png",
          "review": "河流背景与混凝土材质自然，梁底及岸上锚碇清楚；远侧索面部分遮挡。\n生成图不是CAD尺寸验证。跨度比、垂跨比、24m桥宽和毫米级构件直径不能仅凭像素认证；精确值以合同/参数参照为准。\n吊杆条数及间距无法从整桥成图逐根可靠测量；仅作构造情境，不替代力学计算图。\n地形、材料表面、附属构造为生成视觉细节，不代表实桥勘察或设计。",
          "scale_status": "外观关系已复看；精确尺寸以参数底稿为准",
          "needs_revision": false,
          "metadata_url": "../assets/publication/imagegen-samples/public-records/G06-A.json"
        },
        {
          "id": "G06-B",
          "style": "三维教具",
          "image": "../assets/publication/imagegen-samples/G06-B.png",
          "review": "浅底实体模型，主梁、双塔、吊杆与两岸锚碇可辨；索面受透视影响部分重合。\n生成图不是CAD尺寸验证。跨度比、垂跨比、24m桥宽和毫米级构件直径不能仅凭像素认证；精确值以合同/参数参照为准。\n吊杆条数及间距无法从整桥成图逐根可靠测量；仅作构造情境，不替代力学计算图。\n地形、材料表面、附属构造为生成视觉细节，不代表实桥勘察或设计。",
          "scale_status": "外观关系已复看；精确尺寸以参数底稿为准",
          "needs_revision": false,
          "metadata_url": "../assets/publication/imagegen-samples/public-records/G06-B.json"
        },
        {
          "id": "G06-C",
          "style": "线稿淡彩",
          "image": "../assets/publication/imagegen-samples/G06-C.png",
          "review": "线条与淡彩区分主缆/吊杆，主体完整；远侧细索部分线条重合，不用线稿测量缆径。\n生成图不是CAD尺寸验证。跨度比、垂跨比、24m桥宽和毫米级构件直径不能仅凭像素认证；精确值以合同/参数参照为准。\n吊杆条数及间距无法从整桥成图逐根可靠测量；仅作构造情境，不替代力学计算图。\n地形、材料表面、附属构造为生成视觉细节，不代表实桥勘察或设计。",
          "scale_status": "外观关系已复看；精确尺寸以参数底稿为准",
          "needs_revision": false,
          "metadata_url": "../assets/publication/imagegen-samples/public-records/G06-C.json"
        }
      ]
    },
    {
      "id": "G07",
      "title": "桥墩下面，还有多深",
      "figure": "F32",
      "chapter_url": "../chapters/ch07.html#fig-priority-F32",
      "original_url": "../assets/publication/priority-40/F32.png",
      "reference_url": "../assets/publication/imagegen-samples/references/G07-B-fixed-geometry-reference.png",
      "dimensions_summary": "承台8×6×2m；2排×4根桩，桩长20m、直径1m。B版修复了八桩可辨认布局。",
      "usage": "A/C桩数或比例未通过，先选画风；B也须与参数底稿并列，不能靠像素量桩径。",
      "variants": [
        {
          "id": "G07-A",
          "style": "写实场景",
          "image": "../assets/publication/imagegen-samples/G07-A.png",
          "review": "可清楚追踪约六条桩身轮廓，八桩两排布置不能从成图独立确认。\n承台、墩身、长桩和剖切土层关系存在，但并不构成尺寸合格。\n本图不得代替F32参数图或用作八桩数量/尺寸教学证据。\n土层是教学剖切假设，不能解释为真实勘察或已经计算的桩侧、桩端分担。\n像素审查没有证明实际尺寸；合同是生成约束而非成图实测结果。",
          "scale_status": "画风参考；结构细节待修正",
          "needs_revision": true,
          "metadata_url": "../assets/publication/imagegen-samples/public-records/G07-A.json"
        },
        {
          "id": "G07-B",
          "style": "三维教具",
          "image": "../assets/publication/imagegen-samples/G07-B.png",
          "review": "修订底稿采用12°俯角、-76°方位正交视图；两排各四桩在画面上交错，可分别追踪八根至承台及土床。\n桩身较首次生成明显细长，且没有用大块土体遮盖后排。\n浅灰前排与深灰后排仅是材质及遮挡区分，不能作为受力颜色解释。\n生成图相较精确底稿仍有一定桩径视觉加粗，因此不能宣称成图逐像素符合米制尺寸。\n只通过可见构件数量和连接关系复核，未经几何反求/相机标定，不是CAD或按比例施工图。\n需要教授8×6×2m承台、20m桩长、1m桩径或2×4布置时，应与精确底稿及平面图并列；数值以合同/参数图为准。\n地层与材质均为教学假设，未计算桩侧和桩端分担。",
          "scale_status": "外观关系已复看；精确尺寸以参数底稿为准",
          "needs_revision": false,
          "metadata_url": "../assets/publication/imagegen-samples/public-records/G07-B.json"
        },
        {
          "id": "G07-C",
          "style": "线稿淡彩",
          "image": "../assets/publication/imagegen-samples/G07-C.png",
          "review": "只清楚看到六根，不能把其余假定为已正确绘出。\n桩身长度相对直径视觉上偏短，未保持合同20倍桩径；不应推荐作八桩教具。\n本图不得代替F32参数图或用作八桩数量/尺寸教学证据。\n土层是教学剖切假设，不能解释为真实勘察或已经计算的桩侧、桩端分担。\n像素审查没有证明实际尺寸；合同是生成约束而非成图实测结果。",
          "scale_status": "画风参考；结构细节待修正",
          "needs_revision": true,
          "metadata_url": "../assets/publication/imagegen-samples/public-records/G07-C.json"
        }
      ]
    },
    {
      "id": "G08",
      "title": "涂层下面，钢材发生了什么",
      "figure": "F36",
      "chapter_url": "../chapters/ch10-lifecycle.html#fig-priority-F36",
      "original_url": "../assets/publication/priority-40/F36.png",
      "reference_url": "../assets/publication/imagegen-samples/references/G08-reference.png",
      "dimensions_summary": "I梁示例长1.8m、高0.9m，翼缘宽0.45m；翼缘20mm、腹板8mm为底稿尺寸。",
      "usage": "适合观察锈蚀与剥漆。锈斑不等于减薄量；此I梁不是F36的矩形钢条算例。",
      "variants": [
        {
          "id": "G08-A",
          "style": "写实场景",
          "image": "../assets/publication/imagegen-samples/G08-A.png",
          "review": "下部腹板—下翼缘附近出现橙褐锈蚀与清楚剥漆边界；大面积蓝灰涂层仍完整。\n右端能看到薄腹板与上下翼缘，物件完整落在中性地面。\n生成图不能像CAD那样证明翼缘20mm、腹板8mm的像素精确厚度，也不应用透视量取实尺寸。\n锈斑面积、颜色及剥漆纹理不是减薄量、承载力或寿命测量。\n这是I梁情境配图，不是F36矩形截面10%减薄算例的同一构件。",
          "scale_status": "外观关系已复看；精确尺寸以参数底稿为准",
          "needs_revision": false,
          "metadata_url": "../assets/publication/imagegen-samples/public-records/G08-A.json"
        },
        {
          "id": "G08-B",
          "style": "三维教具",
          "image": "../assets/publication/imagegen-samples/G08-B.png",
          "review": "浅底模型、薄板边缘和下部局部剥漆清楚；适合作为与参数截面图并列的情境教具。\n腐蚀斑块克制，未用颜色伪装数值应力。\n生成图不能像CAD那样证明翼缘20mm、腹板8mm的像素精确厚度，也不应用透视量取实尺寸。\n锈斑面积、颜色及剥漆纹理不是减薄量、承载力或寿命测量。\n这是I梁情境配图，不是F36矩形截面10%减薄算例的同一构件。",
          "scale_status": "外观关系已复看；精确尺寸以参数底稿为准",
          "needs_revision": false,
          "metadata_url": "../assets/publication/imagegen-samples/public-records/G08-B.json"
        },
        {
          "id": "G08-C",
          "style": "线稿淡彩",
          "image": "../assets/publication/imagegen-samples/G08-C.png",
          "review": "钢笔线与淡蓝灰水彩保持I梁完整轮廓，下部局部锈蚀与剥漆可区分。\n纸面表现适合教材情境插图；边缘线宽有艺术放大。\n生成图不能像CAD那样证明翼缘20mm、腹板8mm的像素精确厚度，也不应用透视量取实尺寸。\n锈斑面积、颜色及剥漆纹理不是减薄量、承载力或寿命测量。\n这是I梁情境配图，不是F36矩形截面10%减薄算例的同一构件。",
          "scale_status": "外观关系已复看；精确尺寸以参数底稿为准",
          "needs_revision": false,
          "metadata_url": "../assets/publication/imagegen-samples/public-records/G08-C.json"
        }
      ]
    }
  ]
};
