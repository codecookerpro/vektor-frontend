
import React, { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

const WorkflowTemplateList = () => {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      Workflow Template List Page
    </main>
  )
}

export default memo(WorkflowTemplateList)