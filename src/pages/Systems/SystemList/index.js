
import React, { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

const SystemList = () => {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      System List Page
    </main>
  )
}

export default memo(SystemList)