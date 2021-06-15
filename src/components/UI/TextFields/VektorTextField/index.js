import React, { memo } from 'react';
import { TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 148,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
  },
  fullWidth: {
    width: '100%',
  },
  disabledTextField: {
    '& .MuiInputBase-root.Mui-disabled': {
      color: 'black',
    },
  },
}));

const VektorTextField = React.forwardRef(({ label, error, className, value, ...rest }, ref) => {
  const classes = useStyles();

  return (
    <div m={2} className={clsx(classes.root, className)}>
      {!!label && (
        <Typography color="textSecondary" className={classes.label}>
          {label}
        </Typography>
      )}
      <TextField className={classes.disabledTextField} ref={ref} id={`standard-helperText-${value}`} error={!!error} value={value || ''} {...rest} />
      {!!error && (
        <Typography color="error" variant="caption" className={classes.error}>
          {error}
        </Typography>
      )}
    </div>
  );
});

export default memo(VektorTextField);
