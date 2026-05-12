import Link from 'next/link';
import styles from './GoHomeButton.module.css';

export default function GoHomeButton() {
  return (
    <>
      <div className={styles.buttonWrapper}>
        <button className="w-30 h-auto">
          <Link href="/">
            <div className={styles.buttonTitle}>Go Home</div>
          </Link>
        </button>
      </div>
    </>
  );
}
