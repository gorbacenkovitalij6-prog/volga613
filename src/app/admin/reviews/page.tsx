import { getAllReviews } from '@/lib/db';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Check, X, Trash2 } from 'lucide-react';
import { toggleReviewStatus, deleteReview } from './actions';

export const revalidate = 0;

export default async function AdminReviewsPage() {
    const reviews = await getAllReviews();

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Отзывы</h1>
                    <p className="text-muted-foreground mt-1">Модерация отзывов</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" asChild>
                        <Link href="/admin">Назад</Link>
                    </Button>
                </div>
            </div>

            <div className="bg-card rounded-lg border shadow-sm overflow-hidden mt-8">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-muted/50 text-muted-foreground text-left">
                            <tr>
                                <th className="px-6 py-4 font-medium">Фото</th>
                                <th className="px-6 py-4 font-medium">Автор</th>
                                <th className="px-6 py-4 font-medium">Автомобиль</th>
                                <th className="px-6 py-4 font-medium">Текст</th>
                                <th className="px-6 py-4 font-medium">Статус</th>
                                <th className="px-6 py-4 font-medium text-right">Действия</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y relative">
                            {reviews.map((review: any) => (
                                <tr key={review.id} className="hover:bg-muted/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="w-12 h-12 relative rounded-full overflow-hidden bg-muted">
                                            {review.imageUrl ? (
                                                <Image
                                                    src={review.imageUrl}
                                                    alt={review.name}
                                                    fill
                                                    className="object-cover"
                                                    unoptimized
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-bold">
                                                    {review.name.charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-medium">
                                        {review.name}
                                        <div className="text-xs text-muted-foreground">{review.date}</div>
                                    </td>
                                    <td className="px-6 py-4">{review.car}</td>
                                    <td className="px-6 py-4 relative group max-w-xs">
                                        <p className="truncate cursor-help" title={review.text}>
                                            {review.text}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${review.verified
                                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                    : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                                }`}
                                        >
                                            {review.verified ? 'Опубликован' : 'На модерации'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <form action={async () => {
                                                'use server';
                                                await toggleReviewStatus(review.id, !review.verified);
                                            }}>
                                                <Button
                                                    type="submit"
                                                    variant="ghost"
                                                    size="icon"
                                                    title={review.verified ? "Скрыть" : "Опубликовать"}
                                                    className={review.verified ? "text-yellow-600" : "text-green-600"}
                                                >
                                                    {review.verified ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                                                </Button>
                                            </form>
                                            <form action={async () => {
                                                'use server';
                                                await deleteReview(review.id);
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
                            {reviews.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                                        Нет отзывов
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
