import React, { memo } from 'react';

import OverviewCardLayout from '../Shared/OverviewCardLayout';
import OverviewCardItem from '../Shared/OverviewCardItem';
import LINKS from 'utils/constants/links';

const UserManagementCard = () => {
  return (
    <OverviewCardLayout title="User Management">
      <OverviewCardItem title="Users" view={LINKS.USERS.HREF} add={LINKS.ADD_USER.HREF} change={LINKS.USERS.HREF} />
      <OverviewCardItem title="Organizations" view={LINKS.ORGANIZATIONS.HREF} add={LINKS.ADD_ORGANIZATION.HREF} change={LINKS.ORGANIZATIONS.HREF} />
      <OverviewCardItem title="Audit Trail Logs" view={LINKS.AUDIT_TRAIL_LOGS.HREF} />
    </OverviewCardLayout>
  );
};

export default memo(UserManagementCard);
