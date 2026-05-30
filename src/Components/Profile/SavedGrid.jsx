import React from 'react';
import useFetch from '../../Hooks/useFetch';
import { PHOTOS_GET } from '../../Api';
import { useSocial } from '../../context/SocialContext';
import FeedPhotosItem from '../Feed/FeedPhotosItem';
import FeedModal from '../Feed/FeedModal';
import Loading from '../Helper/Loading';
import Error from '../Helper/Error';
import styles from '../Feed/FeedPhotos.module.css';

const SavedGrid = () => {
  const { saved } = useSocial();
  const { request, loading, error } = useFetch();
  const [photos, setPhotos] = React.useState([]);
  const [modalPhoto, setModalPhoto] = React.useState(null);

  React.useEffect(() => {
    if (saved.length === 0) {
      setPhotos([]);
      return;
    }
    async function load() {
      const { url, options } = PHOTOS_GET({ page: 1, total: 30, user: 0 });
      const { response, json } = await request(url, options);
      if (response?.ok && json) {
        setPhotos(json.filter((p) => saved.includes(Number(p.id))));
      }
    }
    load();
  }, [saved, request]);

  if (saved.length === 0) {
    return (
      <div className="pg-empty">
        <p>Nenhuma publicação salva.</p>
      </div>
    );
  }
  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  if (photos.length === 0) {
    return (
      <div className="pg-empty">
        <p>Carregue mais posts no feed para ver salvos aqui.</p>
      </div>
    );
  }

  return (
    <>
      {modalPhoto && (
        <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto} />
      )}
      <ul className={`${styles.feed} ${styles.grid}`}>
        {photos.map((photo) => (
          <FeedPhotosItem
            key={photo.id}
            photo={photo}
            setModalPhoto={setModalPhoto}
          />
        ))}
      </ul>
    </>
  );
};

export default SavedGrid;
