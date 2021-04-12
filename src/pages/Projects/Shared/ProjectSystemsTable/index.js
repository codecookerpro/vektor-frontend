import React, { memo } from 'react';
import {
  Card,
  CardContent,
  TableCell,
  TableRow,
  Typography,
} from '@material-ui/core';

import LinkButton from 'components/UI/Buttons/LinkButton';
import VektorSubTableContainer from 'parts/Tables/VektorSubTableContainer';
import LINKS from 'utils/constants/links';
import results from 'utils/temp/systems';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'workflow', label: 'Workflow', minWidth: 170 },
  { id: 'totalHours', label: 'Total Planned Hours', minWidth: 100 },
  { id: 'pv', label: 'PV', minWidth: 100 },
  { id: 'status', label: 'Status', minWidth: 100 },
  { id: 'effort', label: 'Effort', minWidth: 100 },
  { id: 'ev', label: 'EV', minWidth: 100 },
];

const ProjectSystemsTable = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant='h5' color='textPrimary' gutterBottom>
          Systems
        </Typography>
        <VektorSubTableContainer columns={columns}>
          {results.map((row) => (
            <TableRow key={row.id}>
              <TableCell component='th' scope='row'>
                <LinkButton to={LINKS.EDIT_SYSTEM.HREF.replace(':id', row.id)}>
                  {row.name}
                </LinkButton>
              </TableCell>
              <TableCell>{row.workflow.name || ''}</TableCell>
              <TableCell>{row.totalHours}</TableCell>
              <TableCell>{row.pv * 100}%</TableCell>
              <TableCell>{row.status * 100}%</TableCell>
              <TableCell>{row.effort * 100}%</TableCell>
              <TableCell>{row.ev * 100}%</TableCell>
            </TableRow>
          ))}
        </VektorSubTableContainer>
      </CardContent>
    </Card>
  );
};

export default memo(ProjectSystemsTable);
