/**
 * Типы и данные для отзывов клиентов
 *
 * Чтобы добавить новый отзыв:
 * 1. Добавьте новый объект в массив REVIEWS
 * 2. Заполните обязательные поля (id, name, city, car, brand, date, rating, text)
 * 3. Опциональные поля заполняйте по необходимости
 */

export type ReviewBadgeType = 'savings' | 'time' | 'repeat' | 'giveaway';

export interface ReviewHighlights {
  savings?: string;        // Экономия, например: "~500 000 ₽"
  time?: string;          // Срок выполнения, например: "12 дней"
  repeat?: boolean;       // Повторное обращение
}

export interface ReviewItem {
  id: number | string;
  name: string;             // Имя клиента (можно использовать инициалы для конфиденциальности)
  city: string;             // Город клиента
  car: string;              // Полное название автомобиля, например: "Toyota Camry"
  brand: string;            // Марка автомобиля для фильтрации
  date: string;             // Дата отзыва в формате YYYY-MM-DD
  rating: number;           // Оценка от 1 до 5
  text: string;             // Полный текст отзыва

  // Опциональные поля
  imageUrl?: string;        // URL изображения автомобиля или клиента
  country?: string;         // Страна покупки: Германия, Франция, Бельгия и т.д.
  highlights?: ReviewHighlights; // Важные моменты (экономия, сроки, повторная покупка)
  verified?: boolean;       // Верифицированный отзыв
  purchaseVerified?: boolean; // Подтверждённая покупка
  route?: string;           // Маршрут доставки, например: "Германия → Москва"
  isGiveaway?: boolean;     // Флаг для участника розыгрыша
}

/**
 * Массив всех отзывов клиентов
 * Для добавления нового отзыва просто добавьте объект в этот массив
 */
