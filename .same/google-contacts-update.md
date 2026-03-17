# Обновление контактных данных в Google поиске

## ✅ Что было исправлено (Версия 17)

### Проблема
В поисковой выдаче Google отображался **старый номер телефона** `+7 (916) 462-23-49`

### Решение
Обновлены контактные данные в Schema.org разметке и метаданных

---

## 🔧 Что было изменено

### 1. Файл `src/components/SEO.tsx`

**До:**
```tsx
telephone: '+7 (916) 462-23-49',
email: 'info@volga-auto-premier.ru',
address: {
  streetAddress: 'ул. Примерная, д. 123',
  addressLocality: 'Москва',
  // ...
}
```

**После:**
```tsx
import { CONTACTS } from '@/config/contacts';

telephone: CONTACTS.phone,              // +7 (917) 145-47-92
email: CONTACTS.email,                  // volga-auto.premier@mail.ru
address: {
  streetAddress: CONTACTS.address,      // Актуальный адрес
  addressLocality: CONTACTS.city,       // Тольятти
  addressRegion: CONTACTS.region,       // Самарская область
  postalCode: CONTACTS.postalCode,      // 445000
  // ...
}
```

### 2. Файл `src/lib/metadata.ts`

**Обновлено описание страницы Контакты:**
```typescript
contacts: {
  title: 'Контакты ВОЛГА-АВТО - связаться с нами',
  description:
    'Контакты ВОЛГА-АВТО: телефон +7 (917) 145-47-92, WhatsApp, Telegram.
     Офис в Тольятти и Гродно. Работаем Пн-Пт 09:00-19:00, Сб 10:00-16:00.
     Бесплатная консультация по автопригону.',
  // ...
}
```

---

## 📊 Откуда Google берет контактные данные

### 1. Schema.org разметка (приоритет #1)

Google использует структурированные данные:

```json
{
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  "name": "ВОЛГА-АВТО",
  "telephone": "+7 (917) 145-47-92",
  "email": "volga-auto.premier@mail.ru",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "г. Тольятти, ул. Маршала Жукова, д. 54",
    "addressLocality": "Тольятти",
    "addressRegion": "Самарская область",
    "postalCode": "445000",
    "addressCountry": "RU"
  }
}
```

✅ **Обновлено** в `SEO.tsx`

### 2. Meta description

Google также индексирует описания страниц:

```html
<meta name="description" content="Контакты ВОЛГА-АВТО: телефон +7 (917) 145-47-92..." />
```

✅ **Обновлено** в `metadata.ts`

### 3. Контент страницы

Google индексирует видимый текст на странице:

```html
<p>Телефон: +7 (917) 145-47-92</p>
```

✅ **Обновлено** автоматически через `CONTACTS` конфигурацию

---

## ⏰ Когда Google обновит данные?

### Обычное время
- **1-4 недели** - автоматическая переиндексация
- **До 2-3 месяцев** - для всех регионов и кэшей

### Как ускорить

#### Через Google Search Console:

1. Откройте https://search.google.com/search-console
2. Выберите ваш сайт
3. Перейдите в "Проверка URL"
4. Введите: `https://volga-auto-premier.com/contacts`
5. Нажмите "Запросить индексирование"

Это сократит время до **1-7 дней**!

---

## 🎯 Преимущества централизации

### Теперь все данные в одном месте

**Файл:** `src/config/contacts.ts`

Чтобы изменить контакты:
1. Откройте `src/config/contacts.ts`
2. Измените нужные поля в объекте `CONTACTS`
3. Изменения автоматически применятся:
   - ✅ На всех страницах сайта
   - ✅ В Schema.org разметке (SEO)
   - ✅ В метаданных (descriptions)
   - ✅ В Footer и Header
   - ✅ В формах обратной связи

**Больше не нужно искать и менять в разных местах!**

---

## 📝 Технические детали

### Где используются контакты

```
src/config/contacts.ts  ← Единый источник данных
    ↓
    ├─→ src/components/SEO.tsx         (Schema.org)
    ├─→ src/components/JsonLd.tsx      (JSON-LD)
    ├─→ src/lib/metadata.ts            (Meta descriptions)
    ├─→ src/components/Header.tsx      (Шапка сайта)
    ├─→ src/components/Footer.tsx      (Футер)
    ├─→ src/components/ContactForm.tsx (Формы)
    └─→ src/app/contacts/page.tsx      (Страница контактов)
```

### Что синхронизируется автоматически

- Телефон основной
- Телефон дополнительный
- Email
- WhatsApp номер
- Telegram
- Адрес юридический
- Адрес офиса
- Режим работы
- Координаты для карт

---

## ✅ Чек-лист проверки

После обновления убедитесь:

- [ ] **Файл contacts.ts** - содержит актуальные данные
- [ ] **SEO.tsx** - импортирует CONTACTS
- [ ] **metadata.ts** - описание contacts обновлено
- [ ] **Сайт** - отображает новые данные
- [ ] **Исходный код** - Schema.org содержит новый номер
- [ ] **Google Search Console** - запрошена переиндексация

---

## 🔍 Как проверить Schema.org

### 1. Валидатор Schema.org

https://validator.schema.org/

Введите URL: `https://volga-auto-premier.com`

Проверьте поле `telephone` в разделе `AutoDealer`

### 2. Rich Results Test

https://search.google.com/test/rich-results

Убедитесь что номер телефона правильный

### 3. Исходный код страницы

1. Откройте сайт
2. Нажмите Ctrl+U (View Source)
3. Найдите `application/ld+json`
4. Проверьте `"telephone": "+7 (917) 145-47-92"`

---

## 📌 Важно!

### Google не обновляет мгновенно

1. **Кэш Google** - хранит старые данные
2. **Индексация** - происходит периодически
3. **CDN кэш** - может показывать старую версию

### Подождите 1-4 недели

Или ускорьте через Google Search Console!

---

## 🚀 Итого

**Что сделано:**
- ✅ Обновлен номер телефона в Schema.org
- ✅ Обновлен email и адрес
- ✅ Синхронизированы все данные с CONTACTS
- ✅ Обновлены метаданные страниц
- ✅ Изменения отправлены на GitHub

**Результат:**
- После переиндексации Google будет показывать новый номер **+7 (917) 145-47-92**
- Все данные синхронизированы и берутся из одного источника
- Легко обновлять контакты в будущем

---

**Дата:** 19 ноября 2025
**Версия:** 17
**Коммит:** `e5a6c14`
