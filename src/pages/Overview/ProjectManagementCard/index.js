import React, { memo } from 'react';

import OverviewCardLayout from '../Shared/OverviewCardLayout'
import OverviewCardItem from '../Shared/OverviewCardItem'
import LINKS from 'utils/constants/links'

const ProjectManagementCard = () => {
  return (
    <OverviewCardLayout title='Project Management'>
      <OverviewCardItem
        title='Dashboard'
        change={LINKS.DASHBOARD.HREF}
      />
      <OverviewCardItem
        title='Projects'
        add={LINKS.ADD_PROJECT.HREF}
        change={LINKS.PROJECTS.HREF}
      />
      <OverviewCardItem
        title='Reports'
        view={LINKS.REPORTS.HREF}
      />
    </OverviewCardLayout>
  );
}

export default memo(ProjectManagementCard);
