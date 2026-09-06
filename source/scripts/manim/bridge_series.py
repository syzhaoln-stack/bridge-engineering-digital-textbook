"""《智能桥梁工程》数字教材 Manim 微课系列。

统一约定：白底、中文教材体、桥轴 x/横桥向 y/竖向 z；
动画仅表达一个核心关系，不代替规范验算。
"""

from __future__ import annotations

import json
import math
import os
from pathlib import Path

import numpy as np
from manim import *


INK = "#17324D"
BLUE = "#126F8C"
GREEN = "#187466"
RED = "#C84A3F"
GREY = "#7B909B"
LIGHT = "#E8F0F3"
PALE_BLUE = "#DCEEF3"
PALE_GREEN = "#E1F0EB"
PALE_RED = "#F7E6E2"
WHITE_BG = "#FFFFFF"
FONT = os.getenv("BRIDGE_MANIM_FONT", "Microsoft YaHei")
PACE = float(os.getenv("BRIDGE_MANIM_PACE", "2.0"))


def ctext(text: str, size: int = 30, color: str = INK, weight=NORMAL) -> Text:
    return Text(text, font=FONT, font_size=size, color=color, weight=weight)


def equation(tex: str, size: int = 38, color: str = INK) -> MathTex:
    return MathTex(tex, font_size=size, color=color)


def support_triangle(point: np.ndarray, scale: float = 0.25) -> VGroup:
    tri = Polygon(
        point,
        point + scale * (DOWN + LEFT),
        point + scale * (DOWN + RIGHT),
        stroke_color=INK,
        fill_color=WHITE_BG,
        fill_opacity=1,
        stroke_width=2.5,
    )
    ground = Line(point + scale * (DOWN + 1.25 * LEFT), point + scale * (DOWN + 1.25 * RIGHT), color=GREY, stroke_width=2)
    return VGroup(tri, ground)


def load_arrows(xs, y, length=0.55, color=RED, upward=False):
    direction = UP if upward else DOWN
    return VGroup(*[
        Arrow(
            np.array([x, y, 0]),
            np.array([x, y, 0]) + direction * length,
            buff=0,
            color=color,
            stroke_width=3,
            max_tip_length_to_length_ratio=0.25,
        ) for x in xs
    ])


class BridgeScene(Scene):
    title_text = ""
    scene_code = ""

    def setup(self):
        self.camera.background_color = WHITE_BG

    def pause(self, seconds=1.0):
        self.wait(seconds * PACE)

    def title(self, subtitle: str | None = None):
        title = ctext(self.title_text, 44, INK, BOLD).to_edge(UP, buff=0.35)
        rule = Line(LEFT * 6.1, RIGHT * 6.1, color=LIGHT, stroke_width=2).next_to(title, DOWN, buff=0.18)
        self.play(Write(title), Create(rule), run_time=1.3)
        if subtitle:
            sub = ctext(subtitle, 23, GREY).next_to(rule, DOWN, buff=0.12)
            self.play(FadeIn(sub), run_time=0.7)
            self.pause(1.6)
            return VGroup(title, rule, sub)
        self.pause(1.2)
        return VGroup(title, rule)

    def footer(self, text: str):
        box = RoundedRectangle(width=11.6, height=0.85, corner_radius=0.12, stroke_color=LIGHT, fill_color="#F8FBFC", fill_opacity=1)
        label = ctext(text, 25, INK).move_to(box)
        group = VGroup(box, label).to_edge(DOWN, buff=0.3)
        self.play(FadeIn(group, shift=UP * 0.12), run_time=0.8)
        return group

    def formula(self, tex: str, note: str | None = None):
        eq = equation(tex, 38)
        if note:
            note_mob = ctext(note, 22, GREY)
            group = VGroup(eq, note_mob).arrange(DOWN, buff=0.12)
        else:
            group = VGroup(eq)
        bg = RoundedRectangle(
            width=max(5.5, group.width + 0.65), height=group.height + 0.45,
            corner_radius=0.12, stroke_color=LIGHT, fill_color="#F8FBFC", fill_opacity=1,
        ).move_to(group)
        return VGroup(bg, group)

    def end_card(self, relation: str, task: str):
        # Axes may contain plain ``Mobject`` submobjects, so Group is required.
        current = Group(*self.mobjects)
        self.play(FadeOut(current), run_time=0.8)
        code = ctext(self.scene_code, 22, BLUE, BOLD)
        rel = ctext(relation, 34, INK, BOLD)
        task_text = ctext(task, 26, GREEN)
        if rel.width > 11.2:
            rel.scale_to_fit_width(11.2)
        if task_text.width > 11.2:
            task_text.scale_to_fit_width(11.2)
        content = VGroup(code, rel, task_text).arrange(DOWN, buff=0.42).move_to(ORIGIN)
        box = RoundedRectangle(width=12.0, height=3.35, corner_radius=0.16, stroke_color=LIGHT,
                               fill_color="#F8FBFC", fill_opacity=1).move_to(content)
        accent = Line(box.get_corner(UL) + RIGHT * 0.55, box.get_corner(UR) + LEFT * 0.55,
                      color=BLUE, stroke_width=4)
        self.play(FadeIn(box), Create(accent), run_time=0.8)
        self.play(LaggedStart(*[FadeIn(m, shift=UP * 0.15) for m in content], lag_ratio=0.22), run_time=1.8)
        self.pause(5.0)


