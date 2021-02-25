
import React, { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

const GroupList = () => {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      Group List Page
    </main>
  )
}

export default memo(GroupList)