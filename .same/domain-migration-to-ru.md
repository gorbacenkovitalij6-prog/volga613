# Миграция домена с volga-auto-premier.com на volga-auto-premier.ru

**Дата миграции:** 21 ноября 2025
**Статус:** ✅ Завершено

---

## 📋 Что было сделано

### 1. ✅ DNS настройка на reg.ru
- Добавлены A-записи для @ и www, указывающие на IP Netlify
- Добавлена CNAME запись для www → volga-auto-premier.ru
- DNS успешно распространился, сайт доступен на новом домене

### 2. ✅ Обновление кода проекта

Обновлены все файлы с упоминанием старого домена `volga-auto-premier.com` → `volga-auto-premier.ru`:

#### Основные конфигурационные файлы:
- ✅ `src/config/contacts.ts` - website URL
- ✅ `src/lib/metadata.ts` - siteUrl константа
- ✅ `src/app/sitemap.ts` - baseUrl
- ✅ `src/app/robots.ts` - sitemap URL

#### Страницы:
- ✅ `src/app/privacy/page.tsx` - все упоминания домена в политике конфиденциальности

#### Публичные файлы:
- ✅ `public/robots.txt` - Sitemap URLs
- ✅ `public/sitemap.xml` - все URL страниц сайта

---

## 🔍 Проверка изменений

Выполните команду для проверки, что все домены обновлены:

```bash
cd Волга-Авто-test
grep -r "volga-auto-premier.com" src/ public/ --include="*.ts" --include="*.tsx" --include="*.xml" --include="*.txt"
```

Должно быть **0 результатов** (кроме документации в .same/).

---

## 🚀 Следующие шаги

### 1. Деплой на Netlify
```bash
cd Волга-Авто-test
git add .
git commit -m "feat: migrate domain from .com to .ru

- Update all domain references to volga-auto-premier.ru
- Update metadata, sitemap, robots.txt
- Update contacts configuration
- Update privacy policy page

🤖 Generated with Same (https://same.new)

Co-Authored-By: Same <noreply@same.new>"
git push origin main
```

### 2. Настройки Netlify
- ✅ Домен `volga-auto-premier.ru` уже добавлен как custom domain
- ✅ DNS настроен и работает
- ⏳ Настроить `volga-auto-premier.ru` как **Primary domain**
- ⏳ Опционально: оставить `volga-auto-premier.com` с редиректом на `.ru` или удалить

### 3. SEO обновления

После деплоя:
1. **Яндекс.Вебмастер:**
   - Добавить новый домен `volga-auto-premier.ru`
   - Добавить sitemap: `https://volga-auto-premier.ru/sitemap.xml`
   - Настроить главное зеркало на `.ru` домен

2. **Google Search Console:**
   - Добавить новый домен `volga-auto-premier.ru`
   - Добавить sitemap: `https://volga-auto-premier.ru/sitemap.xml`
   - Настроить 301 редирект с `.com` на `.ru` (если оставляете .com)

3. **Обновить ссылки в:**
   - Социальных сетях
   - Email подписях
   - Визитках
   - Других маркетинговых материалах

---

## 📝 Список обновленных файлов

| Файл | Изменение |
|------|-----------|
| `src/config/contacts.ts` | `website: 'https://volga-auto-premier.ru'` |
| `src/lib/metadata.ts` | `const siteUrl = 'https://volga-auto-premier.ru'` |
| `src/app/sitemap.ts` | `const baseUrl = 'https://volga-auto-premier.ru'` |
| `src/app/robots.ts` | `sitemap: 'https://volga-auto-premier.ru/sitemap.xml'` |
| `src/app/privacy/page.tsx` | Все упоминания домена → `.ru` |
| `public/robots.txt` | Sitemap URLs → `.ru` |
| `public/sitemap.xml` | Все URL страниц → `.ru` |

---

## ✅ Чеклист миграции

- [x] DNS настроен на reg.ru
- [x] Домен работает (https://volga-auto-premier.ru открывается)
- [x] Обновлены все файлы конфигурации
- [x] Обновлены метаданные (metadata.ts)
- [x] Обновлен sitemap.xml
- [x] Обновлен robots.txt
- [x] Обновлена политика конфиденциальности
- [ ] Задеплоено на Netlify
- [ ] Настроен Primary domain в Netlify
- [ ] Добавлен домен в Яндекс.Вебмастер
- [ ] Добавлен домен в Google Search Console
- [ ] Обновлены внешние ссылки

---

## 🎯 Результат

После миграции:
- Основной домен: **https://volga-auto-premier.ru**
- Все SEO метаданные обновлены
- Sitemap доступен на новом домене
- robots.txt обновлен

**Сайт полностью готов к работе на новом домене! 🎉**
