import React, { memo } from 'react';
import { Card, CardContent, TableCell, TableRow } from '@material-ui/core';

import VektorSubTableContainer from 'parts/Tables/VektorSubTableContainer';

const columns = [
  { id: 'totalHours', label: 'Total Planned Hours', minWidth: 100 },
  { id: 'pv', label: 'PV', minWidth: 100 },
  { id: 'status', label: 'Status', minWidth: 100 },
  { id: 'effort', label: 'Effort', minWidth: 100 },
  { id: 'ev', label: 'EV', minWidth: 100 },
];

const SystemStatusTable = ({ system }) => {
  return (
    <Card>
      <CardContent>
        <VektorSubTableContainer columns={columns}>
          <TableRow>
            <TableCell>{system.totalHours}</TableCell>
            <TableCell>{system.pv * 100}%</TableCell>
            <TableCell>{system.status * 100}%</TableCell>
            <TableCell>{system.effort * 100}%</TableCell>
            <TableCell>{system.ev * 100}%</TableCell>
          </TableRow>
        </VektorSubTableContainer>
      </CardContent>
    </Card>
  );
};

export default memo(SystemStatusTable);
