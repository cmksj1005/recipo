import Link from 'next/link';
import styles from '@/components/buttons/GoHomeButton.module.css';

export default function GoHomeButton() {
  return (
    <>
      <div className={styles.buttonWrapper}>
        <button className="w-30 h-auto">
          <Link href="/">
            <div className={styles.buttonTitle}>Main</div>
          </Link>
        </button>
      </div>
    </>
  );
}
