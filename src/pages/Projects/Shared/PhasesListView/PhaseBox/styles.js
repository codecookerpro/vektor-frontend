import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  container: {
    height: '100%',
  },
  card: {
    minWidth: 265,
    height: '100%',
    boxShadow: 'none',
  },
  content: {
    minHeight: 300,
  },
  cardHeader: {
    cursor: 'pointer',
    transition: '0.5s',
    '&:hover': {
      background: 'gray',
    },
  },
}));

export default useStyles;
