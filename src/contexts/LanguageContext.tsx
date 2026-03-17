'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'ru' | 'en' | 'be';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

interface LanguageProviderProps {
  children: ReactNode;
  initialTranslations: {
    ru: Record<string, string>;
    en: Record<string, string>;
    be: Record<string, string>;
  };
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children, initialTranslations }: LanguageProviderProps) {
  // Always initialize with 'ru' to prevent hydration mismatch
  const [language, setLanguageState] = useState<Language>('ru');
  // Initialize with Russian translations from server
  const [translations, setTranslations] = useState<Record<string, string>>(
    initialTranslations.ru
  );

  // Sync language with localStorage after mount
  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && ['ru', 'en', 'be'].includes(savedLang)) {
      setLanguageState(savedLang);
    }
  }, []);

  // Update translations when language changes
  useEffect(() => {
    setTranslations(initialTranslations[language]);
  }, [language, initialTranslations]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    // Return default values instead of throwing during SSR
    return {
      language: 'ru' as Language,
      setLanguage: () => {},
      t: (key: string) => key,
    };
  }
  return context;
}
