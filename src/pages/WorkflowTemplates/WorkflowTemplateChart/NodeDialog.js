import React, { memo, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  nodePopupTextAlign: {
    textAlign: 'center',
    marginBottom: '12px',
  },
  dialogText: {
    width: '240px',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  nodePopupIgnoreButton: {
    backgroundColor: '#d32f2f',
  },
  nodePopupActions: {
    display: 'flex',
    justifyContent: 'space-evenly',
    marginBottom: '15px',
  },
  nodePopupDialog: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

const NodeDialog = ({
  isDialogOpen,
  setIsDialogOpen,
  label,
  handleInputChange,
  nodeId,
  handlePopUpToggle,
  dialogProps,
  handleDeleteNode
}) => {
  const classes = useStyles();
  const [nameTemp, setNameTemp] = useState(null);

  const handleDialogApprove = (e) => {
    e.preventDefault();
    setIsDialogOpen(false);
    handlePopUpToggle(e);
    if (dialogProps.type === 'edit') {
      handleInputChange(nodeId, nameTemp);
    } else if (dialogProps.type === 'delete') {
      handleDeleteNode(nodeId, e);
    }
  };

  return (
    <>
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className={classes.nodePopupDialog}>
          <DialogTitle id="alert-dialog-title" className={classes.nodePopupTextAlign}>
            {dialogProps && dialogProps.title}
          </DialogTitle>
          <DialogContent>
            {dialogProps && dialogProps.type === 'edit' && (
              <TextField
                onChange={(e) => setNameTemp(e.target.value)}
                label={label}
                defaultValue={label}
                multiline={true}
                rows={2}
                classes={{ root: classes.root }}
                autoFocus={true}
                className={classes.dialogText}
              />
            )}
            {dialogProps && dialogProps.type === 'delete' && <p className={classes.dialogText}>{dialogProps && dialogProps.content}</p>}
          </DialogContent>
          <DialogActions className={classes.nodePopupActions}>
            <Button onClick={() => setIsDialogOpen(false)} color="primary" variant="contained" className={classes.nodePopupIgnoreButton}>
              {dialogProps && dialogProps.ignoreButton}
            </Button>
            <Button onClick={handleDialogApprove} color="primary" variant="contained" autoFocus>
              {dialogProps && dialogProps.proceedButton}
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
};

export default memo(NodeDialog);
