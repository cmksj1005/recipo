// ======================================================
// Main page: handles user input and sends request to API
// ======================================================

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { RecipeResult } from '@/types/recipe';
import Image from 'next/image';
import Logo from '@/components/recipe/Logo';
import Searchbar from '@/components/recipe/Searchbar';
import UserGuide from '@/components/recipe/UserGuide';
import Loading from '@/components/recipe/Loading';
import NotificationModal from '@/components/modals/NotificationModal';
import Navbar from '@/components/navigation/Navbar';

export default function Home() {
  const router = useRouter(); // It should be at the top level of the component
  const [result, setResult] = useState<RecipeResult | null>(null); // to save result from chatgpt
  const [loading, setLoading] = useState(false); // for loading spinner
  const [invalidUrlWarning, setInvalidUrlWarning] = useState(false); // to display invalid url warning modal
  const [nonCookingRelatedUrlWarning, setNonCookingRelatedUrlWarning] =
    useState(false); // to display non-cooking-related url warning modal

  // when user enters url, this function will be called.
  async function handleSubmit(url: string) {
    setLoading(true);
    setResult(null);
    setInvalidUrlWarning(false);
    setNonCookingRelatedUrlWarning(false);

    try {
      const res = await fetch('/api/extract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // fetch can only send strings (or binary) in the request body
        // JSON.stringify({url}) = { "url": "https://youtube.com/example" }
        body: JSON.stringify({ url }),
      });

      // get recipe information from route.ts
      const data = await res.json();

      // if url is invalid, set invalidUrlWarning to true
      if (data.recipeResult.invalidUrl) {
        setInvalidUrlWarning(true);
        return;
      }

      // if url is non-cooking-related, set nonCookingRelatedUrlWarning to true
      if (data.recipeResult.nonCookingRelated) {
        setNonCookingRelatedUrlWarning(true);
        return;
      }

      // sessionStorage can only store strings
      sessionStorage.setItem('recipeResult', JSON.stringify(data.recipeResult));

      router.push('/recipe');

      // setResult(data.recipeResult);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <Logo />

      {/* Recipo Searchbar */}
      <Searchbar handleSubmit={handleSubmit} />

      {/* Display loading animation while backend part is processing for recipe */}
      {loading && <Loading />}

      {/* User Guide which users can see in the main page before searching url */}
      {!loading && !result && <UserGuide />}

      {/* If user enters invalid url, Warning notification will be displayed. */}
      <NotificationModal
        open={invalidUrlWarning}
        onOpenChange={setInvalidUrlWarning}
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

      {/* If user enters non-cooking-related url, Warning notification will be displayed. */}
      <NotificationModal
        open={nonCookingRelatedUrlWarning}
        onOpenChange={setNonCookingRelatedUrlWarning}
        titleImage={
          <Image
            src="/icons/embarrassedIcon.png"
            alt="Warning Icon"
            width={40}
            height={40}
          />
        }
        modalTitle="Not a Cooking Video"
        description="Please enter a YouTube link related to cooking."
      />
    </>
  );
}
