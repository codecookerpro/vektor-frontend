import React, { memo } from 'react';
import { MenuItem, Select, Typography, ListItemText, Checkbox, Input } from '@material-ui/core';
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
  disabledSelect: {
    '& .MuiSelect-select.Mui-disabled': {
      color: 'black',
    },
  },
}));

const FilterSelect = React.forwardRef(
  (
    { label, placeholder, items, error, fullWidth = false, multiple = false, keys = { label: 'LABEL', value: 'VALUE' }, className, value, ...rest },
    ref
  ) => {
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
          className={classes.disabledSelect}
          labelId="demo-simple-select-placeholder-label-label-1"
          id={`demo-simple-select-placeholder-label-${value}`}
          displayEmpty
          multiple={multiple}
          error={!!error}
          input={<Input />}
          value={value || (multiple ? [] : '')}
          renderValue={(value) =>
            multiple
              ? value.map((v) => items.find((item) => item[keys.value] === v)?.[keys.label]).join(', ')
              : items.find((item) => item[keys.value] === value)?.label
          }
          {...rest}
        >
          {placeholder && (
            <MenuItem value="" disabled>
              {placeholder}
            </MenuItem>
          )}

          {items.map((item, index) => (
            <MenuItem key={index} value={item[keys.value]}>
              {multiple && <Checkbox checked={value?.includes(item[keys.value]) || false} />}
              <ListItemText primary={item[keys.label]} />
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
