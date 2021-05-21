import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, TableCell, TableRow, Checkbox } from '@material-ui/core';
import { CSVLink } from 'react-csv';

import { getReports } from 'redux/actions/reports';
import ContainedButton from 'components/UI/Buttons/ContainedButton';
import VektorTableContainer from 'parts/Tables/VektorTableContainer';
import * as TABLE_ENVIRONMENTS from 'utils/constants/table-environments';

const columns = [
  { id: 'organization', label: 'Organization', minWidth: 130 },
  { id: 'projectName', label: 'Project Name', minWidth: 60 },
  { id: 'projectNumber', label: 'Project Number', minWidth: 90 },
  { id: 'pn', label: 'PN Name', minWidth: 90 },
  { id: 'phaseTemplate', label: 'Phase Template', minWidth: 90 },
  { id: 'systemName', label: 'System Name', minWidth: 90 },
];

const headers = [
  { label: 'Organization', key: 'organization' },
  { label: 'Project Name', key: 'equipmentName' },
  { label: 'Project Number', key: 'equipmentNumber' },
  { label: 'PN Name', key: 'pn' },
  { label: 'Phase Template', key: 'phaseTemplat' },
  { label: 'System Name', key: 'systemName' },
];

const ReportsTable = () => {
  const dispatch = useDispatch();

  const { results } = useSelector((state) => state.reports);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(TABLE_ENVIRONMENTS.ROWS_PER_PAGE);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    dispatch(getReports());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const toggleHandler = (value) => () => {
    const currentIndex = selectedItems.findIndex((item) => item.id === value.id);
    const newSelectedItems = [...selectedItems];

    if (currentIndex === -1) {
      newSelectedItems.push(value);
    } else {
      newSelectedItems.splice(currentIndex, 1);
    }

    setSelectedItems(newSelectedItems);
  };

  console.log(results);
  return (
    <Card>
      <CardContent>
        <CSVLink data={selectedItems} headers={headers} style={{ textDecoration: 'unset' }}>
          <ContainedButton>CSV Download</ContainedButton>
        </CSVLink>
        <VektorTableContainer
          columns={columns}
          rowCounts={results.length}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        >
          {(rowsPerPage > 0 ? results.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : results).map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Checkbox
                    inputProps={{ 'aria-labelledby': `check-${row.id}` }}
                    checked={selectedItems.findIndex((value) => row.id === value.id) !== -1}
                    onChange={toggleHandler(row)}
                  />
                  {row.organization}
                </div>
              </TableCell>
              <TableCell>{row.equipmentName || ''}</TableCell>
              <TableCell>{row.equipmentNumber || ''}</TableCell>
              <TableCell>{row.pn || '-'}</TableCell>
              <TableCell>{row.phaseTemplat || ''}</TableCell>
              <TableCell>{row.systemName || ''}</TableCell>
            </TableRow>
          ))}
        </VektorTableContainer>
      </CardContent>
    </Card>
  );
};

export default memo(ReportsTable);
