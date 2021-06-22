import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(7.5),
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${theme.spacing(6, 8)} !important`,
  },
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    margin: theme.spacing(4),
  },
}));

export default useStyles;
