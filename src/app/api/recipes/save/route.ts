import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST() {
  // auth() is a Clerk server-side function that reads the current request’s authentication session
  // and returns information about the logged-in user, such as userId.
  const { userId } = await auth();

  // NextResponse is used to send a response back to the frontend/browser from your route.ts file.
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // This is for testing.
  return NextResponse.json({
    message: 'User is logged in',
    userId,
  });
}
