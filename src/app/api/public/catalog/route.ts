import { NextResponse } from 'next/server';
import { getAllCars } from '@/lib/db';

export async function GET() {
  try {
    const cars = await getAllCars();
    return NextResponse.json({ success: true, data: cars });
  } catch (error) {
    console.error('Ошибка получения автомобилей:', error);
    return NextResponse.json(
      { success: false, message: 'Ошибка получения данных' },
      { status: 500 }
    );
  }
}
