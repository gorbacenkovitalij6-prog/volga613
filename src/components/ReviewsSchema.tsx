import { CONTACTS } from '@/config/contacts';

interface Review {
  id: number;
  name: string;
  city: string;
  brand: string;
  rating: number;
  date: string;
  text: string;
  car?: string;
}

interface ReviewsSchemaProps {
  reviews: Review[];
}

export default function ReviewsSchema({ reviews }: ReviewsSchemaProps) {
  // Вычисляем средний рейтинг
  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 5;

  // Структурированные данные для организации
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ВОЛГА-АВТО',
    alternateName: 'Волга-Авто',
    url: 'https://volga-auto-premier.ru',
    logo: 'https://volga-auto-premier.ru/logo-square.png',
    image: 'https://volga-auto-premier.ru/og-image.jpg',
    description: 'Профессиональный автопригон из Европы под ключ. Более 500 довольных клиентов.',
    telephone: CONTACTS.phone,
    email: CONTACTS.email,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'BY',
      addressLocality: CONTACTS.officeCity,
      streetAddress: CONTACTS.officeAddress,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: averageRating.toFixed(1),
      reviewCount: reviews.length,
      bestRating: '5',
      worstRating: '1',
    },
    review: reviews.slice(0, 10).map(review => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.name,
        address: {
          '@type': 'PostalAddress',
          addressLocality: review.city,
        },
      },
      datePublished: review.date,
      reviewBody: review.text,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating.toString(),
        bestRating: '5',
        worstRating: '1',
      },
      itemReviewed: {
        '@type': 'Service',
        name: `Автопригон ${review.brand} ${review.car || ''}`.trim(),
        provider: {
          '@type': 'Organization',
          name: 'ВОЛГА-АВТО',
        },
      },
    })),
  };

  // Структурированные данные для Breadcrumbs
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Главная',
        item: 'https://volga-auto-premier.ru',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Отзывы',
        item: 'https://volga-auto-premier.ru/reviews',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </>
  );
}
