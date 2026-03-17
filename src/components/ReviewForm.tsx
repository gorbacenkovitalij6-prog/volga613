'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { Loader2, CheckCircle2, AlertCircle, Star } from 'lucide-react';

export default function ReviewForm() {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    car: '',
    email: '',
    rating: 0,
    text: '',
    photoUrl: '',
    consent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Валидация
    if (!formData.name || !formData.city || !formData.car || !formData.rating || !formData.text) {
      setSubmitStatus('error');
      setErrorMessage('Пожалуйста, заполните все обязательные поля');
      return;
    }

    if (!formData.consent) {
      setSubmitStatus('error');
      setErrorMessage('Необходимо согласие на обработку данных');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Формируем сообщение для отзыва
      let reviewMessage = `
📝 НОВЫЙ ОТЗЫВ

👤 Имя: ${formData.name}
🏙️ Город: ${formData.city}
🚗 Автомобиль: ${formData.car}
⭐ Оценка: ${'★'.repeat(formData.rating)}${'☆'.repeat(5 - formData.rating)} (${formData.rating}/5)
      `.trim();

      if (formData.email) {
        reviewMessage += `\n📧 Email: ${formData.email}`;
      }

      reviewMessage += `\n\n💬 Текст отзыва:\n${formData.text}`;

      if (formData.photoUrl) {
        reviewMessage += `\n\n📸 Фото автомобиля: ${formData.photoUrl}`;
      }

      reviewMessage += `\n\n—————————————————\nДата: ${new Date().toLocaleString('ru-RU')}`;

      // Отправка данных на API
      const response = await fetch('/api/send-to-telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: 'Отзыв с сайта',
          message: reviewMessage,
          source: 'Форма отзывов',
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus('success');
        // Сброс формы через 3 секунды
        setTimeout(() => {
          setFormData({
            name: '',
            city: '',
            car: '',
            email: '',
            rating: 0,
            text: '',
            photoUrl: '',
            consent: false,
          });
          setSubmitStatus('idle');
        }, 3000);
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.error || 'Произошла ошибка при отправке');
      }
    } catch (error) {
      console.error('Ошибка отправки формы:', error);
      setSubmitStatus('error');
      setErrorMessage('Не удалось отправить отзыв. Пожалуйста, попробуйте позже.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-card border rounded-lg p-6 md:p-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-2">Оставить отзыв</h2>
      <p className="text-muted-foreground mb-6">
        Поделитесь своим опытом покупки автомобиля через ВОЛГА-АВТО
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="review-name">Ваше имя *</Label>
            <Input
              id="review-name"
              type="text"
              placeholder="Например: Иван П."
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="review-city">Город *</Label>
            <Input
              id="review-city"
              type="text"
              placeholder="Ваш город"
              required
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="review-car">Автомобиль *</Label>
          <Input
            id="review-car"
            type="text"
            placeholder="Например: BMW X5 2021"
            required
            value={formData.car}
            onChange={(e) => setFormData({ ...formData, car: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="review-email">Email (опционально)</Label>
          <Input
            id="review-email"
            type="email"
            placeholder="example@mail.ru"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <p className="text-xs text-muted-foreground">
            Укажите email, если хотите получить ответ от нашей команды
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="review-photo">Фото автомобиля (опционально)</Label>
          <Input
            id="review-photo"
            type="url"
            placeholder="https://example.com/photo.jpg"
            value={formData.photoUrl}
            onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
          />
          <p className="text-xs text-muted-foreground">
            Вставьте ссылку на фото вашего автомобиля (если есть на облачном хранилище)
          </p>
        </div>

        <div className="space-y-2">
          <Label>Ваша оценка *</Label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setFormData({ ...formData, rating: star })}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= (hoveredStar || formData.rating)
                      ? 'fill-yellow-500 text-yellow-500'
                      : 'text-zinc-300'
                  }`}
                />
              </button>
            ))}
            {formData.rating > 0 && (
              <span className="ml-2 text-sm text-muted-foreground self-center">
                {formData.rating} из 5
              </span>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="review-text">Ваш отзыв *</Label>
          <Textarea
            id="review-text"
            placeholder="Расскажите о вашем опыте покупки автомобиля через ВОЛГА-АВТО..."
            rows={6}
            required
            value={formData.text}
            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
          />
          <p className="text-xs text-muted-foreground">
            Пожалуйста, опишите ваш опыт: как проходил процесс подбора, доставки, какое впечатление осталось от работы с нами.
          </p>
        </div>

        <div className="flex items-start space-x-2">
          <input
            id="review-consent"
            type="checkbox"
            required
            className="mt-1"
            checked={formData.consent}
            onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
          />
          <Label htmlFor="review-consent" className="text-sm text-muted-foreground cursor-pointer">
            Я согласен на обработку персональных данных и публикацию отзыва на сайте в соответствии с{' '}
            <a href="/privacy" className="text-primary hover:underline">
              политикой конфиденциальности
            </a>
          </Label>
        </div>

        {/* Статус отправки */}
        {submitStatus === 'success' && (
          <div className="flex items-center gap-2 p-4 bg-green-500/10 dark:bg-green-500/20 border border-green-500/30 dark:border-green-500/50 rounded-lg text-green-700 dark:text-green-400">
            <CheckCircle2 className="w-5 h-5" />
            <p className="text-sm font-medium">
              Спасибо за ваш отзыв! Мы проверим его и опубликуем в ближайшее время.
            </p>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="flex items-center gap-2 p-4 bg-red-500/10 dark:bg-red-500/20 border border-red-500/30 dark:border-red-500/50 rounded-lg text-red-700 dark:text-red-400">
            <AlertCircle className="w-5 h-5" />
            <p className="text-sm font-medium">{errorMessage}</p>
          </div>
        )}

        <Button
          type="submit"
          size="lg"
          className="w-full md:w-auto"
          disabled={isSubmitting || submitStatus === 'success'}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Отправка...
            </>
          ) : submitStatus === 'success' ? (
            <>
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Отправлено
            </>
          ) : (
            'Отправить отзыв'
          )}
        </Button>
      </form>
    </div>
  );
}
