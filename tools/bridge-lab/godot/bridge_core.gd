extends Node3D
## Original geometry is never changed. Visibility is the intersection of stage,
## group filters, individual filters, and isolation. Force diagrams use bridge xyz.

const GROUP_LABELS = {
    "01_Foundations":"基础 / 承台 / 锚碇", "02_Towers":"桥塔 / 墩台 / 拱肋",
    "03_Deck":"主梁 / 桥面系", "04_Cables":"拉索 / 主缆 / 吊杆",
    "05_Secondary":"横梁 / 联结系", "06_Furniture":"护栏 / 灯具 / 附属",
    "07_Surface":"铺装 / 标线", "08_Temporary":"施工临时结构",
    "90_Environment":"地形 / 水面", "91_Traffic":"车辆 / 比例参照",
    "01_Girders":"预制 T 梁", "02_Diaphragms":"横隔板 / 连续段",
    "04_Bearings":"支座 / 垫石", "05_Substructure":"墩台 / 盖梁",
    "06_Foundations":"桩基 / 承台", "07_Furniture":"护栏 / 排水 / 伸缩缝",
    "08_Rebar":"代表性配筋 / 孔道", "09_Markings":"道路标线"
}
const ACCENT = Color("7ec9c4")
const MUTED = Color("8fa5b4")
var asset: Node3D
var camera: Camera3D
var manifest: Array = []
var current: Dictionary = {}
var models_by_id: Dictionary = {}
var meshes: Array[MeshInstance3D] = []
var records: Dictionary = {}
var groups: Dictionary = {}
var checks: Dictionary = {}
var group_enabled: Dictionary = {}
var hidden_ids: Dictionary = {}
var isolated_id: String = ""
var extras_by_name: Dictionary = {}
var triangles_cache: Dictionary = {}
var selected: MeshInstance3D
var selected_overlay: Material
var camera_focus := Vector3.ZERO
var camera_distance: float = 600.0
var yaw: float = 1.1
var pitch: float = 0.34
var rotating: bool = false
var panning: bool = false
var dragged: bool = false
var auto_rotate: bool = false
var click_start := Vector2.ZERO
var playing: bool = false
var play_clock: float = 0.0
var stage_index: int = 0
var stage_count: int = 1
var loading: bool = false
var test_failures: Array[String] = []
var test_results: Array = []
var overlay_root: Node3D
var overlay_bindings: Array = []
var force_data: Dictionary = {}
var force_error: String = ""
var force_anchors: Array[Vector3] = []
var analysis_check: CheckBox
var analysis_note: Label
var subtitle: Label
var model_title: Label
var stage_title: Label
var stage_description: Label
var stage_counter: Label
var detail: Label
var status: Label
var summary: Label
var group_box: VBoxContainer
var model_menu: OptionButton
var explosion_slider: HSlider
var stage_slider: HSlider
var play_button: Button
var auto_button: Button
var reset_filters_button: Button
var screenshot_index: int = 0

func V(a: Variant) -> Vector3:
    return Vector3(float(a[0]), float(a[2]), -float(a[1]))

func _world() -> void:
    var env := Environment.new()
    env.background_mode = Environment.BG_SKY
    var sky_material := ProceduralSkyMaterial.new()
    sky_material.sky_top_color = Color("304c61")
    sky_material.sky_horizon_color = Color("8297a4")
    sky_material.ground_bottom_color = Color("718994")
    sky_material.ground_horizon_color = Color("8297a4")
    sky_material.sky_energy_multiplier = 0.7
    sky_material.ground_energy_multiplier = 0.7
    var sky := Sky.new()
    sky.sky_material = sky_material
    env.sky = sky
    env.ambient_light_source = Environment.AMBIENT_SOURCE_COLOR
    env.ambient_light_color = Color("d1e4ea")
    env.ambient_light_energy = 0.30
    env.tonemap_mode = Environment.TONE_MAPPER_FILMIC
    env.adjustment_enabled = true
    env.adjustment_brightness = 0.88
    env.adjustment_saturation = 0.78
    var world := WorldEnvironment.new()
    world.environment = env
    add_child(world)
    var light := DirectionalLight3D.new()
    light.rotation_degrees = Vector3(-38, -28, 0)
    light.light_color = Color("f6f4ee")
    light.light_energy = 0.72
    light.shadow_enabled = true
    light.directional_shadow_max_distance = 2500
    light.directional_shadow_mode = DirectionalLight3D.SHADOW_PARALLEL_4_SPLITS
    light.shadow_bias = 0.035
    add_child(light)
    var fill := DirectionalLight3D.new()
    fill.rotation_degrees = Vector3(-28, 152, 0)
    fill.light_color = Color("afcfe5")
    fill.light_energy = 0.16
    add_child(fill)
    camera = Camera3D.new()
    camera.fov = 40
    camera.near = 0.15
    camera.far = 16000
    add_child(camera)
    camera.current = true
    overlay_root = Node3D.new()
    overlay_root.name = "AnalysisOverlay"
    add_child(overlay_root)

