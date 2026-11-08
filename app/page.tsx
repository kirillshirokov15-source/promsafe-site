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

export default function Home(){return <main id="main-content">
 <section className="homeHero"><div className="wrap heroGrid"><div><span className="kicker">Охрана труда для бизнеса</span><h1>Охрана труда под контролем. Документы, процессы, сопровождение.</h1><p className="lead">Помогаем компаниям Москвы и Московской области выстроить процессы, привести в порядок документы, подготовиться к проверкам и действовать правильно в сложных ситуациях.</p><div className="actions"><Link className="primaryButton" href="/services">Посмотреть услуги</Link><a className="secondaryButton" href="#home-calculator">Рассчитать объём работ</a></div></div><div className="companyHeroCard"><div className="heroBrandTop"><CompanyLogo priority/><span>ООО «Промбезопасность Консалт»</span></div><div className="heroBrandRule"/><div className="heroBrandMessage">Практическая поддержка работодателей по вопросам охраны труда</div><div className="heroBrandBottom"><span>Документы</span><span>Профессиональные риски</span><span>Проверки ГИТ</span></div></div></div>
 <div className="wrap proofRow"><div><b>С 2011 года</b><span>работает компания</span></div><div><b>Москва и МО</b><span>основной регион работы</span></div><div><b>По запросу</b><span>предложение после аудита</span></div><div><b>Команда экспертов</b><span>конкретные специалисты</span></div></div></section>

 <section className="section white"><div className="wrap"><div className="splitHead"><div><span className="kicker">С какой задачей вы пришли?</span><h2>Не нужно разбираться в названиях услуг.</h2></div><p>Найдите свою задачу и посмотрите, с чего начать: постоянное сопровождение, проверка документов или помощь в отдельной ситуации.</p></div><div className="cardGrid three">{tasks.map(([title,text,href],i)=>href.startsWith('#')?<a className="taskCard" href={href} key={title}><small>0{i+1}</small><h3>{title}</h3><p>{text}</p><b>Перейти →</b></a>:<Link className="taskCard" href={href} key={title}><small>0{i+1}</small><h3>{title}</h3><p>{text}</p><b>Перейти →</b></Link>)}</div></div></section>

 <section className="section soft embeddedCalculatorSection" id="home-calculator"><div className="wrap embeddedCalculatorLayout"><div className="embeddedCalculatorIntro"><span className="kicker">Калькулятор</span><h2>Пять вопросов – чтобы понять объём работ.</h2><p>Ответьте на пять вопросов о компании и получите ориентир по необходимым работам. Итоговая стоимость определяется после первичного аудита.</p><Link className="textLink" href="/calculator">Открыть калькулятор отдельно →</Link></div><CostCalculator/></div></section>

 <section className="section white"><div className="wrap"><div className="splitHead"><div><span className="kicker">Команда</span><h2>За проектами стоят конкретные специалисты.</h2></div><p>Работу с компанией ведут специалисты по охране труда: от анализа документов до сопровождения процессов и взаимодействия с инспекцией.</p></div><div className="teamGrid"><article className="teamCard leadPerson"><div className="personInitials">ШМ</div><div><span>Генеральный директор</span><h3>Шамиль Хамзаевич Мансуров</h3><p>Руководит компанией и участвует в решении сложных задач по охране труда.</p></div></article><article className="teamCard"><div className="personInitials">НМ</div><div><span>Эксперт</span><h3>Наталья Владимировна Мансурова</h3><p>Занимается документацией и подготовкой к взаимодействию с трудовой инспекцией.</p></div></article><article className="teamCard"><div className="personInitials">КШ</div><div><span>Эксперт</span><h3>Константин Николаевич Шепелев</h3><p>Работает с практическими вопросами организации охраны труда.</p></div></article></div><div className="actions"><Link className="textLink" href="/about">Подробнее о компании →</Link></div></div></section>

 <section className="section"><div className="wrap"><div className="splitHead"><div><span className="kicker">База знаний</span><h2>Полезные материалы без обязательной заявки.</h2></div><p>Разбираем частые вопросы работодателей: документы, проверки, профессиональные риски и действия в нештатных ситуациях.</p></div><div className="materialGrid"><Link href="/resources/git-checklist" className="materialCard featured"><small>Бесплатный документ</small><h3>Чек-лист подготовки к проверке ГИТ</h3><p>Скачать без обязательного телефона.</p><b>Открыть →</b></Link><Link className="materialCard" href="/knowledge/chto-delat-pri-neschastnom-sluchae"><small>Статья</small><h3>Что делать при несчастном случае</h3><p>Практический материал с актуальными источниками.</p><b>Читать →</b></Link><Link className="materialCard" href="/knowledge/kakie-dokumenty-po-ohrane-truda-nuzhny-kompanii"><small>Статья</small><h3>Какие документы нужны компании</h3><p>Структурированный материал по типу организации.</p><b>Читать →</b></Link></div></div></section>
 </main>}
