
import React, { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

const AddEditPhaseTemplate = () => {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      Add Edit Phase Template Page
    </main>
  )
}

export default memo(AddEditPhaseTemplate)