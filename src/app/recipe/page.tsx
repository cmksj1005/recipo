// ========================================================================
// Result page: get recipeResult from back-end and display it on the screen
// ========================================================================

'use client';

import { useRouter } from 'next/navigation';
import { RecipeResult } from '@/types/recipe';
import Logo from '@/components/recipe/Logo';
import Result from '@/components/recipe/Result';
import NotificationModal from '@/components/modals/NotificationModal';
import Image from 'next/image';

export default function RecipePage() {
  //get recipe from session storage and display it on the screen
  const router = useRouter();
  const recipeFromSession = sessionStorage.getItem('recipeResult');
  let recipeNullWarning: boolean = false;

  const recipe: RecipeResult | null = recipeFromSession
    ? JSON.parse(recipeFromSession)
    : null;

  if (!recipe) {
    recipeNullWarning = true;
  }

  return (
    <>
      <Logo />

      {/* Display result after finishing the process from back-end part */}
      {recipe && <Result data={recipe} />}

      {/* If user goes to recipe page without searching, Warning notification will be displayed */}
      <NotificationModal
        open={recipeNullWarning}
        onOpenChange={() => {
          router.push('/');
        }}
        titleImage={
          <Image
            src="/icons/embarrassedIcon.png"
            alt="Warning Icon"
            width={40}
            height={40}
          />
        }
        modalTitle="Recipe Not Found"
        description="No recipe result was found. Please search again from the main page."
      />
    </>
  );
}
