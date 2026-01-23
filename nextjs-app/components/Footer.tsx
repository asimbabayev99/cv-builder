'use client';

import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.footerText}>
          Professional CV templates for your career success
        </p>
      </div>
    </footer>
  );
}
