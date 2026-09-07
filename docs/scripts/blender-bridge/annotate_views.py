"""Rebuild two textbook SVG aids from calibrated geometry; no raster editing.

The section embeds the unchanged rendered PNG and projects dimension endpoints
with its recorded orthographic camera. The pile plan uses explicit meter values.
"""
from pathlib import Path
import base64, hashlib, html, json, math

BOOK = Path(__file__).resolve().parents[2]
ASSET = BOOK / 'assets/publication/blender-bridge'
OUT = ASSET / 'annotations'
OUT.mkdir(parents=True, exist_ok=True)
manifest = json.loads((ASSET / 'manifest.json').read_text(encoding='utf-8'))
entry = next(m for m in manifest if m['id'] == 'B03')
png = ASSET / entry['image']
assert entry['camera']['type'] == 'ORTHO'
assert hashlib.sha256(png.read_bytes()).hexdigest() == entry['file_sha256']

FONT = "'Microsoft YaHei','Noto Sans CJK SC',Arial,sans-serif"
def start(w, h, title, metadata):
    return [f'<svg xmlns="http://www.w3.org/2000/svg" width="{w/2:g}" height="{h/2:g}" viewBox="0 0 {w} {h}" role="img" aria-label="{html.escape(title)}">',
            f'<title>{html.escape(title)}</title>',
            f'<metadata>{html.escape(json.dumps(metadata,ensure_ascii=False))}</metadata>',
            '<defs><marker id="arrow" markerWidth="12" markerHeight="10" refX="10" refY="4" orient="auto-start-reverse" markerUnits="userSpaceOnUse"><path d="M 0 0 L 10 4 L 0 8" fill="none" stroke="#52718c" stroke-width="2"/></marker></defs>',
            f'<style>text{{font-family:{FONT};fill:#24384a}}.title{{font-size:42px;font-weight:600}}.sub{{font-size:27px;fill:#667584}}.dim{{font-size:31px;font-weight:500}}.note{{font-size:26px;fill:#667584}}.line{{fill:none;stroke:#52718c;stroke-width:2.4}}.extension{{fill:none;stroke:#8c9ba8;stroke-width:1.8}}.dimension{{fill:none;stroke:#52718c;stroke-width:2.4;marker-start:url(#arrow);marker-end:url(#arrow)}}.direction{{fill:none;stroke:#52718c;stroke-width:2.4;marker-end:url(#arrow)}}</style>',
            f'<rect width="{w}" height="{h}" fill="white"/>']
def text(out,x,y,value,cls='dim',anchor='middle',extra=''):
    out.append(f'<text x="{x:.3f}" y="{y:.3f}" class="{cls}" text-anchor="{anchor}" {extra}>{html.escape(value)}</text>')
def line(out,x1,y1,x2,y2,cls='line'):
    out.append(f'<path d="M {x1:.3f} {y1:.3f} L {x2:.3f} {y2:.3f}" class="{cls}"/>')
def dimension_h(out,x0,x1,y,label,extension_y):
    for x in [x0,x1]: line(out,x,extension_y,x,y-13,'extension')
    line(out,x0,y,x1,y,'dimension')
    if label: text(out,(x0+x1)/2,y-22,label)

# Blender Euler XYZ rotates local coordinates by Rz @ Ry @ Rx.
def matmul(a,b):return [[sum(a[i][k]*b[k][j] for k in range(3)) for j in range(3)] for i in range(3)]
ex,ey,ez=entry['camera']['rotation_euler_rad']
cx,sx=math.cos(ex),math.sin(ex);cy,sy=math.cos(ey),math.sin(ey);cz,sz=math.cos(ez),math.sin(ez)
rotation=matmul(matmul([[cz,-sz,0],[sz,cz,0],[0,0,1]],[[cy,0,sy],[0,1,0],[-sy,0,cy]]),[[1,0,0],[0,cx,-sx],[0,sx,cx]])
camera=entry['camera']['location_m'];width,height=entry['pixels'];ppm=width/entry['camera']['ortho_scale_m']
image_x,image_y=100,130
def project(x,y,z):
    delta=[x-camera[0],y-camera[1],z-camera[2]]
    local=[sum(rotation[j][i]*delta[j] for j in range(3)) for i in range(3)]
    return image_x+width/2+local[0]*ppm,image_y+height/2-local[1]*ppm

meta={'date':'2026-09-07','units':'m','source_image':entry['image'],'source_image_sha256':entry['file_sha256'],'camera':entry['camera'],'source_pixels':entry['pixels'],'projection':'Blender Euler XYZ, orthographic horizontal fit; x longitudinal, y transverse, z up','dimensions':{'deck_width':12.5,'girder_web_axes_y':[-11.65,-9.075,-6.5,-3.925,-1.35],'girder_depth':2.0,'girder_bottom_z':10.5,'girder_top_z':12.5,'topping_thickness':0.1,'asphalt_thickness':0.1},'raster_is_unchanged':True}
out=start(2600,1150,'一幅桥面下面，五片T梁怎样排布',meta)
text(out,120,68,'一幅桥面下面，五片T梁怎样排布','title','start')
text(out,120,111,'同一三维模型的横断面 · 尺寸单位：m','sub','start')
out.append(f'<image x="{image_x}" y="{image_y}" width="{width}" height="{height}" href="data:image/png;base64,{base64.b64encode(png.read_bytes()).decode()}"/>')
edge=sorted([project(14,-12.75,12.5)[0],project(14,-.25,12.5)[0]])
beam_top=project(14,-6.5,12.5)[1];beam_bottom=project(14,-6.5,10.5)[1]
dimension_h(out,*edge,300,'B = 12.50 m',beam_top-4)
axes=sorted(project(14,y,10.5)[0] for y in [-11.65,-9.075,-6.5,-3.925,-1.35])
dimension_h(out,axes[0],axes[-1],908,None,beam_bottom+4)
for x in axes[1:-1]:
    line(out,x,beam_bottom+7,x,921,'extension')
    line(out,x-6,916,x+6,900)
