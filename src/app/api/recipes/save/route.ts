import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
// Import shared Prisma Client to securely interact with the PostgreSQL database from this server-side API route.
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  // auth() is a Clerk server-side function that reads the current request’s authentication session
  // and returns information about the logged-in user, such as userId.
  const { userId } = await auth();

  // NextResponse is used to send a response back to the frontend/browser from your route.ts file.
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const recipe = await request.json();

  const savedRecipe = await prisma.recipe.create({
    data: {
      userId,
      title: recipe.title,
      videoUrl: recipe.videoUrl,
      embedUrl: recipe.embedUrl,
      ingredients: {
        create: recipe.ingredients.map((ingredient, index) => ({
          name: ingredient.name,
          quantity: ingredient.quantity,
          unit: ingredient.unit,
          displayOrder: index + 1,
        })),
      },
      instructions: {
        create: recipe.instruction.map((step, index) => ({
          stepNumber: index + 1,
          content: step,
        })),
      },
    },
  });

  return NextResponse.json({
    message: 'Recipe saved successfully',
    recipeId: savedRecipe.id,
  });
}
