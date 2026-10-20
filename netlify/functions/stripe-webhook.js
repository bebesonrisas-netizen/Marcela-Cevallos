const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
exports.handler = async (event) => {
  if(event.httpMethod!=='POST')return {statusCode:405,body:'Method Not Allowed'};
  if(!process.env.STRIPE_WEBHOOK_SECRET)return {statusCode:503,body:'Webhook not configured'};
  try {
    const signature=event.headers['stripe-signature']||event.headers['Stripe-Signature'];
    if(!signature)return {statusCode:400,body:'Missing Stripe signature'};
    const verified=stripe.webhooks.constructEvent(event.body,signature,process.env.STRIPE_WEBHOOK_SECRET);
    const allowed=new Set(['checkout.session.completed','customer.subscription.created','customer.subscription.updated','customer.subscription.deleted','invoice.paid','invoice.payment_failed']);
    if(allowed.has(verified.type)){
      const object=verified.data.object;
      // No customer PII or credentials are written to logs.
      console.info('Finova verified Stripe event',verified.id,verified.type);
      // TODO: Store verified event ID for idempotency and update authenticated user's
      // subscription entitlement in a transactional database.
      // Until that is implemented, this webhook must NOT grant Premium access.
    }
    return {statusCode:200,headers:{'Content-Type':'application/json'},body:JSON.stringify({received:true})};
  }catch(err){
    return {statusCode:400,body:'Invalid Stripe webhook'};
  }
};