// ======================================================
// Main page: handles user input and sends request to API
// ======================================================

// page.tsx -> Server Component (data, layout)
// separate file -> Client Component (input, buttons)
// Since this project is a simple one, I used 'use client' to make it Client Component
'use client';

import { useState } from 'react';
import styles from './page.module.css';
import type { RecipeResult } from '@/types/recipe';
import Lottie from 'lottie-react'; // to use animation from Lottie Files
import pizzaLoading from './animations/Prepare-Food.json'; // to use animation from Lottie Files
import Image from 'next/image';
import NotificationModal from '@/components/modals/NotificationModal';

export default function Home() {
  const [url, setUrl] = useState(''); // to save url that user enters
  const [result, setResult] = useState<RecipeResult | null>(null); // to save result from chatgpt
  const [loading, setLoading] = useState(false); // for loading spinner
  const [showNotification, setShowNotification] = useState(false); // for display notificaton modal window.

  async function handleSubmit(e: React.FormEvent) {
    // Prevent default browser action
    // In this case, it stops page reload and form submission
    e.preventDefault();

    setLoading(true);
    setResult(null); // clear previous result

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

      setResult(data.recipeResult);

      // why setResult doesn't work right away?
      if (!data.recipeResult.isUrlValid) {
        setShowNotification(true);
      }
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
          className={styles.logo}
          src="/logo.png"
          alt="Recipo Logo"
          width={300}
          height={100}
          priority
        ></Image>
      </div>

      <form className={styles.searchbarForm} onSubmit={handleSubmit}>
        {/* search bar */}
        <div className={styles.searchbarWrapper}>
          <input
            className={styles.searchBar}
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          {/* search button */}
          <div className={styles.searchButtonWrapper}>
            <button className={styles.submitButton} type="submit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </form>

      <NotificationModal
        open={showNotification}
        onOpenChange={setShowNotification}
        title="Invalid YouTube URL"
        description=<div>
          Please enter a valid YouTube video link. <br />
          (e.g., https://www.youtube.com/...)
        </div>
      />

      {!loading && !result?.isUrlValid && (
        <div className={styles.userGuideWrapper}>
          <div className={styles.userGuide}>
            <div className={styles.guideSection}>
              <div className={styles.guideTitle}>
                <Image
                  src="/icons/questionIcon.png"
                  alt="question mark icon"
                  width={70}
                  height={25}
                  priority
                ></Image>
                <h2>How to Use Recipo</h2>
              </div>
              <ul>
                <li>
                  Paste a <strong>YouTube cooking video URL</strong> into the
                  search bar and submit.
                </li>
                <li>
                  The app will automatically extract and generate a structured
                  recipe from the video.
                </li>
              </ul>
            </div>
            <div className={styles.guideSection}>
              <div className={styles.guideTitle}>
                <Image
                  src="/icons/starIcon.png"
                  alt="question mark icon"
                  width={70}
                  height={25}
                  priority
                ></Image>
                <h2>Important Notes</h2>
              </div>
              <ul>
                <li>
                  Recipes are generated using{' '}
                  <strong>AI based on the video’s transcript</strong>.
                </li>
                <li>
                  If the video{' '}
                  <strong>does not include spoken instructions </strong>
                  or{' '}
                  <strong>
                    does not have an available transcript (including
                    auto-generated captions)
                  </strong>
                  , the recipe may not be displayed or may be incomplete.
                </li>
                <li>
                  The accuracy of the recipe depends on the{' '}
                  <strong>quality and clarity of the transcript</strong>.
                </li>
              </ul>
            </div>
            <div className={styles.guideSection}>
              <div className={styles.guideTitle}>
                <Image
                  src="/icons/conversationIcon.png"
                  alt="question mark icon"
                  width={70}
                  height={25}
                  priority
                ></Image>
                <h2>Feedback & Support</h2>
              </div>
              <ul>
                <li>
                  If you encounter any{' '}
                  <strong>errors, bugs, or unexpected results</strong>, please
                  let me know.
                </li>
                <li>
                  Your feedback is extremely valuable and helps improve the
                  application.
                </li>
                <li>
                  I appreciate your support in making this tool better for
                  everyone.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
      {/* display loading spinner animation when it is loading */}
      {loading && result?.isUrlValid && (
        <div className={styles.loadingWrapper}>
          <Lottie
            animationData={pizzaLoading}
            loop={true}
            className={styles.loadingAnimation}
          />
          <p className={styles.loadingText}>Extracting recipe...</p>
        </div>
      )}
      {/* if I don't check whether result exists first, it returns error */}
      {/* because the result could be null */}
      {!loading && result?.isUrlValid && (
        <>
          <div className={styles.VideoWrapper}>
            <iframe
              className={styles.recipeVideo}
              src={result.embedUrl}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
            ></iframe>
          </div>
          <h2 className={styles.recipeTitle}>{result.title}</h2>
          <div className={styles.recipeWrapper}>
            <div className={styles.ingredientsWrapper}>
              <h3 className={styles.sectionHeading}>Ingredients</h3>
              <ol>
                {result.ingredients.map((ingredient) => (
                  <li className={styles.ingredientItem} key={ingredient.name}>
                    <span>{ingredient.name}</span>
                    <span>
                      {ingredient.quantity} {ingredient.unit}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className={styles.instructionsWrapper}>
              <h3 className={styles.sectionHeading}>Instructions</h3>
              <ol>
                {result.instruction.map((step, index) => (
                  <li key={index}>
                    {index + 1}. {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </>
      )}
    </>
  );
}
