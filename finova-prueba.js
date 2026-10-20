/* Finova: local trial reminder prototype. Production entitlements must be verified server-side. */
(function(){
 const KEY="finova_trial_start_v1",DAYS=12,DAY=86400000;
 function start(){try{let x=localStorage.getItem(KEY);if(!x){x=new Date().toISOString();localStorage.setItem(KEY,x);}return x;}catch(e){return null;}}
 function init(){
  const home=document.getElementById("inicio");if(!home||document.getElementById("finovaTrialNotice"))return;
  const began=start();if(!began)return;
  const stamp=Date.parse(began);if(!Number.isFinite(stamp))return;
  const ends=stamp+DAYS*DAY,remaining=Math.max(0,Math.ceil((ends-Date.now())/DAY));
  const box=document.createElement("div");box.id="finovaTrialNotice";box.className="card";box.style.cssText="margin:12px 0;padding:14px;border-left:4px solid #7366d9";
  const title=document.createElement("strong");title.textContent=remaining?"🎁 Prueba Premium: "+remaining+" día(s) restantes":"⏰ Tu prueba Premium de 12 días ha terminado";
  const desc=document.createElement("p");desc.className="sub";desc.style.margin="6px 0 0";
  desc.textContent=remaining?"Finaliza el "+new Date(ends).toLocaleDateString("es-ES")+". Al terminar, no habrá cobros automáticos ni recargos; solo contratarás Premium si lo eliges expresamente.":"Puedes seguir usando las funciones gratuitas. No se realizará ningún cobro automático ni recargo al finalizar la prueba. Premium solo se activará mediante una contratación voluntaria.";
  box.append(title,desc);home.prepend(box);
 }
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();