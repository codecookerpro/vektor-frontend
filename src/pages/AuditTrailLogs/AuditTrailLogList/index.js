
import React, { memo, useCallback, useState } from 'react';

import PageHeader from 'parts/PageHeader';
import AuditTrailLogsActions from './AuditTrailLogsActions';
import AuditTrailLogsTable from './AuditTrailLogsTable';
import LINKS from 'utils/constants/links';

const NAV_LINKS = [LINKS.USER_MANAGEMENT];

const AuditTrailLogList = () => {
  const [action, setAction] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);

  const actionHandler = useCallback(() => {
    console.log('action go');
  }, []);

  return (
    <>
      <PageHeader
        title={LINKS.AUDIT_TRAIL_LOGS.TITLE}
        links={NAV_LINKS}
      />
      <AuditTrailLogsActions
        action={action}
        setAction={setAction}
        onAction={actionHandler}
      />
      <AuditTrailLogsTable
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />
    </>
  );
};

export default memo(AuditTrailLogList);