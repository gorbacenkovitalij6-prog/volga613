import { getAllCars } from '@/lib/db';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { deleteCar } from './actions';

export const revalidate = 0; // Don't cache admin pages

export default async function AdminCarsPage() {
    const cars = await getAllCars();

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Автомобили</h1>
                    <p className="text-muted-foreground mt-1">Управление каталогом</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" asChild>
                        <Link href="/admin">Назад</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/admin/cars/add">
                            <Plus className="w-4 h-4 mr-2" />
                            Добавить авто
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="bg-card rounded-lg border shadow-sm overflow-hidden mt-8">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-muted/50 text-muted-foreground text-left">
                            <tr>
                                <th className="px-6 py-4 font-medium">Фото</th>
                                <th className="px-6 py-4 font-medium">Модель</th>
                                <th className="px-6 py-4 font-medium">Год</th>
                                <th className="px-6 py-4 font-medium">Цена</th>
                                <th className="px-6 py-4 font-medium">Статус</th>
                                <th className="px-6 py-4 font-medium text-right">Действия</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {cars.map((car: any) => (
                                <tr key={car.id} className="hover:bg-muted/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="w-16 h-12 relative rounded overflow-hidden bg-muted">
                                            {car.imageUrl && (
                                                <Image
                                                    src={car.imageUrl}
                                                    alt={car.title}
                                                    fill
                                                    className="object-cover"
                                                    unoptimized
                                                />
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-medium">
                                        {car.make} {car.model}
                                    </td>
                                    <td className="px-6 py-4">{car.year}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {car.price.toLocaleString()} ₽
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium 
                                                ${car.status === 'available' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                                car.status === 'on_order' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                                                car.status === 'reserved' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                                                car.status === 'sold' ? 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400' :
                                                'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400'}`
                                            }
                                        >
                                            {car.status === 'available' ? 'В наличии' :
                                             car.status === 'on_order' ? 'Под заказ' :
                                             car.status === 'reserved' ? 'Бронь' :
                                             car.status === 'sold' ? 'Продана' : car.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button variant="ghost" size="icon" asChild>
                                                <Link href={`/admin/cars/${car.id}/edit`}>
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                            </Button>
                                            <form action={async () => {
                                                'use server';
                                                await deleteCar(car.id);
                                            }}>
                                                <Button
                                                    type="submit"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                                                    title="Удалить"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {cars.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                                        Нет добавленных автомобилей
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
