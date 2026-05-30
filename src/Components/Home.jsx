import React from 'react';
import Feed from './Feed/Feed';
import Head from './Helper/Head';
import StoriesBar from './Stories/StoriesBar';
import styles from './Home.module.css';
import { useSocial } from '../context/SocialContext';

const Home = () => {
  const [tab, setTab] = React.useState('forYou');
  const [storyPhotos, setStoryPhotos] = React.useState([]);
  const { following } = useSocial();

  const handlePhotos = React.useCallback((photos) => {
    setStoryPhotos((prev) => {
      const map = new Map();
      [...prev, ...photos].forEach((p) => map.set(p.id, p));
      return Array.from(map.values());
    });
  }, []);

  return (
    <div className={styles.home}>
      <Head title="PetGram" description="PetGram — feed de fotos de pets." />
      <div className={styles.feedCard}>
        <StoriesBar photos={storyPhotos} />
        <div className={styles.tabs} role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'following'}
            className={tab === 'following' ? styles.tabActive : styles.tab}
            onClick={() => setTab('following')}
          >
            Seguindo
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'forYou'}
            className={tab === 'forYou' ? styles.tabActive : styles.tab}
            onClick={() => setTab('forYou')}
          >
            Para você
          </button>
        </div>
        {tab === 'following' && following.length === 0 && (
          <p className={styles.hint}>
            Siga perfis em Explorar para ver posts aqui.
          </p>
        )}
        <Feed
          user={0}
          layout="feed"
          filterFollowing={tab === 'following'}
          onPhotosLoaded={handlePhotos}
        />
      </div>
      <p className="pg-demo-badge">
        Curtidas, seguir e stories são salvos neste navegador (demo).
      </p>
    </div>
  );
};

export default Home;
