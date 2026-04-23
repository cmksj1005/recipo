// ======================================================
// Main page: handles user input and sends request to API
// ======================================================

// page.tsx -> Server Component (data, layout)
// separate file -> Client Component (input, buttons)
// Since this project is a simple one, I used 'use client' to make it Client Component
'use client';

import { useState } from 'react';
import styles from './page.module.css';
import Lottie from 'lottie-react'; // to use animation from Lottie Files
import pizzaLoading from './animations/prepare-food.json'; // to use animation from Lottie Files
import Image from 'next/image';
import NotificationModal from '@/components/modals/NotificationModal';
import Instructions from '@/components/recipe/Instructions';

export default function Home() {
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
        />
      </div>

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

      {!loading && !invalidUrlWarning && !nonCookingRelatedUrlWarning && (
        <Instructions />
      )}
      {/* display loading spinner animation when it is loading */}
      {loading && !invalidUrlWarning && !nonCookingRelatedUrlWarning && (
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
      {!loading && result && (
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
