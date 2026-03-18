import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'src/data/db/video-reviews.json');

async function readVideoReviews() {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch {
    // Если файла нет, возвращаем пустой массив
    return [];
  }
}

async function writeVideoReviews(reviews: any[]) {
  // Убедимся, что директория существует
  const dir = path.dirname(DB_PATH);
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
  await fs.writeFile(DB_PATH, JSON.stringify(reviews, null, 2), 'utf-8');
}

export async function GET() {
  try {
    const reviews = await readVideoReviews();
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
    console.error('Ошибка чтения видеоотзывов:', error);
    return NextResponse.json(
      { success: false, message: 'Ошибка чтения данных' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const reviews = await readVideoReviews();
    const body = await request.json();

    const newReview = {
      ...body,
      id: reviews.length > 0 ? Math.max(...reviews.map((r: any) => parseInt(r.id || '0'))) + 1 : 1,
      date: body.date || new Date().toISOString().split('T')[0],
      is_published: true,
    };

    reviews.push(newReview);
    await writeVideoReviews(reviews);

    return NextResponse.json({ success: true, data: newReview });
  } catch (error) {
    console.error('Ошибка создания видеоотзыва:', error);
    return NextResponse.json(
      { success: false, message: 'Ошибка создания видеоотзыва' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const reviews = await readVideoReviews();
    const { searchParams } = new URL(request.url);
    const idParam = searchParams.get('id');
    const id = idParam ? Number(idParam) : null;

    if (id === null) {
      return NextResponse.json({ success: false, message: 'ID обязателен' }, { status: 400 });
    }

    const filteredReviews = reviews.filter((r: any) => parseInt(r.id || '0') !== id);

    if (filteredReviews.length === reviews.length) {
      return NextResponse.json(
        { success: false, message: 'Отзыв не найден' },
        { status: 404 }
      );
    }

    await writeVideoReviews(filteredReviews);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Ошибка удаления видеоотзыва:', error);
    return NextResponse.json(
      { success: false, message: 'Ошибка удаления видеоотзыва' },
      { status: 500 }
    );
  }
}
