//page.tsx -> Server Component (data, layout)
//separate file -> Client Component (input, buttons)
//Since this project is a simple one, I used 'use client' to make it Client Component
'use client';

import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');

  function tempFunction() {
    alert(url);
  }

  return (
    <>
      <h1>Recipo</h1>
      <form>
        <label>
          Enter YouTube Link:
          <input
            className="border-1 border-solid"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>
        <button className="border-1 border-solid" onClick={tempFunction}>
          Enter
        </button>
      </form>
    </>
  );
}