class M01ForcePath(BridgeScene):
    title_text = "结构体系与力流"
    scene_code = "M01 · 体系"

    def construct(self):
        self.title("同一竖向作用在不同体系中的传递路径")
        y = 0.9
        beam = VGroup(Line(LEFT * 5.2 + UP * y, LEFT * 2.9 + UP * y, color=INK, stroke_width=7),
                      support_triangle(LEFT * 4.9 + UP * y), support_triangle(LEFT * 3.2 + UP * y))
        arch_curve = ParametricFunction(lambda t: np.array([-1.8 + 2.2*t, y - 0.9 + 1.1*4*t*(1-t), 0]), t_range=[0, 1], color=INK, stroke_width=6)
        arch = VGroup(arch_curve, Line(LEFT * 1.8 + UP * y, RIGHT * 0.4 + UP * y, color=GREY, stroke_width=3))
        tower1 = Line(RIGHT * 1.5 + DOWN * 0.05, RIGHT * 1.5 + UP * 2.0, color=INK, stroke_width=5)
        deck1 = Line(RIGHT * 0.6 + UP * y, RIGHT * 2.5 + UP * y, color=INK, stroke_width=5)
        stays = VGroup(*[Line(RIGHT * 1.5 + UP * 1.8, np.array([x, y, 0]), color=BLUE, stroke_width=2.5) for x in [0.7, 1.0, 2.0, 2.3]])
        stay = VGroup(tower1, deck1, stays)
        tower2a = Line(RIGHT * 3.2 + DOWN * 0.05, RIGHT * 3.2 + UP * 1.9, color=INK, stroke_width=5)
        tower2b = Line(RIGHT * 5.0 + DOWN * 0.05, RIGHT * 5.0 + UP * 1.9, color=INK, stroke_width=5)
        cable = ParametricFunction(lambda t: np.array([3.2 + 1.8*t, 1.75 - 0.75*4*t*(1-t), 0]), t_range=[0, 1], color=BLUE, stroke_width=4)
        deck2 = Line(RIGHT * 2.9 + UP * y, RIGHT * 5.3 + UP * y, color=INK, stroke_width=5)
        hangers = VGroup(*[Line(np.array([x, y, 0]), np.array([x, 1.75 - 0.75*4*((x-3.2)/1.8)*(1-(x-3.2)/1.8), 0]), color=GREY, stroke_width=2) for x in np.linspace(3.35, 4.85, 6)])
        susp = VGroup(tower2a, tower2b, cable, deck2, hangers)
        groups = [beam, arch, stay, susp]
        names = ["梁：弯曲", "拱：主压", "斜拉：拉压协同", "悬索：张力体系"]
        labels = VGroup(*[ctext(n, 23, INK) for n in names])
        for label, group in zip(labels, groups):
            label.next_to(group, DOWN, buff=0.35)
        self.play(LaggedStart(*[Create(g) for g in groups], lag_ratio=0.18), run_time=2.5)
        self.play(LaggedStart(*[FadeIn(l) for l in labels], lag_ratio=0.18), run_time=1.7)
        self.pause(2.5)
        for group in groups:
            xs = np.linspace(group.get_left()[0] + 0.25, group.get_right()[0] - 0.25, 3)
            loads = load_arrows(xs, y + 1.0, 0.45)
            path = group.copy().set_color(BLUE).set_stroke(width=8)
            self.play(FadeIn(loads), Create(path), run_time=1.2)
            self.pause(1.6)
            self.play(FadeOut(loads), FadeOut(path), run_time=0.6)
        self.footer("荷载 → 桥面系 → 承重体系 → 支承/基础")
        self.pause(3.0)
        self.end_card("连续力流决定主要内力形式", "任务：根据力流路径识别结构体系")


class M02ScaleEffect(BridgeScene):
    title_text = "跨径与尺度效应"
    scene_code = "M02 · 尺度"

    def construct(self):
        self.title("各指标均按 λ = 1 归一化")
        baseline = Line(LEFT * 5.5 + DOWN * 0.8, LEFT * 1.5 + DOWN * 0.8, color=INK, stroke_width=7)
        big = baseline.copy().scale(1.0, about_point=baseline.get_left()).shift(RIGHT * 6.2)
        s1, s2 = support_triangle(baseline.get_left()), support_triangle(baseline.get_right())
        b1, b2 = support_triangle(big.get_left()), support_triangle(big.get_right())
        l1 = equation(r"L", 34).next_to(baseline, DOWN)
        l2 = equation(r"\lambda L", 34).next_to(big, DOWN)
        self.play(Create(baseline), FadeIn(s1), FadeIn(s2), Write(l1))
        self.play(Create(big), FadeIn(b1), FadeIn(b2), Write(l2))
        tracker = ValueTracker(1)
        def scale_bars():
            values = [tracker.get_value(), tracker.get_value()**3, tracker.get_value()**4]
            colors = [BLUE, RED, GREEN]
            x_positions = [-0.6, 0.65, 1.9]
            base_y = -0.05
            group = VGroup()
            for x_pos, value, color in zip(x_positions, values, colors):
                height = 0.42 + 0.72 * math.log10(max(1.0, value))
                bar = Rectangle(width=0.68, height=height, fill_color=color, fill_opacity=0.85, stroke_width=0)
                bar.move_to(np.array([x_pos, base_y + height / 2, 0]))
                number = DecimalNumber(value, num_decimal_places=1, color=color, font_size=22).next_to(bar, UP, buff=0.08)
                group.add(VGroup(bar, number))
            return group
        bars = always_redraw(scale_bars)
        bar_labels = VGroup(equation(r"\lambda", 28, BLUE), equation(r"\lambda^3", 28, RED), equation(r"\lambda^4", 28, GREEN))
        for label, x_pos in zip(bar_labels, [-0.6, 0.65, 1.9]):
            label.move_to(np.array([x_pos, -0.38, 0]))
        bar_note = ctext("柱高采用对数映射，数值为相对量", 20, GREY).move_to(np.array([0.65, 1.95, 0]))
        value = always_redraw(lambda: VGroup(ctext("几何放大倍数", 24, GREY), DecimalNumber(tracker.get_value(), num_decimal_places=1, color=BLUE, font_size=34)).arrange(RIGHT, buff=0.18).to_corner(UR).shift(DOWN * 1.25 + LEFT * 0.5))
        self.play(FadeIn(bars), FadeIn(bar_labels), FadeIn(bar_note), FadeIn(value))
        self.play(tracker.animate.set_value(2.0), big.animate.stretch(1.12, 0, about_point=big.get_left()), run_time=3)
        self.pause(2.0)
        self.play(tracker.animate.set_value(3.0), big.animate.stretch(1.08, 0, about_point=big.get_left()), run_time=3)
        self.pause(2.0)
        formula = self.formula(r"W/W_0=\lambda^3,\qquad I/I_0=\lambda^4", "几何相似的理想化比较").to_edge(DOWN, buff=0.35)
        self.play(FadeIn(formula), run_time=1.0)
        self.pause(4.0)
        self.end_card("尺度改变控制问题", "任务：复核自重、刚度、稳定和施工边界")


