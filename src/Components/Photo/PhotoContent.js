import React from 'react';
import styles from './PhotoContent.module.css';
import { Link } from 'react-router-dom';
import PhotoComments, { usePhotoCommentsState } from './PhotoComments';
import PhotoCommentsForm from './PhotoCommentsForm';
import { UserContext } from '../../UserContext';
import PhotoDelete from './PhotoDelete';
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

const PhotoContent = ({ data, variant = 'modal' }) => {
  const user = React.useContext(UserContext);
  const commentInputRef = React.useRef(null);
  const { isLiked, isSaved, toggleLike, toggleSave, likeCount } = useSocial();
  const { photo, comments: initialComments } = data;
  const [comments, setComments] = usePhotoCommentsState(
    initialComments,
    photo.id,
  );
  const liked = isLiked(photo.id);
  const saved = isSaved(photo.id);
  const isOwner = user.data?.username === photo.author;

  async function handleShare() {
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

  function focusCommentInput() {
    commentInputRef.current?.focus();
  }

  return (
    <article
      className={`${styles.post} ${styles[variant]}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={styles.media} onDoubleClick={handleDoubleLike}>
        <Image src={photo.src} alt={photo.title} />
        {liked && <span className={styles.heartBurst} aria-hidden>♥</span>}
      </div>

      <aside className={styles.panel}>
        <header className={styles.header}>
          <Link to={`/perfil/${photo.author}`} className={styles.user}>
            <span className={styles.avatar}>{avatarInitials(photo.author)}</span>
            <span className={styles.username}>{photo.author}</span>
          </Link>
          {isOwner ? (
            <PhotoDelete id={photo.id} />
          ) : (
            <button type="button" className={styles.more} aria-label="Mais opções">
              <IconMore />
            </button>
          )}
        </header>

        <div className={styles.body}>
          <div className={styles.captionBlock}>
            <Link to={`/perfil/${photo.author}`}>
              <strong>{photo.author}</strong>
            </Link>{' '}
            <span>{photo.title}</span>
            <p className={styles.meta}>
              {photo.peso} kg · {photo.idade}{' '}
              {Number(photo.idade) === 1 ? 'ano' : 'anos'}
            </p>
          </div>
          <PhotoComments comments={comments} />
        </div>

        <footer className={styles.footer}>
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
              onClick={focusCommentInput}
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
            <strong>{likeCount(photo.id, photo.acessos)}</strong> curtidas
          </p>
          <time className={styles.time} dateTime={photo.date}>
            {photo.date || 'Há pouco'}
          </time>
        </footer>

        <PhotoCommentsForm
          id={photo.id}
          setComments={setComments}
          inputRef={commentInputRef}
        />
      </aside>
    </article>
  );
};

export default PhotoContent;
