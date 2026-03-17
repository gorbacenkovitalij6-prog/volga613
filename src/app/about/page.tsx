'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import AnimatedImage from '@/components/AnimatedImage';
import VideoBackground from '@/components/VideoBackground';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Award, Users, Globe, Target, Heart, ChevronLeft, ChevronRight, Clock, Car, TrendingDown } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import FadeInSection from '@/components/FadeInSection';
import { useLanguage } from '@/contexts/LanguageContext';

const team = [
  {
    name: 'Трошин Артем',
    position: 'Эксперт по подбору авто из Европы',
    description:
      '4 года в сфере автоподбора, более 75 автомобилей, подобранных и доставленных клиентам под ключ.',
    image: '/team/ArtemTroshin.jpg'
  },
  {
    name: 'Сорокина Мария',
    position: 'Менеджер по работе с клиентами',
    description:
      '5 лет помогаю клиентам безопасно покупать авто. Более 83 машин, подобранных и доставленных "под ключ" с полным контролем на каждом этапе.',
    image: '/team/SorokinaMariya.jpg'
  },
  {
    name: 'Степанова Ирина',
    position: 'Менеджер по работе с клиентами',
    description:
      'Организует подбор, доставку и таможенное оформление. 4 года опыта в международных перевозках.',
    image: '/team/IrinaStepanova.jpg'
  },
  {
    name: 'Алексей Бадмашкаев',
    position: 'Эксперт по подбору авто из Европы',
    description:
      '7 лет в сфере премиального автоподбора и более 150 реализованных проектов под ключ. Забочусь о том, чтобы вы получали только действительно достойные автомобили.',
    image: '/team/BadmashkaevAndrey.jpg'
  },
  {
    name: 'Копытин Владимир',
    position: 'Менеджер по работе с клиентами',
    description:
      '3 года строю для клиентов комфортный путь к своему автомобилю. Более 75 авто под ключ, каждый проект — под индивидуальные задачи и запросы.',
    image: '/team/KoputinVladimir.jpg'
  },
];

