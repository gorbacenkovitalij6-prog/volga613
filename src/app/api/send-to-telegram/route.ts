import { NextRequest, NextResponse } from 'next/server';
import { TELEGRAM_CONFIG, formatTelegramMessage, isTelegramConfigured } from '@/config/telegram';

export async function POST(request: NextRequest) {
  try {
    // Проверяем конфигурацию
    if (!isTelegramConfigured()) {
      console.error('Telegram не настроен. Проверьте src/config/telegram.ts');
      return NextResponse.json(
        {
          success: false,
          error: 'Telegram не настроен. Обратитесь к администратору.'
        },
        { status: 500 }
      );
    }

    // Получаем данные из формы
    const data = await request.json();

    // Валидация обязательных полей
    if (!data.name || !data.phone) {
      return NextResponse.json(
        { success: false, error: 'Имя и телефон обязательны' },
        { status: 400 }
      );
    }

    // Форматируем сообщение
    const message = formatTelegramMessage({
      name: data.name,
      phone: data.phone,
      email: data.email,
      message: data.message,
      carInterest: data.carInterest,
      source: data.source || 'Сайт volga-auto-premier.ru',
    });

    // Отправляем в Telegram
    const telegramUrl = `${TELEGRAM_CONFIG.apiUrl}/bot${TELEGRAM_CONFIG.botToken}/sendMessage`;

    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CONFIG.chatId,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Ошибка Telegram API:', errorData);
      return NextResponse.json(
        {
          success: false,
          error: 'Не удалось отправить сообщение. Попробуйте позже.'
        },
        { status: 500 }
      );
    }

    // Успешная отправка
    return NextResponse.json({
      success: true,
      message: 'Заявка успешно отправлена!',
    });

  } catch (error) {
    console.error('Ошибка при отправке в Telegram:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Произошла ошибка. Пожалуйста, свяжитесь с нами по телефону.'
      },
      { status: 500 }
    );
  }
}

// Опционально: GET запрос для проверки статуса
export async function GET() {
  return NextResponse.json({
    configured: isTelegramConfigured(),
    message: isTelegramConfigured()
      ? 'Telegram интеграция настроена'
      : 'Требуется настройка Telegram. См. src/config/telegram.ts',
  });
}
