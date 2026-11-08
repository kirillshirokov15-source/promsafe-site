'use client';
import {useMemo,useState} from 'react';
import LeadForm from './LeadForm';
import Link from 'next/link';

const questions=[
 {key:'industry',title:'Чем занимается компания?',options:['Офис / услуги','Торговля','Склад / логистика','Строительство','Производство','Другое']},
 {key:'employees',title:'Сколько сотрудников?',options:['До 15','16–50','51–100','101–300','300+']},
 {key:'sites',title:'Сколько объектов или площадок?',options:['1','2–3','4+']},
 {key:'state',title:'Как сейчас организована охрана труда?',options:['Нужно сделать всё с нуля','Есть часть документов','Есть действующая система','Не знаю']},
 {key:'need',title:'Что вам требуется?',options:['Создать систему','Постоянное сопровождение','Подготовиться к проверке','Разовая задача','Не уверен']},
] as const;

export default function CostCalculator(){
 const [step,setStep]=useState(0); const [answers,setAnswers]=useState<Record<string,string>>({});
 const done=step>=questions.length; const current=questions[Math.min(step,questions.length-1)];
 const details=useMemo(()=>answers,[answers]);
 const recommendation=useMemo(()=>{
   const need=answers.need||'';
   const state=answers.state||'';
   if(need.includes('проверке'))return {title:'Начните с проверки готовности к ГИТ',text:'Полезно оценить состояние СУОТ, обучения, обязательных мероприятий и документов, затем составить список корректирующих действий.',href:'/services/proverka-git',label:'Подготовка к проверке ГИТ'};
   if(need.includes('Постоянное'))return {title:'Рассмотрите сопровождение по охране труда',text:'Можно согласовать регулярную работу с документами, мероприятиями, консультациями и подготовкой к проверкам.',href:'/services/outsourcing-ohrany-truda',label:'Аутсорсинг охраны труда'};
   if(need.includes('Создать')||state.includes('с нуля'))return {title:'Начните с организации системы охраны труда',text:'Первым шагом стоит проверить перечень необходимых процессов, определить ответственных и согласовать порядок подготовки документов.',href:'/services/suot',label:'Разработка и внедрение СУОТ'};
   if(need.includes('Разовая'))return {title:'Выделите одну задачу и её границы',text:'Для отдельного вопроса достаточно описать ситуацию и имеющиеся документы: не всегда требуется долгосрочный договор.',href:'/services/consultations',label:'Консультации по охране труда'};
   return {title:'Начните с короткого анализа текущей ситуации',text:'По ответам можно определить приоритеты, оценить документы и понять, какие задачи лучше решить в первую очередь.',href:'/services',label:'Посмотреть услуги'};
 },[answers]);
 function choose(value:string){setAnswers(v=>({...v,[current.key]:value}));setStep(s=>s+1)}
 function back(){setStep(s=>Math.max(0,s-1))}
 function reset(){setAnswers({});setStep(0)}
 return <div className="calculatorCard">
   {!done?<>
    <div className="progressTrack"><span style={{width:`${((step+1)/questions.length)*100}%`}}/></div>
    <span className="kicker">Вопрос {step+1} из {questions.length}</span>
    <h2 className="questionTitle">{current.title}</h2>
    <div className="answerGrid">{current.options.map(o=><button key={o} className={answers[current.key]===o?'answer active':'answer'} onClick={()=>choose(o)}>{o}</button>)}</div>
    <div className="calculatorFoot"><button className="textButton" onClick={back} disabled={step===0}>Назад</button><span>Контактные данные пока не запрашиваются</span></div>
   </>:<div className="calculatorResult">
    <span className="kicker">Предварительный результат</span><h2>{recommendation.title}</h2>
    <p>{recommendation.text}</p><Link className="textLink" href={recommendation.href}>{recommendation.label} →</Link>
    <dl>{Object.entries(answers).map(([k,v])=><div key={k}><dt>{questions.find(q=>q.key===k)?.title}</dt><dd>{v}</dd></div>)}</dl>
    <div className="resultNotice"><b>Стоимость определяется после первичного аудита.</b><span>По ответам можно предварительно определить состав работ, но точное предложение формируется после разбора текущего состояния компании.</span></div>
    <LeadForm source="calculator" details={details}/>
    <button className="textButton reset" onClick={reset}>Пройти расчёт заново</button>
   </div>}
 </div>
}
