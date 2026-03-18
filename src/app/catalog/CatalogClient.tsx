'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AnimatedImage from '@/components/AnimatedImage';
import { Button } from '@/components/ui/button';
import { type CarItem } from '@/data/cars';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import Breadcrumbs from '@/components/Breadcrumbs';
import FadeInSection from '@/components/FadeInSection';
import { useLanguage } from '@/contexts/LanguageContext';
import { Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { CONTACTS } from '@/config/contacts';

const CARS_PER_PAGE = 9;

interface CatalogClientProps {
  cars: CarItem[];
  dbBrands?: any[];
  dbModels?: any[];
}

export default function CatalogClient({ cars, dbBrands = [], dbModels = [] }: CatalogClientProps) {
  const { t } = useLanguage();
  const [filters, setFilters] = useState({
    year: '',
    priceFrom: '',
    priceTo: '',
  });

  const [sortBy, setSortBy] = useState('price-asc');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Функция перевода типа привода
  const getDriveTypeLabel = (driveType: string): string => {
    const driveTypeMap: { [key: string]: string } = {
      'fwd': 'Передний',
      'rwd': 'Задний',
      'awd': 'Полный',
    };
    return driveTypeMap[driveType] || driveType;
  };



  const uniqueYears = useMemo(() => {
    return Array.from(new Set(cars.map(car => car.year))).filter(Boolean).sort((a, b) => b - a);
  }, [cars]);






  // Фильтрация автомобилей
  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      if (filters.year && filters.year !== 'all') {
        if (car.year < parseInt(filters.year)) return false;
      }
      if (filters.priceFrom) {
        if (car.price < parseInt(filters.priceFrom)) return false;
      }
      if (filters.priceTo) {
        if (car.price > parseInt(filters.priceTo)) return false;
      }
      return true;
    });
  }, [cars, filters]);

  // Сортировка автомобилей
  const sortedCars = useMemo(() => {
    const sorted = [...filteredCars];
    switch (sortBy) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'year-desc':
        return sorted.sort((a, b) => b.year - a.year);
      case 'year-asc':
        return sorted.sort((a, b) => a.year - b.year);
      default:
        return sorted;
    }
  }, [filteredCars, sortBy]);

  // Пагинация
  const totalPages = Math.ceil(sortedCars.length / CARS_PER_PAGE);
  const paginatedCars = useMemo(() => {
    const startIndex = (currentPage - 1) * CARS_PER_PAGE;
    return sortedCars.slice(startIndex, startIndex + CARS_PER_PAGE);
  }, [sortedCars, currentPage]);

  // Сброс на первую страницу при изменении фильтров
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy]);

  const resetFilters = () => {
    setFilters({
      year: '',
      priceFrom: '',
      priceTo: '',
    });
  };

  // Компонент фильтров (вертикальный для sidebar)
  const FilterSidebar = () => (
    <div className="space-y-6">


      {/* Год */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">{t('catalogPage.yearFrom')}</Label>
        <Select
          value={filters.year}
          onValueChange={(value) => setFilters({ ...filters, year: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder={t('catalogPage.any')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('catalogPage.any')}</SelectItem>
            {uniqueYears.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Цена от */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">{t('catalogPage.priceFrom')}</Label>
        <Input
          type="number"
          placeholder="От 1 000 000"
          value={filters.priceFrom}
          onChange={(e) => setFilters({ ...filters, priceFrom: e.target.value })}
        />
      </div>

      {/* Цена до */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">{t('catalogPage.priceTo')}</Label>
        <Input
          type="number"
          placeholder="До 5 000 000"
          value={filters.priceTo}
          onChange={(e) => setFilters({ ...filters, priceTo: e.target.value })}
        />
      </div>





      <Button variant="outline" onClick={resetFilters} className="w-full">
        {t('catalogPage.resetAll')}
      </Button>
    </div>
  );

  // Компонент пагинации
  const Pagination = () => {
    if (totalPages <= 1) return null;

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pageNumbers.push(i);
      } else if (
        pageNumbers[pageNumbers.length - 1] !== '...'
      ) {
        pageNumbers.push('...');
      }
    }

    return (
      <div className="flex items-center justify-center gap-2 mt-12">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline ml-2">Предыдущая</span>
        </Button>

        <div className="flex items-center gap-1">
          {pageNumbers.map((page, index) => (
            page === '...' ? (
              <span key={`ellipsis-${index}`} className="px-3 py-2 text-muted-foreground">
                ...
              </span>
            ) : (
              <Button
                key={page}
                variant={currentPage === page ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentPage(page as number)}
                className="w-10 h-10"
              >
                {page}
              </Button>
            )
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          <span className="hidden sm:inline mr-2">Следующая</span>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    );
  };

  return (
    <div className="flex flex-col">
      <Breadcrumbs items={[{ label: t('nav.catalog') }]} />

      {/* Hero секция */}
      <section className="relative bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 dark:from-zinc-950 dark:via-black dark:to-zinc-950 text-white py-10 md:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/catalog_hero_bg.png"
            alt="Автосалон"
            fill
            className="object-cover opacity-40 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/90 to-zinc-900/60" />
        </div>
        <div className="container-custom px-4 relative z-10">
          <FadeInSection animation="fade-down" duration={700}>
            <div className="max-w-3xl">
              <h1 className="text-2xl leading-tight md:text-5xl font-bold mb-3 md:mb-6">{t('catalogPage.title')}</h1>
              <p className="text-sm md:text-xl text-white/90">
                {t('catalogPage.subtitle')}
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Каталог с фильтрами */}
      <section className="py-4 md:py-24 bg-background">
        <div className="container-custom px-4">
          {/* МОБИЛЬНАЯ версия: Кнопка фильтров */}
          <div className="lg:hidden mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="flex-1 gap-2">
                    <Filter className="w-4 h-4" />
                    Фильтры
                  </Button>
                </SheetTrigger>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="flex-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price-asc">Цена: по возрастанию</SelectItem>
                    <SelectItem value="price-desc">Цена: по убыванию</SelectItem>
                    <SelectItem value="year-desc">Год: новые</SelectItem>
                    <SelectItem value="year-asc">Год: старые</SelectItem>
                  </SelectContent>
                </Select>

                <SheetContent side="bottom" className="h-[85vh] overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Фильтры</SheetTitle>
                    <SheetDescription>
                      Настройте параметры для поиска автомобиля
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6">
                    {FilterSidebar()}
                    <SheetClose asChild>
                      <Button className="w-full mt-6">
                        Применить
                      </Button>
                    </SheetClose>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            <p className="text-sm text-muted-foreground">
              Найдено: <span className="font-bold text-foreground">{sortedCars.length}</span>
            </p>
          </div>

          {/* ДЕСКТОПНАЯ версия: Sidebar + Контент */}
          <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-8">
            {/* SIDEBAR с фильтрами */}
            <aside className="hidden lg:block">
              <FadeInSection animation="fade-right" duration={600}>
                <Card className="p-6 sticky top-4">
                  <h2 className="text-xl font-bold mb-6">{t('catalogPage.filters')}</h2>
                  {FilterSidebar()}
                </Card>
              </FadeInSection>
            </aside>

            {/* КОНТЕНТ с машинами */}
            <div>
              {/* Результаты и сортировка */}
              <div className="hidden lg:flex mb-8 items-center justify-between">
                <p className="text-muted-foreground font-medium">
                  Найдено: <span className="font-bold text-foreground">{sortedCars.length}</span>
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Сортировка:</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[220px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="price-asc">Цена: по возрастанию</SelectItem>
                      <SelectItem value="price-desc">Цена: по убыванию</SelectItem>
                      <SelectItem value="year-desc">Год: новые</SelectItem>
                      <SelectItem value="year-asc">Год: старые</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Сетка автомобилей */}
              {paginatedCars.length === 0 ? (
                <div className="text-center py-20">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                    <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <p className="text-xl font-semibold mb-2">Ничего не найдено</p>
                  <p className="text-muted-foreground mb-6">Попробуйте изменить фильтры</p>
                  <Button variant="outline" onClick={resetFilters}>
                    Сбросить фильтры
                  </Button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedCars.map((car, index) => (
                      <FadeInSection
                        key={car.slug || car.id || index}
                        animation="scale-up"
                        duration={600}
                        delay={index * 50}
                      >
                        <Card className="group overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                          <div className="relative">
                            <AnimatedImage
                              src={car.imageUrl}
                              alt={`${car.make} ${car.model}`}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              containerClassName="aspect-[4/3]"
                            />
                            <Badge
                              className={`absolute top-4 right-4 ${
                                car.status === 'available' ? 'bg-green-500/90 hover:bg-green-500' :
                                car.status === 'on_order' ? 'bg-blue-500/90 hover:bg-blue-500' :
                                car.status === 'reserved' ? 'bg-orange-500/90 hover:bg-orange-500' :
                                car.status === 'sold' ? 'bg-zinc-500/90 hover:bg-zinc-500' :
                                'bg-zinc-500/90 hover:bg-zinc-500'
                                } text-white border-0 px-3 py-1 text-sm font-medium backdrop-blur-sm`}
                            >
                              {car.status === 'available' ? 'В наличии' :
                               car.status === 'on_order' ? 'Под заказ' :
                               car.status === 'reserved' ? 'Бронь' :
                               car.status === 'sold' ? 'Продана' : car.status}
                            </Badge>
                          </div>

                          <div className="p-6">
                            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                              {car.make} {car.model}
                            </h3>

                            <div className="text-2xl font-bold text-primary mb-4">
                              {car.price.toLocaleString()} ₽
                            </div>

                            <div className="space-y-2 mb-5">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground/80">
                                <span className="w-2 h-2 rounded-full bg-muted-foreground/50"></span>
                                <span>{car.year} год • {car.mileage.toLocaleString()} км</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground/80">
                                <span className="w-2 h-2 rounded-full bg-muted-foreground/50"></span>
                                <span>{car.fuel} • {car.transmission}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground/80">
                                <span className="w-2 h-2 rounded-full bg-muted-foreground/50"></span>
                                <span>{getDriveTypeLabel(car.body)}</span>
                              </div>
                            </div>

                            <Button className="w-full bg-primary text-white" asChild>
                              <a href={`${CONTACTS.telegram}?text=${encodeURIComponent(`Здравствуйте! Меня интересует автомобиль: ${car.make} ${car.model} (${car.year} г., ${car.mileage.toLocaleString('ru-RU')} км, ${car.price.toLocaleString('ru-RU')} ₽)`)}`} target="_blank" rel="noopener noreferrer">
                                Заказать
                              </a>
                            </Button>
                          </div>
                        </Card>
                      </FadeInSection>
                    ))}
                  </div>

                  {/* Пагинация */}
                  <Pagination />
                </>
              )}
            </div>
          </div>

          {/* CTA: Не нашли? */}
          <Card className="p-8 mt-12 text-center bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold mb-4">Не нашли подходящий автомобиль?</h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Оставьте заявку и мы подберем автомобиль по вашим параметрам в течение 24 часов
            </p>
            <Button size="lg" asChild>
              <Link href="/contacts#form">Оставить заявку на подбор</Link>
            </Button>
          </Card>
        </div>
      </section>
    </div>
  );
}
