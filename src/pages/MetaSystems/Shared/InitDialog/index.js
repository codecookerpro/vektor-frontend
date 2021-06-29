import React, { memo } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from 'components/UI/VektorDialog';
import { ColorButton } from 'components/UI/Buttons';

const InitDialog = ({ open, onClose, onTemplate, onScratch }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle id="alert-dialog-title">Deliverables Initialization</DialogTitle>
    <DialogContent>
      <DialogContentText>Do you want to intialize deliverables with template?</DialogContentText>
    </DialogContent>
    <DialogActions>
      <ColorButton colour="red" autoFocus onClick={onTemplate}>
        Yes, with template
      </ColorButton>
      <ColorButton colour="lightGreen" onClick={onScratch}>
        No, from scratch
      </ColorButton>
    </DialogActions>
  </Dialog>
);

export default memo(InitDialog);
