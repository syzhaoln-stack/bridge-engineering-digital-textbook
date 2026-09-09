extends "res://bridge_core.gd"
## Web wrapper: same semantic interaction core, HTTP assets outside the PCK.

signal model_loaded(id: String, success: bool)
signal background_loaded(success: bool)

const ORDER = ["girder", "arch", "cable_stayed", "suspension"]
const FONT_PATH = "res://fonts/NotoSansSC-Regular.ttf"
var base_url: String = "http://127.0.0.1:8769/"
var model_request: HTTPRequest
var manifest_request: HTTPRequest
var analysis_request: HTTPRequest
var environment_request: HTTPRequest
var load_ticket: int = 0
var environment_ticket: int = 0
var environment_asset: Node3D
var loading_environment: bool = false
var loaded_environment_quality: String = ""
var expected_model_bytes: int = 0
var expected_environment_bytes: int = 0
var last_model_id: String = ""
var last_failure_kind: String = ""
var requested_urls: Array = []
var ui_root: Control
var header_box: VBoxContainer
var drawer: PanelContainer
var drawer_open: bool = true
var drawer_body: VBoxContainer
var drawer_scroll: ScrollContainer
var bottom_bar: PanelContainer
var chooser: PanelContainer
var chooser_body: VBoxContainer
var chooser_scroll: ScrollContainer
var chooser_grid: GridContainer
var chooser_note: Label
var chooser_close: Button
var loading_panel: PanelContainer
var loading_label: Label
var download_bar: ProgressBar
var retry_button: Button
var cancel_button: Button
var background_check: CheckBox
var environment_quality: OptionButton
var environment_note: Label
var backdrop_menu: OptionButton
var drawer_button: Button
var mobile_layout: bool = false
var ui_scale: float = 1.0
var layout_size := Vector2(1280, 800)
var touch_points: Dictionary = {}
var touch_start := Vector2.ZERO
var touch_started_at: int = 0
var touch_moved: bool = false
var touch_was_multi: bool = false
var suppress_mouse_until: int = 0
var progress_clock: float = 0
var qa_clock: float = 0
var qa_enabled: bool = false
var qa_callback: JavaScriptObject
var qa_window: JavaScriptObject
var active_backdrop: int = 0
var first_layout: bool = true
var touch_device: bool = false
var webkit_browser: bool = false
var ui_touches: Dictionary = {}
var layout_pending: bool = false

func _ready() -> void:
    if OS.has_feature("web"):
        base_url = str(JavaScriptBridge.eval("new URL('../', window.location.href).href", true))
        qa_enabled = bool(JavaScriptBridge.eval("new URLSearchParams(window.location.search).get('qa') === '1'", true))
        touch_device = bool(JavaScriptBridge.eval("navigator.maxTouchPoints > 0 || 'ontouchstart' in window", true))
        webkit_browser = bool(JavaScriptBridge.eval("/AppleWebKit/.test(navigator.userAgent) && !/(Chrome|Chromium|Edg|OPR|Android)/.test(navigator.userAgent)", true))
    else:
        for arg in OS.get_cmdline_user_args():
            if arg.begins_with("--base-url="): base_url = arg.trim_prefix("--base-url=")
    if not base_url.ends_with("/"): base_url += "/"
    _world()
    _web_ui()
    get_viewport().size_changed.connect(_queue_layout)
    _layout_ui()
    camera_focus = Vector3.ZERO
    camera_distance = 100
    _camera_update()
    _set_backdrop(0)
    if qa_enabled: _install_qa_bridge()
    _fetch_manifest()

func _font() -> Font:
    return load(FONT_PATH)

