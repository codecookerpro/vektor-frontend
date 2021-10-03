import { useMemo } from 'react';
import { Box, Checkbox, IconButton, TableCell, TableRow, TextField, Typography } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { Cancel, CheckCircle, Delete, Edit } from '@material-ui/icons';
import FilterSelect from 'components/UI/Selects/FilterSelect';
import VektorCheckbox from 'components/UI/VektorCheckbox';
import VektorSubTableContainer from 'parts/Tables/VektorSubTableContainer';
import { NOTE_TABLE_COLUMNS, NOTE_TYPES } from './constants';
import moment from 'moment';

const DeliverableNotesTable = ({ rows, editable = false, users = [], onCellChange, onEdit, onRemove, onRemoveConfirm, onSort, onSave, onCancel }) => {
  const columns = useMemo(
    () => (editable ? NOTE_TABLE_COLUMNS.concat({ id: 'edit_button', label: '', minWidth: 50, sortable: false }) : NOTE_TABLE_COLUMNS),
    [editable]
  );
  return (
    <Box mb={6}>
      <VektorSubTableContainer columns={columns} onSort={onSort}>
        {rows.map(({ _id, type, description, date, resource, status, editable: rowEditable, removable }, idx) =>
          rowEditable ? (
            <TableRow key={_id}>
              <TableCell>
                <FilterSelect
                  placeholder="Select Type"
                  items={NOTE_TYPES}
                  name="type"
                  keys={{
                    label: 'label',
                    value: 'value',
                  }}
                  onChange={onCellChange}
                  value={type}
                />
              </TableCell>
              <TableCell>
                <TextField multiline name="description" value={description} onChange={onCellChange} />
              </TableCell>
              <TableCell>
                <DatePicker
                  name="date"
                  value={date || null}
                  format="dd/MM/yyyy"
                  onChange={(date) => onCellChange({ target: { name: 'date', value: date } })}
                />
              </TableCell>
              <TableCell>
                <FilterSelect
                  placeholder="Select Resource"
                  items={users}
                  name="resource"
                  multiple
                  keys={{
                    label: 'label',
                    value: '_id',
                  }}
                  onChange={onCellChange}
                  value={resource}
                />
              </TableCell>
              <TableCell>
                <VektorCheckbox checked={status} onChange={(e) => onCellChange({ target: { name: 'status', value: e.target.checked } })} />
              </TableCell>
              <TableCell>
                <IconButton onClick={onSave}>
                  <CheckCircle />
                </IconButton>
                <IconButton onClick={onCancel}>
                  <Cancel />
                </IconButton>
              </TableCell>
            </TableRow>
          ) : (
            <TableRow key={_id}>
              <TableCell>{NOTE_TYPES.find((t) => t.value === type).label}</TableCell>
              <TableCell style={{ overflowWrap: 'anywhere', width: 300 }}>{description}</TableCell>
              <TableCell>{moment(date).format('DD/MM/YYYY')}</TableCell>
              <TableCell>
                {resource.map((userId) => (
                  <Typography key={userId}>{users.find((u) => u._id === userId)?.name}</Typography>
                ))}
              </TableCell>
              <TableCell>
                <Checkbox checked={status} />
              </TableCell>
              {removable ? (
                <TableCell>
                  <IconButton onClick={onRemoveConfirm}>
                    <CheckCircle />
                  </IconButton>
                  <IconButton onClick={onCancel}>
                    <Cancel />
                  </IconButton>
                </TableCell>
              ) : (
                editable && (
                  <TableCell>
                    <IconButton onClick={() => onEdit(idx)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => onRemove(idx)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                )
              )}
            </TableRow>
          )
        )}
      </VektorSubTableContainer>
    </Box>
  );
};

export default DeliverableNotesTable;
