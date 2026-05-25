'use client';

import styles from './SaveRecipeButton.module.css';
import { SaveRecipeButtonProps } from '@/types/recipe';

// Component props are always passed as an Object so you need SaveRecipeButtonProps.
export default function SaveRecipeButton({ recipe }: SaveRecipeButtonProps) {
  async function handleSaveRecipe() {
    const res = await fetch('/api/recipes/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // HTTP request bodies are sent as text / JSON string / binary data
      body: JSON.stringify(recipe),
    });

    const data = await res.json();
    console.log(data.body);
  }

  return (
    <div className={styles.buttonWrapper}>
      <button
        type="button"
        className="w-30 h-auto cursor-pointer"
        onClick={handleSaveRecipe}
      >
        <div className={styles.buttonTitle}>Save</div>
      </button>
    </div>
  );
}
