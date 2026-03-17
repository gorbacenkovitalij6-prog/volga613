'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, X, Send, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CONTACTS } from '@/config/contacts';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Скрываем виджет когда футер виден
          setIsVisible(!entry.isIntersecting);
          // Закрываем popup если он открыт
          if (entry.isIntersecting) {
            setIsOpen(false);
          }
        });
      },
      {
        threshold: 0.1, // Срабатывает когда 10% футера видно
      }
    );

    observer.observe(footer);

    return () => {
      observer.disconnect();
    };
  }, []);

  const contactOptions = [
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      description: 'Напишите нам в WhatsApp',
      action: () => window.open(CONTACTS.whatsapp, '_blank'),
      color: 'bg-green-500 hover:bg-green-600',
    },
    {
      icon: Send,
      title: 'Telegram',
      description: 'Свяжитесь через Telegram',
      action: () => window.open(CONTACTS.telegram, '_blank'),
      color: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      icon: Phone,
      title: 'Позвонить',
      description: CONTACTS.phone,
      action: () => window.location.href = CONTACTS.phoneHref,
      color: 'bg-primary hover:bg-primary/90',
    },
    {
      icon: Mail,
      title: 'Email',
      description: CONTACTS.email,
      action: () => window.location.href = CONTACTS.emailHref,
      color: 'bg-zinc-600 hover:bg-zinc-700',
    },
  ];

  return (
    <>
      {/* Главная кнопка чата */}
      {isVisible && (
        <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
          <Button
            size="lg"
            onClick={() => setIsOpen(!isOpen)}
            className="h-12 w-12 md:h-14 md:w-14 rounded-full shadow-lg hover:shadow-xl transition-shadow"
            aria-label="Открыть чат"
          >
            {isOpen ? (
              <X className="h-5 w-5 md:h-6 md:w-6" />
            ) : (
              <MessageCircle className="h-5 w-5 md:h-6 md:w-6" />
            )}
          </Button>
        </div>
      )}

      {/* Popup окно с вариантами связи */}
      {isOpen && isVisible && (
        <div className="fixed bottom-20 right-4 md:bottom-24 md:right-6 z-50 w-[calc(100vw-2rem)] sm:w-80 max-w-sm">
          <Card className="p-4 shadow-2xl">
            <h3 className="text-lg font-bold mb-2">Свяжитесь с нами</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Выберите удобный способ связи
            </p>

            <div className="space-y-2">
              {contactOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => {
                    option.action();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-lg border hover:bg-accent transition-colors text-left"
                >
                  <div className={`h-10 w-10 rounded-full ${option.color} flex items-center justify-center flex-shrink-0`}>
                    <option.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm">{option.title}</div>
                    <div className="text-xs text-muted-foreground truncate">
                      {option.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t">
              <p className="text-xs text-center text-muted-foreground">
                Мы отвечаем в течение 30 минут<br />
                Пн-Пт: 9:00-20:00, Сб-Вс: 10:00-18:00
              </p>
            </div>
          </Card>
        </div>
      )}

      {/* Оверлей для закрытия при клике вне окна */}
      {isOpen && isVisible && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/20 z-40 backdrop-blur-sm"
        />
      )}
    </>
  );
}