class M03EccentricCore(BridgeScene):
    title_text = "偏心受压与截面核心"
    scene_code = "M03 · 截面核心"

    def construct(self):
        self.title("桥轴 x，横桥向 y，竖向 z")
        rect = Rectangle(width=4.4, height=3.1, color=INK, fill_color="#F8FBFC", fill_opacity=1).shift(LEFT * 2.6 + DOWN * 0.15)
        core = Polygon(rect.get_center()+UP*0.78, rect.get_center()+RIGHT*1.1, rect.get_center()+DOWN*0.78, rect.get_center()+LEFT*1.1,
                       color=BLUE, fill_color=PALE_BLUE, fill_opacity=0.8, stroke_width=3)
        axes = VGroup(Arrow(rect.get_center()+LEFT*1.7, rect.get_center()+RIGHT*1.7, buff=0, color=GREY),
                      Arrow(rect.get_center()+DOWN*1.15, rect.get_center()+UP*1.15, buff=0, color=GREY),
                      equation("y", 27, GREY).next_to(rect.get_right(), RIGHT, buff=0.08),
                      equation("z", 27, GREY).next_to(rect.get_top(), UP, buff=0.08))
        point = Dot(rect.get_center(), radius=0.11, color=RED)
        self.play(Create(rect), Create(core), FadeIn(axes), FadeIn(point))
        self.pause(2.5)
        stress_axes = Axes(x_range=[-1, 1, 1], y_range=[-1.4, 1.4, 0.7], x_length=2.4, y_length=3.1,
                           axis_config={"color": GREY, "stroke_width": 2, "include_ticks": False}).shift(RIGHT * 3.5 + DOWN * 0.1)
        stress = stress_axes.plot(lambda z: -0.78, x_range=[-1.35, 1.35], color=BLUE)
        note = ctext("全截面受压", 25, BLUE).next_to(stress_axes, DOWN, buff=0.25)
        self.play(Create(stress_axes), Create(stress), FadeIn(note))
        self.pause(2.0)
        target = rect.get_center() + RIGHT * 1.55 + UP * 0.55
        sloped = stress_axes.plot(lambda z: -0.65 + 0.78*z, x_range=[-1.35, 1.35], color=RED)
        note2 = ctext("局部出现拉应力", 25, RED).next_to(stress_axes, DOWN, buff=0.25)
        self.play(point.animate.move_to(target), Transform(stress, sloped), Transform(note, note2), run_time=3)
        self.pause(3.0)
        cond = self.formula(r"\frac{|e_y|}{b/6}+\frac{|e_z|}{h/6}\leq1", "矩形截面核心条件").to_edge(DOWN, buff=0.28)
        self.play(FadeIn(cond))
        self.pause(4.0)
        term = ctext("该条件不等同于钢筋混凝土大、小偏心受压分界", 23, GREY).next_to(cond, UP, buff=0.18)
        self.play(FadeIn(term))
        self.pause(3.0)
        self.end_card("作用点越过截面核心，线性应力图出现拉应力", "任务：调整 eᵧ、e_z 使截面保持全压")


class M04PrestressViews(BridgeScene):
    title_text = "预应力的三种等价表示"
    scene_code = "M04 · 预应力"

    def construct(self):
        self.title("偏心轴力、等效荷载、截面应力")
        beam = RoundedRectangle(width=9.6, height=1.15, corner_radius=0.08, color=INK, fill_color="#F8FBFC", fill_opacity=1).shift(UP * 0.95)
        tendon = ParametricFunction(lambda t: np.array([-4.4+8.8*t, 1.15-0.95*4*t*(1-t), 0]), t_range=[0, 1], color=BLUE, stroke_width=5)
        anchors = VGroup(Dot(tendon.get_start(), color=RED), Dot(tendon.get_end(), color=RED))
        p_label = equation(r"P_e, e", 34, BLUE).next_to(beam, UP, buff=0.25)
        self.play(Create(beam), Create(tendon), FadeIn(anchors), Write(p_label))
        self.pause(2.5)
        up = load_arrows(np.linspace(-3.5, 3.5, 7), 0.45, 0.52, BLUE, upward=True)
        end_forces = VGroup(Arrow(LEFT*4.65+UP*1.0, LEFT*4.05+UP*1.0, buff=0, color=RED), Arrow(RIGHT*4.65+UP*1.0, RIGHT*4.05+UP*1.0, buff=0, color=RED))
        eq_load = equation(r"w_p=\frac{8P_ef}{L^2}", 36, BLUE).to_edge(DOWN, buff=0.35)
        self.play(LaggedStart(*[GrowArrow(a) for a in up], lag_ratio=0.1), FadeIn(end_forces), Write(eq_load), run_time=2.4)
        self.pause(3.0)
        stress_box = Rectangle(width=2.2, height=2.8, color=INK).shift(RIGHT * 4.6 + DOWN * 0.3)
        sigma_p = Polygon(stress_box.get_corner(UL), stress_box.get_corner(DL), stress_box.get_corner(DR), stress_box.get_corner(UR), fill_color=PALE_BLUE, fill_opacity=0.75, stroke_color=BLUE)
        sigma_label = equation(r"\sigma=\frac{P_e}{A}\pm\frac{P_e e}{W}\pm\frac{M_g}{W}", 31).next_to(stress_box, LEFT, buff=0.45).shift(DOWN * 0.55)
        self.play(beam.animate.shift(LEFT * 1.2).scale(0.82), tendon.animate.shift(LEFT * 1.2).scale(0.82), FadeOut(up), FadeOut(end_forces), FadeOut(eq_load), FadeIn(stress_box), FadeIn(sigma_p), Write(sigma_label), run_time=2.4)
        self.pause(4.0)
        stage = ctext("有效预应力用于服役阶段；传力阶段应另计当期自重", 23, GREY).to_edge(DOWN, buff=0.32)
        self.play(FadeIn(stage))
        self.pause(4.0)
        self.end_card("三种表示必须得到一致的顶、底缘应力", "任务：按目标底缘应力调整 Pₑ 与 e")


