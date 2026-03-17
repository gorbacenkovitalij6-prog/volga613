# 🚗 Волга-Авто - Автопригон из Европы

Современный веб-сайт компании **Волга-Авто** - профессиональный автопригон из Европы в Россию под ключ.

## 🌟 Последние обновления (v44)

### ✨ Плавная анимация смены фона
- Реализована плавная CSS анимация fadeIn для смены фоновых изображений
- Автоматическая смена фона при переключении светлой/темной темы
- Длительность анимации: 700ms с плавным easing
- Устранены все ошибки hydration mismatch

### 📸 Обновления команды
- Обновлены фотографии: Александр Морозов, Ксения Парфёнова
- Оптимизированы размеры изображений для быстрой загрузки
- Улучшено позиционирование фотографий на мобильных устройствах

## 🚀 Технологии

- **Next.js 15** - React фреймворк с App Router
- **TypeScript** - Типизация для надежности кода
- **Tailwind CSS** - Utility-first CSS фреймворк
- **Shadcn/ui** - Компоненты UI высокого качества
- **Sanity CMS** - Headless CMS для управления контентом
- **Bun** - Быстрый пакетный менеджер и runtime

## 📦 Установка

```bash
# Клонировать репозиторий
git clone https://github.com/gennadiyyasnov-maker/Avtomix-premier.git
cd volga-auto-premier

# Установить зависимости
bun install

# Скопировать переменные окружения
cp .env.example .env.local

# Настроить Sanity CMS (см. SANITY-README.md)
# Добавить NEXT_PUBLIC_SANITY_PROJECT_ID и NEXT_PUBLIC_SANITY_DATASET в .env.local

# Запустить dev сервер
bun run dev
```

Сайт будет доступен по адресу: http://localhost:3000

## 🎨 Особенности

### Анимации
- ✨ Плавные переходы между страницами
- 🌓 Автоматическая смена фона при переключении темы (700ms)
- 📜 Scroll-based анимации для секций
- 🎭 Fade-in эффекты для изображений и карточек

### Темная/Светлая тема
- 🌙 Полная поддержка темной темы
- ☀️ Адаптивная светлая тема
- 🎨 Различные фоновые изображения для каждой темы
- 🔄 Плавные переходы между темами

### Многоязычность
- 🇷🇺 Русский (основной)
- 🇬🇧 English
- 🇧🇾 Беларуская

### SEO Оптимизация
- 📊 Метатеги для всех страниц
- 🗺️ Динамический sitemap.xml
- 🤖 robots.txt
- 📈 Yandex Metrika + Webmaster
- 🔍 Структурированные данные (JSON-LD)

### Адаптивность
- 📱 Мобильная версия (от 320px)
- 💻 Планшеты и десктопы
- 🖼️ Оптимизированные изображения
- ⚡ Быстрая загрузка

## 📁 Структура проекта

```
volga-auto-premier/
├── src/
│   ├── app/              # Next.js App Router страницы
│   ├── components/       # React компоненты
│   │   ├── ui/          # Shadcn/ui компоненты
│   │   └── ...
│   ├── contexts/        # React contexts (Language, Theme)
│   ├── lib/             # Утилиты и хелперы
│   ├── data/            # Статические данные (fallback)
│   └── locales/         # Переводы (ru, en, be)
├── sanity/              # Sanity CMS конфигурация
│   ├── schemas/         # Схемы данных
│   └── lib/             # Санity клиент и запросы
├── public/              # Статические файлы
│   ├── team/           # Фото команды
│   ├── videos/         # Видео файлы
│   └── uploads/        # Загруженные изображения
└── .same/              # Документация и гайды

```

## 🎯 Основные страницы

- **/** - Главная страница с hero секцией
- **/catalog** - Каталог автомобилей из Sanity
- **/about** - О компании и команде
- **/services** - Наши услуги
- **/how-we-work** - Процесс работы
- **/reviews** - Отзывы клиентов
- **/blog** - Статьи и новости
- **/contacts** - Контакты и форма заявки
- **/faq** - Часто задаваемые вопросы

## 🛠️ Команды

```bash
# Разработка
bun run dev              # Запустить dev сервер
bun run build            # Собрать production версию
bun run start            # Запустить production сервер
bun run lint             # Проверить код линтером

# Sanity Studio
bun run sanity           # Открыть Sanity Studio на /studio
```

## 🔧 Конфигурация

### Переменные окружения (.env.local)

```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production

# Telegram Bot (опционально)
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

## 📚 Документация

Подробная документация доступна в папке `.same/`:
- **SANITY-README.md** - Настройка Sanity CMS
- **SEO-README.md** - SEO оптимизация
- **INSTALLATION.md** - Детальная установка

## 🚀 Деплой

### Netlify (рекомендуется)
```bash
# Деплой статического сайта
bun run build
netlify deploy --prod --dir=out

# Или используйте netlify.toml для автодеплоя
```

### Vercel
```bash
vercel --prod
```

## 🎨 Кастомизация

### Изменить цвета темы
Отредактируйте `src/app/globals.css`:
```css
:root {
  --brand-accent: 217 91% 35%; /* Ваш цвет */
}
```

### Добавить/изменить фоновые изображения
1. Добавьте `hero-light.jpg` и `hero-dark.jpg` в `/public/`
2. Компонент VideoBackground автоматически использует их

### Настроить анимации
Параметры анимации в `src/app/globals.css` и компонентах

## 📝 Git Коммиты

**Последний коммит:** `b7bdba282b5aa6b6a3690d011aaf24e1c14392df`

Основные изменения:
- ✨ Плавная анимация смены фона
- 🔧 Оптимизация VideoBackground
- 🐛 Устранение hydration mismatch
- 📸 Обновление фотографий команды
- ⚡ Улучшение производительности

## 🤝 Вклад

Проект разработан с использованием [Same](https://same.new) - AI-powered разработка.

## 📄 Лицензия

Все права защищены © 2025 ВОЛГА-АВТО

## 📞 Контакты

- **Телефон:** +7 846 233-98-00
- **Email:** volga.avtogroups@mail.ru
- **Мессенджеры:** WhatsApp, Telegram
- **Сайт:** [в разработке]

---

<div align="center">

**🤖 Generated with [Same](https://same.new)**

Co-Authored-By: Same <noreply@same.new>

</div>
