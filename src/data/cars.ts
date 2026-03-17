/**
 * Типы и данные для каталога автомобилей
 *
 * Чтобы добавить новое авто:
 * 1. Добавьте новый объект в массив CARS
 * 2. Заполните все обязательные поля (id, make, model, status, imageUrl, slug)
 * 3. Опциональные поля заполняйте по необходимости
 */

export type CarStatus = 'available' | 'on_order' | 'reserved' | 'sold' | string;

export interface CarItem {
  id: number | string;
  status: CarStatus;           // 'available' = в наличии, 'order' = под заказ
  make: string;                // Марка: BMW, Toyota, Kia и т.д.
  model: string;               // Модель: X5, Camry, K5
  year: number;                // Год выпуска
  mileage: number;             // Пробег в км
  fuel: string;                // Тип топлива: Бензин, Дизель, Гибрид и т.д.
  transmission: string;        // Коробка передач: Автомат, Механика
  body: string;                // Тип кузова: Седан, Внедорожник, Универсал, Купе
  price: number;               // Цена в рублях
  imageUrl: string;            // URL изображения автомобиля

  // Опциональные поля
  title?: string;              // Маркетинговый заголовок
  drive?: string;              // Привод: 4х4, Передний, Задний
  originCountry?: string;      // Страна покупки: Германия, Франция и т.д.
  city?: string;               // Город клиента/доставки
  slug?: string;               // URL-slug для детальной страницы
  tags?: string[];             // Дополнительные теги
  description?: string;        // Описание автомобиля
}

/**
 * Массив всех автомобилей в каталоге
 * Для добавления нового авто просто добавьте объект в этот массив
 */
export const CARS: CarItem[] = [
  {
    id: 1,
    make: 'Kia',
    model: 'K5',
    year: 2021,
    mileage: 85552,
    fuel: 'Бензин',
    transmission: 'Автомат',
    body: 'Седан',
    price: 1600000,
    imageUrl: 'https://ugc.same-assets.com/CmbPzFXgjxYCz3McWxZ1LnM9nszUeLJC.jpeg',
    status: 'available',
    slug: 'kia-k5-2021',
    originCountry: 'Германия',
  },
  {
    id: 2,
    make: 'Toyota',
    model: 'Camry',
    year: 2020,
    mileage: 49500,
    fuel: 'Бензин/Электричество',
    transmission: 'Автомат',
    body: 'Седан',
    price: 1820000,
    imageUrl: 'https://ugc.same-assets.com/tKWT92KOGXgpIkACFD8lWfjr89Ka-mMk.jpeg',
    status: 'available',
    slug: 'toyota-camry-2020',
    originCountry: 'Германия',
  },
  {
    id: 3,
    make: 'Volvo',
    model: 'XC40',
    year: 2018,
    mileage: 89110,
    fuel: 'Бензин',
    transmission: 'Автомат',
    body: 'Внедорожник',
    price: 1770000,
    imageUrl: 'https://ugc.same-assets.com/e1J1gxq6D1C90Ssw0QxtxHZIkMJjg73d.jpeg',
    status: 'on_order',
    slug: 'volvo-xc40-2018',
    originCountry: 'Швеция',
  },
  {
    id: 4,
    make: 'BMW',
    model: '318',
    year: 2019,
    mileage: 78000,
    fuel: 'Дизель',
    transmission: 'Автомат',
    body: 'Седан',
    price: 1830000,
    imageUrl: 'https://ugc.same-assets.com/j4clz3P4-MjZGHy90KMfaSDsgl46HH6o.jpeg',
    status: 'available',
    slug: 'bmw-318-2019',
    originCountry: 'Германия',
  },
  {
    id: 5,
    make: 'Lexus',
    model: 'NX',
    year: 2022,
    mileage: 96110,
    fuel: 'Гибрид',
    transmission: 'Автомат',
    body: 'Внедорожник',
    price: 3200000,
    imageUrl: 'https://ugc.same-assets.com/6viGjLEBK942UMe_GGttodkDoy00Te6O.jpeg',
    status: 'available',
    slug: 'lexus-nx-2022',
    originCountry: 'Япония',
  },
  {
    id: 6,
    make: 'Kia',
    model: 'Sportage',
    year: 2019,
    mileage: 106500,
    fuel: 'Бензин',
    transmission: 'Автомат',
    body: 'Внедорожник',
    price: 1213000,
    imageUrl: 'https://ugc.same-assets.com/se6c3sTm1VzZ4lQmT8PJGB-ts6v3w2c8.jpeg',
    status: 'available',
    slug: 'kia-sportage-2019',
    originCountry: 'Германия',
  },
];

/**
 * Утилиты для работы с автомобилями
 */

// Получить уникальные марки для фильтров
export const getUniqueBrands = (): string[] => {
  return Array.from(new Set(CARS.map(car => car.make))).sort();
};

// Получить уникальные типы кузова для фильтров
export const getUniqueBodyTypes = (): string[] => {
  return Array.from(new Set(CARS.map(car => car.body))).sort();
};

// Получить автомобили по статусу
export const getCarsByStatus = (status: CarStatus): CarItem[] => {
  return CARS.filter(car => car.status === status);
};

// Получить автомобиль по ID
export const getCarById = (id: number | string): CarItem | undefined => {
  return CARS.find(car => String(car.id) === String(id));
};

// Получить автомобиль по slug
export const getCarBySlug = (slug: string): CarItem | undefined => {
  return CARS.find(car => car.slug === slug);
};
