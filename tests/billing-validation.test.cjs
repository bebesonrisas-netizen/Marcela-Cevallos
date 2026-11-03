'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const billing=require('../netlify/lib/billing');

test('plan lookup accepts only the four supported plan names',()=>{
 for(const [plan,key] of Object.entries(billing.plans))assert.equal(billing.planLookupKey(plan),key);
 for(const value of ['invalid','__proto__','constructor','toString','',null,{},1]){
  assert.throws(()=>billing.planLookupKey(value),error=>error.status===400);
 }
});

test('price validation requires one active recurring EUR price for the selected mode',async()=>{
 const previous=process.env.FINOVA_BILLING_MODE;
 try{
  process.env.FINOVA_BILLING_MODE='test';
  const valid={id:'price_test',active:true,lookup_key:billing.plans.premium_monthly,currency:'eur',livemode:false,recurring:{interval:'month'}};
  const stripe={prices:{list:async()=>({data:[valid],has_more:false})}};
  assert.equal((await billing.requirePrice(stripe,billing.plans.premium_monthly)).id,'price_test');
  for(const result of [
   {data:[],has_more:false},
   {data:[valid,{...valid,id:'duplicate'}],has_more:false},
   {data:[{...valid,currency:'usd'}],has_more:false},
   {data:[{...valid,livemode:true}],has_more:false},
   {data:[{...valid,recurring:null}],has_more:false},
   {data:[valid],has_more:true}
  ]){
   stripe.prices.list=async()=>result;
   await assert.rejects(()=>billing.requirePrice(stripe,billing.plans.premium_monthly),error=>error.status===503);
  }
  await assert.rejects(()=>billing.requirePrice(stripe,'invalid_lookup'),error=>error.status===400);
 }finally{
  if(previous===undefined)delete process.env.FINOVA_BILLING_MODE;
  else process.env.FINOVA_BILLING_MODE=previous;
 }
});

test('live price validation refuses a test-mode price',async()=>{
 const previous=process.env.FINOVA_BILLING_MODE;
 try{
  process.env.FINOVA_BILLING_MODE='live';
  const stripe={prices:{list:async()=>({data:[{id:'price_live',active:true,lookup_key:billing.plans.pro_monthly,currency:'eur',livemode:true,recurring:{interval:'month'}}],has_more:false})}};
  assert.equal((await billing.requirePrice(stripe,billing.plans.pro_monthly)).id,'price_live');
  stripe.prices.list=async()=>({data:[{id:'price_test',active:true,lookup_key:billing.plans.pro_monthly,currency:'eur',livemode:false,recurring:{interval:'month'}}],has_more:false});
  await assert.rejects(()=>billing.requirePrice(stripe,billing.plans.pro_monthly),error=>error.status===503);
 }finally{
  if(previous===undefined)delete process.env.FINOVA_BILLING_MODE;
  else process.env.FINOVA_BILLING_MODE=previous;
 }
});
