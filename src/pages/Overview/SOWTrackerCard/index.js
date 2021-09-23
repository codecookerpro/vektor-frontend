import React, { memo } from 'react';

import OverviewCardLayout from '../Shared/OverviewCardLayout';
import OverviewCardItem from '../Shared/OverviewCardItem';
import LINKS from 'utils/constants/links';

const SOWTrackerCard = () => {
  return (
    <OverviewCardLayout title="Sow Tracker">
      <OverviewCardItem title="SOWs" view={LINKS.SOWS.HREF} add={LINKS.ADD_SOW.HREF} change={LINKS.SOWS.HREF} />
    </OverviewCardLayout>
  );
};

export default memo(SOWTrackerCard);
