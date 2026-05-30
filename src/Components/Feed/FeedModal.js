import React from 'react';
import styles from './FeedModal.module.css';
import useFetch from '../../Hooks/useFetch';
import Error from '../Helper/Error';
import Loading from '../Helper/Loading';
import { PHOTO_GET } from '../../Api';
import PhotoContent from '../Photo/PhotoContent';
import { IconClose } from '../Icons/Icons';

const FeedModal = ({ photo, setModalPhoto }) => {
  const { data, error, loading, request } = useFetch();

  React.useEffect(() => {
    const { url, options } = PHOTO_GET(photo.id);
    request(url, options);
    document.body.classList.add('pg-modal-open');
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.classList.remove('pg-modal-open');
      document.body.style.overflow = '';
    };
  }, [photo, request]);

  React.useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setModalPhoto(null);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setModalPhoto]);

  function handleBackdrop(event) {
    if (event.target === event.currentTarget) setModalPhoto(null);
  }

  return (
    <div className={styles.modal} onClick={handleBackdrop} role="dialog" aria-modal="true">
      <button
        type="button"
        className={styles.close}
        onClick={() => setModalPhoto(null)}
        aria-label="Fechar"
      >
        <IconClose />
      </button>
      {error && <Error error={error} />}
      {loading && <Loading />}
      {data && <PhotoContent data={data} variant="modal" />}
    </div>
  );
};

export default FeedModal;
