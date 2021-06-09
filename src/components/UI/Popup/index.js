import React, { memo } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { makeStyles } from '@material-ui/core/styles';
import { setPopup } from 'redux/actions/popupActions';
import { useDispatch, useSelector } from 'react-redux';
import { POPUP_TYPE } from 'utils/constants/popupType';
import { EMPTY_STRING } from 'utils/constants/emptyString';

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

const Popup = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const {
    popupType = POPUP_TYPE.INACTIVE,
    popupText = EMPTY_STRING,
    onConfirm = async () => {},
    onCancel = async () => {},
    confirmText = 'Confirm',
    cancelText = 'Cancel',
  } = useSelector((state) => state.popup);

  const handleClose = async () => {
    await dispatch(setPopup({ popupType: POPUP_TYPE.INACTIVE, popupText: EMPTY_STRING }));
    await onCancel();
  };

  const handleConfirm = async () => {
    await dispatch(setPopup({ popupType: POPUP_TYPE.INACTIVE, popupText: EMPTY_STRING }));
    await onConfirm();
  };

  if (popupType === POPUP_TYPE.INACTIVE) {
    return null;
  }

  return (
    <div>
      <Dialog
        open={popupType !== POPUP_TYPE.INACTIVE}
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
          <DialogContentText className={classes.dialogContentText}>{popupText}</DialogContentText>
        </DialogContent>
        <DialogActions className={classes.actionButtons}>
          {popupType === POPUP_TYPE.CONFIRM ? (
            <>
              <Button color="default" variant="contained" onClick={handleClose}>
                {cancelText}
              </Button>
              <Button color="primary" variant="contained" onClick={handleConfirm}>
                {confirmText}
              </Button>
            </>
          ) : (
            <Button color="primary" variant="contained" onClick={handleClose}>
              Okay, close
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default memo(Popup);
