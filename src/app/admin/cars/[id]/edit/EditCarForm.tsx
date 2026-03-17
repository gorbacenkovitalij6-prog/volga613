'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { createClient } from '@/utils/supabase/client';
import { revalidateAll } from '../../actions';
import Image from 'next/image';

interface EditCarFormProps {
    car: any;
    brands: any[];
}

export default function EditCarForm({ car, brands }: EditCarFormProps) {
    const router = useRouter();
    const supabase = createClient();
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData(e.currentTarget);
            let imageUrl = car.main_image; // Keep existing image by default

            if (file) {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Math.random()}.${fileExt}`;
                const filePath = `cars/${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('zvuk cars')
                    .upload(filePath, file);

                if (uploadError) {
                    console.error("Upload error:", uploadError);
                    throw new Error('Ошибка при загрузке фото: ' + uploadError.message);
                }

                const { data: { publicUrl } } = supabase.storage.from('zvuk%20cars').getPublicUrl(filePath);
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
                // Keep the original slug to avoid breaking existing links
            };

            const { error: updateError } = await supabase
                .from('cars')
                .update(carData)
                .eq('id', car.id);

            if (updateError) {
                console.error("Update error:", updateError);
                throw new Error('Ошибка при обновлении авто в БД: ' + updateError.message);
            }

            await revalidateAll();
            router.push('/admin/cars');
            router.refresh();

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
                    <Input id="brand" name="brand" list="brands-list" required defaultValue={car.brand} />
                    <datalist id="brands-list">
                        {brands.map(b => (
                            <option key={b.id} value={b.name} />
                        ))}
                    </datalist>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="model">Модель</Label>
                    <Input id="model" name="model" required defaultValue={car.model} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="year">Год выпуска</Label>
                    <Input type="number" id="year" name="year" min="1990" max="2025" required defaultValue={car.year} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="price">Цена (₽)</Label>
                    <Input type="number" id="price" name="price" required min="0" defaultValue={car.price} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="mileage">Пробег (км)</Label>
                    <Input type="number" id="mileage" name="mileage" required min="0" defaultValue={car.mileage} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="status">Статус наличия</Label>
                    <Select name="status" defaultValue={car.status || 'available'}>
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
                    <Select name="fuel_type" defaultValue={car.fuel_type || 'Бензин'}>
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
                    <Select name="transmission" defaultValue={car.transmission || 'Автомат'}>
                        <SelectTrigger>
                            <SelectValue placeholder="КПП" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="автомат">Автомат</SelectItem>
                            <SelectItem value="механика">Механика</SelectItem>
                            <SelectItem value="робот">Робот (РКПП)</SelectItem>
                            <SelectItem value="вариатор">Вариатор</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="body_type">Тип кузова</Label>
                    <Select name="body_type" defaultValue={car.body_type || 'sedan'}>
                        <SelectTrigger>
                            <SelectValue placeholder="Кузов" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="sedan">Седан</SelectItem>
                            <SelectItem value="suv">Внедорожник</SelectItem>
                            <SelectItem value="crossover">Кроссовер</SelectItem>
                            <SelectItem value="wagon">Универсал</SelectItem>
                            <SelectItem value="hatchback">Хэтчбек</SelectItem>
                            <SelectItem value="coupe">Купе</SelectItem>
                            <SelectItem value="minivan">Минивэн</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
                <h3 className="font-medium text-lg">Местонахождение</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="location_country">Страна</Label>
                        <Input id="location_country" name="location_country" placeholder="Россия" required defaultValue={car.location_country} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="location_city">Город</Label>
                        <Input id="location_city" name="location_city" placeholder="Москва" required defaultValue={car.location_city} />
                    </div>
                </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
                <h3 className="font-medium text-lg">Описание</h3>
                <div className="space-y-2">
                    <Label htmlFor="short_description">Краткое описание (для карточки)</Label>
                    <Textarea 
                        id="short_description" 
                        name="short_description" 
                        placeholder="Краткое описание автомобиля..."
                        className="resize-none"
                        maxLength={150}
                        defaultValue={car.short_description}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="full_description">Полное описание (для страницы авто)</Label>
                    <Textarea 
                        id="full_description" 
                        name="full_description" 
                        placeholder="Подробное описание..."
                        className="min-h-[150px]"
                        defaultValue={car.full_description}
                    />
                </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
                <h3 className="font-medium text-lg">Главное фото</h3>
                
                {car.main_image && (
                    <div className="mb-4">
                        <Label className="block mb-2">Текущее фото</Label>
                        <div className="relative w-64 h-40 rounded-lg overflow-hidden border">
                            <Image 
                                src={car.main_image} 
                                alt="Current car image" 
                                fill 
                                className="object-cover" 
                                unoptimized
                            />
                        </div>
                    </div>
                )}
                
                <div className="space-y-2">
                    <Label htmlFor="main_image">Загрузить новое фото (оставьте пустым для сохранения старого)</Label>
                    <Input 
                        id="main_image" 
                        name="main_image" 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full md:w-auto mt-6">
                {loading ? 'Сохранение...' : 'Изменить автомобиль'}
            </Button>
        </form>
    );
}
