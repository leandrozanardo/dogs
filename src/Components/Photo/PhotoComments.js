import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PhotoComments.module.css';

export function usePhotoCommentsState(initialComments, id) {
  const [comments, setComments] = React.useState(initialComments || []);

  React.useEffect(() => {
    setComments(initialComments || []);
  }, [id, initialComments]);

  return [comments, setComments];
}

const PhotoComments = ({ comments }) => {
  const listRef = React.useRef(null);

  React.useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [comments]);

  return (
    <ul ref={listRef} className={styles.list}>
      {comments.length === 0 && (
        <li className={styles.empty}>Seja o primeiro a comentar.</li>
      )}
      {comments.map((item) => (
        <li key={item.comment_ID} className={styles.item}>
          <Link to={`/perfil/${item.comment_author}`}>
            <strong>{item.comment_author}</strong>
          </Link>{' '}
          <span>{item.comment_content}</span>
        </li>
      ))}
    </ul>
  );
};

export default PhotoComments;
