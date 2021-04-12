
import React, { memo } from 'react'
import { Grid } from '@material-ui/core';

import PageHeader from 'parts/PageHeader';
import RecentActionsCard from 'parts/RecentActionsCard'
import LINKS from 'utils/constants/links';
import actions from 'utils/temp/recent-actions'

const NAV_LINKS = [LINKS.RECENT_ACTIONS];

const RecentActions = () => {
  return (
    <>
      <PageHeader
        title={LINKS.RECENT_ACTIONS.TITLE}
        links={NAV_LINKS}
      />
      <Grid container spacing={6}>
        <Grid item xs={12} md={6} lg={4}>
          <RecentActionsCard actions={actions} />
        </Grid>
      </Grid>
    </>
  )
}

export default memo(RecentActions)