import { formatTelegramMessage } from './src/config/telegram';
console.log(formatTelegramMessage({name: 'Алексей', phone: '+7 (999) 123-45-67', email: 'example@mail.ru', carInterest: 'Москва', message: 'Хочу пригнать Audi A4', source: 'Форма на сайте: Готовы начать подбор?'}));
