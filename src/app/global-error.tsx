'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global Error:', error);
  }, [error]);

  return (
    <html lang="ru">
      <body>
        <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
          <h2 className="text-3xl font-bold mb-4">Критическая ошибка приложения</h2>
          <p className="mb-8 text-zinc-400 max-w-lg text-center">{error?.message}</p>
          <button 
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            onClick={() => reset()}
          >
            Перезагрузить
          </button>
        </div>
      </body>
    </html>
  );
}
