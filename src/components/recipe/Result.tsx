import styles from '@/components/recipe/Result.module.css';
import { ResultProps } from '@/types/recipe';

export default function Result({ data }: ResultProps) {
  return (
    <>
      {/* Recipe Video */}
      <div className={styles.VideoWrapper}>
        <iframe
          className={styles.recipeVideo}
          src={data.embedUrl}
          allow="web-share; fullscreen"
        ></iframe>
      </div>
      {/* Recipe Title */}
      <h2 className={styles.recipeTitle}>{data.title}</h2>
      <div className={styles.recipeWrapper}>
        <div className={styles.ingredientsWrapper}>
          {/* Recipe Ingredients */}
          <h3 className={styles.sectionHeading}>Ingredients</h3>
          <ol>
            {data.ingredients.map((ingredient) => (
              <li className={styles.ingredientItem} key={ingredient.name}>
                <span>{ingredient.name}</span>
                <span>
                  {ingredient.quantity} {ingredient.unit}
                </span>
              </li>
            ))}
          </ol>
        </div>
        {/* Recipe Instruction */}
        <div className={styles.instructionsWrapper}>
          <h3 className={styles.sectionHeading}>Instructions</h3>
          <ol>
            {data.instruction.map((step, index) => (
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
