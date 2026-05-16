// ==========================================================
// Shared Prisma Client instance for reusable database access
// ==========================================================

import { PrismaClient } from '@/generated/prisma/client';

// globalThis is a built-in global object that survives Next.js hot reloads.
// We store PrismaClient there so it can be reused instead of recreated repeatedly.

// TypeScript normally does not know that globalThis can have a custom
// property named "prisma", so we force-cast the type.

// "as unknown as" is a TypeScript trick used to bypass strict type checking
// and reinterpret globalThis with our custom type.

// We use an object type because "prisma" is a property inside globalThis,
// not globalThis itself.

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

// Next.js development mode reloads files frequently during hot reload.
// If a new PrismaClient is created on every reload, multiple database
// connections can be created repeatedly and cause warnings/errors.
// Store PrismaClient globally during development so the same instance
// can be reused across reloads.

// In production, hot reload usually does not happen, which is why this
// logic is only applied inside the if statement below.
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