func _web_ui() -> void:
    var layer := CanvasLayer.new()
    add_child(layer)
    ui_root = Control.new()
    layer.add_child(ui_root)
    ui_root.mouse_filter = Control.MOUSE_FILTER_IGNORE
    var theme := Theme.new()
    theme.default_font = _font()
    theme.default_font_size = 14
    for mode in ["normal", "hover", "pressed"]:
        theme.set_stylebox(mode, "Button", _style(Color("203742") if mode == "normal" else Color("345c63"), 8))
    theme.set_stylebox("focus", "Button", StyleBoxEmpty.new())
    for mode in ["normal", "pressed", "hover_pressed", "disabled", "focus"]:
        theme.set_stylebox(mode, "CheckBox", StyleBoxEmpty.new())
    theme.set_stylebox("hover", "CheckBox", _style(Color("17303a"), 0))
    ui_root.theme = theme
    header_box = VBoxContainer.new()
    header_box.mouse_filter = Control.MOUSE_FILTER_IGNORE
    ui_root.add_child(header_box)
    header_box.add_child(_label("BRIDGE ATLAS  /  数字教材", 11, ACCENT))
    model_title = _label("桥梁结构实验室", 24)
    model_title.text_overrun_behavior = TextServer.OVERRUN_TRIM_ELLIPSIS
    header_box.add_child(model_title)
    summary = _label("旋转观察 · 施工顺序 · 构件拆解", 12, MUTED)
    summary.text_overrun_behavior = TextServer.OVERRUN_TRIM_ELLIPSIS
    header_box.add_child(summary)
    drawer = PanelContainer.new()
    drawer.add_theme_stylebox_override("panel", _style(Color(0.025, 0.052, 0.07, 0.97), 14))
    ui_root.add_child(drawer)
    drawer_scroll = ScrollContainer.new()
    drawer_scroll.horizontal_scroll_mode = ScrollContainer.SCROLL_MODE_DISABLED
    drawer.add_child(drawer_scroll)
    drawer_body = VBoxContainer.new()
    drawer_body.size_flags_horizontal = Control.SIZE_EXPAND_FILL
    drawer_body.add_theme_constant_override("separation", 8)
    drawer_scroll.add_child(drawer_body)
    var heading := HBoxContainer.new()
    drawer_body.add_child(heading)
    var title := _label("观察与操作", 19)
    title.size_flags_horizontal = Control.SIZE_EXPAND_FILL
    heading.add_child(title)
    heading.add_child(_button("收起", _toggle_drawer))
    _row(drawer_body, [["返回教材", _return_to_textbook], ["说明与来源", _open_about]])
    subtitle = _label("请选择桥型开始。", 12, Color("d7c092"))
    subtitle.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
    drawer_body.add_child(subtitle)
    _section(drawer_body, "背景与环境")
    backdrop_menu = OptionButton.new()
    backdrop_menu.add_item("简约灰蓝")
    backdrop_menu.add_item("深色背景")
    backdrop_menu.add_item("浅色背景")
    backdrop_menu.custom_minimum_size.y = 38
    backdrop_menu.item_selected.connect(_set_backdrop)
    drawer_body.add_child(backdrop_menu)
    background_check = CheckBox.new()
    background_check.text = "显示桥址背景（按需下载）"
    background_check.toggled.connect(_set_background)
    background_check.disabled = true
    drawer_body.add_child(background_check)
    environment_quality = OptionButton.new()
    environment_quality.add_item("流畅环境 · 512 纹理")
    environment_quality.add_item("标准环境 · 1K 纹理")
    environment_quality.custom_minimum_size.y = 38
    environment_quality.item_selected.connect(func(_index: int): _change_environment_quality())
    drawer_body.add_child(environment_quality)
    environment_note = _label("简约背景无需下载环境模型。", 11, MUTED)
    environment_note.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
    drawer_body.add_child(environment_note)
    drawer_body.add_child(HSeparator.new())
    _section(drawer_body, "构件显隐")
    group_box = VBoxContainer.new()
    group_box.add_theme_constant_override("separation", 1)
    drawer_body.add_child(group_box)
    _row(drawer_body, [["简洁显示", _simple_view], ["恢复显隐", _restore_filters], ["查看基础", _foundation_view]])
    drawer_body.add_child(HSeparator.new())
    _section(drawer_body, "施工顺序")
    var stage_row := HBoxContainer.new()
    drawer_body.add_child(stage_row)
    stage_title = _label("等待载入", 14)
    stage_title.size_flags_horizontal = Control.SIZE_EXPAND_FILL
    stage_title.text_overrun_behavior = TextServer.OVERRUN_TRIM_ELLIPSIS
    stage_row.add_child(stage_title)
    stage_counter = _label("", 12, ACCENT)
    stage_row.add_child(stage_counter)
    stage_slider = HSlider.new()
    stage_slider.custom_minimum_size.y = 32
    stage_slider.step = 1
    stage_slider.value_changed.connect(func(value: float): if is_instance_valid(asset): _set_stage(int(value)))
    drawer_body.add_child(stage_slider)
    stage_description = _label("", 12, MUTED)
    stage_description.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
    drawer_body.add_child(stage_description)
    var playback := _row(drawer_body, [["重播施工", _restart_construction], ["播放", _toggle_play], ["成桥", _completed_bridge]])
    play_button = playback.get_child(1)
    drawer_body.add_child(HSeparator.new())
    _section(drawer_body, "爆炸与观察")
    explosion_slider = HSlider.new()
    explosion_slider.min_value = 0
    explosion_slider.max_value = 1
    explosion_slider.step = 0.01
    explosion_slider.custom_minimum_size.y = 32
    explosion_slider.value_changed.connect(_set_explosion)
    drawer_body.add_child(explosion_slider)
    drawer_body.add_child(_label("仅改变显示位置，物理尺寸不变。", 11, MUTED))
    _row(drawer_body, [["复位", _reset_all], ["立面", _side_view], ["平面", _top_view], ["端面", _end_view]])
    var observe := _row(drawer_body, [["结构细部", _detail_view], ["聚焦所选", _focus_selected], ["自动旋转", _toggle_auto]])
    auto_button = observe.get_child(2)
    _row(drawer_body, [["隔离所选", _isolate_selected], ["隐藏所选", _hide_selected], ["恢复显隐", _restore_filters]])
    detail = _label("单击 / 轻触构件进行选取。", 12, MUTED)
    detail.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
    drawer_body.add_child(detail)
    drawer_body.add_child(HSeparator.new())
    _section(drawer_body, "结构信息叠加")
    analysis_check = CheckBox.new()
    analysis_check.text = "显示教学弯矩示例"
    analysis_check.disabled = true
    analysis_check.toggled.connect(func(_value: bool): _sync_overlay())
    drawer_body.add_child(analysis_check)
    analysis_note = _label("载入桥型后读取数据。", 11, Color("e6bd83"))
    analysis_note.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
    drawer_body.add_child(analysis_note)
    bottom_bar = PanelContainer.new()
    bottom_bar.add_theme_stylebox_override("panel", _style(Color(0.025, 0.052, 0.07, 0.95), 7))
    ui_root.add_child(bottom_bar)
    var toolbar := HBoxContainer.new()
    toolbar.add_theme_constant_override("separation", 5)
    bottom_bar.add_child(toolbar)
    toolbar.add_child(_button("桥型", _show_chooser))
    drawer_button = _button("操作", _toggle_drawer)
    toolbar.add_child(drawer_button)
    toolbar.add_child(_button("复位", _reset_all))
    toolbar.add_child(_button("背景", _quick_background))
    for b in toolbar.get_children(): b.custom_minimum_size.y = 42
    status = _label("正在读取桥型清单…", 12, ACCENT)
    status.text_overrun_behavior = TextServer.OVERRUN_TRIM_ELLIPSIS
    ui_root.add_child(status)
    chooser = PanelContainer.new()
    chooser.add_theme_stylebox_override("panel", _style(Color(0.022, 0.047, 0.062, 0.985), 20))
    ui_root.add_child(chooser)
    chooser_scroll = ScrollContainer.new()
    chooser_scroll.horizontal_scroll_mode = ScrollContainer.SCROLL_MODE_DISABLED
    chooser.add_child(chooser_scroll)
    chooser_body = VBoxContainer.new()
    chooser_body.size_flags_horizontal = Control.SIZE_EXPAND_FILL
    chooser_body.add_theme_constant_override("separation", 14)
    chooser_scroll.add_child(chooser_body)
    chooser_body.add_child(_label("从一种桥开始", 26))
    chooser_note = _label("按需载入所选桥型，默认不下载桥址背景。", 13, MUTED)
    chooser_note.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
    chooser_body.add_child(chooser_note)
    chooser_grid = GridContainer.new()
    chooser_grid.columns = 2
    chooser_grid.add_theme_constant_override("h_separation", 12)
    chooser_grid.add_theme_constant_override("v_separation", 12)
    chooser_body.add_child(chooser_grid)
    chooser_close = _button("返回当前模型", func(): chooser.visible = false; _layout_ui())
    chooser_close.visible = false
    chooser_body.add_child(chooser_close)
    loading_panel = PanelContainer.new()
    loading_panel.add_theme_stylebox_override("panel", _style(Color(0.02, 0.05, 0.07, 0.97), 14))
    ui_root.add_child(loading_panel)
    var loading_box := VBoxContainer.new()
    loading_box.add_theme_constant_override("separation", 8)
    loading_panel.add_child(loading_box)
    loading_label = _label("", 13)
    loading_label.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
    loading_box.add_child(loading_label)
    download_bar = ProgressBar.new()
    download_bar.custom_minimum_size.y = 16
    download_bar.show_percentage = false
    loading_box.add_child(download_bar)
    var net_buttons := HBoxContainer.new()
    loading_box.add_child(net_buttons)
    retry_button = _button("重试", _retry_download)
    cancel_button = _button("取消", _cancel_loading)
    net_buttons.add_child(retry_button)
    net_buttons.add_child(cancel_button)
    loading_panel.visible = false

