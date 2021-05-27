import React, { memo } from 'react';
import { Card, CardContent, TableCell, TableRow, Typography } from '@material-ui/core';

import VektorSubTableContainer from 'parts/Tables/VektorSubTableContainer';

const columns = [
  { id: 'date', label: 'Date/Time', minWidth: 170 },
  { id: 'user', label: 'User', minWidth: 170 },
  { id: 'action', label: 'Action', minWidth: 100 },
];

const HistoryTableCard = ({ title, results }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" color="textPrimary" gutterBottom>
          {title}
        </Typography>
        <VektorSubTableContainer columns={columns}>
          {results.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date || ''}</TableCell>
              <TableCell>{`${row?.user?.email}(${row?.user?.name})`}</TableCell>
              <TableCell>{row.action}</TableCell>
            </TableRow>
          ))}
        </VektorSubTableContainer>
      </CardContent>
    </Card>
  );
};

export default memo(HistoryTableCard);
