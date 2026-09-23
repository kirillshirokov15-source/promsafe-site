import Link from 'next/link';
import {articles} from '@/lib/content';
import {buildMetadata} from '@/lib/seo';

export const metadata=buildMetadata({
  title:'База знаний по охране труда для работодателей',
  description:'Практические материалы по охране труда: проверки ГИТ, профессиональные риски, документы, специалисты и действия при несчастных случаях.',
  path:'/knowledge',
});

export default function Page(){return <main><section className="innerHero"><div className="wrap"><span className="kicker">База знаний</span><h1>Практические материалы по охране труда.</h1><p className="lead">Статьи подготовлены как ответы на конкретные вопросы работодателей и связаны с услугами и бесплатными документами PromSafe.</p></div></section><section className="section white"><div className="wrap materialGrid">{articles.map(a=><Link className="materialCard" href={`/knowledge/${a.slug}`} key={a.slug}><small>Статья</small><h2>{a.title}</h2><p>{a.desc}</p><b>Читать →</b></Link>)}</div></section><section className="section soft"><div className="wrap"><div className="splitHead"><div><span className="kicker">Полезный материал</span><h2>Начните с самостоятельной проверки.</h2></div><p>Чек-лист ГИТ можно скачать без формы и обязательной заявки.</p></div><Link className="primaryButton" href="/resources/git-checklist">Чек-лист подготовки к проверке ГИТ</Link></div></section></main>}
