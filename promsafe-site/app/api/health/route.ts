import {NextResponse} from 'next/server';

export async function GET(){
  return NextResponse.json({
    ok:true,
    service:'promsafe-web',
    env:process.env.NEXT_PUBLIC_SITE_ENV||'local',
    externalWrites:process.env.EXTERNAL_WRITES_ENABLED==='true',
  },{headers:{'Cache-Control':'no-store'}});
}
