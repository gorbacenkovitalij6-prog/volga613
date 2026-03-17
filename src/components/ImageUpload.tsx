'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  required?: boolean;
}

export default function ImageUpload({ label, value, onChange, required = false }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Проверка размера (макс 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Файл слишком большой. Максимум 5MB');
      return;
    }

    setUploading(true);
    setUploadError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        onChange(data.url);
      } else {
        setUploadError(data.message || 'Ошибка загрузки');
      }
    } catch (error) {
      setUploadError('Ошибка загрузки файла');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label} {required && <span className="text-red-500">*</span>}</Label>

      <div className="flex gap-2">
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://... или загрузите файл"
          className="flex-1"
        />

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleFileSelect}
          className="hidden"
        />

        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? (
            <>Загрузка...</>
          ) : (
            <>
              <Upload className="w-4 h-4 mr-2" />
              Файл
            </>
          )}
        </Button>

        {value && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => onChange('')}
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {uploadError && (
        <p className="text-sm text-red-600">{uploadError}</p>
      )}

      {value && (
        <div className="mt-2 relative w-32 h-32 border rounded-lg overflow-hidden bg-zinc-100">
          <img
            src={value}
            alt="Preview"
            className="w-full h-full object-cover"
            onError={() => setUploadError('Не удалось загрузить превью')}
          />
        </div>
      )}

      <p className="text-xs text-zinc-500">
        Форматы: JPG, PNG, WEBP. Макс. размер: 5MB
      </p>
    </div>
  );
}
