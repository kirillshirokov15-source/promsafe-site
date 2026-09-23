import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import Link from 'next/link';
import {articles} from '@/lib/content';
import {articleSeo,buildMetadata} from '@/lib/seo';

export async function generateStaticParams(){return articles.map(a=>({slug:a.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;
  const a=articles.find(x=>x.slug===slug);
  const seo=articleSeo[slug];
  return a&&seo?buildMetadata({...seo,path:`/knowledge/${slug}`}):{title:'База знаний'};
}

type Section={id:string;title:string;body:React.ReactNode};
type ArticleContent={sections:Section[];sources:{label:string;url:string}[];cta?:'emergency'|'calculator'|'service'};

const content:Record<string,ArticleContent>={
  'chto-delat-pri-neschastnom-sluchae':{
    sections:[
      {id:'first',title:'1. Организуйте первую помощь и исключите дальнейшую опасность',body:<>Роструд указывает, что при несчастном случае работодатель должен прежде всего организовать помощь пострадавшему и принять меры, чтобы ситуация не создавала угрозу другим работникам.</>},
      {id:'scene',title:'2. Зафиксируйте обстоятельства происшествия',body:<>До начала расследования важно по возможности сохранить обстановку на месте происшествия, а если это невозможно – зафиксировать её доступным способом. Также работодателю потребуется информация о характере и степени повреждения здоровья.</>},
      {id:'notice',title:'3. Определите, кого необходимо уведомить',body:<>Для групповых, тяжёлых и смертельных несчастных случаев Трудовой кодекс предусматривает отдельный порядок извещения. Конкретный перечень адресатов и сроки зависят от характера случая, поэтому их нужно проверять по действующей редакции требований.</>},
      {id:'commission',title:'4. Создайте комиссию и проведите расследование',body:<>Состав комиссии и срок расследования зависят от обстоятельств и тяжести последствий. По результатам расследования оформляются установленные документы и определяются мероприятия, которые должны предотвратить повторение аналогичной ситуации.</>},
      {id:'help',title:'5. Когда стоит подключить специалиста',body:<>Если случай тяжёлый, групповой, смертельный либо есть спор по обстоятельствам и оформлению документов, лучше сразу проверить порядок действий с профильным специалистом и официальными источниками.</>},
    ],
    sources:[
      {label:'Роструд – памятка о действиях при несчастном случае',url:'https://git11.rostrud.gov.ru/osnovnye-pokazateli-deyatelnosti-gosudarstvennoy-inspektsii-truda/osnovnye-pokazateli-deyatelnosti32236598/nadzor-i-kontrol-v-sfere-zakonodatelstva-ob-okhrane-truda/pamyatka-deystviya-rabotodateley-i-rabotnikov-chlenov-ikh-semey-pr-neschastnom-sluchae-na-proizvodst/507692.html'},
      {label:'Роструд – материалы по охране труда и расследованию несчастных случаев',url:'https://git61.rostrud.gov.ru/upload/iblock/194/-8-_161_.pdf'},
    ],cta:'emergency'
  },
  'podgotovka-k-proverke-git':{
    sections:[
      {id:'scope',title:'1. Проверьте, как организована охрана труда в компании',body:<>Начните не с отдельных файлов, а с процессов: кто отвечает за охрану труда, как устроена СУОТ, какие обязательные мероприятия проводятся и как фиксируются результаты.</>},
      {id:'training',title:'2. Проверьте обучение и инструктажи',body:<>Роструд относит обучение работников, инструктажи и проверку знаний к базовым обязанностям работодателя в сфере охраны труда. На практике важно проверить не только наличие документов, но и актуальность сроков и охват работников.</>},
      {id:'risks',title:'3. Проверьте управление профессиональными рисками',body:<>Работодатель должен выявлять опасности, оценивать профессиональные риски и принимать меры по их снижению. Этот блок должен быть связан с реальными рабочими местами и процессами, а не существовать отдельно от них.</>},
      {id:'medical',title:'4. Проверьте медосмотры и другие обязательные мероприятия',body:<>Если для работников предусмотрены обязательные медицинские осмотры, средства индивидуальной защиты или другие специальные мероприятия, проверьте документы, сроки и фактическое выполнение.</>},
      {id:'plan',title:'5. Составьте список несоответствий и приоритетов',body:<>Перед проверкой полезнее иметь короткий список конкретных пробелов с ответственными и сроками исправления, чем пытаться одномоментно переписать весь комплект документов.</>},
    ],
    sources:[
      {label:'Роструд – обязанности работодателя и работника в области охраны труда',url:'https://git67.rostrud.gov.ru/dey/informatsiya_dlya_rabotnikov/90981.html'},
      {label:'Роструд – основные мероприятия по предупреждению производственного травматизма',url:'https://git54.rostrud.gov.ru/news/1530493.html'},
    ],cta:'service'
  },
  'ocenka-professionalnyh-riskov':{
    sections:[
      {id:'meaning',title:'1. Профессиональные риски – часть системы охраны труда',body:<>Роструд указывает, что управление профессиональными рисками является элементом СУОТ и включает выявление опасностей, оценку рисков и меры по их снижению.</>},
      {id:'hazards',title:'2. Начните с реальных опасностей',body:<>Оценка должна опираться на фактические рабочие места, оборудование, операции и условия труда. Универсальный перечень без привязки к компании не заменяет анализ реальных процессов.</>},
      {id:'assessment',title:'3. Зафиксируйте результаты оценки',body:<>После выявления опасностей необходимо оценить уровни рисков и оформить результаты в принятой в компании форме, чтобы ими можно было пользоваться при планировании мероприятий.</>},
      {id:'measures',title:'4. Определите меры управления',body:<>Смысл оценки не в документе как таковом, а в том, чтобы определить меры по исключению опасностей либо снижению и контролю рисков.</>},
    ],
    sources:[
      {label:'Роструд – профилактика травматизма',url:'https://git54.rostrud.gov.ru/news/1530493.html'},
      {label:'Роструд – материалы об управлении профессиональными рисками',url:'https://git61.rostrud.gov.ru/upload/iblock/4df/-12-_165_.pdf'},
    ],cta:'calculator'
  },
  'kogda-nuzhen-specialist-po-ot':{
    sections:[
      {id:'over50',title:'1. Если работников больше 50',body:<>В руководстве Роструда указано: у работодателя, осуществляющего производственную деятельность, при численности работников свыше 50 человек должна быть создана служба охраны труда или введена должность специалиста по охране труда.</>},
      {id:'under50',title:'2. Если работников 50 или меньше',body:<>При численности до 50 работников решение о создании службы или введении должности специалиста принимает работодатель с учётом специфики своей деятельности.</>},
      {id:'external',title:'3. Когда функции можно передать внешнему специалисту',body:<>Если собственной службы или штатного специалиста нет, функции в предусмотренных законом случаях могут выполнять руководитель, уполномоченный работник либо привлекаемый по договору специалист или организация. Для услуг, для которых это требуется законодательством, внешняя организация должна иметь соответствующую аккредитацию.</>},
      {id:'choice',title:'4. Что проверить перед выбором формата',body:<>Численность – не единственный фактор. Нужно учитывать производственную деятельность, характер рисков, количество площадок и фактический объём задач.</>},
    ],
    sources:[
      {label:'Роструд – руководство по соблюдению обязательных требований, раздел о службе охраны труда',url:'https://git27.rostrud.gov.ru/upload/iblock/908/prikaz-rostruda-ot-11_11_2022-n-253-ob-utverzhdenii-rukovods.pdf'},
    ],cta:'service'
  },
  'kakie-dokumenty-po-ohrane-truda-nuzhny-kompanii':{
    sections:[
      {id:'no-universal',title:'1. Универсального комплекта документов для всех компаний нет',body:<>Состав документации зависит от деятельности работодателя, рабочих процессов, рисков, численности и обязательных мероприятий. Поэтому готовый список без исходных данных может быть только ориентиром.</>},
      {id:'suot',title:'2. Документы СУОТ и распределение ответственности',body:<>В документации должны быть отражены организация системы управления охраной труда, ответственные лица и порядок выполнения ключевых процедур.</>},
      {id:'training',title:'3. Обучение, инструктажи и проверка знаний',body:<>Работодатель должен организовывать обучение и инструктажи работников. На сайте PromSafe этот блок вынесен в отдельную услугу, поскольку состав документов зависит от групп работников и выполняемых работ.</>},
      {id:'risks',title:'4. Профессиональные риски и обязательные мероприятия',body:<>Документация должна быть связана с управлением профессиональными рисками. Отдельно проверяются документы по медицинским осмотрам, СИЗ и другим мероприятиям, если они применимы к конкретной компании.</>},
      {id:'audit',title:'5. Как проверить свой комплект',body:<>Начните с фактических процессов компании и сопоставьте их с документами. Для первичной проверки можно использовать чек-лист или пройти предварительный расчёт объёма работ.</>},
    ],
    sources:[
      {label:'Роструд – общая информация по обязанностям в области охраны труда',url:'https://git67.rostrud.gov.ru/dey/informatsiya_dlya_rabotnikov/90981.html'},
      {label:'Роструд – руководство по соблюдению обязательных требований',url:'https://git27.rostrud.gov.ru/upload/iblock/908/prikaz-rostruda-ot-11_11_2022-n-253-ob-utverzhdenii-rukovods.pdf'},
    ],cta:'calculator'
  },
};


const relatedService:Record<string,{label:string;href:string}>={
  'chto-delat-pri-neschastnom-sluchae':{label:'Сопровождение расследования несчастного случая',href:'/services/accident-investigation'},
  'podgotovka-k-proverke-git':{label:'Подготовка к проверке ГИТ',href:'/services/proverka-git'},
  'ocenka-professionalnyh-riskov':{label:'Оценка профессиональных рисков',href:'/services/professional-risks'},
  'kogda-nuzhen-specialist-po-ot':{label:'Аутсорсинг охраны труда',href:'/services/outsourcing-ohrany-truda'},
  'kakie-dokumenty-po-ohrane-truda-nuzhny-kompanii':{label:'Разработка документов по охране труда',href:'/services/documents'},
};

export default async function Page({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params; const a=articles.find(x=>x.slug===slug); const body=content[slug]; if(!a||!body)notFound();
  return <main>
    <section className="articleHero"><div className="wrap articleNarrow"><div className="breadcrumbs"><Link href="/">Главная</Link> / <Link href="/knowledge">База знаний</Link></div><span className="kicker">Практический материал</span><h1>{a.title}</h1><div className="articleMeta"><span>Проверено по открытым источникам</span><span>Источники: Роструд</span></div><p className="lead">{a.desc}</p></div></section>
    <section className="section white"><div className="wrap articleLayout">
      <aside className="sectionNav"><b>Содержание</b>{body.sections.map(s=><a href={`#${s.id}`} key={s.id}>{s.title.replace(/^\d+\.\s*/, '')}</a>)}</aside>
      <article className="articleBody">
        <div className="legalNote">Материал носит информационный характер. Для конкретной ситуации нужно сверять требования с действующей редакцией законодательства и обстоятельствами работодателя.</div>
        {body.sections.map(s=><section key={s.id}><h2 id={s.id}>{s.title}</h2><p>{s.body}</p></section>)}
        <section className="contentBlock"><h2>Официальные источники</h2><ul>{body.sources.map(s=><li key={s.url}><a className="textLink" href={s.url} target="_blank" rel="noreferrer">{s.label} →</a></li>)}</ul></section>
        <section className="contentBlock"><h2>Связанная услуга PromSafe</h2><Link className="plainCard clickable" href={relatedService[slug].href}><h3>{relatedService[slug].label}</h3><p>Если вопрос требует не только справочной информации, можно перейти к описанию услуги и оценить объём работ.</p><b>Подробнее →</b></Link></section>
        {body.cta==='emergency'&&<div className="pricePanel emergencyArticlePanel"><h3>Нужна помощь в конкретной ситуации?</h3><p>При несчастном случае важны обстоятельства и правильная последовательность действий. Для экстренной консультации используйте прямой номер PromSafe.</p><a className="emergencyPhone" href="tel:+79163466469">+7 (916) 346–64–69</a></div>}
        {body.cta==='calculator'&&<div className="actions"><Link className="secondaryButton" href="/resources/git-checklist">Открыть чек-лист</Link><Link className="primaryButton" href="/calculator">Оценить объём работ</Link></div>}
        {body.cta==='service'&&<div className="actions"><Link className="primaryButton" href={relatedService[slug].href}>{relatedService[slug].label}</Link><Link className="secondaryButton" href="/contacts">Задать вопрос</Link></div>}
      </article>
    </div></section>
  </main>;
}
