'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import Logo from '@/components/Logo';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';

const getNavigation = (t: (key: string) => string) => [
  { name: t('nav.home'), href: '/' },
  { name: t('nav.catalog'), href: '/catalog' },
  { name: t('nav.about'), href: '/about' },
  { name: t('nav.reviews'), href: '/reviews' },
  { name: t('nav.contacts'), href: '/contacts' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();
  const navigation = getNavigation(t);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${scrolled ? 'bg-background shadow-md' : 'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'
      }`}>
      <nav className="container-custom flex h-16 md:h-20 items-center gap-4">
        {/* Мобильное меню - кнопка (слева на мобильных) */}
        <button
          type="button"
          className="lg:hidden p-2 -ml-2 order-first"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Меню"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Логотип - оптимизирован для маленьких экранов */}
        <div className="flex-1 flex justify-center lg:justify-start lg:flex-initial lg:order-first">
          <div className="scale-[0.85] sm:scale-100 origin-center">
            <Logo />
          </div>
        </div>

        {/* Десктопное меню */}
        <div className="hidden lg:flex lg:gap-x-4 xl:gap-x-6 flex-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-foreground/80 transition-all duration-150 hover:text-primary relative group whitespace-nowrap active:scale-95 active:translate-y-0.5"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Правая часть: Переключатели + CTA */}
        <div className="hidden md:flex items-center gap-3">
          {/* Переключатель языка */}
          <div className="flex items-center justify-center h-9 xl:px-[0px] -translate-y-0.5">
            <LanguageSwitcher />
          </div>
          {/* CTA кнопка */}
          <Button asChild size="sm" className="text-sm whitespace-nowrap">
            <Link href="/contacts#form">{t('nav.request')}</Link>
          </Button>
        </div>
      </nav>

      {/* Мобильное меню - панель с плавной анимацией */}
      <div
        className={`lg:hidden border-t bg-background overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen
            ? 'max-h-[calc(100vh-5rem)] opacity-100'
            : 'max-h-0 opacity-0'
          }`}
      >
        <div className={`container-custom py-4 space-y-1 overflow-y-auto transition-transform duration-300 ${mobileMenuOpen ? 'translate-y-0' : '-translate-y-4'
          }`}>
          {navigation.map((item, index) => (
            <div
              key={item.name}
              className={`transition-all duration-300 ${mobileMenuOpen
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-4'
                }`}
              style={{ transitionDelay: mobileMenuOpen ? `${index * 50}ms` : '0ms' }}
            >
              <Link
                href={item.href}
                className="block py-3 px-4 text-base font-medium text-foreground/80 hover:text-primary hover:bg-accent/50 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            </div>
          ))}
          <div className={`pt-4 px-4 space-y-3 transition-all duration-300 delay-300 ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
            {/* Переключатели для мобильных */}
            <div className="flex justify-center pb-2">
              <LanguageSwitcher />
            </div>
            <Button asChild className="w-full" size="lg">
              <Link href="/contacts#form" onClick={() => setMobileMenuOpen(false)}>
                {t('nav.request')}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
