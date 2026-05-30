import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import styles from './BottomNav.module.css';
import {
  IconHome,
  IconSearch,
  IconExplore,
  IconCreate,
} from '../Icons/Icons';

const BottomNav = () => {
  const { login, data } = React.useContext(UserContext);
  const navigate = useNavigate();

  function handleCreate() {
    navigate(login ? '/conta/postar' : '/login');
  }

  return (
    <nav className={styles.nav} aria-label="Navegação principal">
      <NavLink to="/" className={styles.link} end>
        {({ isActive }) => <IconHome active={isActive} />}
      </NavLink>
      <button type="button" className={styles.link} aria-label="Pesquisa">
        <IconSearch />
      </button>
      <button
        type="button"
        className={styles.link}
        onClick={handleCreate}
        aria-label="Criar"
      >
        <IconCreate />
      </button>
      <NavLink to="/explorar" className={styles.link}>
        {({ isActive }) => <IconExplore active={isActive} />}
      </NavLink>
      <NavLink to={login ? '/conta' : '/login'} className={styles.link}>
        <span className={styles.avatar}>
          {(data?.username || 'P').slice(0, 1).toUpperCase()}
        </span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;
