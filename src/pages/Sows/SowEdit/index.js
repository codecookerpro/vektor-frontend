import { memo } from 'react';
import { useStyles } from './styles';

const SowEdit = () => {
  const classes = useStyles();
  return <main className={classes.root}>Sow Edit Page</main>;
};

export default memo(SowEdit);
