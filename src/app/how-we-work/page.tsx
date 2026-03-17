'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  PhoneCall,
  Search,
  ClipboardCheck,
  CreditCard,
  Truck,
  FileCheck,
  Key,
  CheckCircle2,
  Clock,
  TrendingDown,
  Shield,
  Quote,
  Car,
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';
import AnimatedImage from '@/components/AnimatedImage';

export default function HowWeWorkPage() {
  const { t } = useLanguage();
  const [activeVariant, setActiveVariant] = useState<1 | 2>(1);
  const [activeCaseTab, setActiveCaseTab] = useState<'specs' | 'timeline' | 'financials'>('specs');

  // Вариант 1: Подбор под заказ
  const stepsVariant1 = [
    {
      number: '01',
      icon: PhoneCall,
      title: t('howWeWorkPage.v1.step1.title'),
      description: t('howWeWorkPage.v1.step1.desc'),
      details: [
        t('howWeWorkPage.v1.step1.detail1'),
        t('howWeWorkPage.v1.step1.detail2'),
        t('howWeWorkPage.v1.step1.detail3'),
        t('howWeWorkPage.v1.step1.detail4'),
      ],
      duration: t('howWeWorkPage.v1.step1.duration'),
    },
    {
      number: '02',
      icon: Search,
      title: t('howWeWorkPage.v1.step2.title'),
      description: t('howWeWorkPage.v1.step2.desc'),
      details: [
        t('howWeWorkPage.v1.step2.detail1'),
        t('howWeWorkPage.v1.step2.detail2'),
        t('howWeWorkPage.v1.step2.detail3'),
        t('howWeWorkPage.v1.step2.detail4'),
      ],
      duration: t('howWeWorkPage.v1.step2.duration'),
    },
    {
      number: '03',
      icon: ClipboardCheck,
      title: t('howWeWorkPage.v1.step3.title'),
      description: t('howWeWorkPage.v1.step3.desc'),
      details: [
        t('howWeWorkPage.v1.step3.detail1'),
        t('howWeWorkPage.v1.step3.detail2'),
        t('howWeWorkPage.v1.step3.detail3'),
        t('howWeWorkPage.v1.step3.detail4'),
      ],
      duration: t('howWeWorkPage.v1.step3.duration'),
    },
    {
      number: '04',
      icon: CreditCard,
      title: t('howWeWorkPage.v1.step4.title'),
      description: t('howWeWorkPage.v1.step4.desc'),
      details: [
        t('howWeWorkPage.v1.step4.detail1'),
        t('howWeWorkPage.v1.step4.detail2'),
        t('howWeWorkPage.v1.step4.detail3'),
        t('howWeWorkPage.v1.step4.detail4'),
      ],
      duration: t('howWeWorkPage.v1.step4.duration'),
    },
    {
      number: '05',
      icon: Key,
      title: t('howWeWorkPage.v1.step5.title'),
      description: t('howWeWorkPage.v1.step5.desc'),
      details: [
        t('howWeWorkPage.v1.step5.detail1'),
        t('howWeWorkPage.v1.step5.detail2'),
        t('howWeWorkPage.v1.step5.detail3'),
        t('howWeWorkPage.v1.step5.detail4'),
      ],
      duration: t('howWeWorkPage.v1.step5.duration'),
    },
  ];

  // Вариант 2: Выкуп из наличия
  const stepsVariant2 = [
    {
      number: '01',
      icon: Search,
      title: t('howWeWorkPage.v2.step1.title'),
      description: t('howWeWorkPage.v2.step1.desc'),
      details: [
        t('howWeWorkPage.v2.step1.detail1'),
        t('howWeWorkPage.v2.step1.detail2'),
        t('howWeWorkPage.v2.step1.detail3'),
        t('howWeWorkPage.v2.step1.detail4'),
      ],
      duration: t('howWeWorkPage.v2.step1.duration'),
    },
    {
      number: '02',
      icon: ClipboardCheck,
      title: t('howWeWorkPage.v2.step2.title'),
      description: t('howWeWorkPage.v2.step2.desc'),
      details: [
        t('howWeWorkPage.v2.step2.detail1'),
        t('howWeWorkPage.v2.step2.detail2'),
        t('howWeWorkPage.v2.step2.detail3'),
        t('howWeWorkPage.v2.step2.detail4'),
      ],
      duration: t('howWeWorkPage.v2.step2.duration'),
    },
    {
      number: '03',
      icon: FileCheck,
      title: t('howWeWorkPage.v2.step3.title'),
      description: t('howWeWorkPage.v2.step3.desc'),
      details: [
        t('howWeWorkPage.v2.step3.detail1'),
        t('howWeWorkPage.v2.step3.detail2'),
        t('howWeWorkPage.v2.step3.detail3'),
        t('howWeWorkPage.v2.step3.detail4'),
      ],
      duration: t('howWeWorkPage.v2.step3.duration'),
    },
    {
      number: '04',
      icon: CreditCard,
      title: t('howWeWorkPage.v2.step4.title'),
      description: t('howWeWorkPage.v2.step4.desc'),
      details: [
        t('howWeWorkPage.v2.step4.detail1'),
        t('howWeWorkPage.v2.step4.detail2'),
        t('howWeWorkPage.v2.step4.detail3'),
        t('howWeWorkPage.v2.step4.detail4'),
      ],
      duration: t('howWeWorkPage.v2.step4.duration'),
    },
    {
      number: '05',
      icon: Truck,
      title: t('howWeWorkPage.v2.step5.title'),
      description: t('howWeWorkPage.v2.step5.desc'),
      details: [
        t('howWeWorkPage.v2.step5.detail1'),
        t('howWeWorkPage.v2.step5.detail2'),
        t('howWeWorkPage.v2.step5.detail3'),
        t('howWeWorkPage.v2.step5.detail4'),
      ],
      duration: t('howWeWorkPage.v2.step5.duration'),
    },
  ];

  const caseStudy = {
    title: t('howWeWorkPage.caseStudy.title'),
    car: 'BMW X5 xDrive 30d',
    client: t('howWeWorkPage.caseStudy.client'),
    details: {
      [t('howWeWorkPage.caseStudy.yearLabel')]: '2020',
      [t('howWeWorkPage.caseStudy.mileageLabel')]: '42 000 км',
      [t('howWeWorkPage.caseStudy.packageLabel')]: 'M Sport Package',
      [t('howWeWorkPage.caseStudy.countryLabel')]: t('howWeWorkPage.caseStudy.countryLabel') === 'Purchase country' ? 'Germany' : 'Германия',
    },
    timeline: {
      [t('howWeWorkPage.caseStudy.selectionLabel')]: t('howWeWorkPage.caseStudy.selectionLabel') === 'Selection and verification' ? '3 days' : '3 дня',
      [t('howWeWorkPage.caseStudy.purchaseLabel')]: t('howWeWorkPage.caseStudy.purchaseLabel') === 'Purchase and registration' ? '1 day' : '1 день',
      [t('howWeWorkPage.caseStudy.deliveryLabel')]: t('howWeWorkPage.caseStudy.deliveryLabel') === 'Delivery and customs' ? '6 days' : '6 дней',
      [t('howWeWorkPage.caseStudy.registrationLabel')]: t('howWeWorkPage.caseStudy.registrationLabel') === 'Registration' ? '2 days' : '2 дня',
      [t('howWeWorkPage.caseStudy.totalLabel')]: t('howWeWorkPage.caseStudy.totalLabel') === 'Total' ? '12 days' : '12 дней',
    },
    financials: {
      [t('howWeWorkPage.caseStudy.priceLabel')]: '3 400 000 ₽',
      [t('howWeWorkPage.caseStudy.deliveryPriceLabel')]: '850 000 ₽',
      [t('howWeWorkPage.caseStudy.servicesLabel')]: '50 000 ₽',
      [t('howWeWorkPage.caseStudy.totalPriceLabel')]: '4 300 000 ₽',
      [t('howWeWorkPage.caseStudy.rfPriceLabel')]: '4 950 000 ₽',
      [t('howWeWorkPage.caseStudy.savingsLabel')]: '650 000 ₽',
    },
  };

  const currentSteps = activeVariant === 1 ? stepsVariant1 : stepsVariant2;

  return (
    <div className="flex flex-col">
      <Breadcrumbs items={[{ label: t('nav.howWeWork') }]} />

      {/* Hero секция - с фоновым изображением как на главной */}
      <section className="relative bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 dark:from-zinc-950 dark:via-black dark:to-zinc-950 text-white py-10 md:py-24 overflow-hidden">
        {/* Фоновое изображение */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/process_hero_bg.png"
            alt="Автомобиль"
            fill
            className="object-cover opacity-40 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/90 to-zinc-900/60" />
        </div>

        <div className="container-custom px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-2xl leading-[1.2] md:leading-tight md:text-5xl font-bold mb-3 md:mb-6">{t('howWeWorkPage.title')}</h1>
            <p className="text-sm leading-snug md:leading-normal md:text-xl text-zinc-300 mb-4 md:mb-8">
              {t('howWeWorkPage.subtitle')}
            </p>

            {/* МОБАЙЛ: Бейджи форматов работы */}
            <div className="flex flex-wrap gap-2 mb-5 md:mb-8 md:hidden">
              <Badge variant="secondary" className="text-xs px-2.5 py-1 bg-white/10 backdrop-blur border-white/20 text-white hover:bg-white/20">
                Подбор авто под заказ
              </Badge>
              <Badge variant="secondary" className="text-xs px-2.5 py-1 bg-white/10 backdrop-blur border-white/20 text-white hover:bg-white/20">
                Выкуп авто из наличия
              </Badge>
            </div>

            <Button size="lg" asChild className="w-full md:w-auto">
              <Link href="/contacts#form">{t('howWeWorkPage.startButton')}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Этапы работы с табами на мобиле */}
      <section className="py-4 md:py-24 bg-background">
        <div className="container-custom px-4">
          <div className="max-w-4xl mx-auto">

            {/* МОБАЙЛ: Табы для переключения вариантов */}
            <div className="md:hidden mb-6 flex gap-2 p-1 bg-muted rounded-lg">
              <button
                onClick={() => setActiveVariant(1)}
                className={`flex-1 py-2.5 px-3 text-sm font-medium rounded-md transition-all ${activeVariant === 1
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'text-foreground/70 hover:text-foreground hover:bg-background/50'
                  }`}
              >
                Вариант 1
              </button>
              <button
                onClick={() => setActiveVariant(2)}
                className={`flex-1 py-2.5 px-3 text-sm font-medium rounded-md transition-all ${activeVariant === 2
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'text-foreground/70 hover:text-foreground hover:bg-background/50'
                  }`}
              >
                Вариант 2
              </button>
            </div>

            {/* МОБАЙЛ: Активный вариант */}
            <div className="md:hidden">
              {/* Чип варианта */}
              <div className="mb-4">
                <Badge className="text-xs px-3 py-1">
                  {activeVariant === 1 ? 'Подбор авто под заказ' : 'Выкуп авто из наличия'}
                </Badge>
              </div>

              {/* Заголовок варианта */}
              <h2 className="text-xl font-bold mb-6">
                {activeVariant === 1 ? t('howWeWorkPage.variant1Title') : t('howWeWorkPage.variant2Title')}
              </h2>

              {/* Шаги с таймлайном */}
              <div className="relative">
                {/* Вертикальная линия таймлайна */}
                <div className="absolute left-[18px] top-[36px] bottom-[36px] w-[2px] bg-border" />

                <div className="space-y-4">
                  {currentSteps.map((step, index) => (
                    <div
                      key={index}
                      className={`relative ${index % 2 === 1 ? 'md:bg-muted/30' : ''}`}
                    >
                      {/* Круг с номером */}
                      <div className="absolute left-0 top-0 z-10 w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                        {step.number}
                      </div>

                      {/* Карточка шага */}
                      <div className="ml-12 pl-3">
                        <Card className="p-4 relative">
                          <div className="flex items-start gap-3 mb-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
                              <step.icon className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-base font-bold mb-1 leading-tight line-clamp-2">{step.title}</h3>
                              <Badge variant="outline" className="text-[10px] px-2 py-0 h-5">
                                {step.duration}
                              </Badge>
                            </div>
                          </div>

                          <p className="text-sm text-muted-foreground mb-3 leading-snug">{step.description}</p>

                          <ul className="space-y-1.5">
                            {step.details.map((detail, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                                <span className="text-xs text-muted-foreground leading-snug">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </Card>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ДЕСКТОП: Оригинальный вид с обоими вариантами */}
            <div className="hidden md:block space-y-20">
              {/* Вариант 1: Подбор под заказ */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                  {t('howWeWorkPage.variant1Title')}
                </h2>
                <div className="space-y-12">
                  {stepsVariant1.map((step, index) => (
                    <div key={index} className="relative">
                      {/* Линия между шагами */}
                      {index < stepsVariant1.length - 1 && (
                        <div className="absolute left-8 top-24 w-0.5 h-full bg-border -z-10" />
                      )}

                      <div className="grid md:grid-cols-[auto,1fr] gap-6">
                        {/* Иконка и номер */}
                        <div className="flex flex-col items-center md:items-start">
                          <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mb-4">
                            {step.number}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {step.duration}
                          </div>
                        </div>

                        {/* Контент */}
                        <Card className="p-6 md:p-8">
                          <div className="flex items-start gap-4 mb-4">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
                              <step.icon className="w-6 h-6 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                              <p className="text-muted-foreground">{step.description}</p>
                            </div>
                          </div>

                          <ul className="space-y-2 mt-6">
                            {step.details.map((detail, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                <span className="text-muted-foreground">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </Card>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Вариант 2: Выкуп из наличия */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                  {t('howWeWorkPage.variant2Title')}
                </h2>
                <div className="space-y-12">
                  {stepsVariant2.map((step, index) => (
                    <div key={index} className="relative">
                      {/* Линия между шагами */}
                      {index < stepsVariant2.length - 1 && (
                        <div className="absolute left-8 top-24 w-0.5 h-full bg-border -z-10" />
                      )}

                      <div className="grid md:grid-cols-[auto,1fr] gap-6">
                        {/* Иконка и номер */}
                        <div className="flex flex-col items-center md:items-start">
                          <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mb-4">
                            {step.number}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {step.duration}
                          </div>
                        </div>

                        {/* Контент */}
                        <Card className="p-6 md:p-8">
                          <div className="flex items-start gap-4 mb-4">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
                              <step.icon className="w-6 h-6 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                              <p className="text-muted-foreground">{step.description}</p>
                            </div>
                          </div>

                          <ul className="space-y-2 mt-6">
                            {step.details.map((detail, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                <span className="text-muted-foreground">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </Card>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Пример кейса - улучшенный для мобильных */}
      <section className="py-6 md:py-24 bg-muted/30">
        <div className="container-custom px-4">
          <div className="max-w-4xl mx-auto">
            {/* МОБАЙЛ: Изображение/иконка автомобиля */}
            <div className="md:hidden mb-4 flex justify-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Car className="w-8 h-8 text-primary" />
              </div>
            </div>

            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-lg md:text-4xl font-bold mb-3 md:mb-4">{caseStudy.title}</h2>
              <p className="text-lg md:text-xl text-primary font-semibold flex items-center justify-center gap-2">
                {caseStudy.car}
                <span className="text-xs md:text-sm bg-primary/10 px-2 py-0.5 rounded">🇩🇪</span>
              </p>
              <p className="text-sm md:text-base text-muted-foreground mt-1">{caseStudy.client}</p>
            </div>

            {/* МОБАЙЛ: Табы для карточек */}
            <div className="md:hidden mb-6">
              <div className="flex gap-1 p-1 bg-muted/50 rounded-lg overflow-x-auto">
                <button
                  onClick={() => setActiveCaseTab('specs')}
                  className={`flex-1 whitespace-nowrap py-2 px-3 text-xs font-medium rounded-md transition-all ${activeCaseTab === 'specs'
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground'
                    }`}
                >
                  Характеристики
                </button>
                <button
                  onClick={() => setActiveCaseTab('timeline')}
                  className={`flex-1 whitespace-nowrap py-2 px-3 text-xs font-medium rounded-md transition-all ${activeCaseTab === 'timeline'
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground'
                    }`}
                >
                  Сроки
                </button>
                <button
                  onClick={() => setActiveCaseTab('financials')}
                  className={`flex-1 whitespace-nowrap py-2 px-3 text-xs font-medium rounded-md transition-all ${activeCaseTab === 'financials'
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground'
                    }`}
                >
                  Финансы
                </button>
              </div>

              {/* Активная карточка */}
              <Card className="p-4 mt-4">
                {activeCaseTab === 'specs' && (
                  <>
                    <h3 className="text-base font-bold mb-3">{t('howWeWorkPage.caseStudy.specs')}</h3>
                    <dl className="space-y-2">
                      {Object.entries(caseStudy.details).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <dt className="text-xs text-muted-foreground">{key}</dt>
                          <dd className="text-sm font-semibold">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </>
                )}
                {activeCaseTab === 'timeline' && (
                  <>
                    <h3 className="text-base font-bold mb-3">{t('howWeWorkPage.caseStudy.timeline')}</h3>
                    <dl className="space-y-2">
                      {Object.entries(caseStudy.timeline).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <dt className="text-xs text-muted-foreground">{key}</dt>
                          <dd className={key === t('howWeWorkPage.caseStudy.totalLabel') ? 'text-sm font-bold text-primary' : 'text-sm font-semibold'}>
                            {value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                    {/* Выделенная цифра */}
                    <div className="mt-4 p-3 bg-primary/10 rounded-lg text-center">
                      <div className="text-xs text-muted-foreground mb-1">Всего под ключ</div>
                      <div className="text-2xl font-bold text-primary">12 дней</div>
                    </div>
                  </>
                )}
                {activeCaseTab === 'financials' && (
                  <>
                    <h3 className="text-base font-bold mb-3">{t('howWeWorkPage.caseStudy.financials')}</h3>
                    <dl className="space-y-2">
                      {Object.entries(caseStudy.financials).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <dt className="text-xs text-muted-foreground">{key}</dt>
                          <dd
                            className={
                              key === t('howWeWorkPage.caseStudy.savingsLabel')
                                ? 'text-sm font-bold text-green-600 dark:text-green-400'
                                : key === t('howWeWorkPage.caseStudy.totalPriceLabel')
                                  ? 'text-sm font-bold text-primary'
                                  : 'text-sm font-semibold'
                            }
                          >
                            {value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                    {/* Выделенная экономия */}
                    <div className="mt-4 p-3 bg-green-50 dark:bg-green-950/30 rounded-lg text-center border border-green-200 dark:border-green-800">
                      <div className="text-xs text-muted-foreground mb-1">Экономия</div>
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">650 000 ₽</div>
                    </div>
                  </>
                )}
              </Card>
            </div>

            {/* ДЕСКТОП: Оригинальная сетка */}
            <div className="hidden md:grid md:grid-cols-3 gap-6">
              {/* Характеристики */}
              <Card className="p-4 md:p-6">
                <h3 className="text-lg font-bold mb-4">{t('howWeWorkPage.caseStudy.specs')}</h3>
                <dl className="space-y-3">
                  {Object.entries(caseStudy.details).map(([key, value]) => (
                    <div key={key}>
                      <dt className="text-sm text-muted-foreground">{key}</dt>
                      <dd className="font-semibold">{value}</dd>
                    </div>
                  ))}
                </dl>
              </Card>

              {/* Сроки */}
              <Card className="p-4 md:p-6">
                <h3 className="text-lg font-bold mb-4">{t('howWeWorkPage.caseStudy.timeline')}</h3>
                <dl className="space-y-3">
                  {Object.entries(caseStudy.timeline).map(([key, value]) => (
                    <div key={key}>
                      <dt className="text-sm text-muted-foreground">{key}</dt>
                      <dd className={key === t('howWeWorkPage.caseStudy.totalLabel') ? 'font-bold text-primary' : 'font-semibold'}>
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Card>

              {/* Финансы */}
              <Card className="p-4 md:p-6">
                <h3 className="text-lg font-bold mb-4">{t('howWeWorkPage.caseStudy.financials')}</h3>
                <dl className="space-y-3">
                  {Object.entries(caseStudy.financials).map(([key, value]) => (
                    <div key={key}>
                      <dt className="text-sm text-muted-foreground">{key}</dt>
                      <dd
                        className={
                          key === t('howWeWorkPage.caseStudy.savingsLabel')
                            ? 'font-bold text-green-600 dark:text-green-400 text-lg'
                            : key === t('howWeWorkPage.caseStudy.totalPriceLabel')
                              ? 'font-bold text-primary'
                              : 'font-semibold'
                        }
                      >
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Card>
            </div>

            {/* Отзыв клиента - улучшенный стиль цитаты */}
            <div className="mt-6 md:mt-8">
              <Card className="p-4 md:p-6 bg-muted/50 border-l-4 border-primary">
                <div className="flex gap-3">
                  <Quote className="w-8 h-8 md:w-10 md:h-10 text-primary/30 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm md:text-base text-foreground/90 italic leading-relaxed mb-3 md:mb-4">
                      {t('howWeWorkPage.caseStudy.testimonial')}
                    </p>
                    <p className="text-xs md:text-sm font-semibold text-muted-foreground">
                      — {caseStudy.client}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA - улучшенный для мобильных */}
      <section className="py-6 md:py-24 bg-background">
        <div className="container-custom px-4">
          <Card className="p-5 md:p-8 md:p-12 text-center bg-gradient-to-br from-primary/5 to-primary/10">
            {/* МОБАЙЛ: Бейджи преимуществ */}
            <div className="md:hidden flex flex-wrap justify-center gap-2 mb-4">
              <Badge variant="outline" className="text-[10px] px-2 py-1 gap-1">
                <Clock className="w-3 h-3" />
                До 12 дней под ключ
              </Badge>
              <Badge variant="outline" className="text-[10px] px-2 py-1 gap-1">
                <TrendingDown className="w-3 h-3" />
                Экономия до 700 000 ₽
              </Badge>
              <Badge variant="outline" className="text-[10px] px-2 py-1 gap-1">
                <Shield className="w-3 h-3" />
                Полное сопровождение
              </Badge>
            </div>

            <h2 className="text-xl md:text-4xl font-bold mb-3 md:mb-4">{t('howWeWorkPage.cta.title')}</h2>
            <p className="text-sm md:text-lg text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto leading-snug md:leading-normal">
              {t('howWeWorkPage.cta.desc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Button size="lg" asChild className="w-full sm:w-auto">
                <Link href="/contacts#form">{t('howWeWorkPage.cta.requestButton')}</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
                <Link href="/catalog">{t('howWeWorkPage.cta.catalogButton')}</Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
