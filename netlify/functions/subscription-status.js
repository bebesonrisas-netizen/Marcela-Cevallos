const b=require('../lib/billing');
exports.handler=event=>b.run(event,'GET',async()=>{const stripe=b.client();await b.verifyAccount(stripe);const user=await b.user(event),customer=await b.customerFor(stripe,user);return b.response(200,customer?await b.entitlement(stripe,customer.id):{plan:'free',status:'inactive',test:true})});
