import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
  },
  card: {
    minWidth: 265,
    height: '100%',
    boxShadow: 'none',
    backgroundColor: (props) => props.color,
    color: (props) => props.color && theme.palette.getContrastText(props.color),
  },
  content: {
    minHeight: 400,
    display: 'flex',
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
