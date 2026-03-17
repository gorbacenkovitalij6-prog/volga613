'use client';

import * as React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import FadeInSection from '@/components/FadeInSection';

export function ConsultationBlock() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    budget: '',
    consent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      setSubmitStatus('error');
      setErrorMessage('Пожалуйста, заполните обязательные поля');
      return;
    }

    if (!formData.consent) {
      setSubmitStatus('error');
      setErrorMessage('Необходимо согласие с условиями');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/send-to-telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          message: `Бюджет: ${formData.budget || 'Не указан'}`,
          source: 'Блок консультации',
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus('success');
        setTimeout(() => {
          setFormData({
            name: '',
            phone: '',
            budget: '',
            consent: false,
          });
          setSubmitStatus('idle');
        }, 3000);
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.error || 'Ошибка при отправке заявки');
      }
    } catch (error) {
      console.error('Ошибка отправки формы:', error);
      setSubmitStatus('error');
      setErrorMessage('Сетевая ошибка, попробуйте позже');
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    'Объясним, как проходит процесс покупки и поставки авто',
    'Подберем подходящие модели под ваш бюджет и задачи',
    'Рассчитаем стоимость авто с учетом всех расходов',
    'Расскажем об актуальных акциях и возможных скидках',
    'Ответим на все вопросы по покупке, доставке и растаможке',
  ];

  return (
    <section className="py-10 md:py-16 bg-[#0A0B10] text-white">
      <div className="container-custom px-4">
        <FadeInSection animation="fade-up" duration={700}>
          <div className="bg-[#12141D] rounded-2xl border border-white/5 p-6 md:p-10 lg:p-14 shadow-2xl relative overflow-hidden">
            
            {/* Декоративное свечение */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 relative z-10">
              {/* Левая часть: Текст */}
              <div className="flex flex-col justify-center">
                <div className="text-blue-500 font-bold tracking-wider text-xs md:text-sm uppercase mb-4">
                  ИНДИВИДУАЛЬНЫЙ ПОДХОД
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-none mb-8">
                  ПОЛУЧИТЕ БЕСПЛАТНУЮ<br />
                  КОНСУЛЬТАЦИЮ<br />
                  <span className="text-blue-500">ПО ПОДБОРУ<br />АВТОМОБИЛЯ</span>
                </h2>
                <ul className="space-y-4">
                  {benefits.map((text, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                      <span className="text-sm md:text-base text-zinc-300 leading-snug">
                        {text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Правая часть: Форма */}
              <div className="flex flex-col justify-center">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      type="text"
                      placeholder="Ваше имя"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="h-14 bg-[#1A1C25] border-transparent focus-visible:ring-blue-500 focus-visible:border-blue-500 text-white placeholder:text-zinc-600 rounded-xl px-5 text-base"
                    />
                  </div>
                  
                  <div className="flex">
                    <div className="flex items-center justify-center bg-[#252836] border-r border-[#1e202b] rounded-l-xl px-4 h-14 font-medium text-white shrink-0">
                      RU +7
                    </div>
                    <Input
                      type="tel"
                      placeholder="(000) 000-00-00"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="h-14 bg-[#1A1C25] border-transparent focus-visible:ring-blue-500 focus-visible:border-blue-500 text-white placeholder:text-zinc-600 rounded-l-none rounded-r-xl px-5 text-base flex-1"
                    />
                  </div>

                  <div>
                    <Select value={formData.budget} onValueChange={(value) => setFormData({ ...formData, budget: value })}>
                      <SelectTrigger className="h-14 bg-[#1A1C25] border-transparent text-white focus:ring-blue-500 rounded-xl px-5 text-base">
                        <SelectValue placeholder="Выберите бюджет" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1A1C25] border-zinc-700 text-white">
                        <SelectItem value="до 2 млн ₽">до 2 000 000 ₽</SelectItem>
                        <SelectItem value="2 - 3 млн ₽">2 000 000 - 3 000 000 ₽</SelectItem>
                        <SelectItem value="3 - 5 млн ₽">3 000 000 - 5 000 000 ₽</SelectItem>
                        <SelectItem value="от 5 млн ₽">от 5 000 000 ₽</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-14 bg-[#1D4ED8] hover:bg-blue-600 text-white rounded-xl text-base font-medium transition-colors mt-2"
                    disabled={isSubmitting || submitStatus === 'success'}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                        Отправка...
                      </>
                    ) : submitStatus === 'success' ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 mr-3" />
                        Заявка принята
                      </>
                    ) : (
                      'Оставить заявку'
                    )}
                  </Button>

                  <div className="flex items-center gap-3 pt-2">
                    <input
                      id="consent-hero"
                      type="checkbox"
                      required
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="w-4 h-4 rounded border-zinc-600 bg-[#1A1C25] text-blue-500 focus:ring-blue-500/20 focus:ring-offset-0"
                    />
                    <Label htmlFor="consent-hero" className="text-xs text-zinc-500 cursor-pointer font-normal">
                      Я согласился с условиями пользовательского соглашения
                    </Label>
                  </div>

                  {submitStatus === 'error' && (
                    <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errorMessage}
                    </div>
                  )}
                </form>
              </div>
            </div>
            
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
