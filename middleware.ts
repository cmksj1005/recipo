// Middleware = a gatekeeper in front of this app

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;

  if (url.hostname === 'www.recipo.ca') {
    url.hostname = 'recipo.ca';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
