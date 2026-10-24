'use strict';
const Stripe=require('stripe');
const {createHash,randomBytes}=require('node:crypto');
const ORIGIN='https://storied-pika-1d2990.netlify.app';
const ACCOUNT='acct_1UNYwq0WT1XqdqLb';
const LIVE_ACCOUNT='acct_1UNYwe0G40NrtpeH';
function mode(){return process.env.FINOVA_BILLING_MODE??'test'}
function isLive(){return mode()==='live'}
function portalConfiguration(){const value=process.env.STRIPE_PORTAL_CONFIGURATION;if(isLive()){if(!value||value===TEST_PORTAL_CONFIGURATION)throw error(503,'Falta configurar el portal de producción.','live_portal_required');return value}return value||TEST_PORTAL_CONFIGURATION}
// Public account IDs and sandbox defaults are not credentials. Live mode requires explicit hosting configuration.
const TEST_PORTAL_CONFIGURATION='bpc_1UTp1i0WT1XqdqLbOgaNDm1w';
const plans={premium_monthly:'finova_premium_monthly',premium_yearly:'finova_premium_yearly',pro_monthly:'finova_pro_monthly',pro_yearly:'finova_pro_yearly'};
const events=['checkout.session.completed','checkout.session.async_payment_succeeded','checkout.session.async_payment_failed','customer.subscription.created','customer.subscription.updated','customer.subscription.deleted','invoice.paid','invoice.payment_failed'];
function error(status,message,code){return Object.assign(new Error(message),{status,...(code?{code}:{})})}
function response(statusCode,body){return {statusCode,headers:{'Content-Type':'application/json','Cache-Control':'no-store'},body:JSON.stringify(body)}}
function client(){
 const secret=process.env.STRIPE_SECRET_KEY||'';
 const selected=mode();
 if(!['test','live'].includes(selected))throw error(503,'La facturación está desactivada.','disabled');
 if(selected==='live'){if(!/^([sr]k)_live_/.test(secret))throw error(503,'Se necesita una clave de Stripe de producción.','live_key_required');portalConfiguration()}
 else if(!/^([sr]k)_test_/.test(secret))throw error(503,'Se necesita una clave de Stripe de pruebas.','test_key_required');
 if(!process.env.STRIPE_WEBHOOK_SECRET)throw error(503,'Falta configurar la firma del webhook de pruebas.','webhook_secret_required');
 return new Stripe(secret,{apiVersion:'2026-08-26.dahlia',maxNetworkRetries:2});
}
async function verifyAccount(stripe){const account=await stripe.accounts.retrieve();if(isLive()&&!account.charges_enabled)throw error(503,'Los cobros reales no están disponibles.','live_charges_disabled');if(account.id!==(isLive()?LIVE_ACCOUNT:ACCOUNT))throw error(503,'Configura las claves del entorno de prueba de Finova.','sandbox_mismatch');return account}
async function user(event){
 const token=event.headers?.authorization||event.headers?.Authorization||'';
 if(!/^Bearer [\w.-]+$/.test(token))throw error(401,'Inicia sesión para gestionar tu suscripción.');
 const res=await fetch(ORIGIN+'/.netlify/identity/user',{headers:{Authorization:token},signal:AbortSignal.timeout(8000)});
 if(!res.ok)throw error(401,'La sesión ha caducado. Vuelve a iniciar sesión.');
 const u=await res.json();if(!u.id||!u.email||!u.confirmed_at)throw error(401,'Confirma tu cuenta antes de continuar.');return u;
}
function sameOrigin(event){const origin=event.headers?.origin||event.headers?.Origin;if(origin&&origin!==ORIGIN)throw error(403,'Origen no permitido.')}
async function customerFor(stripe,u,create=false){
 // No external application database exists yet. Customer metadata maps the verified Identity ID.
 // Search + stable idempotency protects concurrent first-time checkout requests.
 const id=String(u.id);if(!/^[\w-]{1,100}$/.test(id))throw error(401,'Usuario no válido.');
 const found=await stripe.customers.search({query:`metadata['finova_user_id']:'${id}' AND metadata['app']:'finova'`,limit:2});
 if(found.data.length>1)throw error(409,'Hay cuentas duplicadas. Contacta con soporte antes de pagar.');
 if(found.data[0])return found.data[0];if(!create)return null;
 return stripe.customers.create({email:u.email,metadata:{app:'finova',finova_user_id:id}},{idempotencyKey:'finova-customer-'+createHash('sha256').update(id).digest('hex')});
}
async function entitlement(stripe,customer){
 const list=await stripe.subscriptions.list({customer,status:'all',limit:100,expand:['data.latest_invoice']});
 if(list.has_more)throw error(503,'No se pudo verificar todas las suscripciones.');
 const eligible=list.data.filter(s=>s.livemode===isLive()&&['active','trialing'].includes(s.status)&&s.metadata?.app==='finova'&&(s.status==='trialing'||s.latest_invoice?.status==='paid'));
 let chosen=null,tier='free';
 for(const s of eligible){const lookup=s.items?.data?.[0]?.price?.lookup_key;if(!Object.values(plans).includes(lookup))continue;const current=lookup.includes('_pro_')?'pro':'premium';if(!chosen||current==='pro'){chosen=s;tier=current}}
 return {plan:tier,status:chosen?.status||'inactive',cancel_at_period_end:!!chosen?.cancel_at_period_end,cancel_at:chosen?.cancel_at||null,cancellation_scheduled:!!(chosen?.cancel_at_period_end||chosen?.cancel_at),current_period_end:chosen?.items?.data?.[0]?.current_period_end||chosen?.current_period_end||null,test:!isLive()};
}
async function syncCustomer(stripe,id){const state=await entitlement(stripe,id);await stripe.customers.update(id,{metadata:{finova_plan:state.plan,finova_status:state.status}});return state}
async function run(event,method,fn){try{if(event.httpMethod!==method)return response(405,{error:'Método no permitido.'});sameOrigin(event);return await fn()}catch(e){return response(e.status||500,{error:e.status?e.message:'No se pudo completar la operación. Inténtalo de nuevo.'})}}
function identifier(){return 'finova_'+mode()+'_'+Array.from(randomBytes(8),b=>String.fromCharCode(97+b%26)).join('')}
module.exports={ORIGIN,ACCOUNT,LIVE_ACCOUNT,mode,isLive,portalConfiguration,TEST_PORTAL_CONFIGURATION,plans,events,error,response,client,verifyAccount,user,customerFor,entitlement,syncCustomer,run,identifier};
