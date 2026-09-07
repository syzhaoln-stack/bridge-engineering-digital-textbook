"""Apply an exported author selection without deleting source candidates.

Usage: python scripts/imagegen-samples/apply_author_selection.py SELECTION.json
Only five context illustrations enter the text. Geometry revisions remain separate.
"""
from pathlib import Path
import argparse
import csv
import hashlib
import json
import re
from collections import Counter

BOOK = Path(__file__).resolve().parents[2]
ASSETS = BOOK / 'assets/publication/imagegen-samples'
parser = argparse.ArgumentParser()
parser.add_argument('selection', type=Path)
args = parser.parse_args()
raw = args.selection.read_bytes()
selection = json.loads(raw.decode('utf-8-sig'))
manifest_path = ASSETS / 'manifest.json'
manifest = json.loads(manifest_path.read_text(encoding='utf-8'))
items = {item['id']: item for item in manifest['items']}
groups = selection['groups']
assert len(groups) == 8 and len({g['id'] for g in groups}) == 8
selected = {}
for group in groups:
    choice = group.get('selected_variant')
    if group['status'] != 'selected' or not choice:
        raise ValueError('This edition requires eight explicit selections')
    assert choice['id'] in items and choice['id'].startswith(group['id'] + '-')
    assert Path(choice['image']).name == items[choice['id']]['image']
    assert choice['needs_revision'] == items[choice['id']]['needs_revision']
    selected[choice['id']] = group
assert selection['counts'] == {'total': 8, 'selected': 8, 'redo': 0, 'undecided': 0}
out = ASSETS / 'selection'
out.mkdir(exist_ok=True)
(out / 'author-selection-20260907.json').write_bytes(raw)

placement = {
    'G01-B': ('ch01', 'F01', '从桥面往下找：主梁、支座和墩台分别在哪里？',
              '整桥与车辆的空间位置。AI 生成情境插画；传力方向见下一幅原理图。',
              '两跨 20 m、桥宽 10.8 m 是本组底稿的教学约定。生成插画不用于量取尺寸，也不是后文三跨 30 m 的 Blender 案例。'),
    'G02-B': ('ch02-foundations', 'F06', '同一块木条换个放法，承受同样的重量时会怎样？',
              '平放和竖放的木条。图中先看截面方向，尚未画加载后的变形。',
              'AI 生成教具插画；比较需保持材料、跨度和荷载相同。本图底稿的木条截面为0.10×0.020 m，转向后二次矩比为25；下一幅F06另用0.20×0.60 m矩形截面，比值为9，不能把9倍套到这根木条。实际弯曲程度看对应交互计算，不能从未变形的插画判断。'),
    'G04-B': ('ch03', 'F19', '桥头还没碰到前方的桥墩，这一段由哪里托着？',
              '桥梁向前移动时的施工情境。前端橙色构件为导梁，尚未接触前方支点。',
              'AI 生成教具插画。本情境含导梁；下一幅 F19 刻意采用不含导梁的静定教学模型，不能把其中内力数值直接标到这幅插画上。'),
    'G06-C': ('ch06', 'F27', '沿着主缆看过去，它的两端接到了哪里？',
              '地锚式悬索桥的整体形态。细竖线为吊索，两端主缆通向岸上的锚碇。',
              'AI 生成线稿淡彩插画，用于辨认构件与相互位置；力的方向见 F27，数值和尺寸以对应算例为准。'),
    'G08-A': ('ch10-lifecycle', 'F36', '涂层脱落之后，怎样知道钢梁还剩多少材料？',
              '涂层破损与表面锈蚀的局部情境。颜色和纹理提示需要检查的位置。',
              'AI 生成写实插画，非病害现场照片。这里是工字形钢梁局部锈蚀，下一幅F36另用矩形钢条上下均匀减薄；截面和损伤模式均不同。锈色不能换算为厚度损失，F36的减薄量是明确给定的教学条件。'),
}
for variant, (chapter, figure, prompt, caption, note) in placement.items():
    assert variant in selected and not items[variant]['needs_revision']
    path = BOOK / 'chapters' / (chapter + '.qmd')
    text = path.read_text(encoding='utf-8-sig')
    block = (f'<!-- AUTHOR-SELECTED {variant} START -->\n'
             f'**{prompt}**\n\n'
             f'![{caption}](../assets/publication/imagegen-samples/{items[variant]["image"]})'
             f'{{#fig-author-{variant.lower()} width=100%}}\n\n'
             f'<details class="figure-method"><summary>图像来源与本例条件</summary><p>{note}</p>'
             f'<p>作者选样：{variant} · 2026-09-07 · '
             f'<a href="../assets/publication/imagegen-samples/public-records/{variant}.json">制作记录</a></p></details>\n'
             f'<!-- AUTHOR-SELECTED {variant} END -->\n\n')
    text = re.sub(rf'<!-- AUTHOR-SELECTED {variant} START -->.*?<!-- AUTHOR-SELECTED {variant} END -->\s*', '', text, flags=re.S)
    marker = f'<!-- PRIORITY-FIGURE {figure} START -->'
    assert text.count(marker) == 1
    path.write_text(text.replace(marker, block + marker), encoding='utf-8', newline='\n')

rows = []
for variant, item in items.items():
    picked = variant in selected
    action = ('正文情境图试排' if variant in placement else '保留画法，构造待修正') if picked else '收进备选，保留原文件'
    row = {'id': variant, 'selected': picked, 'needs_revision': item['needs_revision'],
           'action': action, 'image': item['image'],
           'chapter': placement[variant][0] if variant in placement else None}
    rows.append(row)
style_counts = Counter(g['selected_variant']['style'] for g in groups)
ledger = {'schema': 'author-image-selection/v1', 'date': '2026-09-07',
          'source_export_sha256': hashlib.sha256(raw).hexdigest(),
          'selected_count': 8, 'reserve_count': 16, 'context_insertions': 5,
          'selected_needs_geometry_revision': ['G03-A', 'G05-C', 'G07-A'],
          'style_counts': dict(style_counts),
          'original_parameter_figures_retained': 40, 'items': rows}
(out / 'application-ledger.json').write_text(json.dumps(ledger, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
with (out / 'image-decisions.csv').open('w', encoding='utf-8-sig', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=list(rows[0]))
    writer.writeheader()
    writer.writerows(rows)
for name in ['author-selection-20260907.json', 'application-ledger.json', 'image-decisions.csv', 'style-guide.md']:
    rel = 'selection/' + name
    if rel not in manifest['public_files']:
        manifest['public_files'].append(rel)
manifest['author_selection'] = {'record': 'selection/author-selection-20260907.json',
                              'ledger': 'selection/application-ledger.json',
                              'selected': 8, 'reserve': 16, 'context_insertions': 5,
                              'selected_needs_revision': 3}
manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(json.dumps({k: v for k, v in ledger.items() if k != 'items'}, ensure_ascii=False, indent=2))