class M05CombinationWaterfall(BridgeScene):
    title_text = "作用组合与瀑布图"
    scene_code = "M05 · 作用组合"

    def construct(self):
        self.title("教学算例：系数应根据采用标准、组合类型和条款确定")
        names = ["恒载", "主导车辆", "伴随温度", "伴随风", "设计效应"]
        vals = [3.0, 2.2, 0.9, 0.6]
        colors = [INK, RED, BLUE, GREEN]
        x0, scale = -5.0, 0.95
        running = 0
        bars = VGroup()
        labels = VGroup()
        products = [r"\gamma_G S_{Gk}", r"\gamma_Q S_{Qk}", r"\gamma_T\psi_T S_{Tk}", r"\gamma_W\psi_W S_{Wk}"]
        for i, (name, val, color) in enumerate(zip(names, vals, colors)):
            y = 1.9 - i * 1.0
            bar = Rectangle(width=val * scale, height=0.52, fill_color=color, fill_opacity=0.82, stroke_width=0).align_to(ORIGIN, LEFT).shift(RIGHT*(x0 + running*scale) + UP*y)
            labels.add(ctext(name, 22, INK).next_to(bar, LEFT, buff=0.2))
            prod = equation(products[i], 25, color).next_to(bar, RIGHT, buff=0.18)
            bars.add(VGroup(bar, prod))
            running += val
        total_y = -2.1
        total = Rectangle(width=running*scale, height=0.58, fill_color=BLUE, fill_opacity=0.85, stroke_width=0).align_to(ORIGIN, LEFT).shift(RIGHT*x0 + UP*total_y)
        total_label = ctext(names[-1], 23, INK).next_to(total, LEFT, buff=0.2)
        guides = VGroup(*[DashedLine(np.array([x0 + sum(vals[:i])*scale, 1.65-i, 0]), np.array([x0 + sum(vals[:i])*scale, 0.85-i, 0]), color=GREY, stroke_width=1.5) for i in range(1,4)])
        axis = Line(np.array([x0, -2.55, 0]), np.array([x0 + 7.4, -2.55, 0]), color=GREY)
        self.play(Create(axis), LaggedStart(*[FadeIn(l) for l in labels], lag_ratio=0.15))
        for b in bars:
            self.play(GrowFromEdge(b[0], LEFT), Write(b[1]), run_time=1.25)
            self.pause(1.1)
        self.play(Create(guides), GrowFromEdge(total, LEFT), FadeIn(total_label), run_time=1.8)
        self.pause(3.5)
        eq = self.formula(r"S_d=\sum_i\gamma_i\psi_iS_{k,i}", "教学场景倍率与规范系数分列").to_edge(RIGHT, buff=0.45).shift(DOWN*1.55)
        self.play(FadeIn(eq))
        self.pause(4.0)
        self.end_card("瀑布图保留每项作用对组合效应的贡献", "任务：识别控制设计效应的主导项")


class M06InfluenceLine(BridgeScene):
    title_text = "影响线与移动加载"
    scene_code = "M06 · 影响线"

    def construct(self):
        self.title("目标响应：简支梁跨中正弯矩")
        beam_y = 1.5
        beam = Line(LEFT*5 + UP*beam_y, RIGHT*5 + UP*beam_y, color=INK, stroke_width=7)
        supports = VGroup(support_triangle(beam.get_start()), support_triangle(beam.get_end()))
        il = Polygon(LEFT*5+DOWN*0.35, ORIGIN+DOWN*2.0, RIGHT*5+DOWN*0.35, color=BLUE, fill_color=PALE_BLUE, fill_opacity=0.55, stroke_width=4)
        zero = Line(LEFT*5+DOWN*0.35, RIGHT*5+DOWN*0.35, color=GREY, stroke_width=2)
        self.play(Create(beam), FadeIn(supports), Create(zero), Create(il))
        self.pause(2.0)
        x = ValueTracker(-4.0)
        axle_positions = [-0.8, 0.0, 0.75]
        vehicle = always_redraw(lambda: VGroup(*[
            Arrow(np.array([x.get_value()+dx, beam_y+0.8, 0]), np.array([x.get_value()+dx, beam_y+0.15, 0]), buff=0, color=RED, stroke_width=4)
            for dx in axle_positions
        ]))
        response = always_redraw(lambda: DecimalNumber(sum(max(0, 1-abs((x.get_value()+dx)/5)) for dx in axle_positions), num_decimal_places=2, color=GREEN, font_size=38).to_corner(UR).shift(DOWN*1.25+LEFT*0.3))
        rlabel = ctext("归一化响应", 22, GREY).next_to(response, LEFT, buff=0.15)
        self.play(FadeIn(vehicle), FadeIn(response), FadeIn(rlabel))
        self.play(x.animate.set_value(3.6), run_time=8, rate_func=linear)
        self.pause(2.5)
        eq = self.formula(r"R(x)=\sum_i P_i\eta(x_i)", "影响线纵坐符号与目标响应正方向一致").to_edge(DOWN, buff=0.25)
        self.play(FadeIn(eq))
        self.pause(4.0)
        self.play(x.animate.set_value(0.0), run_time=4, rate_func=smooth)
        self.pause(3.0)
        self.end_card("轴重 × 影响线纵坐 = 对目标响应的贡献", "任务：移动轴组使目标响应最大")


