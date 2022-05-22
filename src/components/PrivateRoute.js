import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute({ isLoggedin, altpath }) {
  return isLoggedin ? <Outlet /> : <Navigate replace to={altpath} />;
}
