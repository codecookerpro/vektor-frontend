import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function AuthGuard({ children }) {
  const { accessToken } = useSelector((state) => state.auth);

  if (!accessToken) {
    return <Redirect to='/auth/sign-in' />;
  }

  return children;
}

export default memo(AuthGuard);
