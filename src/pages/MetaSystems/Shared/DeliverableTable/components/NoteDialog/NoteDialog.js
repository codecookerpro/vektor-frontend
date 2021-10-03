import { useMemo, useState } from 'react';
import { Box, IconButton, Menu, MenuItem, Divider } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { Dialog, DialogTitle, DialogContent } from 'components/UI/VektorDialog';
import { useTableSort } from 'utils/hooks';
import DeliverableNotesTable from 'parts/DeliverableNotesTable';

const NoteDialog = ({ title, open, onClose, onCreate, onUpdate, onDelete, notes = [], users }) => {
  const { sortedRows, handleSort } = useTableSort(notes);
  const [editIndex, setEditIndex] = useState(-1);
  const [removeIndex, setRemoveIndex] = useState(-1);
  const [editData, setEditData] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);

  // eslint-disable-next-line
  const renderRows = useMemo(() =>
    sortedRows.map((r, idx) => ({
      ...r,
      ...(idx === editIndex && editData),
      editable: idx === editIndex,
      removable: idx === removeIndex,
    }))
  );

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleCloseAll = (e) => {
    setAnchorEl(null);
    onClose(e);
  };

  const handleEditCell = (idx) => {
    setEditData(sortedRows[idx]);
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
    onDelete(sortedRows.find((_, idx) => idx === removeIndex)?._id);
    setRemoveIndex(-1);
  };

  const handleCancel = () => {
    setEditIndex(-1);
    setRemoveIndex(-1);
  };

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
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={handleNewNote}>Add New Note</MenuItem>
            <Divider />
            <MenuItem onClick={handleCloseAll}>Close</MenuItem>
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
          onRemoveConfirm={handleRemoveConfirm}
          onSort={handleSort}
          onSave={handleSaveNote}
          onCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
};

export default NoteDialog;
