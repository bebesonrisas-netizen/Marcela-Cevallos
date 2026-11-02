(function(root){
'use strict';
let library;
async function loadLibrary(){
 if(!library)library=import('https://cdn.jsdelivr.net/npm/pdfjs-dist@5.6.205/legacy/build/pdf.mjs').then(pdf=>{pdf.GlobalWorkerOptions.workerSrc='https://cdn.jsdelivr.net/npm/pdfjs-dist@5.6.205/legacy/build/pdf.worker.mjs';return pdf}).catch(e=>{library=null;throw e});
 return library;
}
function bytes(file){if(file.arrayBuffer)return file.arrayBuffer();return new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=()=>reject(Error('file'));reader.readAsArrayBuffer(file)})}
async function read(file,{ocr,signal,load=loadLibrary,canvas=()=>document.createElement('canvas')}={}){
 if(file.size>10*1024*1024)throw Error('pdfSize');
 const check=()=>{if(signal?.aborted)throw Error('cancelled')};check();
 const pdfjs=await load();check();const data=new Uint8Array(await bytes(file));check();
 const task=pdfjs.getDocument({data,isEvalSupported:false,useSystemFonts:true,useWasm:false});let destroyed=false;
 const destroy=()=>{if(!destroyed){destroyed=true;return Promise.resolve(task.destroy()).catch(()=>{})}};
 const abort=()=>{void destroy()};signal?.addEventListener('abort',abort,{once:true});if(signal?.aborted)abort();
 try{
  const pdf=await task.promise;check();if(pdf.numPages>5)throw Error('pdfPages');
  const pages=[];
  for(let n=1;n<=pdf.numPages;n++){
   check();const page=await pdf.getPage(n);
   try{
    let text='';try{const content=await page.getTextContent();text=content.items.map(i=>(i.str||'')+(i.hasEOL?'\n':' ')).join('')}catch{check()}
    check();
    if(!/[\p{L}]{3}/u.test(text)||!/[.,]\d{2}/.test(text)){
     if(typeof ocr!=='function')throw Error('pdfOCR');
     const base=page.getViewport({scale:1}),scale=Math.min(2,1800/Math.max(base.width,base.height)),viewport=page.getViewport({scale}),surface=canvas();
     surface.width=Math.max(1,Math.ceil(viewport.width));surface.height=Math.max(1,Math.ceil(viewport.height));
     try{await page.render({canvasContext:surface.getContext('2d'),viewport,background:'rgb(255,255,255)'}).promise;check();text=await ocr(surface);check()}finally{surface.width=surface.height=0}
    }
    pages.push(text);
   }finally{page.cleanup()}
  }
  return pages.join('\n');
 }catch(e){if(e.name==='PasswordException')throw Error('pdfPassword');throw e}
 finally{signal?.removeEventListener('abort',abort);await destroy()}
}
const api={read};if(typeof module==='object'&&module.exports)module.exports=api;else root.FinovaPDF=api;
})(typeof window==='undefined'?globalThis:window);
