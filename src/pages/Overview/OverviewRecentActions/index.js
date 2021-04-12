import React, { memo } from 'react';

import RecentActionsCard from 'parts/RecentActionsCard'
import actions from 'utils/temp/recent-actions'

function OverviewRecentActions() {
  return (
    <RecentActionsCard actions={actions} />
  );
}

export default memo(OverviewRecentActions)