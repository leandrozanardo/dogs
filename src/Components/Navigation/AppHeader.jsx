import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AppHeader.module.css';
import { IconMessenger } from '../Icons/Icons';

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link className={styles.logo} to="/" aria-label="PetGram">
          PetGram
        </Link>
        <div className={styles.searchWrap}>
          <input
            type="search"
            className={styles.search}
            placeholder="Pesquisa"
            disabled
            aria-label="Pesquisa (em breve)"
          />
        </div>
        <div className={styles.actions}>
          <button type="button" className={styles.iconBtn} title="Em breve">
            <IconMessenger />
          </button>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
