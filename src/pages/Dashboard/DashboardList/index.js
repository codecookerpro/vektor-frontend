
import React, { memo, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

import { getDashboards } from 'redux/actions/dashboards'
import PageHeader from 'parts/PageHeader'
import DashboardCard from 'parts/DashboardCard'
import LINKS from 'utils/constants/links'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  }
}));

const NAV_LINKS = [
  LINKS.PROJECT_MANAGEMENT
]

const DashboardList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { results } = useSelector(state => state.dashboards);

  useEffect(() => {
    dispatch(getDashboards())
  }, [dispatch])

  return (
    <main className={classes.root}>
      <PageHeader
        title={LINKS.DASHBOARD.TITLE}
        links={NAV_LINKS}
      />
      <Grid container spacing={6}>
        {results.map((item, index) =>
          <Grid key={index} item xs={12} md={6} lg={3}>
            <DashboardCard
              showButton
              item={item}
            />
          </Grid>
        )}
      </Grid>
    </main>
  )
}

export default memo(DashboardList)