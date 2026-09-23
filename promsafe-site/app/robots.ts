import type {MetadataRoute} from 'next';
import {getSiteUrl} from '@/lib/seo';

export default function robots():MetadataRoute.Robots{
  const siteEnv=process.env.NEXT_PUBLIC_SITE_ENV||'local';
  const siteUrl=getSiteUrl();
  if(siteEnv!=='production') return {rules:{userAgent:'*',disallow:'/'}};
  return {
    rules:{userAgent:'*',allow:'/'},
    sitemap:`${siteUrl}/sitemap.xml`,
    host:siteUrl,
  };
}
