import React, { memo } from 'react';
import moment from 'moment';
import { Card, CardContent, TableCell, TableRow, Typography, TextField, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import VektorSubTableContainer from 'parts/Tables/VektorSubTableContainer';
import { ACTIONS } from 'pages/Projects/helpers';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'plannedComplete', label: 'Planned project % complete', minWidth: 100 },
  { id: 'start', label: 'Start', minWidth: 100 },
  { id: 'end', label: 'End', minWidth: 100 },
  { id: 'edit', label: '', minWidth: 70 },
];

const ProjectPhasesTable = ({ activeAction, editingPhase, phases, onActionClick, onChangePhase }) => {
  const isEditing = (currentOrderIndex) => editingPhase?.orderIndex === currentOrderIndex;
  const isEditingField = (currentOrderIndex) => activeAction === ACTIONS.EDIT && isEditing(currentOrderIndex);

  const onEditClick = (orderIndex) => () => {
    const action = isEditing(orderIndex) ? ACTIONS.COMPLETE : ACTIONS.EDIT;
    onActionClick(action, orderIndex);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" color="textPrimary" gutterBottom>
          Project Phases
        </Typography>
        <VektorSubTableContainer columns={columns}>
          {phases.map((phase, idx) => (
            <TableRow key={phase._id || phase.orderIndex}>
              <TableCell>{phase.name || ''}</TableCell>
              <TableCell>
                <TextField
                  type="number"
                  name="plannedValue"
                  InputProps={{ inputProps: { min: '0', max: '100', step: '1' } }}
                  onChange={({ target }) => onChangePhase(target, idx)}
                  value={isEditingField(phase.orderIndex) ? editingPhase.plannedValue : phases[idx].plannedValue}
                  disabled={!isEditing(phase.orderIndex)}
                />
                %
              </TableCell>
              <TableCell>
                <TextField
                  id="date"
                  name="start"
                  type="date"
                  value={
                    isEditingField(phase.orderIndex)
                      ? moment(editingPhase.start).format('YYYY-MM-DD')
                      : moment(phases[idx].start).format('YYYY-MM-DD')
                  }
                  onChange={({ target }) => onChangePhase(target, idx)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled={!isEditing(phase.orderIndex)}
                />
              </TableCell>
              <TableCell>
                <TextField
                  id="date"
                  name="end"
                  type="date"
                  value={
                    isEditingField(phase.orderIndex) ? moment(editingPhase.end).format('YYYY-MM-DD') : moment(phases[idx].end).format('YYYY-MM-DD')
                  }
                  onChange={({ target }) => onChangePhase(target, idx)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled={!isEditing(phase.orderIndex)}
                />
              </TableCell>
              <TableCell>
                <IconButton aria-label="edit" onClick={onEditClick(phase.orderIndex)}>
                  {!isEditing(phase.orderIndex) ? <EditIcon /> : <CheckCircleIcon />}
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </VektorSubTableContainer>
      </CardContent>
    </Card>
  );
};

export default memo(ProjectPhasesTable);
