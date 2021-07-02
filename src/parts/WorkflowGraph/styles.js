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
  reactflow: {
    '& .react-flow__handle-top': {
      top: '-6px',
    },
    '& .react-flow__handle-left': {
      left: '-6px',
    },
    '& .react-flow__handle-bottom': {
      bottom: '-5px',
    },
    '& .react-flow__handle-right': {
      right: '-5px',
    },
    '& .react-flow__handle-connecting': {
      background: '#ff6060 !important',
    },
    '& .react-flow__handle-valid': {
      background: '#55dd99 !important',
    },
    '& .react-flow__handle': {
      position: 'absolute',
      border: '1px solid #fff',
      background: '#6283B6',
      height: '9px',
      width: '9px',
      borderRadius: '50%',
    },
    '& .react-flow__node-input_node': {
      border: '1.5px solid #4d84c0',
      borderRadius: '10px',
      background: '#fff',
      width: '149px',
      height: '70px',
    },
  },
}));

export default useStyles;
