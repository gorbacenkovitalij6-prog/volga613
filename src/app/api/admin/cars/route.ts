import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'src/data/db/cars.json');

async function readCars() {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeCars(cars: any[]) {
  console.log('💾 Записываем в файл:', DB_PATH);
  console.log('📝 Количество записей:', cars.length);
  await fs.writeFile(DB_PATH, JSON.stringify(cars, null, 2), 'utf-8');
  console.log('✅ Файл успешно записан');
}

// GET - получить все автомобили
export async function GET() {
  try {
    const cars = await readCars();
    return NextResponse.json(
      { success: true, data: cars },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }
    );
  } catch (error) {
    console.error('Ошибка чтения автомобилей:', error);
    return NextResponse.json(
      { success: false, message: 'Ошибка чтения данных' },
      { status: 500 }
    );
  }
}

// POST - создать новый автомобиль
export async function POST(request: NextRequest) {
  try {
    const cars = await readCars();
    const body = await request.json();

    const newCar = {
      ...body,
      id: cars.length > 0 ? Math.max(...cars.map((c: any) => c.id)) + 1 : 1,
      slug: body.slug || `${body.make.toLowerCase()}-${body.model.toLowerCase()}-${body.year}`,
    };

    cars.push(newCar);
    await writeCars(cars);

    return NextResponse.json({ success: true, data: newCar });
  } catch (error) {
    console.error('Ошибка создания автомобиля:', error);
    return NextResponse.json(
      { success: false, message: 'Ошибка создания автомобиля' },
      { status: 500 }
    );
  }
}

// PUT - обновить автомобиль
export async function PUT(request: NextRequest) {
  try {
    const cars = await readCars();
    const body = await request.json();

    const index = cars.findIndex((c: any) => c.id === body.id);
    if (index === -1) {
      return NextResponse.json(
        { success: false, message: 'Автомобиль не найден' },
        { status: 404 }
      );
    }

    cars[index] = { ...cars[index], ...body };
    await writeCars(cars);

    return NextResponse.json({ success: true, data: cars[index] });
  } catch (error) {
    console.error('Ошибка обновления автомобиля:', error);
    return NextResponse.json(
      { success: false, message: 'Ошибка обновления автомобиля' },
      { status: 500 }
    );
  }
}

// DELETE - удалить автомобиль
export async function DELETE(request: NextRequest) {
  try {
    const cars = await readCars();
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get('id'));

    console.log('🗑️ DELETE Request - ID:', id);
    console.log('📊 Текущее количество автомобилей:', cars.length);
    console.log('📋 Список ID до удаления:', cars.map((c: any) => c.id));

    const filteredCars = cars.filter((c: any) => c.id !== id);

    if (filteredCars.length === cars.length) {
      console.log('❌ Автомобиль не найден');
      return NextResponse.json(
        { success: false, message: 'Автомобиль не найден' },
        { status: 404 }
      );
    }

    console.log('✅ Автомобиль найден, удаляем...');
    console.log('📊 Новое количество автомобилей:', filteredCars.length);
    console.log('📋 Список ID после удаления:', filteredCars.map((c: any) => c.id));

    await writeCars(filteredCars);
    console.log('💾 Данные записаны в файл');

    // Проверяем что записалось
    const verify = await readCars();
    console.log('✓ Проверка: в файле теперь автомобилей:', verify.length);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Ошибка удаления автомобиля:', error);
    return NextResponse.json(
      { success: false, message: 'Ошибка удаления автомобиля' },
      { status: 500 }
    );
  }
}
