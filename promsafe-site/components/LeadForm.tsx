'use client';
import {useState} from 'react';

type Props={source?:string; details?:Record<string,string>};
type LeadResponse={ok?:boolean;mode?:'dry_run'|'crm'|'ignored';error?:string};

export default function LeadForm({source='site',details={}}:Props){
  const [status,setStatus]=useState('');
  const [submitting,setSubmitting]=useState(false);
  async function submit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    if(submitting)return;
    setSubmitting(true);setStatus('Отправляем…');
    try{
      const form=e.currentTarget;
      const f=new FormData(form); const body=Object.fromEntries(f.entries());
      const r=await fetch('/api/lead',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...body,source,details})});
      const data=(await r.json().catch(()=>({}))) as LeadResponse;
      if(r.ok&&data.mode==='dry_run'){
        setStatus('Тестовая заявка принята. Staging не отправляет данные в CRM.');
        form.reset();
      }else if(r.ok){
        setStatus('Спасибо. Мы получили заявку.');
        form.reset();
      }else{
        setStatus('Не удалось отправить форму. Позвоните нам: +7 (916) 346–64–69.');
      }
    }catch{
      setStatus('Не удалось отправить форму. Позвоните нам: +7 (916) 346–64–69.');
    }finally{setSubmitting(false)}
  }
  return <form className="leadForm" onSubmit={submit}>
    <div className="formIntro"><span className="kicker">Контакт</span><h3>Получить точный расчёт</h3><p>Достаточно имени и телефона. Компания – по желанию.</p></div>
    <label><span>Имя</span><input name="name" autoComplete="name" required maxLength={120} placeholder="Как к вам обращаться"/></label>
    <label><span>Телефон</span><input name="phone" autoComplete="tel" inputMode="tel" required maxLength={80} placeholder="+7 (___) ___-__-__"/></label>
    <label><span>Компания <i>необязательно</i></span><input name="company" autoComplete="organization" maxLength={180} placeholder="Название компании"/></label>
    <label className="honeypot" aria-hidden="true"><span>Сайт</span><input name="website" tabIndex={-1} autoComplete="off"/></label>
    <button className="primaryButton" type="submit" disabled={submitting}>{submitting?'Отправляем…':'Отправить'}</button>
    {status&&<small className="formStatus" aria-live="polite">{status}</small>}
    <small className="policyNote">Форма предназначена для обратной связи. Перед публичным запуском необходимо подключить утверждённые документы по обработке персональных данных.</small>
  </form>;
}
