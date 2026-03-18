'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import AnimatedImage from '@/components/AnimatedImage';
import VideoBackground from '@/components/VideoBackground';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ReviewsCarousel } from '@/components/ReviewsCarousel';
import {
  CheckCircle2,
  Shield,
  Camera,
  FileText,
  Car,
  Search,
  Truck,
  FileCheck,
  Key,
  ChevronLeft,
  ChevronRight,
  Handshake,
  Calendar,
  ThumbsUp,
} from 'lucide-react';
import { ProcessBlock } from '@/components/ProcessBlock';
import { SecurityBlock } from '@/components/SecurityBlock';
import { FaqBlock } from '@/components/FaqBlock';
import { ConsultationBlock } from '@/components/ConsultationBlock';
import ContactsBlock from '@/components/ContactsBlock';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import FadeInSection from '@/components/FadeInSection';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import HeroCostForm from '@/components/HeroCostForm';
import { useLanguage } from '@/contexts/LanguageContext';

interface HomeClientProps {
  cars: any[];
  reviews: any[];
  photoReviews: string[];
}

export default function HomeClient({ cars, reviews, photoReviews }: HomeClientProps) {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const CARS = cars; // Используем данные из Sanity

  // Монтирование для избежания SSR проблем
  useEffect(() => {
    setMounted(true);
  }, []);

  // Refs для каруселей
  const servicesScrollRef = useRef<HTMLDivElement>(null);
  const carsScrollRef = useRef<HTMLDivElement>(null);
  const reviewsScrollRef = useRef<HTMLDivElement>(null);

  // Функция для скролла карусели
  const scroll = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col">
      {/* HERO БЛОК */}
      <section className="relative min-h-[100svh] flex flex-col justify-center pb-6 md:pb-12 text-white overflow-hidden">
        {/* ПЕРЕКЛЮЧАТЕЛЬ: Измените USE_VIDEO на true когда загрузите видео */}
        {(() => {
          const USE_VIDEO = false; // ← Измените на true когда загрузите hero-video.mp4
          const heroImage = '/2.jpg'; // Используем единый фон

          return (
            <div className="absolute inset-0 z-0">
              <VideoBackground
                videoSrc="/videos/hero-video.mp4"
                fallbackImage={heroImage}
                overlayOpacity="light"
                useVideo={USE_VIDEO}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#171A21]/95 via-[#171A21]/50 to-transparent w-full md:w-[75%] pointer-events-none"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#171A21]/40 via-transparent to-transparent pointer-events-none h-1/2 bottom-0 top-auto"></div>
            </div>
          );
        })()}

        <div className="container-custom relative z-10 w-full mt-12 sm:mt-16 lg:mt-20">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-14 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full lg:w-[55%] xl:w-[60%] max-w-3xl"
            >
              <div className="mb-4 xl:mb-5">
                <motion.h1
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[40px] leading-[1.0] sm:text-5xl md:text-[64px] lg:text-[76px] font-heading font-black text-white tracking-tight"
                  dangerouslySetInnerHTML={{ __html: t('hero.title') }}
                />
              </div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                className="mb-8"
              >
                <p
                  className="font-sans text-base sm:text-lg md:text-[20px] lg:text-[22px] font-medium text-zinc-200 leading-[1.3] max-w-2xl border-l-[3px] border-white pl-4 md:pl-5 py-0.5"
                  dangerouslySetInnerHTML={{ __html: t('hero.subtitle') }}
                />
              </motion.div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <Link href="/contacts#form" className="w-[85%] sm:w-auto block">
                  <Button className="w-full sm:w-auto h-[48px] md:h-[52px] px-8 md:px-10 rounded-[30px] bg-white hover:bg-zinc-200 text-black font-[800] text-[12px] md:text-[14px] tracking-widest shadow-lg transition-all flex items-center justify-center gap-2 uppercase">
                    {t('hero.requestButton')}
                    <Handshake className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2.5} />
                  </Button>
                </Link>

                <Link href="/catalog" className="w-[85%] sm:w-auto block">
                  <Button variant="outline" className="w-full sm:w-auto h-[48px] md:h-[52px] px-8 md:px-10 rounded-[30px] bg-[#111318]/50 border-white/40 hover:bg-[#111318]/80 text-white backdrop-blur-md font-[700] text-[12px] md:text-[14px] tracking-widest transition-all flex items-center justify-center uppercase">
                    {t('hero.catalogButton')}
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-full lg:w-[45%] xl:w-[40%] flex justify-center lg:justify-end shrink-0 mb-8 lg:mb-0 mt-10 md:mt-4 lg:mt-0"
            >
              <HeroCostForm />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mt-12 md:mt-16 lg:mt-20 w-full mx-auto md:mx-0">
            {[
              { num: 6, suffix: '+', text: t('hero.years'), icon: Calendar },
              { num: 500, suffix: '+', text: t('hero.cars'), icon: Car },
              { num: 98, suffix: '%', text: t('hero.clients'), icon: ThumbsUp },
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row items-center justify-center gap-4 bg-white/[0.04] backdrop-blur-md border border-t-white/30 border-x-0 border-b-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] rounded-xl md:rounded-[14px] p-5 lg:p-[22px] transition-colors hover:bg-white/[0.08]">
                <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-white/90" strokeWidth={1.5} />
                <div className="flex flex-col justify-center">
                  <div className="text-xl md:text-[24px] lg:text-[28px] font-bold text-white flex items-baseline leading-none mb-0.5">
                    <AnimatedCounter end={stat.num} suffix={stat.suffix} duration={1500} />
                  </div>
                  <div className="text-[9px] md:text-[10px] lg:text-[11px] font-bold text-white/70 uppercase tracking-widest mt-1">
                    {stat.text}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ПОПУЛЯРНЫЕ ПРЕДЛОЖЕНИЯ */}
      <section className="py-6 md:py-16 bg-muted/30" >
        <div className="container-custom">
          <FadeInSection animation="fade-left" duration={700}>
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">{t('catalog.title')}</h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                {t('catalog.subtitle')}
              </p>
            </div>
          </FadeInSection>

          {/* Mobile: carousel with arrows */}
          <div className="md:hidden relative">
            <button
              onClick={() => scroll(carsScrollRef, 'left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/95 backdrop-blur-sm border border-border rounded-full p-2.5 shadow-lg hover:bg-accent active:scale-95 transition-all touch-manipulation"
              aria-label="Предыдущее авто"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button
              onClick={() => scroll(carsScrollRef, 'right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/95 backdrop-blur-sm border border-border rounded-full p-2.5 shadow-lg hover:bg-accent active:scale-95 transition-all touch-manipulation"
              aria-label="Следующее авто"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>

            <div ref={carsScrollRef} className="-mx-4 px-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
              <div className="flex gap-4 pb-4">
                {CARS.slice(0, 6).map((car) => (
                  <Card key={car.id} className="flex-shrink-0 w-[300px] snap-start overflow-hidden shadow-sm active:shadow-md transition-all">
                    <div className="relative">
                      <AnimatedImage
                        src={car.imageUrl}
                        alt={`${car.make} ${car.model}`}
                        fill
                        sizes="300px"
                        className="object-cover"
                        containerClassName="aspect-video"
                      />
                      <Badge className="absolute top-3 right-3 shadow-sm z-10">
                        {car.status === 'available' ? t('catalog.available') : t('catalog.order')}
                      </Badge>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold mb-2 leading-tight">
                        {car.make} {car.model}
                      </h3>
                      <div className="flex gap-2.5 text-sm text-muted-foreground mb-3">
                        <span>{car.year}</span>
                        <span>•</span>
                        <span>{car.mileage.toLocaleString('ru-RU')} км</span>
                      </div>
                      <div className="text-xl font-bold text-primary mb-4">
                        {car.price.toLocaleString('ru-RU')} ₽
                      </div>
                      <Button className="w-full shadow-sm" size="default">{t('catalog.requestButton')}</Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop: grid */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CARS.slice(0, 3).map((car) => (
              <Card key={car.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <AnimatedImage
                    src={car.imageUrl}
                    alt={`${car.make} ${car.model}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    containerClassName="aspect-video"
                  />
                  <Badge className="absolute top-4 right-4 z-10">
                    {car.status === 'available' ? t('catalog.available') : t('catalog.order')}
                  </Badge>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">
                    {car.make} {car.model}
                  </h3>
                  <div className="flex gap-4 text-sm text-muted-foreground mb-4">
                    <span>{car.year}</span>
                    <span>•</span>
                    <span>{car.mileage.toLocaleString('ru-RU')} км</span>
                  </div>
                  <div className="text-2xl font-bold text-primary mb-4">
                    {car.price.toLocaleString('ru-RU')} ₽
                  </div>
                  <Button className="w-full">{t('catalog.requestButton')}</Button>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button size="lg" variant="outline" asChild className="text-base font-medium min-w-[200px]">
              <Link href="/catalog">
                {t('catalog.viewAll')}
                <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </Button>
          </div>
        </div>
      </section>





      {/* КЛИЕНТЫ, КОТОРЫЕ УЖЕ ПОЛУЧИЛИ АВТО / ОТЗЫВЫ КАЧЕСТВА */}
      <ReviewsCarousel photoReviews={photoReviews} reviews={reviews} />

      {/* ПРОЦЕСС (ВМЕСТО ПОЧЕМУ НАС ВЫБИРАЮТ) */}
      <ProcessBlock />

      {/* БЕЗОПАСНОСТЬ СДЕЛКИ */}
      <SecurityBlock />

      {/* FAQ (ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ) */}
      <FaqBlock />

      {/* ФОРМА ЗАЯВКИ (ИНДИВИДУАЛЬНЫЙ ПОДХОД) */}
      <ConsultationBlock />

      {/* КОНТАКТЫ */}
      <ContactsBlock />
    </div >
  );
}
