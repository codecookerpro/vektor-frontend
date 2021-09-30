import { Box, Checkbox, IconButton, Menu, MenuItem, TableCell, TableRow, TextField } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { CheckCircle, Delete, Edit, MoreVert } from '@material-ui/icons';
import { ColorButton } from 'components/UI/Buttons';
import moment from 'moment';
import FilterSelect from 'components/UI/Selects/FilterSelect';
import VektorCheckbox from 'components/UI/VektorCheckbox';
import { Dialog, DialogTitle, DialogContent, DialogActions } from 'components/UI/VektorDialog';
import VektorSubTableContainer from 'parts/Tables/VektorSubTableContainer';
import { useEffect, useMemo, useState } from 'react';
import { useTableSort } from 'utils/hooks';
import { NOTE_TABLE_COLUMNS, NOTE_TYPES } from './constants';

const NoteDialog = ({ title, open, onClose, onSave, notes = [], departments }) => {
  const [rows, setRows] = useState(notes);
  const { sortedRows, handleSort } = useTableSort(rows);
  const [editIndex, setEditIndex] = useState(-1);
  const [editData, setEditData] = useState({ type: '', description: '', date: null, resource: [], status: false });
  const [anchorEl, setAnchorEl] = useState(null);

  // eslint-disable-next-line
  const renderRows = useMemo(() => {
    return sortedRows
      .map((r, idx) => ({
        ...r,
        ...(idx === editIndex && editData),
        editable: idx === editIndex,
      }))
      .map((r) =>
        r.editable
          ? r
          : {
              ...r,
              type: NOTE_TYPES.find((n) => n.value === r.type)?.label,
              date: moment(r.date).format('DD/MM/YYYY'),
              resource: departments
                .filter((d) => r.resource?.includes(d._id))
                .map((d) => d.label)
                .join(','),
            }
      );
  });

  const handleCellChange = ({ target: { name, value } }) => {
    setEditData({ ...editData, [name]: value });
  };

  const handleSaveNote = () => {
    setRows(rows.map((r, idx) => (idx === editIndex ? { ...r, ...editData } : r)));
    setEditIndex(-1);
  };

  const handleNewNote = () => {
    setAnchorEl(null);
    setEditData({});
    setEditIndex(rows.length);
    setRows([...rows, { type: '', description: '', date: null, resource: [], status: false }]);
  };

  const removeNote = (removeIdx) => {
    setRows((rows) => rows.filter((_, idx) => idx !== removeIdx));
  };

  // eslint-disable-next-line
  useEffect(() => setRows(notes), [open]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>{title} Notes</Box>
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <MoreVert />
          </IconButton>
          <Menu
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            getContentAnchorEl={null}
            anchorOrigin={{
              horizontal: 'right',
              vertical: 'bottom',
            }}
            transformOrigin={{
              horizontal: 'right',
              vertical: 'top',
            }}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={handleNewNote}>Add New Note</MenuItem>
          </Menu>
        </Box>
      </DialogTitle>
      <DialogContent>
        <VektorSubTableContainer columns={NOTE_TABLE_COLUMNS} onSort={handleSort}>
          {renderRows.map(({ _id, type, description, date, resource, status, editable }, idx) =>
            editable ? (
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
                    onChange={handleCellChange}
                    value={type}
                  />
                </TableCell>
                <TableCell>
                  <TextField name="description" value={description} onChange={handleCellChange} />
                </TableCell>
                <TableCell>
                  <DatePicker
                    name="date"
                    value={date || null}
                    format="dd/MM/yyyy"
                    onChange={(date) => handleCellChange({ target: { name: 'date', value: date } })}
                  />
                </TableCell>
                <TableCell>
                  <FilterSelect
                    placeholder="Select Resource"
                    items={departments}
                    multiple
                    name="resource"
                    keys={{
                      label: 'label',
                      value: '_id',
                    }}
                    onChange={handleCellChange}
                    value={resource}
                  />
                </TableCell>
                <TableCell>
                  <VektorCheckbox checked={status} onChange={(e) => handleCellChange({ target: { name: 'status', value: e.target.checked } })} />
                </TableCell>
                <TableCell>
                  <IconButton onClick={handleSaveNote}>
                    <CheckCircle />
                  </IconButton>
                </TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell>{type}</TableCell>
                <TableCell>{description}</TableCell>
                <TableCell>{date}</TableCell>
                <TableCell>{resource}</TableCell>
                <TableCell>
                  <Checkbox checked={status} />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => setEditIndex(idx)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => removeNote(idx)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            )
          )}
        </VektorSubTableContainer>
      </DialogContent>
      <DialogActions>
        <ColorButton colour="red" autoFocus onClick={onSave}>
          Save
        </ColorButton>
        <ColorButton colour="lightGreen" onClick={onClose}>
          Cancel
        </ColorButton>
      </DialogActions>
    </Dialog>
  );
};

export default NoteDialog;
