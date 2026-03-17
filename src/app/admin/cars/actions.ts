'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function deleteCar(id: number | string) {
    const supabase = await createClient();

    const { error } = await supabase.from('cars').delete().eq('id', id);

    if (error) {
        throw new Error('Не удалось удалить автомобиль: ' + error.message);
    }

    revalidatePath('/catalog');
    revalidatePath('/admin/cars');
    revalidatePath('/');
}

export async function revalidateAll() {
    revalidatePath('/catalog');
    revalidatePath('/admin/cars');
    revalidatePath('/');
}