func _queue_layout() -> void:
    if layout_pending: return
    layout_pending = true
    # Canvas CSS bounds settle after the Web viewport resize notification.
    await get_tree().process_frame
    await get_tree().process_frame
    layout_pending = false
    _layout_ui()

func _layout_ui() -> void:
    if not is_instance_valid(ui_root): return
    var previous_fit := _viewport_fit_factor(layout_size)
    var initial_layout := first_layout
    var viewport_size := get_viewport().get_visible_rect().size
    ui_scale = 1
    if OS.has_feature("web"):
        var css_width := float(JavaScriptBridge.eval("document.getElementById('canvas').getBoundingClientRect().width", true))
        if css_width > 0: ui_scale = maxf(1.0, viewport_size.x / css_width)
    layout_size = viewport_size / ui_scale
    ui_root.scale = Vector2.ONE * ui_scale
    ui_root.size = layout_size
    var was_mobile := mobile_layout
    mobile_layout = layout_size.x < 760 or (touch_device and layout_size.y < 520)
    if first_layout or was_mobile != mobile_layout:
        drawer_open = not mobile_layout
        first_layout = false
    _size_touch_controls(ui_root)
    if is_instance_valid(asset) and not initial_layout:
        # Preserve the user's relative zoom and all semantic state while rotating
        # the phone; adjust only the framing factor caused by the aspect change.
        camera_distance *= _viewport_fit_factor(layout_size) / previous_fit
    for node in get_children():
        if node is DirectionalLight3D and node.shadow_enabled:
            node.directional_shadow_mode = DirectionalLight3D.SHADOW_PARALLEL_2_SPLITS if mobile_layout else DirectionalLight3D.SHADOW_PARALLEL_4_SPLITS
    # WebKit's compatibility framebuffer resolve can blit the same image with
    # MSAA enabled. Other WebGL2 browsers retain their usual antialiasing.
    get_viewport().msaa_3d = Viewport.MSAA_DISABLED if webkit_browser else (Viewport.MSAA_2X if mobile_layout else Viewport.MSAA_4X)
    header_box.position = Vector2(16, 14)
    header_box.size = Vector2(layout_size.x - 32, 76)
    model_title.add_theme_font_size_override("font_size", 20 if mobile_layout else 25)
    drawer.visible = drawer_open and not chooser.visible
    if mobile_layout:
        drawer.position = Vector2(10, 98)
        drawer.size = Vector2(layout_size.x - 20, maxf(180, layout_size.y - 192))
    else:
        drawer.position = Vector2(16, 110)
        drawer.size = Vector2(318, maxf(210, layout_size.y - 212))
    bottom_bar.position = Vector2(10 if mobile_layout else 16, layout_size.y - 70)
    bottom_bar.size = Vector2(layout_size.x - 20 if mobile_layout else 318, 56)
    drawer_button.text = "收起" if drawer.visible else "操作"
    status.position = Vector2(16 if mobile_layout else 355, layout_size.y - 92 if mobile_layout else layout_size.y - 42)
    status.size = Vector2(layout_size.x - 32 if mobile_layout else layout_size.x - 375, 24)
    var chooser_width := minf(layout_size.x - 24, 680)
    chooser.position = Vector2((layout_size.x - chooser_width) / 2, 108 if layout_size.y > 520 else 90)
    chooser.size = Vector2(chooser_width, maxf(160, layout_size.y - chooser.position.y - 92))
    chooser_grid.columns = 1 if mobile_layout else 2
    for card in chooser_grid.get_children():
        card.custom_minimum_size = Vector2(chooser_width - 64 if mobile_layout else (chooser_width - 66) / 2, 92)
    var load_width := minf(layout_size.x - 28, 500)
    loading_panel.position = Vector2((layout_size.x - load_width) / 2, maxf(100, layout_size.y - 255))
    loading_panel.size = Vector2(load_width, 0)
    _camera_update()

func _viewport_fit_factor(size: Vector2) -> float:
    return maxf(1.0, 1.25 / maxf(size.aspect(), 0.35))

func _size_touch_controls(node: Node) -> void:
    if node is BaseButton:
        node.custom_minimum_size.y = maxf(node.custom_minimum_size.y, 44 if mobile_layout else 34)
    elif node is Slider:
        node.custom_minimum_size.y = 44 if mobile_layout else 32
    for child in node.get_children(): _size_touch_controls(child)

func _return_to_textbook() -> void:
    if OS.has_feature("web"):
        JavaScriptBridge.eval("window.location.href = new URL('../../../interactive/bridge-lab/index.html', window.location.href).href;", true)

func _open_about() -> void:
    OS.shell_open(_url("ABOUT.html"))

func _camera_update() -> void:
    if not is_instance_valid(camera): return
    # Keep the depth range proportional to the current bridge and view. Road
    # markings are only 1.5–2 mm above the girder asphalt; a fixed 0.15/16000
    # frustum loses that separation when the phone camera backs away.
    camera.near = maxf(0.05, camera_distance * 0.02)
    camera.far = maxf(100.0, camera_distance + float(current.get("length", 100)) * 3.0 + absf(float(current.get("deck_z", 0))) * 4.0)
    camera.position = camera_focus + camera_distance * Vector3(cos(yaw) * cos(pitch), sin(pitch), sin(yaw) * cos(pitch))
    camera.look_at(camera_focus, Vector3.UP)
    var aspect := get_viewport().get_visible_rect().size.aspect()
    camera.h_offset = -camera_distance * 0.12 if not mobile_layout and drawer_open and not (is_instance_valid(chooser) and chooser.visible) else 0.0
    camera.size = camera_distance * 0.68
    if aspect < 1.0: camera.h_offset = 0

