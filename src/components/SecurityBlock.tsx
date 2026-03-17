'use client';

import FadeInSection from '@/components/FadeInSection';
import { Shield, AlertTriangle, TrendingUp, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function SecurityBlock() {
  return (
    <section className="py-16 md:py-24 bg-[#0B0F19] text-white overflow-hidden relative">
      <div className="container-custom relative z-10">
        <FadeInSection animation="fade-up" duration={600}>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 uppercase tracking-wide leading-tight">
              АБСОЛЮТНАЯ ЗАЩИТА ВАШЕЙ<br className="hidden sm:block" />
              <span className="text-blue-500">ПОКУПКИ</span>
            </h2>
            <p className="text-base md:text-lg text-white/60 max-w-3xl mx-auto leading-relaxed">
              Приобретение авто за рубежом всегда связано с определенными опасениями. Наша компания берет всю ответственность на себя, закрепляя это в официальном договоре.
            </p>
          </div>
        </FadeInSection>

        {/* Карточки рисков */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10">
          
          <FadeInSection animation="fade-up" delay={100} duration={600}>
            <div className="bg-[#131824] border border-white/5 rounded-2xl p-8 flex flex-col items-center text-center h-full hover:bg-[#1a2130] transition-colors">
              <div className="w-14 h-14 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6">
                <AlertTriangle className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Технические сюрпризы</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                Риск приобрести автомобиль со скрытыми повреждениями после серьезного ДТП или со скрученным пробегом.
              </p>
            </div>
          </FadeInSection>

          <FadeInSection animation="fade-up" delay={200} duration={600}>
            <div className="bg-[#131824] border border-white/5 rounded-2xl p-8 flex flex-col items-center text-center h-full hover:bg-[#1a2130] transition-colors">
              <div className="w-14 h-14 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Непредвиденные расходы</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                Боязнь того, что итоговая стоимость значительно увеличится из-за скрытых комиссий, пошлин и скачков курса.
              </p>
            </div>
          </FadeInSection>

          <FadeInSection animation="fade-up" delay={300} duration={600}>
            <div className="bg-[#131824] border border-white/5 rounded-2xl p-8 flex flex-col items-center text-center h-full hover:bg-[#1a2130] transition-colors">
              <div className="w-14 h-14 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6">
                <Truck className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Проблемы с доставкой</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                Сложности с международными переводами, задержки на таможне или риск повреждения авто в пути.
              </p>
            </div>
          </FadeInSection>

        </div>

        {/* Зеленая плашка-гарантия */}
        <FadeInSection animation="fade-up" delay={400} duration={600}>
          <div className="bg-gradient-to-r from-emerald-800 to-emerald-700 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-600/50 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-white border border-transparent opacity-0 mix-blend-overlay transition-opacity duration-1000 group-hover:opacity-10 pointer-events-none" />
            
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5 z-10">
              <div className="w-16 h-16 shrink-0 bg-white rounded-full flex items-center justify-center shadow-lg">
                <Shield className="w-8 h-8 text-emerald-700" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2 tracking-wide uppercase">
                  ВАШИ ИНТЕРЕСЫ ПОЛНОСТЬЮ ЗАЩИЩЕНЫ
                </h3>
                <p className="text-emerald-50 text-base md:text-lg opacity-90">
                  Обеспечиваем 100% юридическую чистоту и финансовую безопасность с 2018 года.
                </p>
              </div>
            </div>

            <Button size="lg" className="bg-white text-emerald-800 hover:bg-emerald-50 hover:text-emerald-900 border-none px-8 py-6 text-base font-bold rounded-xl shadow-lg hover:shadow-xl transition-all w-full sm:w-auto z-10">
              Ознакомиться с договором
            </Button>
          </div>
        </FadeInSection>

      </div>
    </section>
  );
}
