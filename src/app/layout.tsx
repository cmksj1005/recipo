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
  description:
    'Recipo transforms YouTube cooking videos into easy-to-follow recipes using AI.',
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
