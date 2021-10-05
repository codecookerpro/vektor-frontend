import React from 'react';
import { Dialog, DialogContent } from 'components/UI/VektorDialog';
import DeliverableNotesTable from 'parts/DeliverableNotesTable';

const NoteDialog = ({ title, open, onClose, notes = [], users, onCreate, onUpdate, onDelete }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <DialogContent>
        <DeliverableNotesTable editable title={title} notes={notes} users={users} onCreate={onCreate} onUpdate={onUpdate} onDelete={onDelete} />
      </DialogContent>
    </Dialog>
  );
};

export default NoteDialog;
