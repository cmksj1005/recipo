import type { Metadata } from 'next';
import './globals.css';
import { Overpass, Geist, Geist_Mono } from 'next/font/google';
import { cn } from '@/lib/utils';
import Navbar from '@/components/navigation/Navbar';
import { ClerkProvider } from '@clerk/nextjs';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const overpass = Overpass({
  variable: '--font-overpass',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Recipo',
  description: 'Extract recipes from YouTube cooking videos using AI.',
  openGraph: {
    title: 'Recipo',
    description: 'Extract recipes from YouTube cooking videos using AI.',
    url: 'https://recipo.ca',
    siteName: 'Recipo',
    images: [
      {
        url: 'https://recipo.ca/logo.png',
        width: 1200,
        height: 630,
        alt: 'Recipo logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Recipo',
    description: 'Extract recipes from YouTube cooking videos using AI.',
    images: ['https://recipo.ca/logo.png'],
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-full flex flex-col`}
      >
        <ClerkProvider>
          <Navbar />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
