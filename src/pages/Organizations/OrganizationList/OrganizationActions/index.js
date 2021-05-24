import React, { memo } from 'react';
import { Button, Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import FilterSelect from 'components/UI/Selects/FilterSelect';
import SYSTEM_ACTIONS from 'utils/constants/table-actions/system';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(7.5),
  },
  content: {
    display: 'flex',
    alignItems: 'flex-end',
    padding: `${theme.spacing(6, 8)} !important`,
  },
  input: {
    marginRight: theme.spacing(4),
  },
}));

const OrganizationActions = ({ action, setAction, onAction }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
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
    </Card>
  );
};

export default memo(OrganizationActions);
