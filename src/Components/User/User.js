import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserPhotoPost from './UserPhotoPost';
import UserStats from './UserStats';
import UserProfilePage from './UserProfilePage';
import NotFound from '../NotFound';

const User = () => {
  return (
    <section className="container mainContainer">
      <Routes>
        <Route path="/" element={<UserProfilePage />} />
        <Route path="postar" element={<UserPhotoPost />} />
        <Route path="estatisticas" element={<UserStats />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </section>
  );
};

export default User;
