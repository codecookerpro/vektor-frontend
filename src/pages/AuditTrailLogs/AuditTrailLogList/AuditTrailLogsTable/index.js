import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, TableCell, TableRow, Checkbox, Typography } from '@material-ui/core';

import { getEvents } from 'redux/actions/events';
import LinkButton from 'components/UI/Buttons/LinkButton';
import VektorTableContainer from 'parts/Tables/VektorTableContainer';
import { DEFAULT_ROWS_PER_PAGE } from 'utils/constants';
import LINKS from 'utils/constants/links';
import { getEnglishDateWithTime } from 'utils/helpers/time';
import { isEmpty } from 'utils/helpers/utility';

const columns = [
  { id: 'actionTime', label: 'Action Time', minWidth: 220 },
  { id: 'user', label: 'User', minWidth: 90 },
  { id: 'contentType', label: 'Content Type', minWidth: 90 },
  { id: 'object', label: 'Object', minWidth: 90 },
  { id: 'action', label: 'Action', minWidth: 90 },
  { id: 'changeMessage', label: 'Change Message', minWidth: 90 },
];

const AuditTrailLogsTable = ({ selectedItems, setSelectedItems }) => {
  const dispatch = useDispatch();

  const { results = [] } = useSelector((state) => state.events);
  const users = useSelector((state) => state.users.results);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  const getUserName = (_id) => {
    const user = users.find((item) => item._id === _id);
    return user?.email || '';
  };

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

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" color="textPrimary" gutterBottom>
          All
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
                  <LinkButton to={LINKS.AUDIT_TRAIL_LOG_DETAIL.HREF.replace(':id', row._id)}>{getEnglishDateWithTime(row.updatedAt)}</LinkButton>
                </div>
              </TableCell>
              <TableCell>{getUserName(row.user)}</TableCell>
              <TableCell>{row.mName}</TableCell>
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
