// ======================================================
// Main page: handles user input and sends request to API
// ======================================================

// page.tsx -> Server Component (data, layout)
// separate file -> Client Component (input, buttons)
// Since this project is a simple one, I used 'use client' to make it Client Component
'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [url, setUrl] = useState(''); // to save url that user enters
  const [result, setResult] = useState<Recipe | null>(null); // to save result from chatgpt

  // Defined Recipe type for use in state (useState)
  type Recipe = {
    title: string;
    ingredients: string;
    instruction: string[];
    embedUrl: string;
  };

  async function handleSubmit(e: React.FormEvent) {
    // Prevent default browser action
    // In this case, it stops page reload and form submission
    e.preventDefault();

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

    setResult(data.result);
  }

  return (
    <>
      <h1>Recipo</h1>
      <form className={styles.searchbarForm} onSubmit={handleSubmit}>
        {/* search bar */}
        <input
          className={styles.searchBar}
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        {/* search button */}
        <div className={styles.searchButtonContainer}>
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
      </form>
      {/* if I don't check whether result exists first, it returns error */}
      {/* because the result could be null */}
      {result && (
        <>
          <div className={styles.VideoContainer}>
            <iframe
              src={result.embedUrl}
              width="700"
              height="400"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
            ></iframe>
          </div>
          <h2>{result.title}</h2>

          <h3>Ingredients</h3>
          <p>{result.ingredients}</p>

          <h3>Instructions</h3>
          <ol>
            {result.instruction.map((step, index) => (
              <li key={index}>
                {index + 1}. {step}
              </li>
            ))}
          </ol>
        </>
      )}
    </>
  );
}
