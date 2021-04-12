import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CardContent,
  TableCell,
  TableRow,
  Checkbox,
  Typography,
} from '@material-ui/core';

import { getAuditTrailLogs } from 'redux/actions/auditTrailLogs';
import LinkButton from 'components/UI/Buttons/LinkButton';
import VektorTableContainer from 'parts/Tables/VektorTableContainer';
import * as TABLE_ENVIRONMENTS from 'utils/constants/table-environments';
import LINKS from 'utils/constants/links';
import { getEnglishDateWithTime } from 'utils/helpers/time'

const columns = [
  { id: 'actionTime', label: 'Action Time', minWidth: 90 },
  { id: 'user', label: 'User', minWidth: 90 },
  { id: 'contentType', label: 'Content Type', minWidth: 90 },
  { id: 'object', label: 'Object', minWidth: 90 },
  { id: 'action', label: 'Action', minWidth: 90 },
  { id: 'changeMessage', label: 'Change Message', minWidth: 90 },
];

const AuditTrailLogsTable = ({
  selectedItems,
  setSelectedItems
}) => {
  const dispatch = useDispatch();

  const { results = [] } = useSelector(state => state.auditTrailLogs);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(
    TABLE_ENVIRONMENTS.ROWS_PER_PAGE
  );

  useEffect(() => {
    dispatch(getAuditTrailLogs());
  }, [dispatch])

  const toggleHandler = (value) => () => {
    const currentIndex = selectedItems.findIndex(
      (item) => item._id === value._id
    );
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
        <Typography variant='h5' color='textPrimary' gutterBottom>
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
          {(rowsPerPage > 0
            ? results.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            )
            : results
          ).map((row) => (
            <TableRow key={row._id}>
              <TableCell component='th' scope='row'>
                <div style={{ display: 'flex' }}>
                  <Checkbox
                    inputProps={{ 'aria-labelledby': `check-${row._id}` }}
                    checked={
                      selectedItems.findIndex(
                        (value) => row._id === value._id
                      ) !== -1
                    }
                    onChange={toggleHandler(row)}
                  />
                  <LinkButton
                    to={LINKS.AUDIT_TRAIL_LOG_DETAIL.HREF.replace(':id', row._id)}
                  >
                    {getEnglishDateWithTime(row.actionTime)}
                  </LinkButton>
                </div>
              </TableCell>
              <TableCell>
                {row.user}
              </TableCell>
              <TableCell>
                {row.contentType}
              </TableCell>
              <TableCell>
                {row.object}
              </TableCell>
              <TableCell>
                {row.action}
              </TableCell>
              <TableCell>
                {row.changeMessage}
              </TableCell>
            </TableRow>
          ))}
        </VektorTableContainer>
      </CardContent>
    </Card>
  );
};

export default memo(AuditTrailLogsTable);
