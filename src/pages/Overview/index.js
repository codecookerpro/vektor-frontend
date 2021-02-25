import React, { memo } from 'react';
import { Grid } from '@material-ui/core';

import OverviewHeader from './OverviewHeader'
import OverviewDashboardCard from './OverviewDashboardCard'
import OverviewWorkflowTemplateCard from './OverviewWorkflowTemplateCard'
import OverviewPhaseTemplateCard from './OverviewPhaseTemplateCard'
import OverviewLatestProjectCard from './OverviewLatestProjectCard'
import OverviewUserCard from './OverviewUserCard'
import OverviewRecentActions from './OverviewRecentActions'

function Analytics() {
  return (
    <>
      <OverviewHeader />

      <Grid container spacing={6}>
        <Grid item xs={12} md={6} lg={3}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <OverviewDashboardCard />
            </Grid>
            <Grid item xs={12}>
              <OverviewLatestProjectCard />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} lg={5}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <OverviewRecentActions />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <OverviewWorkflowTemplateCard />
            </Grid>
            <Grid item xs={12}>
              <OverviewPhaseTemplateCard />
            </Grid>
            <Grid item xs={12}>
              <OverviewUserCard />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default memo(Analytics);
