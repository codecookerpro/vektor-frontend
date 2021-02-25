import React, { memo } from 'react';

import OverviewCardLayout from '../Shared/OverviewCardLayout'
import OverviewCardAction from '../Shared/OverviewCardAction'
import LINKS from 'utils/constants/links';

function OverviewDashboardCard() {
  return (
    <OverviewCardLayout
      title='Dashboard'
      description='32 Active Projects'
      chip='Project Management'
    >
      <OverviewCardAction
        mainLabel='Add New'
        mainLink={LINKS.ADD_PROJECT.HREF}
        subLabel='Go to Dashboard'
        subLink={LINKS.DASHBOARD.HREF}
      />
    </OverviewCardLayout>
  );
}

export default memo(OverviewDashboardCard);
