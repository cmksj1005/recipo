import Image from 'next/image';
import styles from '@/components/recipe/Logo.module.css';

export default function Logo() {
  return (
    <>
      {/* screen reader only */}
      <h1 className="sr-only">Recipo</h1>
      <div className={styles.logoWrapper}>
        {/* Recipo Logo */}
        <Image
          className="w-[200px] md:w-[300px] h-auto cursor-pointer"
          src="/logo.png"
          alt="Recipo Logo"
          width={300}
          height={100}
          priority
        />
      </div>
    </>
  );
}
