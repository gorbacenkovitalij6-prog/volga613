'use client';

import Link from 'next/link';
import Logo from '@/components/Logo';
import { CONTACTS } from '@/config/contacts';

const navigation = {
  company: [
    { name: 'О компании', href: '/about' },
  ],
  catalog: [
    { name: 'Каталог авто', href: '/catalog' },
    { name: 'Отзывы', href: '/reviews' },
    { name: 'Контакты', href: '/contacts' },
  ],
};

export default function Footer() {
  return (
    <footer id="main-footer" className="border-t bg-muted/30 md:bg-muted/30">
      <div className="container-custom">
        {/* Мобильная версия - доработанная с ровными отступами */}
        <div className="block md:hidden py-8 px-4">
          {/* Два столбца в один ряд - выровнены по центру */}
          <div className="max-w-md mx-auto mb-8">
            <div className="grid grid-cols-2 gap-6">
              {/* Компания */}
              <div className="text-left">
                <h3 className="text-sm font-semibold mb-3 text-foreground">Компания</h3>
                <ul className="space-y-2.5">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-xs leading-relaxed text-muted-foreground hover:text-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Каталог и услуги */}
              <div className="text-left">
                <h3 className="text-sm font-semibold mb-3 text-foreground">Каталог и услуги</h3>
                <ul className="space-y-2.5">
                  {navigation.catalog.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-xs leading-relaxed text-muted-foreground hover:text-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Контакты - строго по центру */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-center mb-4 text-foreground">Контакты</h3>

            {/* Контакты в кружках - один ряд, одинаковые промежутки */}
            <div className="flex items-center justify-center gap-4">
              <a
                href={CONTACTS.phoneHref}
                className="flex items-center justify-center w-11 h-11 rounded-full bg-primary/10 hover:bg-primary/20 active:scale-95 transition-all"
                aria-label="Позвонить"
              >
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </a>
              <a
                href={CONTACTS.emailHref}
                className="flex items-center justify-center w-11 h-11 rounded-full bg-primary/10 hover:bg-primary/20 active:scale-95 transition-all"
                aria-label="Написать email"
              >
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
              <a
                href={CONTACTS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-11 h-11 rounded-full bg-primary/10 hover:bg-primary/20 active:scale-95 transition-all"
                aria-label="WhatsApp"
              >
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
              <a
                href={CONTACTS.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-11 h-11 rounded-full bg-primary/10 hover:bg-primary/20 active:scale-95 transition-all"
                aria-label="Telegram"
              >
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
              <a
                href={CONTACTS.max}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-11 h-11 rounded-full bg-primary/10 hover:bg-primary/20 active:scale-95 transition-all"
                aria-label="MAX"
              >
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Разделительная линия */}
          <div className="border-t border-border/30 my-6"></div>

          {/* Копирайт и политика - по центру с одинаковыми отступами */}
          <div className="text-center space-y-3 pb-4">
            <p className="text-[11px] leading-relaxed text-muted-foreground">
              © {new Date().getFullYear()} {CONTACTS.companyName}
            </p>
            <Link
              href="/privacy"
              className="text-[11px] leading-relaxed text-muted-foreground hover:text-primary transition-colors block"
            >
              Политика конфиденциальности
            </Link>
          </div>
        </div>

        {/* Десктопная версия - БЕЗ ИЗМЕНЕНИЙ */}
        <div className="hidden md:block py-12 lg:py-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            {/* Логотип и описание */}
            <div className="lg:col-span-1">
              <div className="mb-4">
                <Logo />
              </div>
              <p className="text-sm text-muted-foreground">
                Автопригон из Европы в Россию под ключ. Полное сопровождение от подбора до постановки на учет.
              </p>
            </div>

            {/* Компания */}
            <div>
              <h3 className="text-sm font-semibold mb-4">Компания</h3>
              <ul className="space-y-3">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Каталог */}
            <div>
              <h3 className="text-sm font-semibold mb-4">Каталог и услуги</h3>
              <ul className="space-y-3">
                {navigation.catalog.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Контакты */}
            <div>
              <h3 className="text-sm font-semibold mb-4">Контакты</h3>
              <ul className="space-y-3">
                <li>
                  <div className="text-sm text-muted-foreground">
                    Телефон:{' '}
                    <a
                      href={CONTACTS.phoneHref}
                      className="hover:text-primary transition-colors"
                    >
                      {CONTACTS.phone}
                    </a>
                  </div>
                </li>
                <li>
                  <div className="text-sm text-muted-foreground">
                    Email:{' '}
                    <a
                      href={CONTACTS.emailHref}
                      className="hover:text-primary transition-colors"
                    >
                      {CONTACTS.email}
                    </a>
                  </div>
                </li>
                <li>
                  <div className="text-sm text-muted-foreground">
                    Мессенджеры:{' '}
                    <a
                      href={CONTACTS.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors"
                    >
                      WhatsApp
                    </a>
                    {', '}
                    <a
                      href={CONTACTS.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors"
                    >
                      Telegram
                    </a>
                    {', '}
                    <a
                      href={CONTACTS.max}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors"
                    >
                      MAX
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} {CONTACTS.companyName}. Все права защищены.
            </p>
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Политика конфиденциальности
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
