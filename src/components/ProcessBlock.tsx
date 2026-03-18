'use client';

import * as React from 'react';
import { CheckCircle2, ShieldCheck, Globe, Cog, Clock } from 'lucide-react';
import FadeInSection from '@/components/FadeInSection';

export function ProcessBlock() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container-custom px-4 max-w-6xl mx-auto">
        {/* Заголовок секции */}
        <FadeInSection animation="fade-up" duration={700}>
          <div className="text-center mb-12 md:mb-16">
            <div className="text-blue-600 font-bold tracking-widest text-xs md:text-sm uppercase mb-3">
              ПРОЦЕСС
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-tight text-foreground">
              ВЫБИРАЕТЕ АВТО - <span className="text-blue-600">ОСТАЛЬНОЕ БЕРЕМ НА СЕБЯ</span>
            </h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto mt-6 rounded-full" />
          </div>
        </FadeInSection>

        {/* Сетка карточек */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Карточка 1: Юридическая чистота (текст слева, картинка справа) */}
          <FadeInSection animation="fade-right" duration={600} delay={100}>
            <div className="bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col sm:flex-row h-full">
              <div className="p-6 md:p-8 flex flex-col justify-center sm:w-1/2 z-10 bg-card">
                <div className="flex items-center gap-3 mb-4">
                  <ShieldCheck className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wide text-foreground">
                    ПОЛНАЯ ЮРИДИЧЕСКАЯ<br />ЧИСТОТА
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  Гарантируем легальный ввоз и правильное таможенное оформление. Строго по закону — никаких скрытых рисков для клиента.
                </p>
                <div className="bg-muted/50 rounded-xl p-4 border border-border">
                  <div className="text-xs font-bold text-foreground mb-2 uppercase">Именно тот автомобиль</div>
                  <p className="text-xs text-muted-foreground">
                    В договоре фиксируются все нюансы: пробег, комплектация, год выпуска. Вы получите ровно ту машину, которую заказали.
                  </p>
                </div>
              </div>
              <div className="sm:w-1/2 min-h-[200px] sm:min-h-full relative overflow-hidden">
                <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-card to-transparent z-10 hidden sm:block" />
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-card to-transparent z-10 sm:hidden block" />
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800" 
                  alt="Бизнесмен с документами" 
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>
            </div>
          </FadeInSection>

          {/* Карточка 2: Надежные авто (картинка слева, текст справа) */}
          <FadeInSection animation="fade-left" duration={600} delay={200}>
            <div className="bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col sm:flex-row h-full">
              <div className="sm:w-1/2 min-h-[200px] sm:min-h-full relative order-2 sm:order-1 overflow-hidden">
                <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-card to-transparent z-10 hidden sm:block" />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-card to-transparent z-10 sm:hidden block" />
                <img 
                  src="/vw-car.jpg" 
                  alt="Надежные авто из Европы" 
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-center sm:w-1/2 z-10 order-1 sm:order-2 bg-card">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle2 className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wide text-foreground">
                    НАДЁЖНЫЕ АВТО ИЗ<br />ЕВРОПЫ
                  </h3>
                </div>
                  <p className="text-muted-foreground leading-relaxed sm:text-lg">
                    Отбираем только безупречные варианты, опираясь на экспертный многолетний опыт подбора.
                  </p>
              </div>
            </div>
          </FadeInSection>

          {/* Карточка 3: Комплексное сопровождение (текст слева, картинка справа) */}
          <FadeInSection animation="fade-right" duration={600} delay={300}>
            <div className="bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col sm:flex-row h-full">
              <div className="p-6 md:p-8 flex flex-col justify-center sm:w-1/2 z-10 bg-card">
                <div className="flex items-center gap-3 mb-6">
                  <Globe className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wide text-foreground">
                    КОМПЛЕКСНОЕ<br />СОПРОВОЖДЕНИЕ:
                  </h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                    <span className="text-sm text-muted-foreground">Подбор, юридическая проверка, выкуп и безопасная логистика до вашего города.</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                    <span className="text-sm text-muted-foreground">Детальная компьютерная и визуальная диагностика технического состояния.</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                    <span className="text-sm text-muted-foreground">Персональный менеджер на всех этапах сделки, включая помощь в постановке на учет.</span>
                  </li>
                </ul>
              </div>
              <div className="sm:w-1/2 min-h-[250px] sm:min-h-full relative overflow-hidden bg-muted">
                <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-card to-transparent z-10 hidden sm:block" />
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-card to-transparent z-10 sm:hidden block" />
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" 
                  alt="Персональный менеджер" 
                  className="absolute inset-0 w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-700 opacity-80 hover:opacity-100"
                  loading="lazy"
                />
              </div>
            </div>
          </FadeInSection>

          {/* Карточка 4: От вас потребуется (картинка слева, текст справа) */}
          <FadeInSection animation="fade-left" duration={600} delay={400}>
            <div className="bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col sm:flex-row h-full">
              <div className="sm:w-1/2 min-h-[200px] sm:min-h-full relative order-2 sm:order-1 overflow-hidden">
                <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-card to-transparent z-10 hidden sm:block" />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-card to-transparent z-10 sm:hidden block" />
                <img 
                  src="/woman-keys.png" 
                  alt="Девушка с ключами от новой машины" 
                  className="absolute inset-0 w-full h-full object-cover object-left"
                  loading="lazy"
                />
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-center sm:w-1/2 z-10 order-1 sm:order-2 bg-card">
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wide text-foreground">
                    ОТ ВАС ПОТРЕБУЕТСЯ<br />ТОЛЬКО:
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="bg-muted/50 border border-border rounded-lg px-4 py-3 flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                    <span className="text-sm font-medium text-foreground">Поделиться пожеланиями к авто</span>
                  </div>
                  <div className="bg-muted/50 border border-border rounded-lg px-4 py-3 flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                    <span className="text-sm font-medium text-foreground">Утвердить подобранные варианты</span>
                  </div>
                  <div className="bg-muted/50 border border-border rounded-lg px-4 py-3 flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                    <span className="text-sm font-medium text-foreground">Принять ключи от готовой машины</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeInSection>

        </div>
      </div>
    </section>
  );
}
