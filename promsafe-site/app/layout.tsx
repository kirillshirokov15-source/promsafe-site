import type {Metadata} from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StructuredData from '@/components/StructuredData';
import {absoluteUrl,COMPANY_NAME,getSiteUrl,SITE_NAME} from '@/lib/seo';

const siteEnv=process.env.NEXT_PUBLIC_SITE_ENV||'local';
const siteUrl=getSiteUrl();
const isProduction=siteEnv==='production';

export const metadata:Metadata={
  metadataBase:new URL(siteUrl),
  title:{default:'Охрана труда для бизнеса в Москве и МО – PromSafe',template:'%s – PromSafe'},
  description:'Охрана труда для бизнеса в Москве и Московской области: аутсорсинг, СУОТ, профессиональные риски, подготовка к ГИТ, документы и сопровождение работодателей.',
  robots:{index:isProduction,follow:isProduction},
};

const organizationSchema={
  '@context':'https://schema.org',
  '@type':'Organization',
  name:COMPANY_NAME,
  alternateName:SITE_NAME,
  url:absoluteUrl('/'),
  logo:absoluteUrl('/promsafe-logo-original.png'),
  foundingDate:'2011-07-06',
  email:'info@promsafe.ru',
  telephone:'+7-916-346-64-69',
  address:{
    '@type':'PostalAddress',
    streetAddress:'ул. Медиков, д. 22, к. 1, кв. 25',
    addressLocality:'Москва',
    addressCountry:'RU',
  },
  areaServed:[
    {'@type':'City',name:'Москва'},
    {'@type':'AdministrativeArea',name:'Московская область'},
  ],
  contactPoint:[
    {'@type':'ContactPoint',telephone:'+7-916-346-64-69',contactType:'customer service',areaServed:'RU',availableLanguage:'ru'},
    {'@type':'ContactPoint',telephone:'+7-910-000-14-85',contactType:'customer service',areaServed:'RU',availableLanguage:'ru'},
  ],
};

const websiteSchema={
  '@context':'https://schema.org',
  '@type':'WebSite',
  name:SITE_NAME,
  url:absoluteUrl('/'),
  inLanguage:'ru-RU',
};

export default function RootLayout({children}:{children:React.ReactNode}){
 return <html lang="ru"><body>
   <StructuredData data={[organizationSchema,websiteSchema]}/>
   {!isProduction&&<div className="stagingBanner">Тестовая версия PromSafe · данные в CRM не отправляются, пока внешние записи отключены</div>}
   <Header/>{children}<Footer/>
 </body></html>
}
