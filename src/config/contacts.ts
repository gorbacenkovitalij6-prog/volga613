/**
 * Конфигурация контактных данных компании
 *
 * Чтобы изменить контакты:
 * 1. Отредактируйте нужные поля в объекте CONTACTS
 * 2. Изменения автоматически применятся на всем сайте:
 *    - Header (шапка)
 *    - Footer (подвал)
 *    - Страница /contacts
 *    - JSON-LD микроразметка
 *    - Виджет чата
 */

export const CONTACTS = {
  // Основная информация
  companyName: 'ВОЛГА-АВТО',
  legalName: 'ООО "Волга-Авто"',

  // Телефоны
  phone: '+7 (934) 005-11-27',
  phoneHref: 'tel:+79340051127',
  phoneSecondary: '+7 (934) 005-11-27',
  phoneSecondaryHref: 'tel:+79340051127',

  // Email
  email: 'volga.avtogroups@mail.ru',
  emailHref: 'mailto:volga.avtogroups@mail.ru',
  emailSupport: 'volga.avtogroups@mail.ru',
  emailSupportHref: 'mailto:volga.avtogroups@mail.ru',

  // Адрес юридический
  city: 'Тольятти',
  region: 'Самарская область',
  address: 'г. Тольятти, ул. Маршала Жукова, д. 54, этаж 1 офис 1 ком. 3',
  postalCode: '445000',

  // Адрес офиса (где можно встретиться)
  officeCity: 'Гродно',
  officeRegion: 'Гродненская область',
  officeCountry: 'Беларусь',
  officeAddress: 'Гаспадарчая улица, 19, Гродно',
  officePostalCode: '230000',

  // Координаты для карт (офис в Гродно)
  coordinates: {
    lat: 53.710601,
    lng: 23.825558,
  },

  // Режим работы
  workHours: {
    weekdays: 'Пн-Пт: 09:00 - 19:00',
    saturday: 'Сб: 10:00 - 16:00',
    sunday: 'Вс: выходной',
    full: 'Пн-Пт: 09:00-19:00, Сб: 10:00-16:00, Вс: выходной',
  },

  // Мессенджеры
  whatsapp: 'https://wa.me/79016208927',
  whatsappNumber: '+7 (901) 620-89-27',
  telegram: 'https://t.me/volgaavto_order',
  telegramUsername: '@volgaavto_order',

  // Социальные сети (при необходимости добавьте)
  social: {
    vk: '',
    instagram: '',
    youtube: '',
  },

  // Сайт
  website: 'https://volga-auto-premier.ru',

  // Дополнительная информация
  foundingYear: '2018',
  experience: '6+',

  // Статистика (для отображения на сайте)
  stats: {
    yearsInBusiness: 6,
    carsPurchased: 500,
    satisfactionRate: 98,
  },
} as const;

/**
 * Утилиты для работы с контактами
 */

// Получить полный адрес в одной строке
export const getFullAddress = (): string => {
  return CONTACTS.address;
};

// Получить форматированный режим работы
export const getWorkHours = (): string => {
  return CONTACTS.workHours.full;
};

// Получить основной телефон для отображения
export const getMainPhone = (): string => {
  return CONTACTS.phone;
};

// Получить все телефоны
export const getAllPhones = (): Array<{ number: string; href: string; primary: boolean }> => {
  return [
    { number: CONTACTS.phone, href: CONTACTS.phoneHref, primary: true },
    { number: CONTACTS.phoneSecondary, href: CONTACTS.phoneSecondaryHref, primary: false },
  ];
};

// Получить все email
export const getAllEmails = (): Array<{ email: string; href: string; primary: boolean }> => {
  return [
    { email: CONTACTS.email, href: CONTACTS.emailHref, primary: true },
    { email: CONTACTS.emailSupport, href: CONTACTS.emailSupportHref, primary: false },
  ];
};

// Получить мессенджеры
export const getMessengers = (): Array<{ name: string; url: string; display: string }> => {
  return [
    { name: 'WhatsApp', url: CONTACTS.whatsapp, display: CONTACTS.whatsappNumber },
    { name: 'Telegram', url: CONTACTS.telegram, display: CONTACTS.telegramUsername },
  ];
};
