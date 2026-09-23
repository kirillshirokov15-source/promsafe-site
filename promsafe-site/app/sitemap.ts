import type {MetadataRoute} from 'next';
import {services,articles,solutions} from '@/lib/content';
import {getSiteUrl} from '@/lib/seo';

export default function sitemap():MetadataRoute.Sitemap{
  const base=getSiteUrl();
  const staticRoutes=[
    {path:'',priority:1,frequency:'weekly' as const},
    {path:'/services',priority:.9,frequency:'weekly' as const},
    {path:'/solutions',priority:.8,frequency:'weekly' as const},
    {path:'/calculator',priority:.7,frequency:'monthly' as const},
    {path:'/knowledge',priority:.8,frequency:'weekly' as const},
    {path:'/resources',priority:.7,frequency:'monthly' as const},
    {path:'/resources/git-checklist',priority:.8,frequency:'monthly' as const},
    {path:'/contacts',priority:.6,frequency:'monthly' as const},
    {path:'/about',priority:.6,frequency:'monthly' as const},
  ];
  return [
    ...staticRoutes.map(r=>({url:`${base}${r.path||'/'}`,changeFrequency:r.frequency,priority:r.priority})),
    ...services.map(s=>({url:`${base}/services/${s.slug}`,changeFrequency:'monthly' as const,priority:.85})),
    ...articles.map(a=>({url:`${base}/knowledge/${a.slug}`,changeFrequency:'monthly' as const,priority:.75})),
    ...solutions.map(s=>({url:`${base}/solutions/${s.slug}`,changeFrequency:'monthly' as const,priority:.8})),
  ];
}
