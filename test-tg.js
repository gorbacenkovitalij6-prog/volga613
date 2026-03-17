

async function testTelegram() {
  const TELEGRAM_BOT_TOKEN = '7596230554:AAEft9kOWe4Dngw_hOQ_qYQ1-cWqA3aD2zE';
  const TELEGRAM_CHAT_ID = '-1002241687009';
  const message = 'Test message from server';

  const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

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
