'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Video, Loader2 } from 'lucide-react';
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
  const [videoReviews, setVideoReviews] = useState<any[]>([]);
  const [loadingVideos, setLoadingVideos] = useState(true);

  useEffect(() => {
    fetch('/api/admin/video-reviews')
      .then(res => res.json())
      .then(json => {
         if (json.success) setVideoReviews(json.data.filter((r: any) => r.is_published));
      })
      .catch((e) => {
         console.error('Ошибка загрузки видео', e);
      })
      .finally(() => {
         setLoadingVideos(false);
      });
  }, []);

  const getYoutubeEmbedUrl = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11)
      ? `https://www.youtube.com/embed/${match[2]}`
      : url;
  };

  return (
    <div className="flex flex-col bg-[#0A0A0E] text-white min-h-[90vh]">
      <ReviewsSchema reviews={reviews} />

      <section className="pt-8 pb-4">
         <div className="container-custom px-4">
             <Breadcrumbs items={[{ label: t('nav.reviews') }]} />
         </div>
      </section>

      <section className="pt-4 pb-16 md:pb-24 border-b border-white/[0.05]">
        <div className="container-custom px-4 text-center">
          <FadeInSection animation="fade-up" duration={700}>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4 text-white">
              ОТЗЫВЫ КЛИЕНТОВ
            </h1>
            <p className="text-zinc-400 max-w-2xl mx-auto mb-12 md:mb-20 text-sm md:text-base">
              Мы гордимся доверием наших клиентов. Узнайте, что говорят о работе с ЛТС.
            </p>

            {/* ВИДЕООТЗЫВЫ */}
            {loadingVideos ? (
               <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-zinc-500" /></div>
            ) : videoReviews.length > 0 ? (
               <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left border border-white/5 rounded-2xl p-6 md:p-8 bg-white/[0.02]">
                 {videoReviews.map((vr) => {
                    const embedUrl = getYoutubeEmbedUrl(vr.video_url);
                    const isYoutube = embedUrl.includes('youtube.com/embed');
                    return (
                      <Card key={vr.id} className="overflow-hidden bg-[#12121A] border-white/10 flex flex-col group">
                        <div className="aspect-video w-full bg-black relative">
                          {isYoutube ? (
                            <iframe 
                              src={embedUrl} 
                              className="w-full h-full border-0 absolute inset-0" 
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                              allowFullScreen 
                            />
                          ) : (
                            <video src={vr.video_url} controls className="w-full h-full object-cover absolute inset-0" />
                          )}
                        </div>
                        {vr.title && (
                          <div className="p-4 md:p-5">
                            <h3 className="font-bold text-white text-base md:text-lg">{vr.title}</h3>
                          </div>
                        )}
                      </Card>
                    );
                 })}
               </div>
            ) : (
              <div className="border border-white/5 border-dashed rounded-2xl p-12 md:p-24 bg-white/[0.02] flex flex-col items-center justify-center max-w-4xl mx-auto">
                <div className="w-16 h-16 rounded-full bg-white/5 flex flex-col items-center justify-center mb-6">
                   <Video className="w-8 h-8 text-zinc-500" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">Пока нет видео-отзывов</h3>
                <p className="text-zinc-500 mb-8 max-w-md mx-auto text-sm md:text-base">Добавьте первое видео через админ панель</p>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" asChild>
                  <Link href="/admin/video-reviews">Перейти в админ панель</Link>
                </Button>
              </div>
            )}
          </FadeInSection>
        </div>
      </section>

      {/* ТЕКСТОВЫЕ ОТЗЫВЫ КЛИЕНТОВ (Карусель) */}
      <div className="relative">
        <ReviewsCarousel photoReviews={photoReviews} reviews={reviews} titleOverride="ТЕКСТОВЫЕ ОТЗЫВЫ КЛИЕНТОВ" />
      </div>

    </div>
  );
}
