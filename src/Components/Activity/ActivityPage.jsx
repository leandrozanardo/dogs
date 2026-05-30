import React from 'react';
import { Link } from 'react-router-dom';
import Head from '../Helper/Head';
import { useSocial } from '../../context/SocialContext';
import styles from './ActivityPage.module.css';

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString('pt-BR', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return '';
  }
}

const ActivityPage = () => {
  const { activity } = useSocial();

  return (
    <section className="container mainContainer">
      <Head title="Atividade" />
      <h1 className="title">Atividade</h1>
      <p className={styles.note}>
        Histórico local de curtidas, salvos e perfis seguidos (modo demonstração).
      </p>
      {activity.length === 0 ? (
        <div className="pg-empty">
          <p>Nenhuma atividade ainda.</p>
          <p>
            <Link to="/explorar">Explorar pets</Link> e interaja com as publicações.
          </p>
        </div>
      ) : (
        <ul className={styles.list}>
          {activity.map((item) => (
            <li key={item.id} className={styles.item}>
              <span className={styles.type}>{item.type}</span>
              <span>{item.message}</span>
              <time className={styles.time}>{formatDate(item.at)}</time>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default ActivityPage;
