import { NextRequest, NextResponse } from 'next/server';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'volga-auto2025';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password, action } = body;

    if (action === 'logout') {
      return NextResponse.json({ success: true });
    }

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      return NextResponse.json({
        success: true,
        message: 'Аутентификация успешна'
      });
    }

    return NextResponse.json(
      { success: false, message: 'Неверный логин или пароль' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Ошибка аутентификации:', error);
    return NextResponse.json(
      { success: false, message: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}
