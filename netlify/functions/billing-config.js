const b=require('../lib/billing');
exports.handler=event=>b.run(event,'GET',async()=>{try{const stripe=b.client();await b.verifyAccount(stripe);return b.response(200,{enabled:true,mode:'test'})}catch{return b.response(200,{enabled:false,mode:'disabled'})}});
