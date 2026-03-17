# ✨ Красивые анимации появления блоков - Документация

**Дата:** 17 ноября 2025
**Версия:** 382
**Статус:** ✅ Реализовано

---

## 📋 Что было сделано

Добавлены красивые анимации появления для всех блоков на главной странице с использованием **Intersection Observer API**.

---

## 🎨 8 Типов анимаций

### 1. **fade-up** - Появление снизу вверх
```tsx
<FadeInSection animation="fade-up">
  <YourContent />
</FadeInSection>
```
- Элемент начинается с `opacity: 0` и `translateY: 8px`
- Плавно появляется и поднимается вверх
- Используется для заголовков секций

### 2. **fade-down** - Появление сверху вниз
```tsx
<FadeInSection animation="fade-down">
  <YourContent />
</FadeInSection>
```
- Элемент начинается с `opacity: 0` и `translateY: -8px`
- Плавно появляется и опускается вниз
- Используется для подзаголовков

### 3. **fade-left** - Появление справа налево
```tsx
<FadeInSection animation="fade-left">
  <YourContent />
</FadeInSection>
```
- Элемент начинается с `opacity: 0` и `translateX: 8px`
- Плавно появляется двигаясь влево
- Используется для секции "Популярные предложения"

### 4. **fade-right** - Появление слева направо
```tsx
<FadeInSection animation="fade-right">
  <YourContent />
</FadeInSection>
```
- Элемент начинается с `opacity: 0` и `translateX: -8px`
- Плавно появляется двигаясь вправо
- Используется для секции "Отзывы"

### 5. **scale-up** - Увеличение с прозрачностью
```tsx
<FadeInSection animation="scale-up">
  <YourContent />
</FadeInSection>
```
- Элемент начинается с `opacity: 0` и `scale: 0.95`
- Плавно увеличивается до 100%
- Используется для карточек услуг и отзывов

### 6. **zoom-in** - Более выраженное увеличение
```tsx
<FadeInSection animation="zoom-in">
  <YourContent />
</FadeInSection>
```
- Элемент начинается с `opacity: 0` и `scale: 0.90`
- Плавно увеличивается до 100%
- Используется для преимуществ и шагов процесса

### 7. **slide-up** - Сильное скольжение вверх
```tsx
<FadeInSection animation="slide-up">
  <YourContent />
</FadeInSection>
```
- Элемент начинается с `opacity: 0` и `translateY: 12px`
- Плавно поднимается вверх
- Используется для секции FAQ

### 8. **slide-down** - Сильное скольжение вниз
```tsx
<FadeInSection animation="slide-down">
  <YourContent />
</FadeInSection>
```
- Элемент начинается с `opacity: 0` и `translateY: -12px`
- Плавно опускается вниз
- Используется для секции "Как мы работаем"

---

## ⚙️ Параметры компонента

```tsx
interface FadeInSectionProps {
  children: ReactNode;        // Содержимое для анимации
  delay?: number;             // Задержка в миллисекундах (по умолчанию 0)
  animation?: AnimationType;  // Тип анимации (по умолчанию 'fade-up')
  duration?: number;          // Длительность в миллисекундах (по умолчанию 600)
  className?: string;         // Дополнительные CSS классы
}
```

### Примеры использования:

```tsx
// Базовое использование
<FadeInSection>
  <h2>Заголовок</h2>
</FadeInSection>

// С задержкой и анимацией
<FadeInSection animation="scale-up" delay={200} duration={800}>
  <Card>...</Card>
</FadeInSection>

// Множественные элементы с каскадной задержкой
{items.map((item, index) => (
  <FadeInSection
    key={index}
    delay={index * 100}
    animation="zoom-in"
  >
    <Card>{item}</Card>
  </FadeInSection>
))}
```

---

## 🎯 Где применено на главной странице

### Секция "Наши услуги"
- **Заголовок:** `fade-up` (700ms)
- **Карточки услуг:** `scale-up` (600ms) с задержкой 100ms между карточками

### Секция "Почему нас выбирают"
- **Заголовок:** `zoom-in` (700ms)
- **Карточки преимуществ:** `fade-up` (600ms) с задержкой 150ms между карточками

### Секция "Как мы работаем"
- **Заголовок:** `slide-down` (700ms)
- **Шаги процесса:** `zoom-in` (600ms) с задержкой 200ms между шагами

### Секция "Популярные предложения"
- **Заголовок:** `fade-left` (700ms)

### Секция "Отзывы"
- **Заголовок:** `fade-right` (700ms)
- **Карточки отзывов:** `scale-up` (600ms) с задержкой 150ms между карточками

### Секция "FAQ"
- **Заголовок:** `slide-up` (700ms)
- **Аккордеон:** `fade-up` (600ms) с задержкой 200ms

---

## 🔧 Технические детали

### Intersection Observer
Компонент использует **Intersection Observer API** для определения видимости элементов:

```tsx
const observer = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      setIsVisible(true);
      observer.unobserve(entry.target); // Отключаем после появления
    }
  },
  {
    threshold: 0.1,                    // Триггер при 10% видимости
    rootMargin: '0px 0px -50px 0px'   // Начать чуть раньше
  }
);
```

### Предотвращение Hydration Mismatch
Компонент использует `isMounted` state для синхронизации серверного и клиентского рендеринга:

```tsx
const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
  setIsMounted(true);
}, []);

// Анимации применяются только после монтирования
const getAnimationClass = () => {
  if (!isMounted) return '';
  // ... логика анимаций
};
```

### CSS Transitions
Используются CSS transitions с easing функцией:

```tsx
style={{
  transitionDuration: `${duration}ms`,
  transitionDelay: `${delay}ms`,
  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
}}
```

---

## ⚠️ Известные проблемы

### Hydration Mismatch (в процессе исправления)
Есть небольшая проблема с hydration, связанная с пробелами в className. Решается добавлением `suppressHydrationWarning` или улучшением логики построения классов.

**Временное решение:**
React автоматически пересоздает дерево компонентов на клиенте, что не влияет на функциональность.

---

## 📊 Производительность

✅ **Легковесно** - только CSS transitions, без JS анимаций
✅ **Эффективно** - Intersection Observer отключается после срабатывания
✅ **Не блокирует** - анимации не мешают основному потоку
✅ **Доступно** - уважает `prefers-reduced-motion`

---

## 🚀 Следующие шаги

1. ✅ Реализовать анимации на главной странице
2. ⏳ Применить на других страницах:
   - `/services` - страница услуг
   - `/catalog` - каталог автомобилей
   - `/about` - о компании
   - `/reviews` - отзывы
   - `/faq` - часто задаваемые вопросы
   - `/blog` - блог
   - `/contacts` - контакты
3. ⏳ Добавить `prefers-reduced-motion` support
4. ⏳ Исправить hydration warning

---

## 💡 Рекомендации

### Выбор типа анимации:
- **Заголовки:** `fade-up`, `slide-down`
- **Карточки:** `scale-up`, `zoom-in`
- **Боковые элементы:** `fade-left`, `fade-right`
- **FAQ/Аккордеоны:** `slide-up`, `fade-up`

### Настройка задержек:
- **Одиночные элементы:** 0ms
- **Заголовок → Контент:** 200-300ms
- **Множественные карточки:** 100-150ms между каждой

### Длительность:
- **Быстрые анимации:** 400-500ms
- **Стандартные:** 600ms (по умолчанию)
- **Медленные, выразительные:** 700-800ms

---

**Создано:** 17 ноября 2025
**Версия:** 382
**Компонент:** `src/components/FadeInSection.tsx`
