import Link from 'next/link';
import AnimatedImage from '@/components/AnimatedImage';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { BLOG_ARTICLES } from '@/data/blog-articles';

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const ARTICLES_PER_PAGE = 3;
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const totalPages = Math.ceil(BLOG_ARTICLES.length / ARTICLES_PER_PAGE);

  // Вычисляем какие статьи показывать на текущей странице
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const endIndex = startIndex + ARTICLES_PER_PAGE;
  const currentArticles = BLOG_ARTICLES.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col">
      <Breadcrumbs items={[{ label: 'Блог' }]} />

      {/* Hero секция */}
      <section className="bg-gradient-to-br from-muted/50 to-muted py-5 md:py-24">
        <div className="container-custom px-4">
          <div className="max-w-3xl">
            <h1 className="text-xl leading-tight md:text-5xl md:leading-tight font-bold mb-2 md:mb-6">Блог о автопригоне из Европы</h1>
            <p className="text-sm leading-snug md:text-xl md:leading-normal text-muted-foreground">
              Полезные статьи, советы и новости об автопригоне
            </p>
          </div>
        </div>
      </section>

      {/* Статьи */}
      <section className="py-6 md:py-24 bg-background">
        <div className="container-custom px-4">
          {/* Информация о статьях - компактнее на мобильных */}
          <div className="mb-4 md:mb-8 text-center">
            <p className="text-xs md:text-base text-muted-foreground/70 md:text-muted-foreground">
              Показаны {startIndex + 1}-{Math.min(endIndex, BLOG_ARTICLES.length)} из {BLOG_ARTICLES.length}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {currentArticles.map((article) => (
              <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <AnimatedImage
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  containerClassName="aspect-[16/9] md:aspect-video"
                />
                <div className="p-3 md:p-6">
                  <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-2 md:mb-3">
                    <Badge variant="outline" className="text-[10px] md:text-xs">{article.category}</Badge>
                    <div className="flex items-center gap-1 md:gap-2 text-[10px] md:text-sm text-muted-foreground">
                      <Calendar className="w-3 md:w-4 h-3 md:h-4" />
                      <span className="md:hidden">
                        {new Date(article.date).toLocaleDateString('ru-RU', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                      <span className="hidden md:inline">
                        {new Date(article.date).toLocaleDateString('ru-RU', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                  <Link href={`/blog/${article.slug}`}>
                    <h3 className="text-base md:text-xl font-bold mb-2 md:mb-3 line-clamp-2 md:line-clamp-2 hover:text-primary transition-colors cursor-pointer leading-tight">
                      {article.title}
                    </h3>
                  </Link>
                  <p className="text-xs md:text-base text-muted-foreground mb-3 md:mb-4 line-clamp-2 md:line-clamp-3 leading-snug md:leading-normal">{article.excerpt}</p>
                  <div className="flex items-center justify-between pt-2 md:pt-0 border-t md:border-t-0">
                    <span className="text-xs md:text-sm text-muted-foreground">{article.readTime}</span>
                    <Button variant="ghost" size="sm" asChild className="h-8 md:h-9 text-xs md:text-sm px-2 md:px-4">
                      <Link href={`/blog/${article.slug}`} className="group">
                        Читать далее
                        <ArrowRight className="w-3 md:w-4 h-3 md:h-4 ml-1 md:ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Пагинация - компактная на мобильных */}
          {totalPages > 1 && (
            <div className="mt-6 md:mt-12 flex justify-center gap-2 flex-wrap">
              {/* Кнопка "Предыдущая" */}
              {currentPage > 1 ? (
                <Button variant="outline" asChild className="h-9 md:h-10 text-sm">
                  <Link href={`/blog?page=${currentPage - 1}`}>
                    <span className="md:hidden">Назад</span>
                    <span className="hidden md:inline">Предыдущая</span>
                  </Link>
                </Button>
              ) : (
                <Button variant="outline" disabled className="h-9 md:h-10 text-sm">
                  <span className="md:hidden">Назад</span>
                  <span className="hidden md:inline">Предыдущая</span>
                </Button>
              )}

              {/* Номера страниц */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? 'default' : 'outline'}
                  asChild={currentPage !== page}
                  disabled={currentPage === page}
                  className="h-9 md:h-10 min-w-[36px] md:min-w-[40px] text-sm"
                >
                  {currentPage === page ? (
                    <span>{page}</span>
                  ) : (
                    <Link href={`/blog?page=${page}`}>{page}</Link>
                  )}
                </Button>
              ))}

              {/* Кнопка "Следующая" */}
              {currentPage < totalPages ? (
                <Button variant="outline" asChild className="h-9 md:h-10 text-sm">
                  <Link href={`/blog?page=${currentPage + 1}`}>
                    <span className="md:hidden">Вперёд</span>
                    <span className="hidden md:inline">Следующая</span>
                  </Link>
                </Button>
              ) : (
                <Button variant="outline" disabled className="h-9 md:h-10 text-sm">
                  <span className="md:hidden">Вперёд</span>
                  <span className="hidden md:inline">Следующая</span>
                </Button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Подписка на новости - компактнее на мобильных */}
      <section className="py-6 md:py-24 bg-muted/30">
        <div className="container-custom px-4">
          <Card className="p-4 md:p-8 md:p-12 text-center bg-gradient-to-br from-primary/5 to-primary/10">
            <h2 className="text-lg leading-tight md:text-4xl md:leading-tight font-bold mb-2 md:mb-4">Остались вопросы?</h2>
            <p className="text-xs leading-snug md:text-lg md:leading-normal text-muted-foreground mb-4 md:mb-8 max-w-2xl mx-auto">
              Свяжитесь с нами и получите бесплатную консультацию по автопригону
            </p>
            <Button size="lg" asChild className="w-full md:w-auto">
              <Link href="/contacts#form">Связаться с нами</Link>
            </Button>
          </Card>
        </div>
      </section>
    </div>
  );
}
