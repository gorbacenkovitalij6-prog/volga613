import { CONTACTS } from '@/config/contacts';

interface SEOProps {
  title?: string;
  description?: string;
  type?: 'website' | 'article' | 'product' | 'service';
  image?: string;
  locale?: string;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
  };
  product?: {
    name: string;
    price: number;
    currency: string;
    availability: string;
    condition: string;
  };
}

export default function SEO({
  title,
  description,
  type = 'website',
  image,
  locale = 'ru',
  article,
  product,
}: SEOProps) {
  const siteUrl = CONTACTS.website;
  const defaultImage = `${siteUrl}/og-image.jpg`;

  // Organization structured data
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'AutoDealer',
    name: CONTACTS.companyName,
    description: locale === 'ru'
      ? 'Автопригон из Европы под ключ. Подбор, проверка, доставка и растаможка автомобилей.'
      : 'Car import from Europe turnkey. Selection, inspection, delivery and customs clearance.',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    image: defaultImage,
    telephone: CONTACTS.phone,
    email: CONTACTS.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONTACTS.address,
      addressLocality: CONTACTS.city,
      addressRegion: CONTACTS.region,
      postalCode: CONTACTS.postalCode,
      addressCountry: 'RU',
    },
    sameAs: [
      CONTACTS.telegram,
      CONTACTS.whatsapp,
    ],
    priceRange: '₽₽₽',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '21:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '10:00',
        closes: '18:00',
      },
    ],
  };

  // Website structured data
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ВОЛГА-АВТО',
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/catalog?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  // Breadcrumb structured data
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: locale === 'ru' ? 'Главная' : 'Home',
        item: siteUrl,
      },
    ],
  };

  // Article structured data
  const articleSchema = article
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description: description,
        image: image || defaultImage,
        datePublished: article.publishedTime,
        dateModified: article.modifiedTime || article.publishedTime,
        author: {
          '@type': 'Person',
          name: article.author || 'ВОЛГА-АВТО',
        },
        publisher: {
          '@type': 'Organization',
          name: 'ВОЛГА-АВТО',
          logo: {
            '@type': 'ImageObject',
            url: `${siteUrl}/logo.png`,
          },
        },
      }
    : null;

  // Product structured data
  const productSchema = product
    ? {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        image: image || defaultImage,
        description: description,
        offers: {
          '@type': 'Offer',
          price: product.price,
          priceCurrency: product.currency,
          availability: product.availability,
          itemCondition: product.condition,
        },
      }
    : null;

  // Service structured data
  const serviceSchema = type === 'service'
    ? {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: title,
        description: description,
        provider: {
          '@type': 'AutoDealer',
          name: 'ВОЛГА-АВТО',
        },
        areaServed: {
          '@type': 'Country',
          name: 'Russia',
        },
      }
    : null;

  return (
    <>
      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      {/* Website Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* Article Schema */}
      {articleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleSchema),
          }}
        />
      )}

      {/* Product Schema */}
      {productSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(productSchema),
          }}
        />
      )}

      {/* Service Schema */}
      {serviceSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceSchema),
          }}
        />
      )}
    </>
  );
}
