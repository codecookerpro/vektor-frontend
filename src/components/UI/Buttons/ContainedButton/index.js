import React, { memo } from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.custom.palette.lightGreen,
  },
}));

const ContainedButton = ({ color = 'primary', className, children, ...rest }) => {
  const classes = useStyles();

  return (
    <Button variant="contained" color={color} className={clsx(classes.root, className)} {...rest}>
      {children}
    </Button>
  );
};

export default memo(ContainedButton);
