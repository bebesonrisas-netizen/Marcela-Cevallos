const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {JSDOM}=require('jsdom');
const source=fs.readFileSync('assets/finova-ads.js','utf8');
function check(code,url,cmp){const dom=new JSDOM('<head></head><body><div data-finova-ad hidden></div></body>',{url,runScripts:'outside-only'});if(cmp)dom.window.__tcfapi=cmp;dom.window.eval(code);return dom}
test('advertising stays unloaded by default and cannot load on financial screens',()=>{
 for(const [code,url] of [[source,'https://example.test/organizar-facturas.html'],[source.replace('enabled:false','enabled:true').replace("slot:''","slot:'1234567890'"),'https://example.test/']]){
 const dom=check(code,url,()=>{throw Error('CMP must not be called')});try{assert.equal(dom.window.document.querySelectorAll('script').length,0);assert.equal(dom.window.document.querySelector('[data-finova-ad]').hidden,true)}finally{dom.window.close()}
 }
});
test('prepared ad loader refuses missing or denied consent',()=>{
 const code=source.replace('enabled:false','enabled:true').replace("slot:''","slot:'1234567890'");
 for(const cmp of [undefined,(_,__,cb)=>cb({eventStatus:'tcloaded',cmpStatus:'loaded',vendor:{consents:{755:false}},purpose:{consents:{}}},true)]){
 const dom=check(code,'https://example.test/organizar-facturas.html',cmp);try{assert.equal(dom.window.document.querySelectorAll('script').length,0)}finally{dom.window.close()}
 }
});
