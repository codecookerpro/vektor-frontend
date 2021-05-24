import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';

const UserInfo = () => {
  const { currentUser } = useSelector((state) => state.auth);

  return (
    <Typography variant="body2" color="textPrimary">
      Welcome, <b>{currentUser?.email}</b>
    </Typography>
  );
};

export default memo(UserInfo);
