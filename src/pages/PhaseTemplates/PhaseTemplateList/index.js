import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const PhaseTemplateList = () => {
  const classes = useStyles();

  return <main className={classes.root}>Phase Template List Page</main>;
};

export default memo(PhaseTemplateList);
