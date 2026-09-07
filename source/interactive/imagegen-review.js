(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const storageKey = 'bridge-imagegen-review:v1:' + location.pathname;
  const REDO = '__redo__';
  const raw = window.IMAGEGEN_REVIEW;
  const baseline = window.IMAGEGEN_APPROVED_SELECTION;
  const groups = Array.isArray(raw?.groups) ? raw.groups.filter(g => g && typeof g.id === 'string' && Array.isArray(g.variants)) : [];
  const state = Object.create(null);
  let storageAvailable = true;
  let lastOpener = null;
  const cardMap = new Map();
  const navMap = new Map();
  const redoMap = new Map();
  const emptyMap = new Map();
  let viewMode = 'selected';
  const dialog = $('image-dialog');

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = String(text);
    return node;
  }
  function asText(value) {
    if (value === null || value === undefined) return '';
    if (Array.isArray(value)) return value.map(asText).filter(Boolean).join('\n');
    if (typeof value === 'object') return Object.entries(value).map(([k,v]) => k + '：' + asText(v)).join('\n');
    return String(value);
  }
  function safeURL(value) {
    if (typeof value !== 'string' || !value.trim()) return null;
    try {
      const url = new URL(value, document.baseURI);
      return ['file:', 'http:', 'https:'].includes(url.protocol) ? url.href : null;
    } catch { return null; }
  }
  function link(label, value, className) {
    const url = safeURL(value);
    if (!url) return null;
    const node = el('a', className, label);
    node.href = url;
    node.target = '_blank';
    node.rel = 'noopener';
    return node;
  }
  function status(message, warning = false) {
    $('save-status').textContent = message;
    $('save-status').classList.toggle('storage-warning', warning);
  }
  function restore() {
    let saved;
    try { saved = JSON.parse(localStorage.getItem(storageKey) || 'null'); }
    catch { storageAvailable = false; }
    for (const group of groups) {
      // A local entry, including an explicit null choice, is an author's later edit.
      const hasLocal = saved?.groups && Object.prototype.hasOwnProperty.call(saved.groups,group.id);
      const entry = hasLocal ? saved.groups[group.id] : baseline?.groups?.[group.id];
      const valid = entry?.choice === REDO || group.variants.some(v => v.id === entry?.choice);
      state[group.id] = {choice: valid ? entry.choice : null, notes: typeof entry?.notes === 'string' ? entry.notes : '', updated_at: entry?.updated_at || null};
    }
    if (!storageAvailable) status('本浏览器暂不能保存记录；请在离开前导出 JSON。', true);
    else if (saved?.groups) status('已保留当前浏览器的选择与备注；没有本地记录的组沿用 2026-09-07 选样。');
  }
  function save() {
    try {
      localStorage.setItem(storageKey, JSON.stringify({schema_version:1, groups:state}));
      storageAvailable = true;
      status('已保存在当前浏览器 · 导出 JSON 可留档或交给他人。');
    } catch {
      storageAvailable = false;
      status('本浏览器无法保存记录；当前选择仍可导出 JSON，请在离开前导出。', true);
    }
  }
  function totals() {
    let selected = 0, redo = 0;
    for (const group of groups) {
      if (state[group.id].choice === REDO) redo++;
      else if (state[group.id].choice) selected++;
    }
    return {total:groups.length, selected, redo, undecided:groups.length-selected-redo};
  }
  function refresh() {
    const count = totals();
    const progress = $('progress');
    progress.replaceChildren();
    [['已选样',count.selected + ' / ' + count.total],['待重做',count.redo],['未决定',count.undecided]].forEach(([label,value],index) => {
      if (index) progress.append(el('span','count-separator','·'));
      const part = el('span','count-part');
      part.append(el('strong','',value),document.createTextNode(label));
      progress.append(part);
    });
    for (const group of groups) {
      const choice = state[group.id].choice;
      for (const variant of group.variants) {
        const item = cardMap.get(group.id + '\u0000' + variant.id);
        if (item) {
          item.card.classList.toggle('is-selected',choice === variant.id);
          item.input.checked = choice === variant.id;
          item.card.hidden = viewMode === 'selected' && choice !== variant.id;
        }
      }
      const redo = redoMap.get(group.id);
      if (redo) {
        redo.input.checked = choice === REDO;
        redo.label.classList.toggle('is-selected',choice === REDO);
      }
      const nav = navMap.get(group.id);
      nav.classList.toggle('is-decided',Boolean(choice) && choice !== REDO);
      nav.classList.toggle('is-redo',choice === REDO);
      nav.setAttribute('aria-label',group.title + (choice === REDO ? '，已标记都待重做' : choice ? '，已有选择' : '，未决定'));
      const empty = emptyMap.get(group.id);
      empty.hidden = viewMode === 'all' || Boolean(choice && choice !== REDO);
      empty.querySelector('p').textContent = choice === REDO ? '本组已标记都待重做。可以展开候选，重新选择或补充备注。' : '本组尚未选择。可以展开候选，再选一张。';
    }
    const totalVariants=groups.reduce((total,group)=>total+group.variants.length,0);
    $('view-selected').textContent=count.selected+' 张选样';
    $('view-all').textContent=totalVariants+' 张对比';
    $('view-selected').setAttribute('aria-pressed',String(viewMode==='selected'));
    $('view-all').setAttribute('aria-pressed',String(viewMode==='all'));
    $('groups').classList.toggle('selected-view',viewMode==='selected');
    $('view-description').textContent=viewMode==='selected' ? `另外 ${totalVariants-count.selected} 张已收起，随时可以展开比较。` : `正在比较全部 ${totalVariants} 张；选中后可返回选样视图。`;
    $('export').disabled = !groups.length;
    $('clear').disabled = !groups.some(g => state[g.id].choice || state[g.id].notes);
  }
  function choose(group, value) {
    state[group.id].choice = value;
    state[group.id].updated_at = new Date().toISOString();
    refresh();
    save();
  }
  function openImage(url, title, note, opener) {
    lastOpener = opener;
    $('dialog-image').src = url;
    $('dialog-image').alt = title;
    $('dialog-title').textContent = title;
    $('dialog-note').textContent = note || '';
    $('dialog-note').hidden = !note;
    $('dialog-original').href = url;
    dialog.showModal();
    document.body.classList.add('is-dialog-open');
    $('close-dialog').focus();
  }
  function imageButton(value, title, note) {
    const button = el('button','image-open');
    button.type = 'button';
    button.setAttribute('aria-label','放大查看：' + title);
    const url = safeURL(value);
    const img = el('img');
    img.alt = title;
    img.loading = 'lazy';
    img.decoding = 'async';
    const fallback = el('span','image-fallback','图片暂时无法读取，请检查随教材提供的图片文件。');
    fallback.hidden = true;
    img.addEventListener('error',() => { fallback.hidden = false; button.disabled = true; });
    if (url) img.src = url;
    else {fallback.hidden = false;button.disabled = true;}
    button.append(img,el('span','zoom-hint','点图放大'),fallback);
    button.addEventListener('click',() => openImage(url,title,note,button));
    return button;
  }
  function renderVariant(group, variant, index, radioName) {
    const letter = String.fromCharCode(65+index);
    const title = group.id + ' · ' + letter + ' · ' + asText(variant.style || '候选画法');
    const card = el('article','variant-card');
    const heading = el('header','card-heading');
    heading.append(el('span','variant-letter',letter),el('h3','',variant.style || '候选画法'));
    if (variant.needs_revision) heading.append(el('span','revision-badge','待修正'));
    card.append(heading,imageButton(variant.image,title,variant.needs_revision ? '此图有待修正项；选中仅记录画法意向。' : '候选图的结构与尺寸仍以核实后的底稿为准。'));
    const body = el('div','card-body');
    if (variant.needs_revision) body.append(el('p','revision-note','有待修正项，选中后仍需修改。'));
    const details = el('details','review-notes');
    details.append(el('summary','','比例复核与来源'));
    details.append(el('p','',asText(variant.review) || '本页尚未提供详细复核记录。'));
    details.append(el('p','scale-note',asText(variant.scale_status) || '未提供尺寸复核状态。'));
    const metadata = link('查看逐图记录',variant.metadata_url,'metadata-link');
    if (metadata) details.append(metadata);
    body.append(details);
    card.append(body);
    const label = el('label','choose-label');
    const input = el('input');
    input.type = 'radio';input.name = radioName;input.value = variant.id;
    input.setAttribute('aria-label',group.title + '，选择 ' + letter + '，' + asText(variant.style));
    input.addEventListener('change',() => {if(input.checked)choose(group,variant.id);});
    label.append(input,el('span','','选 ' + letter),el('span','chosen-mark','已选中'));
    card.append(label);
    cardMap.set(group.id+'\u0000'+variant.id,{card,input});
    return card;
  }
  function references(group) {
    const details = el('details','reference-details');
    details.append(el('summary','','对照参数底稿与原图'));
    if (group.dimensions_summary) details.append(el('p','dimension-note',asText(group.dimensions_summary)));
    const grid = el('div','reference-grid');
    for (const [caption,value] of [['参数底稿',group.reference_url],['原始工程图 · '+asText(group.figure),group.original_url]]) {
      if (!safeURL(value)) continue;
      const figure = el('figure','reference-figure');
      figure.append(imageButton(value,group.id+' · '+caption,'参考图与候选画法分别检查；生成图不代替定量工程图。'),el('figcaption','',caption));
      grid.append(figure);
    }
    if(grid.children.length) details.append(grid);
    else details.append(el('p','dimension-note','本页尚未提供参考图链接。'));
    return details;
  }
  function render() {
    $('groups').replaceChildren();
    groups.forEach((group, groupIndex) => {
      const anchor = 'review-group-' + (groupIndex+1);
      const nav = el('a');nav.href='#'+anchor;
      nav.append(el('span','nav-id',group.id),document.createTextNode(group.title || group.id));
      $('group-nav').append(nav);navMap.set(group.id,nav);
      const section = el('section','image-group');section.id=anchor;
      const heading = el('div','group-heading');
      const text = el('div');
      const kicker = el('p','group-kicker');kicker.append(el('span','group-id',group.id),document.createTextNode(asText(group.figure)));
      const title = el('h2','',group.title || group.id);title.id=anchor+'-title';
      section.setAttribute('aria-labelledby',title.id);
      text.append(kicker,title);
      if (group.usage) text.append(el('p','group-usage',asText(group.usage)));
      heading.append(text);
      const chapter = link('回到正文 ↗',group.chapter_url,'chapter-link');
      if(chapter) heading.append(chapter);
      section.append(heading);
      const fieldset = el('fieldset','choice-set');
      fieldset.append(el('legend','visually-hidden',group.title + '：选择一张候选图，或全部重做'));
      const grid = el('div','variant-grid');
      const radioName = 'choice-'+groupIndex;
      group.variants.forEach((variant,index) => grid.append(renderVariant(group,variant,index,radioName)));
      fieldset.append(grid);
      const empty=el('div','selection-empty');empty.append(el('p'));
      const expand=el('button','button','展开全部候选');expand.type='button';
      expand.addEventListener('click',()=>setView('all'));empty.append(expand);fieldset.append(empty);emptyMap.set(group.id,empty);
      const decision = el('div','group-decision');
      const redoLabel = el('label','redo-label');const redo = el('input');
      redo.type='radio';redo.name=radioName;redo.value=REDO;
      redo.setAttribute('aria-label',group.title+'，都待重做');
      redo.addEventListener('change',() => {if(redo.checked)choose(group,REDO);});
      redoLabel.append(redo,document.createTextNode('都待重做'));
      redoMap.set(group.id,{input:redo,label:redoLabel});
      const noteField = el('div','note-field');
      const noteLabel = el('label','','本组备注');const note = el('textarea');
      note.id=anchor+'-note';noteLabel.htmlFor=note.id;note.rows=2;
      note.placeholder='例如：保留 B 的画法，车辆缩小；桥塔沿用参数底稿。';
      note.value=state[group.id].notes;
      note.addEventListener('input',() => {
        state[group.id].notes=note.value;state[group.id].updated_at=new Date().toISOString();save();
        $('clear').disabled = !groups.some(g => state[g.id].choice || state[g.id].notes);
      });
      noteField.append(noteLabel,note);decision.append(redoLabel,noteField);
      fieldset.append(decision);section.append(fieldset,references(group));$('groups').append(section);
    });
  }
  function setView(mode){viewMode=mode;refresh();}
  $('view-selected').addEventListener('click',()=>setView('selected'));
  $('view-all').addEventListener('click',()=>setView('all'));
  $('export').addEventListener('click',() => {
    const output = {schema_version:1, exported_at:new Date().toISOString(), purpose:'画法选样；不表示结构、尺寸或出版审查通过', counts:totals(), groups:groups.map(group => {
      const entry=state[group.id], variant=group.variants.find(v=>v.id===entry.choice);
      return {id:group.id,title:group.title,figure:group.figure,status:entry.choice===REDO?'redo':variant?'selected':'undecided',selected_variant:variant?{id:variant.id,style:variant.style,image:variant.image,needs_revision:Boolean(variant.needs_revision),metadata_url:variant.metadata_url}:null,notes:entry.notes,updated_at:entry.updated_at};
    })};
    const blob = new Blob([JSON.stringify(output,null,2)],{type:'application/json;charset=utf-8'});
    const url=URL.createObjectURL(blob),a=document.createElement('a');
    a.href=url;a.download='桥梁教材_图像选样_'+new Date().toISOString().slice(0,10)+'.json';
    document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);
    status(storageAvailable?'已导出 JSON；本机记录继续保留。':'已导出 JSON；本浏览器仍无法保存，请保留导出文件。',!storageAvailable);
  });
  $('clear').addEventListener('click',() => {
    if(!window.confirm('清空本页全部选择和备注？已经导出的 JSON 文件不会被删除。'))return;
    for(const group of groups)state[group.id]={choice:null,notes:'',updated_at:null};
    // Persist the clear explicitly so a reload does not silently restore the baseline.
    try{localStorage.setItem(storageKey,JSON.stringify({schema_version:1,groups:state}));storageAvailable=true;}catch{storageAvailable=false;}
    document.querySelectorAll('.note-field textarea').forEach(note=>{note.value='';});
    refresh();status(storageAvailable?'本页选择和备注已清空。':'当前页面已清空；浏览器存储不可用，请另行检查旧记录。',!storageAvailable);
  });
  $('close-dialog').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
  dialog.addEventListener('close',()=>{document.body.classList.remove('is-dialog-open');lastOpener?.focus();});
  if(!groups.length){
    $('progress').textContent='尚未载入候选组';
    const box=el('div','empty-state');box.append(el('h2','','候选数据暂未就绪'),el('p','','请确认 imagegen-review-data.js 与本页位于同一文件夹，且候选图片已随教材保存。刷新本页即可重新读取。'));
    $('groups').replaceChildren(box);status('数据未载入时不会改动已保存的选择。');return;
  }
  restore();render();refresh();
})();
