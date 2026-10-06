const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const PRICE_LOOKUP = {
  finova_premium_monthly: 'price_1UNZBO0WT1XqdqLbImMySh5l',
  finova_premium_yearly: 'price_1UNZBR0WT1XqdqLbgWlr1jXc',
  finova_pro_monthly: 'price_1UNZBT0WT1XqdqLbp0rjqShx',
  finova_pro_yearly: 'price_1UNZBV0WT1XqdqLbmJB8lwFp'
};

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };
  try {
    const { plan, email } = JSON.parse(event.body || '{}');
    const price = PRICE_LOOKUP[plan];
    if (!price) return { statusCode: 400, body: JSON.stringify({ error: 'Plan no válido' }) };
    const origin = event.headers.origin || 'https://storied-pika-1d2990.netlify.app';
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price, quantity: 1 }],
      customer_email: email || undefined,
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      success_url: `${origin}/?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?checkout=cancel`,
      metadata: { app: 'finova', plan }
    });
    return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url: session.url }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
