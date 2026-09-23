import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import Link from 'next/link';
import {services} from '@/lib/content';
import {absoluteUrl,buildMetadata,serviceSeo} from '@/lib/seo';
import StructuredData from '@/components/StructuredData';

export async function generateStaticParams(){return services.map(s=>({slug:s.slug}))}

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;
  const s=services.find(x=>x.slug===slug);
  const seo=serviceSeo[slug];
  return s&&seo?buildMetadata({...seo,path:`/services/${slug}`}):{title:'Услуга'};
}

const related:Record<string,{label:string;href:string}[]>={
  'outsourcing-ohrany-truda':[
    {label:'Когда компании нужен специалист по охране труда',href:'/knowledge/kogda-nuzhen-specialist-po-ot'},
    {label:'Какие документы по охране труда нужны компании',href:'/knowledge/kakie-dokumenty-po-ohrane-truda-nuzhny-kompanii'},
    {label:'Охрана труда для малого бизнеса',href:'/solutions/small-business'},
  ],
  suot:[
    {label:'Какие документы по охране труда нужны компании',href:'/knowledge/kakie-dokumenty-po-ohrane-truda-nuzhny-kompanii'},
    {label:'Оценка профессиональных рисков',href:'/services/professional-risks'},
  ],
  'professional-risks':[
    {label:'Оценка профессиональных рисков: что проверить работодателю',href:'/knowledge/ocenka-professionalnyh-riskov'},
    {label:'Охрана труда для производства',href:'/solutions/production'},
  ],
  'proverka-git':[
    {label:'Как подготовиться к проверке ГИТ',href:'/knowledge/podgotovka-k-proverke-git'},
    {label:'Чек-лист подготовки к проверке ГИТ',href:'/resources/git-checklist'},
  ],
  'accident-investigation':[
    {label:'Что делать работодателю при несчастном случае',href:'/knowledge/chto-delat-pri-neschastnom-sluchae'},
    {label:'Контакты PromSafe',href:'/contacts'},
  ],
  training:[
    {label:'Какие документы по охране труда нужны компании',href:'/knowledge/kakie-dokumenty-po-ohrane-truda-nuzhny-kompanii'},
  ],
  documents:[
    {label:'Какие документы по охране труда нужны компании',href:'/knowledge/kakie-dokumenty-po-ohrane-truda-nuzhny-kompanii'},
    {label:'Чек-лист подготовки к проверке ГИТ',href:'/resources/git-checklist'},
  ],
  consultations:[
    {label:'База знаний по охране труда',href:'/knowledge'},
    {label:'Контакты PromSafe',href:'/contacts'},
  ],
  'social-audit':[
    {label:'Разработка и внедрение СУОТ',href:'/services/suot'},
    {label:'Документы по охране труда',href:'/services/documents'},
  ],
  'medical-exams':[
    {label:'Какие документы по охране труда нужны компании',href:'/knowledge/kakie-dokumenty-po-ohrane-truda-nuzhny-kompanii'},
  ],
};

