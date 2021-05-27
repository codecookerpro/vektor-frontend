import React, { memo } from 'react';
import { Grid } from '@material-ui/core';

import OverviewHeader from './OverviewHeader';
import ProjectManagementCard from './ProjectManagementCard';
import SOWTrackerCard from './SOWTrackerCard';
import WorkflowTemplateCard from './WorkflowTemplateCard';
import UserManagementCard from './UserManagementCard';
import OverviewRecentActions from './OverviewRecentActions';

function Analytics() {
  return (
    <>
      <OverviewHeader />
      <Grid container spacing={6}>
        <Grid item xs={12} md={6} lg={5}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <ProjectManagementCard />
            </Grid>
            <Grid item xs={12}>
              <SOWTrackerCard />
            </Grid>
            <Grid item xs={12}>
              <WorkflowTemplateCard />
            </Grid>
            <Grid item xs={12}>
              <UserManagementCard />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <OverviewRecentActions />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default memo(Analytics);
