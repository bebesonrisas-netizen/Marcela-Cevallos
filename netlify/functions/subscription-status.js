const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const reply = (statusCode, value) => ({statusCode,headers:{'Content-Type':'application/json','Cache-Control':'no-store'},body:JSON.stringify(value)});
exports.handler = async (event, context) => {
  if (event.httpMethod !== 'GET') return reply(405,{error:'Method Not Allowed'});
  const user=context&&context.clientContext&&context.clientContext.user;
  if (!user||!user.sub) return reply(401,{error:'Inicia sesión para consultar tu suscripción.'});
  if (!process.env.STRIPE_SECRET_KEY) return reply(503,{error:'Stripe no está configurado.'});
  try {
    const query="metadata['finova_user_id']:'"+user.sub.replace(/[^a-zA-Z0-9_-]/g,'')+"'";
    const customers=await stripe.customers.search({query,limit:20});
    const customer=customers.data.find(c=>c.metadata&&c.metadata.finova_user_id===user.sub);
    if(!customer)return reply(200,{premium:false,status:'none'});
    const subs=await stripe.subscriptions.list({customer:customer.id,status:'all',limit:100});
    const active=subs.data.filter(s=>s.status==='active'||s.status==='trialing').sort((a,b)=>b.created-a.created)[0];
    if(!active)return reply(200,{premium:false,status:'none'});
    return reply(200,{premium:true,status:active.status,plan:active.items.data[0]?.price?.id||null,period_end:active.current_period_end||null,cancel_at_period_end:!!active.cancel_at_period_end});
  } catch(e) {
    console.error('Finova subscription lookup failed:',e.type||e.name||'error');
    return reply(503,{error:'No se pudo verificar la suscripción.'});
  }
};
