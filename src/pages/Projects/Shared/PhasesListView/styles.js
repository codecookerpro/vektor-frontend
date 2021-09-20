import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(() => ({
  container: {
    position: 'relative',
    overflowX: 'auto',
    flexWrap: 'nowrap',
    maxWidth: 'calc(100vw - 331px)',
    padding: 12,
    margin: -12,
  },
  phaseContainer: {
    paddingTop: 12,
    paddingRight: 12,
    '&:last-child': {
      paddingRight: 0,
    },
  },
}));

export default useStyles;
