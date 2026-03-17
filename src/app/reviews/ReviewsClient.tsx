'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AnimatedImage from '@/components/AnimatedImage';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, TrendingDown, Clock, Users, BadgeCheck, Shield, SlidersHorizontal } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import FadeInSection from '@/components/FadeInSection';
import ReviewForm from '@/components/ReviewForm';
import ReviewsSchema from '@/components/ReviewsSchema';
import { useLanguage } from '@/contexts/LanguageContext';

interface ReviewsClientProps {
  reviews: any[];
  dbBrands?: any[];
  dbModels?: any[];
  photoReviews?: string[];
}

export default function ReviewsClient({ reviews, dbBrands = [], dbModels = [], photoReviews = [] }: ReviewsClientProps) {
  const { t } = useLanguage();
  const [filterBrand, setFilterBrand] = useState('all');
  const [filterModel, setFilterModel] = useState('all');
  const [filterCity, setFilterCity] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [expandedReviews, setExpandedReviews] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Вычисляем статистику на основе переданных данных
  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
    return Number((total / reviews.length).toFixed(1));
  }, [reviews]);

  const cities = useMemo(() => {
    return Array.from(new Set(reviews.map(r => r.city))).sort();
  }, [reviews]);

  const brands = useMemo(() => {
    if (dbBrands && dbBrands.length > 0) {
      return dbBrands.map(b => b.name).filter(Boolean).sort();
    }
    return Array.from(new Set(reviews.map(r => r.brand))).filter(Boolean).sort();
  }, [reviews, dbBrands]);

  const models = useMemo(() => {
    if (dbModels && dbModels.length > 0 && filterBrand && filterBrand !== 'all') {
      const selectedBrand = dbBrands.find(b => b.name.toLowerCase() === filterBrand.toLowerCase());
      if (selectedBrand) {
        const brandModels = dbModels.filter(m => m.brand_id === selectedBrand.id);
        if (brandModels.length > 0) {
          return brandModels.map(m => m.name).filter(Boolean).sort();
        }
      }
    }

    let filteredForModel = reviews;
    if (filterBrand !== 'all') {
      filteredForModel = reviews.filter((r: any) => r.brand === filterBrand);
    }
    return Array.from(new Set(filteredForModel.map((r: any) => r.model))).filter(Boolean).sort();
  }, [reviews, filterBrand, dbBrands, dbModels]);

  // Фильтрация и сортировка
  const filteredAndSortedReviews = useMemo(() => {
    let filtered = reviews;

    if (filterBrand !== 'all') {
      filtered = filtered.filter((review) => review.brand === filterBrand);
    }

    if (filterModel !== 'all') {
      filtered = filtered.filter((review: any) => review.model === filterModel);
    }

    if (filterCity !== 'all') {
      filtered = filtered.filter((review) => review.city === filterCity);
    }

    const sorted = [...filtered];
    if (sortBy === 'newest') {
      sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortBy === 'oldest') {
      sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }

    return sorted;
  }, [reviews, filterBrand, filterModel, filterCity, sortBy]);

  const toggleExpand = (reviewId: number) => {
    setExpandedReviews((prev) =>
      prev.includes(reviewId) ? prev.filter((id) => id !== reviewId) : [...prev, reviewId]
    );
  };

  const isExpanded = (reviewId: number) => expandedReviews.includes(reviewId);

  // Функция обрезки текста по предложениям
  const truncateText = (text: string, maxLength: number = 280) => {
    if (text.length <= maxLength) return text;

    const truncated = text.slice(0, maxLength);
    const lastSentenceEnd = Math.max(
      truncated.lastIndexOf('.'),
      truncated.lastIndexOf('!'),
      truncated.lastIndexOf('?')
    );

    if (lastSentenceEnd > 0) {
      return text.slice(0, lastSentenceEnd + 1);
    }

    return truncated + '...';
  };

  const needsTruncate = (text: string) => text.length > 280;

  // Отрисовка звёзд рейтинга
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5 mb-3 md:mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${star <= Math.floor(rating)
              ? 'fill-yellow-500 text-yellow-500'
              : star === Math.ceil(rating) && rating % 1 !== 0
                ? 'fill-yellow-500 text-yellow-500 opacity-50'
                : 'text-zinc-300'
              }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col">
      {/* Schema.org разметка для SEO */}
      <ReviewsSchema reviews={reviews} />

      <Breadcrumbs items={[{ label: t('nav.reviews') }]} />

      {/* Hero секция с статистикой */}
      <section className="relative bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 dark:from-zinc-950 dark:via-black dark:to-zinc-950 text-white py-10 md:py-24 overflow-hidden">
        {/* Фоновое изображение */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/reviews_hero_bg.png"
            alt="Довольные клиенты"
            fill
            className="object-cover opacity-40 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/90 to-zinc-900/60" />
        </div>
        <div className="container-custom px-4 relative z-10">
          <FadeInSection animation="fade-up" duration={700}>
            <div className="grid lg:grid-cols-[1fr_auto] gap-4 md:gap-8 items-start">
              {/* Заголовок */}
              <div>
                <h1 className="text-xl leading-tight md:text-5xl font-bold mb-2 md:mb-4">
                  {t('reviewsPage.title')}
                </h1>
                <p className="text-sm leading-snug md:text-xl md:leading-relaxed text-white/90">
                  {t('reviewsPage.subtitle')}
                </p>
              </div>

              {/* Обновленная статистика */}
              <Card className="p-4 md:p-8 shadow-lg min-w-[280px] bg-white/95 dark:bg-zinc-800/95 backdrop-blur-sm">
                <div className="text-center">
                  {/* Крупная цифра рейтинга */}
                  <div className="flex items-center justify-center gap-2 mb-2 md:mb-3">
                    <span className="text-3xl md:text-5xl font-bold">{averageRating}</span>
                    <span className="text-lg md:text-2xl text-muted-foreground font-medium">{t('reviewsPage.rating.outOf')}</span>
                  </div>

                  {/* Звёзды */}
                  <div className="flex justify-center gap-0.5 md:gap-1 mb-2 md:mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 md:w-6 h-4 md:h-6 ${star <= Math.floor(averageRating)
                          ? 'fill-yellow-500 text-yellow-500'
                          : star === Math.ceil(averageRating) && averageRating % 1 !== 0
                            ? 'fill-yellow-500 text-yellow-500 opacity-50'
                            : 'fill-zinc-300 text-zinc-300'
                          }`}
                      />
                    ))}
                  </div>

                  {/* Количество отзывов - компактная версия на мобильных */}
                  <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-4">
                    {reviews.length} {t('reviewsPage.rating.reviews')}
                  </p>

                  {/* Проверено бейдж - компактнее на мобильных */}
                  <div className="flex items-center justify-center gap-1.5 md:gap-2 p-1.5 md:p-2 bg-green-500/20 dark:bg-green-500/30 rounded-lg">
                    <BadgeCheck className="w-3.5 md:w-5 h-3.5 md:h-5 text-green-600 dark:text-green-400" />
                    <span className="text-xs md:text-sm font-semibold text-green-600 dark:text-green-300">{t('reviewsPage.rating.verified')}</span>
                  </div>
                </div>
              </Card>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Фильтры и отзывы */}
      <section className="py-6 md:py-24">
        <div className="container-custom px-4">
          <Tabs defaultValue="text" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-2 h-12">
                <TabsTrigger value="text" className="text-sm md:text-base h-10">Текстовые отзывы</TabsTrigger>
                <TabsTrigger value="photo" className="text-sm md:text-base h-10">
                  Фотоотзывы
                  {photoReviews.length > 0 && (
                    <Badge variant="secondary" className="ml-2 text-xs">{photoReviews.length}</Badge>
                  )}
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="text" className="mt-0 outline-none">
          {/* Улучшенные фильтры */}

          {/* МОБИЛЬНАЯ ВЕРСИЯ: Компактная панель */}
          <div className="lg:hidden mb-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-muted-foreground">
                {t('reviewsPage.filters.found')} <span className="font-bold">{filteredAndSortedReviews.length}</span>
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Фильтры
              </Button>
            </div>

            {/* Раскрывающаяся панель фильтров */}
            {showFilters && (
              <Card className="p-4 shadow-sm">
                <div className="space-y-3">
                  {/* Фильтр по марке */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">{t('reviewsPage.filters.brand')}</label>
                    <Select value={filterBrand} onValueChange={(value) => { setFilterBrand(value); setFilterModel('all'); }}>
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder={t('reviewsPage.filters.allBrands')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t('reviewsPage.filters.allBrands')}</SelectItem>
                        {brands.map((brand) => (
                          <SelectItem key={brand} value={brand as string}>
                            {brand}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Фильтр по модели */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">Модель</label>
                    <Select value={filterModel} onValueChange={setFilterModel} disabled={filterBrand === 'all'}>
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="Любая модель" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Любая модель</SelectItem>
                        {models.map((model) => (
                          <SelectItem key={model as string} value={model as string}>
                            {model as string}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Фильтр по городу */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">{t('reviewsPage.filters.city')}</label>
                    <Select value={filterCity} onValueChange={setFilterCity}>
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder={t('reviewsPage.filters.allCities')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t('reviewsPage.filters.allCities')}</SelectItem>
                        {cities.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Сортировка */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">{t('reviewsPage.filters.sort')}</label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">{t('reviewsPage.filters.newest')}</SelectItem>
                        <SelectItem value="oldest">{t('reviewsPage.filters.oldest')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => setShowFilters(false)}
                    >
                      Применить
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setFilterBrand('all');
                        setFilterModel('all');
                        setFilterCity('all');
                        setSortBy('newest');
                      }}
                    >
                      Сбросить
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* ДЕСКТОПНАЯ ВЕРСИЯ: Оригинальные фильтры */}
          <Card className="hidden lg:block p-4 md:p-6 mb-10 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              {/* Фильтр по марке */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">{t('reviewsPage.filters.brand')}</label>
                <Select value={filterBrand} onValueChange={(value) => { setFilterBrand(value); setFilterModel('all'); }}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('reviewsPage.filters.allBrands')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('reviewsPage.filters.allBrands')}</SelectItem>
                    {brands.map((brand) => (
                      <SelectItem key={brand} value={brand as string}>
                        {brand as string}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Фильтр по модели */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Модель</label>
                <Select value={filterModel} onValueChange={setFilterModel} disabled={filterBrand === 'all'}>
                  <SelectTrigger>
                    <SelectValue placeholder="Любая модель" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Любая модель</SelectItem>
                    {models.map((model) => (
                      <SelectItem key={model as string} value={model as string}>
                        {model as string}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Фильтр по городу */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">{t('reviewsPage.filters.city')}</label>
                <Select value={filterCity} onValueChange={setFilterCity}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('reviewsPage.filters.allCities')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('reviewsPage.filters.allCities')}</SelectItem>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Сортировка */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">{t('reviewsPage.filters.sort')}</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">{t('reviewsPage.filters.newest')}</SelectItem>
                    <SelectItem value="oldest">{t('reviewsPage.filters.oldest')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Счетчик результатов */}
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                {t('reviewsPage.filters.found')} <span className="font-bold">{filteredAndSortedReviews.length}</span>
              </p>
            </div>
          </Card>

          {/* Сетка отзывов */}
          <div className="grid md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
            {filteredAndSortedReviews.map((review, index) => {
              const textToShow = needsTruncate(review.text)
                ? isExpanded(review.id)
                  ? review.text
                  : truncateText(review.text)
                : review.text;

              return (
                <FadeInSection
                  key={review.id}
                  animation="scale-up"
                  duration={600}
                  delay={index * 100}
                >
                  <Card
                    className="overflow-hidden hover:shadow-xl transition-shadow flex flex-col"
                  >
                    {/* Фото автомобиля - компактнее на мобильных */}
                    {review.imageUrl && (
                      <div className="aspect-[16/9] md:aspect-[16/10] bg-muted overflow-hidden">
                        <img
                          src={review.imageUrl}
                          alt={review.car}
                          loading="lazy"
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}

                    {/* Контент карточки - компактнее на мобильных */}
                    <div className="p-3 md:p-6 md:p-7 flex flex-col flex-1">
                      {/* Заголовок: марка и модель */}
                      <h3 className="text-base md:text-lg font-bold mb-1">{review.car}</h3>

                      {/* Маршрут */}
                      <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-4">
                        {review.country} → {review.city}
                      </p>

                      {/* Звёзды рейтинга - выше, ближе к заголовку */}
                      {review.rating && (
                        <div className="flex gap-0.5 mb-2 md:mb-3">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-3.5 md:w-4 h-3.5 md:h-4 ${star <= Math.floor(review.rating!)
                                ? 'fill-yellow-500 text-yellow-500'
                                : star === Math.ceil(review.rating!) && review.rating! % 1 !== 0
                                  ? 'fill-yellow-500 text-yellow-500 opacity-50'
                                  : 'text-zinc-300'
                                }`}
                            />
                          ))}
                        </div>
                      )}

                      {/* Бейджи с выгодами - компактнее */}
                      {review.highlights && (
                        <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-4">
                          {review.highlights.savings && (
                            <Badge
                              className="bg-green-500/90 hover:bg-green-500 text-white border-0 text-[10px] md:text-xs px-2 md:px-2.5 py-0.5 md:py-1 font-medium backdrop-blur-sm"
                            >
                              <TrendingDown className="w-3 md:w-3.5 h-3 md:h-3.5 mr-0.5 md:mr-1" />
                              {review.highlights.savings}
                            </Badge>
                          )}
                          {review.highlights.time && (
                            <Badge
                              className="bg-blue-500/90 hover:bg-blue-500 text-white border-0 text-[10px] md:text-xs px-2 md:px-2.5 py-0.5 md:py-1 font-medium backdrop-blur-sm"
                            >
                              <Clock className="w-3 md:w-3.5 h-3 md:h-3.5 mr-0.5 md:mr-1" />
                              {review.highlights.time}
                            </Badge>
                          )}
                          {review.highlights.repeat && (
                            <Badge
                              className="bg-purple-500/90 hover:bg-purple-500 text-white border-0 text-[10px] md:text-xs px-2 md:px-2.5 py-0.5 md:py-1 font-medium backdrop-blur-sm"
                            >
                              <Users className="w-3 md:w-3.5 h-3 md:h-3.5 mr-0.5 md:mr-1" />
                              {t('reviewsPage.highlights.repeat')}
                            </Badge>
                          )}
                        </div>
                      )}

                      {/* Текст отзыва - компактнее */}
                      <p className="text-sm md:text-base text-muted-foreground leading-snug md:leading-relaxed mb-3 md:mb-4 flex-1">
                        {textToShow}
                      </p>

                      {/* Кнопка "Показать полностью" */}
                      {needsTruncate(review.text) && (
                        <button
                          onClick={() => toggleExpand(review.id)}
                          className="text-xs md:text-sm text-primary hover:text-primary/80 font-medium mb-3 md:mb-4 text-left transition-colors"
                        >
                          {isExpanded(review.id) ? t('reviewsPage.showLess') : t('reviewsPage.showMore')}
                        </button>
                      )}

                      {/* Автор отзыва - компактная версия */}
                      <div className="border-t pt-3 md:pt-4">
                        <div className="flex items-start justify-between gap-2 mb-2 md:mb-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 md:gap-2 mb-0.5">
                              <p className="font-semibold text-sm md:text-base truncate">{review.name}</p>
                              {review.verified && (
                                <span title={t('reviewsPage.verifiedClient')} className="flex-shrink-0">
                                  <BadgeCheck className="w-3.5 md:w-5 h-3.5 md:h-5 text-blue-400 fill-blue-400" />
                                </span>
                              )}
                            </div>
                            <p className="text-xs md:text-sm text-muted-foreground">{review.city}</p>
                          </div>
                          <p className="text-[10px] md:text-xs text-muted-foreground whitespace-nowrap">
                            {new Date(review.date).toLocaleDateString('ru-RU', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </p>
                        </div>

                        {/* Бейджи статуса - компактнее */}
                        <div className="flex flex-wrap gap-1.5">
                          {review.purchaseVerified && (
                            <Badge
                              className="bg-green-500/90 hover:bg-green-500 text-white border-0 text-[10px] md:text-xs px-2 md:px-2.5 py-0.5 md:py-1 font-medium backdrop-blur-sm"
                            >
                              <BadgeCheck className="w-2.5 md:w-3 h-2.5 md:h-3 mr-0.5 md:mr-1" />
                              {t('reviewsPage.verifiedPurchase')}
                            </Badge>
                          )}
                          {review.highlights?.repeat && (
                            <Badge
                              className="bg-purple-500/90 hover:bg-purple-500 text-white border-0 text-[10px] md:text-xs px-2 md:px-2.5 py-0.5 md:py-1 font-medium backdrop-blur-sm"
                            >
                              Повторный клиент
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                </FadeInSection>
              );
            })}
          </div>

            </TabsContent>

            <TabsContent value="photo" className="mt-0 outline-none">
              {photoReviews.length > 0 ? (
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
                  {photoReviews.map((photo, index) => (
                    <FadeInSection key={index} animation="scale-up" duration={600} delay={(index % 6) * 100}>
                      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 break-inside-avoid">
                        <div className="relative group cursor-pointer">
                          <img 
                            src={photo} 
                            alt={`Фотоотзыв ${index + 1}`} 
                            loading="lazy"
                            className="w-full h-auto object-cover rounded-t-xl hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <span className="text-white font-medium bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
                              Увеличить
                            </span>
                          </div>
                        </div>
                      </Card>
                    </FadeInSection>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-muted/30 rounded-2xl border-2 border-dashed border-muted">
                  <BadgeCheck className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-bold mb-2">Фотоотзывов пока нет</h3>
                  <p className="text-muted-foreground text-center">
                    Скоро мы добавим сюда фотографии от наших довольных клиентов!
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Нижний блок CTA - объединенный на мобильных */}

          {/* МОБИЛЬНАЯ ВЕРСИЯ: Один объединенный блок */}
          <FadeInSection animation="scale-up" duration={700} delay={100} className="lg:hidden mt-8">
            <Card className="p-4 bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 border-primary/30 text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Badge className="bg-blue-500/90 hover:bg-blue-500 text-white border-0 text-[10px] px-2 py-1 font-medium backdrop-blur-sm gap-1">
                  <Clock className="w-3 h-3" />
                  6+ лет опыта
                </Badge>
                <Badge className="bg-blue-500/90 hover:bg-blue-500 text-white border-0 text-[10px] px-2 py-1 font-medium backdrop-blur-sm gap-1">
                  <Users className="w-3 h-3" />
                  500+ клиентов
                </Badge>
              </div>

              <h2 className="text-lg font-bold mb-2 leading-tight">
                Поделитесь опытом или начните свой
              </h2>
              <p className="text-sm text-muted-foreground mb-4 leading-snug">
                Уже купили автомобиль? Расскажите другим. Хотите такой же сервис? Начните прямо сейчас.
              </p>

              <div className="space-y-2">
                <Button size="default" asChild className="w-full h-10">
                  <Link href="/reviews#review-form">Оставить отзыв</Link>
                </Button>
                <Button size="default" variant="outline" asChild className="w-full h-10">
                  <Link href="/contacts#form">Начать подбор</Link>
                </Button>
              </div>
            </Card>
          </FadeInSection>

          {/* ДЕСКТОПНАЯ ВЕРСИЯ: Два раздельных блока */}
          <div className="hidden lg:grid md:grid-cols-2 gap-6 mt-16">
            {/* Оставить отзыв */}
            <FadeInSection animation="fade-right" duration={700} delay={100}>
              <Card className="p-5 md:p-8 bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 border-primary/30 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold mb-3">
                  {t('reviewsPage.cta.bought.title')}
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {t('reviewsPage.cta.bought.desc')}
                </p>
                <Button size="lg" asChild className="w-full md:w-auto">
                  <Link href="/reviews#review-form">{t('reviewsPage.cta.bought.button')}</Link>
                </Button>
              </Card>
            </FadeInSection>

            {/* Начать подбор */}
            <FadeInSection animation="fade-left" duration={700} delay={200}>
              <Card className="p-5 md:p-8 bg-gradient-to-br from-blue-500/5 to-blue-500/10 dark:from-blue-500/10 dark:to-blue-500/20 border-blue-500/30 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold mb-3">
                  {t('reviewsPage.cta.want.title')}
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {t('reviewsPage.cta.want.desc')}
                </p>
                <Button size="lg" asChild className="w-full md:w-auto">
                  <Link href="/contacts#form">{t('reviewsPage.cta.want.button')}</Link>
                </Button>
              </Card>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Форма для отзыва - только на десктопе */}
      <section id="review-form" className="hidden lg:block py-6 md:py-24 bg-muted/30 scroll-mt-20">
        <div className="container-custom px-4">
          <div className="max-w-3xl mx-auto">
            <ReviewForm />
          </div>
        </div>
      </section>
    </div>
  );
}
