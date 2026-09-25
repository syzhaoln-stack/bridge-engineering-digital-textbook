/* Textbook host adapter. Calculations remain in the original classroom. */
(() => {
  'use strict';
  const embedded=new URLSearchParams(location.search).get('embed')==='construction';
  if(!embedded||parent===window)return;
  const origin=location.origin,app=window.compositeDemo;
  if(!app)return;
  app.stop();
  const send=data=>parent.postMessage({source:'bridge-lab',...data},origin);
  const report=(type,requestId)=>{
    const r=app.state.result;
    send({type,requestId,metrics:{stage:r.stage,progress:r.progress,active:r.concreteActive,
      concreteTop:r.concreteTop,concreteBottom:r.concreteBottom,concreteForce:r.concreteForce,
      steelForce:r.steelForce,delta1:r.delta1,delta2:r.delta2,deltaTotal:r.deltaTotal}});
  };
  window.addEventListener('message',event=>{
    if(event.source!==parent||event.origin!==origin)return;
    const d=event.data;
    if(d?.source!=='bridge-book-guide'||d.bridge!=='girder'||!['set-view','set-progress'].includes(d.type))return;
    const match=/^composite_stage_([0-4])$/.exec(d.beat||'');
    if(!match||!Number.isFinite(d.progress))return;
    app.stop();app.state.stage=Number(match[1]);app.state.progress=Math.max(0,Math.min(1,d.progress));
    app.state.system='total';app.state.explode=false;
    if(d.type==='set-view'&&!d.keepCamera)app.scene?.setView('iso');
    app.update();report(d.type==='set-view'?'applied':'progress-applied',d.requestId);
  });
  document.querySelector('#viewport canvas')?.addEventListener('pointerdown',()=>send({type:'interaction'}));
  app.state.stage=0;app.state.progress=0;app.update();
  send({type:'ready'});
})();