func _reset_all() -> void:
    if not is_instance_valid(asset): return
    super._reset_all()
    camera_distance *= _viewport_fit_factor(layout_size)
    _camera_update()

func _set_stage(index: int) -> void:
    if loading or not is_instance_valid(asset): return
    super._set_stage(index)

func _toggle_play() -> void:
    if loading or not is_instance_valid(asset): return
    super._toggle_play()

func _restart_construction() -> void:
    if loading or not is_instance_valid(asset): return
    super._restart_construction()

func _set_backdrop(index: int) -> void:
    active_backdrop = index
    for node in get_children():
        if node is WorldEnvironment:
            var env: Environment = node.environment
            env.background_mode = Environment.BG_COLOR
            env.background_color = [Color("586b77"), Color("172630"), Color("c1ccd0")][clampi(index, 0, 2)]
    if is_instance_valid(backdrop_menu): backdrop_menu.select(index)

func _toggle_drawer() -> void:
    drawer_open = not drawer_open
    chooser.visible = false
    _layout_ui()

func _show_chooser() -> void:
    auto_rotate = false
    chooser.visible = true
    chooser_close.visible = is_instance_valid(asset)
    _layout_ui()

func _simple_view() -> void:
    for category in ["06_Furniture", "91_Traffic"]:
        if group_enabled.has(category): _set_group(category, false)

func _foundation_view() -> void:
    _set_background(false)
    pitch = 0.10
    _camera_update()

func _quick_background() -> void:
    if is_instance_valid(asset) and not current.get("environments", {}).is_empty():
        _set_background(not background_check.button_pressed)
    else:
        _set_backdrop((active_backdrop + 1) % 3)

func _url(relative: String) -> String:
    if relative.begins_with("https://") or relative.begins_with("http://"): return relative
    return base_url + relative.trim_prefix("/")

func _request_new(kind: String, relative: String) -> HTTPRequest:
    var request := HTTPRequest.new()
    request.name = "HTTP_" + kind
    request.use_threads = false
    request.timeout = 120
    request.body_size_limit = 100 * 1024 * 1024
    add_child(request)
    requested_urls.append({"kind":kind, "url":_url(relative), "time_ms":Time.get_ticks_msec()})
    return request

func _cancel_request(request: HTTPRequest) -> void:
    if is_instance_valid(request):
        request.cancel_request()
        request.queue_free()

func _fetch_manifest() -> void:
    _cancel_request(manifest_request)
    manifest_request = _request_new("manifest", "manifest.json")
    manifest_request.request_completed.connect(_on_manifest_completed.bind(manifest_request), CONNECT_ONE_SHOT)
    var error := manifest_request.request(_url("manifest.json"))
    if error != OK: _network_failure("manifest", "无法开始读取桥型清单。")

func _on_manifest_completed(result: int, code: int, _headers: PackedStringArray, body: PackedByteArray, request: HTTPRequest) -> void:
    if request != manifest_request: return
    manifest_request = null
    request.queue_free()
    if result != HTTPRequest.RESULT_SUCCESS or code != 200:
        _network_failure("manifest", "桥型清单读取失败（HTTP %d）。请检查网络后重试。" % code)
        return
    var parsed = JSON.parse_string(body.get_string_from_utf8())
    if not parsed is Dictionary or not parsed.get("models", null) is Array:
        _network_failure("manifest", "桥型清单格式不正确。")
        return
    manifest.clear()
    models_by_id.clear()
    for id in ORDER:
        for item in parsed.models:
            if str(item.get("id", "")) == id:
                manifest.append(item)
                models_by_id[id] = item
    for child in chooser_grid.get_children(): child.free()
    for item in manifest:
        var mb := float(item.get("model_bytes", 0)) / 1000000.0
        var label_text := "%s\n%.1f MB · %d 个施工阶段\n点击载入" % [str(item.name), mb, item.get("stages", []).size()]
        var card := _button(label_text, _load_model.bind(str(item.id)))
        card.add_theme_font_size_override("font_size", 15)
        chooser_grid.add_child(card)
    chooser_note.text = "只下载所选桥型。背景可按需开启；手机支持单指旋转、双指缩放与平移。"
    status.text = "请选择桥型开始 · 尚未下载模型"
    loading_panel.visible = false
    _layout_ui()
    _publish_qa_state()
    print("BRIDGE_WEB_MANIFEST_READY: " + str(manifest.size()) + " models; no GLB requested")
    if OS.get_cmdline_user_args().has("--smoke"): await _network_smoke()

func _release_model() -> void:
    _clear_selected()
    _stop_playback()
    auto_rotate = false
    rotating = false
    panning = false
    touch_points.clear()
    triangles_cache.clear()
    records.clear()
    meshes.clear()
    groups.clear()
    checks.clear()
    group_enabled.clear()
    hidden_ids.clear()
    isolated_id = ""
    extras_by_name.clear()
    force_data.clear()
    force_anchors.clear()
    overlay_bindings.clear()
    for child in overlay_root.get_children(): child.free()
    overlay_root.visible = false
    for child in group_box.get_children(): child.free()
    if is_instance_valid(asset): asset.free()
    asset = null
    _release_environment()
    analysis_check.set_pressed_no_signal(false)
    analysis_check.disabled = true
    background_check.set_pressed_no_signal(false)
    background_check.disabled = true
    explosion_slider.set_value_no_signal(0)
    auto_button.text = "自动旋转"

func _load_model(id: String) -> void:
    if not models_by_id.has(id): return
    load_ticket += 1
    var ticket := load_ticket
    _cancel_request(model_request)
    _cancel_request(analysis_request)
    model_request = null
    analysis_request = null
    _release_model()
    current = models_by_id[id]
    last_model_id = id
    loading = true
    last_failure_kind = ""
    expected_model_bytes = int(current.get("model_bytes", 0))
    chooser.visible = false
    drawer_open = not mobile_layout
    model_title.text = str(current.name)
    subtitle.text = str(current.get("subtitle", ""))
    summary.text = "正在准备所选模型…"
    analysis_note.text = "模型载入后读取结构信息。"
    loading_panel.visible = true
    retry_button.visible = false
    cancel_button.visible = true
    download_bar.value = 0
    loading_label.text = "准备下载 %s…" % str(current.name)
    _layout_ui()
    await get_tree().process_frame
    if ticket != load_ticket: return
    var path := str(current.get("model_url", "assets/models/" + id + ".glb"))
    model_request = _request_new("model", path)
    model_request.request_completed.connect(_on_model_completed.bind(ticket, id, model_request), CONNECT_ONE_SHOT)
    var error := model_request.request(_url(path))
    if error != OK:
        _network_failure("model", "模型请求无法开始（%d）。" % error)
        model_loaded.emit(id, false)
    _publish_qa_state()

