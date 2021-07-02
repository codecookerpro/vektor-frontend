import React, { memo, useMemo, useState } from 'react';
import { Card, CardHeader, CardContent, TableCell, TableRow, IconButton } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Edit, CheckCircle } from '@material-ui/icons';

import VektorSubTableContainer from 'parts/Tables/VektorSubTableContainer';
import { noop } from 'utils/constants';
import moment from 'moment';
import useFocusElement from 'utils/hooks/useFocusElement';

const mainColumns = [
  { id: 'dependency', label: 'Deliverable Dependancy', minWidth: 100 },
  { id: 'predecessors', label: 'Predecessors', minWidth: 70 },
  { id: 'plannedHours', label: 'Planned Hours', minWidth: 70 },
  { id: 'workedHours', label: 'Worked Hours', minWidth: 70 },
  { id: 'start', label: 'Start', minWidth: 120 },
  { id: 'end', label: 'End', minWidth: 120 },
  { id: 'completion', label: 'Completion', minWidth: 70 },
  { id: 'status', label: 'status', minWidth: 70 },
  { id: 'lapsed', label: 'lapsed', minWidth: 70 },
  { id: 'differential', label: 'differential', minWidth: 70 },
  { id: 'effort', label: 'effort', minWidth: 70 },
  { id: 'EV', label: 'EV', minWidth: 70 },
  { id: 'PV', label: 'PV', minWidth: 70 },
  { id: 'weight', label: 'weight', minWidth: 70 },
  { id: 'systemPV', label: 'System PV', minWidth: 70 },
  { id: 'systemStatus', label: 'System Status', minWidth: 70 },
  { id: 'systemEV', label: 'System EV', minWidth: 70 },
];

