const b=require('../lib/billing');
exports.handler=async event=>{
 if(event.httpMethod!=='POST')return b.response(405,{error:'Método no permitido.'});
 let stripe,evt;
 try{stripe=b.client();const raw=event.isBase64Encoded?Buffer.from(event.body||'','base64'):event.body;evt=stripe.webhooks.constructEvent(raw,event.headers?.['stripe-signature']||event.headers?.['Stripe-Signature'],process.env.STRIPE_WEBHOOK_SECRET)}catch{return b.response(400,{error:'Webhook no válido o no configurado.'})}
 if(evt.livemode!==b.isLive())return b.response(400,{error:'El evento no corresponde al entorno configurado.'});
 if(!b.events.includes(evt.type))return b.response(200,{received:true});
 try{
  await b.verifyAccount(stripe);const object=evt.data.object;
  if(evt.type.startsWith('checkout.session.')&&evt.type!=='checkout.session.async_payment_failed'&& !['paid','no_payment_required'].includes(object.payment_status))return b.response(200,{received:true});
  const customer=typeof object.customer==='string'?object.customer:object.customer?.id;
  if(customer){const record=await stripe.customers.retrieve(customer);if(!record.deleted&&record.metadata?.app==='finova'&&record.metadata.finova_user_id)await b.syncCustomer(stripe,customer)}
  return b.response(200,{received:true});
 }catch{return b.response(500,{error:'No se pudo sincronizar la suscripción. Stripe debe reintentar el evento.'})}
};
