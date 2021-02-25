
import React, { memo } from 'react'
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  root: {}
}));

const LinkButton = ({
  color = 'primary',
  children,
  className,
  ...rest
}) => {

  const classes = useStyles();

  return (
    <Button
      component={Link}
      color={color}
      className={clsx(classes.root, className)}
      {...rest}
    >
      {children}
    </Button>
  )
}

export default memo(LinkButton)