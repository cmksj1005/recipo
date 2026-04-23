import styles from '@/components/recipe/Result.module.css';
import { RecipeResult } from '@/types/recipe';

type resultProp = {
  data: RecipeResult;
};

export default function Result({ data }: resultProp) {
  return (
    <>
      <div className={styles.VideoWrapper}>
        <iframe
          className={styles.recipeVideo}
          src={data.embedUrl}
          allow="web-share; fullscreen"
        ></iframe>
      </div>
      <h2 className={styles.recipeTitle}>{data.title}</h2>
      <div className={styles.recipeWrapper}>
        <div className={styles.ingredientsWrapper}>
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
