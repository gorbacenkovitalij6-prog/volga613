'use client';

import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { CONTACTS } from '@/config/contacts';

export default function FloatingContactWidget() {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    // Создаем IntersectionObserver для отслеживания футера
    const footer = document.getElementById('main-footer');

    if (!footer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Когда футер появляется в зоне видимости - скрываем виджет
          // Когда футер выходит из зоны видимости - показываем виджет
          setIsHidden(entry.isIntersecting);
        });
      },
      {
        // Срабатывает когда хотя бы 10% футера видно
        threshold: 0.1,
        // С небольшим отступом сверху
        rootMargin: '-50px 0px 0px 0px',
      }
    );

    observer.observe(footer);

    // Очистка при размонтировании компонента
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Только для мобильных устройств */}
      <div className="md:hidden">
        <a
          href={CONTACTS.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            fixed right-4 bottom-20 z-50
            flex items-center justify-center
            w-14 h-14 rounded-full
            bg-primary text-primary-foreground
            shadow-lg hover:shadow-xl
            transition-all duration-300 ease-out
            ${isHidden
              ? 'opacity-0 translate-y-4 scale-90 pointer-events-none'
              : 'opacity-100 translate-y-0 scale-100'
            }
          `}
          aria-label="Написать в WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
        </a>
      </div>
    </>
  );
}
