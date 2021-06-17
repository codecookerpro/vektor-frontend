import React, { memo } from 'react';
import { DialogTitle } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(5),
  },
}));

const VektorDialogTitle = (props) => {
  const classes = useStyles();
  return (
    <DialogTitle {...props} className={classes.root}>
      {props.children}
    </DialogTitle>
  );
};

export default memo(VektorDialogTitle);
