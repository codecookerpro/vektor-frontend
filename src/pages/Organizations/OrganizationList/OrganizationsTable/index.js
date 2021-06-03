import React, { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, TableCell, TableRow, Checkbox, Typography } from '@material-ui/core';

import LinkButton from 'components/UI/Buttons/LinkButton';
import VektorTableContainer from 'parts/Tables/VektorTableContainer';
import * as TABLE_ENVIRONMENTS from 'utils/constants/table-environments';
import LINKS from 'utils/constants/links';
import { setSelectedOrganization } from '../../../../redux/actions/organizations';

const columns = [{ id: 'name', label: 'Name', minWidth: 130 }];

const OrganizationsTable = ({ selectedItems, setSelectedItems }) => {
  const dispatch = useDispatch();
  const { results = [] } = useSelector((state) => state.organizations);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(TABLE_ENVIRONMENTS.ROWS_PER_PAGE);

  const toggleHandler = (value) => () => {
    const currentIndex = selectedItems.findIndex((item) => item._id === value._id);
    const newSelectedItems = [...selectedItems];

    if (currentIndex === -1) {
      newSelectedItems.push(value);
    } else {
      newSelectedItems.splice(currentIndex, 1);
    }

    setSelectedItems(newSelectedItems);
  };

  const clickHandler = (row) => {
    dispatch(setSelectedOrganization(row));
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" color="textPrimary" gutterBottom>
          {`${results.length} organizations`}
        </Typography>
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
                    inputProps={{ 'aria-labelledby': `check-${row._id}` }}
                    checked={selectedItems.findIndex((value) => row._id === value._id) !== -1}
                    onChange={toggleHandler(row)}
                  />
                  <LinkButton to={LINKS.EDIT_ORGANIZATION.HREF.replace(':id', row._id)} onClick={() => clickHandler(row)}>
                    {row.name}
                  </LinkButton>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </VektorTableContainer>
      </CardContent>
    </Card>
  );
};

export default memo(OrganizationsTable);
