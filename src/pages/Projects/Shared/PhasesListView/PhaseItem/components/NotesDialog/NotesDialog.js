import React, { memo } from 'react';
import { Dialog, DialogTitle, DialogContent } from 'components/UI/VektorDialog';
import { IconButton, Box } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import DeliverableNotesTable from 'parts/DeliverableNotesTable';

const DetailDialog = ({ open, deliverables, users, onClose }) => (
  <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
    <DialogTitle>
      Deliverable Notes
      <IconButton
        aria-label="close"
        onClick={onClose}
        style={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <Close />
      </IconButton>
    </DialogTitle>
    <DialogContent dividers>
      {deliverables.map((d) =>
        d.notes.length ? (
          <Box p={4}>
            <DeliverableNotesTable title={d.name} notes={d.notes} key={d._id} users={users} />
          </Box>
        ) : null
      )}
    </DialogContent>
  </Dialog>
);

export default memo(DetailDialog);
