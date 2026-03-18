'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ContactFormProps {
  title?: string;
  subtitle?: string;
  showCarLink?: boolean;
}

export default function ContactForm({
  title = '',
  subtitle = '',
  showCarLink = false,
}: ContactFormProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    carLink: '',
    message: '',
    consent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Валидация
    if (!formData.name || !formData.phone) {
      setSubmitStatus('error');
      setErrorMessage(t('contactForm.errorRequired'));
      return;
    }

    if (!formData.consent) {
      setSubmitStatus('error');
      setErrorMessage(t('contactForm.errorConsent'));
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      console.log('Sending to telegram...', {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        message: formData.message,
        carInterest: formData.carLink || formData.city,
        source: `Форма на сайте: ${title || t('contactForm.title')}`,
      });
      // Отправка данных на API
      const response = await fetch('/api/send-to-telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          message: formData.message,
          carInterest: formData.carLink || formData.city,
          source: `Форма на сайте: ${title || t('contactForm.title')}`,
        }),
      });

      console.log('API Response Status:', response.status);
      const result = await response.json();
      console.log('API Response Result:', result);

      if (response.ok && result.success) {
        setSubmitStatus('success');
        // Сброс формы через 3 секунды
        setTimeout(() => {
          setFormData({
            name: '',
            phone: '',
            email: '',
            city: '',
            carLink: '',
            message: '',
            consent: false,
          });
          setSubmitStatus('idle');
        }, 3000);
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.error || t('contactForm.errorSend'));
      }
    } catch (error) {
      console.error('Ошибка отправки формы (Network):', error);
      setSubmitStatus('error');
      setErrorMessage(t('contactForm.errorNetwork'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayTitle = title || t('contactForm.title');
  const displaySubtitle = subtitle || t('contactForm.subtitle');

  return (
    <div className="bg-card border rounded-xl md:rounded-lg px-4 py-5 md:p-8 shadow-sm md:shadow-none">
      <h2 className="text-[22px] leading-tight md:text-3xl font-bold mb-2 md:mb-2">{displayTitle}</h2>
      <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">{displaySubtitle}</p>

      <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          <div className="space-y-1.5 md:space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">{t('contactForm.name')} *</Label>
            <Input
              id="name"
              type="text"
              placeholder={t('contactForm.namePlaceholder')}
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="h-11 md:h-9 px-3.5 md:px-3 rounded-lg md:rounded-md"
            />
          </div>

          <div className="space-y-1.5 md:space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium">{t('contactForm.phone')} *</Label>
            <Input
              id="phone"
              type="tel"
              placeholder={t('contactForm.phonePlaceholder')}
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="h-11 md:h-9 px-3.5 md:px-3 rounded-lg md:rounded-md"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          <div className="space-y-1.5 md:space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">{t('contactForm.email')}</Label>
            <Input
              id="email"
              type="email"
              placeholder={t('contactForm.emailPlaceholder')}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="h-11 md:h-9 px-3.5 md:px-3 rounded-lg md:rounded-md"
            />
          </div>

          <div className="space-y-1.5 md:space-y-2">
            <Label htmlFor="city" className="text-sm font-medium">{t('contactForm.city')}</Label>
            <Input
              id="city"
              type="text"
              placeholder={t('contactForm.cityPlaceholder')}
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="h-11 md:h-9 px-3.5 md:px-3 rounded-lg md:rounded-md"
            />
          </div>
        </div>

        {showCarLink && (
          <div className="space-y-1.5 md:space-y-2">
            <Label htmlFor="carLink" className="text-sm font-medium">{t('contactForm.carLink')}</Label>
            <Input
              id="carLink"
              type="text"
              placeholder={t('contactForm.carLinkPlaceholder')}
              value={formData.carLink}
              onChange={(e) => setFormData({ ...formData, carLink: e.target.value })}
              className="h-11 md:h-9 px-3.5 md:px-3 rounded-lg md:rounded-md"
            />
          </div>
        )}

        <div className="space-y-1.5 md:space-y-2">
          <Label htmlFor="message" className="text-sm font-medium">{t('contactForm.message')}</Label>
          <Textarea
            id="message"
            placeholder={t('contactForm.messagePlaceholder')}
            rows={3}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="min-h-[80px] md:min-h-[100px] px-3.5 md:px-3 py-2.5 md:py-2 rounded-lg md:rounded-md resize-none"
          />
        </div>

        <div className="flex items-start gap-2 md:gap-2">
          <input
            id="consent"
            type="checkbox"
            required
            className="mt-0.5 md:mt-1 w-4 h-4 md:w-auto md:h-auto"
            checked={formData.consent}
            onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
          />
          <Label htmlFor="consent" className="text-xs md:text-sm text-muted-foreground cursor-pointer leading-relaxed">
            {t('contactForm.consent')}{' '}
            <a href="/privacy" className="text-primary hover:underline">
              {t('contactForm.privacy')}
            </a>
          </Label>
        </div>

        {/* Статус отправки */}
        {submitStatus === 'success' && (
          <div className="flex items-center gap-2 p-3 md:p-4 bg-green-500/10 dark:bg-green-500/20 border border-green-500/30 dark:border-green-500/50 rounded-lg text-green-700 dark:text-green-400">
            <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
            <p className="text-xs md:text-sm font-medium leading-tight">
              {t('contactForm.success')}
            </p>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="flex items-center gap-2 p-3 md:p-4 bg-red-500/10 dark:bg-red-500/20 border border-red-500/30 dark:border-red-500/50 rounded-lg text-red-700 dark:text-red-400">
            <AlertCircle className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
            <p className="text-xs md:text-sm font-medium leading-tight">{errorMessage}</p>
          </div>
        )}

        <Button
          type="submit"
          size="lg"
          className="w-full md:w-auto h-12 md:h-auto text-base font-semibold shadow-md hover:shadow-lg active:shadow-sm transition-all mt-1 md:mt-0"
          disabled={isSubmitting || submitStatus === 'success'}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {t('contactForm.submitting')}
            </>
          ) : submitStatus === 'success' ? (
            <>
              <CheckCircle2 className="w-4 h-4 mr-2" />
              {t('contactForm.submitted')}
            </>
          ) : (
            t('contactForm.submit')
          )}
        </Button>
      </form>
    </div>
  );
}
