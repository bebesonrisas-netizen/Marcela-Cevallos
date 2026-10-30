(()=>{'use strict';
let prompt;const button=document.createElement('button');button.className='ghost';button.type='button';
const names=['Instalar app','Install app','Installer l’app','App installieren','Installa app','Instalar app','Installera app'],langs=['es','en','fr','de','it','pt','sv'];
function label(){button.textContent='📲 '+names[Math.max(0,langs.indexOf(document.documentElement.lang))]}
label();window.addEventListener('finova:language',label);document.querySelector('header .actions')?.append(button);
// App installation is optional; never alter browser storage or move to a different origin.
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();prompt=e});
button.onclick=async()=>{if(prompt){await prompt.prompt();prompt=null}else window.open('/instalar.html','_blank','noopener')};
})();
