import React from 'react';
import styles from './UserPhotoPost.module.css';
import useForm from '../../Hooks/useForm';
import useFetch from '../../Hooks/useFetch';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import Error from '../Helper/Error';
import { PHOTO_POST } from '../../Api';
import { useNavigate, Link } from 'react-router-dom';
import Head from '../Helper/Head';

const UserPhotoPost = () => {
  const nome = useForm();
  const peso = useForm('number');
  const idade = useForm('number');
  const [img, setImg] = React.useState({});
  const [imgError, setImgError] = React.useState(null);
  const { data, error, loading, request } = useFetch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (data) navigate('/conta');
  }, [data, navigate]);

  function handleSubmit(event) {
    event.preventDefault();
    setImgError(null);
    const valid =
      nome.validate() && peso.validate() && idade.validate() && img.raw;
    if (!img.raw) setImgError('Selecione uma imagem do pet.');
    if (!valid) return;

    const formData = new FormData();
    formData.append('img', img.raw);
    formData.append('nome', nome.value);
    formData.append('peso', peso.value);
    formData.append('idade', idade.value);

    const token = window.localStorage.getItem('token');
    const { url, options } = PHOTO_POST(formData, token);
    request(url, options);
  }

  function handleImgChange({ target }) {
    if (target.files?.[0]) {
      setImg({
        preview: URL.createObjectURL(target.files[0]),
        raw: target.files[0],
      });
      setImgError(null);
    }
  }

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <Head title="Novo post" />
      <Link to="/conta" className={styles.back}>
        ← Voltar ao perfil
      </Link>
      <h1 className="title title--auth">Novo post</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Nome do pet" type="text" name="nome" {...nome} />
        <Input label="Peso (kg)" type="number" name="peso" {...peso} />
        <Input label="Idade" type="number" name="idade" {...idade} />
        <label className={styles.fileLabel} htmlFor="img">
          Escolher foto
        </label>
        <input
          className={styles.file}
          type="file"
          name="img"
          id="img"
          accept="image/*"
          onChange={handleImgChange}
        />
        {imgError && <p className={styles.imgError}>{imgError}</p>}
        {loading ? (
          <Button disabled>Enviando...</Button>
        ) : (
          <Button>Publicar</Button>
        )}
        <Error error={error} />
      </form>
      <div>
        {img.preview && (
          <div
            className={styles.preview}
            style={{ backgroundImage: `url('${img.preview}')` }}
          />
        )}
      </div>
    </section>
  );
};

export default UserPhotoPost;
