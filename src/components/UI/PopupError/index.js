import React, { memo, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backDrop: {
    backdropFilter: 'blur(3px)',
    backgroundColor: 'rgba(0,0,30,0.4)',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.custom.palette.black,
  },
  actionButtons: {
    justifyContent: 'center',
    marginBottom: theme.spacing(5),
  },
  dialogTitle: {
    marginBottom: theme.spacing(5),
  },
  dialogContentText: {
    color: theme.custom.palette.black,
  },
}));

const PopupError = ({ errorPopup = '', setErrorPopup }) => {
  const [open, setOpen] = useState(!!errorPopup.length);
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
    setErrorPopup('');
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth={false}
        aria-labelledby="max-width-dialog-title"
        BackdropProps={{
          classes: {
            root: classes.backDrop,
          },
        }}
      >
        <DialogTitle id="max-width-dialog-title" className={classes.dialogTitle}>
          <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.dialogContentText}>{errorPopup}</DialogContentText>
        </DialogContent>
        <DialogActions className={classes.actionButtons}>
          <Button color="primary" variant="contained" onClick={handleClose}>
            Okay, close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default memo(PopupError);
