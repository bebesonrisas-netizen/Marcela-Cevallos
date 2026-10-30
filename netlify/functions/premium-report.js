'use strict';
const b=require('../lib/billing');
function report(input){
 if(!input||!['personal','business'].includes(input.kind)||!/^\d{4}-(0[1-9]|1[0-2])$/.test(input.period||'')||!Array.isArray(input.rows)||input.rows.length>400)throw b.error(400,'Informe no válido.');
 const [year,month]=input.period.split('-').map(Number);
 const previous=month===1?(year-1)+'-12':year+'-'+String(month-1).padStart(2,'0');
 const totals={income:0,expense:0},prior={income:0,expense:0},categories=new Map();
 for(const row of input.rows){
  if(!row||![input.period,previous].includes(row.period)||!['income','expense'].includes(row.type)||!Number.isSafeInteger(row.cents)||row.cents<0||row.cents>1e12||typeof row.category!=='string'||row.category.length>80||/[\u0000-\u001f]/.test(row.category))throw b.error(400,'Importes o categorías no válidos.');
  const target=row.period===input.period?totals:prior;target[row.type]+=row.cents;
  if(!Number.isSafeInteger(target[row.type])||target[row.type]>1e13)throw b.error(400,'Total fuera de rango.');
  if(row.period===input.period){const key=JSON.stringify([row.type,row.category]);const item=categories.get(key)||{type:row.type,category:row.category,cents:0};item.cents+=row.cents;categories.set(key,item)}
 }
 return {kind:input.kind,period:input.period,previous,totals:{...totals,balance:totals.income-totals.expense},prior:{...prior,balance:prior.income-prior.expense},categories:[...categories.values()].sort((a,c)=>c.cents-a.cents),expenseChange:prior.expense?Math.round((totals.expense-prior.expense)/prior.expense*100):null,savingsRate:totals.income?Math.round((totals.income-totals.expense)/totals.income*100):null};
}
exports.report=report;
exports.handler=event=>b.run(event,'POST',async()=>{
 const stripe=b.client();await b.verifyAccount(stripe);const user=await b.user(event),customer=await b.customerFor(stripe,user);
 const state=customer?await b.entitlement(stripe,customer.id):{plan:'free'};
 if(!['premium','pro'].includes(state.plan))throw b.error(403,'Se necesita Premium para crear informes.');
 if(event.isBase64Encoded||Buffer.byteLength(event.body||'','utf8')>100000)throw b.error(413,'Informe demasiado grande.');
 let input;try{input=JSON.parse(event.body||'{}')}catch{throw b.error(400,'Solicitud no válida.')}
 if(input.kind==='business'&&state.plan!=='pro')throw b.error(403,'El informe de Negocios requiere Pro.');
 return b.response(200,{...report(input),test:state.test});
});
