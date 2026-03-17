import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'src/data/db/reviews.json');

async function readReviews() {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeReviews(reviews: any[]) {
  await fs.writeFile(DB_PATH, JSON.stringify(reviews, null, 2), 'utf-8');
}

// GET - получить все отзывы
export async function GET() {
  try {
    const reviews = await readReviews();
    return NextResponse.json(
      { success: true, data: reviews },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }
    );
  } catch (error) {
    console.error('Ошибка чтения отзывов:', error);
    return NextResponse.json(
      { success: false, message: 'Ошибка чтения данных' },
      { status: 500 }
    );
  }
}

// POST - создать новый отзыв
export async function POST(request: NextRequest) {
  try {
    const reviews = await readReviews();
    const body = await request.json();

    const newReview = {
      ...body,
      id: reviews.length > 0 ? Math.max(...reviews.map((r: any) => r.id)) + 1 : 1,
      date: body.date || new Date().toISOString().split('T')[0],
    };

    reviews.push(newReview);
    await writeReviews(reviews);

    return NextResponse.json({ success: true, data: newReview });
  } catch (error) {
    console.error('Ошибка создания отзыва:', error);
    return NextResponse.json(
      { success: false, message: 'Ошибка создания отзыва' },
      { status: 500 }
    );
  }
}

// PUT - обновить отзыв
export async function PUT(request: NextRequest) {
  try {
    const reviews = await readReviews();
    const body = await request.json();

    const index = reviews.findIndex((r: any) => r.id === body.id);
    if (index === -1) {
      return NextResponse.json(
        { success: false, message: 'Отзыв не найден' },
        { status: 404 }
      );
    }

    reviews[index] = { ...reviews[index], ...body };
    await writeReviews(reviews);

    return NextResponse.json({ success: true, data: reviews[index] });
  } catch (error) {
    console.error('Ошибка обновления отзыва:', error);
    return NextResponse.json(
      { success: false, message: 'Ошибка обновления отзыва' },
      { status: 500 }
    );
  }
}

// DELETE - удалить отзыв
export async function DELETE(request: NextRequest) {
  try {
    const reviews = await readReviews();
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get('id'));

    const filteredReviews = reviews.filter((r: any) => r.id !== id);

    if (filteredReviews.length === reviews.length) {
      return NextResponse.json(
        { success: false, message: 'Отзыв не найден' },
        { status: 404 }
      );
    }

    await writeReviews(filteredReviews);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Ошибка удаления отзыва:', error);
    return NextResponse.json(
      { success: false, message: 'Ошибка удаления отзыва' },
      { status: 500 }
    );
  }
}
