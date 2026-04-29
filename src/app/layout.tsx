import type { Metadata } from 'next';
import './globals.css';
import { Overpass, Geist } from 'next/font/google';
import { cn } from '@/lib/utils';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const overpass = Overpass({
  variable: '--font-overpass',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Recipo',
  description: 'AI recipe generator from YouTube',
  openGraph: {
    title: 'Recipo',
    description: 'AI recipe generator from YouTube',
    url: 'https://recipo.ca',
    siteName: 'Recipo',
    images: [
      {
        url: 'https://recipo.ca/logo.png',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        'h-full',
        'antialiased',
        overpass.variable,
        'font-sans',
        geist.variable,
      )}
    >
      <body className={`min-h-full flex flex-col`}>{children}</body>
    </html>
  );
}
