import {NextResponse} from 'next/server';

const MAX_BODY_BYTES=20_000;
const MAX_FIELD=500;

function text(value:unknown,max=MAX_FIELD){
  return typeof value==='string'?value.trim().slice(0,max):'';
}

function cleanDetails(value:unknown){
  if(!value||typeof value!=='object'||Array.isArray(value)) return {} as Record<string,string>;
  return Object.fromEntries(
    Object.entries(value as Record<string,unknown>)
      .slice(0,20)
      .map(([k,v])=>[text(k,80),text(v,300)])
      .filter(([k])=>Boolean(k))
  );
}

export async function POST(req:Request){
 try{
  const contentLength=Number(req.headers.get('content-length')||0);
  if(contentLength>MAX_BODY_BYTES)return NextResponse.json({ok:false,error:'payload_too_large'},{status:413});

  const raw=await req.text();
  if(raw.length>MAX_BODY_BYTES)return NextResponse.json({ok:false,error:'payload_too_large'},{status:413});
  const data=JSON.parse(raw||'{}') as Record<string,unknown>;

  // Honeypot. Humans never fill this hidden field.
  if(text(data.website,200))return NextResponse.json({ok:true,mode:'ignored'});

  const name=text(data.name,120);
  const phone=text(data.phone,80);
  const company=text(data.company,180);
  const source=text(data.source,100)||'site';
  const details=cleanDetails(data.details);

  if(!name||!phone)return NextResponse.json({ok:false,error:'required_fields'},{status:400});

  const externalWrites=process.env.EXTERNAL_WRITES_ENABLED==='true';
  const webhook=process.env.CRM_WEBHOOK_URL;

  // Safe staging default: accept the UI flow but do not call external systems.
  if(!externalWrites){
    return NextResponse.json({ok:true,mode:'dry_run'});
  }
  if(!webhook){
    return NextResponse.json({ok:false,error:'crm_not_configured'},{status:503});
  }

  const detailsText=Object.entries(details).map(([k,v])=>`${k}: ${v}`).join('\n');
  const payload={fields:{
    TITLE:`PromSafe – ${company||name||'новый лид'}`,
    NAME:name,
    PHONE:phone?[{VALUE:phone,VALUE_TYPE:'WORK'}]:[],
    COMPANY_TITLE:company,
    COMMENTS:[`Источник: ${source}`,detailsText].filter(Boolean).join('\n\n')
  }};
  const r=await fetch(webhook,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),cache:'no-store'});
  if(!r.ok)return NextResponse.json({ok:false,error:'crm_error'},{status:502});
  return NextResponse.json({ok:true,mode:'crm'});
 }catch{
  return NextResponse.json({ok:false,error:'bad_request'},{status:400});
 }
}
