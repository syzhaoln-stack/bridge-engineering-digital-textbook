"""Keep Quarto's inline reading controls and their editable JS source in sync."""
from pathlib import Path
import re
ROOT=Path(__file__).resolve().parents[1]
source=(ROOT/'interactive/core-reading.js').read_text(encoding='utf-8-sig')
snippet='<script>\n'+source+'\n</script>\n'
(ROOT/'includes/core-reading.html').write_text(snippet,encoding='utf-8')
count=0
for page in (ROOT/'_site').rglob('*.html'):
    if 'interactive' in page.relative_to(ROOT/'_site').parts: continue
    old=page.read_text(encoding='utf-8')
    new,n=re.subn(r"<script[^>]*>\s*\(\(\)=>\{const route=document.querySelector\('\.core-route'\);[\s\S]*?</script>",lambda _:snippet.strip(),old)
    if n and new!=old:page.write_text(new,encoding='utf-8');count+=1
print('Synchronized reading controls in',count,'published book pages')
