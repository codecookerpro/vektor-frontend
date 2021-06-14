import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    marginBottom: theme.spacing(3),
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));
