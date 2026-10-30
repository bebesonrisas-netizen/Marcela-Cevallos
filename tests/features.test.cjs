const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {JSDOM}=require('jsdom'),tools=require('../assets/finova-tools');
function app(){
 const dom=new JSDOM(fs.readFileSync('index.html','utf8'),{url:'https://storied-pika-1d2990.netlify.app/',runScripts:'outside-only',pretendToBeVisual:true});
 const w=dom.window;w.alert=()=>{};w.confirm=()=>true;w.HTMLElement.prototype.scrollIntoView=()=>{};w.URL.createObjectURL=()=> 'blob:backup';w.netlifyIdentity={on(){},currentUser(){return null}};
 w.fetch=async()=>({ok:true,json:async()=>({enabled:false,mode:'disabled'})});
 const scripts=[];for(const s of w.document.scripts){if(s.src&&s.src.includes('/assets/'))scripts.push(fs.readFileSync(s.src.split('/').slice(-2).join('/'),'utf8'));else if(!s.src)scripts.push(s.textContent)}w.eval(scripts.join('\n;\n'));
 return dom;
}
const tick=()=>new Promise(r=>setTimeout(r,5));
test('receipt parser prioritises total over tax, tendered cash and change',()=>{
 const receipt=tools.parseReceipt('SUPERMARKET\n23/10/2026\nSubtotal 20,00\nIVA 4,20\nTOTAL EUR 24,20\nCash 50,00\nChange 25,80');
 assert.equal(receipt.amount,24.2);assert.equal(receipt.date,'2026-10-23');assert.equal(receipt.merchant,'SUPERMARKET');
 assert.equal(tools.parseNumber('1.234,56'),1234.56);assert.equal(tools.parseNumber('1,234.56'),1234.56);
 assert.equal(tools.validDate('2026-02-30'),false);
});
test('movement interpretation works in seven languages, with yesterday and decimal comma',()=>{
 for(const text of ['Gasté 35,50 euros ayer','I spent 35.50 euros yesterday','J’ai dépensé 35,50 euros hier','Ich habe 35,50 Euro ausgegeben gestern','Ho speso 35,50 euro ieri','Gastei 35,50 euros ontem','Jag betalade 35,50 euro igår']){const x=tools.parseMovement(text,new Date('2026-10-23T12:00:00'));assert.equal(x.amount,35.5,text);assert.equal(x.type,'expense',text);assert.equal(x.date,'2026-10-22',text)}
 for(const text of ['Recibí 100 euros','Received 100 euros','Reçu 100 euros','Gehalt 100 Euro','Ricevuto 100 euro','Recebi 100 euros','Fick 100 euro'])assert.equal(tools.parseMovement(text).type,'income',text);
});
test('all seven languages translate navigation and placeholders without changing stored option values',async()=>{
 const dom=app(),w=dom.window;try{const option=w.document.querySelector('#docType option');const original=option.value;
 for(const lang of ['es','en','fr','de','it','pt','sv']){w.document.getElementById('lang').value=lang;w.setLang();await tick();assert.equal(w.document.documentElement.lang,lang);assert.equal(w.document.getElementById('docName').placeholder,w.FinovaI18n.dict[lang]['Nombre del documento']);assert.equal(option.value,original);assert.ok(w.document.querySelector('nav').textContent.includes(w.FinovaI18n.dict[lang]['Configuración']))}
 }finally{dom.window.close()}
});
test('assistant prepares and confirms a movement once and displays saved amount',async()=>{
 const dom=app(),w=dom.window;try{w.document.getElementById('lang').value='sv';w.setLang();w.document.getElementById('finovaAsk').value='Jag betalade 35,50 euro igår';w.finovaAnswer();assert.equal(w.document.getElementById('finovaMoveAmount').value,'35.5');assert.equal(w.localStorage.getItem('mi_finanzas_v1'),null);w.finovaSaveMove();assert.equal(JSON.parse(w.localStorage.getItem('mi_finanzas_v1')).moves[0].amount,35.5);w.finovaSaveMove();assert.equal(JSON.parse(w.localStorage.getItem('mi_finanzas_v1')).moves.length,1);assert.ok(w.document.getElementById('finovaMoveReview').classList.contains('hidden'));await tick()}finally{dom.window.close()}
});
test('voice unsupported, permission error and transcript all have controlled outcomes',()=>{
 const dom=app(),w=dom.window;try{w.finovaStartVoice();assert.match(w.document.getElementById('finovaAnswerBox').textContent,/no admite/);
 let active;w.SpeechRecognition=class{constructor(){active=this}start(){}stop(){this.onend()}abort(){this.onend()}};w.finovaStartVoice();assert.equal(active.lang,'es-ES');active.onerror({error:'not-allowed'});active.onend();assert.match(w.document.getElementById('finovaAnswerBox').textContent,/micrófono/);
 w.finovaStartVoice();active.onresult({results:[[{transcript:'Gasté 12 euros'}]]});active.onend();assert.equal(w.document.getElementById('finovaMoveAmount').value,'12');assert.equal(w.localStorage.getItem('mi_finanzas_v1'),null)
 }finally{dom.window.close()}
});
test('camera closes tracks on navigation and handles denied permission',async()=>{
 const dom=app(),w=dom.window;try{Object.defineProperty(w.navigator,'mediaDevices',{value:{getUserMedia:async()=>{throw Error('denied')}},configurable:true});await w.openCamera();assert.match(w.document.getElementById('finovaOCRStatus').textContent,/permisos/);
 let stopped=0;Object.defineProperty(w.navigator,'mediaDevices',{value:{getUserMedia:async()=>({getTracks:()=>[{stop(){stopped++}}]})},configurable:true});w.HTMLMediaElement.prototype.play=async()=>{};await w.openCamera();assert.equal(w.document.getElementById('finovaCameraPanel').classList.contains('hidden'),false);w.show('inicio');assert.equal(stopped,1);assert.equal(w.document.getElementById('finovaCameraVideo').srcObject,null)
 }finally{dom.window.close()}
});
test('OCR adapter uses selected language, terminates worker and requires explicit confirmation',async()=>{
 const dom=app(),w=dom.window;try{let terminated=0,language;const file=new w.File(['test'],'receipt.jpg',{type:'image/jpeg'});Object.defineProperty(w.document.getElementById('docFile'),'files',{value:[file],configurable:true});w.finovaPrepareImage=async x=>x;w.Tesseract={createWorker:async l=>{language=l;return {recognize:async()=>({data:{text:'SUPERMARKET\n2026-10-23\nTOTAL 24,20'}}),terminate:async()=>terminated++}}};await w.finovaReadReceipt();assert.equal(language,'spa');assert.equal(terminated,1);assert.equal(w.document.getElementById('finovaAmount').value,'24.2');assert.equal(w.localStorage.getItem('mi_finanzas_v1'),null);w.finovaConfirmExpense();assert.equal(JSON.parse(w.localStorage.getItem('mi_finanzas_v1')).moves[0].amount,24.2)
 }finally{dom.window.close()}
});
test('billing remains closed when configuration is disabled, even with local spoofed plan',async()=>{
 const dom=app(),w=dom.window;try{w.localStorage.setItem('finova_checkout_success','true');await w.showPlans();assert.equal(w.document.getElementById('finovaTestPlans').hidden,true);assert.match(w.document.getElementById('finovaBillingStatus').textContent,/configuración en Netlify/)}finally{dom.window.close()}
});
test('monthly totals exclude earlier months and unsafe descriptions render as text',()=>{
 const dom=app(),w=dom.window;try{const now=new Date(),today=now.toISOString().slice(0,10),previous=new Date(now.getFullYear(),now.getMonth()-1,15).toISOString().slice(0,10);
 function add(date,amount){w.document.getElementById('desc').value='<img src=x onerror=alert(1)>';w.document.getElementById('amount').value=amount;w.document.getElementById('date').value=date;w.document.getElementById('type').value='income';w.addMove()}
 add(previous,50);add(today,100);assert.match(w.document.getElementById('income').textContent,/100/);assert.equal(w.document.getElementById('moves').querySelector('img'),null);assert.equal(JSON.parse(w.localStorage.getItem('mi_finanzas_v1')).moves.length,2)
 }finally{dom.window.close()}
});
module.exports={app};
test('Premium report requires consent, sends aggregates only and escapes category content',async()=>{
 const dom=app(),w=dom.window;try{
  const period=w.document.getElementById('premiumMonth').value;w.document.getElementById('date').value=period+'-15';w.document.getElementById('desc').value='PRIVATE_DESCRIPTION';w.document.getElementById('amount').value='35.50';w.document.getElementById('type').value='expense';w.addMove();
  const payload=w.finovaReportPayload('personal',period);assert.equal(payload.rows[0].cents,3550);assert.equal(JSON.stringify(payload).includes('PRIVATE_DESCRIPTION'),false);
  let calls=0;w.netlifyIdentity.currentUser=()=>({jwt:async()=> 'verified.token'});w.fetch=async(url,options)=>{calls++;assert.equal(url,'/.netlify/functions/premium-report');assert.equal(options.headers.Authorization,'Bearer verified.token');return {ok:true,json:async()=>({kind:'personal',period,test:true,totals:{income:0,expense:3550,balance:-3550},prior:{income:0,expense:0,balance:0},categories:[{type:'expense',category:'<img src=x onerror=alert(1)>',cents:3550}]})}};
  await w.document.getElementById('premiumGenerate').onclick();assert.equal(calls,0);w.document.getElementById('premiumConsent').checked=true;await w.document.getElementById('premiumGenerate').onclick();assert.equal(calls,1);assert.equal(w.document.getElementById('premiumReportOutput').querySelector('img'),null);assert.match(w.document.getElementById('premiumReportOutput').textContent,/TEST/);
 }finally{w.close()}
});
test('subscription check reports progress, ignores duplicate clicks and restores controls after a stalled request',async()=>{
 const dom=app(),w=dom.window;try{
 w.fetch=async()=>({ok:true,json:async()=>({enabled:true,mode:'test'})});await w.showPlans();
 w.netlifyIdentity.currentUser=()=>({jwt:async()=> 'test-token'});
 let calls=0;w.fetch=()=>{calls++;return new Promise(()=>{})};
 const originalTimeout=w.setTimeout.bind(w);w.setTimeout=(fn,ms,...args)=>originalTimeout(fn,ms===15000?20:ms,...args);
 const first=w.finovaRefreshSubscription();assert.match(w.document.getElementById('finovaBillingStatus').textContent,/Verificando/);
 assert.equal(w.document.querySelector('#finovaTestPlans button').disabled,true);
 assert.equal(await w.finovaRefreshSubscription(),null);await first;
 assert.equal(calls,1);assert.match(w.document.getElementById('finovaBillingStatus').textContent,/No se pudo/);
 assert.equal(w.document.querySelector('#finovaTestPlans button').disabled,false);
 }finally{dom.window.close()}
});
