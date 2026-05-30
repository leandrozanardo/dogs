import React from 'react';
import styles from './FeedPhotosItem.module.css';
import Image from '../Helper/Image';

const FeedPhotosItem = ({ photo, setModalPhoto }) => {
  function handleClick() {
    setModalPhoto(photo);
  }

  return (
    <li className={styles.photo}>
      <button type="button" className={styles.btn} onClick={handleClick}>
        <Image src={photo.src} alt={photo.title} />
        <span className={styles.overlay}>
          <span className={styles.stat}>♥ {photo.acessos}</span>
        </span>
      </button>
    </li>
  );
};

export default FeedPhotosItem;
