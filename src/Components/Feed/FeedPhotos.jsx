import React from 'react';
import FeedPhotosItem from './FeedPhotosItem';
import PostCard from './PostCard';
import useFetch from '../../Hooks/useFetch';
import { PHOTOS_GET } from '../../Api';
import Error from '../Helper/Error';
import Loading from '../Helper/Loading';
import styles from './FeedPhotos.module.css';

const FeedPhotos = ({
  page,
  user,
  layout = 'feed',
  filterFollowing = false,
  following = [],
  setModalPhoto,
  setInfinite,
  onPhotosLoaded,
}) => {
  const { data, loading, error, request } = useFetch();

  React.useEffect(() => {
    async function fetchPhotos() {
      const total = layout === 'feed' ? 4 : 12;
      const { url, options } = PHOTOS_GET({ page, total, user });
      const { response, json } = await request(url, options);
      if (response && response.ok && json.length < total) setInfinite(false);
      if (response && response.ok && json && onPhotosLoaded) {
        onPhotosLoaded(json);
      }
    }
    fetchPhotos();
  }, [request, user, page, setInfinite, layout, onPhotosLoaded]);

  if (error) {
    return (
      <Error
        error={
          error.includes('Failed') || error.includes('fetch')
            ? 'Não foi possível conectar à API. Tente novamente mais tarde.'
            : error
        }
      />
    );
  }
  if (loading) return <Loading />;
  if (!data) return null;

  let photos = data;
  if (filterFollowing && following.length > 0) {
    photos = data.filter((p) => following.includes(p.author));
  } else if (filterFollowing && following.length === 0) {
    photos = [];
  }

  if (layout === 'feed') {
    if (filterFollowing && photos.length === 0 && page === 1) {
      return (
        <div className="pg-empty">
          <p>Você ainda não segue ninguém.</p>
          <p>
            <a href="/explorar">Explorar pets</a> e toque em Seguir nos perfis.
          </p>
        </div>
      );
    }
    return (
      <div className={styles.postList}>
        {photos.map((photo) => (
          <PostCard key={photo.id} photo={photo} onOpen={setModalPhoto} />
        ))}
      </div>
    );
  }

  return (
    <ul className={`${styles.feed} ${styles.grid}`}>
      {photos.map((photo) => (
        <FeedPhotosItem
          key={photo.id}
          photo={photo}
          setModalPhoto={setModalPhoto}
        />
      ))}
    </ul>
  );
};

export default FeedPhotos;
