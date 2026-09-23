import Link from 'next/link';
import {solutions} from '@/lib/content';
import {buildMetadata} from '@/lib/seo';

export const metadata=buildMetadata({
  title:'Охрана труда по типу бизнеса – Москва и МО',
  description:'Решения по охране труда для производства, строительства, складов, офисов, торговли и малого бизнеса Москвы и Московской области.',
  path:'/solutions',
});

export default function Page(){return <main><section className="innerHero"><div className="wrap"><span className="kicker">Решения</span><h1>Охрана труда с учётом типа бизнеса.</h1><p className="lead">Начните с типа компании, а затем перейдите к конкретной задаче – сопровождению, документам, рискам или подготовке к проверке.</p></div></section><section className="section white"><div className="wrap cardGrid three">{solutions.map(s=><Link className="serviceCard" href={`/solutions/${s.slug}`} key={s.slug}><h2>{s.title}</h2><p>{s.desc}</p><b>Открыть решение →</b></Link>)}</div></section><section className="section soft"><div className="wrap"><div className="splitHead"><div><span className="kicker">Москва и область</span><h2>Не нашли свой тип компании?</h2></div><p>Начните с общей страницы услуг или предварительной оценки объёма работ – решение зависит не только от отрасли, но и от процессов внутри компании.</p></div><div className="actions"><Link className="primaryButton" href="/services">Все услуги</Link><Link className="secondaryButton" href="/calculator">Оценить объём работ</Link></div></div></section></main>}