func _label(value: String, size: int = 14, color: Color = Color("deebef")) -> Label:
    var l := Label.new()
    l.text = value
    l.add_theme_font_size_override("font_size", size)
    l.add_theme_color_override("font_color", color)
    return l

func _button(value: String, callback: Callable, tooltip: String = "") -> Button:
    var b := Button.new()
    b.text = value
    b.tooltip_text = tooltip
    b.custom_minimum_size.y = 33
    b.size_flags_horizontal = Control.SIZE_EXPAND_FILL
    b.pressed.connect(callback)
    return b

func _style(color: Color, margin: int = 12) -> StyleBoxFlat:
    var s := StyleBoxFlat.new()
    s.bg_color = color
    s.set_corner_radius_all(8)
    s.content_margin_left = margin
    s.content_margin_right = margin
    s.content_margin_top = margin
    s.content_margin_bottom = margin
    return s

func _row(parent: Node, entries: Array) -> HBoxContainer:
    var row := HBoxContainer.new()
    row.add_theme_constant_override("separation", 6)
    parent.add_child(row)
    for e in entries: row.add_child(_button(str(e[0]), e[1]))
    return row

func _section(parent: Node, text_value: String) -> void:
    var l := _label(text_value, 14, ACCENT)
    l.add_theme_constant_override("outline_size", 0)
    parent.add_child(l)

func _index_nodes(node: Node, inherited_group: String = "") -> void:
    var node_name := str(node.name)
    var category := inherited_group
    if GROUP_LABELS.has(node_name) or current.get("groups", {}).has(node_name): category = node_name
    var extras: Dictionary = extras_by_name.get(node_name, {})
    if node.has_meta("extras") and node.get_meta("extras") is Dictionary:
        extras.merge(node.get_meta("extras"), true)
    category = str(extras.get("category", category))
    if node is MeshInstance3D:
        if category.is_empty(): category = "05_Secondary"
        var id := str(extras.get("component_id", node_name))
        var record := {
            "id":id, "category":category, "label":str(extras.get("label", node_name)),
            "stage":int(extras.get("stage", 0)), "end_stage":int(extras.get("end_stage", 99)),
            "origin":node.position, "global_origin":node.global_position
        }
        meshes.append(node)
        records[node.get_instance_id()] = record
        if not groups.has(category): groups[category] = []
        groups[category].append(node)
    for child in node.get_children(): _index_nodes(child, category)

func _group_label(key: String) -> String:
    return str(current.get("groups", {}).get(key, GROUP_LABELS.get(key, key)))