export default function AboutPage() {
  const { t } = useLanguage();
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const valuesScrollRef = useRef<HTMLDivElement>(null);
  const teamScrollRef = useRef<HTMLDivElement>(null);
  const certsScrollRef = useRef<HTMLDivElement>(null);

  // Детект клиентского рендеринга
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Функция для скролла карусели
  const scroll = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const values = [
    {
      icon: Shield,
      title: t('aboutPage.values.reliability.title'),
      description: t('aboutPage.values.reliability.desc'),
    },
    {
      icon: Award,
      title: t('aboutPage.values.quality.title'),
      description: t('aboutPage.values.quality.desc'),
    },
    {
      icon: Users,
      title: t('aboutPage.values.clientFocus.title'),
      description: t('aboutPage.values.clientFocus.desc'),
    },
    {
      icon: Globe,
      title: t('aboutPage.values.professionalism.title'),
      description: t('aboutPage.values.professionalism.desc'),
    },
    {
      icon: Target,
      title: t('aboutPage.values.efficiency.title'),
      description: t('aboutPage.values.efficiency.desc'),
    },
    {
      icon: Heart,
      title: t('aboutPage.values.honesty.title'),
      description: t('aboutPage.values.honesty.desc'),
    },
  ];

  const partners = [
    t('aboutPage.partners.item1'),
    t('aboutPage.partners.item2'),
    t('aboutPage.partners.item3'),
    t('aboutPage.partners.item4'),
    t('aboutPage.partners.item5'),
    t('aboutPage.partners.item6'),
  ];

  return (
    <div className="flex flex-col">
      <Breadcrumbs items={[{ label: t('nav.about') }]} />

      {/* Hero секция - О компании ООО "Волга-Авто" */}
      <section className="relative bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 dark:from-zinc-950 dark:via-black dark:to-zinc-950 text-white py-8 md:py-24 overflow-hidden">
        {/* ПЕРЕКЛЮЧАТЕЛЬ: Измените USE_VIDEO на true когда загрузите видео */}
        {(() => {
          const USE_VIDEO = false; // ← Видео включено

          return (
            <VideoBackground
              videoSrc="/videos/about-bg.mp4"
              fallbackImage="/images/about_hero_bg.png"
              overlayOpacity="medium"
              useVideo={USE_VIDEO}
            />
          );
        })()}

        <div className="container-custom px-4 relative z-10">
          <FadeInSection animation="zoom-in" duration={700}>
            <div className="max-w-3xl">
              <h1 className="text-2xl leading-[1.2] md:leading-tight md:text-5xl font-bold mb-3 md:mb-6 xl:text-[38px] text-white">{t('aboutPage.title')}</h1>
              <p className="text-sm leading-snug md:leading-normal md:text-xl text-zinc-300 mb-4 md:mb-8">
                {t('aboutPage.subtitle')}
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* О компании - История */}
      <section className="py-6 md:py-24 bg-background">
        <div className="container-custom px-4">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <FadeInSection animation="fade-right" duration={700}>
              <div>
                <h2 className="text-xl leading-tight md:text-4xl font-bold mb-4 md:mb-6">{t('aboutPage.history.title')}</h2>

                {/* МОБАЙЛ: Сворачиваемый текст */}
                <div className="lg:hidden">
                  <div className={`prose max-w-none space-y-3 text-sm text-muted-foreground leading-snug ${!isHistoryExpanded ? 'line-clamp-4' : ''}`}>
                    <p>{t('aboutPage.history.p1')}</p>
                    <p>{t('aboutPage.history.p2')}</p>
                    <p>{t('aboutPage.history.p3')}</p>
                  </div>
                  <button
                    onClick={() => setIsHistoryExpanded(!isHistoryExpanded)}
                    className="text-primary text-sm font-medium mt-2 hover:underline"
                  >
                    {isHistoryExpanded ? 'Свернуть' : 'Читать полностью'}
                  </button>

                  {/* Ключевые факты - бейджи */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="outline" className="text-[10px] px-2 py-1">
                      2019 — основание компании
                    </Badge>
                    <Badge variant="outline" className="text-[10px] px-2 py-1">
                      500+ клиентов
                    </Badge>
                    <Badge variant="outline" className="text-[10px] px-2 py-1">
                      7 стран-партнёров
                    </Badge>
                    <Badge variant="outline" className="text-[10px] px-2 py-1">
                      6+ лет на рынке
                    </Badge>
                  </div>
                </div>

                {/* ДЕСКТОП: Полный текст */}
                <div className="hidden lg:block prose prose-lg max-w-none space-y-4 text-muted-foreground">
                  <p>{t('aboutPage.history.p1')}</p>
                  <p>{t('aboutPage.history.p2')}</p>
                  <p>{t('aboutPage.history.p3')}</p>
                </div>
              </div>
            </FadeInSection>

            {/* МОБАЙЛ: Компактная сетка 2×2 */}
            <FadeInSection animation="fade-left" duration={700} delay={100}>
              <div className="grid grid-cols-2 gap-3 md:gap-6 lg:hidden">
                <Card className="p-3 text-center bg-muted/50 border-border">
                  <div className="text-2xl md:text-4xl font-bold text-primary mb-1">6+</div>
                  <div className="text-[10px] md:text-sm text-muted-foreground leading-tight">{t('aboutPage.stats.years')}</div>
                </Card>
                <Card className="p-3 text-center bg-muted/50 border-border">
                  <div className="text-2xl md:text-4xl font-bold text-primary mb-1">500+</div>
                  <div className="text-[10px] md:text-sm text-muted-foreground leading-tight">{t('aboutPage.stats.clients')}</div>
                </Card>
                <Card className="p-3 text-center bg-muted/50 border-border">
                  <div className="text-2xl md:text-4xl font-bold text-primary mb-1">64%</div>
                  <div className="text-[10px] md:text-sm text-muted-foreground leading-tight">{t('aboutPage.stats.repeat')}</div>
                </Card>
                <Card className="p-3 text-center bg-muted/50 border-border">
                  <div className="text-2xl md:text-4xl font-bold text-primary mb-1">7</div>
                  <div className="text-[10px] md:text-sm text-muted-foreground leading-tight">{t('aboutPage.stats.countries')}</div>
                </Card>
              </div>
            </FadeInSection>

            {/* ДЕСКТОП: Оригинальная сетка */}
            <FadeInSection animation="fade-left" duration={700} delay={100}>
              <div className="hidden lg:grid grid-cols-2 gap-6">
                <Card className="p-4 md:p-6 text-center bg-muted/50 border-border">
                  <div className="text-4xl font-bold text-primary mb-2">6+</div>
                  <div className="text-sm text-muted-foreground">{t('aboutPage.stats.years')}</div>
                </Card>
                <Card className="p-4 md:p-6 text-center bg-muted/50 border-border">
                  <div className="text-4xl font-bold text-primary mb-2">500+</div>
                  <div className="text-sm text-muted-foreground">{t('aboutPage.stats.clients')}</div>
                </Card>
                <Card className="p-4 md:p-6 text-center bg-muted/50 border-border">
                  <div className="text-4xl font-bold text-primary mb-2">64%</div>
                  <div className="text-sm text-muted-foreground">{t('aboutPage.stats.repeat')}</div>
                </Card>
                <Card className="p-4 md:p-6 text-center bg-muted/50 border-border">
                  <div className="text-4xl font-bold text-primary mb-2">7</div>
                  <div className="text-sm text-muted-foreground">{t('aboutPage.stats.countries')}</div>
                </Card>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Миссия и ценности */}
      <section className="py-6 md:py-24 bg-muted/30" suppressHydrationWarning>
        <div className="container-custom px-4" suppressHydrationWarning>
          <div className="text-center mb-6 md:mb-12">
            <h2 className="text-xl leading-tight md:text-4xl font-bold mb-2 md:mb-4">{t('aboutPage.values.title')}</h2>
            <p className="text-sm leading-snug md:text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('aboutPage.values.subtitle')}
            </p>
          </div>

          {/* МОБАЙЛ: Горизонтальный скролл */}
          <div className="relative lg:hidden">
            <button
              onClick={() => scroll(valuesScrollRef, 'left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/95 backdrop-blur-sm border border-border rounded-full p-2 shadow-lg hover:bg-accent active:scale-95 transition-all touch-manipulation"
              aria-label="Предыдущая ценность"
            >
              <ChevronLeft className="w-4 h-4 text-foreground" />
            </button>
            <button
              onClick={() => scroll(valuesScrollRef, 'right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/95 backdrop-blur-sm border border-border rounded-full p-2 shadow-lg hover:bg-accent active:scale-95 transition-all touch-manipulation"
              aria-label="Следующая ценность"
            >
              <ChevronRight className="w-4 h-4 text-foreground" />
            </button>

            <div ref={valuesScrollRef} className="-mx-4 px-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
              <div className="flex gap-3 pb-4">
                {values.map((value, index) => (
                  <Card key={`mobile-value-${index}`} className="flex-shrink-0 w-[260px] snap-start p-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-3">
                      <value.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-base font-bold mb-2 leading-tight">{value.title}</h3>
                    <p className="text-sm text-muted-foreground leading-snug line-clamp-3">{value.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* ДЕСКТОП: Оригинальная сетка */}
          <div className="hidden lg:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <Card key={`desktop-value-${index}`} className="p-4 md:p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Команда */}
      <section className="py-6 md:py-24 bg-background" suppressHydrationWarning>
        <div className="container-custom px-4" suppressHydrationWarning>
          <div className="text-center mb-6 md:mb-12">
            <h2 className="text-xl leading-tight md:text-4xl font-bold mb-2 md:mb-4">{t('aboutPage.team.title')}</h2>
            <p className="text-sm leading-snug md:text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('aboutPage.team.subtitle')}
            </p>
          </div>

          {/* МОБАЙЛ: Карусель с одной карточкой в центре */}
          <div className="relative lg:hidden">
            <button
              onClick={() => scroll(teamScrollRef, 'left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/95 backdrop-blur-sm border border-border rounded-full p-2.5 shadow-lg hover:bg-accent active:scale-95 transition-all touch-manipulation"
              aria-label="Предыдущий менеджер"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button
              onClick={() => scroll(teamScrollRef, 'right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/95 backdrop-blur-sm border border-border rounded-full p-2.5 shadow-lg hover:bg-accent active:scale-95 transition-all touch-manipulation"
              aria-label="Следующий менеджер"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>

            <div ref={teamScrollRef} className="-mx-4 px-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
              <div className="flex gap-4 pb-4">
                {team.map((member, index) => {
                  // Извлекаем ключевые факты из описания
                  const yearsMatch = member.description.match(/(\d+)\s*(год|года|лет)/i);
                  const carsMatch = member.description.match(/(\d+)\+?\s*(автомобил|машин|авто)/i);
                  const years = yearsMatch ? yearsMatch[1] : null;
                  const cars = carsMatch ? carsMatch[1] : null;

                  return (
                    <Card key={`mobile-team-${index}`} className="flex-shrink-0 w-[320px] snap-start overflow-hidden bg-muted/20 border-border p-5">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 shrink-0 rounded-full bg-primary/10 overflow-hidden text-primary flex items-center justify-center text-xl font-bold border border-primary/20">
                          {member.image ? (
                            <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                          ) : (
                            member.name.charAt(0)
                          )}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold leading-tight">{member.name}</h3>
                          <div className="text-primary text-sm font-semibold">{member.position}</div>
                        </div>
                      </div>

                      {/* Бейджи с ключевыми фактами */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {years && (
                          <Badge variant="outline" className="text-[10px] px-2 py-0.5">
                            {years} {years === '1' ? 'год' : Number(years) < 5 ? 'года' : 'лет'} опыта
                          </Badge>
                        )}
                        {cars && (
                          <Badge variant="outline" className="text-[10px] px-2 py-0.5">
                            {cars}+ авто
                          </Badge>
                        )}
                      </div>

                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-4">{member.description}</p>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ДЕСКТОП: Компактная сетка 5 колонок без фото */}
          <div className="hidden lg:grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {team.map((member, index) => {
              return (
                <Card key={`desktop-team-${index}`} className="overflow-hidden bg-muted/20 border-border p-5 flex flex-col h-full hover:border-primary/30 transition-colors">
                  <div className="w-24 h-24 rounded-full bg-primary/10 overflow-hidden text-primary flex items-center justify-center text-3xl font-bold mb-5 lg:mx-auto border-2 border-primary/20 shadow-sm">
                    {member.image ? (
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      member.name.charAt(0)
                    )}
                  </div>
                  <div className="flex-1 lg:text-center text-left">
                    <h3 className="text-base font-bold mb-2 leading-tight">{member.name}</h3>
                    <div className="text-primary text-xs font-semibold mb-3">{member.position}</div>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-5">{member.description}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Сертификаты и награды */}
      <section className="py-6 md:py-24 bg-muted/30" suppressHydrationWarning>
        <div className="container-custom px-4" suppressHydrationWarning>
          <div className="text-center mb-6 md:mb-12">
            <h2 className="text-xl leading-tight md:text-4xl font-bold mb-2 md:mb-4">{t('aboutPage.certificates.title')}</h2>
            <p className="text-sm leading-snug md:text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('aboutPage.certificates.subtitle')}
            </p>
          </div>

          {/* МОБАЙЛ: Горизонтальный слайдер */}
          <div className="relative mb-6 lg:hidden">
            <button
              onClick={() => scroll(certsScrollRef, 'left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/95 backdrop-blur-sm border border-border rounded-full p-2 shadow-lg hover:bg-accent active:scale-95 transition-all touch-manipulation"
              aria-label="Предыдущий сертификат"
            >
              <ChevronLeft className="w-4 h-4 text-foreground" />
            </button>
            <button
              onClick={() => scroll(certsScrollRef, 'right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/95 backdrop-blur-sm border border-border rounded-full p-2 shadow-lg hover:bg-accent active:scale-95 transition-all touch-manipulation"
              aria-label="Следующий сертификат"
            >
              <ChevronRight className="w-4 h-4 text-foreground" />
            </button>

            <div ref={certsScrollRef} className="-mx-4 px-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
              <div className="flex gap-3 pb-4">
                {[
                  {
                    title: t('aboutPage.certificates.fts.title'),
                    description: t('aboutPage.certificates.fts.desc'),
                    year: '2020',
                  },
                  {
                    title: t('aboutPage.certificates.iso.title'),
                    description: t('aboutPage.certificates.iso.desc'),
                    year: '2020',
                  },
                  {
                    title: t('aboutPage.certificates.best.title'),
                    description: t('aboutPage.certificates.best.desc'),
                    year: '2023',
                  },
                  {
                    title: t('aboutPage.certificates.partner.title'),
                    description: t('aboutPage.certificates.partner.desc'),
                    year: '2022',
                  },
                ].map((cert, index) => (
                  <Card key={index} className="flex-shrink-0 w-[240px] snap-start p-4 text-center">
                    <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                      <Award className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-sm font-bold mb-2 leading-tight">{cert.title}</h3>
                    <p className="text-xs text-muted-foreground mb-2 leading-snug line-clamp-2">{cert.description}</p>
                    <Badge variant="secondary" className="text-[10px] px-2 py-0.5">
                      с {cert.year} года
                    </Badge>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* ДЕСКТОП: Оригинальная сетка */}
          <div className="hidden lg:grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                title: t('aboutPage.certificates.fts.title'),
                description: t('aboutPage.certificates.fts.desc'),
                year: '2020',
              },
              {
                title: t('aboutPage.certificates.iso.title'),
                description: t('aboutPage.certificates.iso.desc'),
                year: '2020',
              },
              {
                title: t('aboutPage.certificates.best.title'),
                description: t('aboutPage.certificates.best.desc'),
                year: '2023',
              },
              {
                title: t('aboutPage.certificates.partner.title'),
                description: t('aboutPage.certificates.partner.desc'),
                year: '2022',
              },
            ].map((cert, index) => (
              <Card key={index} className="p-4 md:p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                  <Award className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">{cert.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{cert.description}</p>
                <div className="text-xs text-primary font-semibold">{t('aboutPage.certificates.since')} {cert.year} {t('aboutPage.certificates.year')}</div>
              </Card>
            ))}
          </div>

          {/* МОБАЙЛ: Компактная сетка 3 столбца */}
          <div className="grid grid-cols-3 gap-2 lg:hidden">
            <Card className="p-3 text-center">
              <div className="text-2xl font-bold text-primary mb-1">100%</div>
              <p className="text-[10px] text-muted-foreground leading-tight">{t('aboutPage.certificates.legal')}</p>
            </Card>
            <Card className="p-3 text-center">
              <div className="text-2xl font-bold text-primary mb-1">24/7</div>
              <p className="text-[10px] text-muted-foreground leading-tight">{t('aboutPage.certificates.support')}</p>
            </Card>
            <Card className="p-3 text-center">
              <div className="text-2xl font-bold text-primary mb-1">0</div>
              <p className="text-[10px] text-muted-foreground leading-tight">{t('aboutPage.certificates.issues')}</p>
            </Card>
          </div>

          {/* ДЕСКТОП: Оригинальная сетка */}
          <div className="hidden lg:grid md:grid-cols-3 gap-6">
            <Card className="p-4 md:p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <p className="text-sm text-muted-foreground">{t('aboutPage.certificates.legal')}</p>
            </Card>
            <Card className="p-4 md:p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <p className="text-sm text-muted-foreground">{t('aboutPage.certificates.support')}</p>
            </Card>
            <Card className="p-4 md:p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">0</div>
              <p className="text-sm text-muted-foreground">{t('aboutPage.certificates.issues')}</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Партнеры */}
      <section className="py-6 md:py-24 bg-background">
        <div className="container-custom px-4">
          <div className="text-center mb-6 md:mb-12">
            <h2 className="text-xl leading-tight md:text-4xl font-bold mb-2 md:mb-4">{t('aboutPage.partners.title')}</h2>
            <p className="text-sm leading-snug md:text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('aboutPage.partners.subtitle')}
            </p>
          </div>

          {/* МОБАЙЛ: Компактная сетка 2 столбца */}
          <div className="grid grid-cols-2 gap-2 lg:hidden">
            {partners.map((partner, index) => (
              <Card key={index} className="p-3 text-center">
                <p className="text-xs font-semibold leading-tight">{partner}</p>
              </Card>
            ))}
          </div>

          {/* ДЕСКТОП: Оригинальная сетка */}
          <div className="hidden lg:grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {partners.map((partner, index) => (
              <Card key={index} className="p-4 md:p-6 text-center">
                <p className="font-semibold">{partner}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-6 md:py-24 bg-muted/30">
        <div className="container-custom px-4">
          <Card className="p-5 md:p-8 md:p-12 text-center bg-gradient-to-br from-primary/5 to-primary/10">
            {/* МОБАЙЛ: Бейджи преимуществ */}
            <div className="lg:hidden flex flex-wrap justify-center gap-2 mb-4">
              <Badge variant="outline" className="text-[10px] px-2 py-1 gap-1">
                <Clock className="w-3 h-3" />
                6+ лет опыта
              </Badge>
              <Badge variant="outline" className="text-[10px] px-2 py-1 gap-1">
                <Car className="w-3 h-3" />
                500+ довольных клиентов
              </Badge>
              <Badge variant="outline" className="text-[10px] px-2 py-1 gap-1">
                <Globe className="w-3 h-3" />
                7 стран-партнёров
              </Badge>
            </div>

            <h2 className="text-xl leading-tight md:text-4xl font-bold mb-3 md:mb-4">
              {t('aboutPage.cta.title')}
            </h2>
            <p className="text-sm leading-snug md:text-lg text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto">
              {t('aboutPage.cta.subtitle')}
            </p>
            <Button size="lg" asChild className="w-full md:w-auto">
              <Link href="/contacts#form">{t('aboutPage.cta.button')}</Link>
            </Button>
          </Card>
        </div>
      </section>
    </div>
  );
}
