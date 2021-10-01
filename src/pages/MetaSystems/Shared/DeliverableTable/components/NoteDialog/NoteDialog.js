import { Box, IconButton, Menu, MenuItem } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { Dialog, DialogTitle, DialogContent } from 'components/UI/VektorDialog';
import { useEffect, useMemo, useState } from 'react';
import { useTableSort } from 'utils/hooks';
import DeliverableNotesTable from 'parts/DeliverableNotesTable';

const DEFAULT_NOTE_DATA = { type: '', description: '', date: null, resource: [], status: false };

const NoteDialog = ({ title, open, onClose, onCreate, onUpdate, notes = [], users }) => {
  const [rows, setRows] = useState(notes);
  const { sortedRows, handleSort } = useTableSort(rows);
  const [editIndex, setEditIndex] = useState(-1);
  const [editData, setEditData] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);

  // eslint-disable-next-line
  const renderRows = useMemo(() =>
    sortedRows.map((r, idx) => ({
      ...r,
      ...(idx === editIndex && editData),
      editable: idx === editIndex,
    }))
  );

  const handleEditCell = (idx) => {
    setEditData(sortedRows[idx]);
    setEditIndex(idx);
  };

  const handleCellChange = ({ target: { name, value } }) => {
    setEditData({ ...editData, [name]: value });
  };

  const handleSaveNote = () => {
    setRows(rows.map((r, idx) => (idx === editIndex ? { ...r, ...editData } : r)));
    setEditIndex(-1);

    if (editData._id) {
      onUpdate({ ...editData, noteId: editData._id });
    } else {
      onCreate(editData);
    }
  };

  const handleNewNote = () => {
    setAnchorEl(null);
    setEditData({});
    setRows([...rows, DEFAULT_NOTE_DATA]);
    setEditIndex(rows.length);
  };

  const handleRemoveNote = (removeIdx) => {
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
        <DeliverableNotesTable
          editable
          rows={renderRows}
          users={users}
          onEdit={handleEditCell}
          onCellChange={handleCellChange}
          onRemove={handleRemoveNote}
          onSort={handleSort}
          onSave={handleSaveNote}
        />
      </DialogContent>
    </Dialog>
  );
};

export default NoteDialog;
