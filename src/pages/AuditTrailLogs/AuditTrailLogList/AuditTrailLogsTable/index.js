import React, { memo, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardHeader, CardContent, TableCell, TableRow, Grid } from '@material-ui/core';

import { getEvents } from 'redux/actions/events';
import LinkButton from 'components/UI/Buttons/LinkButton';
import VektorTableContainer from 'parts/Tables/VektorTableContainer';
import LINKS from 'utils/constants/links';
import { getEnglishDateWithTime } from 'utils/helpers/time';
import { useFilter, usePagination, useUserPermission } from 'utils/hooks';
import { ACTIONS, ENTITY_NAMES } from 'utils/constants';
import { changeToString, getLinkFromEvent } from './helper';
import { ADMIN_COLUMNS, COLUMNS } from './constants';

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

  const getUserName = (_id) => users.find((item) => item._id === _id)?.email || '';
  const getOrgName = (_id) => organizations.find((org) => org._id === _id)?.name || '';

  const commonCells = (data, rowSpan = 1) => (
    <>
      <TableCell rowSpan={rowSpan}>
        <LinkButton to={LINKS.AUDIT_TRAIL_LOG_DETAIL.HREF.replace(':id', data._id)}>{getEnglishDateWithTime(data.updatedAt)}</LinkButton>
      </TableCell>
      {isAdmin && <TableCell rowSpan={rowSpan}>{getOrgName(data.organization)}</TableCell>}
      {isAdmin && <TableCell rowSpan={rowSpan}>{getUserName(data.user)}</TableCell>}
      <TableCell rowSpan={rowSpan}>{getLinkFromEvent(data)}</TableCell>
      <TableCell rowSpan={rowSpan}>{data.mId}</TableCell>
      <TableCell rowSpan={rowSpan}>{data.actionType}</TableCell>
    </>
  );
  const changeCells = (chg) => (
    <>
      <TableCell>{chg.field}</TableCell>
      <TableCell>{changeToString(chg.pValue)}</TableCell>
      <TableCell>{changeToString(chg.nValue)}</TableCell>
    </>
  );

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
          columns={isAdmin ? ADMIN_COLUMNS : COLUMNS}
          rowCounts={count}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        >
          {events
            .map((row) => {
              const change = row.change.filter((chg) => chg.nValue !== chg.pValue);

              if (change.length === 0) {
                return (
                  <TableRow key={`${row._id}-none`}>
                    {commonCells(row)}
                    <TableCell colSpan={3} />
                  </TableRow>
                );
              } else {
                return change.map((chg, idx) =>
                  idx === 0 ? (
                    <TableRow key={`${row._id}-${idx}`}>
                      {commonCells(row, change.length)}
                      {changeCells(chg)}
                    </TableRow>
                  ) : (
                    <TableRow key={`${row._id}-${idx}`}>{changeCells(chg)}</TableRow>
                  )
                );
              }
            })
            .flat()}
        </VektorTableContainer>
      </CardContent>
    </Card>
  );
};

export default memo(AuditTrailLogsTable);
