'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { RecipeResult } from '@/types/recipe';
import Logo from '@/components/recipe/Logo';
import Result from '@/components/recipe/Result';
import NotificationModal from '@/components/modals/NotificationModal';
import Image from 'next/image';
// import Searchbar from '@/components/recipe/Searchbar';

export default function RecipePage() {
  const router = useRouter();
  const [recipeNullWarning, setRecipeNullWaring] = useState(false);

  useEffect(() => {
    const storedRecipe = sessionStorage.getItem('recipeResult');

    let recipe: RecipeResult | null = null;

    if (storedRecipe) {
      recipe = JSON.parse(storedRecipe);
    }

    if (!recipe) {
      setRecipeNullWaring(true);
      console.log('This error is from RecipePage because recipe has null');
    }
  });

  return (
    <>
      <Logo />

      {/* Display result after finishing the process from back-end part */}
      {recipe && <Result data={recipe} />}

      <NotificationModal
        open={recipeNullWarning}
        onOpenChange={(open) => {
          setRecipeNullWaring(open);
          if (!open) {
            router.push('/');
          }
        }}
        titleImage={
          <Image
            src="/icons/embarrassedIcon.png"
            alt="Warning Icon"
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
