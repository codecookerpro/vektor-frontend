import React, { memo, useState } from 'react';

import PageHeader from 'parts/PageHeader';
import ReportFilters from './ReportFilters';
import ReportsTable from './ReportsTable';
import LINKS from 'utils/constants/links';

const NAV_LINKS = [LINKS.PROJECT_MANAGEMENT];

const Reports = () => {
  const [filter, setFilter] = useState({});

  return (
    <>
      <PageHeader title={LINKS.REPORTS.TITLE} links={NAV_LINKS} />
      <ReportFilters filter={filter} setFilter={setFilter} />
      <ReportsTable />
    </>
  );
};

export default memo(Reports);
