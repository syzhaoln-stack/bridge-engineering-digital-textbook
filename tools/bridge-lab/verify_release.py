"""Verify the public runtime, synchronized copy and optimized asset inventory."""
from pathlib import Path
from hashlib import sha256
from datetime import datetime, timezone
import json
import re

root = Path(__file__).resolve().parents[2]
source = root / 'source/assets/bridge-lab'
public = root / 'docs/assets/bridge-lab'
checks = []

def check(name, passed):
    checks.append({'check': name, 'passed': bool(passed)})
    if not passed:
        raise AssertionError(name)

def read(path):
    return json.loads(path.read_text(encoding='utf-8-sig'))

release = read(source / 'release-files.json')
for item in release['files']:
    name = item['path']
    data = (source / name).read_bytes()
    check(name + ': content hash', sha256(data).hexdigest() == item['sha256'])
    check(name + ': byte count', len(data) == item['bytes'])
    check(name + ': Pages copy', data == (public / name).read_bytes())
    check(name + ': GitHub file limit', len(data) < 100 * 1024 * 1024)
check('total runtime bytes', release['bytes'] == sum(x['bytes'] for x in release['files']))
check('release inventory synchronized', (source / 'release-files.json').read_bytes() == (public / 'release-files.json').read_bytes())
manifest = read(source / 'manifest.json')['models']
check('teaching order', [x['id'] for x in manifest] == ['girder', 'arch', 'cable_stayed', 'suspension'])
for model in manifest:
    check(model['id'] + ': body reference', (source / model['model_url']).stat().st_size == model['model_bytes'])
    check(model['id'] + ': independent analysis', (source / model['analysis_url']).is_file())
    for quality in ['low', 'standard']:
        env = model['environments'][quality]
        check(model['id'] + ': ' + quality + ' environment', (source / env['url']).stat().st_size == env['bytes'])
audit = read(root / 'tools/bridge-lab/assets/asset-manifest.json')
for model in audit['models']:
    check(model['id'] + ': audited optimized body', sha256((source / model['model_path']).read_bytes()).hexdigest() == model['output']['sha256'])
    check(model['id'] + ': preserved original recorded', model['source_file_hash_unchanged'])
check('runtime PCK excludes models', (source / 'app/index.pck').stat().st_size < 1024 * 1024)
preset = (root / 'tools/bridge-lab/godot/export_presets.cfg').read_text(encoding='utf-8')
check('single threaded Web', 'variant/thread_support=false' in preset)
check('models excluded from PCK', 'exclude_filter="*.glb,*.blend,*.log"' in preset)
check('T girder environment', manifest[0]['environments']['standard']['bytes'] > 0)
for folder in [source, root / 'tools/bridge-lab']:
    for path in folder.rglob('*'):
        if path.is_file() and path.suffix in {'.json', '.gd', '.md', '.html', '.cfg', '.godot'}:
            text = path.read_text(encoding='utf-8-sig')
            check(str(path.relative_to(root)) + ': no machine-specific input paths', not re.search(r'[A-Z]:[/\\](?:Users|claude_work)', text))
report = {'verified_at_utc': datetime.now(timezone.utc).isoformat(), 'checks': len(checks),
          'failures': [x for x in checks if not x['passed']], 'runtime_raw_bytes': release['bytes'],
          'body_raw_bytes': sum(x['model_bytes'] for x in manifest), 'result': 'passed'}
(root / 'tools/bridge-lab/reports/release-verification.json').write_text(json.dumps(report, indent=2), encoding='utf-8')
print(json.dumps(report, indent=2))
