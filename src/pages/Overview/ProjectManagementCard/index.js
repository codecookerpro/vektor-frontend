import React, { memo } from 'react';

import OverviewCardLayout from '../Shared/OverviewCardLayout';
import OverviewCardItem from '../Shared/OverviewCardItem';
import LINKS from 'utils/constants/links';

const ProjectManagementCard = () => {
  return (
    <OverviewCardLayout title="Project Management">
      <OverviewCardItem title="Dashboard" view={LINKS.DASHBOARD.HREF} change={LINKS.DASHBOARD.HREF} />
      <OverviewCardItem title="Projects" view={LINKS.PROJECTS.HREF} add={LINKS.ADD_PROJECT.HREF} change={LINKS.PROJECTS.HREF} />
      <OverviewCardItem title="Reports" view={LINKS.REPORTS.HREF} />
    </OverviewCardLayout>
  );
};

export default memo(ProjectManagementCard);