const DeliverableTable = ({ deliverables = [], editable = false, onRowChange = noop }) => {
  useFocusElement(deliverables);

  const [editData, setEditData] = useState({});
  const [editIndex, setEditIndex] = useState(-1);
  const columns = useMemo(() => {
    if (editable) {
      return [...mainColumns, { id: 'edit', label: '', minWidth: 70 }];
    } else {
      return mainColumns;
    }
  }, [editable]);
  const handleFieldChange = ({ target: { value, name } }) => setEditData({ ...editData, [name]: value });
  const handleEditButton = (idx) => {
    if (editIndex === idx) {
      setEditIndex(-1);
      onRowChange(editData);
    } else {
      setEditIndex(idx);
      setEditData(deliverables[idx]);
    }
  };
  const getFieldValue = (idx, name) => {
    const value = idx === editIndex ? editData[name] : deliverables[idx][name];

    if (['start', 'end', 'completion'].includes(name)) {
      return value ? moment(value).format('YYYY-MM-DD') : '';
    } else {
      return value;
    }
  };
  const getPredecessors = (row) => row.predecessors.map((pre) => deliverables.find((d) => d._id === pre).name).join(', ');
  const isDisabled = (idx) => idx !== editIndex && editIndex >= 0;
  const isReadOnly = (idx) => idx !== editIndex;
  const EditableRow = (row, idx) => (
    <TableRow key={row._id}>
      <TableCell>{getFieldValue(idx, 'name')}</TableCell>
      <TableCell>{getPredecessors(row)}</TableCell>
      <TableCell>
        <TextField
          type="number"
          name="plannedHours"
          InputProps={{
            readOnly: isReadOnly(idx),
            inputProps: { min: '0', max: '100', step: '1' },
          }}
          onChange={handleFieldChange}
          value={getFieldValue(idx, 'plannedHours')}
          disabled={isDisabled(idx)}
        />
      </TableCell>
      <TableCell>
        <TextField
          type="number"
          name="workedHours"
          InputProps={{
            readOnly: isReadOnly(idx),
            inputProps: { min: '0', max: '100', step: '1' },
          }}
          onChange={handleFieldChange}
          value={getFieldValue(idx, 'workedHours')}
          disabled={isDisabled(idx)}
        />
      </TableCell>
      <TableCell>
        <TextField
          id="start"
          name="start"
          type="date"
          value={getFieldValue(idx, 'start')}
          onChange={handleFieldChange}
          InputLabelProps={{
            shrink: true,
            readOnly: isReadOnly(idx),
          }}
          disabled={isDisabled(idx)}
        />
      </TableCell>
      <TableCell>
        <TextField
          id="end"
          name="end"
          type="date"
          value={getFieldValue(idx, 'end')}
          onChange={handleFieldChange}
          InputLabelProps={{
            shrink: true,
            readOnly: isReadOnly(idx),
          }}
          disabled={isDisabled(idx)}
        />
      </TableCell>
      <TableCell>
        <TextField
          id="completion"
          name="completion"
          type="date"
          value={getFieldValue(idx, 'completion')}
          onChange={handleFieldChange}
          InputLabelProps={{
            shrink: true,
            readOnly: isReadOnly(idx),
          }}
          disabled={isDisabled(idx)}
        />
      </TableCell>
      <TableCell>
        <TextField
          type="number"
          name="status"
          InputProps={{
            readOnly: isReadOnly(idx),
            inputProps: { min: '0', max: '100', step: '1' },
          }}
          onChange={handleFieldChange}
          value={getFieldValue(idx, 'status')}
          disabled={isDisabled(idx)}
        />
      </TableCell>
      <TableCell>{row.calculated.lapsed}</TableCell>
      <TableCell>{row.calculated.differential}</TableCell>
      <TableCell>{row.calculated.effort}</TableCell>
      <TableCell>{row.calculated.EV}%</TableCell>
      <TableCell>{row.calculated.PV}%</TableCell>
      <TableCell>{row.calculated.weight}</TableCell>
      <TableCell>{row.calculated.systemPV}%</TableCell>
      <TableCell>{row.calculated.systemStatus}%</TableCell>
      <TableCell>{row.calculated.systemEV}%</TableCell>
      <TableCell>
        <IconButton aria-label="edit" onClick={() => handleEditButton(idx)}>
          {idx === editIndex ? <CheckCircle /> : <Edit />}
        </IconButton>
      </TableCell>
    </TableRow>
  );

  const ReadOnlyRow = (row, idx) => (
    <TableRow key={row._id} id={row._id}>
      <TableCell>{getFieldValue(idx, 'name')}</TableCell>
      <TableCell>{getPredecessors(row)}</TableCell>
      <TableCell>{getFieldValue(idx, 'plannedHours')}</TableCell>
      <TableCell>{getFieldValue(idx, 'workedHours')}</TableCell>
      <TableCell>{getFieldValue(idx, 'start')}</TableCell>
      <TableCell>{getFieldValue(idx, 'end')}</TableCell>
      <TableCell>{getFieldValue(idx, 'completion')}</TableCell>
      <TableCell>{getFieldValue(idx, 'status')}%</TableCell>
      <TableCell>{row.calculated.lapsed}</TableCell>
      <TableCell>{row.calculated.differential}</TableCell>
      <TableCell>{row.calculated.effort}</TableCell>
      <TableCell>{row.calculated.EV}%</TableCell>
      <TableCell>{row.calculated.PV}%</TableCell>
      <TableCell>{row.calculated.weight}</TableCell>
      <TableCell>{row.calculated.systemPV}%</TableCell>
      <TableCell>{row.calculated.systemStatus}%</TableCell>
      <TableCell>{row.calculated.systemEV}%</TableCell>
    </TableRow>
  );

  return (
    <Card>
      <CardHeader title="Deliverables" />
      <CardContent>
        <VektorSubTableContainer columns={columns}>
          {deliverables.map((row, idx) => (editable ? EditableRow(row, idx) : ReadOnlyRow(row, idx)))}
        </VektorSubTableContainer>
      </CardContent>
    </Card>
  );
};

export default memo(DeliverableTable);
