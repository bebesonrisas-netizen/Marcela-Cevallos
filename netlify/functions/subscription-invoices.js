'use strict';
const b=require('../lib/billing');
function safeURL(value){try{const u=new URL(value);return u.protocol==='https:'&&['invoice.stripe.com','pay.stripe.com','billing.stripe.com'].includes(u.hostname)?u.href:null}catch{return null}}
exports.handler=event=>b.run(event,'GET',async()=>{
 const stripe=b.client();await b.verifyAccount(stripe);const user=await b.user(event),customer=await b.customerFor(stripe,user);
 if(!customer)return b.response(200,{invoices:[],hasMore:false,test:!b.isLive()});
 // Always derive customer from verified Identity. Cancelled users retain invoice access.
 const result=await stripe.invoices.list({customer:customer.id,limit:24});
 return b.response(200,{invoices:result.data.filter(x=>x.livemode===b.isLive()&&x.status!=='draft').map(x=>({number:x.number||x.id,created:x.created,status:x.status,currency:x.currency,total:x.total,paid:x.amount_paid,url:safeURL(x.hosted_invoice_url),pdf:safeURL(x.invoice_pdf)})),hasMore:!!result.has_more,test:!b.isLive()});
});
