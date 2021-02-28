
import React, { memo } from 'react'
import {
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

import FilterSelect from 'components/UI/Selects/FilterSelect'

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(7.5)
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${theme.spacing(6, 8)} !important`,
  }
}));

const organizations = [
  {
    LABEL: 'Falcon',
    VALUE: 'Falcon'
  },
  {
    LABEL: 'Voxsync',
    VALUE: 'Voxsync'
  }
]
const OrganizationFilter = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Typography variant='h3' color='textPrimary'>
          Select project to change
        </Typography>

        <FilterSelect
          label='By organization'
          placeholder='All organizations'
          items={organizations}
          value=''
        />
      </CardContent>
    </Card>
  )
}

export default memo(OrganizationFilter)