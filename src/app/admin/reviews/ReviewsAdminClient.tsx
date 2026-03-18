'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Check, X, Trash2, Edit, Plus, Loader2 } from 'lucide-react';
import { toggleReviewStatus, deleteReview, createReview, updateReview } from './actions';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';

export default function ReviewsAdminClient({ initialReviews }: { initialReviews: any[] }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [car, setCar] = useState('');
  const [rating, setRating] = useState('5');
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const openAddModal = () => {
    setEditingReview(null);
    setName('');
    setCar('');
    setRating('5');
    setText('');
    setImageUrl('');
    setIsModalOpen(true);
  };

  const openEditModal = (review: any) => {
    setEditingReview(review);
    setName(review.name);
    setCar(review.car);
    setRating(String(review.rating));
    setText(review.text);
    setImageUrl(review.imageUrl || '');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = {
        name,
        car,
        rating: Number(rating),
        text,
        imageUrl,
      };

      if (editingReview) {
        await updateReview(editingReview.id, { ...data, verified: editingReview.verified });
      } else {
        await createReview({ ...data, verified: true });
      }
      setIsModalOpen(false);
      router.refresh();
    } catch (e: any) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (id: string, currentStatus: boolean) => {
    try {
      await toggleReviewStatus(id, !currentStatus);
      router.refresh();
    } catch (e: any) {
      alert(e.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить отзыв?')) return;
    try {
      await deleteReview(id);
      router.refresh();
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mt-8 mb-4">
        <h2 className="text-xl font-semibold">Список отзывов</h2>
        <Button onClick={openAddModal} className="gap-2">
          <Plus className="w-4 h-4" /> Добавить отзыв
        </Button>
      </div>

      <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
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
              {initialReviews.map((review: any) => (
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
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        review.verified
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}
                    >
                      {review.verified ? 'Опубликован' : 'На модерации'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        title="Редактировать"
                        onClick={() => openEditModal(review)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        title={review.verified ? "Скрыть" : "Опубликовать"}
                        className={review.verified ? "text-yellow-600" : "text-green-600"}
                        onClick={() => handleToggle(review.id, review.verified)}
                      >
                        {review.verified ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                        title="Удалить"
                        onClick={() => handleDelete(review.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {initialReviews.length === 0 && (
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

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSave}>
            <DialogHeader>
              <DialogTitle>{editingReview ? 'Редактировать отзыв' : 'Добавить отзыв'}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Имя клиента</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="car">Модель авто</Label>
                <Input id="car" value={car} onChange={(e) => setCar(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rating">Рейтинг (от 1 до 5)</Label>
                <Input id="rating" type="number" min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Ссылка на фото (опционально)</Label>
                <Input id="imageUrl" placeholder="https://..." value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="text">Текст отзыва</Label>
                <Textarea id="text" className="h-32" value={text} onChange={(e) => setText(e.target.value)} required />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Отмена</Button>
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Сохранить
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
