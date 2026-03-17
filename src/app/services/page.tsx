'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Search,
  Shield,
  Scale,
  Truck,
  FileCheck,
  HeadphonesIcon,
  CheckCircle2,
} from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import Breadcrumbs from '@/components/Breadcrumbs';
import FadeInSection from '@/components/FadeInSection';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ServicesPage() {
  const { t } = useLanguage();

  const services = [
    {
      id: 'selection',
      icon: Search,
      title: t('servicesPage.selection.title'),
      description: t('servicesPage.selection.desc'),
      features: [
        t('servicesPage.selection.feature1'),
        t('servicesPage.selection.feature2'),
        t('servicesPage.selection.feature3'),
        t('servicesPage.selection.feature4'),
        t('servicesPage.selection.feature5'),
      ],
      process: [
        t('servicesPage.selection.step1'),
        t('servicesPage.selection.step2'),
        t('servicesPage.selection.step3'),
        t('servicesPage.selection.step4'),
      ],
    },
    {
      id: 'inspection',
      icon: Shield,
      title: t('servicesPage.inspection.title'),
      description: t('servicesPage.inspection.desc'),
      features: [
        t('servicesPage.inspection.feature1'),
        t('servicesPage.inspection.feature2'),
        t('servicesPage.inspection.feature3'),
        t('servicesPage.inspection.feature4'),
        t('servicesPage.inspection.feature5'),
      ],
      process: [
        t('servicesPage.inspection.step1'),
        t('servicesPage.inspection.step2'),
        t('servicesPage.inspection.step3'),
        t('servicesPage.inspection.step4'),
      ],
    },
    {
      id: 'negotiation',
      icon: Scale,
      title: t('servicesPage.negotiation.title'),
      description: t('servicesPage.negotiation.desc'),
      features: [
        t('servicesPage.negotiation.feature1'),
        t('servicesPage.negotiation.feature2'),
        t('servicesPage.negotiation.feature3'),
        t('servicesPage.negotiation.feature4'),
        t('servicesPage.negotiation.feature5'),
      ],
      process: [
        t('servicesPage.negotiation.step1'),
        t('servicesPage.negotiation.step2'),
        t('servicesPage.negotiation.step3'),
        t('servicesPage.negotiation.step4'),
      ],
    },
    {
      id: 'delivery',
      icon: Truck,
      title: t('servicesPage.delivery.title'),
      description: t('servicesPage.delivery.desc'),
      features: [
        t('servicesPage.delivery.feature1'),
        t('servicesPage.delivery.feature2'),
        t('servicesPage.delivery.feature3'),
        t('servicesPage.delivery.feature4'),
        t('servicesPage.delivery.feature5'),
      ],
      process: [
        t('servicesPage.delivery.step1'),
        t('servicesPage.delivery.step2'),
        t('servicesPage.delivery.step3'),
        t('servicesPage.delivery.step4'),
      ],
    },
    {
      id: 'registration',
      icon: FileCheck,
      title: t('servicesPage.registration.title'),
      description: t('servicesPage.registration.desc'),
      features: [
        t('servicesPage.registration.feature1'),
        t('servicesPage.registration.feature2'),
        t('servicesPage.registration.feature3'),
        t('servicesPage.registration.feature4'),
        t('servicesPage.registration.feature5'),
      ],
      process: [
        t('servicesPage.registration.step1'),
        t('servicesPage.registration.step2'),
        t('servicesPage.registration.step3'),
        t('servicesPage.registration.step4'),
      ],
    },
    {
      id: 'support',
      icon: HeadphonesIcon,
      title: t('servicesPage.support.title'),
      description: t('servicesPage.support.desc'),
      features: [
        t('servicesPage.support.feature1'),
        t('servicesPage.support.feature2'),
        t('servicesPage.support.feature3'),
        t('servicesPage.support.feature4'),
        t('servicesPage.support.feature5'),
      ],
      process: [
        t('servicesPage.support.step1'),
        t('servicesPage.support.step2'),
        t('servicesPage.support.step3'),
        t('servicesPage.support.step4'),
      ],
    },
  ];
  return (
    <div className="flex flex-col">
      <Breadcrumbs items={[{ label: t('nav.services') }]} />

      {/* Hero секция */}
      <section className="relative bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 dark:from-zinc-950 dark:via-black dark:to-zinc-950 text-white py-10 md:py-24 overflow-hidden">
        {/* Фоновое изображение */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1920"
            alt="Автосервис"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/80 to-zinc-900/60" />
        </div>
        <div className="container-custom px-4 relative z-10">
          <FadeInSection animation="fade-up" duration={700}>
            <div className="max-w-3xl">
              <h1 className="text-[22px] leading-[1.3] md:text-5xl font-bold mb-2 md:mb-6">{t('servicesPage.title')}</h1>
              <p className="text-sm leading-relaxed md:text-xl text-white/90 mb-3 md:mb-8">
                {t('servicesPage.subtitle')}
              </p>
              <Button size="lg" asChild className="w-full md:w-auto">
                <Link href="/contacts#form">{t('servicesPage.consultButton')}</Link>
              </Button>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Услуги */}
      <section className="py-6 md:py-24 bg-background">
        <div className="container-custom px-4">
          <div className="space-y-8 md:space-y-24">
            {services.map((service, index) => (
              <FadeInSection
                key={service.id}
                animation={index % 2 === 0 ? 'fade-right' : 'fade-left'}
                duration={700}
                delay={100}
              >
                <div
                  id={service.id}
                  className="pb-8 md:pb-0 border-b md:border-b-0 last:border-b-0 last:pb-0"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-12 items-start md:items-center">
                    {/* Контент услуги */}
                    <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-primary/10 dark:bg-primary/20 mb-3 md:mb-6">
                      <service.icon className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                    </div>
                    <h2 className="text-lg md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4 leading-tight">{service.title}</h2>
                    <p className="text-sm md:text-lg text-muted-foreground mb-4 md:mb-6 leading-relaxed">{service.description}</p>

                    <div className="mb-5 md:mb-8">
                      <h3 className="text-sm md:text-xl font-bold mb-2 md:mb-4">{t('servicesPage.whatIncluded')}</h3>
                      <ul className="space-y-1.5 md:space-y-3">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 md:gap-3">
                            <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-xs md:text-base text-muted-foreground leading-snug">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button size="default" asChild className="hidden lg:inline-flex">
                      <Link href="/contacts#form">{t('servicesPage.orderButton')}</Link>
                    </Button>
                  </div>

                  {/* Процесс работы */}
                  <Card className={`p-4 md:p-8 shadow-sm ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <h3 className="text-sm md:text-xl font-bold mb-3 md:mb-6">{t('servicesPage.howProcess')}</h3>
                    <div className="space-y-2.5 md:space-y-4">
                      {service.process.map((step, i) => (
                        <div key={i} className="flex gap-2.5 md:gap-4">
                          <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs md:text-sm">
                            {i + 1}
                          </div>
                          <p className="text-xs md:text-base text-muted-foreground leading-snug md:pt-1">{step}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Форма обратной связи */}
      <section className="py-6 md:py-24 bg-muted/30">
        <div className="container-custom px-4">
          <div className="max-w-3xl mx-auto">
            <FadeInSection animation="scale-up" duration={700}>
              <ContactForm
                title={t('servicesPage.consultForm.title')}
                subtitle={t('servicesPage.consultForm.subtitle')}
                showCarLink={false}
              />
            </FadeInSection>
          </div>
        </div>
      </section>
    </div>
  );
}
