import React, { memo } from 'react';
import { Card, CardContent, TableCell, TableRow, Checkbox } from '@material-ui/core';
import { CSVLink } from 'react-csv';

import ContainedButton from 'components/UI/Buttons/ContainedButton';
import VektorTableContainer from 'parts/Tables/VektorTableContainer';
import useUserPermissions from 'utils/helpers/useUserPermission';

import { COLUMNS, HEADERS } from './constants';
import useReportsTableLogic from './helpers';

const ReportsTable = ({ filter }) => {
  const { isAdmin } = useUserPermissions();
  const {
    reports,
    selectedItems,
    rowCounts,
    page,
    rowsPerPage,
    setPage,
    toggleHandler,
    checkSelected,
    getRelevantHeaders,
    setRowsPerPage,
    resetSelectedItems,
  } = useReportsTableLogic(isAdmin, filter);

  return (
    <Card>
      <CardContent>
        {selectedItems.length > 0 ? (
          <CSVLink data={selectedItems} headers={getRelevantHeaders(HEADERS)} style={{ textDecoration: 'unset' }} disabled>
            <ContainedButton onClick={resetSelectedItems} disabled={selectedItems.length === 0}>
              CSV Download
            </ContainedButton>
          </CSVLink>
        ) : (
          <ContainedButton disabled>CSV Download</ContainedButton>
        )}

        {selectedItems.length > 0 && (
          <ContainedButton onClick={resetSelectedItems} style={{ marginLeft: '10px' }}>
            Reset all selected
          </ContainedButton>
        )}

        <VektorTableContainer
          columns={getRelevantHeaders(COLUMNS)}
          rowCounts={rowCounts}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        >
          {reports.map((row, index) => (
            <TableRow key={index}>
              {isAdmin && (
                <TableCell component="th" scope="row">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Checkbox inputProps={{ 'aria-labelledby': `check-${row._id}` }} checked={checkSelected(row._id)} onChange={toggleHandler(row)} />
                    {row.organizationName}
                  </div>
                </TableCell>
              )}
              <TableCell>{row.projectName || ''}</TableCell>
              <TableCell>{row.projectNumber || ''}</TableCell>
              <TableCell>{row.metaSystemName || ''}</TableCell>
            </TableRow>
          ))}
        </VektorTableContainer>
      </CardContent>
    </Card>
  );
};

export default memo(ReportsTable);
