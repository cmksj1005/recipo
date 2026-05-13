import Logo from './Logo';
import styles from './Result.module.css';
import { ResultProps } from '@/types/recipe';

export default function Result({ data }: ResultProps) {
  return (
    <>
      <Logo />

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
          <ol className="list-decimal pl-4">
            {data.instruction.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
}
