const {test}=require('node:test'),assert=require('node:assert/strict');
const {read}=require('../assets/finova-pdf');
const file={size:100,arrayBuffer:async()=>new ArrayBuffer(8)};
function engine(pages){let destroyed=0,cleaned=0,options;return {load:async()=>({getDocument:opts=>{options=opts;return {promise:Promise.resolve({numPages:pages.length,getPage:async n=>({...pages[n-1],cleanup(){cleaned++}})}),destroy:async()=>{destroyed++}}}}),stats:()=>({destroyed,cleaned,options})}}
const textPage=text=>({getTextContent:async()=>({items:text.split('\n').map(str=>({str,hasEOL:true}))})});
test('PDF text is read across pages without OCR and resources are released',async()=>{
 const fake=engine([textPage('SHOP\nItem 20,00'),textPage('TOTAL 24,20')]);let calls=0;
 const text=await read(file,{load:fake.load,ocr:async()=>{calls++;return ''}});assert.match(text,/SHOP/);assert.match(text,/TOTAL 24,20/);assert.equal(calls,0);assert.equal(fake.stats().destroyed,1);assert.equal(fake.stats().cleaned,2);
});
test('scanned PDF renders a bounded canvas before OCR, then releases canvas and document',async()=>{
 let surface={width:0,height:0,getContext:()=>({})},viewport,rendered=0;
 const fake=engine([{getTextContent:async()=>({items:[]}),getViewport:({scale})=>({width:600*scale,height:800*scale}),render:o=>{viewport=o.viewport;rendered++;return {promise:Promise.resolve()}}}]);
 const result=await read(file,{load:fake.load,canvas:()=>surface,ocr:async image=>{assert.equal(image,surface);return 'SHOP\nTOTAL 12,50'}});
 assert.match(result,/12,50/);assert.equal(rendered,1);assert.ok(viewport.width<=1800&&viewport.height<=1800);assert.equal(surface.width,0);assert.equal(fake.stats().destroyed,1);assert.equal(fake.stats().cleaned,1);assert.equal(fake.stats().options.isEvalSupported,false);
});
test('oversized, long and password-protected PDFs fail without partial results',async()=>{
 await assert.rejects(()=>read({...file,size:11*1024*1024}),/pdfSize/);
 const fake=engine(Array(6).fill(textPage('SHOP TOTAL 1,00')));await assert.rejects(()=>read(file,{load:fake.load}),/pdfPages/);assert.equal(fake.stats().destroyed,1);
 let destroyed=0;await assert.rejects(()=>read(file,{load:async()=>({getDocument:()=>({promise:Promise.reject(Object.assign(Error(),{name:'PasswordException'})),destroy:async()=>{destroyed++}})})}),/pdfPassword/);assert.equal(destroyed,1);
});
test('cancelling PDF processing destroys the active task once',async()=>{
 const controller=new AbortController();let destroyed=0;
 await assert.rejects(()=>read(file,{signal:controller.signal,load:async()=>({getDocument:()=>({promise:Promise.resolve({numPages:1,getPage:async()=>{controller.abort();return {...textPage('SHOP TOTAL 1,00'),cleanup(){}}}}),destroy:async()=>{destroyed++}})})}),/cancelled/);assert.equal(destroyed,1);
});
