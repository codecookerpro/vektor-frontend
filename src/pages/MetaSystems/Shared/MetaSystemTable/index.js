import React, { memo } from 'react';
import { Card, CardHeader, CardContent, TableCell, TableRow } from '@material-ui/core';
import { Plus } from 'react-feather';
import ContainedButton from 'components/UI/Buttons/ContainedButton';

import LinkButton from 'components/UI/Buttons/LinkButton';
import VektorSubTableContainer from 'parts/Tables/VektorSubTableContainer';
import LINKS from 'utils/constants/links';
import { useHistory } from 'react-router-dom';
import { round } from 'utils/helpers/utility';
import { useTableSort } from 'utils/hooks';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170, sortable: true },
  { id: 'mainSystem.calculated.totalPlannedHours', label: 'Total Planned Hours', minWidth: 100, sortable: true },
  { id: 'mainSystem.calculated.PV', label: 'PV', minWidth: 100, sortable: true },
  { id: 'mainSystem.calculated.status', label: 'Status', minWidth: 100, sortable: true },
  { id: 'mainSystem.calculated.totalWorkedHours', label: 'Effort', minWidth: 100, sortable: true },
  { id: 'mainSystem.calculated.EV', label: 'EV', minWidth: 100, sortable: true },
];

const MetaSystemTable = ({ projectId = 0, records = [] }) => {
  const history = useHistory();
  const { sortedRows, handleSort } = useTableSort(records);

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
        <VektorSubTableContainer columns={columns} onSort={handleSort}>
          {sortedRows.map((row) => (
            <TableRow key={row._id} id={row._id}>
              <TableCell component="th" scope="row">
                <LinkButton to={LINKS.EDIT_META_SYSTEM.HREF.replace(':systemId', row._id).replace(':mainSystemId', row.mainSystem._id)}>
                  {row.name}
                </LinkButton>
              </TableCell>
              <TableCell>{row.mainSystem.calculated.totalPlannedHours}</TableCell>
              <TableCell>{round(row.mainSystem.calculated.PV, 2)}%</TableCell>
              <TableCell>{round(row.mainSystem.status, 2)}%</TableCell>
              <TableCell>{row.mainSystem.calculated.totalWorkedHours}</TableCell>
              <TableCell>{round(row.mainSystem.calculated.EV, 2)}%</TableCell>
            </TableRow>
          ))}
        </VektorSubTableContainer>
      </CardContent>
    </Card>
  );
};

export default memo(MetaSystemTable);