class M07BoxEfficiency(BridgeScene):
    title_text = "箱梁挖空与截面效率"
    scene_code = "M07 · 箱梁"

    def construct(self):
        self.title("外轮廓不变，壁厚是教学参数")
        outer = Rectangle(width=5.0, height=3.3, color=INK, fill_color=INK, fill_opacity=0.11).shift(LEFT*2.7)
        t = ValueTracker(0.55)
        void = always_redraw(lambda: Rectangle(width=5.0-2*t.get_value(), height=3.3-2*t.get_value(), color=BLUE, fill_color=WHITE_BG, fill_opacity=1, stroke_width=3).move_to(outer))
        self.play(Create(outer), FadeIn(void))
        area = always_redraw(lambda: DecimalNumber(1-(max(0,5-2*t.get_value())*max(0,3.3-2*t.get_value()))/(5*3.3), num_decimal_places=2, color=RED, font_size=36).move_to(RIGHT*3.25+UP*1.25))
        inertia = always_redraw(lambda: DecimalNumber(1-((max(0,5-2*t.get_value())*max(0,3.3-2*t.get_value())**3)/(5*3.3**3)), num_decimal_places=2, color=GREEN, font_size=36).move_to(RIGHT*3.25+DOWN*0.05))
        labs = VGroup(ctext("A/Aₛ（自重代理量）", 23, RED).next_to(area, LEFT, buff=0.25), ctext("I/Iₛ（抗弯几何量）", 23, GREEN).next_to(inertia, LEFT, buff=0.25))
        self.play(FadeIn(area), FadeIn(inertia), FadeIn(labs))
        self.play(t.animate.set_value(0.28), run_time=5)
        self.pause(2.5)
        self.play(t.animate.set_value(0.75), run_time=4)
        self.pause(2.5)
        eq = self.formula(r"I=\frac{BH^3-bh^3}{12}", "A/Aₛ 与 I/Iₛ 的共同基准为实心矩形").to_edge(DOWN, buff=0.3)
        self.play(FadeIn(eq))
        self.pause(3.5)
        warning = ctext("壁厚较大时应使用精确几何属性，不延用薄壁近似", 22, GREY).next_to(eq, UP, buff=0.15)
        self.play(FadeIn(warning))
        self.pause(3.0)
        self.end_card("中性轴附近材料对抗弯惯性矩的贡献较小", "任务：在面积降低目标下保持惯性矩下限")


class M08ArchThrustLine(BridgeScene):
    title_text = "拱轴、压力线与偏心"
    scene_code = "M08 · 拱桥"

    def construct(self):
        self.title("局部弯矩由轴力和偏心共同决定")
        arch = ParametricFunction(lambda t: np.array([-5+10*t, -1.2+3.3*4*t*(1-t), 0]), t_range=[0, 1], color=INK, stroke_width=8)
        deck = Line(LEFT*5+UP*1.2, RIGHT*5+UP*1.2, color=GREY, stroke_width=3)
        loads = load_arrows(np.linspace(-4.5,4.5,9), 2.15, 0.65)
        thrust = arch.copy().set_color(BLUE).set_stroke(width=4)
        self.play(Create(deck), Create(arch), LaggedStart(*[GrowArrow(a) for a in loads], lag_ratio=0.08), run_time=2.6)
        self.play(Create(thrust), run_time=1.5)
        self.pause(2.5)
        shifted = ParametricFunction(lambda t: np.array([-5+10*t, -1.2+3.3*4*t*(1-t)+0.42*np.sin(2*PI*t), 0]), t_range=[0, 1], color=BLUE, stroke_width=4)
        unbalanced = load_arrows([-3.8,-2.8,-1.8], 2.15, 0.72)
        self.play(FadeOut(loads), FadeIn(unbalanced), Transform(thrust, shifted), run_time=3)
        self.pause(3.0)
        e_line = DoubleArrow(np.array([0,2.1,0]), np.array([0,1.68,0]), buff=0, color=RED)
        e_lab = equation("e", 32, RED).next_to(e_line, RIGHT, buff=0.1)
        eq = self.formula(r"M=Ne", "压力线偏离拱轴产生弯矩").to_edge(DOWN, buff=0.28)
        self.play(GrowFromCenter(e_line), Write(e_lab), FadeIn(eq))
        self.pause(4.0)
        self.end_card("压力线越接近拱轴，弯矩越小", "任务：调整拱轴使最大 |e| 不超过截面核心")


