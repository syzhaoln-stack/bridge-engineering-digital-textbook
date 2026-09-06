"""Five Chinese dialogue lessons: actual Manim animations plus timed neural voices."""
from pathlib import Path
import sys,os,json,textwrap
HERE=Path(__file__).resolve().parent;sys.path.insert(0,str(HERE))
from manim_helpers import *
from diagram_a import build_a
BOOK=HERE.parents[1]

class DialogueLesson(Scene):
    def construct(self):
        ident=os.environ.get('DIALOGUE_ID','D01')
        spec=json.loads((BOOK/f'assets/videos/dialogue-pilot/{ident}-dialogue.json').read_text(encoding='utf-8'))
        self.camera.background_color=WHITE
        self.add(tx(spec['title'],0,3.53,35,width=13.1),ln(-6.55,3.12,6.55,3.12,GRAY,1))
        model_notes={
            'D01':'五梁 · P=120 kN · 仅车辆增量 · 刚性横向连接 · 位移放大示意',
            'D02':'同材料、几何相似、仅自重；另例只加跨度时保持截面与线荷载不变',
            'D03':'线弹性未开裂应力示例 · 压为正 · 分别检查施工与使用工况',
            'D04':'L=10 m，目标截面a=4 m · 剪力按图示正方向 · 不在跳跃点含糊取值',
            'D05':'L=20 m，q=20 kN/m，E=34 GPa，I=0.100 m⁴ · 观察x=7.4 m处位移'}
        self.add(tx(model_notes[ident],0,-3.62,18,GRAY,width=13.0),tx('原创双人对话 · AI合成声音 · 可暂停观察',0,-3.88,15,GRAY))
        bar=RoundedRectangle(width=13.2,height=1.07,corner_radius=.08,stroke_width=0,fill_color=PALE,fill_opacity=1).move_to([0,-2.83,0]);self.add(bar)
        self.add_sound(str(BOOK/f'assets/videos/dialogue-pilot/{ident}-dialogue.mp3'),time_offset=0)
        diagram=None;role=None;subtitle=None;last_phase=None
        # Event times come from separately synthesized turns, not estimated reading speed.
        cues=spec['captions'];events=sorted(set([t['start_ms'] for t in spec['timeline']]+[c['start_ms'] for c in cues]))
        for ms in events:
            target=ms/1000
            if target>self.time:self.wait(target-self.time)
            turn=next((t for t in spec['timeline'] if t['start_ms']<=ms<t['end_ms']),None)
            if turn is None:continue
            phase=turn['scene']
            if phase!=last_phase:
                if ident in {'D01','D02','D04'}:fresh=build_a(ident,phase)
                else:
                    from diagram_b import build_b
                    fresh=build_b(ident,phase)
                assert fresh.width<13.8 and fresh.get_top()[1]<2.72 and fresh.get_bottom()[1]>-2.24,(ident,phase,fresh.width,fresh.get_top(),fresh.get_bottom())
                if diagram is None:self.play(FadeIn(fresh,shift=.08*UP),run_time=.35)
                else:self.play(FadeTransform(diagram,fresh),run_time=.42)
                diagram=fresh;last_phase=phase
            fresh_role=tx(spec['roles'][turn['speaker']]['name']+(' · 追问' if turn['speaker']=='zhou' else ' · 一起拆开看'),-4.8,2.78,22,ORANGE if turn['speaker']=='zhou' else TEAL,width=3.2)
            if role:self.remove(role)
            self.add(fresh_role);role=fresh_role
            cue=next((c for c in cues if c['start_ms']<=ms<c['end_ms']),None)
            if cue:
                plain=cue['text'].split('：',1)[-1];wrapped='\n'.join(textwrap.wrap(plain,width=36,break_long_words=True,break_on_hyphens=False))
                if ident=='D04':
                    # Keep a trailing question mark with its sentence in this pilot.
                    wrapped=wrapped.replace('\n？','？').replace('\n。','。').replace('\n！','！')
                sub=tx(wrapped,0,-2.83,25,INK,width=12.4)
                if sub.height>.87:sub.scale_to_fit_height(.87)
                if subtitle:self.remove(subtitle)
                self.add(sub);subtitle=sub
        duration=spec['duration_ms']/1000
        if self.time<duration:self.wait(duration-self.time)
