// ======================================================
// Main page: handles user input and sends request to API
// ======================================================

// page.tsx -> Server Component (data, layout)
// separate file -> Client Component (input, buttons)
// Since this project is a simple one, I used 'use client' to make it Client Component
'use client';

import { useState } from 'react';
import styles from './page.module.css';
import Searchbar from '@/components/recipe/Searchbar';
import type { RecipeResult } from '@/types/recipe';
import Image from 'next/image';
import NotificationModal from '@/components/modals/NotificationModal';
import UserGuide from '@/components/recipe/UserGuide';
import Result from '@/components/recipe/Result';
import Loading from '@/components/recipe/Loading';

export default function Home() {
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

      const data = await res.json();

      // if url is invalid, set showNotification to true
      if (data.recipeResult.invalidUrl) {
        setInvalidUrlWarning(true);
        return;
      }

      // if (data.error === 'Invalid YouTube URL') {
      //   setInvalidUrlWarning(true);
      //   return;
      // }

      // if url is invalid, set showNotification to true
      if (data.recipeResult.nonCookingRelated) {
        setNonCookingRelatedUrlWarning(true);
        return;
      }

      setResult(data.recipeResult);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* screen reader only */}
      <h1 className="sr-only">Recipo</h1>
      <div className={styles.logoWrapper}>
        {/* Used <Image> instead of <img> 
        because it automatically optimizes images 
        (resize, lazy-load, and improve performance) without extra work. */}
        <Image
          src="/logo.png"
          alt="Recipo Logo"
          width={300}
          height={100}
          priority
        />
      </div>

      <Searchbar handleSubmit={handleSubmit} />

      {loading && <Loading />}

      {!loading && !result && <UserGuide />}
      {/* if I don't check whether result exists first, it returns error */}
      {/* because the result could be null */}
      {!loading && result && <Result data={result} />}

      {/* if user enters invalid url, Warning Notification will be displayed. */}
      <NotificationModal
        open={invalidUrlWarning}
        onOpenChange={setInvalidUrlWarning}
        titleImage={
          <Image
            src="/icons/embarrassedIcon.png"
            alt="Invalid URL Notification Icon"
            width={40}
            height={40}
          />
        }
        modalTitle="Invalid YouTube URL"
        description={
          'Please enter a valid YouTube video link.\n(e.g., https://www.youtube.com/...)'
        }
      />

      {/* if user enters non-cooking-related url, Warning Notification will be displayed. */}
      <NotificationModal
        open={nonCookingRelatedUrlWarning}
        onOpenChange={setNonCookingRelatedUrlWarning}
        titleImage={
          <Image
            src="/icons/embarrassedIcon.png"
            alt="Invalid URL Notification Icon"
            width={40}
            height={40}
          />
        }
        modalTitle="Non-cooking URL"
        description={'Please enter cooking related url'}
      />
    </>
  );
}
