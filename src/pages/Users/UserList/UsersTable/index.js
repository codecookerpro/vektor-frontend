import React, { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardContent, TableCell, TableRow, Grid } from '@material-ui/core';

import LinkButton from 'components/UI/Buttons/LinkButton';
import VektorTableContainer from 'parts/Tables/VektorTableContainer';
import LINKS from 'utils/constants/links';
import { usePagination, useFilter } from 'utils/hooks';
import { PERMISSIONS } from 'utils/constants';
import useUserPermissions from 'utils/hooks/useUserPermission';

const columns = [
  { id: 'name', label: 'Name', minWidth: 130 },
  { id: 'email', label: 'Email', minWidth: 130 },
  { id: 'organization', label: 'Organization', minWidth: 130 },
];

const UsersTable = () => {
  const users = useSelector((state) => state.users.results);
  const organizations = useSelector((state) => state.organizations.results);
  const { page, setPage, rowsPerPage, setRowsPerPage, pageRecords } = usePagination(filteredUsers);
  const [orgFilterComponent, organizationFilter] = useFilter({ items: organizations, label: 'organization' });
  const [perFilterComponent, permissionFilter] = useFilter({ items: PERMISSIONS, label: 'permission', keys: { value: 'VALUE', label: 'LABEL' } });
  const { isAdmin } = useUserPermissions();

  const filteredUsers = useMemo(() => {
    let results = users;
    if (organizationFilter) {
      results = results.filter((u) => u.organization === organizationFilter);
    }

    if (permissionFilter) {
      results = results.filter((u) => u.permissions === permissionFilter);
    }

    return results;
  }, [users, organizationFilter, permissionFilter]);

  const getOrganizationName = (_id) => {
    const organization = organizations.find((item) => item._id === _id);
    return organization?.name || '';
  };

  return (
    <Card>
      <CardHeader
        title={`${filteredUsers.length} users`}
        action={
          <Grid container spacing={4}>
            {isAdmin && <Grid item>{orgFilterComponent}</Grid>}
            <Grid item>{perFilterComponent}</Grid>
          </Grid>
        }
      />
      <CardContent>
        <VektorTableContainer
          columns={columns}
          rowCounts={filteredUsers.length}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        >
          {pageRecords.map((row) => (
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
