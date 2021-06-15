import React, { memo } from 'react';
import { Card, CardHeader, CardContent, TableCell, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Calendar } from 'react-feather';

import VektorSubTableContainer from 'parts/Tables/VektorSubTableContainer';

const useStyles = makeStyles(() => ({
  date: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const columns = [
  { id: 'dependency', label: 'Deliverable Dependancy', minWidth: 170 },
  { id: 'predecessors', label: 'Predecessors', minWidth: 170 },
  { id: 'plannedHours', label: 'Planned Hours', minWidth: 100 },
  { id: 'workedHours', label: 'Worked Hours', minWidth: 100 },
  { id: 'start', label: 'Start', minWidth: 100 },
  { id: 'end', label: 'End', minWidth: 100 },
];

const DeliverableTable = ({ deliverables = [] }) => {
  const classes = useStyles();
  return (
    <Card>
      <CardHeader title="Deliverables Table" />
      <CardContent>
        <VektorSubTableContainer columns={columns}>
          {deliverables.map((row) => (
            <TableRow key={row._id}>
              <TableCell>{row.name || ''}</TableCell>
              <TableCell>{row.predecessors.map((pre) => deliverables.find((d) => d._id === pre).name)}</TableCell>
              <TableCell>{row.plannedHours || ''}</TableCell>
              <TableCell>{row.workedHours || ''}</TableCell>
              <TableCell>
                <div className={classes.date}>
                  <Calendar />
                  {row.start || ''}
                </div>
              </TableCell>
              <TableCell>
                <div className={classes.date}>
                  <Calendar />
                  {row.end || ''}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </VektorSubTableContainer>
      </CardContent>
    </Card>
  );
};

export default memo(DeliverableTable);