func _prepare_materials() -> void:
    # Runtime GLTF imports can lack mipmaps. Generate them once per shared texture
    # so meter-scale concrete and ground detail does not sparkle in distant views.
    var seen_materials: Dictionary = {}
    var seen_textures: Dictionary = {}
    for mesh in meshes:
        for index in range(mesh.mesh.get_surface_count()):
            var material = mesh.get_active_material(index)
            if not material is BaseMaterial3D or seen_materials.has(material.get_instance_id()): continue
            seen_materials[material.get_instance_id()] = true
            material.texture_filter = BaseMaterial3D.TEXTURE_FILTER_LINEAR_WITH_MIPMAPS_ANISOTROPIC
            for channel in [BaseMaterial3D.TEXTURE_ALBEDO, BaseMaterial3D.TEXTURE_NORMAL, BaseMaterial3D.TEXTURE_ROUGHNESS, BaseMaterial3D.TEXTURE_METALLIC]:
                var texture = material.get_texture(channel)
                if not texture is Texture2D: continue
                if seen_textures.has(texture.get_instance_id()):
                    material.set_texture(channel, seen_textures[texture.get_instance_id()])
                    continue
                var pixels: Image = texture.get_image()
                if pixels == null or pixels.has_mipmaps(): continue
                if pixels.is_compressed(): pixels.decompress()
                if pixels.generate_mipmaps(channel == BaseMaterial3D.TEXTURE_NORMAL) == OK:
                    var filtered := ImageTexture.create_from_image(pixels)
                    seen_textures[texture.get_instance_id()] = filtered
                    material.set_texture(channel, filtered)

func _record(mesh: MeshInstance3D) -> Dictionary:
    return records.get(mesh.get_instance_id(), {})

func _set_group(key: String, value: bool) -> void:
    group_enabled[key] = value
    if checks.has(key): checks[key].set_pressed_no_signal(value)
    _apply_visibility()

func _apply_visibility() -> void:
    var count := 0
    for mesh in meshes:
        var r := _record(mesh)
        mesh.visible = bool(group_enabled.get(r.category, true)) and stage_index >= int(r.stage) and stage_index <= int(r.end_stage) and not hidden_ids.has(r.id) and (isolated_id.is_empty() or isolated_id == r.id)
        if mesh.visible: count += 1
    if is_instance_valid(selected) and not selected.visible: _clear_selected()
    status.text = "可见 %d / %d 构件   ·   %s   ·   教学构造模型" % [count, meshes.size(), str(current.get("name", ""))]
    if not hidden_ids.is_empty(): status.text += "   ·   隐藏 %d 个所选构件" % hidden_ids.size()
    if not isolated_id.is_empty(): status.text += "   ·   隔离观察中"
    _sync_overlay()

func _restore_filters() -> void:
    hidden_ids.clear()
    isolated_id = ""
    for key in group_enabled:
        group_enabled[key] = true
        checks[key].set_pressed_no_signal(true)
    _apply_visibility()

func _foundation_view() -> void:
    isolated_id = ""
    if group_enabled.has("90_Environment"): _set_group("90_Environment", false)
    if group_enabled.has("91_Traffic"): _set_group("91_Traffic", false)
    pitch = 0.13
    _camera_update()

func _set_stage(index: int) -> void:
    stage_index = clampi(index, 0, stage_count - 1)
    stage_slider.set_value_no_signal(stage_index)
    var stages: Array = current.get("stages", [])
    var stage_data: Dictionary = stages[stage_index] if not stages.is_empty() else {"title":"成桥展示", "description":"原梁桥模型未提供逐构件安装阶段。"}
    stage_title.text = str(stage_data.get("title", "阶段 " + str(stage_index + 1)))
    stage_counter.text = "%02d / %02d" % [stage_index + 1, stage_count]
    stage_description.text = str(stage_data.get("description", "施工工序概念演示"))
    _apply_visibility()

func _stop_playback() -> void:
    playing = false
    play_clock = 0
    if is_instance_valid(play_button): play_button.text = "播放"

func _toggle_play() -> void:
    if stage_count <= 1: return
    if playing:
        _stop_playback()
    else:
        if stage_index >= stage_count - 1: _set_stage(0)
        playing = true
        play_clock = 0
        play_button.text = "暂停"

func _restart_construction() -> void:
    _clear_selected()
    _restore_filters()
    explosion_slider.value = 0
    _set_stage(0)
    _stop_playback()
    if stage_count > 1:
        playing = true
        play_button.text = "暂停"

func _completed_bridge() -> void:
    _stop_playback()
    _set_stage(stage_count - 1)

