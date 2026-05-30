import React from 'react';
import styles from './ProfileTabs.module.css';

const ProfileTabs = ({ tab, onTabChange }) => {
  return (
    <div className={styles.tabs} role="tablist">
      <button
        type="button"
        role="tab"
        aria-selected={tab === 'posts'}
        className={tab === 'posts' ? styles.active : styles.tab}
        onClick={() => onTabChange('posts')}
      >
        Publicações
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={tab === 'saved'}
        className={tab === 'saved' ? styles.active : styles.tab}
        onClick={() => onTabChange('saved')}
      >
        Salvos
      </button>
    </div>
  );
};

export default ProfileTabs;
