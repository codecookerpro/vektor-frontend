import React, { memo } from 'react';
import { DialogActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'center',
    marginBottom: theme.spacing(5),
  },
}));

const VektorDialogActions = (props) => {
  const classes = useStyles();
  return (
    <DialogActions {...props} className={classes.root}>
      {props.children}
    </DialogActions>
  );
};

export default memo(VektorDialogActions);
