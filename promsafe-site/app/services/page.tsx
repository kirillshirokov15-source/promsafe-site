import Link from 'next/link';
import {services} from '@/lib/content';
import {buildMetadata} from '@/lib/seo';

export const metadata=buildMetadata({
  title:'Услуги по охране труда в Москве и МО',
  description:'Услуги по охране труда для бизнеса: аутсорсинг, СУОТ, профессиональные риски, подготовка к ГИТ, документы, обучение и консультации.',
  path:'/services',
});

export default function Page(){return <main>
  <section className="innerHero"><div className="wrap"><span className="kicker">Услуги</span><h1>Услуги по охране труда для компаний Москвы и Московской области.</h1><p className="lead">Можно передать охрану труда на сопровождение или подключить PromSafe к отдельной задаче – документам, рискам, проверке или сложной ситуации.</p></div></section>
  <section className="section white"><div className="wrap cardGrid three">{services.map(s=><Link className="serviceCard" href={`/services/${s.slug}`} key={s.slug}><h2>{s.title}</h2><p>{s.short}</p><b>Подробнее →</b></Link>)}</div></section>
  <section className="section soft"><div className="wrap"><div className="splitHead"><div><span className="kicker">Не знаете, с чего начать?</span><h2>Выберите ситуацию, а не название услуги.</h2></div><p>Для раннего этапа можно использовать калькулятор объёма работ или бесплатные материалы.</p></div><div className="cardGrid three"><Link className="plainCard clickable" href="/calculator"><h3>Оценить объём работ</h3><b>Калькулятор →</b></Link><Link className="plainCard clickable" href="/resources/git-checklist"><h3>Предстоит проверка ГИТ</h3><b>Скачать чек-лист →</b></Link><Link className="plainCard clickable" href="/solutions/small-business"><h3>Нет отдельного специалиста</h3><b>Решение для малого бизнеса →</b></Link></div></div></section>
</main>}
