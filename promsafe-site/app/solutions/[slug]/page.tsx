import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import Link from 'next/link';
import {solutions} from '@/lib/content';
import {absoluteUrl,buildMetadata,solutionSeo} from '@/lib/seo';
import StructuredData from '@/components/StructuredData';

export async function generateStaticParams(){return solutions.filter(s=>s.slug!=='production').map(s=>({slug:s.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;
  const s=solutions.find(x=>x.slug===slug);
  const seo=solutionSeo[slug];
  return s&&seo?buildMetadata({...seo,path:`/solutions/${slug}`}):{title:'Решение'};
}

const scenarios=[
  ['Нужно сопровождение','Перейти к аутсорсингу охраны труда','/services/outsourcing-ohrany-truda'],
  ['Нужно привести документы в порядок','Посмотреть разработку документов','/services/documents'],
  ['Нужно оценить объём работ','Пройти предварительный расчёт','/calculator'],
] as const;


const solutionFactors:Record<string,{title:string;text:string}[]>={
  construction:[
    {title:'Несколько площадок и подрядчики',text:'Важно учитывать фактическую организацию работ на объектах и распределение ответственности между участниками.'},
    {title:'Работы повышенной опасности',text:'Состав обязательных процедур зависит от конкретных видов работ и условий их выполнения.'},
    {title:'Документы должны работать на объекте',text:'Инструктажи, обучение и локальные документы должны соответствовать реальным процессам, а не только храниться в офисе.'},
  ],
  'warehouse-logistics':[
    {title:'Погрузочно-разгрузочные процессы',text:'Оцениваются реальные операции, техника, маршруты движения и взаимодействие работников.'},
    {title:'Профессиональные риски',text:'Опасности и меры управления привязываются к рабочим местам и конкретным операциям.'},
    {title:'Сменность и распределённая работа',text:'Процессы охраны труда должны учитывать графики, площадки и фактических ответственных.'},
  ],
  office:[
    {title:'Не перегружать систему',text:'Для офисной компании важно закрыть реальные обязанности без избыточного комплекта формальных документов.'},
    {title:'Обучение и инструктажи',text:'Нужно определить, какие процедуры применимы к сотрудникам и кто отвечает за их проведение.'},
    {title:'Удалённая и смешанная работа',text:'При наличии дистанционных работников отдельно учитывается фактическая организация труда.'},
  ],
  retail:[
    {title:'Несколько торговых точек',text:'Важно единообразно организовать процессы и определить ответственных по каждой площадке.'},
    {title:'Новые сотрудники и текучесть',text:'Инструктажи и обучение должны быть встроены в регулярный процесс приёма работников.'},
    {title:'Складские и подсобные операции',text:'Даже в торговле состав рисков зависит от того, какие работы фактически выполняют сотрудники.'},
  ],
  'small-business':[
    {title:'Без отдельного специалиста',text:'Можно определить минимально необходимый рабочий контур и решить, какие функции оставить внутри, а какие передать на сопровождение.'},
    {title:'Понятный набор задач',text:'Сначала определяются реальные обязанности работодателя, затем документы, обучение и другие применимые мероприятия.'},
    {title:'Поэтапное внедрение',text:'Не обязательно пытаться исправить всё одновременно: после аудита задачи можно расставить по приоритету.'},
  ],
};

const articleBySolution:Record<string,{label:string;href:string}>={
  construction:{label:'Как подготовиться к проверке ГИТ',href:'/knowledge/podgotovka-k-proverke-git'},
  'warehouse-logistics':{label:'Оценка профессиональных рисков',href:'/knowledge/ocenka-professionalnyh-riskov'},
  office:{label:'Когда нужен специалист по охране труда',href:'/knowledge/kogda-nuzhen-specialist-po-ot'},
  retail:{label:'Какие документы по охране труда нужны компании',href:'/knowledge/kakie-dokumenty-po-ohrane-truda-nuzhny-kompanii'},
  'small-business':{label:'Когда нужен специалист по охране труда',href:'/knowledge/kogda-nuzhen-specialist-po-ot'},
};

export default async function Page({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;
 const s=solutions.find(x=>x.slug===slug);
 if(!s||slug==='production')notFound();
 const seo=solutionSeo[slug]||{title:s.title,description:s.desc};
 const schema={
  '@context':'https://schema.org','@type':'Service',name:seo.title,description:seo.description,
  url:absoluteUrl(`/solutions/${slug}`),
  areaServed:[{'@type':'City',name:'Москва'},{'@type':'AdministrativeArea',name:'Московская область'}],
  provider:{'@type':'Organization',name:'ООО «Промбезопасность Консалт»',url:absoluteUrl('/')},
 };
 const article=articleBySolution[slug];
 return <main>
  <StructuredData data={schema}/>
  <section className="innerHero"><div className="wrap breadcrumbs"><Link href="/">Главная</Link> / <Link href="/solutions">Решения</Link> / {s.title}</div><div className="wrap serviceHero"><div><span className="kicker">Решение по типу бизнеса</span><h1>Охрана труда: {s.title.toLowerCase()}.</h1><p className="lead">{s.desc} Точный состав обязательных мероприятий определяется по фактическим рабочим процессам, численности и условиям работы компании.</p><p>Работаем с компаниями Москвы и Московской области.</p><div className="actions"><Link className="primaryButton" href="/calculator">Оценить объём работ</Link><Link className="secondaryButton" href="/services">Все услуги</Link></div></div><div className="photoPlaceholder compact serviceFactCard"><b>{s.title}</b><span>Москва и Московская область</span><span>Состав работ – после первичного разбора компании</span></div></div></section>
  <section className="section white"><div className="wrap"><div className="splitHead"><div><span className="kicker">Что учитывать</span><h2>Основные особенности этого сценария.</h2></div><p>Это не универсальный перечень требований, а точки, которые стоит проверить при первичном аудите.</p></div><div className="cardGrid three">{(solutionFactors[slug]||[]).map(item=><div className="plainCard tall" key={item.title}><h3>{item.title}</h3><p>{item.text}</p></div>)}</div></div></section>
  <section className="section soft"><div className="wrap"><div className="splitHead"><div><span className="kicker">С чего начать</span><h2>Выберите задачу, которая стоит сейчас.</h2></div><p>Набор работ зависит от конкретной компании, поэтому начинаем с фактической ситуации.</p></div><div className="cardGrid three">{scenarios.map(([title,label,href])=><Link className="plainCard clickable" href={href} key={title}><h3>{title}</h3><b>{label} →</b></Link>)}</div>{article&&<div className="actions" style={{marginTop:28}}><Link className="textLink" href={article.href}>{article.label} →</Link></div>}</div></section>
 </main>
}
