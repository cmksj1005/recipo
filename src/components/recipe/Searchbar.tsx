'use client';

import { useState } from 'react';
import styles from './Searchbar.module.css';

type SearchbarProps = {
  handleSubmit: (url: string) => Promise<void> | void;
  // loading: boolean;
};

export default function Searchbar({ handleSubmit }: SearchbarProps) {
  const [url, setUrl] = useState(''); // to save url that user enters
  // useState(false); // to display non-cooking-related url warning modal

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    // // Prevent default browser action
    // // In this case, it stops page reload and form submission
    e.preventDefault();
    handleSubmit(url);
  }

  return (
    <form className={styles.searchbarForm} onSubmit={onSubmit}>
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
