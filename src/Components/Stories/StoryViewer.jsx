import React from 'react';
import { useSocial } from '../../context/SocialContext';
import Image from '../Helper/Image';
import styles from './StoryViewer.module.css';

const StoryViewer = ({ story, onClose }) => {
  const { markStorySeen } = useSocial();
  const [index, setIndex] = React.useState(0);
  const photo = story.photos[index];

  React.useEffect(() => {
    return () => markStorySeen(story.author);
  }, [story.author, markStorySeen]);

  function handleClose() {
    markStorySeen(story.author);
    onClose();
  }

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <button type="button" className={styles.close} onClick={handleClose}>
        ✕
      </button>
      <header className={styles.header}>@{story.author}</header>
      <div className={styles.media}>
        {photo && <Image src={photo.src} alt={photo.title} />}
      </div>
      <p className={styles.caption}>{photo?.title}</p>
      <div className={styles.nav}>
        <button
          type="button"
          disabled={index === 0}
          onClick={() => setIndex((i) => i - 1)}
        >
          Anterior
        </button>
        <span>
          {index + 1} / {story.photos.length}
        </span>
        <button
          type="button"
          disabled={index >= story.photos.length - 1}
          onClick={() => setIndex((i) => i + 1)}
        >
          Próximo
        </button>
      </div>
    </div>
  );
};

export default StoryViewer;
