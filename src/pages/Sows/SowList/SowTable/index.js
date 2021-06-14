import React, { memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, Checkbox, TableCell, TableRow } from '@material-ui/core';

import LinkButton from 'components/UI/Buttons/LinkButton';
import VektorTableContainer from 'parts/Tables/VektorTableContainer';
import LINKS from 'utils/constants/links';
import SowActions from './SowActions';
import setColumn from './setColumn';

const SowTable = ({ selectedItems, setSelectedItems, page, setPage, rowsPerPage, setRowsPerPage, isOrganizationVisible }) => {
  const { results } = useSelector((state) => state.sows);
  const organizations = useSelector((state) => state.organizations.results);
  const projects = useSelector((state) => state.projects.results);
  const [action, setAction] = useState('');
  const columns = setColumn(isOrganizationVisible);

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

  const isSelected = (row) => {
    return selectedItems.findIndex((value) => row.id === value.id) !== -1;
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
          {results.map((row) => (
            <TableRow key={row._id}>
              <TableCell component="th" scope="row">
                <div style={{ display: 'flex' }}>
                  <Checkbox inputProps={{ 'aria-labelledby': `check-${row.id}` }} checked={isSelected(row)} onChange={toggleHandler(row)} />
                </div>
              </TableCell>
              {isOrganizationVisible && (
                <TableCell component="th" scope="row">
                  <LinkButton to={LINKS.EDIT_SOW.HREF.replace(':id', row._id)}>{getOrganizationName(row.organization)}</LinkButton>
                </TableCell>
              )}
              <TableCell>
                {isOrganizationVisible ? row.name : <LinkButton to={LINKS.EDIT_SOW.HREF.replace(':id', row._id)}>{row.name}</LinkButton>}
              </TableCell>
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
