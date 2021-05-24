import React, { memo, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import PageHeader from 'parts/PageHeader';
import HistoryTableCard from 'parts/HistoryTableCard';
import LINKS from 'utils/constants/links';
import systems from 'utils/temp/systems';
import results from 'utils/temp/project-history';

const SystemHistory = () => {
  const { id } = useParams();

  const system = useMemo(() => systems.find((item) => item.id === id), [id]);
  const NAV_LINKS = [
    LINKS.PROJECT_MANAGEMENT,
    LINKS.SYSTEMS,
    {
      HREF: LINKS.EDIT_SYSTEM.HREF.replace(':id', id),
      TITLE: system?.name || 'Not Found',
    },
  ];

  return (
    <>
      <PageHeader title={`${LINKS.SYSTEM_HISTORY.TITLE}: ${system?.name || 'Not Found'}`} links={NAV_LINKS} />
      <HistoryTableCard title="Systems" results={results} />
    </>
  );
};

export default memo(SystemHistory);
