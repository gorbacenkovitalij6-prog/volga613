import { Metadata } from 'next';
import { generatePageMetadata, pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata(
  pageMetadata.faq.title,
  pageMetadata.faq.description,
  '/faq'
);

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
