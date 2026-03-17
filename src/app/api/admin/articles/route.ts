import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'src/data/db/articles.json');

async function readArticles() {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeArticles(articles: any[]) {
  await fs.writeFile(DB_PATH, JSON.stringify(articles, null, 2), 'utf-8');
}

// GET - получить все статьи
export async function GET() {
  try {
    const articles = await readArticles();
    return NextResponse.json(
      { success: true, data: articles },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }
    );
  } catch (error) {
    console.error('Ошибка чтения статей:', error);
    return NextResponse.json(
      { success: false, message: 'Ошибка чтения данных' },
      { status: 500 }
    );
  }
}

// POST - создать новую статью
export async function POST(request: NextRequest) {
  try {
    const articles = await readArticles();
    const body = await request.json();

    const slug = body.slug || body.title
      .toLowerCase()
      .replace(/[^а-яa-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');

    const newArticle = {
      ...body,
      id: articles.length > 0 ? Math.max(...articles.map((a: any) => a.id)) + 1 : 1,
      slug,
      date: body.date || new Date().toISOString().split('T')[0],
    };

    articles.push(newArticle);
    await writeArticles(articles);

    return NextResponse.json({ success: true, data: newArticle });
  } catch (error) {
    console.error('Ошибка создания статьи:', error);
    return NextResponse.json(
      { success: false, message: 'Ошибка создания статьи' },
      { status: 500 }
    );
  }
}

// PUT - обновить статью
export async function PUT(request: NextRequest) {
  try {
    const articles = await readArticles();
    const body = await request.json();

    const index = articles.findIndex((a: any) => a.id === body.id);
    if (index === -1) {
      return NextResponse.json(
        { success: false, message: 'Статья не найдена' },
        { status: 404 }
      );
    }

    articles[index] = { ...articles[index], ...body };
    await writeArticles(articles);

    return NextResponse.json({ success: true, data: articles[index] });
  } catch (error) {
    console.error('Ошибка обновления статьи:', error);
    return NextResponse.json(
      { success: false, message: 'Ошибка обновления статьи' },
      { status: 500 }
    );
  }
}

// DELETE - удалить статью
export async function DELETE(request: NextRequest) {
  try {
    const articles = await readArticles();
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get('id'));

    const filteredArticles = articles.filter((a: any) => a.id !== id);

    if (filteredArticles.length === articles.length) {
      return NextResponse.json(
        { success: false, message: 'Статья не найдена' },
        { status: 404 }
      );
    }

    await writeArticles(filteredArticles);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Ошибка удаления статьи:', error);
    return NextResponse.json(
      { success: false, message: 'Ошибка удаления статьи' },
      { status: 500 }
    );
  }
}
