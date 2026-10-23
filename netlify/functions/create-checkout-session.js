const b=require('../lib/billing');
exports.handler=event=>b.run(event,'POST',async()=>{
 const stripe=b.client();await b.verifyAccount(stripe);const user=await b.user(event);
 let body;try{body=JSON.parse(event.body||'{}')}catch{throw b.error(400,'Solicitud no válida.')}
 const lookup=b.plans[body.plan];if(!lookup)throw b.error(400,'Plan no válido.');
 const customer=await b.customerFor(stripe,user,true),current=await b.entitlement(stripe,customer.id);
 if(current.plan!=='free')throw b.error(409,'Ya tienes una suscripción. Gestiona el plan existente.');
 const prices=await stripe.prices.list({active:true,lookup_keys:[lookup],limit:2});const price=prices.data[0];
 if(prices.data.length!==1||price.livemode||price.currency!=='eur'||!price.recurring)throw b.error(503,'El precio de prueba no está disponible.');
 // One open checkout per user/plan prevents accidental duplicate subscriptions.
 const sessions=await stripe.checkout.sessions.list({customer:customer.id,status:'open',limit:100});
 if(sessions.has_more)throw b.error(409,'Cierra los pagos pendientes antes de continuar.');
 for(const s of sessions.data){if(s.metadata?.app==='finova'&&s.metadata.plan===body.plan&&s.url)return b.response(200,{url:s.url,test:true});if(s.metadata?.app==='finova')await stripe.checkout.sessions.expire(s.id)}
 const session=await stripe.checkout.sessions.create({mode:'subscription',customer:customer.id,client_reference_id:user.id,line_items:[{price:price.id,quantity:1}],metadata:{app:'finova',plan:body.plan},subscription_data:{metadata:{app:'finova'}},integration_identifier:b.identifier(),success_url:b.ORIGIN+'/?checkout=success',cancel_url:b.ORIGIN+'/?checkout=cancelled'},{idempotencyKey:'checkout-'+customer.id+'-'+body.plan+'-'+Math.floor(Date.now()/600000)});
 return b.response(200,{url:session.url,test:true});
});
