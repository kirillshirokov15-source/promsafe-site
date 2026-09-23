import CostCalculator from '@/components/CostCalculator';
import {buildMetadata} from '@/lib/seo';

export const metadata=buildMetadata({
  title:'Калькулятор объёма работ по охране труда',
  description:'Ответьте на 5 вопросов о компании и получите предварительную оценку состава работ по охране труда без обязательной заявки.',
  path:'/calculator',
});

export default function Page(){return <main><section className="innerHero compact"><div className="wrap"><span className="kicker">Интерактив</span><h1>Предварительная оценка объёма работ по охране труда.</h1><p className="lead">Пять вопросов о компании и текущей ситуации. Сначала показываем результат – контакт нужен только для точного расчёта.</p></div></section><section className="section white"><div className="wrap calculatorWrap"><CostCalculator/></div></section></main>}
