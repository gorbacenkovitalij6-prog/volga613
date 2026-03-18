'use client';

import { Card } from '@/components/ui/card';
import Breadcrumbs from '@/components/Breadcrumbs';
import FadeInSection from '@/components/FadeInSection';
import { ReviewsCarousel } from '@/components/ReviewsCarousel';
import { useLanguage } from '@/contexts/LanguageContext';
import ReviewsSchema from '@/components/ReviewsSchema';

interface ReviewsClientProps {
  reviews: any[];
  dbBrands?: any[];
  dbModels?: any[];
  photoReviews?: string[];
}

export default function ReviewsClient({ reviews, dbBrands = [], dbModels = [], photoReviews = [] }: ReviewsClientProps) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col bg-[#0A0A0E] text-white min-h-[90vh]">
      <ReviewsSchema reviews={reviews} />

      <section className="pt-8 pb-4">
         <div className="container-custom px-4">
             <Breadcrumbs items={[{ label: t('nav.reviews') }]} />
         </div>
      </section>

      <section className="pt-4 pb-16 md:pb-24">
        <div className="container-custom px-4 text-center">
          <FadeInSection animation="fade-up" duration={700}>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4 text-white">
              ОТЗЫВЫ КЛИЕНТОВ
            </h1>
            <p className="text-zinc-400 max-w-2xl mx-auto mb-12 md:mb-20 text-sm md:text-base">
              Мы гордимся доверием наших клиентов. Узнайте, что говорят о работе с ЛТС.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* ТЕКСТОВЫЕ ОТЗЫВЫ КЛИЕНТОВ (Карусель) */}
      <div className="pb-20 relative">
        <ReviewsCarousel photoReviews={photoReviews} reviews={reviews} titleOverride="ТЕКСТОВЫЕ ОТЗЫВЫ КЛИЕНТОВ" />
      </div>

    </div>
  );
}
