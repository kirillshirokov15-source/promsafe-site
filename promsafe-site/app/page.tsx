import Link from 'next/link';
import CostCalculator from '@/components/CostCalculator';
import CompanyLogo from '@/components/CompanyLogo';
import {buildMetadata} from '@/lib/seo';

export const metadata=buildMetadata({
  title:'Охрана труда для бизнеса в Москве и МО',
  description:'Аутсорсинг охраны труда, СУОТ, профессиональные риски, подготовка к ГИТ и документы для компаний Москвы и Московской области.',
  path:'/',
});

const tasks=[
 ['Нужна охрана труда под ключ','Нет отдельного специалиста или функцию нужно передать на сопровождение.','/services/outsourcing-ohrany-truda'],
 ['Предстоит проверка ГИТ','Нужно проверить готовность и понять, что исправить заранее.','/resources/git-checklist'],
 ['Произошёл несчастный случай','Нужен понятный алгоритм первых действий и сопровождение.','/knowledge/chto-delat-pri-neschastnom-sluchae'],
 ['Нужно оценить объём работ','Пять вопросов о компании и текущей ситуации.','#home-calculator'],
 ['Производственная компания','Отдельный сценарий для предприятия с производственными процессами.','/solutions/production'],
 ['Хочу сначала разобраться сам','Статьи, чек-листы и бесплатные документы.','/knowledge'],
];

export default function Home(){return <main>
 <section className="homeHero"><div className="wrap heroGrid"><div><span className="kicker">Охрана труда для бизнеса</span><h1>Система охраны труда, которая работает не только на бумаге.</h1><p className="lead">Помогаем компаниям Москвы и Московской области выстроить процессы, привести в порядок документы, подготовиться к проверкам и действовать правильно в сложных ситуациях.</p><div className="actions"><Link className="primaryButton" href="/services">Посмотреть услуги</Link><a className="secondaryButton" href="#home-calculator">Рассчитать объём работ</a></div></div><div className="photoPlaceholder companyHeroCard"><CompanyLogo priority/><b>ООО «Промбезопасность Консалт»</b><span>Охрана труда для бизнеса · Москва и Московская область</span></div></div>
 <div className="wrap proofRow"><div><b>С 2011 года</b><span>работает компания</span></div><div><b>24/7</b><span>помощь при ЧП</span></div><div><b>По договору</b><span>ответственность за работу</span></div><div><b>Команда экспертов</b><span>конкретные специалисты</span></div></div></section>

 <section className="section white"><div className="wrap"><div className="splitHead"><div><span className="kicker">С какой задачей вы пришли?</span><h2>Не нужно разбираться в названиях услуг.</h2></div><p>Выберите ситуацию – дальше сайт покажет подходящее решение и полезные материалы.</p></div><div className="cardGrid three">{tasks.map(([title,text,href],i)=>href.startsWith('#')?<a className="taskCard" href={href} key={title}><small>0{i+1}</small><h3>{title}</h3><p>{text}</p><b>Перейти →</b></a>:<Link className="taskCard" href={href} key={title}><small>0{i+1}</small><h3>{title}</h3><p>{text}</p><b>Перейти →</b></Link>)}</div></div></section>

 <section className="section soft embeddedCalculatorSection" id="home-calculator"><div className="wrap embeddedCalculatorLayout"><div className="embeddedCalculatorIntro"><span className="kicker">Калькулятор</span><h2>Пять вопросов – чтобы понять объём работ.</h2><p>Сначала показываем предварительный результат. Контакт просим только если нужен точный расчёт.</p><p className="calculatorHint">Отдельная страница калькулятора также доступна по прямой ссылке.</p><Link className="textLink" href="/calculator">Открыть калькулятор отдельно →</Link></div><CostCalculator/></div></section>

 <section className="section white"><div className="wrap"><div className="splitHead"><div><span className="kicker">Команда</span><h2>За проектами стоят конкретные специалисты.</h2></div><p>Команда работает с документацией, проверками, рисками и сложными ситуациями в охране труда.</p></div><div className="teamGrid"><article className="teamCard leadPerson"><div className="personInitials">ШМ</div><div><span>Генеральный директор</span><h3>Шамиль Хамзаевич Мансуров</h3><p>Опыт работы более 15 лет. Подключается к сложным и экстренным ситуациям.</p></div></article><article className="teamCard"><div className="personInitials">НМ</div><div><span>Эксперт</span><h3>Наталья Владимировна Мансурова</h3><p>Опыт работы более 7 лет. Специализация – документация и подготовка к взаимодействию с трудовой инспекцией.</p></div></article><article className="teamCard"><div className="personInitials">КШ</div><div><span>Эксперт</span><h3>Константин Николаевич Шепелев</h3><p>Опыт работы более 10 лет. Практическая работа по вопросам охраны труда.</p></div></article></div><div className="actions"><Link className="textLink" href="/about">Подробнее о компании →</Link></div></div></section>

 <section className="section"><div className="wrap"><div className="splitHead"><div><span className="kicker">База знаний</span><h2>Полезные материалы без обязательной заявки.</h2></div><p>Практический контент одновременно помогает клиенту и создаёт основу для SEO.</p></div><div className="materialGrid"><Link href="/resources/git-checklist" className="materialCard featured"><small>Бесплатный документ</small><h3>Чек-лист подготовки к проверке ГИТ</h3><p>Скачать без обязательного телефона.</p><b>Открыть →</b></Link><Link className="materialCard" href="/knowledge/chto-delat-pri-neschastnom-sluchae"><small>Статья</small><h3>Что делать при несчастном случае</h3><p>Практический материал с актуальными источниками.</p><b>Читать →</b></Link><Link className="materialCard" href="/knowledge/kakie-dokumenty-po-ohrane-truda-nuzhny-kompanii"><small>Статья</small><h3>Какие документы нужны компании</h3><p>Структурированный материал по типу организации.</p><b>Читать →</b></Link></div></div></section>
 </main>}
