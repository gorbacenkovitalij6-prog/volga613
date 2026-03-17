import { Metadata } from 'next';
import { generatePageMetadata, pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata(
  pageMetadata.contacts.title,
  pageMetadata.contacts.description,
  '/contacts'
);

export default function ContactsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
