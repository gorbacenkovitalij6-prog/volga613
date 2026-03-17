'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

interface AnimatedImageProps extends Omit<ImageProps, 'onLoad'> {
  containerClassName?: string;
}

export default function AnimatedImage({
  className,
  containerClassName,
  alt,
  src,
  ...props
}: AnimatedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Проверяем, является ли изображение локальным (начинается с /) или с Supabase
  const isLocalImage = typeof src === 'string' && (src.startsWith('/') || src.includes('supabase.co'));

  return (
    <div className={cn('relative overflow-hidden bg-zinc-100 dark:bg-zinc-800', containerClassName)}>
      {/* Skeleton loader - показывается пока изображение грузится */}
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-100 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-800" />
      )}

      {/* Изображение с анимацией появления */}
      <Image
        {...props}
        src={src}
        alt={alt}
        unoptimized={isLocalImage}
        className={cn(
          'transition-all duration-700 ease-out',
          isLoaded
            ? 'opacity-100 scale-100 blur-0'
            : 'opacity-0 scale-95 blur-sm',
          className
        )}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}