for x0,x1 in [(edge[0],axes[0]),(axes[-1],edge[1])]:
    dimension_h(out,x0,x1,908,'1.10',beam_bottom+4)
mid=(axes[0]+axes[-1])/2
out.append(f'<rect x="{mid-280}" y="852" width="560" height="44" fill="white"/>')
text(out,mid,886,'4 × d = 4 × 2.575 m')
vertical_x=2460
for y in [beam_top,beam_bottom]:line(out,edge[-1]+8,y,vertical_x+13,y,'extension')
line(out,vertical_x,beam_top,vertical_x,beam_bottom,'dimension')
text(out,vertical_x+52,(beam_top+beam_bottom)/2,'h = 2.00 m','dim','middle',f'transform="rotate(-90 {vertical_x+52} {(beam_top+beam_bottom)/2})"')
text(out,120,1036,'d 是主梁腹板轴线间距；两侧边距从边梁腹板轴线量至桥面外缘。','note','start')
text(out,120,1080,'h 只量 T 梁本体；上方 0.10 m 混凝土铺装和 0.10 m 沥青铺装另计。','note','start')
out.append('</svg>')
(OUT/'section-dimensions.svg').write_text('\n'.join(out),encoding='utf-8')

# Plan coordinates: screen-right = transverse y, screen-up = longitudinal x.
meta2={'date':'2026-09-07','units':'m','status':'teaching substructure supplement, not a verified foundation design','cap_size_xy':[5.3,10.2],'pile_diameter':1.2,'pile_x':[-1.6,1.6],'pile_y':[-3.4,0,3.4],'pier_column_diameter':1.6,'pier_column_x':[0,0],'pier_column_y':[-3.65,3.65],'coordinate_mapping':'screen right = transverse y; screen up = longitudinal x; local origin at pile-cap center'}
out=start(1400,1250,'同一承台下的六根桩',meta2)
text(out,105,75,'同一承台下的六根桩','title','start')
text(out,105,122,'俯视：沿桥向两排，每排三根','sub','start')
scale=90;ox,oy=660,640
def plan(x,y):return ox+y*scale,oy-x*scale
capx,capy=ox-10.2*scale/2,oy-5.3*scale/2
out.append(f'<rect x="{capx}" y="{capy}" width="{10.2*scale}" height="{5.3*scale}" rx="3" fill="#f5f8fb" stroke="#52718c" stroke-width="3"/>')
for y in [-3.65,3.65]:
    px,py=plan(0,y)
    out.append(f'<circle cx="{px}" cy="{py}" r="{.8*scale}" fill="#f6eddc" fill-opacity="0.75" stroke="#ad8142" stroke-width="3" stroke-dasharray="10 7"/>')
    text(out,px,py+8,'墩柱投影','note')
for i,(x,y) in enumerate(( (x,y) for x in [1.6,-1.6] for y in [-3.4,0,3.4]),1):
    px,py=plan(x,y)
    out.append(f'<circle cx="{px}" cy="{py}" r="{.6*scale}" fill="#dfedf8" stroke="#52718c" stroke-width="3"/>')
    text(out,px,py+10,f'{i}','dim')
dimension_h(out,capx,capx+10.2*scale,322,'10.20 m',capy-8)
right=1235
for y in [capy,capy+5.3*scale]:line(out,capx+10.2*scale+7,y,right+13,y,'extension')
line(out,right,capy,right,capy+5.3*scale,'dimension')
text(out,right+54,oy,'5.30 m','dim','middle',f'transform="rotate(-90 {right+54} {oy})"')
line(out,115,275,115,195,'direction')
text(out,115,171,'桥向 x','note')
line(out,215,223,380,223,'direction')
text(out,402,231,'横桥向 y','note','start')
text(out,105,994,'6 根桩，直径均为 D = 1.20 m。','dim','start')
out.append('<circle cx="118" cy="1057" r="14" fill="#f6eddc" stroke="#ad8142" stroke-width="2.5" stroke-dasharray="6 4"/>')
text(out,151,1066,'虚线圆表示上方两根墩柱的位置。','note','start')
text(out,105,1140,'下部结构为教学补充；此图用于认识布置，不作为基础设计图。','note','start')
out.append('</svg>')
(OUT/'pile-plan.svg').write_text('\n'.join(out),encoding='utf-8')

checks={'section_image_sha256':entry['file_sha256'],'projected_bridge_edge_pixels':[round(v-image_x,5) for v in edge],'recorded_content_alpha_bounds_px':entry['frame_check']['content_bounds_px'],'projected_beam_height_pixels':round(beam_bottom-beam_top,5),'beam_height_from_projection_m':round((beam_bottom-beam_top)/ppm,8),'pile_count':6,'source_raster_unchanged':hashlib.sha256(png.read_bytes()).hexdigest()==entry['file_sha256'],'outputs':['annotations/section-dimensions.svg','annotations/pile-plan.svg']}
assert abs(checks['beam_height_from_projection_m']-2)<1e-6
assert max(abs(checks['projected_bridge_edge_pixels'][i]-entry['frame_check']['content_bounds_px'][2*i]) for i in range(2))<2
(OUT/'annotation-check.json').write_text(json.dumps(checks,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(checks,ensure_ascii=False,indent=2))
