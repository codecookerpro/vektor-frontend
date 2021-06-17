import React, { memo } from 'react';
import { Dialog } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {},
  backDrop: {
    backdropFilter: 'blur(3px)',
    backgroundColor: 'rgba(0,0,30,0.4)',
  },
}));

const VektorDialog = (props) => {
  const classes = useStyles();

  return (
    <Dialog {...props} className={classes.root} BackdropProps={{ classes: { root: classes.backDrop } }}>
      {props.children}
    </Dialog>
  );
};

export default memo(VektorDialog);
