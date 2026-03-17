'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, CheckCircle2, AlertCircle, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function HeroCostForm() {
  const { t } = useLanguage();
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

    if (!formData.name || !formData.phone || !formData.budget) {
      setSubmitStatus('error');
      setErrorMessage(t('contactForm.errorRequired') || 'Пожалуйста, заполните все обязательные поля');
      return;
    }

    if (!formData.consent) {
      setSubmitStatus('error');
      setErrorMessage(t('contactForm.errorConsent') || 'Необходимо согласие на обработку данных');
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
          message: `Запрос на расчет стоимости. Бюджет: ${formData.budget}`,
          source: 'Форма "Рассчитать стоимость" (Главный экран)',
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus('success');
        setTimeout(() => {
          setFormData({ name: '', phone: '', budget: '', consent: false });
          setSubmitStatus('idle');
        }, 3000);
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.error || t('contactForm.errorSend') || 'Произошла ошибка при отправке');
      }
    } catch (error) {
      console.error('Ошибка отправки формы:', error);
      setSubmitStatus('error');
      setErrorMessage(t('contactForm.errorNetwork') || 'Ошибка сети. Попробуйте позже.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#1C1F26]/95 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 w-full max-w-[420px] shadow-2xl relative overflow-hidden">
      {/* Световой блик сверху */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      
      <h2 className="text-2xl md:text-[28px] font-bold text-white mb-3">Рассчитать стоимость</h2>
      <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
        Оставьте заявку, и наш эксперт свяжется с вами для детального расчёта.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Имя */}
        <div className="space-y-1.5">
          <Label htmlFor="hero-name" className="text-sm font-medium text-zinc-300">Как к вам обращаться?</Label>
          <Input
            id="hero-name"
            type="text"
            placeholder="Ваше имя"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="h-12 bg-[#14151A] border-transparent text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-blue-500 rounded-xl"
          />
        </div>

        {/* Телефон */}
        <div className="space-y-1.5">
          <Label htmlFor="hero-phone" className="text-sm font-medium text-zinc-300">Контактный телефон</Label>
          <div className="flex gap-2">
            <div className="h-12 w-[60px] shrink-0 bg-[#14151A] rounded-xl flex items-center justify-center text-zinc-300 font-medium border border-transparent">
              +7
            </div>
            <Input
              id="hero-phone"
              type="tel"
              placeholder="(999) 000-00-00"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="h-12 bg-[#14151A] border-transparent text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-blue-500 rounded-xl w-full"
            />
          </div>
        </div>

        {/* Бюджет */}
        <div className="space-y-1.5">
          <Label htmlFor="hero-budget" className="text-sm font-medium text-zinc-300">Планируемый бюджет</Label>
          <Select value={formData.budget} onValueChange={(val) => setFormData({ ...formData, budget: val })}>
            <SelectTrigger className="h-12 bg-[#14151A] border-transparent text-white focus:ring-1 focus:ring-blue-500 rounded-xl">
              <SelectValue placeholder="Выберите бюджет" />
            </SelectTrigger>
            <SelectContent className="bg-[#1C1F26] border-white/10 text-white rounded-xl">
              <SelectItem value="До 1.5 млн ₽">До 1.5 млн ₽</SelectItem>
              <SelectItem value="1.5 - 2.5 млн ₽">1.5 - 2.5 млн ₽</SelectItem>
              <SelectItem value="2.5 - 4 млн ₽">2.5 - 4 млн ₽</SelectItem>
              <SelectItem value="Свыше 4 млн ₽">Свыше 4 млн ₽</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Статус отправки */}
        {submitStatus === 'success' && (
          <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <p className="text-xs font-medium">Заявка успешно отправлена!</p>
          </div>
        )}
        {submitStatus === 'error' && (
          <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <p className="text-xs font-medium">{errorMessage}</p>
          </div>
        )}

        {/* Кнопка отправки */}
        <Button
          type="submit"
          className="w-full h-12 mt-2 bg-[#254388] hover:bg-[#1f3770] text-white font-semibold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
          disabled={isSubmitting || submitStatus === 'success'}
        >
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : submitStatus === 'success' ? (
            <>
              <CheckCircle2 className="w-5 h-5 mr-1" />
              Отправлено
            </>
          ) : (
            <>
              Получить расчет стоимости
              <ChevronRight className="w-4 h-4 text-white/70" />
            </>
          )}
        </Button>

        {/* Согласие */}
        <div className="flex items-start gap-3 mt-4 pt-2">
          <div className="relative flex items-start pt-0.5">
            <input
              id="hero-consent"
              type="checkbox"
              required
              className="peer sr-only"
              checked={formData.consent}
              onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
            />
            <div className="w-4 h-4 rounded-full border border-zinc-600 peer-checked:bg-blue-500 peer-checked:border-blue-500 flex flex-shrink-0 justify-center items-center cursor-pointer transition-all">
              <svg className="w-2.5 h-2.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
          </div>
          <Label htmlFor="hero-consent" className="text-[11px] text-zinc-500 cursor-pointer leading-relaxed">
            Я даю согласие на обработку персональных данных и соглашаюсь с <a href="/privacy" className="underline hover:text-zinc-300">политикой конфиденциальности</a>.
          </Label>
        </div>
      </form>
    </div>
  );
}
