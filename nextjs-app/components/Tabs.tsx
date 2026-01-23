'use client';

import styles from './Tabs.module.css';

export type TabType = 'popular' | 'all';

interface TabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function Tabs({ activeTab, onTabChange }: TabsProps) {
  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabs} role="tablist">
        <button
          role="tab"
          className={`${styles.tabBtn} ${activeTab === 'popular' ? styles.active : ''}`}
          onClick={() => onTabChange('popular')}
          aria-selected={activeTab === 'popular'}
        >
          Most popular
        </button>
        <button
          role="tab"
          className={`${styles.tabBtn} ${activeTab === 'all' ? styles.active : ''}`}
          onClick={() => onTabChange('all')}
          aria-selected={activeTab === 'all'}
        >
          All
        </button>
      </div>
    </div>
  );
}
