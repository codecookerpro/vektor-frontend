import React, { memo, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import PageHeader from 'parts/PageHeader';
import HistoryTableCard from 'parts/HistoryTableCard';
import LINKS from 'utils/constants/links';
import systems from 'utils/temp/systems';
import results from 'utils/temp/project-history';

const UserHistory = () => {
  const { id } = useParams();

  const user = useMemo(() => systems.find((item) => item.id === id), [id]);

  const NAV_LINKS = [
    LINKS.USER_MANAGEMENT,
    LINKS.USERS,
    {
      HREF: LINKS.EDIT_USER.HREF.replace(':id', id),
      TITLE: user?.name || 'Not Found',
    },
  ];

  return (
    <>
      <PageHeader
        title={`${LINKS.USER_HISTORY.TITLE}: ${user?.name || 'Not Found'}`}
        links={NAV_LINKS}
      />
      <HistoryTableCard title='Workflow Template' results={results} />
    </>
  );
};

export default memo(UserHistory);
