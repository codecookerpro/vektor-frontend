import React, { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, TableCell, TableRow, Typography } from '@material-ui/core';

import LinkButton from 'components/UI/Buttons/LinkButton';
import VektorTableContainer from 'parts/Tables/VektorTableContainer';
import * as TABLE_ENVIRONMENTS from 'utils/constants/table-environments';
import LINKS from 'utils/constants/links';

const columns = [
  { id: 'name', label: 'Name', minWidth: 130 },
  { id: 'email', label: 'Email', minWidth: 130 },
  { id: 'organization', label: 'Organization', minWidth: 130 },
];

const UsersTable = () => {
  const { results = [] } = useSelector((state) => state.users);
  const organizations = useSelector((state) => state.organizations.results);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(TABLE_ENVIRONMENTS.ROWS_PER_PAGE);

  const getOrganizationName = (_id) => {
    const organization = organizations.find((item) => item._id === _id);
    return organization?.name || '';
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" color="textPrimary" gutterBottom>
          {`${results.length} users`}
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
                <LinkButton to={LINKS.EDIT_USER.HREF.replace(':id', row._id)}>{row.name || 'No Name'}</LinkButton>
              </TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row?.organization ? getOrganizationName(row?.organization) : 'No Organization'}</TableCell>
            </TableRow>
          ))}
        </VektorTableContainer>
      </CardContent>
    </Card>
  );
};

export default memo(UsersTable);
