import { TextField } from '@material-ui/core';
import { ColorButton } from 'components/UI/Buttons';
import { Dialog, DialogTitle, DialogContent, DialogActions } from 'components/UI/VektorDialog';

const NoteDialog = ({ open, onClose, onSave, data, onChange }) => (
  <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
    <DialogTitle>Deliverables Note Dialog</DialogTitle>
    <DialogContent>
      <TextField multiline rows={5} name="note" label="Deliverable Note" fullWidth variant="outlined" value={data?.note} onChange={onChange} />
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

export default NoteDialog;
