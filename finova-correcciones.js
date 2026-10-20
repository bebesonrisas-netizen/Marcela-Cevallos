/* Finova test branch: safe navigation and receipt metadata enhancements. */
(function(){
function init(){
 const nav=document.getElementById("nav"),docFile=document.getElementById("docFile");
 if(!nav)return;
 // Quick actions use section IDs rather than positional button indexes.
 const quick=document.getElementById("finovaQuick");
 if(quick){
  const buttons=quick.querySelectorAll("button");
  const go=(id)=>{const b=[...nav.querySelectorAll("button")].find(x=>x.getAttribute("onclick")?.includes("'"+id+"'"));if(b&&typeof window.show==="function")window.show(id,b);};
  if(buttons[0])buttons[0].onclick=()=>{go("mov");document.getElementById("desc")?.focus();};
  if(buttons[1])buttons[1].onclick=()=>{go("docs");docFile?.click();};
  if(buttons[2])buttons[2].onclick=()=>go("fact");
  if(buttons[3])buttons[3].onclick=()=>go("ahorro");
 }
 // Prevent silent overwrites of receipt fields during OCR-assisted entry.
 const vendor=document.getElementById("finovaDocVendor"),amount=document.getElementById("finovaDocAmount");
 if(vendor)vendor.autocomplete="organization";
 if(amount)amount.inputMode="decimal";
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();