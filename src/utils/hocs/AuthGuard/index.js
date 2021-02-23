import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function AuthGuard({ children }) {
  const auth = useSelector((state) => state.authReducer);

  if (!auth.user) {
    return <Redirect to='/auth/sign-in' />;
  }

  return children;
}

export default memo(AuthGuard);
