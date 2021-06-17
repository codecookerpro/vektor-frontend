import React, { memo } from 'react';
import { DialogContentText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.custom.palette.black,
    whiteSpace: 'pre-line',
  },
}));

const VektorDialogContentText = (props) => {
  const classes = useStyles();
  return (
    <DialogContentText {...props} className={classes.root}>
      {props.children}
    </DialogContentText>
  );
};

export default memo(VektorDialogContentText);
