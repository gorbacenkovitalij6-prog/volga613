export interface BlogArticle {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  readTime: string;
  author?: string;
  content?: string;
}

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 1,
    slug: 'kak-vybrat-avto-v-2025',
    title: 'Как выбрать авто в 2025 году: кроссовер или седан, бензин или дизель, автомат или вариатор?',
    excerpt:
      'В 2025 году выбрать машину — как выбрать сериал на вечер: вариантов море, времени мало, а промахаться не хочется. Разберёмся по-человечески: что выбрать для российских дорог и жизни «от работы до дачи».',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800',
    date: '2024-11-10',
    category: 'Руководства',
    readTime: '22 мин',
  },
  {
    id: 2,
    slug: 'top-5-oshibok-pri-pokupke-avto-iz-evropy',
    title: 'Топ-5 ошибок при покупке авто из Европы (и как не стать их героем)',
    excerpt:
      'Разбираем реальные косяки, которые делают при автопригоне. Спойлер: на каждый есть простое решение.',
    image: 'https://images.unsplash.com/photo-1486496146582-9ffcd0b2b2b7?w=800',
    date: '2024-11-03',
    category: 'Советы',
    readTime: '10 мин',
  },
  {
    id: 3,
    slug: 'tamozhnya-2025-chto-izmenilos',
    title: 'Таможня в 2025 году: что изменилось и почему это не страшно',
    excerpt:
      'Про новые правила, ставки и документы — без канцелярита и с пониманием, что это значит для вас.',
    image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800',
    date: '2024-10-27',
    category: 'Новости',
    readTime: '12 мин',
  },
  {
    id: 4,
    slug: 'bmw-vs-mercedes-vechnyi-spor',
    title: 'BMW или Mercedes: вечный спор и честный ответ',
    excerpt:
      'Разбираем главный автомобильный холивар: что выгоднее пригонять из Германии. Без фанатизма, с цифрами и здравым смыслом.',
    image: '/uploads/bmw-vs-mercedes.jpg',
    date: '2024-10-20',
    category: 'Аналитика',
    readTime: '18 мин',
  },
  {
    id: 5,
    slug: 'proverka-avto-pered-pokupkoi',
    title: 'Проверка авто перед покупкой: что смотреть и где искать косяки',
    excerpt:
      'Подробный чек-лист проверки автомобиля — от ржавчины до электроники. Рассказываем, на что смотрят профессионалы.',
    image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800',
    date: '2024-10-15',
    category: 'Руководства',
    readTime: '20 мин',
  },
  {
    id: 6,
    slug: 'elektromobili-iz-evropy-stoit-li-prigonyat',
    title: 'Электромобили из Европы: стоит ли пригонять в Россию',
    excerpt:
      'Анализируем перспективы покупки электромобилей из Европы: инфраструктура, экономия, особенности эксплуатации и растаможки.',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800',
    date: '2024-10-08',
    category: 'Тренды',
    readTime: '18 мин',
  },
  {
    id: 7,
    slug: 'istoriya-uspeha-porsche-cayenne-za-10-dnei',
    title: 'История успеха: как мы пригнали Porsche Cayenne за 10 дней',
    excerpt:
      'Реальный кейс: подробная история пригона Porsche Cayenne из Германии. От поиска до передачи ключей клиенту.',
    image: '/uploads/porsche-cayenne-delivery.jpg',
    date: '2024-10-01',
    category: 'Кейсы',
    readTime: '14 мин',
  },
  {
    id: 9,
    slug: 'skolko-stoit-avtomobil-iz-evropy-kalkulyator',
    title: 'Сколько реально стоит автомобиль из Европы: калькулятор расходов',
    excerpt:
      'Подробный разбор всех статей расходов при автопригоне: от покупки до постановки на учет. С реальными примерами и цифрами.',
    image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800',
    date: '2024-09-17',
    category: 'Руководства',
    readTime: '20 мин',
  },
];

// Утилитарные функции
export const getArticleBySlug = (slug: string): BlogArticle | undefined => {
  return BLOG_ARTICLES.find((article) => article.slug === slug);
};

export const getAllSlugs = (): string[] => {
  return BLOG_ARTICLES.map((article) => article.slug);
};
