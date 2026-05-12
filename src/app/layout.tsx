import type { Metadata } from 'next';
// import Link from 'next/link';
// import {
//   NavigationMenuItem,
//   NavigationMenuLink,
//   navigationMenuTriggerStyle,
// } from '@/components/ui/navigation-menu';
// import {
//   ClerkProvider,
//   Show,
//   SignInButton,
//   SignUpButton,
//   UserButton,
// } from '@clerk/nextjs';
import './globals.css';
import { Overpass, Geist, Geist_Mono } from 'next/font/google';
import { cn } from '@/lib/utils';
import Logo from '@/components/recipe/Logo';
import Navbar from '@/components/navigation/Navbar';

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
        {/* <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem> */}
        {/* <ClerkProvider>
          <header className="flex justify-end items-center p-4 gap-4 h-16">
            <Show when="signed-out">
              <SignInButton />
              <SignUpButton mode="redirect">
                <button className="bg-rose-300 text-white rounded-lg font-medium text-sm sm:text-base h-10 sm:h-8 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
          </header> */}
        <Navbar />
        <Logo />
        {children}
        {/* </ClerkProvider> */}
      </body>
    </html>
  );
}
