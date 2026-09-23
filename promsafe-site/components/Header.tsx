'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useEffect,useState} from 'react';

const nav=[
  ['/services','Услуги'],['/solutions','Решения'],['/calculator','Калькулятор'],
  ['/knowledge','База знаний'],['/resources','Документы'],['/about','О компании']
] as const;

export default function Header(){
  const path=usePathname();
  const [open,setOpen]=useState(false);
  useEffect(()=>setOpen(false),[path]);
  return <>
    <div className="emergencyBar"><div className="wrap emergencyInner"><span>Экстренная помощь при несчастном случае</span><a href="tel:+79163466469">+7 (916) 346–64–69</a></div></div>
    <header className="siteHeader"><div className="wrap navRow">
      <Link className="brand" href="/"><span>PromSafe</span><small>Промбезопасность Консалт</small></Link>
      <nav className="desktopNav">{nav.map(([href,label])=><Link key={href} className={path===href||path.startsWith(href+'/')?'active':''} href={href}>{label}</Link>)}</nav>
      <Link href="/contacts" className={`contactLink ${path==='/contacts'?'active':''}`}>Контакты</Link>
      <button className="menuButton" type="button" aria-label="Открыть меню" aria-expanded={open} onClick={()=>setOpen(v=>!v)}><i/><i/><i/></button>
    </div>{open&&<div className="mobileMenu"><div className="wrap">{nav.map(([href,label])=><Link key={href} className={path===href||path.startsWith(href+'/')?'active':''} href={href}>{label}</Link>)}<Link href="/contacts">Контакты</Link></div></div>}</header>
  </>;
}
