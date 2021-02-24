
import React, { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      Dashboard Page
    </main>
  )
}

export default memo(Dashboard)