func _on_model_completed(result: int, code: int, _headers: PackedStringArray, body: PackedByteArray, ticket: int, id: String, request: HTTPRequest) -> void:
    if ticket != load_ticket or request != model_request: return
    model_request = null
    request.queue_free()
    if result != HTTPRequest.RESULT_SUCCESS or code != 200:
        _network_failure("model", "模型下载失败（HTTP %d）。可以重试或换一座桥。" % code)
        model_loaded.emit(id, false)
        return
    loading_label.text = "下载完成，正在解析构件与材质…"
    download_bar.value = 100
    await get_tree().process_frame
    if ticket != load_ticket: return
    var document := GLTFDocument.new()
    var state := GLTFState.new()
    var error := document.append_from_buffer(body, "", state)
    body.clear()
    if error != OK:
        _network_failure("model", "模型解析失败（%d），请重试。" % error)
        model_loaded.emit(id, false)
        return
    for node_data in state.json.get("nodes", []):
        if node_data.has("name"): extras_by_name[str(node_data.name)] = node_data.get("extras", {})
    asset = document.generate_scene(state)
    state = null
    document = null
    if not is_instance_valid(asset):
        _network_failure("model", "模型没有可显示的场景。")
        model_loaded.emit(id, false)
        return
    asset.name = "ActiveBridge"
    add_child(asset)
    _index_nodes(asset)
    _prepare_materials()
    var keys := groups.keys()
    keys.sort()
    for key in keys:
        group_enabled[key] = true
        var check := CheckBox.new()
        check.text = _group_label(key) + " · " + str(groups[key].size())
        check.button_pressed = true
        check.custom_minimum_size.y = 30
        check.add_theme_font_size_override("font_size", 13)
        check.toggled.connect(func(value: bool): _set_group(key, value))
        group_box.add_child(check)
        checks[key] = check
    stage_count = maxi(1, current.get("stages", []).size())
    stage_slider.max_value = stage_count - 1
    summary.text = "%d 个可选构件 · %.1f m · %d 个施工阶段" % [meshes.size(), float(current.get("length", 0)), stage_count]
    loading = false
    loading_panel.visible = false
    _reset_all()
    # Preserve the complete visible bridge on phones; simplified display is opt-in.
    var has_environment: bool = not current.get("environments", {}).is_empty()
    background_check.disabled = not has_environment
    environment_quality.disabled = not has_environment
    environment_note.text = "背景关闭，不占用环境模型内存。" if has_environment else "原梁桥不含桥址背景，可使用上方三种简约底色。"
    _fetch_analysis(ticket, id)
    _layout_ui()
    _publish_qa_state()
    print("BRIDGE_WEB_MODEL_READY: %s; meshes=%d; stages=%d" % [id, meshes.size(), stage_count])
    model_loaded.emit(id, true)

func _fetch_analysis(ticket: int, id: String) -> void:
    force_error = "正在读取结构信息…"
    _sync_overlay()
    var path := str(current.get("analysis_url", "analysis/" + id + ".json"))
    analysis_request = _request_new("analysis", path)
    analysis_request.request_completed.connect(_on_analysis_completed.bind(ticket, analysis_request), CONNECT_ONE_SHOT)
    var error := analysis_request.request(_url(path))
    if error != OK:
        force_error = "结构信息暂不可用，模型观察不受影响。"
        _sync_overlay()

func _on_analysis_completed(result: int, code: int, _headers: PackedStringArray, body: PackedByteArray, ticket: int, request: HTTPRequest) -> void:
    if ticket != load_ticket or request != analysis_request: return
    analysis_request = null
    request.queue_free()
    if result != HTTPRequest.RESULT_SUCCESS or code != 200:
        force_error = "未能读取结构信息，模型观察不受影响。"
        _sync_overlay()
        return
    var data = JSON.parse_string(body.get_string_from_utf8())
    if not data is Dictionary or str(data.get("schema", "")) != "bridge-force-overlay/1" or str(data.get("model_id", "")) != str(current.id) or str(data.get("coordinate_system", "")) != "bridge_xyz_z_up" or not str(data.get("kind", "")) in ["teaching_demo", "analysis_result"] or not data.get("curves", null) is Array:
        force_error = "结构数据格式、桥型或坐标不匹配。"
        _sync_overlay()
        return
    force_error = _validate_force_numbers(data)
    if not force_error.is_empty():
        _sync_overlay()
        return
    force_data = data
    for curve in force_data.curves: _build_force_curve(curve, float(force_data.display_scale))
    _sync_overlay()
    _publish_qa_state()

func _release_environment() -> void:
    environment_ticket += 1
    _cancel_request(environment_request)
    environment_request = null
    loading_environment = false
    loaded_environment_quality = ""
    if is_instance_valid(environment_asset): environment_asset.free()
    environment_asset = null

func _set_background(value: bool) -> void:
    if not is_instance_valid(background_check): return
    background_check.set_pressed_no_signal(value)
    _release_environment()
    if not value:
        environment_note.text = "背景已关闭，环境模型内存已释放。"
        if not loading: loading_panel.visible = false
        _publish_qa_state()
        return
    if not is_instance_valid(asset) or current.get("environments", {}).is_empty():
        background_check.set_pressed_no_signal(false)
        environment_note.text = "当前桥型没有可下载的桥址背景。"
        return
    var quality := "low" if environment_quality.selected == 0 else "standard"
    var config: Dictionary = current.environments.get(quality, {})
    if config.is_empty():
        background_check.set_pressed_no_signal(false)
        environment_note.text = "该画质的背景不可用。"
        return
    expected_environment_bytes = int(config.get("bytes", 0))
    var env_ticket := environment_ticket
    var model_ticket := load_ticket
    loading_environment = true
    var path := str(config.get("url", config.get("path", "")))
    environment_request = _request_new("environment", path)
    environment_request.request_completed.connect(_on_environment_completed.bind(model_ticket, env_ticket, quality, environment_request), CONNECT_ONE_SHOT)
    loading_panel.visible = true
    retry_button.visible = false
    cancel_button.visible = true
    download_bar.value = 0
    environment_note.text = "正在下载 %s 环境…" % quality
    var error := environment_request.request(_url(path))
    if error != OK: _network_failure("environment", "背景请求无法开始，请重试。")
    _publish_qa_state()