export const REVIEWS: ReviewItem[] = [
  {
    id: 1,
    name: 'Алексей М.',
    city: 'Москва',
    car: 'Toyota Prius',
    brand: 'Toyota',
    date: '2024-10-15',
    rating: 5,
    text: 'Отличная работа! Помогли подобрать идеальный вариант Toyota Prius из Германии, провели через все этапы. Автомобиль в отличном состоянии, все документы в порядке. Особенно понравилась оперативность и детальные фотоотчеты на каждом этапе. Рекомендую всем!',
    imageUrl: 'https://ugc.same-assets.com/bNnHJGznxUWpV_n4OnZECZa_2Kqf1EG4.jpeg',
    country: 'Германия',
    verified: true,
    purchaseVerified: true,
  },
  {
    id: 2,
    name: 'Дмитрий К.',
    city: 'Санкт-Петербург',
    car: 'Toyota RAV4',
    brand: 'Toyota',
    date: '2024-09-28',
    rating: 5,
    text: 'Профессиональный подход на всех этапах. Особенно понравились подробные фотоотчеты и оперативная связь с менеджером. Сэкономил около 500 тысяч рублей по сравнению с покупкой аналогичного авто в России. Все прошло быстро и четко, спасибо команде ВОЛГА-АВТО!',
    imageUrl: 'https://ugc.same-assets.com/BXTjbZgN12FnHb6Uquhjty4_9nsGDjCt.jpeg',
    country: 'Франция',
    highlights: {
      savings: '~500 000 ₽',
    },
    verified: true,
    purchaseVerified: true,
  },
  {
    id: 3,
    name: 'Игорь С.',
    city: 'Краснодар',
    car: 'Hyundai Santa Fe',
    brand: 'Hyundai',
    date: '2024-09-10',
    rating: 5,
    text: 'Это уже второй автомобиль, который пригоняю через ВОЛГА-АВТО. Ребята знают свое дело, все четко и в срок. В первый раз был BMW, теперь Hyundai Santa Fe. Обе машины в идеальном состоянии, никаких проблем. Буду обращаться еще и всем рекомендую!',
    imageUrl: 'https://ugc.same-assets.com/VF3RRWsluYI6pshTa3RM4v26aOs2cxtn.jpeg',
    country: 'Германия',
    highlights: {
      repeat: true,
    },
    verified: true,
    purchaseVerified: true,
  },
  {
    id: 4,
    name: 'Сергей П.',
    city: 'Екатеринбург',
    car: 'Skoda Octavia',
    brand: 'Skoda',
    date: '2024-08-22',
    rating: 5,
    text: 'Искала Skoda Octavia в хорошей комплектации и с небольшим пробегом. ВОЛГА-АВТО нашли идеальный вариант в Германии. Весь процесс занял меньше месяца. Приятно удивлена профессионализмом команды и вниманием к деталям. Автомобиль превзошел все ожидания!',
    imageUrl: 'https://ugc.same-assets.com/0rhVFoysMNXhyQMJYAlIsj4i49ioyLzo.jpeg',
    country: 'Германия',
    verified: true,
    purchaseVerified: true,
  },
  {
    id: 5,
    name: 'Андрей Л.',
    city: 'Новосибирск',
    car: 'Hyundai Tucson',
    brand: 'Hyundai',
    date: '2024-08-05',
    rating: 4,
    text: 'Долго выбирал между покупкой в России и пригоном из Европы. Решил попробовать с ВОЛГА-АВТО и не пожалел. За те же деньги получил более свежий автомобиль в лучшей комплектации. Все этапы четко контролировались, я всегда был в курсе где находится мой автомобиль. Единственное - процесс занял чуть больше обещанного времени, но результатом доволен.',
    imageUrl: 'https://ugc.same-assets.com/MAYQxAAWGSXeuUHoNLB_c7rODVIxH_LX.jpeg',
    country: 'Нидерланды',
    verified: true,
    purchaseVerified: true,
  },
  {
    id: 6,
    name: 'Владимир Н.',
    city: 'Казань',
    car: 'Toyota C-HR',
    brand: 'Toyota',
    date: '2024-07-18',
    rating: 5,
    text: 'Отдельное спасибо Олегу, вашему менеджеру. Всегда был на связи, отвечал на все вопросы, даже самые глупые. Автомобиль Toyota C-HR пришел точно в срок, состояние отличное. Процесс постановки на учет тоже помогли организовать. Очень довольна!',
    imageUrl: 'https://ugc.same-assets.com/o_LOdi0bd-7Rpaoeo92DUHTZtmhe0fF_.jpeg',
    country: 'Италия',
    verified: true,
    purchaseVerified: true,
  },
  {
    id: 7,
    name: 'Максим Т.',
    city: 'Ростов-на-Дону',
    car: 'BMW X2',
    brand: 'BMW',
    date: '2024-07-02',
    rating: 5,
    text: 'Приятно иметь дело с профессионалами. Весь процесс от подбора до получения автомобиля занял всего 12 дней. Никаких неожиданных платежей или скрытых комиссий. Все как договаривались. BMW X2 в отличном состоянии, экономия по сравнению с РФ составила около 400 тысяч.',
    imageUrl: 'https://ugc.same-assets.com/l6prQruLM5J6EAfOi2ruIxTPJXDyS7Xl.jpeg',
    country: 'Австрия',
    highlights: {
      time: '12 дней',
      savings: '~400 000 ₽',
    },
    verified: true,
    purchaseVerified: true,
  },
  {
    id: 8,
    name: 'Олег В.',
    city: 'Челябинск',
    car: 'Skoda Karoq',
    brand: 'Skoda',
    date: '2024-06-15',
    rating: 5,
    text: 'Искал Skoda Karoq в топовой комплектации. Нашли в Бельгии за отличную цену. Проверили все до мельчайших деталей, прислали подробный фотоотчет осмотра. Доставка прошла быстро, растаможка без проблем. Рекомендую ВОЛГА-АВТО как надежную компанию!',
    imageUrl: 'https://ugc.same-assets.com/hEk4ZoJijvofwFlNSsORHG5HJXAdBT1R.jpeg',
    country: 'Бельгия',
    verified: true,
    purchaseVerified: true,
  },
  {
    id: 9,
    name: 'Роман К.',
    city: 'Самара',
    car: 'Volkswagen Tiguan',
    brand: 'Volkswagen',
    date: '2024-05-28',
    rating: 5,
    text: 'Очень доволен покупкой Volkswagen Tiguan через ВОЛГА-АВТО. Подбор занял всего 4 дня, нашли именно то, что я хотел. Весь процесс прозрачный, всегда можно было позвонить и узнать на каком этапе находится автомобиль. Буду рекомендовать друзьям!',
    imageUrl: 'https://ugc.same-assets.com/OU5hGR2Wf4Y7NIbFp70tMQQTXqP98QHZ.jpeg',
    country: 'Чехия',
    highlights: {
      time: '4 дня',
    },
    verified: true,
    purchaseVerified: true,
  },
  {
    id: 10,
    name: 'Анна В.',
    city: 'Москва',
    car: 'Toyota RAV4',
    brand: 'Toyota',
    date: '2024-05-15',
    rating: 5,
    text: 'Я участвовала в розыгрыше от ВОЛГА-АВТО и не могла поверить своему счастью, когда узнала, что выиграла! Организация была на высшем уровне — команда подарила мне новый набор инструментов =)',
    imageUrl: 'https://ugc.same-assets.com/ddolHIsjRl8M5XLyTDmE9JEFpdQmaJu2.jpeg',
    country: 'Германия',
    verified: true,
    purchaseVerified: true,
    isGiveaway: true,
  },
];

/**
 * Утилиты для работы с отзывами
 */

// Получить средний рейтинг
export const getAverageRating = (): number => {
  if (REVIEWS.length === 0) return 0;
  const sum = REVIEWS.reduce((acc, review) => acc + review.rating, 0);
  return Math.round((sum / REVIEWS.length) * 10) / 10;
};

// Получить уникальные города для фильтров
export const getUniqueCities = (): string[] => {
  return Array.from(new Set(REVIEWS.map(review => review.city))).sort();
};

// Получить уникальные марки для фильтров
export const getUniqueBrands = (): string[] => {
  return Array.from(new Set(REVIEWS.map(review => review.brand))).sort();
};

// Получить отзывы по марке
export const getReviewsByBrand = (brand: string): ReviewItem[] => {
  return REVIEWS.filter(review => review.brand === brand);
};

// Получить отзывы по городу
export const getReviewsByCity = (city: string): ReviewItem[] => {
  return REVIEWS.filter(review => review.city === city);
};

// Получить верифицированные отзывы
export const getVerifiedReviews = (): ReviewItem[] => {
  return REVIEWS.filter(review => review.verified === true);
};
