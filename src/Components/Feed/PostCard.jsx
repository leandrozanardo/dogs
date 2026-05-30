import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PostCard.module.css';
import Image from '../Helper/Image';
import { useSocial } from '../../context/SocialContext';
import {
  IconHeart,
  IconComment,
  IconShare,
  IconBookmark,
  IconMore,
} from '../Icons/Icons';

function avatarInitials(name) {
  if (!name) return '?';
  return String(name).slice(0, 2).toUpperCase();
}

const PostCard = ({ photo, onOpen }) => {
  const { isLiked, isSaved, toggleLike, toggleSave, likeCount } = useSocial();
  const liked = isLiked(photo.id);
  const saved = isSaved(photo.id);
  const displayLikes = likeCount(photo.id, photo.acessos);

  async function handleShare(e) {
    e.stopPropagation();
    const url = `${window.location.origin}/foto/${photo.id}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: photo.title, url });
      } catch {
        /* cancelled */
      }
    } else {
      await navigator.clipboard.writeText(url);
    }
  }

  function handleDoubleLike() {
    if (!liked) toggleLike(photo.id, photo.title);
  }

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <Link to={`/perfil/${photo.author}`} className={styles.user}>
          <span className={styles.avatarRing}>
            <span className={styles.avatar}>{avatarInitials(photo.author)}</span>
          </span>
          <span className={styles.username}>{photo.author}</span>
        </Link>
        <button type="button" className={styles.more} aria-label="Mais opções">
          <IconMore />
        </button>
      </header>

      <button
        type="button"
        className={styles.media}
        onClick={() => onOpen(photo)}
        onDoubleClick={handleDoubleLike}
        aria-label="Abrir publicação"
      >
        <Image src={photo.src} alt={photo.title} />
        {liked && <span className={styles.heartBurst} aria-hidden>♥</span>}
      </button>

      <div className={styles.footer}>
        <div className={styles.actions}>
          <button
            type="button"
            className={liked ? styles.liked : ''}
            onClick={() => toggleLike(photo.id, photo.title)}
            aria-label="Curtir"
          >
            <IconHeart filled={liked} />
          </button>
          <button
            type="button"
            onClick={() => onOpen(photo)}
            aria-label="Comentar"
          >
            <IconComment />
          </button>
          <button type="button" onClick={handleShare} aria-label="Compartilhar">
            <IconShare />
          </button>
          <button
            type="button"
            className={styles.save}
            onClick={() => toggleSave(photo.id, photo.title)}
            aria-label="Salvar"
          >
            <IconBookmark filled={saved} />
          </button>
        </div>
        <p className={styles.likes}>
          <strong>{displayLikes}</strong> curtidas
        </p>
        <p className={styles.caption}>
          <Link to={`/perfil/${photo.author}`}>
            <strong>{photo.author}</strong>
          </Link>{' '}
          {photo.title}
        </p>
        <button
          type="button"
          className={styles.viewComments}
          onClick={() => onOpen(photo)}
        >
          Ver todos os comentários
        </button>
        <time className={styles.time}>{photo.date || 'Há pouco'}</time>
      </div>
    </article>
  );
};

export default PostCard;
