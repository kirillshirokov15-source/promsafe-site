import type {MetadataRoute} from 'next';
import {getSiteUrl} from '@/lib/seo';
import {indexableSite} from '@/lib/site-visibility';

export default function robots():MetadataRoute.Robots{
  if(!indexableSite())return {rules:{userAgent:'*',disallow:'/'}};
  const siteUrl=getSiteUrl();
  return {
    rules:{userAgent:'*',allow:'/'},
    sitemap:`${siteUrl}/sitemap.xml`,
    host:siteUrl,
  };
}
