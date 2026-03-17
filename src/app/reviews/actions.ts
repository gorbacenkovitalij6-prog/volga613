'use server';

import fs from 'fs';
import path from 'path';

export async function getLocalPhotoReviews() {
  try {
    const photoReviewsDir = path.join(process.cwd(), 'public', 'photo-reviews');
    
    // Проверяем существует ли папка
    if (!fs.existsSync(photoReviewsDir)) {
      return [];
    }
    
    const files = fs.readdirSync(photoReviewsDir);
    
    // Фильтруем только картинки
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif'].includes(ext);
    });
    
    // Возвращаем пути, отсортированные (можно по дате изменения, но пока просто по имени)
    return imageFiles.map(file => `/photo-reviews/${file}`);
  } catch (error) {
    console.error('Ошибка при чтении фотоотзывов:', error);
    return [];
  }
}
