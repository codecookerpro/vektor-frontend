import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';

import { getLatestEvents } from 'redux/actions/events';
import PageHeader from 'parts/PageHeader';
import RecentActionsCard from 'parts/RecentActionsCard';
import LINKS from 'utils/constants/links';

const NAV_LINKS = [LINKS.RECENT_ACTIONS];

const RecentActions = () => {
  const dispatch = useDispatch();
  const { latest } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(getLatestEvents());
  }, [dispatch]);

  return (
    <>
      <PageHeader title={LINKS.RECENT_ACTIONS.TITLE} links={NAV_LINKS} />
      <Grid container spacing={6}>
        <Grid item xs={12} md={6} lg={4}>
          <RecentActionsCard actions={latest} />
        </Grid>
      </Grid>
    </>
  );
};

export default memo(RecentActions);
