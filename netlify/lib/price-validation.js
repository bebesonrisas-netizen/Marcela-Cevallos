'use strict';

const PLAN_LOOKUP_KEYS=Object.freeze({
 premium_monthly:'finova_premium_monthly',
 premium_yearly:'finova_premium_yearly',
 pro_monthly:'finova_pro_monthly',
 pro_yearly:'finova_pro_yearly'
});

function planLookupKey(plan){
 if(typeof plan!=='string'||!Object.prototype.hasOwnProperty.call(PLAN_LOOKUP_KEYS,plan)){
  const error=new Error('Plan no válido.');
  error.status=400;
  throw error;
 }
 return PLAN_LOOKUP_KEYS[plan];
}

async function requirePrice(stripe,lookupKey,liveMode){
 if(!Object.values(PLAN_LOOKUP_KEYS).includes(lookupKey)){
  const error=new Error('Plan no válido.');
  error.status=400;
  throw error;
 }
 const result=await stripe.prices.list({active:true,lookup_keys:[lookupKey],limit:100});
 const data=Array.isArray(result?.data)?result.data:[];
 // A paginated/incomplete result cannot establish that the lookup key resolves uniquely.
 if(result?.has_more||data.length!==1){
  const error=new Error('El precio de este plan no est�� disponible de forma única en el entorno actual.');
  error.status=503;
  throw error;
 }
 const price=data[0];
 if(!price?.id||price.active===false||price.currency!=='eur'||price.livemode!==liveMode||!price.recurring||
    (price.lookup_key!=null&&price.lookup_key!==lookupKey)){
  const error=new Error('El precio de este plan no está disponible en el entorno actual.');
  error.status=503;
  throw error;
 }
 return price;
}

module.exports={PLAN_LOOKUP_KEYS,planLookupKey,requirePrice};
