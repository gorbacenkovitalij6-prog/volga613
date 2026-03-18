'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 text-center">
      <h2 className="text-2xl font-bold mb-4">Что-то пошло не так!</h2>
      <p className="text-zinc-500 mb-8 max-w-md">
        {error?.message || "Произошла непредвиденная ошибка при загрузке страницы."}
      </p>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Попробовать снова
      </Button>
    </div>
  );
}
