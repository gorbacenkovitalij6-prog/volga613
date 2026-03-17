# Настройка темы сайта ВОЛГА-АВТО

## Текущая реализация

### По умолчанию: светлая тема

При первом посещении сайта пользователь видит **светлую тему**. Это настроено в двух местах:

1. **В `src/app/layout.tsx`** (скрипт в `<head>`):
```javascript
var theme = localStorage.getItem('theme');
var initialTheme = theme || 'light'; // Светлая тема по умолчанию

if (initialTheme === 'dark') {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}
```

2. **В `src/contexts/ThemeContext.tsx`**:
```typescript
const savedTheme = localStorage.getItem('theme') as Theme;
const initialTheme = savedTheme || 'light'; // Светлая тема по умолчанию
```

### Как работает сохранение темы

1. **Первое посещение**:
   - Тема не сохранена в `localStorage`
   - Используется светлая тема (`'light'`)
   - Тема НЕ сохраняется автоматически в `localStorage`

2. **Пользователь переключает тему**:
   - Вызывается `setTheme(newTheme)` или `toggleTheme()`
   - Тема сохраняется в `localStorage.setItem('theme', newTheme)`
   - Применяется к `document.documentElement`

3. **Повторное посещение**:
   - Загружается сохраненная тема из `localStorage`
   - Применяется ДО загрузки React (через скрипт в `<head>`)
   - Затем подтверждается в React компоненте

### Преимущества такого подхода

✅ **Светлая тема по умолчанию** - более привычна для большинства пользователей

✅ **Нет "мигания"** - тема применяется до загрузки React

✅ **Запоминается выбор** - только если пользователь явно изменил тему

✅ **Не засоряет localStorage** - для пользователей, которые не меняли тему

### Где можно переключить тему

Кнопка переключения темы находится в хедере сайта (иконка луны/солнца).

### Файлы, отвечающие за тему

1. `src/contexts/ThemeContext.tsx` - React контекст для управления темой
2. `src/app/layout.tsx` - Инициализация темы до загрузки React
3. `src/components/Header.tsx` - Кнопка переключения темы (предположительно)
4. `tailwind.config.ts` - Конфигурация темной темы для Tailwind CSS
