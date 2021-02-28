import React, { memo } from 'react';
import {
  FormHelperText,
  InputLabel,
  MenuItem,
  FormControl,
  Select
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 148
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: theme.spacing(1)
  }
}));

const FilterSelect = ({
  label,
  placeholder,
  items,
  error,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <FormControl m={2} className={classes.root}>
      <InputLabel
        shrink
        id='demo-simple-select-placeholder-label-label-1'
        className={classes.label}
      >
        {label}
      </InputLabel>
      <Select
        labelId='demo-simple-select-placeholder-label-label-1'
        id='demo-simple-select-placeholder-label'
        displayEmpty
        {...rest}
      >
        {
          placeholder &&
          <MenuItem value='' disabled>
            {placeholder}
          </MenuItem>
        }

        {
          items.map((item, index) => (
            <MenuItem
              key={index}
              value={item.VALUE}
            >
              {item.LABEL}
            </MenuItem>
          ))
        }
      </Select>

      {
        error &&
        <FormHelperText>{error}</FormHelperText>
      }
    </FormControl>
  );
}

export default memo(FilterSelect);
