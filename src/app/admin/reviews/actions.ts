'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import fs from 'fs';
import path from 'path';

export async function uploadReviewPhoto(formData: FormData) {
    const file = formData.get('file') as File;
    if (!file) throw new Error('Файл не найден');

    // Create unique filename
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const extension = path.extname(file.name) || '.jpg';
    const filename = `${uniqueSuffix}${extension}`;
    
    // Create uploads directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'reviews');
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    // Save file
    const filepath = path.join(uploadDir, filename);
    await fs.promises.writeFile(filepath, buffer);
    
    // Return the public URL path
    return `/uploads/reviews/${filename}`;
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