class M09StayMatrix(BridgeScene):
    title_text = "斜拉索影响矩阵与成桥状态"
    scene_code = "M09 · 斜拉桥"

    def construct(self):
        self.title("索力增量与结构响应增量的一阶关系")
        deck = Line(LEFT*5+UP*0.4, RIGHT*5+UP*0.4, color=INK, stroke_width=7)
        tower = Line(DOWN*1.3, UP*2.7, color=INK, stroke_width=8)
        anchors = [-4.4,-3.3,-2.2,-1.1,1.1,2.2,3.3,4.4]
        stays = VGroup(*[Line(UP*2.4, np.array([x,0.4,0]), color=BLUE, stroke_width=3) for x in anchors])
        self.play(Create(deck), Create(tower), LaggedStart(*[Create(s) for s in stays], lag_ratio=0.1), run_time=2.5)
        self.pause(2.2)
        matrix = VGroup(*[
            Square(0.36, stroke_width=1.2, stroke_color=WHITE_BG, fill_color=(RED if (i-j)>1 else GREEN if (j-i)>1 else BLUE), fill_opacity=0.35+0.06*abs(i-j))
            for i in range(6) for j in range(8)
        ]).arrange_in_grid(rows=6, cols=8, buff=0.02).shift(RIGHT*3.8+DOWN*1.75)
        matrix_bg = RoundedRectangle(width=3.35, height=2.75, corner_radius=0.08, color=LIGHT, fill_color="#F8FBFC", fill_opacity=1).move_to(matrix)
        self.play(deck.animate.scale(0.62).shift(LEFT*2.1+UP*0.5), tower.animate.scale(0.62).shift(LEFT*2.1+UP*0.5), stays.animate.scale(0.62).shift(LEFT*2.1+UP*0.5), FadeIn(matrix_bg), LaggedStart(*[FadeIn(c) for c in matrix], lag_ratio=0.015), run_time=3)
        self.pause(2.5)
        active = stays[2].copy().set_color(RED).set_stroke(width=7)
        column = VGroup(*[matrix[8*i+2] for i in range(6)])
        self.play(Create(active), column.animate.set_fill(opacity=0.95), run_time=2)
        self.pause(3.0)
        eq = self.formula(r"\Delta\mathbf r=\mathbf A\,\Delta\mathbf T", "矩阵反演需与约束条件、权重和可实施索力联用").to_edge(DOWN, buff=0.25)
        self.play(FadeIn(eq))
        self.pause(4.0)
        self.end_card("每一根索对全桥响应形成一列影响系数", "任务：使线形与索力偏差的加权范数最小")


class M10SuspensionSag(BridgeScene):
    title_text = "悬索线型、矢跨比与水平分力"
    scene_code = "M10 · 悬索桥"

    def construct(self):
        self.title("均布荷载下的抛物线近似")
        towers = VGroup(Line(LEFT*5+DOWN, LEFT*5+UP*2.6, color=INK, stroke_width=7), Line(RIGHT*5+DOWN, RIGHT*5+UP*2.6, color=INK, stroke_width=7))
        deck = Line(LEFT*5.4+DOWN*0.25, RIGHT*5.4+DOWN*0.25, color=INK, stroke_width=6)
        sag = ValueTracker(2.0)
        cable = always_redraw(lambda: ParametricFunction(lambda t: np.array([-5+10*t, 2.35-sag.get_value()*4*t*(1-t),0]), t_range=[0,1], color=BLUE, stroke_width=5))
        force = always_redraw(lambda: Arrow(LEFT*4.7+DOWN*1.5, LEFT*(4.7-0.5/sag.get_value())+DOWN*1.5, buff=0, color=RED, stroke_width=7, max_tip_length_to_length_ratio=0.25))
        ratio = always_redraw(lambda: VGroup(ctext("f/L", 25, GREY), DecimalNumber(sag.get_value()/10, num_decimal_places=2, color=BLUE, font_size=36)).arrange(RIGHT).to_corner(UR).shift(DOWN*1.25+LEFT*0.3))
        self.play(Create(towers), Create(deck), Create(cable), FadeIn(force), FadeIn(ratio))
        self.pause(2.5)
        self.play(sag.animate.set_value(1.05), run_time=6, rate_func=smooth)
        self.pause(3.0)
        self.play(sag.animate.set_value(2.45), run_time=5, rate_func=smooth)
        self.pause(2.5)
        eq = self.formula(r"H=\frac{qL^2}{8f},\qquad \frac{H}{qL}=\frac{1}{8(f/L)}", "线型计算与精确悬链线分析应根据荷载模式区分").to_edge(DOWN, buff=0.28)
        self.play(FadeIn(eq))
        self.pause(4.0)
        self.end_card("矢跨比减小，水平分力增大", "任务：在线型与索力限值之间选择 f/L")


class M11ThermalRestraint(BridgeScene):
    title_text = "温度变形与纵向约束"
    scene_code = "M11 · 支座与约束"

    def construct(self):
        self.title("均匀温变：先计算自由变形，再考虑约束")
        deck = Line(LEFT*4.5+UP*0.7, RIGHT*4.5+UP*0.7, color=INK, stroke_width=9)
        piers = VGroup(Line(LEFT*4.5+DOWN*1.5, LEFT*4.5+UP*0.55, color=INK, stroke_width=7), Line(RIGHT*4.5+DOWN*1.5, RIGHT*4.5+UP*0.55, color=INK, stroke_width=7))
        hot = Line(deck.get_start(), deck.get_end(), color=RED, stroke_width=16, stroke_opacity=0.24)
        heat_label = ctext("均匀升温  ΔT > 0", 26, RED).next_to(deck, UP, buff=0.55)
        self.play(Create(piers), Create(deck), Create(hot), FadeIn(heat_label), run_time=2.4)
        expansion = VGroup(Arrow(LEFT*4.2+UP*0.05, LEFT*5.2+UP*0.05, buff=0, color=BLUE), Arrow(RIGHT*4.2+UP*0.05, RIGHT*5.2+UP*0.05, buff=0, color=BLUE))
        free_eq = equation(r"\Delta L=\alpha\Delta T L", 38, BLUE).to_edge(DOWN, buff=0.4)
        self.play(GrowArrow(expansion[0]), GrowArrow(expansion[1]), Write(free_eq))
        self.pause(3.5)
        reactions = VGroup(Arrow(LEFT*5.0+UP*0.7, LEFT*4.3+UP*0.7, buff=0, color=RED, stroke_width=6), Arrow(RIGHT*5.0+UP*0.7, RIGHT*4.3+UP*0.7, buff=0, color=RED, stroke_width=6))
        eq2 = equation(r"N=\frac{\alpha\Delta T L}{L/(EA)+1/k_1+1/k_2}", 34, INK).move_to(free_eq)
        self.play(FadeOut(expansion), FadeIn(reactions), Transform(free_eq, eq2), run_time=2.5)
        self.pause(4.0)
        balance = ctext("两端约束力等值反向，桥梁水平合力为零", 25, GREEN).next_to(free_eq, UP, buff=0.25)
        self.play(FadeIn(balance))
        self.pause(4.0)
        self.end_card("约束降低位移，同时产生内力", "任务：在允许位移与桥墝内力之间选择刚度")


