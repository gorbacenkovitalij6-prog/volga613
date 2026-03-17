'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import ContactsBlock from '@/components/ContactsBlock';
import Breadcrumbs from '@/components/Breadcrumbs';
import { CONTACTS } from '@/config/contacts';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ContactsPage() {
  const { t } = useLanguage();

  const contactInfo = [
    {
      icon: Phone,
      title: t('contactsPage.phone'),
      items: [
        { label: CONTACTS.phone, href: CONTACTS.phoneHref, primary: true },
      ],
      description: t('contactsPage.phone.desc'),
    },
    {
      icon: Mail,
      title: t('contactsPage.email'),
      items: [
        { label: CONTACTS.email, href: CONTACTS.emailHref, primary: true },
      ],
      description: t('contactsPage.email.desc'),
    },
    {
      icon: MapPin,
      title: t('contactsPage.address'),
      items: [{ label: CONTACTS.address, href: '', primary: false }],
      description: t('contactsPage.address.desc'),
    },
    {
      icon: Clock,
      title: t('contactsPage.schedule'),
      items: [
        { label: t('contactsPage.schedule.weekdays'), href: '', primary: true },
        { label: t('contactsPage.schedule.saturday'), href: '', primary: false },
        { label: t('contactsPage.schedule.sunday'), href: '', primary: false },
      ],
      description: t('contactsPage.schedule.desc'),
    },
  ];

  const messengers = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      link: CONTACTS.whatsapp,
      color: 'text-green-600',
    },
    {
      name: 'Telegram',
      icon: Send,
      link: CONTACTS.telegram,
      color: 'text-blue-600',
    },
  ];

  return (
    <div className="flex flex-col pb-20 md:pb-0">
      <Breadcrumbs items={[{ label: t('nav.contacts') }]} />

      {/* Hero секция */}
      <section className="bg-gradient-to-br from-muted/50 to-muted py-6 md:py-24">
        <div className="container-custom px-4">
          <div className="max-w-3xl">
            <h1 className="text-2xl leading-tight md:text-5xl font-bold mb-3 md:mb-6">{t('contactsPage.title')}</h1>
            <p className="text-sm leading-snug md:text-xl text-muted-foreground">
              {t('contactsPage.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Основной блок контактов */}
      <div className="bg-background">
        <ContactsBlock />
      </div>

      {/* Дополнительная информация */}
      <section className="py-6 md:py-24 bg-background">
        <div className="container-custom px-4">
          {/* Десктопная версия - все 4 карточки */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((contact, index) => (
              <Card key={index} className="p-4 md:p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4">
                  <contact.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-3">{contact.title}</h3>
                <div className="space-y-2 mb-3">
                  {contact.items.map((item, i) => (
                    <div key={i}>
                      {item.href ? (
                        <a
                          href={item.href}
                          className={`block hover:text-primary transition-colors ${
                            item.primary ? 'font-semibold text-base' : 'text-sm text-muted-foreground'
                          }`}
                        >
                          {item.label}
                        </a>
                      ) : (
                        <p
                          className={
                            item.primary ? 'font-semibold text-base' : 'text-sm text-muted-foreground'
                          }
                        >
                          {item.label}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">{contact.description}</p>
              </Card>
            ))}
          </div>

          {/* Мобильная версия - объединённый блок "Офис и режим работы" */}
          <div className="md:hidden mb-8">
            <h3 className="text-lg font-bold mb-4">Офис и режим работы</h3>
            <Card className="p-5 hover:shadow-lg transition-shadow">
              <div className="space-y-6">
                {/* Адрес */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-orange-500/10 dark:bg-orange-500/20 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-muted-foreground mb-1">{t('contactsPage.address')}</p>
                    <p className="text-sm text-foreground leading-relaxed">{CONTACTS.address}</p>
                  </div>
                </div>

                <div className="h-px bg-border" />

                {/* Режим работы */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-muted-foreground mb-1">{t('contactsPage.schedule')}</p>
                    <div className="space-y-1 text-sm">
                      <p className="font-semibold">{t('contactsPage.schedule.weekdays')}</p>
                      <p className="text-muted-foreground">{t('contactsPage.schedule.saturday')}</p>
                      <p className="text-muted-foreground">{t('contactsPage.schedule.sunday')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>


          {/* Форма обратной связи */}
          <div id="form" className="scroll-mt-20">
            <div className="max-w-3xl mx-auto">
              <div className="bg-zinc-50/50 dark:bg-zinc-900/20 rounded-2xl p-5 md:p-8 border border-zinc-200 dark:border-zinc-800">
                <div className="text-center mb-6 md:mb-10">
                  <h2 className="text-xl md:text-3xl font-bold mb-2 md:mb-4 text-zinc-900 dark:text-white">
                    {t('contactsPage.form.title')}
                  </h2>
                  <p className="text-sm md:text-lg text-zinc-600 dark:text-zinc-300">
                    {t('contactsPage.form.subtitle')}
                  </p>
                </div>
                <ContactForm
                  title=""
                  subtitle=""
                  showCarLink={true}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Преимущества работы с нами */}
      <section className="py-8 md:py-24 bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900">
        <div className="container-custom px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6 md:mb-12">
              <h2 className="text-xl md:text-3xl font-bold mb-2 md:mb-4 text-zinc-900 dark:text-white">
                {t('contactsPage.why.title')}
              </h2>
              <p className="text-sm md:text-lg text-zinc-600 dark:text-zinc-300">
                {t('contactsPage.why.subtitle')}
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-3 md:gap-6">
              <Card className="p-3 md:p-6 bg-white dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-green-500/10 dark:bg-green-500/20 flex items-center justify-center mb-2 md:mb-4">
                  <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-bold text-base md:text-lg mb-1 md:mb-2 text-zinc-900 dark:text-white">{t('contactsPage.why.fast.title')}</h3>
                <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-300">
                  {t('contactsPage.why.fast.desc')}
                </p>
              </Card>
              <Card className="p-3 md:p-6 bg-white dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-2 md:mb-4">
                  <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <h3 className="font-bold text-base md:text-lg mb-1 md:mb-2 text-zinc-900 dark:text-white">{t('contactsPage.why.convenient.title')}</h3>
                <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-300">
                  {t('contactsPage.why.convenient.desc')}
                </p>
              </Card>
              <Card className="p-3 md:p-6 bg-white dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-orange-50 dark:bg-orange-500/20 flex items-center justify-center mb-2 md:mb-4">
                  <MapPin className="w-5 h-5 md:w-6 md:h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="font-bold text-base md:text-lg mb-1 md:mb-2 text-zinc-900 dark:text-white">{t('contactsPage.why.personal.title')}</h3>
                <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-300">
                  {t('contactsPage.why.personal.desc')}
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
