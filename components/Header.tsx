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
  useEffect(()=>{
    if(!open)return;
    const closeOnEscape=(e:KeyboardEvent)=>{if(e.key==='Escape')setOpen(false)};
    window.addEventListener('keydown',closeOnEscape);
    return ()=>window.removeEventListener('keydown',closeOnEscape);
  },[open]);
  return <>
    <div className="emergencyBar"><div className="wrap emergencyInner"><span>Консультации по охране труда · Москва и Московская область</span><a href="tel:+79163466469">+7 (916) 346–64–69</a></div></div>
    <header className="siteHeader"><div className="wrap navRow">
      <Link className="brand" href="/" aria-label="PromSafe – главная"><span>PromSafe</span><small>Промбезопасность Консалт</small></Link>
      <nav className="desktopNav" aria-label="Основная навигация">{nav.map(([href,label])=><Link key={href} className={path===href||path.startsWith(href+'/')?'active':''} aria-current={path===href?'page':undefined} href={href}>{label}</Link>)}</nav>
      <Link href="/contacts" className={`contactLink ${path==='/contacts'?'active':''}`} aria-current={path==='/contacts'?'page':undefined}>Контакты</Link>
      <button className="menuButton" type="button" aria-label={open?"Закрыть меню":"Открыть меню"} aria-controls="mobile-nav" aria-expanded={open} onClick={()=>setOpen(v=>!v)}><i aria-hidden="true"/><i aria-hidden="true"/><i aria-hidden="true"/></button>
    </div>{open&&<div className="mobileMenu" id="mobile-nav"><nav aria-label="Мобильная навигация" className="wrap">{nav.map(([href,label])=><Link key={href} className={path===href||path.startsWith(href+'/')?'active':''} aria-current={path===href?'page':undefined} href={href}>{label}</Link>)}<Link href="/contacts">Контакты</Link></nav></div>}</header>
  </>;
}
