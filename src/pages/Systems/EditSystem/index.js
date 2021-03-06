
import React, { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

const AddEditSystem = () => {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      Add / Edit System Page
    </main>
  )
}

export default memo(AddEditSystem)