import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import Loading from './Loading';

const ProtectedRoute = () => {
  const { login } = React.useContext(UserContext);

  if (login === null) return <Loading />;
  if (login === false) return <Navigate to="/login" replace />;
  return <Outlet />;
};

export default ProtectedRoute;
