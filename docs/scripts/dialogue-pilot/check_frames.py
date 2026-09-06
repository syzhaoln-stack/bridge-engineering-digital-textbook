from pathlib import Path
import sys,json,argparse
from manim_helpers import *
from diagram_a import build_a
HERE=Path(__file__).resolve().parent;BOOK=HERE.parents[1]
p=argparse.ArgumentParser();p.add_argument('--ids',nargs='+',default=['D01','D02','D04']);args=p.parse_args()
out=BOOK/'tmp/dialogue-frames';out.mkdir(parents=True,exist_ok=True)
class Still(Scene):
    def construct(self):
        self.camera.background_color=WHITE
        self.add(tx(spec['title'],0,3.53,35,width=13.1),ln(-6.55,3.12,6.55,3.12,GRAY,1),tx('阿宁 · 一起拆开看',-4.8,2.78,22,TEAL,width=3.2))
        g=build_a(ident,phase) if ident in {'D01','D02','D04'} else build_b(ident,phase)
        assert g.width<13.8 and g.get_top()[1]<2.72 and g.get_bottom()[1]>-2.24,(ident,phase,g.width,g.get_top(),g.get_bottom())
        self.add(g,RoundedRectangle(width=13.2,height=1.07,corner_radius=.08,stroke_width=0,fill_color=PALE,fill_opacity=1).move_to([0,-2.83,0]),tx('先看眼前的变化，再试着解释原因。',0,-2.83,25,INK,width=12.4),tx('教学模型 · 条件与完整代码见本片页面',0,-3.62,18,GRAY))
for ident in args.ids:
    if ident in {'D03','D05'}:from diagram_b import build_b
    spec=json.loads((HERE/'specs'/f'{ident}.json').read_text(encoding='utf-8'))
    for phase in dict.fromkeys(t['scene'] for t in spec['turns']):
        with tempconfig({'pixel_width':1280,'pixel_height':720,'frame_rate':15,'write_to_movie':False,'save_last_frame':True,'output_file':f'{ident}-{phase}','media_dir':str(out),'disable_caching':True,'verbosity':'ERROR'}):Still().render()
        print(ident,phase,flush=True)
