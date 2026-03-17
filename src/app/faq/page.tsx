'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  HelpCircle,
  DollarSign,
  Shield,
  Truck,
  FileCheck,
  ChevronRight
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useLanguage } from '@/contexts/LanguageContext';



export default function FAQPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('general');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const faqCategories = useMemo(() => [
    {
      id: 'general',
      title: t('faqPage.cat.general'),
      icon: HelpCircle,
      questions: [
        {
          q: t('faqPage.general.q1'),
          a: t('faqPage.general.a1'),
        },
        {
          q: t('faqPage.general.q2'),
          a: t('faqPage.general.a2'),
        },
        {
          q: t('faqPage.general.q3'),
          a: t('faqPage.general.a3'),
        },
        {
          q: t('faqPage.general.q4'),
          a: t('faqPage.general.a4'),
        },
      ],
    },
    {
      id: 'cost',
      title: t('faqPage.cat.cost'),
      icon: DollarSign,
      questions: [
        {
          q: t('faqPage.cost.q1'),
          a: t('faqPage.cost.a1'),
        },
        {
          q: t('faqPage.cost.q2'),
          a: t('faqPage.cost.a2'),
        },
        {
          q: t('faqPage.cost.q3'),
          a: t('faqPage.cost.a3'),
        },
        {
          q: t('faqPage.cost.q4'),
          a: t('faqPage.cost.a4'),
        },
      ],
    },
    {
      id: 'verification',
      title: t('faqPage.cat.verification'),
      icon: Shield,
      questions: [
        {
          q: t('faqPage.verification.q1'),
          a: t('faqPage.verification.a1'),
        },
        {
          q: t('faqPage.verification.q2'),
          a: t('faqPage.verification.a2'),
        },
        {
          q: t('faqPage.verification.q3'),
          a: t('faqPage.verification.a3'),
        },
      ],
    },
    {
      id: 'delivery',
      title: t('faqPage.cat.delivery'),
      icon: Truck,
      questions: [
        {
          q: t('faqPage.delivery.q1'),
          a: t('faqPage.delivery.a1'),
        },
        {
          q: t('faqPage.delivery.q2'),
          a: t('faqPage.delivery.a2'),
        },
        {
          q: t('faqPage.delivery.q3'),
          a: t('faqPage.delivery.a3'),
        },
      ],
    },
    {
      id: 'registration',
      title: t('faqPage.cat.registration'),
      icon: FileCheck,
      questions: [
        {
          q: t('faqPage.registration.q1'),
          a: t('faqPage.registration.a1'),
        },
        {
          q: t('faqPage.registration.q2'),
          a: t('faqPage.registration.a2'),
        },
      ],
    },
  ], [t]);

  // Автоматическое переключение табов при скролле
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const category of faqCategories) {
        const section = sectionRefs.current[category.id];
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveTab(category.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [faqCategories]);

  // Анимация появления при загрузке
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveTab(sectionId);
    const section = sectionRefs.current[sectionId];
    if (section) {
      const yOffset = -100;
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col">
      <Breadcrumbs items={[{ label: 'FAQ' }]} />

      {/* Hero секция */}
      <section className="bg-gradient-to-br from-muted/50 to-muted py-8 md:py-12 lg:py-16">
        <div className="container-custom px-3 md:px-6">
          <div className={`max-w-[800px] mx-auto text-center bg-card border rounded-xl md:rounded-2xl shadow-sm p-6 md:p-10 lg:p-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 md:mb-4">
              {t('faqPage.title')}
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed">
              {t('faqPage.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b shadow-sm">
        <div className="container-custom py-4 md:py-5">
          <div className="max-w-[1000px] mx-auto relative">
            {/* Градиент для индикации скролла слева на мобильных */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background/95 to-transparent pointer-events-none z-10 md:hidden" />

            {/* Градиент для индикации скролла справа на мобильных */}
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background/95 to-transparent pointer-events-none z-10 md:hidden" />

            {/* Контейнер табов */}
            <div className="overflow-x-auto scrollbar-hide px-4 md:px-0">
              <div className="flex justify-center md:justify-center gap-3 md:gap-3 min-w-max md:min-w-0 md:flex-wrap">
                {faqCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => scrollToSection(category.id)}
                    className={`
                      flex items-center justify-center gap-2 px-4 md:px-5 py-2.5 md:py-3 rounded-full text-sm md:text-[15px] font-semibold whitespace-nowrap transition-all duration-200 flex-shrink-0
                      ${
                        activeTab === category.id
                          ? 'bg-primary text-primary-foreground shadow-md hover:bg-primary/90'
                          : 'bg-card text-primary border-2 border-primary hover:bg-primary/5 hover:shadow-sm'
                      }
                    `}
                  >
                    <category.icon className="w-4 h-4 flex-shrink-0" />
                    <span className="hidden sm:inline">{category.title}</span>
                    <span className="sm:hidden">{category.title.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-8 md:py-12 lg:py-16">
        <div className="container-custom px-3 md:px-6">
          <div className="max-w-[800px] mx-auto space-y-10 md:space-y-12">
            {faqCategories.map((category, index) => (
              <div
                key={category.id}
                id={category.id}
                ref={(el) => { sectionRefs.current[category.id] = el; }}
                className={`scroll-mt-20 md:scroll-mt-24 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Section Header */}
                <div className="flex items-center gap-2.5 md:gap-3 mb-5 md:mb-6 pt-6 md:pt-8 first:pt-0">
                  <div className="w-1 h-6 md:h-8 bg-primary rounded-full" />
                  <category.icon className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0" />
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">
                    {category.title}
                  </h2>
                </div>

                {/* Questions Accordion */}
                <Accordion type="single" collapsible className="space-y-2.5 md:space-y-3">
                  {category.questions.map((item, qIndex) => (
                    <AccordionItem
                      key={qIndex}
                      value={`item-${index}-${qIndex}`}
                      className={`bg-card border rounded-xl overflow-hidden hover:shadow-md transition-all duration-500 ${
                        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                      }`}
                      style={{ transitionDelay: `${(index * 100) + (qIndex * 50)}ms` }}
                    >
                      <AccordionTrigger className="text-left hover:no-underline px-4 md:px-5 lg:px-6 py-3.5 md:py-4 group">
                        <div className="flex items-start gap-2.5 md:gap-3 pr-3 md:pr-4">
                          <HelpCircle className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-0.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                          <span className="font-semibold text-sm md:text-[15px] lg:text-base leading-relaxed">
                            {item.q}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 md:px-5 lg:px-6 pb-4 md:pb-5 pt-1">
                        <div className="pl-6 md:pl-8">
                          <p className="text-sm md:text-[15px] lg:text-base text-muted-foreground leading-[1.65] md:leading-[1.7]">
                            {item.a}
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-8 md:py-12 lg:py-16 bg-muted/30">
        <div className="container-custom px-3 md:px-6">
          <div className="max-w-[800px] mx-auto">
            <Card className="p-6 md:p-10 lg:p-12 text-center bg-gradient-to-br from-blue-500/5 to-blue-500/10 dark:from-blue-500/10 dark:to-blue-500/20 border-blue-500/30 shadow-lg rounded-xl md:rounded-2xl">
              <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-3 md:mb-4">
                {t('faqPage.cta.title')}
              </h2>
              <p className="text-sm md:text-base lg:text-lg text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed">
                {t('faqPage.cta.desc')}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                <Button size="lg" asChild className="w-full sm:w-auto">
                  <Link href="/contacts#form">
                    {t('faqPage.cta.askButton')}
                    <ChevronRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
                  <Link href="/contacts">{t('faqPage.cta.contactsButton')}</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
