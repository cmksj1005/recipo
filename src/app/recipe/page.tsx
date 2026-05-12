// ========================================================================
// Result page: get recipeResult from back-end and display it on the screen
// ========================================================================

'use client';

import { useRouter } from 'next/navigation';
import { RecipeResult } from '@/types/recipe';
import Logo from '@/components/recipe/Logo';
import Result from '@/components/recipe/Result';
import NotificationModal from '@/components/modals/NotificationModal';
import GoHomeButton from '@/components/buttons/GoHomeButton';
import Image from 'next/image';

export default function RecipePage() {
  //get recipe from session storage and display it on the screen
  const router = useRouter();
  let recipeNullWarning: boolean = false;

  // sessionStorage is actually window.sessionStorage.
  // window represents the browser environment.
  // typeof window === "object" -> browser (client)
  // typeof window === "undefined" -> server

  const recipeFromSession =
    // I can only use sessionStorage in the browser,
    // so I check if it is in the browser using 'window !== undefined'
    typeof window !== 'undefined'
      ? sessionStorage.getItem('recipeResult')
      : null;

  const recipe: RecipeResult | null = recipeFromSession
    ? JSON.parse(recipeFromSession)
    : null;

  // if recipe is null, display warning notification
  if (!recipe) {
    recipeNullWarning = true;
  }

  return (
    <>
      {/* Display result after finishing the process from back-end part */}
      {recipe && <Result data={recipe} />}

      <GoHomeButton />

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
