import { supabase } from './supabase';
import { REVIEWS as STATIC_REVIEWS } from '@/data/reviews';
import { CARS as STATIC_CARS } from '@/data/cars';
import { BLOG_ARTICLES as STATIC_ARTICLES } from '@/data/blog-articles';

// Отзывы
export async function getAllReviews() {
  try {
    const { data, error } = await supabase.from('reviews').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    if (data) {
      return data.map((review: any) => {
        const parts = review.car_name ? review.car_name.split(' ') : [];
        const brand = parts.length > 0 ? parts[0] : 'Другое';
        const model = parts.length > 1 ? parts.slice(1).join(' ') : 'Неизвестно';
        return {
          id: review.id,
          name: review.author_name || 'Неизвестно',
          city: 'Россия', // Поле города отсутствует в БД, используем дефолт
          car: review.car_name || 'Автомобиль',
          brand: brand,
          model: model,
          date: new Date(review.created_at).toISOString().split('T')[0],
          rating: Number(review.rating) || 5,
          text: review.review_text || '',
          imageUrl: review.photo_url || null,
          country: 'Европа',
          verified: review.is_published,
          purchaseVerified: review.is_published,
        };
      });
    }
  } catch (error) {
    console.error('Ошибка загрузки отзывов из Supabase:', error);
  }
  return [];
}

// Автомобили
export async function getAllCars() {
  try {
    const { data, error } = await supabase.from('cars').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    if (data && data.length > 0) {
      return data.map((car: any) => {
        // Парсинг первого изображения, если images хранится как массив
        let firstImage = car.main_image;
        if (!firstImage && car.images && Array.isArray(car.images) && car.images.length > 0) {
          firstImage = car.images[0];
        } else if (!firstImage && typeof car.images === 'string') {
          try {
            const parsed = JSON.parse(car.images);
            if (Array.isArray(parsed) && parsed.length > 0) firstImage = parsed[0];
          } catch (e) { }
        }

        return {
          id: car.id,
          status: (car.status === 'под заказ' ? 'order' : 'available') as 'available' | 'order',
          make: car.brand || 'Неизвестно',
          model: car.model || '',
          year: Number(car.year) || 2020,
          mileage: Number(car.mileage) || 0,
          fuel: car.fuel_type || 'Бензин',
          transmission: car.transmission || 'Автомат',
          body: car.body_type?.toLowerCase() || 'sedan',
          price: Number(car.price) || 0,
          imageUrl: firstImage ? firstImage.replace(/ /g, '%20') : '/images/placeholder.svg',
          title: car.title || `${car.brand} ${car.model}`,
          slug: car.slug || String(car.id),
          description: car.full_description || car.short_description || '',
          originCountry: car.location_country || 'Европа',
          city: car.location_city,
        };
      });
    }
  } catch (error) {
    console.error('Ошибка загрузки автомобилей из Supabase:', error);
  }
  return [];
}

// Словари (марки, модели, цвета)
export async function getCarBrands() {
  try {
    const { data, error } = await supabase.from('car_brands').select('*').order('name', { ascending: true });
    if (error) throw error;
    if (data) return data;
  } catch (error) {
    console.error('Ошибка загрузки марок из Supabase:', error);
  }
  return [];
}

export async function getCarModels() {
  try {
    const { data, error } = await supabase.from('car_models').select('*').order('name', { ascending: true });
    if (error) throw error;
    if (data) return data;
  } catch (error) {
    console.error('Ошибка загрузки моделей из Supabase:', error);
  }
  return [];
}

export async function getCarColors() {
  try {
    const { data, error } = await supabase.from('car_colors').select('*').order('name_ru', { ascending: true });
    if (error) throw error;
    if (data) return data;
  } catch (error) {
    console.error('Ошибка загрузки цветов из Supabase:', error);
  }
  return [];
}

// Статьи
export async function getAllArticles() {
  // Для статей оставляем статику, так как их нет в Supabase
  return STATIC_ARTICLES;
}

export async function getArticleBySlug(slug: string) {
  const articles = STATIC_ARTICLES;
  return articles.find((article: any) => article.slug === slug);
}

export async function getCarById(id: number | string) {
  const cars = await getAllCars();
  return cars.find((car: any) => String(car.id) === String(id) || String(car._id) === String(id));
}

export async function getCarBySlug(slug: string) {
  // Попробуем найти через Supabase если там есть поле slug, иначе из всех машин
  const cars = await getAllCars();
  return cars.find((car: any) => car.slug === slug);
}
