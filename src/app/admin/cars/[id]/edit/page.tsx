import { notFound } from 'next/navigation';
import { getCarBrands } from '@/lib/db';
import { createClient } from '@/utils/supabase/server';
import EditCarForm from './EditCarForm';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function EditCarPage({ params }: { params: Promise<{ id: string }> }) {
    const brands = await getCarBrands();
    const supabase = await createClient();
    const resolvedParams = await params;

    const { data: car, error } = await supabase
        .from('cars')
        .select('*')
        .eq('id', resolvedParams.id)
        .single();

    if (error || !car) {
        notFound();
    }

    return (
        <div className="p-8 max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Изменить автомобиль</h1>
                    <p className="text-muted-foreground mt-1">Редактирование данных автомобиля "{car.make} {car.model}"</p>
                </div>
                <Button variant="outline" asChild>
                    <Link href="/admin/cars">Отмена</Link>
                </Button>
            </div>

            <div className="bg-card rounded-lg border shadow-sm p-6 mt-8">
                <EditCarForm car={car} brands={brands} />
            </div>
        </div>
    );
}
