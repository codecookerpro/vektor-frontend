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
}));

export default useStyles;
