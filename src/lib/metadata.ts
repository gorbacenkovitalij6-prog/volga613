import { Metadata } from 'next';

const siteUrl = 'https://volga-auto-premier.ru';
const siteName = 'ВОЛГА-АВТО';
const defaultTitle = 'Автопригон из Европы под ключ - ВОЛГА-АВТО';
const defaultDescription =
  'Профессиональный автопригон из Европы. Подбор, проверка, доставка и растаможка автомобилей. Более 500 довольных клиентов. Гарантия юридической чистоты.';

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s - ${siteName}`,
  },
  description: defaultDescription,
  keywords: [
    'автопригон из европы',
    'пригон авто из германии',
    'купить авто в европе',
    'растаможка автомобилей',
    'доставка авто из европы',
    'проверка авто перед покупкой',
    'автомобили из германии',
    'европейские автомобили',
    'автопригон под ключ',
    'ВОЛГА-АВТО',
  ],
  authors: [{ name: 'ВОЛГА-АВТО' }],
  creator: 'ВОЛГА-АВТО',
  publisher: 'ВОЛГА-АВТО',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: siteUrl,
    siteName,
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'ВОЛГА-АВТО - Автопригон из Европы',
        type: 'image/jpeg',
      },
      {
        url: `${siteUrl}/logo-square.png`,
        width: 500,
        height: 500,
        alt: 'ВОЛГА-АВТО Logo',
        type: 'image/png',
      },
      {
        url: `${siteUrl}/icon.svg`,
        width: 512,
        height: 512,
        alt: 'ВОЛГА-АВТО Icon',
        type: 'image/svg+xml',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: defaultDescription,
    images: [`${siteUrl}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Добавьте коды верификации когда получите их
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      'ru-RU': siteUrl,
      'en-US': `${siteUrl}/en`,
    },
  },
};

export function generatePageMetadata(
  title: string,
  description: string,
  path: string = '',
  image?: string
): Metadata {
  const url = `${siteUrl}${path}`;
  const ogImage = image || `${siteUrl}/og-image.jpg`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
  };
}

// Метаданные для конкретных страниц
export const pageMetadata = {
  home: {
    title: 'Автопригон из Европы под ключ - ВОЛГА-АВТО',
    description:
      'Профессиональный автопригон автомобилей из Европы. Подбор, проверка документов, доставка и растаможка. 6+ лет опыта, 500+ довольных клиентов. Юридическая чистота гарантирована.',
    keywords: [
      'автопригон',
      'автомобили из европы',
      'пригон авто',
      'купить авто в европе',
      'растаможка авто',
    ],
  },
  catalog: {
    title: 'Каталог автомобилей из Европы - актуальные предложения',
    description:
      'Актуальный каталог автомобилей из Европы. BMW, Mercedes, Audi, Volkswagen и другие марки. Проверенные авто с историей обслуживания. Гарантия юридической чистоты.',
    keywords: [
      'каталог авто из европы',
      'купить bmw из германии',
      'mercedes из европы',
      'audi из германии',
      'автомобили в наличии',
    ],
  },
  services: {
    title: 'Услуги автопригона из Европы - полный спектр услуг',
    description:
      'Полный спектр услуг по автопригону: подбор авто, техническая проверка, юридическое сопровождение, логистика, растаможка. Прозрачные условия и фиксированные цены.',
    keywords: [
      'услуги автопригона',
      'подбор авто из европы',
      'растаможка автомобилей',
      'доставка авто',
      'проверка авто',
    ],
  },
  about: {
    title: 'О компании ВОЛГА-АВТО - 6+ лет в автопригоне',
    description:
      'ВОЛГА-АВТО - профессиональная команда по автопригону из Европы. 6+ лет на рынке, 500+ довольных клиентов, прямые контракты с европейскими дилерами.',
    keywords: [
      'volga-auto premier',
      'о компании',
      'автопригон из европы',
      'команда специалистов',
    ],
  },
  reviews: {
    title: 'Отзывы Волга-Авто - реальные отзывы клиентов ВОЛГА-АВТО',
    description:
      'Отзывы Волга-Авто: читайте реальные отзывы клиентов о работе ВОЛГА-АВТО. Более 500 довольных клиентов из России. Автопригон из Европы под ключ - честные отзывы и рейтинги.',
    keywords: [
      'автомикс премьер отзывы',
      'volga-auto premier отзывы',
      'отзывы автомикс',
      'отзывы volga-auto',
      'автопригон отзывы',
      'реальные отзывы клиентов',
      'покупка авто из европы отзывы',
      'отзывы о компании автомикс премьер',
    ],
  },
  blog: {
    title: 'Блог о автопригоне - полезные статьи и советы',
    description:
      'Полезные статьи об автопригоне из Европы: как выбрать авто, проверка перед покупкой, таможенное оформление, сравнение моделей и брендов. Экспертные советы от ВОЛГА-АВТО.',
    keywords: [
      'блог автопригон',
      'статьи об автомобилях',
      'как купить авто в европе',
      'советы по покупке авто',
    ],
  },
  contacts: {
    title: 'Контакты ВОЛГА-АВТО - связаться с нами',
    description:
      'Контакты ВОЛГА-АВТО: телефон +7 (846) 233-98-00, WhatsApp, Telegram. Офис в Тольятти и Гродно. Работаем Пн-Пт 09:00-19:00, Сб 10:00-16:00. Бесплатная консультация по автопригону.',
    keywords: [
      'контакты volga-auto premier',
      'телефон автопригон',
      'офис тольятти',
      'консультация автопригон',
    ],
  },
  faq: {
    title: 'Часто задаваемые вопросы об автопригоне из Европы',
    description:
      'Ответы на часто задаваемые вопросы о автопригоне: сроки доставки, стоимость, таможня, документы, гарантии. Получите исчерпывающую информацию от экспертов ВОЛГА-АВТО.',
    keywords: [
      'faq автопригон',
      'вопросы автопригон',
      'как купить авто в европе',
      'стоимость автопригона',
    ],
  },
  howWeWork: {
    title: 'Как мы работаем - этапы автопригона под ключ',
    description:
      'Подробное описание процесса автопригона: от заявки до получения ключей. Прозрачная схема работы, фиксированные сроки, контроль на каждом этапе.',
    keywords: [
      'этапы автопригона',
      'как работает автопригон',
      'процесс покупки авто',
      'схема работы',
    ],
  },
};
