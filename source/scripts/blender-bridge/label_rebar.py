"""Add editable Chinese SVG leaders to an unchanged Blender section render.

The anchor coordinates come from the rendering camera, not guessed pixels.
"""
from pathlib import Path
import base64
import hashlib
import html
import json

ROOT = Path(__file__).resolve().parents[2] / 'assets/publication/blender-bridge'
items = json.loads((ROOT / 'rebar-manifest.json').read_text(encoding='utf-8'))
row = next(x for x in items if x['id'] == 'R02')
raw = (ROOT / row['image']).read_bytes()
assert hashlib.sha256(raw).hexdigest() == row['sha256']
w, h = row['pixels']
assert (w, h) == (2400, 1900)
labels = {
    '上部纵向架立钢筋': ('上部架立筋', '#126a7e', 'right'),
    '腹板闭合双肢箍': ('腹板箍筋', '#a7472a', 'right'),
    '翼缘横向闭合联系筋': ('翼缘联系筋', '#936629', 'left'),
    '翼缘纵向分布钢筋': ('翼缘纵筋', '#4d6f61', 'left'),
    '腹板纵向构造钢筋': ('腹板纵筋', '#58717e', 'left'),
    '下部纵向普通钢筋': ('下部纵筋', '#304b60', 'left'),
    '预应力孔道': ('预应力孔道', '#9b8040', 'right'),
}
anchors = row['label_anchors']
assert set(a['label'] for a in anchors) == set(labels)
for a in anchors:
    assert 0 <= a['image_px'][0] <= w and 0 <= a['image_px'][1] <= h
canvas_w, canvas_h, dx, dy = 3200, 2240, 400, 145
out = [f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1600" height="1120" viewBox="0 0 {canvas_w} {canvas_h}" role="img" aria-label="T梁钢筋截面与中文构件名称">',
       '<title>这圈箍筋围住了哪些钢筋？</title>',
       '<rect width="3200" height="2240" fill="#ffffff"/>',
       '<style>text{font-family:Microsoft YaHei,Noto Sans CJK SC,Arial,sans-serif;fill:#283e4b}.label{font-size:56px;font-weight:600}.note{font-size:40px;fill:#60717b}</style>',
       '<text x="100" y="90" font-size="66" font-weight="600">这圈箍筋围住了哪些钢筋？</text>',
       f'<image x="{dx}" y="{dy}" width="{w}" height="{h}" xlink:href="data:image/png;base64,{base64.b64encode(raw).decode()}"/>']
records = []
for side in ['left', 'right']:
    group = sorted([a for a in anchors if labels[a['label']][2] == side], key=lambda a: a['image_px'][1])
    ys = ([440, 740, 1120, 1670] if side == 'left' else [540, 1080, 1560])
    assert len(group) == len(ys)
    for a, y in zip(group, ys):
        short, color, _ = labels[a['label']]
        ax, ay = a['image_px'][0] + dx, a['image_px'][1] + dy
        text_x, edge_x, elbow_x = (70, 425, 485) if side == 'left' else (2780, 2740, 2680)
        if a['label'] == '翼缘纵向分布钢筋':
            elbow_x = 450
        elif a['label'] == '翼缘横向闭合联系筋':
            elbow_x = 520
        out.append(f'<polyline points="{ax:.1f},{ay:.1f} {elbow_x},{ay:.1f} {elbow_x},{y} {edge_x},{y}" fill="none" stroke="{color}" stroke-width="4"/>')
        out.append(f'<circle cx="{ax:.1f}" cy="{ay:.1f}" r="7" fill="{color}"/>')
        out.append(f'<rect x="{text_x-12}" y="{y-48}" width="405" height="68" fill="white"/>')
        out.append(f'<text x="{text_x}" y="{y}" class="label">{html.escape(short)}</text>')
        records.append({'label': a['label'], 'world_m': a['world_m'], 'source_image_px': a['image_px'], 'svg_anchor_px': [ax, ay]})
out.extend(['<text x="100" y="2120" class="note">主箍与翼缘联系筋沿梁长相距40 mm；此视角同时显示两环，便于比较包裹关系。</text>',
            '<text x="100" y="2190" class="note">孔道画为空心轮廓，不代表钢绞线。代表性教学配筋；弯钩、搭接和锚固细部未完整绘出。</text>',
            '</svg>'])
target = ROOT / 'annotations/rebar-section-labels.svg'
target.parent.mkdir(exist_ok=True)
target.write_text('\n'.join(out), encoding='utf-8')
check = {'source_image': row['image'], 'source_sha256': row['sha256'], 'source_raster_unchanged': True,
         'method': 'Blender world_to_camera_view coordinates supplied with the final render',
         'labels': records, 'output': 'annotations/rebar-section-labels.svg'}
(ROOT / 'annotations/rebar-label-check.json').write_text(json.dumps(check, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(target.name, '7 projected labels; source PNG unchanged')
