import React from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import useCommentPost from '../../Hooks/useCommentPost';
import styles from './PhotoCommentsForm.module.css';

const PhotoCommentsForm = ({ id, setComments, inputRef }) => {
  const [comment, setComment] = React.useState('');
  const { login } = React.useContext(UserContext);
  const { postComment, loading, error, success, clearFeedback } = useCommentPost();

  const hasToken =
    typeof window !== 'undefined' && !!window.localStorage.getItem('token');
  const canShowForm = login === true || hasToken;

  async function submitComment() {
    const result = await postComment(id, comment);
    if (result) {
      setComments((prev) => [...prev, result]);
      setComment('');
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    submitComment();
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      submitComment();
    }
  }

  if (login === null && !hasToken) {
    return (
      <div className={styles.placeholder}>
        <span className={styles.skeleton} />
      </div>
    );
  }

  if (!canShowForm) {
    return (
      <p className={styles.loginCta}>
        <Link to="/login">Entre</Link> para comentar.
        <span className={styles.demoHint}>
          {' '}
          (demo: usuário <strong>dog</strong> / senha <strong>dog</strong>)
        </span>
      </p>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <input
          ref={inputRef}
          type="text"
          className={styles.input}
          placeholder="Adicione um comentário..."
          value={comment}
          onChange={({ target }) => {
            setComment(target.value);
            if (error || success) clearFeedback();
          }}
          onKeyDown={handleKeyDown}
          maxLength={2200}
          aria-label="Comentário"
          autoComplete="off"
          disabled={loading}
        />
        <button
          type="submit"
          className={styles.postBtn}
          disabled={loading}
        >
          {loading ? '...' : 'Publicar'}
        </button>
      </div>
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
      {success && !error && (
        <p className={styles.success}>Comentário publicado!</p>
      )}
    </form>
  );
};

export default PhotoCommentsForm;
