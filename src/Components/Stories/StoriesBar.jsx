import React from 'react';
import { UserContext } from '../../UserContext';
import { useSocial } from '../../context/SocialContext';
import StoryViewer from './StoryViewer';
import styles from './StoriesBar.module.css';

function groupByAuthor(photos) {
  const groups = {};
  photos.forEach((photo) => {
    if (!groups[photo.author]) groups[photo.author] = [];
    groups[photo.author].push(photo);
  });
  return Object.entries(groups).map(([author, items]) => ({
    author,
    photos: items.slice(0, 5),
  }));
}

const StoriesBar = ({ photos }) => {
  const { data } = React.useContext(UserContext);
  const { isStorySeen } = useSocial();
  const [viewer, setViewer] = React.useState(null);

  const stories = React.useMemo(() => groupByAuthor(photos), [photos]);

  const myStory =
    data?.username &&
    photos.find((p) => p.author === data.username);

  return (
    <>
      <div className={styles.bar} role="list">
        {data && (
          <button
            type="button"
            className={styles.story}
            onClick={() =>
              myStory
                ? setViewer({ author: data.username, photos: [myStory] })
                : null
            }
          >
            <span
              className={`${styles.ring} ${
                isStorySeen(data.username) ? styles.seen : ''
              }`}
            >
              <span className={styles.avatar}>+</span>
            </span>
            <span className={styles.label}>Seu story</span>
          </button>
        )}
        {stories.map(({ author, photos: authorPhotos }) => (
          <button
            key={author}
            type="button"
            className={styles.story}
            onClick={() => setViewer({ author, photos: authorPhotos })}
          >
            <span
              className={`${styles.ring} ${
                isStorySeen(author) ? styles.seen : ''
              }`}
            >
              <span className={styles.avatar}>
                {author.slice(0, 2).toUpperCase()}
              </span>
            </span>
            <span className={styles.label}>{author}</span>
          </button>
        ))}
      </div>
      {viewer && (
        <StoryViewer story={viewer} onClose={() => setViewer(null)} />
      )}
    </>
  );
};

export default StoriesBar;
