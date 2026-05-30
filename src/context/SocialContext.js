import React from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export const SocialContext = React.createContext(null);

const KEYS = {
  likes: 'petgram_likes',
  following: 'petgram_following',
  saved: 'petgram_saved',
  storiesSeen: 'petgram_stories_seen',
  activity: 'petgram_activity',
};

export function SocialStorage({ children }) {
  const [likes, setLikes] = useLocalStorage(KEYS.likes, []);
  const [following, setFollowing] = useLocalStorage(KEYS.following, []);
  const [saved, setSaved] = useLocalStorage(KEYS.saved, []);
  const [storiesSeen, setStoriesSeen] = useLocalStorage(KEYS.storiesSeen, []);
  const [activity, setActivity] = useLocalStorage(KEYS.activity, []);

  const pushActivity = React.useCallback(
    (type, message) => {
      setActivity((prev) => [
        { id: Date.now(), type, message, at: new Date().toISOString() },
        ...prev.slice(0, 49),
      ]);
    },
    [setActivity],
  );

  const toggleLike = React.useCallback(
    (photoId, title) => {
      setLikes((prev) => {
        const id = Number(photoId);
        const has = prev.includes(id);
        if (!has) pushActivity('like', `Você curtiu "${title}"`);
        return has ? prev.filter((x) => x !== id) : [...prev, id];
      });
    },
    [setLikes, pushActivity],
  );

  const toggleSave = React.useCallback(
    (photoId, title) => {
      setSaved((prev) => {
        const id = Number(photoId);
        const has = prev.includes(id);
        if (!has) pushActivity('save', `Você salvou "${title}"`);
        return has ? prev.filter((x) => x !== id) : [...prev, id];
      });
    },
    [setSaved, pushActivity],
  );

  const toggleFollow = React.useCallback(
    (username) => {
      setFollowing((prev) => {
        const has = prev.includes(username);
        if (!has) pushActivity('follow', `Você começou a seguir @${username}`);
        else pushActivity('unfollow', `Você deixou de seguir @${username}`);
        return has
          ? prev.filter((u) => u !== username)
          : [...prev, username];
      });
    },
    [setFollowing, pushActivity],
  );

  const markStorySeen = React.useCallback(
    (author) => {
      setStoriesSeen((prev) =>
        prev.includes(author) ? prev : [...prev, author],
      );
    },
    [setStoriesSeen],
  );

  const value = React.useMemo(
    () => ({
      likes,
      saved,
      following,
      storiesSeen,
      activity,
      isLiked: (id) => likes.includes(Number(id)),
      isSaved: (id) => saved.includes(Number(id)),
      isFollowing: (username) => following.includes(username),
      isStorySeen: (author) => storiesSeen.includes(author),
      toggleLike,
      toggleSave,
      toggleFollow,
      markStorySeen,
      likeCount: (id, views) => {
        const base = Number(views) || 0;
        return likes.includes(Number(id)) ? base + 1 : base;
      },
    }),
    [
      likes,
      saved,
      following,
      storiesSeen,
      activity,
      toggleLike,
      toggleSave,
      toggleFollow,
      markStorySeen,
    ],
  );

  return (
    <SocialContext.Provider value={value}>{children}</SocialContext.Provider>
  );
}

export function useSocial() {
  const ctx = React.useContext(SocialContext);
  if (!ctx) throw new Error('useSocial must be used within SocialStorage');
  return ctx;
}
