"""Synthesize an editable two-role pilot; no hidden credentials or voice cloning."""
from pathlib import Path
import asyncio,json,hashlib,subprocess,re,argparse
import edge_tts
from pydub import AudioSegment

BOOK=Path(__file__).resolve().parents[2]
parser=argparse.ArgumentParser();parser.add_argument('--id',default='D01');args=parser.parse_args();ID=args.id
SPEC=json.loads((Path(__file__).parent/f'specs/{ID}.json').read_text(encoding='utf-8'))
TEMP=BOOK/('tmp/dialogue-pilot' if ID=='D01' else f'tmp/dialogue-pilot/{ID}');TEMP.mkdir(parents=True,exist_ok=True)
OUT=BOOK/'assets/videos/dialogue-pilot';OUT.mkdir(parents=True,exist_ok=True)

async def segment(i,t):
    role=SPEC['roles'][t['speaker']];dest=TEMP/f'turn-{i:02d}.mp3';sig=TEMP/f'turn-{i:02d}.sha256'
    digest=hashlib.sha256((t['text']+role['voice']+role['rate']).encode()).hexdigest()
    if dest.exists() and dest.stat().st_size>1000 and sig.exists() and sig.read_text()==digest:return
    for attempt in range(2):
        try:
            request=edge_tts.Communicate(t['text'],role['voice'],rate=role['rate'])
            await asyncio.wait_for(request.save(str(dest)),timeout=50)
            assert dest.stat().st_size>1000
            sig.write_text(digest);print(f'AUDIO {i+1}/{len(SPEC["turns"])}',flush=True);return
        except Exception:
            if attempt:raise
            await asyncio.sleep(.5)

def stamp(ms,srt=False):
    h=ms//3600000;m=ms//60000%60;s=ms//1000%60;mi=ms%1000
    return f'{h:02d}:{m:02d}:{s:02d}{"," if srt else "."}{mi:03d}'

async def main():
    # Two connections at a time; each turn has an independent editable audio source.
    sem=asyncio.Semaphore(2)
    async def run(i,t):
        async with sem:await segment(i,t)
    await asyncio.gather(*(run(i,t) for i,t in enumerate(SPEC['turns'])))
    joined=AudioSegment.silent(duration=450,frame_rate=24000);timeline=[];cues=[]
    for i,t in enumerate(SPEC['turns']):
        audio=AudioSegment.from_file(TEMP/f'turn-{i:02d}.mp3').set_frame_rate(24000).set_channels(1)
        # Preserve speech cadence; normalize only gross loudness differences, never time stretch.
        if audio.dBFS<float('inf') and audio.dBFS>-90:audio=audio.apply_gain(-19-audio.dBFS)
        start=len(joined);joined+=audio;end=len(joined)
        row={**t,'start_ms':start,'end_ms':end,'duration_ms':len(audio),'audio_file':f'turn-{i:02d}.mp3'};timeline.append(row)
        sentences=[x for x in re.split(r'(?<=[。？！；])',t['text']) if x]
        total=sum(len(s) for s in sentences);cursor=start
        for j,s in enumerate(sentences):
            stop=end if j==len(sentences)-1 else cursor+round(len(audio)*len(s)/total)
            cues.append({'start_ms':cursor,'end_ms':stop,'text':SPEC['roles'][t['speaker']]['name']+'：'+s,'speaker':t['speaker']});cursor=stop
        joined+=AudioSegment.silent(duration=270 if t['speaker']=='zhou' else 430,frame_rate=24000)
    joined+=AudioSegment.silent(duration=1800,frame_rate=24000)
    joined.export(OUT/f'{ID}-dialogue.mp3',format='mp3',bitrate='160k')
    joined.export(TEMP/f'{ID}-dialogue.wav',format='wav')
    srt='\n\n'.join(f'{i+1}\n{stamp(x["start_ms"],True)} --> {stamp(x["end_ms"],True)}\n{x["text"]}' for i,x in enumerate(cues))+'\n'
    vtt='WEBVTT\n\n'+'\n\n'.join(f'{stamp(x["start_ms"])} --> {stamp(x["end_ms"])}\n{x["text"]}' for x in cues)+'\n'
    (OUT/f'{ID}-dialogue.srt').write_text(srt,encoding='utf-8');(OUT/f'{ID}-dialogue.vtt').write_text(vtt,encoding='utf-8')
    SPEC.update({'timeline':timeline,'captions':cues,'duration_ms':len(joined),'audio_provider':'Edge online neural TTS via edge-tts','subtitle_timing':'sentence duration proportional within each independently synthesized turn; editorial timing draft'})
    (OUT/f'{ID}-dialogue.json').write_text(json.dumps(SPEC,ensure_ascii=False,indent=2),encoding='utf-8')
    script='\n\n'.join(SPEC['roles'][t['speaker']]['name']+'：'+t['text'] for t in SPEC['turns'])
    (OUT/f'{ID}-script.md').write_text('# '+SPEC['title']+'\n\n'+script+'\n\n'+SPEC['production_note'],encoding='utf-8')
    print(json.dumps({'audio':f'{ID}-dialogue.mp3','duration_seconds':len(joined)/1000,'turns':len(timeline)},ensure_ascii=False))

if __name__=='__main__':asyncio.run(main())
