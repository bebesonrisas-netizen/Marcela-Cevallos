'use strict';
const b=require('./billing');
const {createHash}=require('node:crypto');
const LOOKUP_KEY='finova_lifetime_once';
const PLAN='premium_lifetime';
const CUSTOMER_PLAN_KEY='finova_lifetime_plan';
const CUSTOMER_PAYMENT_KEY='finova_lifetime_payment_intent';
const CUSTOMER_MODE_KEY='finova_lifetime_mode';

function fail(message,status=503){throw b.error(status,message)}
async function requirePrice(stripe){
 const result=await stripe.prices.list({active:true,lookup_keys:[LOOKUP_KEY],limit:100});
 const prices=Array.isArray(result?.data)?result.data:[];
 if(result?.has_more||prices.length!==1)fail('La licencia de pago único no está configurada de forma única.');
 const price=prices[0];
 if(!price?.id||price.active===false||price.currency!=='eur'||price.livemode!==b.isLive()||price.recurring||(price.lookup_key!=null&&price.lookup_key!==LOOKUP_KEY))fail('La licencia de pago único no está disponible en este entorno.');
 return price;
}
async function createSession(stripe,user){
 const customer=await b.customerFor(stripe,user,true);
 const current=await b.entitlement(stripe,customer.id);
 const existing=await stripe.customers.retrieve(customer.id);
 if(existing.deleted||existing.metadata?.[CUSTOMER_PLAN_KEY]==='premium'&&existing.metadata?.[CUSTOMER_MODE_KEY]===(b.isLive()?'live':'test'))fail('Esta cuenta ya tiene acceso permanente.',409);
 if(current.plan!=='free')fail('Ya tienes una suscripción activa. Gestiona tu plan antes de comprar una licencia.',409);
 const price=await requirePrice(stripe);
 const open=await stripe.checkout.sessions.list({customer:customer.id,status:'open',limit:100});
 if(open.has_more)fail('Cierra los pagos pendientes antes de continuar.',409);
 for(const session of open.data||[]){if(session.mode==='payment'&&session.metadata?.app==='finova'&&session.metadata?.purchase_type==='one_time'&&session.metadata?.plan===PLAN&&session.url)return session}
 const idempotencyKey='finova-once-'+createHash('sha256').update(`${customer.id}:${price.id}:${b.isLive()?'live':'test'}`).digest('hex');
 const session=await stripe.checkout.sessions.create({
  mode:'payment',customer:customer.id,billing_address_collection:'required',customer_update:{address:'auto',name:'auto'},
  line_items:[{price:price.id,quantity:1}],
  metadata:{app:'finova',purchase_type:'one_time',plan:PLAN},
  payment_intent_data:{metadata:{app:'finova',purchase_type:'one_time',plan:PLAN,finova_user_id:String(user.id)}},
  client_reference_id:String(user.id),
  success_url:b.ORIGIN+'/?checkout=success&billing=1',cancel_url:b.ORIGIN+'/?checkout=cancel'
 },{idempotencyKey});
 if(!session.url)fail('Stripe no devolvió un enlace de pago válido.',502);
 return session;
}
async function fulfillCheckout(stripe,session){
 if(!session||session.mode!=='payment'||session.metadata?.app!=='finova'||session.metadata?.purchase_type!=='one_time'||session.metadata?.plan!==PLAN||session.payment_status!=='paid')return false;
 const customerId=typeof session.customer==='string'?session.customer:session.customer?.id;
 const paymentIntentId=typeof session.payment_intent==='string'?session.payment_intent:session.payment_intent?.id;
 const userId=String(session.client_reference_id||'');
 if(!customerId||!paymentIntentId||!userId)return false;
 const [customer,intent]=await Promise.all([stripe.customers.retrieve(customerId),stripe.paymentIntents.retrieve(paymentIntentId)]);
 if(customer.deleted||customer.metadata?.app!=='finova'||String(customer.metadata?.finova_user_id)!==userId||intent.status!=='succeeded'||intent.metadata?.app!=='finova'||intent.metadata?.purchase_type!=='one_time'||intent.metadata?.plan!==PLAN||String(intent.metadata?.finova_user_id)!==userId)return false;
 await stripe.customers.update(customerId,{metadata:{[CUSTOMER_PLAN_KEY]:'premium',[CUSTOMER_PAYMENT_KEY]:paymentIntentId,[CUSTOMER_MODE_KEY]:b.isLive()?'live':'test'}});
 return true;
}
async function intentForCharge(stripe,charge){
 if(!charge||!charge.payment_intent)return null;
 const intent=typeof charge.payment_intent==='string'?await stripe.paymentIntents.retrieve(charge.payment_intent):charge.payment_intent;
 return intent?.metadata?.app==='finova'&&intent?.metadata?.purchase_type==='one_time'&&intent?.metadata?.plan===PLAN?intent:null;
}
async function revokeCharge(stripe,charge){
 const intent=await intentForCharge(stripe,charge);if(!intent)return false;
 const customerId=typeof charge.customer==='string'?charge.customer:charge.customer?.id;
 if(!customerId)return false;
 const customer=await stripe.customers.retrieve(customerId);
 if(customer.deleted||customer.metadata?.[CUSTOMER_PAYMENT_KEY]!==String(intent.id)||customer.metadata?.[CUSTOMER_MODE_KEY]!== (b.isLive()?'live':'test'))return false;
 await stripe.customers.update(customerId,{metadata:{[CUSTOMER_PLAN_KEY]:'',[CUSTOMER_PAYMENT_KEY]:'',[CUSTOMER_MODE_KEY]:''}});
 return true;
}
async function restoreWonDispute(stripe,dispute){
 if(!dispute||dispute.status!=='won')return false;
 const chargeId=typeof dispute.charge==='string'?dispute.charge:dispute.charge?.id;
 if(!chargeId)return false;
 const charge=await stripe.charges.retrieve(chargeId);
 if(charge.refunded)return false;
 const intent=await intentForCharge(stripe,charge);if(!intent)return false;
 const customerId=typeof charge.customer==='string'?charge.customer:charge.customer?.id;
 if(!customerId)return false;
 const customer=await stripe.customers.retrieve(customerId);
 if(customer.deleted||customer.metadata?.app!=='finova'||String(customer.metadata?.finova_user_id)!==String(intent.metadata.finova_user_id))return false;
 await stripe.customers.update(customerId,{metadata:{[CUSTOMER_PLAN_KEY]:'premium',[CUSTOMER_PAYMENT_KEY]:String(intent.id),[CUSTOMER_MODE_KEY]:b.isLive()?'live':'test'}});
 return true;
}
async function entitlement(stripe,customerId){
 const state=await b.entitlement(stripe,customerId);
 const customer=await stripe.customers.retrieve(customerId);
 if(!customer.deleted&&customer.metadata?.app==='finova'&&customer.metadata?.[CUSTOMER_PLAN_KEY]==='premium'&&customer.metadata?.[CUSTOMER_MODE_KEY]===(b.isLive()?'live':'test')&&state.plan==='free')return {...state,plan:'premium',status:'lifetime',lifetime:true};
 return {...state,lifetime:false};
}
module.exports={LOOKUP_KEY,PLAN,requirePrice,createSession,fulfillCheckout,revokeCharge,restoreWonDispute,entitlement};
