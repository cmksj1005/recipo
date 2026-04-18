import type { Metadata } from 'next';
import './globals.css';
import { Overpass } from 'next/font/google';

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
    <html lang="en" className={`${overpass.variable} h-full antialiased`}>
      <body className={`min-h-full flex flex-col`}>{children}</body>
    </html>
  );
}
