import { getCarBrands } from '@/lib/db';
import AddCarForm from './AddCarForm';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function AddCarPage() {
    const brands = await getCarBrands();

    return (
        <div className="p-8 max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Добавить автомобиль</h1>
                    <p className="text-muted-foreground mt-1">Заполните данные для публикации в каталоге</p>
                </div>
                <Button variant="outline" asChild>
                    <Link href="/admin/cars">Отмена</Link>
                </Button>
            </div>

            <div className="bg-card rounded-lg border shadow-sm p-6 mt-8">
                <AddCarForm brands={brands} />
            </div>
        </div>
    );
}
