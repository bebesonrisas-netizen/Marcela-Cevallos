const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const response=(statusCode,body)=>({statusCode,headers:{'Content-Type':'application/json','Cache-Control':'no-store'},body:JSON.stringify(body)});
exports.handler=async(event,context)=>{
  if(event.httpMethod!=='POST')return response(405,{error:'Method Not Allowed'});
  const user=context?.clientContext?.user;
  if(!user?.sub)return response(401,{error:'Inicia sesión en Finova.'});
  if(process.env.FINOVA_PREMIUM_ENABLED!=='true')return response(503,{error:'Gestión Premium no disponible todavía.'});
  if(!process.env.STRIPE_SECRET_KEY)return response(503,{error:'Stripe no está configurado.'});
  try{
    const query="metadata['finova_user_id']:'"+user.sub.replace(/[^a-zA-Z0-9_-]/g,'')+"'";
    const found=await stripe.customers.search({query,limit:20});
    const customer=found.data.find(c=>c.metadata?.finova_user_id===user.sub);
    if(!customer)return response(404,{error:'No se encontró una suscripción para esta cuenta.'});
    const origin='https://storied-pika-1d2990.netlify.app';
    const portal=await stripe.billingPortal.sessions.create({customer:customer.id,return_url:origin});
    return response(200,{url:portal.url});
  }catch(e){console.error('Finova portal error:',e.type||e.name||'error');return response(503,{error:'No se pudo abrir la gestión de suscripciones.'})}
};
