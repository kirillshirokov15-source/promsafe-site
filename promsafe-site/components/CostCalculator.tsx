'use client';
import {useMemo,useState} from 'react';
import LeadForm from './LeadForm';

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
    <span className="kicker">Предварительный результат</span><h2>Сначала рекомендуем определить точный состав работ.</h2>
    <p>По вашим ответам имеет смысл проверить текущую СУОТ и документы, определить объём работы с профессиональными рисками и выбрать подходящий формат сопровождения.</p>
    <dl>{Object.entries(answers).map(([k,v])=><div key={k}><dt>{questions.find(q=>q.key===k)?.title}</dt><dd>{v}</dd></div>)}</dl>
    <div className="resultNotice"><b>Стоимость определяется после первичного аудита.</b><span>По ответам можно предварительно определить состав работ, но точное предложение формируется после разбора текущего состояния компании.</span></div>
    <LeadForm source="calculator" details={details}/>
    <button className="textButton reset" onClick={reset}>Пройти расчёт заново</button>
   </div>}
 </div>
}
