import React from 'react';
import { Link } from 'react-router-dom';
import { useSocial } from '../../context/SocialContext';
import { UserContext } from '../../UserContext';
import styles from './ProfileHeader.module.css';

function initials(name) {
  if (!name) return '?';
  return String(name)
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

const ProfileHeader = ({
  username,
  displayName,
  postCount = 0,
  isOwnProfile = false,
}) => {
  const { data } = React.useContext(UserContext);
  const { following, isFollowing, toggleFollow } = useSocial();

  const showFollow = !isOwnProfile && username;
  const followingUser = username && isFollowing(username);

  return (
    <header className={styles.header}>
      <div className={styles.top}>
        <span className={styles.avatar}>{initials(displayName || username)}</span>
        <ul className={styles.stats}>
          <li>
            <strong>{postCount}</strong>
            <span>publicações</span>
          </li>
          <li>
            <strong>{following.length}</strong>
            <span>seguindo</span>
          </li>
          <li>
            <strong>—</strong>
            <span>seguidores</span>
          </li>
        </ul>
      </div>
      <div className={styles.info}>
        <h1 className={styles.username}>@{username}</h1>
        {displayName && <p className={styles.bio}>{displayName}</p>}
        {isOwnProfile && data?.email && (
          <p className={styles.meta}>{data.email}</p>
        )}
      </div>
      <div className={styles.actions}>
        {showFollow && (
          <button
            type="button"
            className={
              followingUser ? styles.btnFollowing : styles.btnFollow
            }
            onClick={() => toggleFollow(username)}
          >
            {followingUser ? 'Seguindo' : 'Seguir'}
          </button>
        )}
        {isOwnProfile && (
          <>
            <Link to="/conta/postar" className={styles.btnSecondary}>
              Novo post
            </Link>
            <Link to="/conta/estatisticas" className={styles.btnSecondary}>
              Insights
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default ProfileHeader;
