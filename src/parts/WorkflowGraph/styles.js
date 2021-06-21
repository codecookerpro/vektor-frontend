import { makeStyles } from '@material-ui/core/styles';
import { GRAPH_PROPS } from './constants';

const useStyles = makeStyles((theme) => ({
  graphContent: {
    height: GRAPH_PROPS.height + 'px',
  },
  graphContainer: {},
  buttonContainer: {
    marginTop: theme.spacing(1),
  },
  tClass: {
    visibility: ({ connectInProgress }) => (connectInProgress ? 'visible' : 'hidden'),
  },
  sClass: {
    visibility: ({ connectInProgress }) => (connectInProgress ? 'hidden' : 'visible'),
  },
}));

export default useStyles;
