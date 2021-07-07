import React, { memo } from 'react';
import { TableCell, TableRow, Checkbox } from '@material-ui/core';

const ReportRow = ({ isAdmin, row, checkSelected, toggleHandler }) => {
  const { _id, calculated, ...rest } = row;

  return (
    <TableRow key={_id}>
      <TableCell component="th" scope="row">
        <Checkbox inputProps={{ 'aria-labelledby': `check-${_id}` }} checked={checkSelected(_id)} onChange={toggleHandler(row)} />
      </TableCell>
      {isAdmin && <TableCell>{rest.organizationName || ''}</TableCell>}
      <TableCell>{rest.projectName || ''}</TableCell>
      <TableCell>{rest.projectNumber || ''}</TableCell>
      <TableCell>{rest.projectManager?.name || ''}</TableCell>
      <TableCell>{rest.projectSupervisor?.name || ''}</TableCell>
      <TableCell>{rest.metaSystemName || ''}</TableCell>
      <TableCell>{rest.equipmentCategory || ''}</TableCell>
      <TableCell>{rest.equipmentName || ''}</TableCell>
      <TableCell>{rest.equipmentNumber || ''}</TableCell>
      <TableCell>{rest.deliverableName || ''}</TableCell>
      <TableCell>{rest.plannedHours?.toString() || ''}</TableCell>
      <TableCell>{rest.workedHours?.toString() || ''}</TableCell>
      <TableCell>{rest.start || ''}</TableCell>
      <TableCell>{rest.end || ''}</TableCell>
      <TableCell>{rest.status?.toString() || ''}</TableCell>
      <TableCell>{calculated.duration?.toString() || ''}</TableCell>
      <TableCell>{calculated.remainingDays?.toString() || ''}</TableCell>
      <TableCell>{calculated.lapsed?.toString() || ''}</TableCell>
      <TableCell>{calculated.differential?.toString() || ''}</TableCell>
      <TableCell>{calculated.effort?.toFixed(2) || ''}</TableCell>
      <TableCell>{calculated.EV?.toFixed(2) || ''}</TableCell>
      <TableCell>{calculated.PV?.toFixed(2) || ''}</TableCell>
    </TableRow>
  );
};

export default memo(ReportRow);
