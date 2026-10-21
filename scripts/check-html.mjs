import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const html=readFileSync('index.html','utf8');
const scripts=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]).filter(Boolean);
if(scripts.length<3)throw Error('Expected app and beta scripts');
for(const [i,source] of scripts.entries()){new vm.Script(source,{filename:'inline-script-'+i+'.js'});}
for(const id of ['finovaBetaTools','betaBackup','betaRestore','betaVoice','betaCamera','betaForecast','betaInvoiceCreate'])if(!html.includes('id="'+id+'"'))throw Error('Missing beta element '+id);
if(!html.includes('mi_finanzas_v1')||!html.includes('finova_business_v1'))throw Error('Storage keys missing');
console.log('PASS:',scripts.length,'JavaScript blocks compile and beta UI IDs exist');