func _change_environment_quality() -> void:
    if background_check.button_pressed: _set_background(true)

func _on_environment_completed(result: int, code: int, _headers: PackedStringArray, body: PackedByteArray, model_ticket: int, env_ticket: int, quality: String, request: HTTPRequest) -> void:
    if model_ticket != load_ticket or env_ticket != environment_ticket or request != environment_request: return
    environment_request = null
    request.queue_free()
    if result != HTTPRequest.RESULT_SUCCESS or code != 200:
        _network_failure("environment", "背景下载失败（HTTP %d），桥主体仍可操作。" % code)
        background_loaded.emit(false)
        return
    loading_label.text = "背景已下载，正在整理材质…"
    download_bar.value = 100
    await get_tree().process_frame
    if model_ticket != load_ticket or env_ticket != environment_ticket: return
    var document := GLTFDocument.new()
    var state := GLTFState.new()
    var error := document.append_from_buffer(body, "", state)
    body.clear()
    if error != OK:
        _network_failure("environment", "背景解析失败，桥主体仍可操作。")
        background_loaded.emit(false)
        return
    environment_asset = document.generate_scene(state)
    state = null
    document = null
    environment_asset.name = "OptionalBridgeEnvironment"
    add_child(environment_asset)
    _prepare_environment_materials(environment_asset)
    loading_environment = false
    loaded_environment_quality = quality
    environment_note.text = "已显示 %s 环境 · 可关闭并释放内存。" % ("512" if quality == "low" else "1K")
    loading_panel.visible = false
    _publish_qa_state()
    print("BRIDGE_WEB_ENV_READY: %s %s" % [str(current.id), quality])
    background_loaded.emit(true)

func _prepare_environment_materials(node: Node) -> void:
    var env_meshes: Array[MeshInstance3D] = []
    _collect_meshes(node, env_meshes)
    # The inherited material helper only consumes this list. Restore immediately;
    # environment nodes never join semantic picking/staging/group collections.
    var body_meshes: Array[MeshInstance3D] = meshes
    meshes = env_meshes
    _prepare_materials()
    meshes = body_meshes

func _collect_meshes(node: Node, target: Array[MeshInstance3D]) -> void:
    if node is MeshInstance3D: target.append(node)
    for child in node.get_children(): _collect_meshes(child, target)

func _network_failure(kind: String, message: String) -> void:
    last_failure_kind = kind
    if kind == "model": loading = false
    if kind == "environment": loading_environment = false
    loading_panel.visible = true
    loading_label.text = message
    retry_button.visible = true
    cancel_button.visible = true
    if kind == "manifest": chooser_note.text = message
    status.text = message
    print("BRIDGE_WEB_LOAD_FAILED: " + kind + " " + message)
    _publish_qa_state()

func _retry_download() -> void:
    match last_failure_kind:
        "manifest": _fetch_manifest()
        "environment": _set_background(true)
        _: _load_model(last_model_id)

func _cancel_loading() -> void:
    if loading or last_failure_kind == "model":
        load_ticket += 1
        _cancel_request(model_request)
        _cancel_request(analysis_request)
        model_request = null
        analysis_request = null
        loading = false
        _show_chooser()
    elif loading_environment or last_failure_kind == "environment":
        _set_background(false)
    loading_panel.visible = false
    last_failure_kind = ""
    _publish_qa_state()

func _process(delta: float) -> void:
    super._process(delta)
    progress_clock += delta
    qa_clock += delta
    if progress_clock > 0.12:
        progress_clock = 0
        var request := model_request if is_instance_valid(model_request) else environment_request
        if is_instance_valid(request):
            var received := request.get_downloaded_bytes()
            var total := request.get_body_size()
            if total <= 0: total = expected_model_bytes if request == model_request else expected_environment_bytes
            var title := str(current.get("name", "模型")) if request == model_request else "桥址背景"
            if total > 0:
                download_bar.value = clampf(100.0 * received / total, 0, 100)
                loading_label.text = "下载%s  %.1f / %.1f MB（%.0f%%）" % [title, received / 1000000.0, total / 1000000.0, download_bar.value]
            else:
                loading_label.text = "下载%s  已接收 %.1f MB" % [title, received / 1000000.0]
    if qa_enabled and qa_clock > 0.5:
        qa_clock = 0
        _publish_qa_state()

func _blocks_touch(position: Vector2) -> bool:
    for control in [drawer, chooser, bottom_bar, loading_panel]:
        if is_instance_valid(control) and control.visible and control.get_global_rect().has_point(position): return true
    return false

func _scroll_at(position: Vector2) -> ScrollContainer:
    if loading_panel.visible and loading_panel.get_global_rect().has_point(position): return null
    for pair in [[chooser, chooser_scroll], [drawer, drawer_scroll]]:
        if pair[0].visible and pair[1].get_global_rect().has_point(position):
            # Sliders retain their native horizontal drag and button taps retain
            # native GUI handling until the gesture becomes a vertical scroll.
            for slider in [stage_slider, explosion_slider]:
                if slider.is_visible_in_tree() and slider.get_global_rect().has_point(position): return null
            return pair[1]
    return null