func _explosion_shift(category: String, record: Dictionary) -> Vector3:
    var scale := maxf(10.0, float(current.get("length", 300)) * 0.035)
    var steps := {"01_Foundations":-0.7, "02_Towers":0.1, "03_Deck":0.8, "04_Cables":2.1, "05_Secondary":1.5, "06_Furniture":2.8, "07_Surface":2.45, "08_Temporary":-0.2, "01_Girders":0.5, "02_Diaphragms":1.2, "04_Bearings":0.2, "05_Substructure":0.0, "06_Foundations":-0.7, "07_Furniture":2.8, "08_Rebar":1.7, "09_Markings":2.45}
    var vertical := float(steps.get(category, 0.0)) * scale
    var lateral: float = 0.0
    if category == "04_Cables" or category == "05_Secondary":
        lateral = signf(float(record.global_origin.z)) * scale * 0.6
    return Vector3(0, vertical, lateral)

func _set_explosion(value: float) -> void:
    for mesh in meshes:
        var r := _record(mesh)
        var world_offset := _explosion_shift(str(r.category), r) * value
        mesh.position = r.origin + mesh.get_parent_node_3d().global_basis.inverse() * world_offset
    _sync_overlay()

func _reset_all() -> void:
    _clear_selected()
    _stop_playback()
    auto_rotate = false
    auto_button.text = "自动旋转"
    explosion_slider.value = 0
    _set_explosion(0)
    _restore_filters()
    _set_stage(stage_count - 1)
    camera_focus = V(current.get("focus", [0, 0, 20]))
    camera_distance = float(current.get("distance", 600)) * 1.12
    yaw = 1.10
    pitch = 0.34
    camera.projection = Camera3D.PROJECTION_PERSPECTIVE
    _camera_update()

func _side_view() -> void:
    yaw = PI / 2
    pitch = 0.0
    camera.projection = Camera3D.PROJECTION_ORTHOGONAL
    _camera_update()

func _top_view() -> void:
    yaw = PI / 2
    pitch = 1.5706
    camera.projection = Camera3D.PROJECTION_ORTHOGONAL
    _camera_update()

func _end_view() -> void:
    yaw = 0
    pitch = 0
    camera.projection = Camera3D.PROJECTION_ORTHOGONAL
    _camera_update()

func _detail_view() -> void:
    var length := float(current.get("length", 300))
    var deck_z := float(current.get("deck_z", 20))
    match str(current.get("id", "")):
        "cable_stayed":
            camera_focus = V([length * 0.25, 0, deck_z + length * 0.048])
            camera_distance = length * 0.33
            yaw = 0.94
            pitch = 0.28
        "suspension":
            camera_focus = V([length * 0.224, 0, deck_z + 31])
            camera_distance = length * 0.18
            yaw = 0.95
            pitch = 0.25
        "arch":
            camera_focus = V([length * 0.5, 0, deck_z - length * 0.042])
            camera_distance = length * 0.34
            yaw = 1.12
            pitch = -0.08
        _:
            camera_focus = V([length * 0.5, 0, deck_z - 5])
            camera_distance = 46
            yaw = 0.98
            pitch = 0.22
    camera.projection = Camera3D.PROJECTION_PERSPECTIVE
    _camera_update()

func _toggle_auto() -> void:
    auto_rotate = not auto_rotate
    auto_button.text = "停止旋转" if auto_rotate else "自动旋转"

func _camera_update() -> void:
    camera.position = camera_focus + camera_distance * Vector3(cos(yaw) * cos(pitch), sin(pitch), sin(yaw) * cos(pitch))
    camera.look_at(camera_focus, Vector3.UP)
    camera.h_offset = -camera_distance * 0.12
    camera.size = camera_distance * 0.68

func _process(delta: float) -> void:
    if loading: return
    if auto_rotate:
        yaw += delta * 0.13
        _camera_update()
    if playing:
        play_clock += delta
        if play_clock >= 2.8:
            play_clock = 0
            if stage_index < stage_count - 1: _set_stage(stage_index + 1)
            else: _stop_playback()

func _input(event: InputEvent) -> void:
    # Release is handled even over UI so drags cannot stick after entering a panel.
    if event is InputEventMouseButton and not event.pressed:
        if event.button_index == MOUSE_BUTTON_LEFT: rotating = false
        if event.button_index in [MOUSE_BUTTON_RIGHT, MOUSE_BUTTON_MIDDLE]: panning = false

