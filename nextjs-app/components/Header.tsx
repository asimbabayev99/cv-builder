'use client';

import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a className={styles.navbarBrand}>
          <svg width="200" height="22" viewBox="0 0 200 22" fill="none">
            <text x="0" y="18" fill="#333" fontSize="18" fontWeight="bold" fontFamily="sans-serif">
              CV Builder
            </text>
          </svg>
        </a>
      </div>
    </header>
  );
}
