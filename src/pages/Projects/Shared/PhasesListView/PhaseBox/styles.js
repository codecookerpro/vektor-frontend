import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  content: {
    minHeight: 280,
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