func _unhandled_input(event: InputEvent) -> void:
    if loading or not is_instance_valid(asset): return
    if event is InputEventMouseButton:
        if event.button_index == MOUSE_BUTTON_LEFT:
            rotating = event.pressed
            if event.pressed:
                click_start = event.position
                dragged = false
            elif not dragged: _pick(event.position)
        elif event.button_index in [MOUSE_BUTTON_RIGHT, MOUSE_BUTTON_MIDDLE]: panning = event.pressed
        elif event.pressed and event.button_index in [MOUSE_BUTTON_WHEEL_UP, MOUSE_BUTTON_WHEEL_DOWN]:
            camera_distance = clampf(camera_distance * (0.88 if event.button_index == MOUSE_BUTTON_WHEEL_UP else 1 / 0.88), 1.5, 9000)
            _camera_update()
    elif event is InputEventMouseMotion:
        if rotating:
            dragged = dragged or event.position.distance_to(click_start) > 4
            yaw -= event.relative.x * 0.006
            pitch = clampf(pitch + event.relative.y * 0.006, -1.20, 1.5706)
            camera.projection = Camera3D.PROJECTION_PERSPECTIVE
            _camera_update()
        elif panning:
            camera_focus += (-camera.global_basis.x * event.relative.x + camera.global_basis.y * event.relative.y) * camera_distance * 0.0011
            _camera_update()
    elif event is InputEventKey and event.pressed and not event.echo:
        if event.keycode == KEY_R: _reset_all()
        elif event.keycode == KEY_F: _focus_selected()
        elif event.keycode == KEY_SPACE: _toggle_play()
        elif event.keycode == KEY_ESCAPE: _restore_filters()

func _mesh_triangles(mesh: MeshInstance3D) -> Array:
    var key := mesh.mesh.get_instance_id()
    if triangles_cache.has(key): return triangles_cache[key]
    var surfaces: Array = []
    for i in range(mesh.mesh.get_surface_count()):
        if mesh.mesh.surface_get_primitive_type(i) != Mesh.PRIMITIVE_TRIANGLES: continue
        var arrays := mesh.mesh.surface_get_arrays(i)
        surfaces.append([arrays[Mesh.ARRAY_VERTEX], arrays[Mesh.ARRAY_INDEX]])
    triangles_cache[key] = surfaces
    return surfaces

func _pick(position: Vector2) -> void:
    var origin := camera.project_ray_origin(position)
    var direction := camera.project_ray_normal(position)
    var best: MeshInstance3D = null
    var closest: float = INF
    for mesh in meshes:
        if not mesh.is_visible_in_tree(): continue
        var inv := mesh.global_transform.affine_inverse()
        var local_origin := inv * origin
        var local_direction := (inv.basis * direction).normalized()
        var coarse = mesh.get_aabb().intersects_ray(local_origin, local_direction)
        if not coarse is Vector3: continue
        for surface in _mesh_triangles(mesh):
            var vertices: PackedVector3Array = surface[0]
            var indices: PackedInt32Array = surface[1] if surface[1] != null else PackedInt32Array()
            var n: int = indices.size() if not indices.is_empty() else vertices.size()
            for i in range(0, n - 2, 3):
                var a: int = indices[i] if not indices.is_empty() else i
                var b: int = indices[i + 1] if not indices.is_empty() else i + 1
                var c: int = indices[i + 2] if not indices.is_empty() else i + 2
                var hit = Geometry3D.ray_intersects_triangle(local_origin, local_direction, vertices[a], vertices[b], vertices[c])
                if hit is Vector3:
                    var d := origin.distance_to(mesh.global_transform * hit)
                    if d < closest:
                        closest = d
                        best = mesh
    _select(best)

