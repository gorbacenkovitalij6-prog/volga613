/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["*.preview.same-app.com"],

  // Временно закомментируем или удалим старый вариант
  devIndicators: false,

  // Принудительно генерируем новый ID сборки, чтобы сбросить кэш CDN Timeweb
  generateBuildId: async () => {
    return `build-${Date.now()}`;
  },

  // Оптимизация изображений
  images: {
    unoptimized: false, // Включаем оптимизацию изображений Next.js
    formats: ['image/webp', 'image/avif'], // Современные форматы
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048], // Размеры для разных устройств
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Размеры для thumbnails
    minimumCacheTTL: 60 * 60 * 24 * 30, // Кэширование на 30 дней
    domains: [
      "source.unsplash.com",
      "images.unsplash.com",
      "ext.same-assets.com",
      "ugc.same-assets.com",
      "cdn.sanity.io",
      "ominpizuexndqtbuhdos.supabase.co",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ext.same-assets.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ugc.same-assets.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ominpizuexndqtbuhdos.supabase.co",
        pathname: "/**",
      },
    ],
  },

  // Оптимизация сборки
  compress: true, // Gzip сжатие
  poweredByHeader: false, // Убрать X-Powered-By заголовок

  // Настройки производительности
  reactStrictMode: true, // Строгий режим React

  // Кэширование статических ресурсов
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
