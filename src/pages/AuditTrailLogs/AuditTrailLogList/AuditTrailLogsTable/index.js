import React, { memo, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardHeader, CardContent, TableCell, TableRow, Grid } from '@material-ui/core';

import { getEvents } from 'redux/actions/events';
import LinkButton from 'components/UI/Buttons/LinkButton';
import VektorTableContainer from 'parts/Tables/VektorTableContainer';
import LINKS from 'utils/constants/links';
import { getEnglishDateWithTime } from 'utils/helpers/time';
import { isEmpty } from 'utils/helpers/utility';
import { useFilter, usePagination, useUserPermission } from 'utils/hooks';
import { ACTIONS, ENTITY_NAMES } from 'utils/constants';
import { getLinkFromEvent } from './helper';

const columns = [
  { id: 'actionTime', label: 'Action Time', minWidth: 220 },
  { id: 'user', label: 'User', minWidth: 90 },
  { id: 'contentType', label: 'Content Type', minWidth: 90 },
  { id: 'object', label: 'Object', minWidth: 90 },
  { id: 'action', label: 'Action', minWidth: 90 },
  { id: 'changeMessage', label: 'Change Message', minWidth: 90 },
];

const AuditTrailLogsTable = () => {
  const dispatch = useDispatch();

  const events = useSelector((state) => state.events.results);
  const count = useSelector((state) => state.events.pagination.count);
  const users = useSelector((state) => state.users.results);
  const organizations = useSelector((state) => state.organizations.results);

  const { isAdmin } = useUserPermission();

  const [orgFilterComponent, orgFilter] = useFilter({ items: organizations, label: 'organization' });
  const [userFilterComponent, userFilter] = useFilter({ items: users, label: 'user' });
  const [actionFilterComponent, actionFilter] = useFilter({ items: ACTIONS, label: 'action', keys: { value: 'value', label: 'label' } });
  const [entityFilterComponent, entityFilter] = useFilter({ items: ENTITY_NAMES, label: 'entity name', keys: { value: 'value', label: 'label' } });

  const filterObj = useMemo(
    () => ({
      organization: orgFilter || undefined,
      user: userFilter || undefined,
      actionType: actionFilter || undefined,
      mName: entityFilter || undefined,
    }),
    [orgFilter, userFilter, actionFilter, entityFilter]
  );

  const filterComponents = [isAdmin && orgFilterComponent, userFilterComponent, entityFilterComponent, actionFilterComponent].filter((f) => f);

  const { page, setPage, rowsPerPage, setRowsPerPage, pagination } = usePagination();

  // eslint-disable-next-line
  useEffect(() => dispatch(getEvents(pagination, filterObj, true)), [pagination, filterObj]);

  const getUserName = (_id) => {
    const user = users.find((item) => item._id === _id);
    return user?.email || '';
  };

  return (
    <Card>
      <CardHeader
        title={`${count} events`}
        action={
          <Grid container spacing={4}>
            {filterComponents.map((filter, idx) => (
              <Grid item key={idx}>
                {filter}
              </Grid>
            ))}
          </Grid>
        }
      />
      <CardContent>
        <VektorTableContainer
          columns={columns}
          rowCounts={count}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        >
          {events.map((row) => (
            <TableRow key={row._id}>
              <TableCell>
                <LinkButton to={LINKS.AUDIT_TRAIL_LOG_DETAIL.HREF.replace(':id', row._id)}>{getEnglishDateWithTime(row.updatedAt)}</LinkButton>
              </TableCell>
              <TableCell>{getUserName(row.user)}</TableCell>
              <TableCell>
                <LinkButton to={getLinkFromEvent(row)}>{row.mName}</LinkButton>
              </TableCell>
              <TableCell>{row.mId}</TableCell>
              <TableCell>{row.actionType}</TableCell>
              <TableCell>
                {!isEmpty(row?.change[0]) && `${row?.change[0]?.field}: ${row?.change[0]?.nValue || ''} - ${row?.change[0]?.pValue || ''}`}
              </TableCell>
            </TableRow>
          ))}
        </VektorTableContainer>
      </CardContent>
    </Card>
  );
};

export default memo(AuditTrailLogsTable);