func _input(event: InputEvent) -> void:
    super._input(event)
    if event is InputEventScreenTouch:
        suppress_mouse_until = Time.get_ticks_msec() + 750
        if event.pressed:
            var scroll := _scroll_at(event.position)
            if is_instance_valid(scroll):
                ui_touches[event.index] = {"scroll":scroll, "start":event.position, "dragging":false}
                return
            if _blocks_touch(event.position) or loading or not is_instance_valid(asset): return
            touch_points[event.index] = event.position
            if touch_points.size() == 1:
                touch_start = event.position
                touch_started_at = Time.get_ticks_msec()
                touch_moved = false
                touch_was_multi = false
            else: touch_was_multi = true
            get_viewport().set_input_as_handled()
        elif ui_touches.has(event.index):
            var gesture: Dictionary = ui_touches[event.index]
            if gesture.dragging:
                gesture.scroll.propagate_notification(Control.NOTIFICATION_SCROLL_END)
            ui_touches.erase(event.index)
            # Let GUI receive the final release as well, clearing its touch state.
            return
        elif touch_points.has(event.index):
            touch_points.erase(event.index)
            if touch_points.is_empty() and not touch_moved and not touch_was_multi and not event.canceled and Time.get_ticks_msec() - touch_started_at < 500:
                _pick(event.position)
            get_viewport().set_input_as_handled()
    elif event is InputEventScreenDrag and ui_touches.has(event.index):
        suppress_mouse_until = Time.get_ticks_msec() + 750
        var gesture: Dictionary = ui_touches[event.index]
        if not gesture.dragging and absf(event.position.y - gesture.start.y) > 8 * ui_scale:
            gesture.dragging = true
            # Use the same notification as native ScrollContainer: BaseButton
            # clears its pending press/touch without toggling the current state.
            gesture.scroll.propagate_notification(Control.NOTIFICATION_SCROLL_BEGIN)
        if gesture.dragging:
            var scroll: ScrollContainer = gesture.scroll
            scroll.scroll_vertical -= int(round(event.relative.y / ui_scale))
            get_viewport().set_input_as_handled()
    elif event is InputEventScreenDrag and touch_points.has(event.index):
        suppress_mouse_until = Time.get_ticks_msec() + 750
        if touch_points.size() >= 2:
            var ids := touch_points.keys()
            var previous_center: Vector2 = (touch_points[ids[0]] + touch_points[ids[1]]) * 0.5
            var previous_distance: float = touch_points[ids[0]].distance_to(touch_points[ids[1]])
            touch_points[event.index] = event.position
            var next_center: Vector2 = (touch_points[ids[0]] + touch_points[ids[1]]) * 0.5
            var next_distance: float = touch_points[ids[0]].distance_to(touch_points[ids[1]])
            if next_distance > 8:
                camera_distance = clampf(camera_distance * previous_distance / next_distance, 1.5, 9000)
            var shift := next_center - previous_center
            var world_per_pixel := 2.0 * camera_distance * tan(deg_to_rad(camera.fov * 0.5)) / get_viewport().get_visible_rect().size.y
            camera_focus += (-camera.global_basis.x * shift.x + camera.global_basis.y * shift.y) * world_per_pixel
            touch_moved = true
        else:
            touch_points[event.index] = event.position
            touch_moved = touch_moved or event.position.distance_to(touch_start) > 7 * ui_scale
            yaw -= event.relative.x / ui_scale * 0.006
            pitch = clampf(pitch + event.relative.y / ui_scale * 0.006, -1.2, 1.55)
            camera.projection = Camera3D.PROJECTION_PERSPECTIVE
        _camera_update()
        get_viewport().set_input_as_handled()

func _unhandled_input(event: InputEvent) -> void:
    if chooser.visible or loading: return
    if (event is InputEventMouseButton or event is InputEventMouseMotion) and Time.get_ticks_msec() < suppress_mouse_until: return
    super._unhandled_input(event)

func _notification(what: int) -> void:
    if what == NOTIFICATION_WM_WINDOW_FOCUS_OUT:
        touch_points.clear()
        ui_touches.clear()
        rotating = false
        panning = false

func _pick(position: Vector2) -> void:
    var origin := camera.project_ray_origin(position)
    var direction := camera.project_ray_normal(position)
    var candidates: Array = []
    for mesh in meshes:
        if not mesh.is_visible_in_tree(): continue
        var inv := mesh.global_transform.affine_inverse()
        var local_origin := inv * origin
        var local_direction := (inv.basis * direction).normalized()
        var entry = mesh.get_aabb().intersects_ray(local_origin, local_direction)
        if entry is Vector3: candidates.append({"mesh":mesh, "origin":local_origin, "direction":local_direction, "distance":origin.distance_to(mesh.global_transform * entry)})
    candidates.sort_custom(func(a, b): return a.distance < b.distance)
    var closest: float = INF
    var best: MeshInstance3D
    for candidate in candidates:
        if float(candidate.distance) > closest + 0.001: break
        var mesh: MeshInstance3D = candidate.mesh
        for surface in _mesh_triangles(mesh):
            var vertices: PackedVector3Array = surface[0]
            var indices: PackedInt32Array = surface[1] if surface[1] != null else PackedInt32Array()
            var count := indices.size() if not indices.is_empty() else vertices.size()
            for index in range(0, count - 2, 3):
                var a := indices[index] if not indices.is_empty() else index
                var b := indices[index + 1] if not indices.is_empty() else index + 1
                var c := indices[index + 2] if not indices.is_empty() else index + 2
                var hit = Geometry3D.ray_intersects_triangle(candidate.origin, candidate.direction, vertices[a], vertices[b], vertices[c])
                if hit is Vector3:
                    var distance_to_hit := origin.distance_to(mesh.global_transform * hit)
                    if distance_to_hit < closest:
                        closest = distance_to_hit
                        best = mesh
    _select(best)
    _publish_qa_state()

func _snapshot() -> Dictionary:
    var visible := 0
    for mesh in meshes:
        if mesh.visible: visible += 1
    return {"bridge_id":str(current.get("id", "")), "loading":loading, "manifest_count":manifest.size(), "component_count":meshes.size(), "visible_count":visible, "stage":stage_index, "stage_count":stage_count, "explosion":explosion_slider.value, "environment_loading":loading_environment, "environment_loaded":is_instance_valid(environment_asset), "environment_checked":background_check.button_pressed, "environment_quality":loaded_environment_quality, "environment_available":not current.get("environments", {}).is_empty(), "analysis_ready":not force_data.is_empty(), "analysis_visible":overlay_root.visible, "selected_id":str(_record(selected).get("id", "")) if is_instance_valid(selected) else "", "isolated_id":isolated_id, "hidden_count":hidden_ids.size(), "triangle_cache_count":triangles_cache.size(), "mobile_layout":mobile_layout, "drawer_open":drawer.visible, "chooser_visible":chooser.visible, "camera_distance":camera_distance, "camera_yaw":yaw, "camera_pitch":pitch, "camera_focus":[camera_focus.x,camera_focus.y,camera_focus.z], "viewport":[get_viewport().get_visible_rect().size.x,get_viewport().get_visible_rect().size.y], "requests":requested_urls, "failure":last_failure_kind, "fps":Engine.get_frames_per_second(), "static_memory":OS.get_static_memory_usage()}

