"""Rebuild the browser runtime and synchronize the reviewed Pages snapshot."""
from pathlib import Path
import argparse, hashlib, json, shutil, subprocess

parser=argparse.ArgumentParser()
parser.add_argument('--godot',required=True,help='Godot 4.7 stable executable')
args=parser.parse_args()
repo=Path(__file__).resolve().parents[2]
project=Path(__file__).resolve().parent/'godot'
runtime=repo/'source/assets/bridge-lab'
target=repo/'docs/assets/bridge-lab'
assert not list(project.rglob('*.glb')),'GLBs must remain outside the PCK project'
runtime.joinpath('app').mkdir(parents=True,exist_ok=True)
subprocess.run([args.godot,'--headless','--path',str(project),'--editor','--import','--quit'],check=True)
subprocess.run([args.godot,'--headless','--path',str(project),'--export-release','Web',str(runtime/'app/index.html')],check=True)
files=[]
for path in sorted(runtime.rglob('*')):
    if path.is_file() and path.name!='release-files.json':
        files.append({'path':path.relative_to(runtime).as_posix(),'bytes':path.stat().st_size,'sha256':hashlib.sha256(path.read_bytes()).hexdigest()})
(runtime/'release-files.json').write_text(json.dumps({'schema':'bridge-lab-release/1','files':files,'bytes':sum(p['bytes'] for p in files)},ensure_ascii=False,indent=2),encoding='utf-8')
shutil.copytree(runtime,target,dirs_exist_ok=True)
print('Exported and synchronized. Test the browser and review git diff before publishing.')
