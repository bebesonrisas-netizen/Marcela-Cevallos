const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_unconfigured');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return { statusCode: 503, body: 'Stripe webhook is not configured' };
  }
  try {
    const signature = event.headers['stripe-signature'] || event.headers['Stripe-Signature'];
    if (!signature) return { statusCode: 400, body: 'Missing Stripe signature' };
    const rawBody = event.isBase64Encoded
      ? Buffer.from(event.body || '', 'base64')
      : event.body || '';
    const evt = stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET);
    const subscriptionEvents = new Set([
      'checkout.session.completed',
      'customer.subscription.created',
      'customer.subscription.updated',
      'customer.subscription.deleted',
      'invoice.payment_failed'
    ]);
    if (subscriptionEvents.has(evt.type)) {
      // Stripe is the source of truth; subscription-status reads Stripe
      // directly. No unpersisted local entitlement is granted here.
      console.info('Finova Stripe event verified:', evt.type, evt.id);
    }
    return { statusCode: 200, body: JSON.stringify({ received: true }) };
  } catch (err) {
    console.error('Finova Stripe webhook verification failed:', err.type || err.name || 'error');
    return { statusCode: 400, body: 'Invalid webhook signature or payload' };
  }
};
