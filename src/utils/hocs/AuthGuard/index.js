import React, { memo } from 'react';
import { Redirect } from 'react-router-dom';

function AuthGuard({ children }) {
  const accessToken = localStorage.accessToken;

  if (!accessToken) {
    return <Redirect to="/auth/sign-in" />;
  }

  return children;
}

export default memo(AuthGuard);
