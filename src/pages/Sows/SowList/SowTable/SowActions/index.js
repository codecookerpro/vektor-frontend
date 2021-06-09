import React, { memo } from 'react';
import { Button, CardContent } from '@material-ui/core';

import FilterSelect from 'components/UI/Selects/FilterSelect';
import SYSTEM_ACTIONS from 'utils/constants/table-actions/system';
import { useStyles } from './styles';

const SowActions = ({ action, setAction, onAction }) => {
  const classes = useStyles();

  return (
    <>
      <CardContent className={classes.content}>
        <FilterSelect
          label="Action:"
          placeholder="Select Action"
          items={SYSTEM_ACTIONS}
          value={action}
          onChange={(e) => setAction(e.target.value)}
          className={classes.input}
        />
        <Button color="primary" variant="contained" onClick={onAction}>
          Go
        </Button>
      </CardContent>
    </>
  );
};

export default memo(SowActions);
