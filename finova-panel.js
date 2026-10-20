(function(){
function init(){
 const home=document.getElementById("inicio"),nav=document.getElementById("nav");
 if(!home||!nav||document.getElementById("finovaQuick"))return;
 const bar=document.createElement("div");bar.id="finovaQuick";bar.className="finova-quick";
 const label=document.createElement("strong");label.textContent="⚡ Accesos rápidos";
 const actions=document.createElement("div");actions.className="actions";
 function go(id){
  const target=document.getElementById(id);
  const button=[...nav.querySelectorAll("button")].find(b=>b.getAttribute("onclick")?.includes("'"+id+"'"));
  if(!target||!button||typeof window.show!=="function")return false;
  window.show(id,button);return true;
 }
 const options=[
  ["＋ Movimiento",()=>{if(go("mov"))document.getElementById("desc")?.focus();}],
  ["📷 Recibo",()=>{if(go("docs"))document.getElementById("docFile")?.click();}],
  ["🧾 Facturas",()=>go("fact")],
  ["🐷 Ahorros",()=>go("ahorro")]
 ];
 for(const [name,fn] of options){const b=document.createElement("button");b.type="button";b.className="ghost";b.textContent=name;b.addEventListener("click",fn);actions.appendChild(b);}
 bar.append(label,actions);home.prepend(bar);
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();