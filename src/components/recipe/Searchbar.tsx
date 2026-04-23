'use client';

import { useState } from 'react';
import styles from './Searchbar.module.css';
import type { RecipeResult } from '@/types/recipe';

export default function Searchbar() {
  const [url, setUrl] = useState(''); // to save url that user enters
  const [result, setResult] = useState<RecipeResult | null>(null); // to save result from chatgpt
  const [loading, setLoading] = useState(false); // for loading spinner
  const [invalidUrlWarning, setInvalidUrlWarning] = useState(false); // to display invalid url warning modal
  const [nonCookingRelatedUrlWarning, setNonCookingRelatedUrlWarning] =
    useState(false); // to display non-cooking-related url warning modal

  // when user enters url, this function will be called.
  async function handleSubmit(e: React.FormEvent) {
    // Prevent default browser action
    // In this case, it stops page reload and form submission
    e.preventDefault();

    setLoading(true);
    setResult(null); // clear previous result
    // setInvalidUrlWarning(false);
    // setNonCookingRelatedUrlWarning(false);

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

      // if url is invalid, set showNotification to true
      if (data.recipeResult.invalidUrl) {
        setInvalidUrlWarning(true);
      }

      // if url is invalid, set showNotification to true
      if (data.recipeResult.nonCookingRelated) {
        setNonCookingRelatedUrlWarning(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
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
  );
}
