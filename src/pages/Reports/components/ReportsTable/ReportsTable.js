import React, { memo } from 'react';
import { Card, CardContent } from '@material-ui/core';

import VektorTableContainer from 'parts/Tables/VektorTableContainer';
import useUserPermissions from 'utils/hooks/useUserPermission';

import { useReportsTableLogic } from './helpers';
import { ReportsTableButtons, ReportRow } from './components';
import { useEntryMapping } from 'utils/hooks';

const ReportsTable = ({ filter }) => {
  const { isAdmin } = useUserPermissions();
  const { reports, columns, selectedItems, rowCounts, page, rowsPerPage, setPage, toggleHandler, checkSelected, setRowsPerPage, resetSelectedItems } =
    useReportsTableLogic(isAdmin, filter);
  const mappedReports = useEntryMapping(reports, [
    { src: 'projectManager', by: 'users.results' },
    { src: 'projectSupervisor', by: 'users.results' },
  ]);

  return (
    <Card>
      <CardContent>
        <ReportsTableButtons isAdmin={isAdmin} items={selectedItems} resetItems={resetSelectedItems} />
        <VektorTableContainer
          columns={columns}
          rowCounts={rowCounts}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        >
          {mappedReports.map((row) => (
            <ReportRow key={row._id} isAdmin={isAdmin} row={row} checkSelected={checkSelected} toggleHandler={toggleHandler} />
          ))}
        </VektorTableContainer>
      </CardContent>
    </Card>
  );
};

export default memo(ReportsTable);