export default async function Page({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;
 const s=services.find(x=>x.slug===slug);
 if(!s)notFound();
 const seo=serviceSeo[slug]||{title:s.title,description:s.short};
 const schema={
   '@context':'https://schema.org',
   '@type':'Service',
   name:s.title,
   description:seo.description,
   url:absoluteUrl(`/services/${slug}`),
   areaServed:[{'@type':'City',name:'Москва'},{'@type':'AdministrativeArea',name:'Московская область'}],
   provider:{'@type':'Organization',name:'ООО «Промбезопасность Консалт»',url:absoluteUrl('/')},
 };
 const relatedLinks=related[slug]||[];
 return <main>
  <StructuredData data={schema}/>
  <section className="innerHero"><div className="wrap breadcrumbs"><Link href="/">Главная</Link> / <Link href="/services">Услуги</Link> / {s.title}</div><div className="wrap serviceHero"><div><span className="kicker">Услуга</span><h1>{s.title}</h1><p className="lead">{s.intro}</p><p>Работаем с компаниями Москвы и Московской области. Точный состав услуги зависит от деятельности, численности, площадок и текущего состояния охраны труда.</p><div className="actions"><Link className="primaryButton" href="/calculator">Оценить объём работ</Link><a className="secondaryButton" href="#scope">Что входит</a></div></div><div className="photoPlaceholder compact serviceFactCard">
      <b>{slug==='documents'?'Документы – по открытому прайсу':'Стоимость – после первичного аудита'}</b>
      <span>Москва и Московская область</span>
      <span>{slug==='documents'?'Отдельные документы и комплекты':'Разовая задача или постоянное сопровождение'}</span>
    </div></div></section>
  <section className="section white" id="scope"><div className="wrap contentWithSide"><aside className="sectionNav"><b>На странице</b><a href="#fit">Кому подходит</a><a href="#scope">Что входит</a><a href="#process">Как работаем</a><a href="#price">Стоимость</a><a href="#faq">Вопросы</a><a href="#materials">Материалы</a></aside><div>
    <section id="fit" className="contentBlock"><span className="kicker">Кому подходит</span><h2>Когда эта услуга имеет смысл.</h2><div className="cardGrid two"><div className="plainCard"><h3>Нет внутреннего ресурса</h3><p>Нужно закрыть функцию или конкретную задачу без расширения команды.</p></div><div className="plainCard"><h3>Нужна внешняя экспертиза</h3><p>Есть ответственный сотрудник, но сложные вопросы требуют практической поддержки.</p></div></div></section>
    <section className="contentBlock"><span className="kicker">Состав работ</span><h2>Что можем взять на себя.</h2><div className="numberList">{s.bullets.map((b,i)=><div key={b}><b>0{i+1}</b><h3>{b}</h3><p>Точный состав и границы ответственности фиксируются после первичного разбора задачи.</p></div>)}</div></section>
    <section id="process" className="contentBlock"><span className="kicker">Процесс</span><h2>Как начинается работа.</h2><div className="cardGrid three"><div className="plainCard"><small>Шаг 1</small><h3>Разбираем ситуацию</h3><p>Проверяем, что уже есть и где находятся основные пробелы.</p></div><div className="plainCard"><small>Шаг 2</small><h3>Фиксируем объём</h3><p>Определяем задачи, сроки и границы ответственности.</p></div><div className="plainCard"><small>Шаг 3</small><h3>Начинаем работу</h3><p>Ведём согласованный объём и подключаемся к возникающим вопросам.</p></div></div></section>
    <section id="price" className="pricePanel"><span className="kicker light">Стоимость</span><h2>{slug==='documents'?'Цены на разработку документов опубликованы открыто.':'Стоимость – по запросу после первичного аудита.'}</h2>{slug==='documents'?<><p>На действующем сайте PromSafe опубликованы цены на отдельные документы. Для комплекта документов итоговая стоимость зависит от состава и задачи компании.</p>
      <div className="documentPriceGrid"><div><b>Положения</b><span>1 000–2 000 ₽</span></div><div><b>Программы</b><span>от 2 000 ₽</span></div><div><b>Инструкции</b><span>от 1 000 ₽</span></div><div><b>Пожарная безопасность</b><span>от 500 ₽</span></div><div><b>Приказы</b><span>от 500 ₽</span></div></div>
      <div className="priceDetails">
        <h3>Положения</h3>
        <ul>
          <li>Положение о службе охраны труда – 2 000 ₽</li>
          <li>Положение о системе управления охраной труда – 2 000 ₽</li>
          <li>Положение о комиссии по охране труда – 2 000 ₽</li>
          <li>Положение о порядке расследования несчастных случаев – 2 000 ₽</li>
          <li>Приложение к положению о порядке расследования несчастных случаев – 1 000 ₽</li>
          <li>Положение об особенностях расследования микротравм – 2 000 ₽</li>
          <li>Положение о медицинских осмотрах работников – 2 000 ₽</li>
          <li>Положение о выдаче и применении СИЗ – 2 000 ₽</li>
        </ul>
        <h3>Программы и инструкции</h3>
        <ul>
          <li>Программа вводного инструктажа по охране труда – 2 000 ₽</li>
          <li>Программа инструктажа на рабочем месте для офисных работников – 2 000 ₽</li>
          <li>Программа инструктажа по оказанию первой помощи – 2 000 ₽</li>
          <li>Инструкции по охране труда – от 1 000 ₽ за документ</li>
        </ul>
        <h3>Пожарная безопасность и приказы</h3>
        <ul>
          <li>Положения и программы по пожарной безопасности – 2 000 ₽</li>
          <li>Инструкции по пожарной безопасности – от 1 000 ₽</li>
          <li>Отдельные планы, акты и формы – от 500 ₽</li>
          <li>Приказы по охране труда – от 500 ₽</li>
        </ul>
      </div></>:<p>Сначала разбираем текущее состояние охраны труда, объём задач, численность, отрасль и количество площадок. После этого формируем предложение под конкретную компанию.</p>}<Link className="inverseButton" href="/contacts">Запросить расчёт</Link></section>

    <section id="faq" className="contentBlock"><span className="kicker">Частые вопросы</span><h2>Что важно знать до обращения.</h2><div className="cardGrid two">
      <div className="plainCard"><h3>Сколько стоит услуга?</h3><p>{slug==='documents'?'Цены на отдельные документы опубликованы выше. Для комплекта стоимость определяется по составу документов.':'Для услуг точная стоимость определяется после первичного аудита: учитываются задача, численность, отрасль, площадки и текущее состояние охраны труда.'}</p></div>
      <div className="plainCard"><h3>Можно заказать только одну задачу?</h3><p>Да. PromSafe может подключаться как к постоянному сопровождению, так и к отдельной задаче – например документам, проверке, оценке рисков или консультации.</p></div>
      <div className="plainCard"><h3>С какой территории работает PromSafe?</h3><p>Основная география текущего предложения – Москва и Московская область.</p></div>
      <div className="plainCard"><h3>Что нужно для начала?</h3><p>Коротко описать компанию и задачу. После первичного разбора можно определить состав работ, сроки и стоимость.</p></div>
    </div></section>

    <section id="materials" className="contentBlock"><span className="kicker">Связанные материалы</span><h2>Полезное по этой теме.</h2><div className="cardGrid two">{relatedLinks.map(item=><Link className="plainCard clickable" href={item.href} key={item.href}><h3>{item.label}</h3><b>Открыть →</b></Link>)}</div></section>
  </div></div></section>
 </main>;
}
