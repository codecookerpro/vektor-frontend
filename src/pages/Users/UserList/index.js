
import React, { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

const UserList = () => {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      User List Page
    </main>
  )
}

export default memo(UserList)