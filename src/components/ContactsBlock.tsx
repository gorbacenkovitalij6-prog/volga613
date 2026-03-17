'use client';

import { Phone, Mail, MessageCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CONTACTS } from '@/config/contacts';
import FadeInSection from '@/components/FadeInSection';

export default function ContactsBlock() {
  return (
    <section className="py-16 md:py-24 bg-[#0B0F19] text-white">
      <div className="container-custom px-4 max-w-5xl mx-auto">
        
        {/* Заголовок */}
        <FadeInSection animation="fade-up" duration={600}>
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3">Контакты</h2>
            <p className="text-base text-muted-foreground/80">
              Всегда на связи по любому вопросу по автопригону
            </p>
          </div>
        </FadeInSection>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-start mb-12">
          
          {/* Левая колонка - Телефон */}
          <FadeInSection animation="fade-right" duration={600}>
            <div className="bg-[#131824] border-2 border-primary rounded-2xl p-8 flex flex-col justify-center items-center md:items-start shadow-xl shadow-primary/5 min-h-[220px]">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-muted-foreground font-medium mb-1">Позвонить нам</p>
                  <a href={CONTACTS.phoneHref} className="text-2xl md:text-3xl font-extrabold text-white hover:text-primary transition-colors">
                    {CONTACTS.phone}
                  </a>
                </div>
              </div>
              <Button asChild className="w-full md:w-auto px-8 py-6 text-base font-bold rounded-xl mt-2 bg-primary hover:bg-primary/90 text-white">
                <a href={CONTACTS.phoneHref}>
                  <Phone className="w-4 h-4 mr-2" />
                  Позвонить
                </a>
              </Button>
            </div>
          </FadeInSection>

          {/* Правая колонка - Соцсети и Почта */}
          <FadeInSection animation="fade-left" duration={600}>
            <div className="space-y-4">
              <h3 className="text-lg font-bold px-1 hidden md:block text-white">Написать нам</h3>
              
              {/* Email */}
              <a href={CONTACTS.emailHref} className="block group">
                <div className="bg-[#131824] border border-white/10 rounded-xl p-4 flex items-center gap-4 hover:border-blue-500/50 hover:bg-[#1a2130] transition-all">
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 transition-colors">
                    <Mail className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-xs text-muted-foreground font-medium mb-0.5">Email</p>
                    <p className="text-sm md:text-base font-bold text-white group-hover:text-blue-500 transition-colors">
                      {CONTACTS.email}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Ответим в течение часа</p>
                  </div>
                </div>
              </a>

              {/* WhatsApp */}
              <a href={CONTACTS.whatsapp} target="_blank" rel="noopener noreferrer" className="block group">
                <div className="bg-[#131824] border border-white/10 rounded-xl p-4 flex items-center justify-between hover:border-green-500/50 hover:bg-[#1a2130] transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center shrink-0 group-hover:bg-green-500/20 transition-colors">
                      <MessageCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs text-muted-foreground font-medium mb-0.5">Написать в</p>
                      <p className="text-sm md:text-base font-bold text-white group-hover:text-green-500 transition-colors">
                        WhatsApp
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-green-500 transition-colors mr-2" />
                </div>
              </a>

              {/* Telegram */}
              <a href={CONTACTS.telegram} target="_blank" rel="noopener noreferrer" className="block group">
                <div className="bg-[#131824] border border-white/10 rounded-xl p-4 flex items-center justify-between hover:border-blue-500/50 hover:bg-[#1a2130] transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 transition-colors">
                      <Send className="w-5 h-5 text-blue-500" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs text-muted-foreground font-medium mb-0.5">Написать в</p>
                      <p className="text-sm md:text-base font-bold text-white group-hover:text-blue-500 transition-colors">
                        Telegram
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-blue-500 transition-colors mr-2" />
                </div>
              </a>
              
            </div>
          </FadeInSection>

        </div>

        {/* Заявка */}
        <FadeInSection animation="fade-up" duration={600}>
          <div className="text-center pt-8 border-t border-white/10">
            <p className="text-sm text-muted-foreground mb-4">Или оставьте заявку, и мы перезвоним вам</p>
            <Button variant="outline" size="lg" className="px-8 py-6 rounded-xl font-bold border-white/20 text-white hover:bg-white/10 hover:text-white bg-transparent">
              Оставить заявку
            </Button>
          </div>
        </FadeInSection>

      </div>
    </section>
  );
}

// ChevronRight icon component since it wasn't imported from lucide
function ChevronRight(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
