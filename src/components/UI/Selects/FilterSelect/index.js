import React, { memo } from 'react';
import { MenuItem, Select, Typography } from '@material-ui/core';
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
}));

const FilterSelect = React.forwardRef(
  ({ label, placeholder, items, error, fullWidth = false, keys = { label: 'LABEL', value: 'VALUE' }, className, ...rest }, ref) => {
    const classes = useStyles();

    return (
      <div
        className={clsx(classes.root, className, {
          [classes.fullWidth]: fullWidth,
        })}
      >
        {!!label && (
          <Typography color="textSecondary" className={classes.label}>
            {label}
          </Typography>
        )}
        <Select
          ref={ref}
          labelId="demo-simple-select-placeholder-label-label-1"
          id="demo-simple-select-placeholder-label"
          displayEmpty
          error={!!error}
          {...rest}
        >
          {placeholder && (
            <MenuItem value="" disabled>
              {placeholder}
            </MenuItem>
          )}

          {items.map((item, index) => (
            <MenuItem key={index} value={item[keys.value]}>
              {item[keys.label]}
            </MenuItem>
          ))}
        </Select>

        {!!error && (
          <Typography color="error" variant="caption" className={classes.error}>
            {error}
          </Typography>
        )}
      </div>
    );
  }
);

export default memo(FilterSelect);
