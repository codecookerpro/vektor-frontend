import React, { memo } from 'react';
import { Redirect } from 'react-router-dom';

function GuestGuard({ children }) {
  const accessToken = localStorage.accessToken;

  if (!!accessToken) {
    return <Redirect to='/' />;
  }

  return children;
}

export default memo(GuestGuard);
