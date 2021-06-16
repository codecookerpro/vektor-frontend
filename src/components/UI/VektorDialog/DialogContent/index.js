import React, { memo } from 'react';
import { DialogContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {},
}));

const VektorDialogContent = (props) => {
  const classes = useStyles();
  return (
    <DialogContent {...props} className={classes.root}>
      {props.children}
    </DialogContent>
  );
};

export default memo(VektorDialogContent);
