import React, { memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, Checkbox, TableCell, TableRow } from '@material-ui/core';

import LinkButton from 'components/UI/Buttons/LinkButton';
import VektorTableContainer from 'parts/Tables/VektorTableContainer';
import * as TABLE_ENVIRONMENTS from 'utils/constants/table-environments';
import LINKS from 'utils/constants/links';
import SowActions from './SowActions';

const columns = [
  { id: 'Checkbox', label: 'checkbox', minWidth: 100 },
  { id: 'organization', label: 'Organization', minWidth: 170 },
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'system', label: 'System', minWidth: 170 },
  { id: 'fullContactName', label: 'Full Contact Name', minWidth: 170 },
  { id: 'projectName', label: 'Project Name', minWidth: 170 },
  { id: 'vendorName', label: 'Vendor Name', minWidth: 170 },
];

const SowTable = ({ selectedItems, setSelectedItems }) => {
  const { results } = useSelector((state) => state.sows);
  const organizations = useSelector((state) => state.organizations.results);
  const projects = useSelector((state) => state.projects.results);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(TABLE_ENVIRONMENTS.ROWS_PER_PAGE);
  const [action, setAction] = useState('');

  const getOrganizationName = (_id) => {
    const organization = organizations.find((item) => item._id === _id);
    return organization?.name || '';
  };
  const getProjectName = (_id) => {
    const project = projects.find((item) => item._id === _id);
    return project?.name || '';
  };

  const actionHandler = useCallback(() => {
    console.log('action go');
  }, []);

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

  return (
    <Card>
      <CardContent>
        <SowActions action={action} setAction={setAction} onAction={actionHandler} />
        <VektorTableContainer
          columns={columns}
          rowCounts={results.length}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        >
          {(rowsPerPage > 0 ? results.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : results).map((row) => (
            <TableRow key={row._id}>
              <TableCell component="th" scope="row">
                <div style={{ display: 'flex' }}>
                  <Checkbox
                    inputProps={{ 'aria-labelledby': `check-${row.id}` }}
                    checked={selectedItems.findIndex((value) => row.id === value.id) !== -1}
                    onChange={toggleHandler(row)}
                  />
                </div>
              </TableCell>
              <TableCell component="th" scope="row">
                <LinkButton to={LINKS.EDIT_SOW.HREF.replace(':id', row._id)}>{getOrganizationName(row.organization)}</LinkButton>
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.metaSystem}</TableCell>
              <TableCell>{row?.fullContactName || '-'}</TableCell>
              <TableCell>{getProjectName(row.project)}</TableCell>
              <TableCell>{row?.vendorName || '-'}</TableCell>
            </TableRow>
          ))}
        </VektorTableContainer>
      </CardContent>
    </Card>
  );
};

export default memo(SowTable);
