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
  const [language, setLanguage] = useState(''); // to save language option

  // Defined Recipe type for use in state (useState)
  type Recipe = {
    title: string;
    ingredients: string;
    instruction: string[];
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
      body: JSON.stringify({ url, language }),
    });

    const data = await res.json();

    setResult(data.result);
  }

  return (
    <>
      <h1>Recipo</h1>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <input
          className={styles.searchBar}
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button className={styles.searchButton} type="submit">
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

        {/* I used type prop with submit for: */}
        {/* 1. to use clicking button & pressing enter */}
        {/* 2. accessibility tools */}

        <select
          className={styles.languageSelector}
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="English">English</option>
          <option value="French">French</option>
          <option value="Korean">Korean</option>
        </select>
      </form>
      {/* if I don't check whether result exists first, it returns error */}
      {/* because the result could be null */}
      {result && (
        <>
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
