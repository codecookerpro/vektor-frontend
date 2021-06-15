import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(7.5),
  },
  name: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: theme.spacing(8),
  },
  delete: {
    color: theme.custom.palette.red,
    padding: theme.spacing(0),
  },
  fileRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileName: {
    paddingLeft: theme.spacing(2),
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '100%',
  },
}));
