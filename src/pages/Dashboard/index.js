
import React, { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core';

import PageHeader from 'parts/PageHeader';
import DashboardCard from './Shared/DashboardCard'
import LINKS from 'utils/constants/links';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  }
}));

const NAV_LINKS = [
  LINKS.PROJECT_MANAGEMENT
]

const ITEMS = [
  0,
  1,
  2,
  3,
  4
]

const Dashboard = () => {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      <PageHeader
        title='Dashboard'
        links={NAV_LINKS}
      />
      <Grid container spacing={6}>
        {
          ITEMS.map((item, index) =>
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
              <DashboardCard />
            </Grid>
          )
        }
      </Grid>
    </main>
  )
}

export default memo(Dashboard)