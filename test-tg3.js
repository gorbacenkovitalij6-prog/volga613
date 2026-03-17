async function testTelegram() {
  const token = process.argv[2];
  const TELEGRAM_CHAT_ID = '-1002241687009';
  const message = 'Test message from server';

  if (!token) {
    console.log("Пожалуйста, передайте токен в качестве аргумента. Пример: node test-tg3.js ВАШ_ТОКЕН");
    return;
  }

  console.log(`Проверяю токен: ${token}`);

  const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;

  try {
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
      }),
    });

    const data = await response.json();
    console.log('Telegram API Response:', data);
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

testTelegram();
