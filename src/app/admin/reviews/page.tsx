import { getAllReviews } from '@/lib/db';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ReviewsAdminClient from './ReviewsAdminClient';

export const revalidate = 0;

export default async function AdminReviewsPage() {
    const reviews = await getAllReviews();

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Отзывы</h1>
                    <p className="text-muted-foreground mt-1">Добавление и модерация отзывов</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" asChild>
                        <Link href="/admin">Назад</Link>
                    </Button>
                </div>
            </div>

            <ReviewsAdminClient initialReviews={reviews} />
        </div>
    );
}
