import React, { memo } from 'react';

import PageHeader from 'parts/PageHeader';
import AuditTrailLogsTable from './AuditTrailLogsTable';
import LINKS from 'utils/constants/links';

const NAV_LINKS = [LINKS.USER_MANAGEMENT];

const AuditTrailLogList = () => {
  return (
    <>
      <PageHeader title={LINKS.AUDIT_TRAIL_LOGS.TITLE} links={NAV_LINKS} />
      <AuditTrailLogsTable />
    </>
  );
};

export default memo(AuditTrailLogList);
