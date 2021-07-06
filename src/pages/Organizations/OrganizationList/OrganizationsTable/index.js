import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, TableCell, TableRow, Typography } from '@material-ui/core';

import LinkButton from 'components/UI/Buttons/LinkButton';
import VektorTableContainer from 'parts/Tables/VektorTableContainer';
import LINKS from 'utils/constants/links';
import { setSelectedDepartments, setSelectedOrganization } from 'redux/actions/organizations';
import { usePagination, useTableSort } from 'utils/hooks';

const columns = [{ id: 'name', label: 'Name', minWidth: 130, sortable: true }];

const OrganizationsTable = () => {
  const dispatch = useDispatch();
  const organizations = useSelector((state) => state.organizations.results);
  const { sortedRows, handleSort } = useTableSort(organizations);
  const { page, setPage, rowsPerPage, setRowsPerPage, pageRecords } = usePagination(sortedRows);

  const clickHandler = (row) => {
    dispatch(setSelectedOrganization(row));
    dispatch(setSelectedDepartments(row.departments));
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" color="textPrimary" gutterBottom>
          {`${pageRecords.length} organizations`}
        </Typography>
        <VektorTableContainer
          columns={columns}
          rowCounts={pageRecords.length}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          onSort={handleSort}
        >
          {pageRecords.map((row) => (
            <TableRow key={row._id}>
              <TableCell component="th" scope="row">
                <LinkButton to={LINKS.EDIT_ORGANIZATION.HREF.replace(':id', row._id)} onClick={() => clickHandler(row)}>
                  {row.name}
                </LinkButton>
              </TableCell>
            </TableRow>
          ))}
        </VektorTableContainer>
      </CardContent>
    </Card>
  );
};

export default memo(OrganizationsTable);
