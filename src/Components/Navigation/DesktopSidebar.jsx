import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import styles from './DesktopSidebar.module.css';
import {
  IconHome,
  IconSearch,
  IconExplore,
  IconReels,
  IconMessenger,
  IconCreate,
} from '../Icons/Icons';

const DesktopSidebar = () => {
  const { login, data } = React.useContext(UserContext);
  const navigate = useNavigate();

  function handleCreate() {
    navigate(login ? '/conta/postar' : '/login');
  }

  return (
    <aside className={styles.sidebar} aria-label="Menu principal">
      <NavLink to="/" className={styles.logo}>
        PetGram
      </NavLink>
      <nav className={styles.nav}>
        <NavLink to="/" className={styles.item} end>
          {({ isActive }) => (
            <>
              <IconHome active={isActive} />
              <span>Início</span>
            </>
          )}
        </NavLink>
        <button type="button" className={styles.item}>
          <IconSearch />
          <span>Pesquisa</span>
        </button>
        <NavLink to="/explorar" className={styles.item}>
          {({ isActive }) => (
            <>
              <IconExplore active={isActive} />
              <span>Explorar</span>
            </>
          )}
        </NavLink>
        <button type="button" className={styles.item} disabled title="Em breve">
          <IconReels />
          <span>Reels</span>
        </button>
        <button type="button" className={styles.item} disabled title="Em breve">
          <IconMessenger />
          <span>Mensagens</span>
        </button>
        <button type="button" className={styles.item} onClick={handleCreate}>
          <IconCreate />
          <span>Criar</span>
        </button>
        <NavLink to="/atividade" className={styles.item}>
          {({ isActive }) => (
            <>
              <span className={styles.heartNav}>{isActive ? '♥' : '♡'}</span>
              <span>Notificações</span>
            </>
          )}
        </NavLink>
        <NavLink to={login ? '/conta' : '/login'} className={styles.item}>
          <span className={styles.profileDot}>
            {(data?.nome || data?.username || 'P').slice(0, 1).toUpperCase()}
          </span>
          <span>Perfil</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default DesktopSidebar;
