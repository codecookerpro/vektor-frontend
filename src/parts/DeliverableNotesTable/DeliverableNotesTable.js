import { useMemo } from 'react';
import { Box, Checkbox, IconButton, TableCell, TableRow, TextField, Typography } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { CheckCircle, Delete, Edit } from '@material-ui/icons';
import FilterSelect from 'components/UI/Selects/FilterSelect';
import VektorCheckbox from 'components/UI/VektorCheckbox';
import VektorSubTableContainer from 'parts/Tables/VektorSubTableContainer';
import { NOTE_TABLE_COLUMNS, NOTE_TYPES } from './constants';
import moment from 'moment';

const DeliverableNotesTable = ({ rows, editable = false, users = [], onCellChange, onEdit, onRemove, onSort, onSave }) => {
  const columns = useMemo(
    () => (editable ? NOTE_TABLE_COLUMNS.concat({ id: 'edit_button', label: '', minWidth: 50, sortable: false }) : NOTE_TABLE_COLUMNS),
    [editable]
  );
  return (
    <Box mb={6}>
      <VektorSubTableContainer columns={columns} onSort={onSort}>
        {rows.map(({ _id, type, description, date, resource, status, editable: rowEditable }, idx) =>
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
                <TextField name="description" value={description} onChange={onCellChange} />
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
              </TableCell>
            </TableRow>
          ) : (
            <TableRow>
              <TableCell>{NOTE_TYPES.find((t) => t.value === type).label}</TableCell>
              <TableCell>{description}</TableCell>
              <TableCell>{moment(date).format('DD/MM/YYYY')}</TableCell>
              <TableCell>
                {resource.map((user) => (
                  <Typography>{users.find((u) => u._id === user)?.label}</Typography>
                ))}
              </TableCell>
              <TableCell>
                <Checkbox checked={status} />
              </TableCell>
              {editable && (
                <TableCell>
                  <IconButton onClick={() => onEdit(idx)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => onRemove(idx)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          )
        )}
      </VektorSubTableContainer>
    </Box>
  );
};

export default DeliverableNotesTable;