import { getAllCars, getAllReviews } from '@/lib/db';
import HomeClient from './HomeClient';
import { getLocalPhotoReviews } from './reviews/actions';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [cars, reviews, photoReviews] = await Promise.all([
    getAllCars(),
    getAllReviews(),
    getLocalPhotoReviews(),
  ]);

  return <HomeClient cars={cars} reviews={reviews} photoReviews={photoReviews} />;
}
