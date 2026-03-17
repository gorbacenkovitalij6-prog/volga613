import type { Metadata } from "next";
import { Unbounded, Montserrat } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import JsonLd from "@/components/JsonLd";
import { Providers } from "@/components/Providers";
import { defaultMetadata } from "@/lib/metadata";

// Import translations server-side to prevent hydration mismatch
import ruTranslations from "@/locales/ru.json";
import enTranslations from "@/locales/en.json";
import beTranslations from "@/locales/be.json";

const translations = {
  ru: ruTranslations,
  en: enTranslations,
  be: beTranslations,
};

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
});

const unbounded = Unbounded({
  weight: ["800", "900"],
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  ...defaultMetadata,
  // Next.js автоматически обработает icon.svg и apple-icon.svg из папки app/
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${montserrat.variable} ${unbounded.variable}`} suppressHydrationWarning>
      <head>
        <meta name="yandex-verification" content="c1ac40997ea2c533" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Принудительно очищаем тему, если она была сохранена
                  localStorage.removeItem('theme');
                  document.documentElement.classList.remove('dark');
                } catch (e) {}
              })();
            `,
          }}
        />
        <Script
          crossOrigin="anonymous"
          src="//unpkg.com/same-runtime/dist/index.global.js"
        />
      </head>
      <body suppressHydrationWarning className="antialiased">
        <JsonLd />
        <ClientBody>
          <Providers translations={translations}>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
              <ChatWidget />
            </div>
          </Providers>
        </ClientBody>
      </body>
    </html>
  );
}
