import { memo } from 'react';
import { useStyles } from './styles';

const SowAdd = () => {
  const classes = useStyles();
  return <main className={classes.root}>Sow Add Page</main>;
};

export default memo(SowAdd);
