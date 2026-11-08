'use client';
import {useState} from 'react';

type Props={source?:string; details?:Record<string,string>};
type LeadResponse={ok?:boolean;mode?:'dry_run'|'crm'|'ignored';error?:string};

/**
 * Do not collect personal data on a public website until the owner supplies an
 * approved privacy-policy URL and explicitly enables the form in configuration.
 */
const enabled=process.env.NEXT_PUBLIC_LEAD_FORM_ENABLED==='true' &&
  Boolean(process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL) &&
  process.env.NEXT_PUBLIC_LEAD_BACKEND_READY==='true';
const policy=process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL||'';

export default function LeadForm({source='site',details={}}:Props){
  const [status,setStatus]=useState('');
  const [submitting,setSubmitting]=useState(false);

  async function submit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    if(submitting||!enabled)return;
    setSubmitting(true);setStatus('Отправляем…');
    try{
      const form=e.currentTarget;
      const f=new FormData(form);
      const body=Object.fromEntries(f.entries());
      const r=await fetch('/api/lead',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...body,source,details})});
      const data=(await r.json().catch(()=>({}))) as LeadResponse;
      if(r.ok&&data.mode==='dry_run'){
        setStatus('Это тестовый режим: заявка не отправлена. Для связи позвоните нам по номеру +7 (916) 346-64-69.');
      }else if(r.ok&&data.mode==='crm'){
        setStatus('Спасибо. Заявка отправлена.');
        form.reset();
      }else{
        setStatus('Не удалось отправить заявку. Пожалуйста, позвоните нам: +7 (916) 346-64-69.');
      }
    }catch{
      setStatus('Нет соединения с сервером. Пожалуйста, позвоните: +7 (916) 346-64-69.');
    }finally{setSubmitting(false)}
  }

  if(!enabled)return <div className="leadForm contactAlternative">
    <div className="formIntro"><span className="kicker">Обратная связь</span><h3>Обсудить вашу задачу</h3>
      <p>Форма заявки будет доступна после подключения системы обработки обращений. Сейчас можно связаться с нами напрямую.</p>
    </div>
    <a className="primaryButton" href="tel:+79163466469">Позвонить</a>
    <a className="secondaryButton" href="mailto:info@promsafe.ru?subject=Запрос%20по%20охране%20труда">Написать на почту</a>
  </div>;

  return <form className="leadForm" onSubmit={submit}>
    <div className="formIntro"><span className="kicker">Контакт</span><h3>Обсудить задачу</h3><p>Оставьте имя и телефон – свяжемся с вами для уточнения деталей.</p></div>
    <label><span>Имя</span><input name="name" autoComplete="name" required maxLength={120} placeholder="Как к вам обращаться"/></label>
    <label><span>Телефон</span><input name="phone" autoComplete="tel" inputMode="tel" required maxLength={80} placeholder="+7 (___) ___-__-__"/></label>
    <label><span>Компания <i>необязательно</i></span><input name="company" autoComplete="organization" maxLength={180} placeholder="Название компании"/></label>
    <label className="honeypot" aria-hidden="true"><span>Сайт</span><input name="website" tabIndex={-1} autoComplete="off"/></label>
    <label className="privacyCheck"><input type="checkbox" name="consent" value="yes" required/><span>Согласен на обработку персональных данных в соответствии с <a href={policy} target="_blank" rel="noreferrer">политикой конфиденциальности</a>.</span></label>
    <button className="primaryButton" type="submit" disabled={submitting}>{submitting?'Отправляем…':'Отправить заявку'}</button>
    {status&&<small className="formStatus" role="status" aria-live="polite">{status}</small>}
  </form>;
}
