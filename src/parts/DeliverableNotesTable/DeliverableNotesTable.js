import { useMemo, useState } from 'react';
import { Box, Checkbox, IconButton, TableCell, TableRow, TextField, Typography, Menu, MenuItem } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { Cancel, CheckCircle, Delete, Edit, MoreVert } from '@material-ui/icons';
import { useTableSort } from 'utils/hooks';
import moment from 'moment';

import FilterSelect from 'components/UI/Selects/FilterSelect';
import VektorCheckbox from 'components/UI/VektorCheckbox';
import VektorSubTableContainer from 'parts/Tables/VektorSubTableContainer';
import { NOTE_TABLE_COLUMNS, NOTE_TYPES } from './constants';

const DeliverableNotesTable = ({ notes, title, editable = false, users = [], onCreate, onUpdate, onDelete }) => {
  const { sortedRows, handleSort } = useTableSort(notes);
  const [editIndex, setEditIndex] = useState(-1);
  const [removeIndex, setRemoveIndex] = useState(-1);
  const [editData, setEditData] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [filterField, setFilterField] = useState('');
  const [filterValue, setFilterValue] = useState('');

  const handleFilterChange = (e) => {
    setFilterValue(e.target.value);
  };

  const handleFilterFieldChange = (e) => {
    setFilterValue('');
    setFilterField(e.target.value);
  };

  const filterValueEl = useMemo(() => {
    switch (filterField) {
      case 'description':
        return <TextField value={filterValue} onChange={handleFilterChange} />;
      case 'type':
        return (
          <FilterSelect
            nullable
            placeholder="All Types"
            items={NOTE_TYPES}
            keys={{ value: 'value', label: 'label' }}
            value={filterValue}
            onChange={handleFilterChange}
          />
        );
      case 'date':
        return (
          <FilterSelect
            nullable
            placeholder="All Dates"
            items={[...new Set(notes.map((n) => moment(n.date).format('DD/MM/YYYY')))].map((date) => ({ date }))}
            keys={{ value: 'date', label: 'date' }}
            value={filterValue}
            onChange={handleFilterChange}
          />
        );
      case 'resource':
        return (
          <FilterSelect
            nullable
            placeholder="All Resources"
            items={users}
            keys={{ value: '_id', label: 'name' }}
            value={filterValue}
            onChange={handleFilterChange}
          />
        );
      case 'status':
        return (
          <FilterSelect
            nullable
            placeholder="All Statuses"
            items={[
              { value: 'checked', label: 'Checked' },
              { value: 'unchecked', label: 'Unchecked' },
            ]}
            keys={{ value: 'value', label: 'label' }}
            value={filterValue}
            onChange={handleFilterChange}
          />
        );
      default:
        return null;
    }
  }, [filterField, filterValue, notes, users]);

  // eslint-disable-next-line
  const filteredRows = useMemo(() =>
    sortedRows.filter((r) => {
      const value = r?.[filterField];

      if (!filterValue) {
        return true;
      }

      switch (filterField) {
        case 'description':
          return value.toLowerCase().includes(filterValue.toLowerCase());
        case 'type':
        case 'resource':
          return value === filterValue;
        case 'date':
          return moment(value).format('DD/MM/YYYY') === filterValue;
        case 'status':
          return filterValue === 'checked' ? value : !value;
        default:
          return true;
      }
    })
  );

  // eslint-disable-next-line
  const renderRows = useMemo(() =>
    filteredRows.map((r, idx) => ({
      ...r,
      ...(idx === editIndex && editData),
      editable: idx === editIndex,
      removable: idx === removeIndex,
    }))
  );

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEditCell = (idx) => {
    setEditData(filteredRows[idx]);
    setEditIndex(idx);
    setRemoveIndex(-1);
  };

  const handleCellChange = ({ target: { name, value } }) => {
    setEditData({ ...editData, [name]: value });
  };

  const handleSaveNote = () => {
    setEditIndex(-1);
    onUpdate({ ...editData, noteId: editData._id });
  };

  const handleNewNote = () => {
    setAnchorEl(null);
    onCreate({ type: 'ACTION', description: 'Description', date: new Date(), resource: [], status: false });
  };

  const handleRemoveNote = (removeIdx) => {
    setRemoveIndex(removeIdx);
    setEditIndex(-1);
  };

  const handleRemoveConfirm = () => {
    onDelete(filteredRows.find((_, idx) => idx === removeIndex)?._id);
    setRemoveIndex(-1);
  };

  const handleCancel = () => {
    setEditIndex(-1);
    setRemoveIndex(-1);
  };

  const columns = useMemo(
    () => (editable ? NOTE_TABLE_COLUMNS.concat({ id: 'edit_button', label: '', minWidth: 50, sortable: false }) : NOTE_TABLE_COLUMNS),
    [editable]
  );

  return (
    <Box mb={6}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={4} pl={3}>
        <Typography variant="h4">{title} Notes</Typography>
        <Box display="flex" alignItems="center">
          <Typography style={{ marginRight: 16 }}>Filter By:</Typography>
          <FilterSelect
            nullable
            placeholder="Reset Filter"
            value={filterField}
            items={NOTE_TABLE_COLUMNS}
            keys={{ value: 'id', label: 'label' }}
            onChange={handleFilterFieldChange}
          />
          <Box ml={4}>{filterValueEl}</Box>

          {editable && (
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
              <MoreVert />
            </IconButton>
          )}

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
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={handleNewNote}>Add New Note</MenuItem>
          </Menu>
        </Box>
      </Box>
      <VektorSubTableContainer columns={columns} onSort={handleSort}>
        {renderRows.map(({ _id, type, description, date, resource, status, editable: rowEditable, removable }, idx) =>
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
                  onChange={handleCellChange}
                  value={type}
                />
              </TableCell>
              <TableCell>
                <TextField multiline name="description" value={description} onChange={handleCellChange} />
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
                  items={users}
                  name="resource"
                  multiple
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
                <IconButton onClick={handleCancel}>
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
                  <IconButton onClick={handleRemoveConfirm}>
                    <CheckCircle />
                  </IconButton>
                  <IconButton onClick={handleCancel}>
                    <Cancel />
                  </IconButton>
                </TableCell>
              ) : (
                editable && (
                  <TableCell>
                    <IconButton onClick={() => handleEditCell(idx)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleRemoveNote(idx)}>
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
