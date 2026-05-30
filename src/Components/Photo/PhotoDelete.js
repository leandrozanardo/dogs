import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PhotoDelete.module.css';
import { PHOTO_DELETE } from '../../Api';
import useFetch from '../../Hooks/useFetch';

const PhotoDelete = ({ id }) => {
  const { loading, request } = useFetch();
  const navigate = useNavigate();

  async function handleClick() {
    const confirmed = window.confirm('Tem certeza que deseja deletar?');
    if (confirmed) {
      const { url, options } = PHOTO_DELETE(id);
      const { response } = await request(url, options);
      if (response.ok) navigate('/conta', { replace: true });
    }
  }

  return (
    <>
      {loading ? (
        <button type="button" className={styles.delete} disabled>
          Deletar
        </button>
      ) : (
        <button type="button" onClick={handleClick} className={styles.delete}>
          Deletar
        </button>
      )}
    </>
  );
};

export default PhotoDelete;
