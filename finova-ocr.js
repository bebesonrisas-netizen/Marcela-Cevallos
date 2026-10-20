/* OCR opt-in: image processing in browser, never automatically saves financial records. */
(function(){
let loading=null;
function loadOCR(){
 if(window.Tesseract)return Promise.resolve(window.Tesseract);
 if(loading)return loading;
 loading=new Promise((resolve,reject)=>{
 const s=document.createElement("script");
 s.src="https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js";
 s.onload=()=>window.Tesseract?resolve(window.Tesseract):reject(new Error("Biblioteca OCR no disponible"));
 s.onerror=()=>reject(new Error("No se pudo cargar el lector OCR"));
 document.head.appendChild(s);
 }).catch(e=>{loading=null;throw e});
 return loading;
}
function amountFrom(text){
 const matches=[...text.matchAll(/(?:^|\s)(\d{1,6}(?:[ .]\d{3})*[,.]\d{2})(?=\s|$|€|kr|sek)/g)].map(x=>({raw:x[1],at:x.index}));
 if(!matches.length)return "";
 const lines=text.split(/\r?\n/);const candidate=lines.filter(x=>/total|summa|att betala|amount due|importe/i.test(x)).join(" ");
 const preferred=[...candidate.matchAll(/\d{1,6}(?:[ .]\d{3})*[,.]\d{2}/g)].map(x=>x[0]);
 const raw=preferred.at(-1)||matches.at(-1).raw;
 const comma=raw.lastIndexOf(","),dot=raw.lastIndexOf(".");
 const decimal=Math.max(comma,dot);
 const normalized=raw.slice(0,decimal).replace(/[^\d]/g,"")+"."+raw.slice(decimal+1).replace(/[^\d]/g,"");
 return Number.isFinite(Number(normalized))?Number(normalized).toFixed(2):"";
}
function dateFrom(text){
 const m=text.match(/\b(20\d\d)[-/.](0?[1-9]|1[0-2])[-/.]([0-2]?\d|3[01])\b/)||text.match(/\b([0-2]?\d|3[01])[-/.](0?[1-9]|1[0-2])[-/.](20\d\d)\b/);
 if(!m)return "";
 const iso=m[1].length===4?[m[1],m[2],m[3]]:[m[3],m[2],m[1]];
 const d=iso.map((x,i)=>i?x.padStart(2,"0"):x).join("-");
 const parsed=new Date(d+"T12:00:00Z");return !Number.isNaN(parsed.getTime())&&parsed.toISOString().slice(0,10)===d?d:"";
}
async function read(){
 const file=document.getElementById("docFile")?.files?.[0],status=document.getElementById("finovaOcrStatus"),button=document.getElementById("finovaOcrButton");
 if(!file||!file.type.startsWith("image/")){status.textContent="Selecciona primero una imagen JPG, PNG u otra fotografía. Los PDF no se leen en esta versión.";return;}
 if(file.size>10*1024*1024){status.textContent="La imagen supera los 10 MB. Reduce su tamaño.";return;}
 button.disabled=true;status.textContent="Leyendo la imagen en este dispositivo. La primera vez puede tardar mientras se descarga el motor OCR.";
 try{
 const T=await loadOCR();const worker=await T.createWorker(["spa","eng","swe"]);
 let text="";
 try{text=(await worker.recognize(file)).data.text||"";}finally{await worker.terminate();}
 if(!text.trim()){status.textContent="No se ha detectado texto. Puedes introducir los datos manualmente.";return;}
 const lines=text.split(/\r?\n/).map(x=>x.trim()).filter(Boolean);
 const vendor=document.getElementById("finovaDocVendor"),amount=document.getElementById("finovaDocAmount"),date=document.getElementById("docDate"),name=document.getElementById("docName");
 if(vendor&&!vendor.value)vendor.value=(lines[0]||"").slice(0,90);
 if(name&&!name.value)name.value=(lines[0]||file.name).slice(0,90);
 const a=amountFrom(text);if(amount&&a&&!amount.value)amount.value=a;
 const d=dateFrom(text);if(date&&d&&!date.value)date.value=d;
 status.textContent="Lectura terminada. Revisa comercio, importe y fecha antes de pulsar Guardar. El OCR puede equivocarse.";
 }catch(e){status.textContent="No se pudo leer la imagen: "+e.message+". Puedes guardar los datos manualmente.";}
 finally{button.disabled=false;}
}
function init(){const file=document.getElementById("docFile");if(!file||document.getElementById("finovaOcrButton"))return;
 const container=document.createElement("div");container.className="section";const button=document.createElement("button");button.type="button";button.className="ghost";button.id="finovaOcrButton";button.textContent="🔎 Leer datos de la fotografía";button.onclick=read;
 const status=document.createElement("p");status.id="finovaOcrStatus";status.className="sub";status.setAttribute("role","status");status.textContent="Lectura opcional de imágenes en el navegador. Comprueba siempre los resultados.";
 container.append(button,status);document.getElementById("docChosen")?.after(container);
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();