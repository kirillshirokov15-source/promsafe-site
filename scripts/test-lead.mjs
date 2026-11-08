import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import {resolve} from 'node:path';
const require=createRequire(import.meta.url);
const ts=require('typescript');
const source=readFileSync(resolve(import.meta.dirname,'../app/api/lead/route.ts'),'utf8');
const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}});
if(compiled.diagnostics?.length)throw new Error('Cannot compile lead API test');
const exportsObj={};
new Function('require','module','exports',compiled.outputText)(name=>{
 if(name==='next/server')return {NextResponse:{json:(obj,init={})=>Response.json(obj,init)}};
 throw new Error(`Unexpected import ${name}`);
},{exports:exportsObj},exportsObj);
const {POST}=exportsObj;
const old={...process.env};
const oldFetch=globalThis.fetch;
function make(payload,headers={}){
 return new Request('https://promsafe.ru/api/lead',{method:'POST',headers:{'Content-Type':'application/json',origin:'https://promsafe.ru',...headers},body:typeof payload==='string'?payload:JSON.stringify(payload)});
}
const valid={name:'Иван',phone:'+7 (916) 123-45-67',company:'Тест',consent:'yes',details:{size:'16–50'}};
const inspect=async(request,status,error,mode)=>{
 const response=await POST(request);assert.equal(response.status,status);const data=await response.json();
 if(error)assert.equal(data.error,error);
 if(mode)assert.equal(data.mode,mode);
 assert.equal(response.headers.get('Cache-Control'),'no-store');
};
try{
 process.env.NEXT_PUBLIC_LEAD_FORM_ENABLED='false';
 await inspect(make(valid),503,'form_disabled');
 process.env.NEXT_PUBLIC_LEAD_FORM_ENABLED='true';
 process.env.NEXT_PUBLIC_LEAD_BACKEND_READY='true';
 process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL='/privacy';
 process.env.EXTERNAL_WRITES_ENABLED='false';
 await inspect(make(valid,{origin:'https://example.com'}),403,'forbidden_origin');
 await inspect(make('{broken'),400,'bad_request');
 await inspect(make({...valid,phone:'123'}),400,'invalid_contact');
 await inspect(make({...valid,consent:'no'}),400,'consent_required');
 await inspect(make(valid,{ 'Content-Type':'text/plain'}),415,'invalid_content_type');
 await inspect(make({...valid,filler:'x'.repeat(20_010)}),413,'payload_too_large');
 await inspect(make(valid),200,null,'dry_run');
 process.env.EXTERNAL_WRITES_ENABLED='true';
 delete process.env.CRM_WEBHOOK_URL;
 await inspect(make(valid),503,'crm_not_configured');
 process.env.CRM_WEBHOOK_URL='https://crm.example.test/rest/42/SECRET/crm.lead.add.json';
 globalThis.fetch=async()=>Response.json({error:'INVALID_CREDENTIALS'}, {status:200});
 await inspect(make(valid),502,'crm_error');
 globalThis.fetch=async()=>Response.json({result:42},{status:200});
 await inspect(make(valid),200,null,'crm');
 console.log('PASS: 10 contact API checks (disabled, CORS-origin, payload, validation, dry-run, Bitrix24 failures and success)');
}finally{
 globalThis.fetch=oldFetch;
 for(const k of Object.keys(process.env))if(!(k in old))delete process.env[k];
 for(const [k,v] of Object.entries(old))process.env[k]=v;
}
