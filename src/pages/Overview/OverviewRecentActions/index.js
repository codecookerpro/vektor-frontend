import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getLatestEvents } from 'redux/actions/events';
import RecentActionsCard from 'parts/RecentActionsCard';

function OverviewRecentActions() {
  const dispatch = useDispatch();
  const { latest } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(getLatestEvents());
  }, [dispatch]);

  return <RecentActionsCard actions={latest} />;
}

export default memo(OverviewRecentActions);
