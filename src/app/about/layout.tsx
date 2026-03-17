import { Metadata } from 'next';
import { generatePageMetadata, pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata(
  pageMetadata.about.title,
  pageMetadata.about.description,
  '/about'
);

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
