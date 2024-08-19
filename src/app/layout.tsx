import { Inter } from 'next/font/google';

import '@/styles/globals.css';

import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Country Search',
  description: 'Closet country search challenge with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={cn('text-base', inter.className)}>{children}</body>
    </html>
  );
}
