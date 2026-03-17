import { CONTACTS } from '@/config/contacts';

export default function JsonLd() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${CONTACTS.website}/#organization`,
    name: CONTACTS.companyName,
    alternateName: 'ВОЛГА-АВТО',
    legalName: CONTACTS.legalName,
    description: 'Профессиональный автопригон автомобилей из Европы в Россию',
    url: CONTACTS.website,
    logo: {
      '@type': 'ImageObject',
      '@id': `${CONTACTS.website}/#logo`,
      url: `${CONTACTS.website}/logo-square.png`,
      width: 500,
      height: 500,
      caption: 'ВОЛГА-АВТО Logo',
    },
    image: {
      '@type': 'ImageObject',
      '@id': `${CONTACTS.website}/#primaryImage`,
      url: `${CONTACTS.website}/og-image.jpg`,
      width: 1200,
      height: 630,
      caption: 'ВОЛГА-АВТО - Автопригон из Европы',
    },
    foundingDate: CONTACTS.foundingYear,
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONTACTS.address,
      addressLocality: CONTACTS.city,
      postalCode: CONTACTS.postalCode,
      addressRegion: CONTACTS.region,
      addressCountry: 'RU',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: CONTACTS.phone.replace(/[\s()-]/g, ''),
      contactType: 'customer service',
      email: CONTACTS.email,
      availableLanguage: ['Russian', 'Belarusian'],
      areaServed: ['RU', 'BY'],
    },
    sameAs: [
      CONTACTS.whatsapp,
      CONTACTS.telegram,
    ],
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'AutoDealer',
    '@id': `${CONTACTS.website}/#business`,
    name: CONTACTS.companyName,
    image: [
      {
        '@type': 'ImageObject',
        url: `${CONTACTS.website}/logo-square.png`,
        width: 500,
        height: 500,
      },
      {
        '@type': 'ImageObject',
        url: `${CONTACTS.website}/og-image.jpg`,
        width: 1200,
        height: 630,
      },
    ],
    url: CONTACTS.website,
    telephone: CONTACTS.phone.replace(/[\s()-]/g, ''),
    priceRange: '$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONTACTS.officeAddress,
      addressLocality: CONTACTS.officeCity,
      postalCode: CONTACTS.officePostalCode,
      addressRegion: CONTACTS.officeRegion,
      addressCountry: 'BY',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: CONTACTS.coordinates.lat,
      longitude: CONTACTS.coordinates.lng,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '19:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '10:00',
        closes: '16:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '500',
    },
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Автопригон из Европы',
    provider: {
      '@type': 'Organization',
      name: CONTACTS.companyName,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Россия',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Услуги автопригона',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Подбор автомобиля в Европе',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Проверка и диагностика',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Доставка и растаможка',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Постановка на учет',
          },
        },
      ],
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: CONTACTS.companyName,
    url: CONTACTS.website,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${CONTACTS.website}/catalog?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
