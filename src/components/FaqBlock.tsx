'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import FadeInSection from '@/components/FadeInSection';
import { Plus } from 'lucide-react';

const faqs = [
  {
    question: "Из чего формируется стоимость автомобиля?",
    answer: "Итоговая стоимость под ключ включает в себя цену автомобиля за границей, расходы на логистику, таможенные сборы, утилизационный сбор и нашу комиссию за подбор и сопровождение. Мы предоставляем полностью прозрачный расчет до подписания договора."
  },
  {
    question: "Работаете ли вы с регионами?",
    answer: "Да, мы доставляем автомобили по всей территории РФ. Вы можете получить авто в нашем автосалоне или заказать адресную доставку автовозом в ваш город."
  },
  {
    question: "Какие марки автомобилей вы привозите из Европы?",
    answer: "Мы специализируемся на доставке автомобилей любых марок — от популярных европейских брендов (Volkswagen, BMW, Mercedes-Benz, Audi, Skoda) до более редких экземпляров. Главный критерий — ваше пожелание и прохождение автомобилем нашей строгой технической проверки."
  },
  {
    question: "Какие гарантии доставки и как страхуется автомобиль на время транспортировки?",
    answer: "Каждый автомобиль, перевозимый нашей компанией, подлежит обязательному страхованию на всю его стоимость (CMR-страхование перевозчика). Все условия и наша материальная ответственность закреплены в официальном договоре."
  },
  {
    question: "Как долго доставляется автомобиль из Европы?",
    answer: "В среднем доставка занимает от 2 до 4 недель с момента покупки автомобиля на европейской площадке, включая время на прохождение таможенной очистки."
  },
  {
    question: "Какие гарантии вы предоставляете?",
    answer: "Мы гарантируем юридическую чистоту автомобиля, полное соответствие заявленному техническому состоянию на этапе подбора, а также прозрачность всех условий. Гарантии фиксируются в договоре."
  },
  {
    question: "Куда можно доставить автомобиль?",
    answer: "Мы осуществляем доставку автомобилей по всей территории РФ. Возможна доставка как до нашего автосалона для выдачи, так и адресная доставка автовозом в ваш город."
  }
];

export function FaqBlock() {
  return (
    <section className="py-16 md:py-24 bg-white text-foreground">
      <div className="container-custom max-w-3xl mx-auto">
        <FadeInSection animation="fade-up" duration={600}>
          <div className="text-center mb-10 flex flex-col items-center">
            <p className="text-blue-600 font-bold text-[10px] md:text-sm tracking-[0.2em] uppercase mb-3">
              Ответы экспертов
            </p>
            <h2 className="text-2xl md:text-4xl font-extrabold uppercase tracking-wide leading-[1.1] max-w-[20rem] md:max-w-none">
              ОТВЕЧАЕМ НА ЧАСТО <br />
              <span className="text-blue-600">ЗАДАВАЕМЫЕ ВОПРОСЫ</span>
            </h2>
          </div>
        </FadeInSection>

        <FadeInSection animation="fade-up" delay={200} duration={600}>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card border border-border rounded-2xl px-6 py-2 shadow-sm transition-all hover:shadow-md data-[state=open]:shadow-md data-[state=open]:border-blue-200"
              >
                <AccordionTrigger className="hover:no-underline py-4 text-left font-bold text-base md:text-xl [&>svg]:hidden flex justify-between items-center gap-4 group">
                  {faq.question}
                  <div className="shrink-0 w-8 h-8 rounded-full border border-border flex items-center justify-center transition-colors group-hover:border-blue-400 group-hover:text-blue-500 group-data-[state=open]:bg-blue-600 group-data-[state=open]:text-white group-data-[state=open]:border-blue-600 group-data-[state=open]:rotate-45">
                    <Plus className="w-4 h-4 transition-transform duration-300" />
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-sm md:text-base pb-6 pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeInSection>
      </div>
    </section>
  );
}