func _install_qa_bridge() -> void:
    qa_window = JavaScriptBridge.get_interface("window")
    qa_callback = JavaScriptBridge.create_callback(_on_qa_command)
    qa_window.bridgeLabQA = qa_callback
    _publish_qa_state()

func _publish_qa_state() -> void:
    if qa_enabled and OS.has_feature("web"):
        var state := _snapshot()
        state.merge({"drawer_scroll":drawer_scroll.scroll_vertical, "chooser_scroll":chooser_scroll.scroll_vertical, "ui_scale":ui_scale, "layout_size":[layout_size.x, layout_size.y], "camera_near":camera.near, "camera_far":camera.far, "webkit":webkit_browser, "msaa":get_viewport().msaa_3d})
        JavaScriptBridge.eval("window.bridgeLabState = " + JSON.stringify(state) + ";", true)

func _on_qa_command(arguments: Array) -> void:
    if not qa_enabled or arguments.is_empty(): return
    var action := str(arguments[0])
    var arg: Variant = arguments[1] if arguments.size() > 1 else null
    match action:
        "load": _load_model(str(arg))
        "stage": _set_stage(int(arg))
        "explode": explosion_slider.value = float(arg)
        "background": _set_background(bool(arg))
        "quality":
            environment_quality.select(0 if str(arg) == "low" else 1)
            _change_environment_quality()
        "group":
            var item: Variant = {"key":str(arg.key), "visible":bool(arg.visible)} if arg is JavaScriptObject else JSON.parse_string(str(arg))
            if item is Dictionary and group_enabled.has(str(item.get("key", ""))): _set_group(str(item.key), bool(item.get("visible", true)))
        "select":
            for mesh in meshes:
                if str(_record(mesh).id) == str(arg):
                    _select(mesh)
                    break
        "isolate": _isolate_selected()
        "hide": _hide_selected()
        "restore": _restore_filters()
        "retry": _retry_download()
        "cancel": _cancel_loading()
        "analysis": analysis_check.button_pressed = bool(arg)
        "reset": _reset_all()
        "restart": _restart_construction()
        "pause": _stop_playback()
        "drawer":
            drawer_open = bool(arg)
            chooser.visible = false
            _layout_ui()
        "chooser": _show_chooser()
        "detail": _detail_view()
        "backdrop": _set_backdrop(int(arg))
    _publish_qa_state()

func _network_smoke() -> void:
    _check(requested_urls.size() == 1, "initial request is manifest only")
    for item in manifest:
        _load_model(str(item.id))
        var response: Array = await model_loaded
        _check(bool(response[1]), "HTTP model load")
        if not bool(response[1]): continue
        _check(meshes.size() > 100, "semantic body meshes")
        _check(not is_instance_valid(environment_asset), "background not loaded by default")
        _check(stage_index == stage_count - 1, "construction restored on switch")
        _check(triangles_cache.is_empty() and hidden_ids.is_empty(), "selection caches released on switch")
        var sample: MeshInstance3D
        for mesh in meshes:
            if str(_record(mesh).category) == "03_Deck" and mesh.visible:
                sample = mesh
                break
        if sample == null: continue
        var record := _record(sample)
        _set_group(str(record.category), false)
        _set_stage(0)
        _completed_bridge()
        _check(not sample.visible, "stage scrubbing preserves group hide")
        _restore_filters()
        _select(sample)
        _hide_selected()
        _set_stage(0)
        _completed_bridge()
        _check(not sample.visible, "stage scrubbing preserves individual hide")
        _restore_filters()
        explosion_slider.value = 0.75
        _check(sample.position.distance_to(record.origin) > 0.01, "explosion applied")
        explosion_slider.value = 0
        _check(sample.position.distance_to(record.origin) < 0.001, "explosion restored")
        _restart_construction()
        _stop_playback()
        for mesh in meshes:
            var r := _record(mesh)
            _check(mesh.visible == (int(r.stage) <= 0 and int(r.end_stage) >= 0), "initial-stage component " + str(r.id))
        _completed_bridge()
        for mesh in meshes:
            var r := _record(mesh)
            if int(r.end_stage) < stage_count - 1: _check(not mesh.visible, "temporary structure exits " + str(r.id))
        var analysis_wait := 0
        while is_instance_valid(analysis_request) and analysis_wait < 600:
            await get_tree().process_frame
            analysis_wait += 1
        _check(not force_data.is_empty(), "HTTP force data loaded")
        if not force_data.is_empty():
            analysis_check.button_pressed = true
            _check(overlay_root.visible, "force overlay on completed bridge")
            explosion_slider.value = 0.3
            _check(not overlay_root.visible, "force overlay suppressed in explosion")
            explosion_slider.value = 0
            _set_stage(0)
            _check(not overlay_root.visible, "force overlay suppressed in construction")
            _completed_bridge()
        if not current.get("environments", {}).is_empty():
            _set_background(true)
            var environment_ok: bool = await background_loaded
            _check(environment_ok and is_instance_valid(environment_asset), "optional environment HTTP load")
            _check(loaded_environment_quality == "low", "512 environment selected")
            _set_background(false)
            _check(not is_instance_valid(environment_asset) and not is_instance_valid(environment_request), "environment released on hide")
        else: _check(background_check.disabled, "girder unavailable background disabled")
        _select(sample)
        _hide_selected()
        explosion_slider.value = 0.4
    var report := {"passed":test_failures.is_empty(), "checks":test_results, "failures":test_failures, "state":_snapshot(), "timestamp_utc":Time.get_datetime_string_from_system(true)}
    var report_path := ProjectSettings.globalize_path("res://../docs/godot-web-http-smoke.json")
    for arg in OS.get_cmdline_user_args():
        if arg.begins_with("--report-path="): report_path = arg.trim_prefix("--report-path=")
    var file := FileAccess.open(report_path, FileAccess.WRITE)
    if file: file.store_string(JSON.stringify(report, "  "))
    print("BRIDGE_WEB_HTTP_SMOKE_" + ("OK" if test_failures.is_empty() else "FAILED") + ": %d checks, %d failures" % [test_results.size(), test_failures.size()])
    get_tree().quit(0 if test_failures.is_empty() else 1)