class M12ModalResonance(BridgeScene):
    title_text = "模态、频比与共振"
    scene_code = "M12 · 动力响应"

    def construct(self):
        self.title("振型表示形状，显示振幅为可视化放大值")
        axes = Axes(x_range=[0,2.1,0.5], y_range=[0,6,1], x_length=6.8, y_length=3.8,
                    axis_config={"color": GREY, "stroke_width": 2, "include_numbers": True}).shift(RIGHT*2.5+DOWN*0.15)
        curves = VGroup()
        for zeta, color in [(0.05, RED),(0.12, BLUE),(0.25,GREEN)]:
            curves.add(axes.plot(lambda r,z=zeta: min(5.8,1/math.sqrt((1-r*r)**2+(2*z*r)**2)), x_range=[0,2.0], color=color, stroke_width=3))
        beam0 = Line(LEFT*5.5+UP*0.45, LEFT*0.2+UP*0.45, color=GREY, stroke_width=3)
        phase = ValueTracker(0)
        mode = always_redraw(lambda: ParametricFunction(lambda t: np.array([-5.5+5.3*t,0.45+0.65*math.sin(PI*t)*math.sin(phase.get_value()),0]), t_range=[0,1], color=INK, stroke_width=7))
        self.play(Create(beam0), Create(mode), Create(axes), LaggedStart(*[Create(c) for c in curves], lag_ratio=0.2), run_time=3)
        self.play(phase.animate.set_value(2*PI), run_time=5, rate_func=linear)
        self.play(phase.animate.set_value(4*PI), run_time=5, rate_func=linear)
        self.pause(2.0)
        rline = DashedLine(axes.c2p(1,0), axes.c2p(1,5.8), color=RED, stroke_width=2)
        rlab = equation(r"r\approx1", 31, RED).next_to(rline, UP, buff=0.12)
        eq = self.formula(r"D(r)=\left[(1-r^2)^2+(2\zeta r)^2\right]^{-1/2}", "r=ω/ωₙ，ζ 为阻尼比").to_edge(DOWN, buff=0.23)
        self.play(Create(rline), Write(rlab), FadeIn(eq))
        self.pause(4.5)
        self.end_card("频比接近 1 时，阻尼决定放大峰值", "任务：调整刚度、质量或阻尼移开高放大区")


class M13WindPhenomena(BridgeScene):
    title_text = "风速平方律与风致现象"
    scene_code = "M13 · 桥梁抗风"

    def construct(self):
        self.title("准静力风力与风致动力问题应分层识别")
        section = Polygon(LEFT*1.9+DOWN*0.45, RIGHT*1.9+DOWN*0.45, RIGHT*1.6+UP*0.45, LEFT*1.6+UP*0.45,
                          color=INK, fill_color=LIGHT, fill_opacity=0.9, stroke_width=4).shift(RIGHT*1.4)
        winds = load_arrows([],0)
        winds = VGroup(*[Arrow(LEFT*5+UP*y, LEFT*2.2+UP*y, buff=0, color=BLUE, stroke_width=3+i) for i,y in enumerate(np.linspace(-1,1,5))])
        self.play(LaggedStart(*[GrowArrow(a) for a in winds], lag_ratio=0.12), Create(section), run_time=2.6)
        self.pause(2.5)
        force1 = Rectangle(width=0.85, height=0.6, fill_color=RED, fill_opacity=0.8, stroke_width=0).shift(RIGHT*4.7+DOWN*1.45)
        force4 = Rectangle(width=0.85, height=2.4, fill_color=RED, fill_opacity=0.8, stroke_width=0).align_to(force1, DOWN)
        labels = VGroup(ctext("V", 26, BLUE).next_to(winds, UP), ctext("F", 26, RED).next_to(force1, DOWN))
        self.play(GrowFromEdge(force1, DOWN), FadeIn(labels))
        self.pause(2.0)
        self.play(winds.animate.scale(1.35, about_point=winds[0].get_end()), Transform(force1, force4), run_time=4)
        self.pause(2.5)
        eq = self.formula(r"F=\frac{1}{2}\rho V^2C_DA", "适用于准静力风力层次").to_edge(DOWN, buff=0.3)
        self.play(FadeIn(eq))
        self.pause(3.5)
        cards = VGroup(*[RoundedRectangle(width=2.3,height=0.85,corner_radius=0.1,stroke_color=c,fill_color="#F8FBFC",fill_opacity=1) for c in [GREY,BLUE,RED]]).arrange(RIGHT,buff=0.35).shift(DOWN*1.55)
        txt = VGroup(ctext("颤振：随机响应",22,GREY),ctext("涡振：频率锁定",22,BLUE),ctext("驰振：发散失稳",22,RED))
        for a,b in zip(txt,cards): a.move_to(b)
        self.play(FadeOut(eq), FadeIn(cards), FadeIn(txt))
        self.pause(4.0)
        self.end_card("风速平方律不直接代替风致稳定分析", "任务：根据随机、锁定或发散特征识别现象")


