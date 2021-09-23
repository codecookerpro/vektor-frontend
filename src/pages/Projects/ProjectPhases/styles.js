import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  phaseHeader: {
    display: 'flex',
    alignItems: 'center',
  },
  phasesContainer: {
    maxWidth: 'calc(100vw - 331px)',
    overflowX: 'auto',
    flexWrap: 'nowrap',
    marginBottom: theme.spacing(4),
  },
  phaseContainer: {
    padding: '12px 12px 0 0',
    '&:last-child': {
      paddingRight: 0,
    },
  },
}));

export default useStyles;
