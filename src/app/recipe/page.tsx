'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RecipeResult } from '@/types/recipe';
import Logo from '@/components/recipe/Logo';
import Result from '@/components/recipe/Result';
import NotificationModal from '@/components/modals/NotificationModal';
import Image from 'next/image';
// import Searchbar from '@/components/recipe/Searchbar';

export default function RecipePage() {
  const router = useRouter();
  const storedRecipe = sessionStorage.getItem('recipeResult');
  const [recipeNullWarning, SetRecipeNullWaring] = useState(false);
  let recipe: RecipeResult | null = null;

  if (storedRecipe) {
    recipe = JSON.parse(storedRecipe);
  }

  if (!recipe) {
    console.error('This error is from RecipePage because recipe has null');
    SetRecipeNullWaring(true);
    router.push('/');
  }

  return (
    <>
      <Logo />

      {/* Display result after finishing the process from back-end part */}
      {recipe && <Result data={recipe} />}

      <NotificationModal
        open={recipeNullWarning}
        onOpenChange={SetRecipeNullWaring}
        titleImage={
          <Image
            src="/icons/embarrassedIcon.png"
            alt="Invalid URL Notification Icon"
            width={40}
            height={40}
          />
        }
        modalTitle="Invalid YouTube Link"
        description={
          'Please enter a valid YouTube video link.\n\nIf the video is valid, it may not have a transcript or enough spoken content to generate a recipe.'
        }
      />
    </>
  );
}
