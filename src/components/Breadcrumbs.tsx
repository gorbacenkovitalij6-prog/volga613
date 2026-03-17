import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  // Генерация JSON-LD для BreadcrumbList
  const breadcrumbList = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Главная',
        item: 'https://volga-auto-premier.ru/',
      },
      ...items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: item.label,
        ...(item.href ? { item: `https://volga-auto-premier.ru${item.href}` } : {}),
      })),
    ],
  };

  return (
    <>
      {/* JSON-LD микроразметка */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
      />

      <nav aria-label="Breadcrumb" className="py-3 md:py-4 border-b border-border bg-muted/50">
        <div className="container-custom px-4">
          <ol
            className="flex items-center gap-2 text-sm flex-wrap"
            itemScope
            itemType="https://schema.org/BreadcrumbList"
          >
            {/* Home */}
            <li
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <Link
                href="/"
                className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
                aria-label="Главная"
                itemProp="item"
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline" itemProp="name">Главная</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>

            {/* Breadcrumb items */}
            {items.map((item, index) => {
              const isLast = index === items.length - 1;
              const position = index + 2;

              return (
                <li
                  key={index}
                  className="flex items-center gap-2"
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/ListItem"
                >
                  <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  {item.href && !isLast ? (
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-primary transition-colors line-clamp-1"
                      itemProp="item"
                    >
                      <span itemProp="name">{item.label}</span>
                    </Link>
                  ) : (
                    <span className="text-zinc-900 font-medium line-clamp-1" aria-current="page" itemProp="name">
                      {item.label}
                    </span>
                  )}
                  <meta itemProp="position" content={String(position)} />
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
    </>
  );
}
