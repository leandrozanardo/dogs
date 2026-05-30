import React from 'react';
import Feed from '../Feed/Feed';
import Head from '../Helper/Head';
import styles from './ExplorePage.module.css';

const ExplorePage = () => {
  return (
    <section className={styles.page}>
      <Head title="Explorar" description="Descubra pets no PetGram." />
      <div className={styles.gridWrap}>
        <Feed user={0} layout="grid" />
      </div>
    </section>
  );
};

export default ExplorePage;
