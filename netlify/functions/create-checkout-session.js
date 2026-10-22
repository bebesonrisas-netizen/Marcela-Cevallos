const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const PRICE_LOOKUP = {
  finova_premium_monthly: 'price_1UNZBO0WT1XqdqLbImMySh5l',
  finova_premium_yearly: 'price_1UNZBR0WT1XqdqLbgWlr1jXc',
  finova_pro_monthly: 'price_1UNZBT0WT1XqdqLbp0rjqShx',
  finova_pro_yearly: 'price_1UNZBV0WT1XqdqLbmJB8lwFp'
};
exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };
  try {
    const auth = event.headers.authorization || event.headers.Authorization || '';
    if (!/^Bearer\s+\S+$/i.test(auth)) return {statusCode:401,body:JSON.stringify({error:'Autenticación requerida'})};
    const user = context.clientContext && context.clientContext.user;
    if (!user || !user.sub || !user.email) return { statusCode: 401, body: JSON.stringify({error:'Inicia sesión para contratar Premium'}) };
    const { plan } = JSON.parse(event.body || '{}');
    if (!Object.prototype.hasOwnProperty.call(PRICE_LOOKUP,plan)) return {statusCode:400,body:JSON.stringify({error:'Plan no válido'})};
    const base = process.env.URL || process.env.DEPLOY_PRIME_URL;
    if (!base) throw new Error('Falta configurar URL del sitio');
    const session = await stripe.checkout.sessions.create({
      mode:'subscription',
      line_items:[{price:PRICE_LOOKUP[plan],quantity:1}],
      customer_email:user.email,
      client_reference_id:user.sub,
      allow_promotion_codes:true,
      billing_address_collection:'auto',
      success_url:`${base}/?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:`${base}/?checkout=cancel`,
      metadata:{app:'finova',plan,user_id:user.sub},
      subscription_data:{metadata:{app:'finova',plan,user_id:user.sub}}
    });
    return {statusCode:200,headers:{'Content-Type':'application/json'},body:JSON.stringify({url:session.url})};
  } catch(err) {
    console.error('Checkout error',err);
    return {statusCode:500,body:JSON.stringify({error:'No se pudo iniciar el pago seguro'})};
  }
};
