import React from 'react';
import { Link } from 'react-router-dom';
import Head from './Helper/Head';

const NotFound = () => {
  return (
    <section className="container mainContainer animeLeft">
      <Head title="Página não encontrada" />
      <h1 className="title">404</h1>
      <p className="pg-empty">Esta página não existe.</p>
      <p style={{ textAlign: 'center' }}>
        <Link to="/">Voltar ao início</Link>
      </p>
    </section>
  );
};

export default NotFound;
