/**
 * Конфигурация Telegram бота для приема заявок
 *
 * Как настроить:
 * 1. Создайте бота через @BotFather в Telegram
 * 2. Получите токен бота
 * 3. Получите ваш Chat ID через @userinfobot
 * 4. Замените значения ниже на реальные
 */

export const TELEGRAM_CONFIG = {
  // Токен вашего бота (получите у @BotFather)
  // ВАЖНО: Храните токен в безопасности! В продакшене используйте переменные окружения
  botToken: process.env.TELEGRAM_BOT_TOKEN || '8602933958:AAGzHXGQUKRrKuyj_j5evxG2FpGlrMlSZNE',

  // Ваш Chat ID (получите у @userinfobot)
  chatId: process.env.TELEGRAM_CHAT_ID || '8647597487',

  // URL API Telegram
  apiUrl: 'https://api.telegram.org',
} as const;

/**
 * Проверка конфигурации
 */
export const isTelegramConfigured = (): boolean => {
  return (
    TELEGRAM_CONFIG.botToken !== 'ЗАМЕНИТЕ_НА_ВАШ_ТОКЕН_БОТА' &&
    TELEGRAM_CONFIG.chatId !== 'ЗАМЕНИТЕ_НА_ВАШ_CHAT_ID' &&
    TELEGRAM_CONFIG.botToken.length > 20
  );
};

/**
 * Форматирование сообщения для Telegram
 */
export const formatTelegramMessage = (data: {
  name: string;
  phone: string;
  email?: string;
  message?: string;
  carInterest?: string;
  source?: string;
}): string => {
  const timestamp = new Date().toLocaleString('ru-RU', {
    timeZone: 'Europe/Moscow',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  let message = `🚀 <b>Новая заявка с сайта</b>\n\n`;
  message += `👤 <b>Клиент:</b>\n`;
  message += `├ Имя: <b>${data.name}</b>\n`;
  message += `└ Телефон: <b>${data.phone}</b>\n`;
  
  if (data.email) {
    message = message.replace('└', '├');
    message += `└ Email: ${data.email}\n`;
  }
  message += `\n`;

  if (data.carInterest || data.message || data.source) {
    message += `📋 <b>Детали заявки:</b>\n`;
    
    const details = [];
    if (data.carInterest) details.push(`Интересует/Город: <b>${data.carInterest}</b>`);
    if (data.message) details.push(`Комментарий: <i>${data.message}</i>`);
    if (data.source) details.push(`Источник: ${data.source}`);

    details.forEach((detail, index) => {
      const isLast = index === details.length - 1;
      message += `${isLast ? '└' : '├'} ${detail}\n`;
    });
    message += `\n`;
  }

  message += `🕒 <i>Дата: ${timestamp}</i>\n`;

  return message;
};
