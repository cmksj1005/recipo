// ======================================================
// Main page: handles user input and sends request to API
// ======================================================

// page.tsx -> Server Component (data, layout)
// separate file -> Client Component (input, buttons)
// Since this project is a simple one, I used 'use client' to make it Client Component
'use client';

import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState(''); // to save url that user enters
  const [result, setResult] = useState(''); // to save chatgpt result

  async function handleSubmit(e: React.FormEvent) {
    // Prevent default browser action
    // In this case, it stops page reload and form submission
    e.preventDefault();

    const res = await fetch('/api/extract', {
      method: 'POST',
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
      <form onSubmit={handleSubmit}>
        <label>
          Enter YouTube Link:
          <input
            className="border border-solid"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>
        {/* I used type prop with submit for: */}
        {/* 1. to use clicking button & pressing enter */}
        {/* 2. accessibility tools */}
        <button className="border border-solid" type="submit">
          Enter
        </button>
      </form>
      <p>{result}</p>
    </>
  );
}
