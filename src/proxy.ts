import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Routes that do not require authentication
const isPublicRoute = createRouteMatcher(['/', '/sign-in(.*)', '/sign-up(.*)']);

// Enforce authentication on all non-public routes
export default clerkMiddleware(async (auth, req) => {
  // If this page is NOT public
  if (!isPublicRoute(req)) {
    // Require Sign In
    await auth.protect();
  }
});

// Tells Next.js which requests this middleware should run on
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    // Always run for Clerk-specific frontend API routes
    '/__clerk/(.*)',
  ],
};

// Redirects www.recipo.ca to recipo.ca to avoid duplicate domain issues
export function middleware(request: NextRequest) {
  const url = request.nextUrl;

  if (url.hostname === 'www.recipo.ca') {
    url.hostname = 'recipo.ca';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
