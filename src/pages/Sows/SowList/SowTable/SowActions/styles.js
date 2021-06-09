import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(7.5),
  },
  content: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  input: {
    marginRight: theme.spacing(4),
  },
}));
