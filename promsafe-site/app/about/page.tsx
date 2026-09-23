import Link from 'next/link';
import CompanyLogo from '@/components/CompanyLogo';
import {buildMetadata} from '@/lib/seo';

export const metadata=buildMetadata({title:'О компании PromSafe',description:'ООО «Промбезопасность Консалт»: сведения о компании, команда, опубликованные данные об аккредитации, реквизиты и контакты.',path:'/about'});

export default function Page(){return <main>
  <section className="innerHero"><div className="wrap serviceHero"><div><span className="kicker">О компании</span><h1>ООО «Промбезопасность Консалт».</h1><p className="lead">Компания зарегистрирована 6 июля 2011 года. Основное направление нового сайта – услуги и практические материалы по охране труда для работодателей.</p><div className="actions"><Link className="primaryButton" href="/services">Посмотреть услуги</Link><Link className="secondaryButton" href="/contacts">Контакты</Link></div></div><CompanyLogo className="aboutLogo"/></div></section>

  <section className="section white"><div className="wrap"><div className="splitHead"><div><span className="kicker">Команда</span><h2>Специалисты PromSafe.</h2></div><p>Практическая работа с документацией, проверками, организацией процессов охраны труда и сложными ситуациями.</p></div><div className="teamGrid">
    <article className="teamCard leadPerson"><div className="personInitials">ШМ</div><div><span>Генеральный директор</span><h3>Шамиль Хамзаевич Мансуров</h3><p>Опыт работы более 15 лет. Подключается к сложным и экстренным ситуациям.</p></div></article>
    <article className="teamCard"><div className="personInitials">НМ</div><div><span>Эксперт</span><h3>Наталья Владимировна Мансурова</h3><p>Опыт работы более 7 лет. Специализация – документация и подготовка к взаимодействию с трудовой инспекцией.</p></div></article>
    <article className="teamCard"><div className="personInitials">КШ</div><div><span>Эксперт</span><h3>Константин Николаевич Шепелев</h3><p>Опыт работы более 10 лет. Практическая работа по вопросам охраны труда.</p></div></article>
  </div></div></section>

  <section className="section soft"><div className="wrap"><div className="splitHead"><div><span className="kicker">Документы</span><h2>Сведения об аккредитации.</h2></div><p>На сайте PromSafe указаны аккредитации Ш. Х. Мансурова и Н. В. Мансуровой. Сведения вынесены отдельно, без воспроизведения неподтверждённых сканов.</p></div><div className="cardGrid two"><div className="plainCard"><small>Аккредитация</small><h3>Ш. Х. Мансуров – 2011 год</h3></div><div className="plainCard"><small>Аккредитация</small><h3>Н. В. Мансурова – 2023 год</h3></div></div></div></section>

  <section className="section white"><div className="wrap"><div className="splitHead"><div><span className="kicker">Реквизиты</span><h2>Юридическая информация.</h2></div><p>Реквизиты сверены с открытыми данными и действующим сайтом.</p></div><div className="cardGrid two"><div className="plainCard"><h3>ООО «Промбезопасность Консалт»</h3><p>Дата регистрации: 06.07.2011<br/>ИНН 7724796460<br/>ОГРН 1117746532530</p></div><div className="plainCard"><h3>Контакты</h3><p>Москва, ул. Медиков, д. 22, к. 1, кв. 25<br/>+7 (916) 346–64–69<br/>+7 (910) 000–14–85<br/>info@promsafe.ru</p></div></div></div></section>
</main>}
