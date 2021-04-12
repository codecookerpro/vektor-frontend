import React, { memo, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import PageHeader from 'parts/PageHeader';
import HistoryTableCard from 'parts/HistoryTableCard';
import LINKS from 'utils/constants/links';
import systems from 'utils/temp/systems';
import results from 'utils/temp/project-history';

const OrganizationHistory = () => {
  const { id } = useParams();

  const organization = useMemo(() => systems.find((item) => item.id === id), [id]);

  const NAV_LINKS = [
    LINKS.USER_MANAGEMENT,
    LINKS.ORGANIZATIONS,
    {
      HREF: LINKS.EDIT_ORGANIZATION.HREF.replace(':id', id),
      TITLE: organization?.name || 'Not Found',
    },
  ];

  return (
    <>
      <PageHeader
        title={`${LINKS.ORGANIZATION_HISTORY.TITLE}: ${organization?.name || 'Not Found'}`}
        links={NAV_LINKS}
      />
      <HistoryTableCard title='Organization' results={results} />
    </>
  );
};

export default memo(OrganizationHistory);
