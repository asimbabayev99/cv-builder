'use client';

import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.footerText}>
          *The names and logos of the companies mentioned above are registered trademarks of their respective owners.
        </p>
      </div>
    </footer>
  );
}
