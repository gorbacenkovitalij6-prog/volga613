import { Metadata } from 'next';
import { generatePageMetadata, pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata(
  pageMetadata.services.title,
  pageMetadata.services.description,
  '/services'
);

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