class M14TimeReliability(BridgeScene):
    title_text = "性能退化与时变可靠度"
    scene_code = "M14 · 全寿命设计"

    def construct(self):
        self.title("独立正态 R、S 与线性极限状态 g = R - S")
        axes = Axes(x_range=[0,16,4], y_range=[0,0.42,0.1], x_length=9.8, y_length=3.6,
                    axis_config={"color":GREY,"stroke_width":2,"include_numbers":True}).shift(DOWN*0.25)
        normal = lambda x,mu,sd: math.exp(-0.5*((x-mu)/sd)**2)/(sd*math.sqrt(2*math.pi))
        s_curve = axes.plot(lambda x: normal(x,7.0,1.2), x_range=[2,12], color=RED, stroke_width=4)
        r0 = axes.plot(lambda x: normal(x,11.2,1.1), x_range=[6,16], color=GREEN, stroke_width=4)
        r1 = axes.plot(lambda x: normal(x,9.0,1.1), x_range=[4,14], color=GREEN, stroke_width=4)
        self.play(Create(axes), Create(s_curve), Create(r0), run_time=2.5)
        labels = VGroup(ctext("作用效应 S",23,RED).next_to(s_curve,UP,buff=0.12), ctext("初始抗力 R(0)",23,GREEN).next_to(r0,UP,buff=0.12))
        self.play(FadeIn(labels))
        self.pause(3.0)
        self.play(Transform(r0,r1), labels[1].animate.shift(LEFT*1.2), run_time=5)
        self.pause(3.0)
        overlap = axes.get_area(s_curve, x_range=[8.2,12], color=RED, opacity=0.24)
        self.play(FadeIn(overlap))
        self.pause(2.5)
        eq = self.formula(r"\beta(t)=\frac{\mu_R(t)-\mu_S}{\sqrt{\sigma_R^2(t)+\sigma_S^2}},\quad P_f(t)=\Phi[-\beta(t)]", "模型假定、参数来源与相关性必须同时说明").to_edge(DOWN, buff=0.2)
        self.play(FadeIn(eq))
        self.pause(4.5)
        self.end_card("抗力分布左移，失效重叠区增大", "任务：选择维修时点使 β(t) 不低于目标值")


class M15ModelHierarchy(BridgeScene):
    title_text = "有限元模型层级与可验证性"
    scene_code = "M15 · 数值建模"

    def construct(self):
        self.title("模型精细化由设计问题和误差证据驱动")
        centers = [LEFT*4.5+UP*0.8, LEFT*1.5+UP*0.8, RIGHT*1.5+UP*0.8, RIGHT*4.5+UP*0.8]
        beam = Line(centers[0]+LEFT, centers[0]+RIGHT, color=INK, stroke_width=7)
        grid = VGroup(*[Line(centers[1]+LEFT+UP*y, centers[1]+RIGHT+UP*y, color=BLUE, stroke_width=2) for y in [-0.35,0,0.35]],
                      *[Line(centers[1]+RIGHT*x+DOWN*0.45, centers[1]+RIGHT*x+UP*0.45, color=BLUE, stroke_width=2) for x in [-0.8,-0.4,0,0.4,0.8]])
        shell = VGroup(*[Rectangle(width=0.4,height=0.35,stroke_color=BLUE,stroke_width=1.5) for _ in range(20)]).arrange_in_grid(rows=4,cols=5,buff=0).move_to(centers[2])
        solid = VGroup(*[Square(0.22,stroke_color=BLUE,stroke_width=1) for _ in range(45)]).arrange_in_grid(rows=5,cols=9,buff=0).move_to(centers[3])
        models = VGroup(beam,grid,shell,solid)
        labels = VGroup(*[ctext(x,23,INK) for x in ["梁单元","梁格","板壳","局部实体"]])
        for lab,obj in zip(labels,models): lab.next_to(obj,DOWN,buff=0.32)
        self.play(LaggedStart(*[Create(m) for m in models], lag_ratio=0.2), LaggedStart(*[FadeIn(l) for l in labels], lag_ratio=0.2), run_time=3)
        self.pause(3.0)
        axes = Axes(x_range=[0,5,1],y_range=[0,0.22,0.05],x_length=5.4,y_length=2.4,
                    axis_config={"color":GREY,"include_numbers":True,"stroke_width":2}).shift(DOWN*1.65+LEFT*0.9)
        pts = VGroup(*[Dot(axes.c2p(i,v),radius=0.07,color=BLUE) for i,v in enumerate([0.2,0.105,0.052,0.026,0.013],start=1)])
        line = VMobject(color=BLUE,stroke_width=3).set_points_as_corners([p.get_center() for p in pts])
        check = VGroup(*[RoundedRectangle(width=1.65,height=0.62,corner_radius=0.08,stroke_color=GREEN,fill_color=PALE_GREEN,fill_opacity=0.75) for _ in range(4)]).arrange(RIGHT,buff=0.18).shift(RIGHT*2.2+DOWN*1.65)
        ctxt = ["手算量级","平衡关系","边界条件","网格收敛"]
        check_text = VGroup(*[ctext(s,20,GREEN) for s in ctxt])
        for t,b in zip(check_text,check): t.move_to(b)
        self.play(models.animate.scale(0.72).shift(UP*0.45), labels.animate.scale(0.85).shift(UP*0.45), Create(axes), Create(line), FadeIn(pts), run_time=2.7)
        self.play(LaggedStart(*[FadeIn(b) for b in check],lag_ratio=0.15),LaggedStart(*[FadeIn(t) for t in check_text],lag_ratio=0.15),run_time=2)
        self.pause(4.0)
        eq = self.formula(r"\varepsilon_h=\frac{|r_h-r_{h/2}|}{|r_{h/2}|}", "AI 可协助脚本生成和批量参数化，工程判断保留人工复核").to_edge(DOWN,buff=0.16)
        self.play(FadeOut(axes),FadeOut(line),FadeOut(pts),FadeIn(eq))
        self.pause(4.0)
        self.end_card("最低足够模型 + 可复核证据", "任务：用一项收敛或平衡证据支持模型选择")


SCENES = [
    M01ForcePath, M02ScaleEffect, M03EccentricCore, M04PrestressViews,
    M05CombinationWaterfall, M06InfluenceLine, M07BoxEfficiency,
    M08ArchThrustLine, M09StayMatrix, M10SuspensionSag,
    M11ThermalRestraint, M12ModalResonance, M13WindPhenomena,
    M14TimeReliability, M15ModelHierarchy,
]


if __name__ == "__main__":
    print(json.dumps({"scenes": [s.__name__ for s in SCENES]}, ensure_ascii=False, indent=2))
