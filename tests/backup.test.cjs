const {test}=require('node:test');
const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
const html=fs.readFileSync('index.html','utf8');
for(const [,script] of html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g))new vm.Script(script);
const code=html.slice(html.indexOf('function finovaValidateBackup('),html.indexOf('\nfunction saveCfg()'));
const personal={moves:[{type:'expense',amount:25,desc:'Compra',date:'2026-10-23'}],loans:[],bills:[],documents:[],cfg:{currency:'kr'}};
const business={moves:[{type:'income',amount:90,desc:'Venta',date:'2026-10-23'}]};
function setup(raw,{confirm=true,fail=false}={}){
 const stored=new Map([['personal','original personal'],['business','original business']]);
 const status={textContent:''},alerts=[];let confirmed=0,rendered=0;
 const ctx={key:'personal',finovaBizKey:'business',data:'old',finovaBiz:'old business',currency:{value:'€'},
 document:{getElementById:id=>id==='restoreFinovaFile'?{files:[{text:async()=>JSON.stringify(raw)}]}:status},
 localStorage:{getItem:k=>stored.get(k)??null,setItem:(k,v)=>{if(fail&&k==='personal'&&v!=='original personal')throw Error('quota');stored.set(k,v)},removeItem:k=>stored.delete(k)},
 confirm:()=>{confirmed++;return confirm},alert:x=>alerts.push(x),render:()=>rendered++,finovaRenderBusiness:()=>rendered++};
 vm.createContext(ctx);vm.runInContext(code,ctx);
 return {ctx,stored,status,alerts,get confirmed(){return confirmed},get rendered(){return rendered}};
}
test('combined export format restores both spaces',async()=>{const s=setup({format:'finova-backup-v2',personal,business});await s.ctx.restoreFinovaBackup();assert.deepEqual(JSON.parse(s.stored.get('personal')),personal);assert.deepEqual(JSON.parse(s.stored.get('business')),business);assert.equal(s.ctx.currency.value,'kr');assert.equal(s.alerts.length,0);assert.equal(s.rendered,2)});
test('v1 restores Personal and preserves Negocios',async()=>{const s=setup({format:'finova-backup-v1',data:personal});await s.ctx.restoreFinovaBackup();assert.deepEqual(JSON.parse(s.stored.get('personal')),personal);assert.equal(s.stored.get('business'),'original business');assert.equal(s.ctx.finovaBiz,'old business')});
test('cancel preserves both spaces',async()=>{const s=setup({format:'finova-backup-v2',personal,business},{confirm:false});await s.ctx.restoreFinovaBackup();assert.equal(s.stored.get('personal'),'original personal');assert.equal(s.stored.get('business'),'original business');assert.equal(s.rendered,0)});
test('malformed records are rejected before confirmation or writes',async()=>{const s=setup({format:'finova-backup-v2',personal,business:{moves:[null]}});await s.ctx.restoreFinovaBackup();assert.equal(s.confirmed,0);assert.equal(s.stored.get('personal'),'original personal');assert.equal(s.alerts.length,1)});
test('storage failure rolls back both spaces and leaves memory unchanged',async()=>{const s=setup({format:'finova-backup-v2',personal,business},{fail:true});await s.ctx.restoreFinovaBackup();assert.equal(s.stored.get('personal'),'original personal');assert.equal(s.stored.get('business'),'original business');assert.equal(s.ctx.data,'old');assert.equal(s.ctx.finovaBiz,'old business');assert.equal(s.alerts.length,1)});