func _select(mesh: MeshInstance3D) -> void:
    _clear_selected()
    if not is_instance_valid(mesh): return
    selected = mesh
    selected_overlay = mesh.material_overlay
    var material := StandardMaterial3D.new()
    material.albedo_color = Color(1, 0.68, 0.24, 0.45)
    material.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
    material.shading_mode = BaseMaterial3D.SHADING_MODE_UNSHADED
    mesh.material_overlay = material
    var r := _record(mesh)
    var world_aabb := mesh.global_transform * mesh.get_aabb()
    detail.text = "%s\n%s · 安装阶段 %d\n外包尺寸 %.2f × %.2f × %.2f m" % [r.label, _group_label(r.category), int(r.stage) + 1, world_aabb.size.x, world_aabb.size.z, world_aabb.size.y]

func _clear_selected() -> void:
    if is_instance_valid(selected): selected.material_overlay = selected_overlay
    selected = null
    selected_overlay = null
    if is_instance_valid(detail): detail.text = "单击构件，查看名称与安装阶段。"

func _focus_selected() -> void:
    if not is_instance_valid(selected):
        detail.text = "请先在模型中单击一个可见构件。"
        return
    var world_aabb := selected.global_transform * selected.get_aabb()
    camera_focus = world_aabb.get_center()
    camera_distance = clampf(world_aabb.size.length() * 2.1, 2.4, 2500)
    camera.projection = Camera3D.PROJECTION_PERSPECTIVE
    _camera_update()

func _isolate_selected() -> void:
    if not is_instance_valid(selected): return
    isolated_id = str(_record(selected).id)
    _apply_visibility()

func _hide_selected() -> void:
    if not is_instance_valid(selected): return
    hidden_ids[str(_record(selected).id)] = true
    _clear_selected()
    _apply_visibility()

func _valid_number(value: Variant) -> bool:
    return (typeof(value) == TYPE_INT or typeof(value) == TYPE_FLOAT) and is_finite(float(value))

func _validate_force_numbers(data: Dictionary) -> String:
    if not _valid_number(data.get("display_scale", null)) or float(data.display_scale) <= 0:
        return "受力图 display_scale 必须为正有限数。"
    if not data.get("units", null) is Dictionary: return "受力图必须声明单位对象。"
    if str(data.units.get("length", "")) != "m": return "受力图几何单位必须为 m。"
    if data.curves.is_empty(): return "受力数据没有曲线。"
    for curve in data.curves:
        if not curve is Dictionary or not curve.get("points", null) is Array: return "受力曲线必须定义 points 数组。"
        if curve.points.size() < 2: return "每条受力曲线至少需要两个点。"
        if str(curve.get("component_id", "")).is_empty() and str(curve.get("category", "")).is_empty(): return "受力曲线必须关联构件或构件组。"
        for p in curve.points:
            if not p is Dictionary or not p.get("position", null) is Array or p.position.size() != 3: return "受力点 position 必须为三维工程坐标。"
            if not _valid_number(p.get("value", null)): return "受力值必须为有限数。"
            if not is_finite(float(p.value) * float(data.display_scale)): return "受力显示比例超出可用数值范围。"
            for coordinate in p.position:
                if not _valid_number(coordinate): return "受力坐标必须为有限数。"
    return ""

