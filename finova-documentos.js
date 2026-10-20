(function(){
function init(){
 const section=document.getElementById("docs");
 if(!section||document.getElementById("finovaDocExtras"))return;
 const panel=document.createElement("div");panel.id="finovaDocExtras";panel.className="section card";
 const h=document.createElement("h2");h.textContent="🗂️ Datos del documento";
 const p=document.createElement("p");p.className="sub";p.textContent="Revisa los datos antes de guardar. El reconocimiento de imágenes es orientativo.";
 const grid=document.createElement("div");grid.className="formgrid";
 const vendor=document.createElement("input");vendor.id="finovaDocVendor";vendor.placeholder="Comercio o emisor";
 const amount=document.createElement("input");amount.id="finovaDocAmount";amount.type="number";amount.min="0";amount.step="0.01";amount.inputMode="decimal";amount.placeholder="Importe";
 const note=document.createElement("input");note.id="finovaDocNote";note.placeholder="Nota opcional";
 grid.append(vendor,amount,note);panel.append(h,p,grid);
 document.getElementById("docChosen")?.parentElement?.append(panel);
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();