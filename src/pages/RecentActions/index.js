
import React, { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

const RecentActions = () => {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      Recent Actions Page
    </main>
  )
}

export default memo(RecentActions)