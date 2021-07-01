import React, { memo, useMemo, useState } from 'react';
import { Card, CardHeader, CardContent, TableCell, TableRow, IconButton } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Edit, CheckCircle } from '@material-ui/icons';

import VektorSubTableContainer from 'parts/Tables/VektorSubTableContainer';
import { noop } from 'utils/constants';
import moment from 'moment';
import useFocusElement from 'utils/hooks/useFocusElement';

const mainColumns = [
  { id: 'dependency', label: 'Deliverable Dependancy', minWidth: 170 },
  { id: 'predecessors', label: 'Predecessors', minWidth: 170 },
  { id: 'plannedHours', label: 'Planned Hours', minWidth: 100 },
  { id: 'workedHours', label: 'Worked Hours', minWidth: 100 },
  { id: 'start', label: 'Start', minWidth: 100 },
  { id: 'end', label: 'End', minWidth: 100 },
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

    if (['start', 'end'].includes(name)) {
      return moment(value).format('YYYY-MM-DD');
    } else {
      return value;
    }
  };
  const getPredecessors = (row) => row.predecessors.map((pre) => deliverables.find((d) => d._id === pre).name);
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
    </TableRow>
  );

  return (
    <Card>
      <CardHeader title="Deliverables Table" />
      <CardContent>
        <VektorSubTableContainer columns={columns}>
          {deliverables.map((row, idx) => (editable ? EditableRow(row, idx) : ReadOnlyRow(row, idx)))}
        </VektorSubTableContainer>
      </CardContent>
    </Card>
  );
};

export default memo(DeliverableTable);
