"use client";

import { LanguageProvider } from "@/contexts/LanguageContext";
import type { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
  translations: {
    ru: Record<string, string>;
    en: Record<string, string>;
    be: Record<string, string>;
  };
}

export function Providers({ children, translations }: ProvidersProps) {
  return (
    <LanguageProvider initialTranslations={translations}>
      {children}
    </LanguageProvider>
  );
}
