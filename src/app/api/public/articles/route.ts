import { NextResponse } from 'next/server';
import { getAllArticles } from '@/lib/db';

export async function GET() {
  try {
    const articles = await getAllArticles();
    return NextResponse.json({ success: true, data: articles });
  } catch (error) {
    console.error('Ошибка получения статей:', error);
    return NextResponse.json(
      { success: false, message: 'Ошибка получения данных' },
      { status: 500 }
    );
  }
}
