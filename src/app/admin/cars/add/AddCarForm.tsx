'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { createClient } from '@/utils/supabase/client';
import { revalidateAll } from '../actions';

export default function AddCarForm({ brands }: { brands: any[] }) {
    const router = useRouter();
    const supabase = createClient();
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData(e.currentTarget);

            let imageUrl = '';
            if (file) {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Math.random()}.${fileExt}`;
                const filePath = `cars/${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('zvuk-cars')
                    .upload(filePath, file);

                if (uploadError) {
                    console.error("Upload error:", uploadError)
                    throw new Error('Ошибка при загрузке фото: ' + uploadError.message);
                }

                const { data: { publicUrl } } = supabase.storage.from('zvuk-cars').getPublicUrl(filePath);
                imageUrl = publicUrl;
            }

            const carData = {
                brand: formData.get('brand'),
                model: formData.get('model'),
                year: Number(formData.get('year')),
                price: Number(formData.get('price')),
                mileage: Number(formData.get('mileage')),
                status: formData.get('status'),
                fuel_type: formData.get('fuel_type'),
                transmission: formData.get('transmission'),
                body_type: formData.get('body_type'),
                location_country: formData.get('location_country'),
                location_city: formData.get('location_city'),
                short_description: formData.get('short_description'),
                full_description: formData.get('full_description'),
                main_image: imageUrl || null,
                title: `${formData.get('brand')} ${formData.get('model')}`,
                slug: `${formData.get('brand')}-${formData.get('model')}-${formData.get('year')}-${Date.now()}`.toLowerCase().replace(/\s+/g, '-'),
            };

            const { error: insertError } = await supabase.from('cars').insert([carData]);

            if (insertError) {
                console.error("Insert error:", insertError)
                throw new Error('Ошибка при сохранении авто в БД: ' + insertError.message);
            }

            await revalidateAll();
            router.push('/admin/cars');

        } catch (error: any) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="brand">Марка</Label>
                    <Input id="brand" name="brand" list="brands-list" required />
                    <datalist id="brands-list">
                        {brands.map(b => (
                            <option key={b.id} value={b.name} />
                        ))}
                    </datalist>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="model">Модель</Label>
                    <Input id="model" name="model" required />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="year">Год выпуска</Label>
                    <Input type="number" id="year" name="year" min="1990" max="2025" required defaultValue="2020" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="price">Цена (₽)</Label>
                    <Input type="number" id="price" name="price" required min="0" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="mileage">Пробег (км)</Label>
                    <Input type="number" id="mileage" name="mileage" required min="0" defaultValue="0" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="status">Статус наличия</Label>
                    <Select name="status" defaultValue="available">
                        <SelectTrigger>
                            <SelectValue placeholder="Выберите статус" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="available">Свободна (В наличии)</SelectItem>
                            <SelectItem value="on_order">Свободна (В пути / Под заказ)</SelectItem>
                            <SelectItem value="reserved">Забронирована</SelectItem>
                            <SelectItem value="sold">Продана / Выдана</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="fuel_type">Тип двигателя</Label>
                    <Select name="fuel_type" defaultValue="Бензин">
                        <SelectTrigger>
                            <SelectValue placeholder="Двигатель" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="бензин">Бензин</SelectItem>
                            <SelectItem value="дизель">Дизель</SelectItem>
                            <SelectItem value="электро">Электро</SelectItem>
                            <SelectItem value="гибрид">Гибрид</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="transmission">Коробка передач</Label>
                    <Select name="transmission" defaultValue="Автомат">
                        <SelectTrigger>
                            <SelectValue placeholder="КПП" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="автомат">Автомат</SelectItem>
                            <SelectItem value="механика">Механика</SelectItem>
                            <SelectItem value="робот">Робот</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="body_type">Привод</Label>
                    <Select name="body_type" defaultValue="fwd">
                        <SelectTrigger>
                            <SelectValue placeholder="Выберите привод" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="fwd">Передний</SelectItem>
                            <SelectItem value="rwd">Задний</SelectItem>
                            <SelectItem value="awd">Полный</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="location_country">Страна нахождения</Label>
                    <Input id="location_country" name="location_country" defaultValue="Европа" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="location_city">Город нахождения</Label>
                    <Input id="location_city" name="location_city" />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="image">Главное фото</Label>
                <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
                <p className="text-sm text-muted-foreground">Изображение будет загружено в Supabase Storage (bucket `zvuk cars`)</p>
            </div>

            <div className="space-y-2">
                <Label htmlFor="short_description">Краткое описание</Label>
                <Textarea id="short_description" name="short_description" rows={2} />
            </div>

            <div className="space-y-2">
                <Label htmlFor="full_description">Полное описание</Label>
                <Textarea id="full_description" name="full_description" rows={5} />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Сохранение...' : 'Опубликовать автомобиль'}
            </Button>
        </form>
    )
}
