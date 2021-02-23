import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function GuestGuard({ children }) {
  const auth = useSelector((state) => state.authReducer);

  if (auth.user) {
    return <Redirect to='/' />;
  }

  return children;
}

export default memo(GuestGuard);
