(function(root){
'use strict';
const locale={es:'es-ES',en:'en-GB',fr:'fr-FR',de:'de-DE',it:'it-IT',pt:'pt-PT',sv:'sv-SE'};
function parseNumber(value){
 let s=String(value).replace(/[^\d.,-]/g,'');
 const comma=s.lastIndexOf(','),dot=s.lastIndexOf('.');
 if(comma>=0&&dot>=0){const decimal=comma>dot?',':'.';s=s.split(decimal==='.'?',':'.').join('').replace(decimal,'.')}
 else if(comma>=0)s=s.replace(/,(?=.*[,])/g,'').replace(',','.');
 else if((s.match(/\./g)||[]).length>1)s=s.replace(/\.(?=.*\.)/g,'');
 const n=Number(s);return Number.isFinite(n)?n:null;
}
function validDate(value){const d=new Date(value+'T12:00:00Z');return /^\d{4}-\d{2}-\d{2}$/.test(value)&&!Number.isNaN(d.valueOf())&&d.toISOString().slice(0,10)===value}
function parseReceipt(text,today=new Date().toISOString().slice(0,10)){
 const lines=String(text).split(/\r?\n/).map(x=>x.trim()).filter(Boolean),amounts=[];
 for(const line of lines){
  if(/subtotal|sub.total|moms|vat|iva|mwst|tva|change|cambio|v[aä]xel|kontant|cash|efectivo/i.test(line)&&!/grand total|att betala|importe total/i.test(line))continue;
  const hits=line.match(/\d{1,6}(?:[ .,\u00a0]\d{3})*[.,]\d{2}(?!\d)/g)||[];
  for(const hit of hits){const n=parseNumber(hit);if(n>0)amounts.push({n,priority:/\btotal\b|summa|summe|totale|gesamt|importe|att betala|[àa] payer|a pagar/i.test(line)?2:0})}
 }
 amounts.sort((a,b)=>b.priority-a.priority||b.n-a.n);
 let date=today;const ymd=String(text).match(/\b(20\d{2})[-/.](\d{1,2})[-/.](\d{1,2})\b/),dmy=String(text).match(/\b(\d{1,2})[-/.](\d{1,2})[-/.](20\d{2})\b/);
 const m=ymd?[ymd[1],ymd[2],ymd[3]]:dmy?[dmy[3],dmy[2],dmy[1]]:null;
 if(m){const candidate=m.map((x,i)=>i?x.padStart(2,'0'):x).join('-');if(validDate(candidate))date=candidate}
 return {merchant:(lines.find(x=>/[\p{L}]{3}/u.test(x)&&!/fecha|date|datum|total|moms|vat|iva|org.nr/i.test(x))||'').slice(0,90),amount:amounts[0]?.n||null,date};
}
function parseMovement(text,today=new Date()){
 const q=String(text).trim();
 const cleaned=q.replace(/\b20\d{2}[-/.]\d{1,2}[-/.]\d{1,2}\b/g,'');
 const match=cleaned.match(/(?:^|\s)(\d{1,6}(?:[ .]\d{3})*[.,]\d{1,2}|\d+)(?=\s|€|\$|£|$)/);
 if(!match)return null;const amount=parseNumber(match[1]);if(!(amount>0))return null;
 const normalized=q.normalize('NFD').replace(/[\u0300-\u036f]/g,'');
 const income=/\b(ingres[eé]|cobr[eé]|recib[ií]|salario|n[oó]mina|earned|received|salary|income|re[cç]u|salaire|revenu|erhalten|einnahme|gehalt|ricevuto|incassato|stipendio|recebi|sal[aá]rio|fick|l[oö]n|inkomst)\b/i.test(normalized);
 const d=new Date(today);if(/\b(ayer|yesterday|hier|gestern|ieri|ontem|ig[aå]r)\b/i.test(q))d.setDate(d.getDate()-1);
 return {type:income?'income':'expense',amount,desc:q.slice(0,160),date:d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};
}
const api={parseNumber,validDate,parseReceipt,parseMovement,locale};
if(typeof module==='object'&&module.exports){module.exports=api;return}root.FinovaTools=api;
})(typeof window==='undefined'?globalThis:window);
