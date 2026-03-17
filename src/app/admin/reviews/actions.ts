'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function toggleReviewStatus(id: number | string, isPublished: boolean) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('reviews')
        .update({ is_published: isPublished })
        .eq('id', id);

    if (error) {
        throw new Error('Не удалось обновить статус отзыва: ' + error.message);
    }

    revalidatePath('/reviews');
    revalidatePath('/admin/reviews');
    revalidatePath('/');
}

export async function deleteReview(id: number | string) {
    const supabase = await createClient();

    const { error } = await supabase.from('reviews').delete().eq('id', id);

    if (error) {
        throw new Error('Не удалось удалить отзыв: ' + error.message);
    }

    revalidatePath('/reviews');
    revalidatePath('/admin/reviews');
    revalidatePath('/');
}
