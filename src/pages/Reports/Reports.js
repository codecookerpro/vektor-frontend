import React, { memo, useState } from 'react';

import PageHeader from 'parts/PageHeader';
import ReportFilters from './components/ReportFilters';
import ReportsTable from './components/ReportsTable';

import { NAV_LINKS, REPORTS_TITLE } from './constants';

const Reports = () => {
  const [filter, setFilter] = useState({});

  return (
    <>
      <PageHeader title={REPORTS_TITLE} links={NAV_LINKS} />
      <ReportFilters filter={filter} setFilter={setFilter} />
      <ReportsTable filter={filter} />
    </>
  );
};

export default memo(Reports);
