import styles from '@/components/recipe/Loading.module.css';
import Lottie from 'lottie-react'; // to use animation from Lottie Files
import pizzaLoading from '@/app/animations/prepare-food.json'; // to use animation from Lottie Files

export default function Loading() {
  return (
    <div className={styles.loadingWrapper}>
      <Lottie
        animationData={pizzaLoading}
        loop={true}
        className={styles.loadingAnimation}
      />
      <p className={styles.loadingText}>Extracting recipe...</p>
    </div>
  );
}
