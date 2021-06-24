import React, { memo } from 'react';
import { CSVLink } from 'react-csv';

import ContainedButton from 'components/UI/Buttons/ContainedButton';

import { HEADERS } from 'pages/Reports/components/ReportsTable/constants';
import { getRelevantHeaders } from 'pages/Reports/components/ReportsTable/helpers';

const ReportsTableButtons = ({ isAdmin, items, resetItems }) => (
  <>
    {items.length > 0 ? (
      <>
        <CSVLink data={items} headers={getRelevantHeaders(isAdmin, HEADERS)} style={{ textDecoration: 'unset' }}>
          <ContainedButton onClick={resetItems} disabled={items.length === 0}>
            CSV Download
          </ContainedButton>
        </CSVLink>
        <ContainedButton onClick={resetItems} style={{ marginLeft: '10px' }}>
          Reset all selected
        </ContainedButton>
      </>
    ) : (
      <ContainedButton disabled>CSV Download</ContainedButton>
    )}
  </>
);

export default memo(ReportsTableButtons);
