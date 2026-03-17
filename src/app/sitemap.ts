import { MetadataRoute } from 'next';
import { BLOG_ARTICLES } from '@/data/blog-articles';
import { CARS } from '@/data/cars';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://volga-auto-premier.ru';

  // Фиксированная дата для статических страниц (последнее обновление сайта)
  const staticLastModified = new Date('2024-11-24').toISOString();

  // Статические страницы
  const staticPages = [
    {
      url: baseUrl,
      lastModified: staticLastModified,
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/catalog`,
      lastModified: staticLastModified,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: staticLastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: staticLastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: staticLastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: staticLastModified,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contacts`,
      lastModified: staticLastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: staticLastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/how-we-work`,
      lastModified: staticLastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];

  // Статьи блога
  const blogPages = BLOG_ARTICLES.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Автомобили из каталога (если нужно индексировать отдельные страницы авто)
  // const carPages = CARS.map((car) => ({
  //   url: `${baseUrl}/catalog/${car.id}`,
  //   lastModified: new Date(),
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.5,
  // }));

  return [...staticPages, ...blogPages];
}
