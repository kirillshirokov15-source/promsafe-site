import Link from 'next/link';
import {articles} from '@/lib/content';
import {buildMetadata} from '@/lib/seo';

export const metadata=buildMetadata({
  title:'База знаний по охране труда для работодателей',
  description:'Практические статьи об охране труда для работодателей: документы, проверки ГИТ, профессиональные риски, специалист и организация охраны труда в малом бизнесе.',
  path:'/knowledge',
});
const featured=articles.find(a=>a.slug==='ohrana-truda-dlya-malogo-biznesa')!;
const other=articles.filter(a=>a.slug!==featured.slug);

export default function Page(){return <main id="main-content">
  <section className="innerHero"><div className="wrap"><span className="kicker">База знаний PromSafe</span><h1>Практические материалы по охране труда.</h1><p className="lead">Ответы на вопросы работодателей о документах, проверках, рисках, обучении и организации охраны труда. Без обязательной заявки.</p></div></section>
  <section className="section white"><div className="wrap">
    <Link href={`/knowledge/${featured.slug}`} className="articleFeatured"><div><span className="kicker">С чего начать</span><h2>{featured.title}</h2><p>{featured.desc}</p><strong>Читать материал ↗</strong></div><div className="articleFeaturedVisual" aria-hidden="true"><span>01</span><b>Охрана труда начинается с понимания процессов</b></div></Link>
    <div className="knowledgeListHeader"><span className="kicker">Все статьи</span><h2>Разборы и инструкции для работодателей</h2></div>
    <div className="knowledgeGrid">{other.map(a=><Link className="knowledgeItem" href={`/knowledge/${a.slug}`} key={a.slug}><span className="kicker">Статья</span><h3>{a.title}</h3><p>{a.desc}</p><b>Читать →</b></Link>)}</div>
  </div></section>
  <section className="section soft"><div className="wrap"><div className="splitHead"><div><span className="kicker">Бесплатный материал</span><h2>Начните с самостоятельной проверки.</h2></div><p>Чек-лист ГИТ можно скачать без регистрации. Он поможет увидеть основные вопросы, которые стоит проверить в компании.</p></div><Link className="primaryButton" href="/resources/git-checklist">Открыть чек-лист подготовки к ГИТ</Link></div></section>
</main>}
