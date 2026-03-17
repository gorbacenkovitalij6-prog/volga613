'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';

type AnimationType =
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'scale-up'
  | 'zoom-in'
  | 'slide-up'
  | 'slide-down';

interface FadeInSectionProps {
  children: ReactNode;
  delay?: number;
  animation?: AnimationType;
  duration?: number;
  className?: string;
}

export default function FadeInSection({
  children,
  delay = 0,
  animation = 'fade-up',
  duration = 600,
  className = ''
}: FadeInSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Отключаем наблюдение после появления
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1, // Триггер когда 10% элемента видно
        rootMargin: '0px 0px -50px 0px' // Начинать чуть раньше
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [isMounted]);

  const getAnimationClass = () => {
    if (!isMounted) return ''; // No animation classes during SSR

    switch (animation) {
      case 'fade-up':
        return isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8';
      case 'fade-down':
        return isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8';
      case 'fade-left':
        return isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8';
      case 'fade-right':
        return isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8';
      case 'scale-up':
        return isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95';
      case 'zoom-in':
        return isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90';
      case 'slide-up':
        return isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12';
      case 'slide-down':
        return isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-12';
      default:
        return isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8';
    }
  };

  return (
    <div
      ref={ref}
      className={`${getAnimationClass()} ${isMounted ? 'transition-all' : ''} ${className}`}
      style={isMounted ? {
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
      } : undefined}
    >
      {children}
    </div>
  );
}
