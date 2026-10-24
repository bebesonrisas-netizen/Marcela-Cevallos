(function(){
'use strict';
// Activate only after AdSense approval, a certified CMP and a real ad unit are configured.
// This file is used only on editorial articles, never on financial records or sign-in screens.
const config={enabled:false,client:'ca-pub-9372552853655438',slot:''};
const allowed=['/presupuesto-ingresos-variables.html','/organizar-facturas.html'];
if(!config.enabled||!/^\d+$/.test(config.slot)||!allowed.includes(location.pathname)||typeof window.__tcfapi!=='function')return;
let mounted=false;
window.__tcfapi('addEventListener',2,function(tc,ok){
 if(!ok||!tc||!['tcloaded','useractioncomplete'].includes(tc.eventStatus))return;
 // Fail closed until a certified CMP supplies consent for Google and the purposes used here.
 const agreed=tc.cmpStatus==='loaded'&&tc.vendor?.consents?.[755]&&[1,2,3,4,7,9,10].every(p=>tc.purpose?.consents?.[p]);
 if(!agreed){if(mounted)location.reload();return}if(mounted)return;mounted=true;
 const box=document.querySelector('[data-finova-ad]');if(!box)return;
 const label=document.createElement('small');label.textContent='Publicidad';box.append(label);
 const ad=document.createElement('ins');ad.className='adsbygoogle';ad.style.display='block';ad.dataset.adClient=config.client;ad.dataset.adSlot=config.slot;ad.dataset.adFormat='auto';ad.dataset.fullWidthResponsive='true';box.append(ad);box.hidden=false;
 const script=document.createElement('script');script.async=true;script.crossOrigin='anonymous';script.src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client='+config.client;script.onload=()=>{(window.adsbygoogle=window.adsbygoogle||[]).push({})};script.onerror=()=>{box.hidden=true};document.head.append(script);
});
})();
