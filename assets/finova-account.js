(function(){'use strict';
const tr=s=>window.FinovaI18n.tr(s),identity=window.netlifyIdentity,actions=document.querySelector('header .actions');
const login=document.createElement('button'),logout=document.createElement('button'),premium=document.createElement('button');
for(const b of [login,logout,premium]){b.type='button';b.className='ghost'}
login.id='finovaAccountLogin';logout.id='finovaAccountLogout';premium.id='finovaAccountPremium';
login.onclick=()=>openAuth('login');premium.onclick=()=>showPlans();
logout.onclick=async()=>{logout.disabled=true;try{await identity.logout();update(null)}catch{alert(tr('No se pudo cerrar la sesión. Vuelve a intentarlo.'))}finally{logout.disabled=false}};
actions?.append(login,logout,premium);
let signedIn=false;
function labels(){login.textContent=tr('Iniciar sesión');logout.textContent=tr('Cerrar sesión');premium.textContent=tr('Ver Premium')}
function update(user){
 signedIn=!!user;login.hidden=signedIn;logout.hidden=!signedIn;
 // Cached display names are not evidence of authentication.
 localStorage.removeItem('finova_demo_user');localStorage.removeItem('finova_demo_name');
 const greeting=document.getElementById('userGreeting');
 if(greeting){greeting.textContent=user?String(user.user_metadata?.full_name||user.email?.split('@')[0]||''):'';greeting.style.display=user?'inline-flex':'none';greeting.dataset.noTranslate=''}
 document.querySelectorAll('[onclick="openAuth(\'signup\')"],[onclick="openAuth(\'login\')"]').forEach(b=>{b.hidden=signedIn});
 if(!user){document.getElementById('premiumReportOutput')?.replaceChildren();document.getElementById('premiumReportStatus')?.replaceChildren();document.getElementById('finovaBillingStatus').textContent=tr('Inicia sesión para gestionar tu suscripción.');document.getElementById('finovaSubscriptionInvoices')?.replaceChildren();document.getElementById('finovaInvoiceStatus')?.replaceChildren()}
 labels();
}
labels();update(identity?.currentUser?.()||null);
if(identity){identity.on('init',update);identity.on('login',user=>{update(user);identity.close();closeModal()});identity.on('logout',()=>update(null))}
window.addEventListener('finova:language',labels);
})();
