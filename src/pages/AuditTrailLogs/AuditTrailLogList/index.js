
import React, { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

const AuditTrailLogList = () => {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      Audit Trail Log List Page
    </main>
  )
}

export default memo(AuditTrailLogList)