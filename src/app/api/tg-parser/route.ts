import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Инициализация Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''; 
const supabase = createClient(supabaseUrl, supabaseKey);

const TELEGRAM_BOT_TOKEN = process.env.PARSER_BOT_TOKEN || '';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  // Роут для быстрой установки вебхука Telegram
  if (searchParams.get('setup') === 'true') {
    if (!TELEGRAM_BOT_TOKEN) {
      return NextResponse.json({ error: 'Отсутствует переменная PARSER_BOT_TOKEN' }, { status: 400 });
    }
    
    // Получаем текущий хост (volgaprigon.ru или localhost)
    const host = request.headers.get('host');
    const protocol = host?.includes('localhost') ? 'http' : 'https';
    const webhookUrl = `${protocol}://${host}/api/tg-parser`;
    
    const tgRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/setWebhook?url=${webhookUrl}`);
    const data = await tgRes.json();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Вебхук успешно установлен!', 
      webhookUrl, 
      telegramResponse: data 
    });
  }
  
  return NextResponse.json({ status: 'PARSER API is active. Use ?setup=true to register webhook.' });
}

export async function POST(request: Request) {
  try {
    const update = await request.json();
    
    // Сообщение может прийти как message (от пользователя) или channel_post (из канала)
    const msg = update.channel_post || update.message;
    if (!msg) {
      return NextResponse.json({ status: 'ignored', reason: 'Not a message or post' });
    }

    // Текст может быть в text или в caption (если есть картинка)
    const text = msg.caption || msg.text || '';
    
    // Простейшая проверка, что это нужный шаблон
    if (!text.includes('Год выпуска:')) {
      return NextResponse.json({ status: 'ignored', reason: 'Does not match template (No year)' });
    }

    if (!TELEGRAM_BOT_TOKEN) {
      console.error('Missing PARSER_BOT_TOKEN');
      return NextResponse.json({ error: 'System is missing Telegram Bot Token' }, { status: 500 });
    }

    // --- 1. ПАРСИНГ ХАРАКТЕРИСТИК (REGEX) ---
    // Разбиваем на строки, первая не пустая строка - Марка Модель
    const lines = text.split('\n').map((l: string) => l.trim()).filter(Boolean);
    const titleLine = lines[0] || 'Unknown Car';
    const brand = titleLine.split(' ')[0] || 'Unknown';
    const model = titleLine.split(' ').slice(1).join(' ') || '';

    // Регулярные выражения под шаблон
    const yearMatch = text.match(/Год выпуска:\s*(\d+)/i);
    const mileageMatch = text.match(/Пробег:\s*([\d\s]+)\s*км/i);
    const fuelMatch = text.match(/Топливо:\s*(.+)/i);
    const transmissionMatch = text.match(/КПП:\s*(.+)/i);
    const driveMatch = text.match(/Привод:\s*(.+)/i);
    const priceMatch = text.match(/ЦЕНА ПОД КЛЮЧ:\s*([\d\s]+)\s*₽?/i);
    const colorMatch = text.match(/Цвет:\s*(.+)/i);
    const engineMatch = text.match(/Двигатель:\s*(.+)/i);

    const year = yearMatch ? parseInt(yearMatch[1], 10) : 2020;
    const mileage = mileageMatch ? parseInt(mileageMatch[1].replace(/\s/g, ''), 10) : 0;
    const price = priceMatch ? parseInt(priceMatch[1].replace(/\s/g, ''), 10) : 0;
    const color = colorMatch ? colorMatch[1].trim() : '';
    const engine = engineMatch ? engineMatch[1].trim() : '';

    // Приведение коробки передач к стандарту БД (автомат, механика, робот)
    const transmissionLabel = transmissionMatch ? transmissionMatch[1].trim().toLowerCase() : 'автомат';
    let transmission = 'автомат';
    if (transmissionLabel.includes('механ')) transmission = 'механика';
    if (transmissionLabel.includes('робот')) transmission = 'робот';
    if (transmissionLabel.includes('вариат')) transmission = 'вариатор';

    // Приведение привода к стандарту БД (fwd, rwd, awd)
    const driveLabel = driveMatch ? driveMatch[1].trim().toLowerCase() : 'fwd';
    let body_type = 'fwd'; // мы используем body_type для привода в нашей системе
    if (driveLabel.includes('задн')) body_type = 'rwd';
    if (driveLabel.includes('полн')) body_type = 'awd';

    const fuel_type = fuelMatch ? fuelMatch[1].trim().toLowerCase() : 'бензин';

    // --- 2. СКАЧИВАНИЕ И ЗАГРУЗКА ФОТО ---
    let finalImageUrl = '';
    if (msg.photo && msg.photo.length > 0) {
      // Telegram присылает несколько разрешений фото, берем самое последнее (лучшее качество)
      const bestPhoto = msg.photo[msg.photo.length - 1]; 
      const fileId = bestPhoto.file_id;
      
      // Получаем путь файла у серверов Telegram
      const fileRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getFile?file_id=${fileId}`);
      const fileData = await fileRes.json();
      
      if (fileData.ok && fileData.result.file_path) {
         const fileUrl = `https://api.telegram.org/file/bot${TELEGRAM_BOT_TOKEN}/${fileData.result.file_path}`;
         
         // Скачиваем само фото как массив байт (Buffer)
         const imageRes = await fetch(fileUrl);
         const arrayBuffer = await imageRes.arrayBuffer();
         const buffer = Buffer.from(arrayBuffer);
         
         // Генерируем уникальное имя файла
         const fileName = `tg_${Date.now()}_${Math.random().toString(36).substring(7)}.jpg`;
         
         // Загружаем в Supabase бакет zvuk-cars
         const { data: uploadData, error: uploadError } = await supabase.storage
           .from('zvuk-cars')
           .upload(fileName, buffer, { contentType: 'image/jpeg' });
           
         if (uploadData) {
            // Получаем публичную ссылку на загруженное фото
            const { data: publicUrlData } = supabase.storage.from('zvuk-cars').getPublicUrl(fileName);
            finalImageUrl = publicUrlData.publicUrl;
         } else {
            console.error('Supabase Upload error:', uploadError);
         }
      }
    }
    
    // --- 3. ЗАПИСЬВ В БАЗУ ДАННЫХ SUPABASE ---
    const slug = `${brand}-${model}-${year}-${Math.floor(Math.random() * 1000)}`.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    
    // Формируем короткое описание
    let short_desc = '';
    if (engine) short_desc += `Двигатель: ${engine}. `;
    if (color) short_desc += `Цвет: ${color}.`;

    const { data: insertData, error: insertError } = await supabase.from('cars').insert([{
      slug,
      status: 'available', // По умолчанию в наличии
      brand,
      model,
      year,
      price,
      mileage,
      fuel_type,
      transmission,
      body_type, // это наше поле привода
      short_description: short_desc.trim(),
      full_description: text,
      main_image: finalImageUrl || null,
      images: finalImageUrl ? [finalImageUrl] : [],
      location_country: 'Россия',
      location_city: 'Уточняйте'
    }]);

    if (insertError) {
      console.error('Supabase DB error:', insertError);
      return NextResponse.json({ error: 'DB Insert Failed', details: insertError }, { status: 500 });
    }

    return NextResponse.json({ success: true, slug, textConfig: { brand, model, year, price, mileage }});
  } catch (error) {
    console.error('TG Parser Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
