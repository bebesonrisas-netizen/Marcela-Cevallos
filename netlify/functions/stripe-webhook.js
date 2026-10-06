const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
exports.handler = async (event) => {
  try {
    const sig = event.headers['stripe-signature'];
    const evt = stripe.webhooks.constructEvent(event.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    if (evt.type === 'checkout.session.completed' || evt.type === 'customer.subscription.updated' || evt.type === 'customer.subscription.deleted') {
      console.log('Finova Stripe event:', evt.type, evt.data.object.id);
      // Producción: actualizar aquí el plan del usuario en la base de datos de Finova.
    }
    return { statusCode: 200, body: JSON.stringify({ received: true }) };
  } catch (err) {
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }
};
