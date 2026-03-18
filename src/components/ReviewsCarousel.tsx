'use client';

import * as React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Star } from 'lucide-react';
import FadeInSection from '@/components/FadeInSection';

// Фолбэки картинок
const fallbackImages = [
  '/avatars/1.jpg',
  '/avatars/2.jpg',
  '/avatars/3.jpg',
  '/avatars/4.jpg',
  '/avatars/5.jpg',
  '/avatars/6.jpg',
];

// Фолбэки текстов
const defaultReviews = [
  {
    rating: 5,
    text: "Помогли подобрать идеальный вариант из Германии. Автомобиль в отличном состоянии, все документы в порядке.",
    name: "Алексей М.",
    city: "Москва",
    car: "Toyota Prius",
  },
  {
    rating: 5,
    text: "Профессиональный подход на всех этапах. Сэкономил около 500 тысяч рублей по сравнению с покупкой в России.",
    name: "Дмитрий К.",
    city: "Санкт-Петербург",
    car: "Toyota RAV4",
  },
  {
    rating: 5,
    text: "Это уже второй автомобиль через ВОЛГА-АВТО. Ребята знают свое дело, все четко и в срок.",
    name: "Игорь С.",
    city: "Краснодар",
    car: "Hyundai Santa Fe",
  },
  {
    rating: 5,
    text: "Отличный сервис! Быстро организовали покупку и оформили все документы. Рекомендую всем.",
    name: "Сергей М.",
    city: "Екатеринбург",
    car: "Kia Sorento",
  }
];

interface ReviewsCarouselProps {
  photoReviews?: string[];
  reviews?: any[];
  titleOverride?: string;
}

export function ReviewsCarousel({ photoReviews = [], reviews = [], titleOverride }: ReviewsCarouselProps) {
  // База для текстов
  const textBase = reviews.length > 0 ? reviews : defaultReviews;
  
  // База для картинок
  const imageBase = photoReviews.length > 0 ? photoReviews : fallbackImages;

  // Комбинируем текст и фото. Приоритет отдаем фото из БД отзыва.
  // Если его нет, берем фото из пула локальных фотографий (зацикливая их).
  const combinedReviews = textBase.map((review, index) => ({
    ...review,
    image: (typeof review.imageUrl === 'string' && review.imageUrl.trim() !== '')
      ? review.imageUrl
      : imageBase[index % imageBase.length]
  }));

  return (
    <section className="py-10 md:py-16 bg-white text-black overflow-hidden relative border-y border-zinc-100">
      {/* Декоративная сетка на фоне */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: 'linear-gradient(#000000 1px, transparent 1px), linear-gradient(90deg, #000000 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
      
      <div className="container-custom px-4 relative z-10">
        <FadeInSection animation="fade-up" duration={600}>
          {titleOverride !== " " && (
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-10 gap-6">
              <div>
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-tight mb-3">
                  {titleOverride || 'ОТЗЫВЫ КЛИЕНТОВ'}
                </h2>
                <p className="text-zinc-500 text-sm md:text-base">
                  Нам доверяют сотни автовладельцев по всей России
                </p>
              </div>
            </div>
          )}
        </FadeInSection>

        <FadeInSection animation="fade-up" duration={700} delay={200}>
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {combinedReviews.map((review, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-[48%] lg:basis-[32%] xl:basis-[31%]">
                  <div className="p-1 h-full">
                    <Card className="h-full bg-white border-zinc-200 text-black flex flex-col hover:border-zinc-300 hover:shadow-xl transition-all duration-300 overflow-hidden group rounded-xl">
                      {/* Верхняя часть - Фото */}
                      <div className="relative w-full aspect-[4/3] bg-zinc-100 overflow-hidden shrink-0">
                        <img
                          src={review.image}
                          alt={`Отзыв клиента ${review.name}`}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                      
                      {/* Нижняя часть - Текст */}
                      <CardContent className="p-6 flex flex-col flex-1 z-10 relative">
                        {/* Звезды */}
                        <div className="flex gap-1 mb-4">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= (review.rating || 5)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'fill-zinc-200 text-zinc-200'
                              }`}
                            />
                          ))}
                        </div>
                        
                        {/* Текст отзыва */}
                        <p className="text-sm text-zinc-600 mb-6 flex-1 leading-relaxed italic">
                          "{review.text}"
                        </p>
                        
                        {/* Информация о клиенте */}
                        <div className="pt-4 border-t border-zinc-100 mt-auto">
                          <div className="font-bold text-black mb-1">
                            {review.name}
                          </div>
                          {(review.city || review.car) && (
                            <div className="text-xs text-zinc-500">
                              {review.city}{review.city && review.car ? ' • ' : ''}{review.car}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Навигация */}
            <div className="absolute -top-16 right-4 hidden md:flex items-center gap-3">
              <CarouselPrevious className="relative inset-0 translate-y-0 h-12 w-12 rounded-full border border-zinc-200 bg-white hover:bg-zinc-100 hover:text-black text-zinc-600 transition-colors disabled:opacity-50 shadow-sm" />
              <CarouselNext className="relative inset-0 translate-y-0 h-12 w-12 rounded-full border border-zinc-200 bg-white hover:bg-zinc-100 hover:text-black text-zinc-600 transition-colors disabled:opacity-50 shadow-sm" />
            </div>
            <div className="flex md:hidden justify-center items-center gap-4 mt-6">
              <CarouselPrevious className="relative inset-0 translate-y-0 h-12 w-12 rounded-full border border-zinc-200 bg-white hover:bg-zinc-100 hover:text-black text-zinc-600 transition-colors disabled:opacity-50 shadow-sm" />
              <CarouselNext className="relative inset-0 translate-y-0 h-12 w-12 rounded-full border border-zinc-200 bg-white hover:bg-zinc-100 hover:text-black text-zinc-600 transition-colors disabled:opacity-50 shadow-sm" />
            </div>
          </Carousel>
        </FadeInSection>
      </div>
    </section>
  );
}
