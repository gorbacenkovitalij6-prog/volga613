import { getAllReviews, getCarBrands, getCarModels } from '@/lib/db';
import ReviewsClient from './ReviewsClient';
import { getLocalPhotoReviews } from './actions';

// Обновлять данные каждые 10 секунд
export const revalidate = 10;

export default async function ReviewsPage() {
  const [reviews, dbBrands, dbModels, photoReviews] = await Promise.all([
    getAllReviews(),
    getCarBrands(),
    getCarModels(),
    getLocalPhotoReviews()
  ]);

  return <ReviewsClient reviews={reviews} dbBrands={dbBrands} dbModels={dbModels} photoReviews={photoReviews} />;
}
