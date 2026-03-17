import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { CARS } from '@/data/cars';
import { REVIEWS } from '@/data/reviews';
import { BLOG_ARTICLES } from '@/data/blog-articles';

export async function POST() {
  try {
    const REVIEWS_DB_PATH = path.join(process.cwd(), 'src/data/db/reviews.json');
    const CARS_DB_PATH = path.join(process.cwd(), 'src/data/db/cars.json');
    const ARTICLES_DB_PATH = path.join(process.cwd(), 'src/data/db/articles.json');

    // Миграция отзывов
    await fs.writeFile(REVIEWS_DB_PATH, JSON.stringify(REVIEWS, null, 2), 'utf-8');

    // Миграция автомобилей
    await fs.writeFile(CARS_DB_PATH, JSON.stringify(CARS, null, 2), 'utf-8');

    // Миграция статей
    await fs.writeFile(ARTICLES_DB_PATH, JSON.stringify(BLOG_ARTICLES, null, 2), 'utf-8');

    return NextResponse.json({
      success: true,
      message: 'Данные успешно мигрированы',
      data: {
        reviews: REVIEWS.length,
        cars: CARS.length,
        articles: BLOG_ARTICLES.length,
      },
    });
  } catch (error) {
    console.error('Ошибка миграции:', error);
    return NextResponse.json(
      { success: false, message: 'Ошибка миграции данных' },
      { status: 500 }
    );
  }
}
