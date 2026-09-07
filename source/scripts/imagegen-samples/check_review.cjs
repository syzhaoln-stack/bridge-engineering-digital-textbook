const fs=require('fs'),path=require('path'),{pathToFileURL}=require('url');
const {chromium}=require('C:/Users/zhaos/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'../..'),out=path.join(root,'素材汇总/生成图选样/浏览器核验');fs.mkdirSync(out,{recursive:true});
const input=process.argv[2]||path.join(root,'_site/interactive/imagegen-review.html');
const url=/^https?:/.test(input)?input:pathToFileURL(path.resolve(input)).href;
const assert=(condition,msg)=>{if(!condition)throw new Error(msg)};
(async()=>{const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});const page=await browser.newPage({viewport:{width:1440,height:1050}});let errors=[];page.on('pageerror',e=>errors.push(e.message));
try{
await page.goto(url);await page.waitForSelector('.variant-card');
assert(await page.locator('.image-group').count()===8,'eight groups');assert(await page.locator('.variant-card').count()===24,'24 cards');assert(await page.locator('.revision-badge').count()===7,'seven warnings');assert(await page.locator('input[type=radio]:checked').count()===0,'no preselection');
for(const card of await page.locator('.variant-card').all()){await card.scrollIntoViewIfNeeded();await card.locator('img').evaluate(img=>img.loading='eager');await card.locator('img').evaluate(img=>img.decode());assert(await card.locator('img').evaluate(img=>img.naturalWidth===1536&&img.naturalHeight===1024),'image dimensions/load');}
await page.locator('input[value="G01-B"]').check();const first=page.locator('.image-group').first();await first.locator('textarea').fill('选 B；正式出版沿用参数底稿的尺寸。');
await page.locator('.image-group').nth(2).locator('input[value="__redo__"]').check();await page.reload();await page.waitForSelector('.variant-card');assert(await page.locator('input[value="G01-B"]').isChecked(),'selection persisted');assert((await first.locator('textarea').inputValue()).includes('参数底稿'),'notes persisted');
await first.locator('.image-open').first().click();assert(await page.locator('dialog').evaluate(x=>x.open),'zoom opened');await page.keyboard.press('Escape');
const downloaded=page.waitForEvent('download');await page.locator('#export').click();const download=await downloaded;const file=path.join(out,'qa-selection.json');await download.saveAs(file);const result=JSON.parse(fs.readFileSync(file,'utf8'));assert(JSON.stringify(result).includes('G01-B'),'export selection');
await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:path.join(out,'desktop.png')});
await page.setViewportSize({width:390,height:844});await page.locator('#group-nav a').nth(2).click();await page.waitForFunction(()=>{const y=document.querySelector('#review-group-3').getBoundingClientRect().top;return y>=0&&y<250});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'mobile no overflow');await page.screenshot({path:path.join(out,'mobile.png')});
assert(errors.length===0,'no JavaScript errors');const summary={url,groups:8,cards:24,needs_revision:7,all_24_images_loaded:true,no_default_selection:true,selection_and_notes_persist:true,json_export:true,dialog:true,mobile_no_overflow:true,errors};fs.writeFileSync(path.join(out,'result.json'),JSON.stringify(summary,null,2));console.log(JSON.stringify(summary));
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1});
