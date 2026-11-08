import Link from 'next/link';
import {services} from '@/lib/content';
import {buildMetadata} from '@/lib/seo';

export const metadata=buildMetadata({
  title:'Услуги по охране труда в Москве и МО',
  description:'Услуги по охране труда для бизнеса Москвы и Московской области: аутсорсинг, СУОТ, профессиональные риски, проверка ГИТ, документы, обучение и консультации.',
  path:'/services',
});

const groups=[
  {number:'01',title:'Системная охрана труда',description:'Выстраиваем процессы, распределяем ответственность, помогаем поддерживать документы и мероприятия в актуальном состоянии.',slugs:['outsourcing-ohrany-truda','suot','professional-risks','training']},
  {number:'02',title:'Решение конкретной задачи',description:'Подключаемся к отдельному вопросу – подготовке к проверке, документам, расследованию или организации обязательных процедур.',slugs:['proverka-git','accident-investigation','documents','consultations','social-audit','medical-exams']},
];

export default function Page(){return <main id="main-content">
  <section className="innerHero"><div className="wrap"><span className="kicker">Услуги PromSafe</span><h1>Охрана труда для компаний Москвы и Московской области.</h1><p className="lead">Можно передать согласованный объём задач на сопровождение или обратиться с конкретной ситуацией. Поможем определить состав работы после знакомства с вашей компанией.</p><div className="actions"><Link className="primaryButton" href="/calculator">Подобрать формат работы</Link><Link className="secondaryButton" href="/contacts">Обсудить задачу</Link></div></div></section>

  <section className="section white"><div className="wrap serviceEditorial">
    {groups.map(group=><div className="serviceCategory" key={group.number}>
      <div className="serviceCategoryIntro"><span className="kicker">Направление {group.number}</span><h2>{group.title}</h2><p>{group.description}</p></div>
      <div className="serviceList">{group.slugs.map(slug=>{const service=services.find(s=>s.slug===slug); if(!service)return null; return <Link className="serviceListItem" href={`/services/${service.slug}`} key={service.slug}><div><h3>{service.title}</h3><p>{service.short}</p></div><span aria-hidden="true">↗</span></Link>})}</div>
    </div>)}
  </div></section>

  <section className="section soft"><div className="wrap"><div className="splitHead"><div><span className="kicker">С чего начать</span><h2>Не обязательно знать название услуги.</h2></div><p>Начните с той ситуации, которая актуальна для вашей компании прямо сейчас.</p></div><div className="cardGrid three">
    <Link className="plainCard clickable" href="/calculator"><h3>Не знаю, какие работы нужны</h3><p>Пять вопросов помогут сориентироваться в объёме работ.</p><b>Пройти опрос →</b></Link>
    <Link className="plainCard clickable" href="/resources/git-checklist"><h3>Предстоит проверка ГИТ</h3><p>Проверьте основные блоки охраны труда самостоятельно.</p><b>Скачать чек-лист →</b></Link>
    <Link className="plainCard clickable" href="/solutions/small-business"><h3>Нет отдельного специалиста</h3><p>Посмотрите, какие задачи нужно закрыть малому бизнесу.</p><b>Решение для малого бизнеса →</b></Link>
  </div></div></section>
</main>}
