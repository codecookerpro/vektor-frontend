import React, { memo } from 'react';
import { Card, CardHeader, CardContent, TableCell, TableRow } from '@material-ui/core';
import { Plus } from 'react-feather';
import ContainedButton from 'components/UI/Buttons/ContainedButton';

import LinkButton from 'components/UI/Buttons/LinkButton';
import VektorSubTableContainer from 'parts/Tables/VektorSubTableContainer';
import LINKS from 'utils/constants/links';
import { useHistory } from 'react-router-dom';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'totalHours', label: 'Total Planned Hours', minWidth: 100 },
  { id: 'pv', label: 'PV', minWidth: 100 },
  { id: 'status', label: 'Status', minWidth: 100 },
  { id: 'effort', label: 'Effort', minWidth: 100 },
  { id: 'ev', label: 'EV', minWidth: 100 },
];

const MetaSystemTable = ({ projectId = 0, records = [] }) => {
  const history = useHistory();

  return (
    <Card>
      <CardHeader
        title="Systems"
        action={
          <ContainedButton onClick={() => history.push(LINKS.ADD_META_SYSTEM.HREF.replace(':projectId', projectId))}>
            <Plus /> Add Systems
          </ContainedButton>
        }
      />
      <CardContent>
        <VektorSubTableContainer columns={columns}>
          {records.map((row) => (
            <TableRow key={row._id} id={row._id}>
              <TableCell component="th" scope="row">
                <LinkButton to={LINKS.EDIT_META_SYSTEM.HREF.replace(':systemId', row._id)}>{row.name}</LinkButton>
              </TableCell>
              <TableCell>{row.mainSystem.calculated.totalPlannedHours}</TableCell>
              <TableCell>{row.mainSystem.calculated.PV}%</TableCell>
              <TableCell>{row.mainSystem.calculated.status}%</TableCell>
              <TableCell>{row.mainSystem.calculated.totalWorkedHours}</TableCell>
              <TableCell>{row.mainSystem.calculated.EV}%</TableCell>
            </TableRow>
          ))}
        </VektorSubTableContainer>
      </CardContent>
    </Card>
  );
};

export default memo(MetaSystemTable);
