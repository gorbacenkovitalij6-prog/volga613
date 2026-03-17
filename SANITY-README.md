# 🎨 ВОЛГА-АВТО - Sanity CMS

✅ **Sanity CMS успешно интегрирован!**
✅ **Project ID настроен:** `9pu75wlq`

---

## 🚀 Быстрый старт:

### 1. ✅ Проект создан на Sanity.io

**Project ID:** `9pu75wlq`
**Dataset:** `production`

### 2. ✅ Project ID добавлен в .env.local

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=9pu75wlq
NEXT_PUBLIC_SANITY_DATASET=production
```

### 3. ⚠️ ВАЖНО: Настройте CORS Origins

**Это обязательный шаг!**

1. Откройте https://www.sanity.io/manage
2. Войдите в аккаунт и выберите проект (Project ID: `9pu75wlq`)
3. Перейдите в **API** → **CORS Origins**
4. Нажмите **"Add CORS origin"**
5. Добавьте: `http://localhost:3000`
6. Включите **"Allow credentials"** ✅
7. Нажмите **"Save"**

### 4. ✅ Сервер запущен

```bash
bun run dev
```

### 5. Откройте Sanity Studio

Перейдите на **http://localhost:3000/studio**

После настройки CORS вы увидите вашу админ-панель! 🎉

---

## 📋 Что можно делать в Sanity Studio:

✅ **Добавлять автомобили** - с фото, характеристиками, ценами
✅ **Управлять отзывами** - имя, город, рейтинг, текст
✅ **Писать статьи** - с rich-text редактором
✅ **Загружать изображения** - drag-and-drop
✅ **Публиковать/снимать с публикации**

---

## 🔗 Где появляются данные:

- **Автомобили** из Sanity → `/catalog`
- **Отзывы** из Sanity → `/reviews`
- **Статьи** из Sanity → `/blog`

---

## 📖 Подробная инструкция:

Смотрите `.same/sanity-setup-guide.md`

---

## ❓ Не настроили Sanity?

Не беспокойтесь! Сайт работает со статическими данными до настройки Sanity.

---

**Sanity Dashboard:** https://www.sanity.io/manage
**Документация:** https://www.sanity.io/docs
