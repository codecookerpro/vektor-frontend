import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function GuestGuard({ children }) {
  const { accessToken } = useSelector((state) => state.auth);

  if (!!accessToken) {
    return <Redirect to='/' />;
  }

  return children;
}

export default memo(GuestGuard);
