import React, { memo } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { makeStyles } from '@material-ui/core/styles';
import { setErrorPopup, setErrorPopupText } from 'redux/actions/errorsActions';
import { useDispatch, useSelector } from 'react-redux';

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
    whiteSpace: 'pre-line',
  },
}));

const PopupError = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { errorPopup = false, errorPopupText = '' } = useSelector((state) => state.errors);

  const handleClose = async () => {
    await dispatch(setErrorPopup(false));
    dispatch(setErrorPopupText(''));
  };

  return (
    <div>
      <Dialog
        open={errorPopup}
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
          <DialogContentText className={classes.dialogContentText}>{errorPopupText}</DialogContentText>
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
