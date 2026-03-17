'use client';

import { useState } from 'react';
import Image from 'next/image';

interface VideoBackgroundProps {
  videoSrc: string;
  fallbackImage: string;
  overlayOpacity?: 'light' | 'medium' | 'dark';
  useVideo?: boolean;
}

export default function VideoBackground({
  videoSrc,
  fallbackImage,
  overlayOpacity = 'medium',
  useVideo = false,
}: VideoBackgroundProps) {
  const [videoError, setVideoError] = useState(false);

  // Если видео включено и нет ошибки загрузки
  if (useVideo && !videoError) {
    return (
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          onError={() => setVideoError(true)}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        {/* Оставляем легкий полупрозрачный градиент для читаемости текста */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
      </div>
    );
  }

  // Fallback на изображение с красивой плавной анимацией
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Изображение с анимацией при смене */}
      <div className="absolute inset-0">
        <Image
          key={fallbackImage} // Принудительный ререндер при смене изображения
          src={fallbackImage}
          alt="Background"
          fill
          className="object-cover animate-fadeIn"
          priority
          unoptimized
        />
      </div>

      {/* Оставляем легкий полупрозрачный градиент для читаемости белого текста */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
    </div>
  );
}
