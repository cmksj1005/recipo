// Middleware = a gatekeeper in front of this app

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};

export function middleware(request: NextRequest) {
  const url = request.nextUrl;

  if (url.hostname === 'www.recipo.ca') {
    url.hostname = 'recipo.ca';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
