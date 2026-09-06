"""Reproduce five Manim lessons, then decode and package the final media.

python scripts/dialogue-pilot/produce.py --render
Without --render, package already rendered, independently isolated outputs.
"""
from pathlib import Path
import argparse,json,subprocess,sys,os,hashlib
from PIL import Image,ImageDraw,ImageFont
HERE=Path(__file__).resolve().parent;BOOK=HERE.parents[1]
OUT=BOOK/'assets/videos/dialogue-pilot';QA=BOOK/'tmp/dialogue-video-qa'
QA.mkdir(parents=True,exist_ok=True)
p=argparse.ArgumentParser();p.add_argument('--render',action='store_true');p.add_argument('--ids',nargs='+',default=['D01','D02','D03','D04','D05']);args=p.parse_args()
font=ImageFont.truetype('C:/Windows/Fonts/msyh.ttc',19)
manifest=[]
def run(cmd):return subprocess.run(cmd,cwd=BOOK,check=True,capture_output=True,text=True,encoding='utf-8',errors='replace').stdout
for ident in args.ids:
    media=BOOK/f'tmp/dialogue-render/{ident}-final'
    if args.render:
        env=os.environ.copy();env['DIALOGUE_ID']=ident
        subprocess.run([sys.executable,'-m','manim','-qh','--fps','30','--verbosity','WARNING','--progress_bar','none','--media_dir',str(media),'-o',f'{ident}-dialogue',str(HERE/'dialogue_manim.py'),'DialogueLesson'],cwd=BOOK,env=env,check=True)
    candidates=list(media.glob(f'videos/dialogue_manim/1080p30/{ident}-dialogue.mp4'))
    assert len(candidates)==1,(ident,'missing completed 1080p30 render')
    dst=OUT/f'{ident}-dialogue.mp4'
    run(['ffmpeg','-y','-v','error','-i',str(candidates[0]),'-c','copy','-movflags','+faststart',str(dst)])
    probe=json.loads(run(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(dst)]))
    video=next(s for s in probe['streams'] if s['codec_type']=='video');audio=next(s for s in probe['streams'] if s['codec_type']=='audio')
    spec=json.loads((OUT/f'{ident}-dialogue.json').read_text(encoding='utf-8'))
    duration=float(probe['format']['duration']);expected=spec['duration_ms']/1000
    assert (video['width'],video['height'])==(1920,1080)
    assert video['avg_frame_rate']=='30/1'
    assert abs(duration-expected)<.2,(ident,duration,expected)
    assert len(set(t['speaker'] for t in spec['timeline']))==2
    assert all(0<=c['start_ms']<c['end_ms']<=spec['duration_ms'] for c in spec['captions'])
    # Decode all audio and video, not just the header or a thumbnail.
    run(['ffmpeg','-v','error','-i',str(dst),'-f','null','NUL'])
    phases={}
    for turn in spec['timeline']:phases.setdefault(turn['scene'],turn)
    frames=[]
    for phase,turn in phases.items():
        sec=min(turn['end_ms']/1000-.1,turn['start_ms']/1000+1.2)
        frame=QA/f'{ident}-{phase}.jpg'
        run(['ffmpeg','-y','-v','error','-ss',str(sec),'-i',str(dst),'-frames:v','1','-q:v','2',str(frame)])
        frames.append({'phase':phase,'time_seconds':sec,'frame':str(frame.relative_to(BOOK)).replace('\\','/')})
    run(['ffmpeg','-y','-v','error','-ss','1.2','-i',str(dst),'-frames:v','1','-q:v','2',str(OUT/f'{ident}-poster.jpg')])
    sheet=Image.new('RGB',(1440,470*((len(frames)+1)//2)),'#edf5f7');draw=ImageDraw.Draw(sheet)
    for i,frame in enumerate(frames):
        im=Image.open(BOOK/frame['frame']);im.thumbnail((700,405));x=10+(i%2)*720;y=10+(i//2)*470;sheet.paste(im,(x,y));draw.text((x,y+408),f'{ident} · {frame["phase"]} · {frame["time_seconds"]:.1f}s',font=font,fill='#173c50')
    sheet.save(QA/f'{ident}-contact.jpg',quality=92)
    row={'id':ident,'title':spec['title'],'video':f'assets/videos/dialogue-pilot/{ident}-dialogue.mp4','poster':f'assets/videos/dialogue-pilot/{ident}-poster.jpg','duration_seconds':duration,'expected_audio_seconds':expected,'width':video['width'],'height':video['height'],'fps':30,'audio_codec':audio['codec_name'],'size_bytes':dst.stat().st_size,'sha256':hashlib.sha256(dst.read_bytes()).hexdigest(),'full_decode':'passed','captions':'burned in plus optional VTT; sentence timings based on per-turn audio','phases':frames,'visual_review':'pending_final_video_frames','model':spec['model']}
    manifest.append(row);print(json.dumps({k:row[k] for k in ['id','duration_seconds','size_bytes','full_decode']},ensure_ascii=False),flush=True)
if len(manifest)<5 and (OUT/'manifest.json').exists():
    prior=json.loads((OUT/'manifest.json').read_text(encoding='utf-8'))
    merged={v['id']:v for v in prior['videos']};merged.update({v['id']:v for v in manifest});manifest=[merged[k] for k in sorted(merged)]
if len(manifest)==5:
    report={'schema':'dialogue-manim-pilot/v1','date':'2026-09-07','count':5,'engine':'Manim Community 0.19.0; deterministic mechanics drawings','voices':['zh-CN-YunyangNeural','zh-CN-XiaoxiaoNeural'],'voice_note':'Original scripted characters, AI synthesized voices; no voice impersonation.','seedance_used':False,'videos':manifest,'sources':{p.name:hashlib.sha256(p.read_bytes()).hexdigest() for p in [HERE/'dialogue_manim.py',HERE/'diagram_a.py',HERE/'diagram_b.py',HERE/'manim_helpers.py']}}
    (OUT/'manifest.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
