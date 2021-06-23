import React, { memo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import { getDashboards } from 'redux/actions/dashboards';
import PageHeader from 'parts/PageHeader';
import { DashboardCard } from './components';
import LINKS from 'utils/constants/links';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

const NAV_LINKS = [LINKS.PROJECT_MANAGEMENT];

const DashboardList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { results } = useSelector((state) => state.dashboards);
  useEffect(() => dispatch(getDashboards()));

  return (
    <main className={classes.root}>
      <PageHeader title={LINKS.DASHBOARD.TITLE} links={NAV_LINKS} />
      <Grid container spacing={6}>
        {results.map((item, index) => (
          <DashboardCard item={item} key={index} />
        ))}
      </Grid>
    </main>
  );
};

export default memo(DashboardList);
