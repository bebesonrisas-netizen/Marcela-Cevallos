const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const PRICE_LOOKUP = {
  finova_premium_monthly: 'price_1UNZBO0WT1XqdqLbImMySh5l',
  finova_premium_yearly: 'price_1UNZBR0WT1XqdqLbgWlr1jXc',
  finova_pro_monthly: 'price_1UNZBT0WT1XqdqLbp0rjqShx',
  finova_pro_yearly: 'price_1UNZBV0WT1XqdqLbmJB8lwFp'
};
const PUBLIC_ORIGIN = 'https://storied-pika-1d2990.netlify.app';

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };
  const user = context && context.clientContext && context.clientContext.user;
  if (!user || !user.sub || !user.email) {
    return { statusCode: 401, body: JSON.stringify({ error: 'Inicia sesión con tu cuenta de Finova para contratar Premium.' }) };
  }
  if (process.env.FINOVA_PREMIUM_ENABLED !== 'true') {
    return { statusCode: 503, body: JSON.stringify({ error: 'Premium aún está en preparación. No se realizará ningún cobro.' }) };
  }
  if (!process.env.STRIPE_SECRET_KEY) {
    return { statusCode: 503, body: JSON.stringify({ error: 'Los pagos no están configurados.' }) };
  }
  try {
    const { plan } = JSON.parse(event.body || '{}');
    const price = PRICE_LOOKUP[plan];
    if (!price) return { statusCode: 400, body: JSON.stringify({ error: 'Plan no válido' }) };
    const origin = PUBLIC_ORIGIN;
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price, quantity: 1 }],
      customer_email: user.email,
      client_reference_id: user.sub,
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      success_url: `${origin}/?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?checkout=cancel`,
      metadata: { app: 'finova', plan, user_id: user.sub },
      subscription_data: { metadata: { app: 'finova', user_id: user.sub, plan } }
    });
    return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url: session.url }) };
  } catch (err) {
    console.error('Finova checkout error:', err.type || err.name || 'error');
    return { statusCode: 500, body: JSON.stringify({ error: 'No se pudo iniciar el pago seguro. Inténtalo más tarde.' }) };
  }
};
