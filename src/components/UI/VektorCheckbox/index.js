import React, { memo } from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';

const VektorCheckbox = ({ label, className, ...rest }) => {
  return <FormControlLabel className={className} control={<Checkbox {...rest} />} label={label} />;
};

export default memo(VektorCheckbox);
