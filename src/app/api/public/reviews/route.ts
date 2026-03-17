import { NextResponse } from 'next/server';
import { getAllReviews } from '@/lib/db';

export async function GET() {
  try {
    const reviews = await getAllReviews();
    return NextResponse.json({ success: true, data: reviews });
  } catch (error) {
    console.error('Ошибка получения отзывов:', error);
    return NextResponse.json(
      { success: false, message: 'Ошибка получения данных' },
      { status: 500 }
    );
  }
}
