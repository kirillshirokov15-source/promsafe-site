import {NextResponse} from 'next/server';

const MAX_BODY_BYTES=20_000;
const MAX_FIELD=500;

function apiError(error:string,status:number){
  return NextResponse.json({ok:false,error},{status,headers:{'Cache-Control':'no-store'}});
}
function clean(value:unknown,max=MAX_FIELD){
  return typeof value==='string'
    ? value.replace(/[\u0000-\u001f\u007f]/g,' ').trim().slice(0,max)
    : '';
}
function detailsFrom(value:unknown){
  if(!value||typeof value!=='object'||Array.isArray(value))return {} as Record<string,string>;
  return Object.fromEntries(Object.entries(value as Record<string,unknown>)
    .slice(0,20).map(([key,val])=>[clean(key,80),clean(val,300)])
    .filter(([key])=>Boolean(key)));
}

/** Read a bounded body; Content-Length may be absent or untrusted. */
async function limitedBody(req:Request){
  if(!req.body)return '';
  const reader=req.body.getReader();
  const chunks:Uint8Array[]=[];
  let size=0;
  try{
    while(true){
      const {done,value}=await reader.read();
      if(done)break;
      size+=value.byteLength;
      if(size>MAX_BODY_BYTES)throw new Error('payload_too_large');
      chunks.push(value);
    }
  }finally{reader.releaseLock()}
  const bytes=new Uint8Array(size);
  let offset=0;
  for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.byteLength}
  return new TextDecoder('utf-8',{fatal:true}).decode(bytes);
}

export async function POST(req:Request){
  // The form is disabled until legal and CRM prerequisites are confirmed.
  if(process.env.NEXT_PUBLIC_LEAD_FORM_ENABLED!=='true' || process.env.NEXT_PUBLIC_LEAD_BACKEND_READY!=='true' || !process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL){
    return apiError('form_disabled',503);
  }

  const origin=req.headers.get('origin');
  if(origin){
    try{if(new URL(origin).host!==new URL(req.url).host)return apiError('forbidden_origin',403)}
    catch{return apiError('forbidden_origin',403)}
  }
  const contentType=req.headers.get('content-type')||'';
  if(!contentType.toLowerCase().startsWith('application/json'))return apiError('invalid_content_type',415);
  const length=Number(req.headers.get('content-length')||0);
  if(length>MAX_BODY_BYTES)return apiError('payload_too_large',413);

  let data:Record<string,unknown>;
  try{
    const raw=await limitedBody(req);
    const parsed:unknown=JSON.parse(raw);
    if(!parsed||typeof parsed!=='object'||Array.isArray(parsed))return apiError('bad_request',400);
    data=parsed as Record<string,unknown>;
  }catch(e){
    return apiError(e instanceof Error&&e.message==='payload_too_large'?'payload_too_large':'bad_request',
      e instanceof Error&&e.message==='payload_too_large'?413:400);
  }

  // Trap automated forms, without sending any personal data onward.
  if(clean(data.website,200))return NextResponse.json({ok:true,mode:'ignored'}, {headers:{'Cache-Control':'no-store'}});
  const name=clean(data.name,120);
  const phone=clean(data.phone,80);
  const company=clean(data.company,180);
  const source=clean(data.source,100)||'site';
  const details=detailsFrom(data.details);
  const digits=phone.replace(/\D/g,'');
  if(!name||digits.length<10||digits.length>15||!/^[+\d\s()–-]+$/.test(phone))return apiError('invalid_contact',400);
  if(clean(data.consent,8)!=='yes')return apiError('consent_required',400);

  if(process.env.EXTERNAL_WRITES_ENABLED!=='true'){
    return NextResponse.json({ok:true,mode:'dry_run'},{headers:{'Cache-Control':'no-store'}});
  }
  const webhook=process.env.CRM_WEBHOOK_URL;
  if(!webhook||!webhook.startsWith('https://'))return apiError('crm_not_configured',503);
  const comment=Object.entries(details).map(([k,v])=>`${k}: ${v}`).join('\n');
  const payload={fields:{
    TITLE:`PromSafe – ${company||name}`,
    NAME:name,
    PHONE:[{VALUE:phone,VALUE_TYPE:'WORK'}],
    COMPANY_TITLE:company,
    COMMENTS:[`Источник: ${source}`,comment].filter(Boolean).join('\n\n')
  }};
  try{
    const resp=await fetch(webhook,{method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify(payload),cache:'no-store',signal:AbortSignal.timeout(10_000)});
    if(!resp.ok)return apiError('crm_error',502);
    const result:unknown=await resp.json().catch(()=>null);
    if(!result||typeof result!=='object'||'error' in result || !('result' in result) || !(result as {result:unknown}).result)return apiError('crm_error',502);
    return NextResponse.json({ok:true,mode:'crm'},{headers:{'Cache-Control':'no-store'}});
  }catch{return apiError('crm_unavailable',502)}
}
