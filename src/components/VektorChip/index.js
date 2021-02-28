import React, { memo } from 'react';
import { Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import getStatusColor from 'utils/helpers/getStatusColor'

const useStyles = makeStyles((theme) => ({
  root: (props) => ({
    height: 'unset',
    borderRadius: 20,
    color: theme.custom.palette.white,
    backgroundColor: getStatusColor(props.color),
    '& span': {
      padding: theme.spacing(0.5, 1.5),
    }
  })
}));

const VektorChip = ({
  size = 'small',
  color,
  className,
  ...rest
}) => {
  const classes = useStyles({ color });

  return (
    <Chip
      size={size}
      className={clsx(classes.root, className)}
      {...rest}
    />
  );
}

export default memo(VektorChip);
