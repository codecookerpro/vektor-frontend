import React, { memo } from 'react';
import { Card, CardContent, TableCell, TableRow, Typography } from '@material-ui/core';
import { Calendar } from 'react-feather';
import { makeStyles } from '@material-ui/core/styles';

import VektorSubTableContainer from 'parts/Tables/VektorSubTableContainer';
import results from 'utils/temp/project-phases';

const useStyles = makeStyles(() => ({
  date: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'plannedComplete', label: 'Planned project % complete', minWidth: 100 },
  { id: 'start', label: 'Start', minWidth: 100 },
  { id: 'end', label: 'End', minWidth: 100 },
];

const ProjectPhasesTable = () => {
  const classes = useStyles();
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" color="textPrimary" gutterBottom>
          Project Phases
        </Typography>
        <VektorSubTableContainer columns={columns}>
          {results.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name || ''}</TableCell>
              <TableCell>{row.plannedComplete * 100}%</TableCell>
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

export default memo(ProjectPhasesTable);
