import styles from '@/components/recipe/Result.module.css';

export default function Result() {
  return (
    <>
      <div className={styles.VideoWrapper}>
        <iframe
          className={styles.recipeVideo}
          src={result.embedUrl}
          allow="web-share; fullscreen"
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
  );
}