func _build_force_curve(curve: Dictionary, scale: float) -> void:
    var curve_root := Node3D.new()
    curve_root.name = "BoundForceCurve"
    overlay_root.add_child(curve_root)
    overlay_bindings.append({"node":curve_root, "component_id":str(curve.get("component_id", "")), "category":str(curve.get("category", "03_Deck"))})
    var base: Array[Vector3] = []
    var top: Array[Vector3] = []
    var largest_value: float = 0
    var largest_index: int = 0
    for p in curve.points:
        if not p.get("position", null) is Array or p.position.size() != 3: continue
        var at := V(p.position)
        var value := float(p.get("value", 0))
        base.append(at)
        force_anchors.append(at)
        top.append(at + Vector3(0, value * scale, 0))
        if absf(value) > absf(largest_value):
            largest_value = value
            largest_index = top.size() - 1
    if base.size() < 2: return
    var material := StandardMaterial3D.new()
    material.shading_mode = BaseMaterial3D.SHADING_MODE_UNSHADED
    material.vertex_color_use_as_albedo = true
    material.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
    material.cull_mode = BaseMaterial3D.CULL_DISABLED
    var ribbon := ImmediateMesh.new()
    ribbon.surface_begin(Mesh.PRIMITIVE_TRIANGLES, material)
    for i in range(base.size() - 1):
        var color := Color(0.94, 0.50, 0.23, 0.64) if top[i].y >= base[i].y else Color(0.28, 0.73, 0.93, 0.64)
        ribbon.surface_set_color(color)
        for point in [base[i], top[i], top[i + 1], base[i], top[i + 1], base[i + 1]]: ribbon.surface_add_vertex(point)
    ribbon.surface_end()
    var node := MeshInstance3D.new()
    node.name = "ForceRibbon"
    node.mesh = ribbon
    node.cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_OFF
    curve_root.add_child(node)
    var edge := ImmediateMesh.new()
    edge.surface_begin(Mesh.PRIMITIVE_LINES, material)
    edge.surface_set_color(Color("ffcc85"))
    for i in range(base.size() - 1):
        edge.surface_add_vertex(top[i])
        edge.surface_add_vertex(top[i + 1])
        edge.surface_add_vertex(base[i])
        edge.surface_add_vertex(base[i + 1])
    edge.surface_end()
    var edge_node := MeshInstance3D.new()
    edge_node.mesh = edge
    curve_root.add_child(edge_node)
    var label := Label3D.new()
    var font: Font = load("res://fonts/NotoSansSC-Regular.ttf")
    label.font = font
    label.font_size = 36
    label.pixel_size = maxf(0.018, float(current.get("length", 300)) * 0.00050)
    label.billboard = BaseMaterial3D.BILLBOARD_ENABLED
    label.modulate = Color("ffdfaa")
    label.outline_modulate = Color("14252f")
    label.outline_size = 10
    label.no_depth_test = true
    label.text = "%s  %+.1f %s" % [str(curve.get("label", "弯矩")), largest_value, str(force_data.get("units", {}).get("moment", "kN·m"))]
    label.position = top[largest_index] + Vector3(0, float(current.get("length", 300)) * 0.025, 0)
    curve_root.add_child(label)

func _curve_binding_visible(binding: Dictionary) -> bool:
    var found := false
    for m in meshes:
        var r := _record(m)
        var matches := str(r.id) == str(binding.component_id) if not str(binding.component_id).is_empty() else str(r.category) == str(binding.category)
        if matches:
            found = true
            if not m.visible: return false
    return found

func _sync_overlay() -> void:
    if not is_instance_valid(analysis_note): return
    if force_data.is_empty():
        overlay_root.visible = false
        analysis_check.disabled = true
        analysis_note.text = force_error
        return
    analysis_check.disabled = false
    var teaching := str(force_data.kind) == "teaching_demo"
    var note := "教学测试曲线 · 非本桥设计结果" if teaching else "外部分析结果 · " + str(force_data.get("load_case", "未标注工况"))
    note += "\n" + str(force_data.get("title", "弯矩叠加"))
    note += "\n纵坐标比例：1 %s → %.4f m" % [str(force_data.get("units", {}).get("moment", "kN·m")), float(force_data.get("display_scale", 0.01))]
    note += "\n橙：正值   蓝：负值（显示约定）"
    var allowed := explosion_slider.value < 0.001 and stage_index == stage_count - 1 and isolated_id.is_empty()
    if not allowed and analysis_check.button_pressed: note += "\n请回到成桥、零爆炸且未隔离的状态。"
    overlay_root.visible = analysis_check.button_pressed and allowed
    var visible_curves := 0
    for binding in overlay_bindings:
        binding.node.visible = _curve_binding_visible(binding)
        if binding.node.visible: visible_curves += 1
    if visible_curves == 0 and analysis_check.button_pressed:
        note += "\n关联构件已隐藏，曲线同步隐藏。"
    analysis_note.text = note

func _check(condition: bool, label_text: String) -> void:
    test_results.append({"check":label_text, "passed":condition, "model":str(current.get("id", ""))})
    if not condition:
        test_failures.append(str(current.get("id", "")) + ": " + label_text)
        push_error("CHECK_FAILED: " + label_text)
