import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  container: {
    borderRadius: theme.spacing(1),
    opacity: ({ isDragging }) => (isDragging ? 0.4 : 1),
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px !important`,
  },
  header: {
    padding: '8px 8px 0px 8px',
  },
  noteFlag: {
    margin: -12,
  },
}));

export default useStyles;
