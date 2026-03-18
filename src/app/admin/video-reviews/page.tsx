'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Trash2, Plus, Loader2, PlayCircle } from 'lucide-react';

export default function AdminVideoReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [title, setTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/admin/video-reviews');
      const json = await res.json();
      if (json.success) {
        setReviews(json.data || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoUrl) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/video-reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, video_url: videoUrl }),
      });
      const data = await res.json();
      if (data.success) {
        setTitle('');
        setVideoUrl('');
        fetchReviews();
      } else {
        alert(data.message || 'Ошибка добавления');
      }
    } catch (e) {
      alert('Ошибка соединения');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Удалить этот видеоотзыв?')) return;
    try {
      const res = await fetch(`/api/admin/video-reviews?id=${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        fetchReviews();
      } else {
        alert(data.message || 'Ошибка удаления');
      }
    } catch (e) {
      alert('Ошибка соединения');
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Видеоотзывы</h1>
          <p className="text-muted-foreground mt-1">Добавление и удаление видеоотзывов</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" asChild>
            <Link href="/admin">Назад</Link>
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-8">
        <Card className="p-6 md:col-span-1 h-fit shadow-sm">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Добавить видео
          </h2>
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Заголовок (необязательно)</Label>
              <Input
                id="title"
                placeholder="Семья Ивановых и их Skoda"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="videoUrl">Ссылка на видео (YouTube / И т.д.)</Label>
              <Input
                id="videoUrl"
                placeholder="https://youtu.be/..."
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={submitting || !videoUrl}>
              {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Опубликовать
            </Button>
          </form>
        </Card>

        <Card className="md:col-span-2 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-muted-foreground text-left">
                <tr>
                  <th className="px-6 py-4 font-medium">Видео</th>
                  <th className="px-6 py-4 font-medium">Заголовок</th>
                  <th className="px-6 py-4 font-medium">Дата создания</th>
                  <th className="px-6 py-4 font-medium text-right">Действия</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto" />
                    </td>
                  </tr>
                ) : reviews.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                      Пока нет видеоотзывов
                    </td>
                  </tr>
                ) : (
                  reviews.map((review) => (
                    <tr key={review.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <PlayCircle className="w-5 h-5" />
                          </div>
                          <a 
                            href={review.video_url} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="text-blue-500 hover:underline max-w-[200px] truncate block"
                          >
                            {review.video_url}
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium">
                        {review.title || 'Без заголовка'}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {review.date}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => handleDelete(review.id)}
                          title="Удалить"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
