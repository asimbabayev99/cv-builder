'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.navbarBrand}>
          <Image
            src="https://www.myperfectcv.co.uk/blobimages/muk/builder/images/logo-new-uk.svg"
            alt="logo"
            width={200}
            height={22}
            priority
          />
        </Link>
      </div>
    </header>
  );
}
