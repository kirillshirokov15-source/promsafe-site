import Link from 'next/link';
import type {Metadata} from 'next';

export const metadata:Metadata={title:'Страница не найдена | PromSafe',robots:{index:false,follow:false}};

export default function NotFound(){return <main id="main-content">
  <section className="section white"><div className="wrap">
    <span className="kicker">Ошибка 404</span>
    <h1>Такой страницы нет.</h1>
    <p className="lead">Возможно, ссылка устарела. Вы можете перейти в каталог услуг или на главную страницу.</p>
    <div className="actions"><Link className="primaryButton" href="/services">Смотреть услуги</Link>
    <Link className="secondaryButton" href="/">На главную</Link></div>
  </div></section>
</main>}
