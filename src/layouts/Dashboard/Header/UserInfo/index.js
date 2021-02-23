
import React, { memo } from 'react'
import { Typography } from '@material-ui/core';

const UserInfo = () => (
  <Typography variant='body2' color='textPrimary'>
    Welcome, <b>admin@mail.com</b>
  </Typography>
)

export default memo(UserInfo)