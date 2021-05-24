import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import PageHeader from 'parts/PageHeader';
import DashboardCard from 'parts/DashboardCard';
import LineProgress from 'parts/LineProgress';
import LINKS from 'utils/constants/links';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

const NAV_LINKS = [LINKS.PROJECT_MANAGEMENT, LINKS.DASHBOARD];

const DashboardDetail = () => {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      <PageHeader title={LINKS.DASHBOARD_DETAIL.TITLE} links={NAV_LINKS} />
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <DashboardCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <LineProgress label="Completed vs Total Systems" completed={1} total={2} />
            </Grid>
            <Grid item xs={12}>
              <LineProgress label="Worked vs Planned Hours" completed={12} total={16} />
            </Grid>
            <Grid item xs={12}>
              <LineProgress label="Milestones" completed={3} total={4} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </main>
  );
};

export default memo(DashboardDetail);
