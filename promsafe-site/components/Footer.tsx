import Link from 'next/link';
import CompanyLogo from '@/components/CompanyLogo';

export default function Footer(){return <footer className="siteFooter"><div className="wrap footerGrid">
  <div><CompanyLogo variant="footer"/><p>Охрана труда для бизнеса Москвы и Московской области – сопровождение, проверки, риски и сложные ситуации.</p></div>
  <div><b>Основные услуги</b><Link href="/services/outsourcing-ohrany-truda">Аутсорсинг охраны труда</Link><Link href="/services/proverka-git">Подготовка к проверке ГИТ</Link><Link href="/services/professional-risks">Профессиональные риски</Link><Link href="/services/documents">Документы по охране труда</Link></div>
  <div><b>Полезное</b><Link href="/solutions/small-business">Охрана труда для малого бизнеса</Link><Link href="/solutions/production">Для производства</Link><Link href="/knowledge">База знаний</Link><Link href="/resources/git-checklist">Чек-лист ГИТ</Link></div>
  <div><b>Контакты</b><a href="tel:+79163466469">+7 (916) 346–64–69</a><a href="tel:+79100001485">+7 (910) 000–14–85</a><a href="mailto:info@promsafe.ru">info@promsafe.ru</a><span>Москва, ул. Медиков, д. 22, к. 1, кв. 25</span><Link href="/about">О компании</Link></div>
</div></footer>}
