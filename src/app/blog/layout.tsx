import { Metadata } from 'next';
import { generatePageMetadata, pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata(
  pageMetadata.blog.title,
  pageMetadata.blog.description,
  '/blog'
);

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
