'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function uploadReviewPhoto(formData: FormData) {
    const supabase = await createClient();
    const file = formData.get('file') as File;
    if (!file) throw new Error('Файл не найден');

    const extension = file.name.split('.').pop() || 'jpg';
    const filename = `${Date.now()}-${Math.round(Math.random() * 1E9)}.${extension}`;
    
    const { data, error } = await supabase.storage
        .from('reviews_photos')
        .upload(filename, file, { upsert: true });

    if (error) {
        throw new Error('Ошибка при загрузке картинки в базу: ' + error.message);
    }

    const { data: publicUrlData } = supabase.storage
        .from('reviews_photos')
        .getPublicUrl(filename);

    return publicUrlData.publicUrl;
}

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

export async function createReview(data: any) {
    const supabase = await createClient();
    const payload = {
        author_name: data.name,
        car_name: data.car,
        rating: data.rating,
        review_text: data.text,
        photo_url: data.imageUrl,
        is_published: data.verified !== undefined ? data.verified : true,
    };

    const { error } = await supabase.from('reviews').insert([payload]);
    if (error) throw new Error('Не удалось создать отзыв: ' + error.message);

    revalidatePath('/reviews');
    revalidatePath('/admin/reviews');
    revalidatePath('/');
}

export async function updateReview(id: number | string, data: any) {
    const supabase = await createClient();
    const payload = {
        author_name: data.name,
        car_name: data.car,
        rating: data.rating,
        review_text: data.text,
        photo_url: data.imageUrl,
        is_published: data.verified,
    };

    const { error } = await supabase.from('reviews').update(payload).eq('id', id);
    if (error) throw new Error('Не удалось обновить отзыв: ' + error.message);

    revalidatePath('/reviews');
    revalidatePath('/admin/reviews');
    revalidatePath('/');
}
