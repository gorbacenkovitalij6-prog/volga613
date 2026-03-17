import { getAllCars, getCarBrands, getCarModels } from '@/lib/db';
import CatalogClient from './CatalogClient';

// Обновлять данные каждые 10 секунд
export const revalidate = 10;

export default async function CatalogPage() {
  const [cars, dbBrands, dbModels] = await Promise.all([
    getAllCars(),
    getCarBrands(),
    getCarModels()
  ]);

  return <CatalogClient cars={cars} dbBrands={dbBrands} dbModels={dbModels} />;
}
