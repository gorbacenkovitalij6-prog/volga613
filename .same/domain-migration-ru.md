# Миграция на домен volga-auto-premier.ru

## ✅ Выполнено в коде


### Обновленные файлы:

1. **src/lib/metadata.ts** - SEO метаданные
2. **src/app/sitemap.ts** - генерация sitemap
3. **src/app/robots.ts** - robots.txt
4. **src/config/contacts.ts** - контакты
5. **src/app/privacy/page.tsx** - политика конфиденциальности (5 упоминаний)
6. **public/robots.txt** - статический robots
7. **public/sitemap.xml** - статический sitemap

## 📋 Что нужно сделать в Netlify и reg.ru:

### 1. Netlify → Добавить домен
- Add domain → `volga-auto-premier.ru`
- Set up Netlify DNS
- Скопировать nameserver'ы

### 2. reg.ru → Настроить DNS
- Изменить DNS-серверы на nameserver'ы от Netlify

### 3. Netlify → Установить основной домен
- Set as primary domain для .ru

### 4. Netlify → Удалить .com (после проверки)
- Remove domain для .com

## ⏱️ Время: DNS пропагация 1-24 часа, SSL 5-30 минут
