import { makeStyles } from '@material-ui/core/styles';
import { GRAPH_PROPS, NODE_PROPS } from 'parts/WorkflowGraph/constants';

export const useStyles = makeStyles((theme) => ({
  nodeContent: {
    padding: '0px 6px 0px 6px',
  },
  name: {
    width: '100%',
    paddingTop: '23px',
    overflowX: 'hidden',
    overflowY: 'auto',
    textOverflow: 'ellipsis',
    height: '65px',
    textAlign: 'center',
  },
  nodePopupContainer: {
    zIndex: GRAPH_PROPS.zIndex + 1,
  },
  nodePopup: {
    marginTop: '50px',
    minHeight: '100px',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 30px',
    boxShadow: '0.3em 0.3em 1em rgb(0 0 0 / 30%)',
  },
  nodePopupButton: {
    width: '100%',
    marginBottom: '12px',
  },
  nodePopupCloseIcon: {
    position: 'relative',
    left: '100%',
    cursor: 'pointer',
  },
  chip: {
    background: (props) => props.diffColor,
    height: 'unset',
    borderRadius: 20,
    color: theme.custom.palette.white,
  },
  chipContainer: {
    top: NODE_PROPS.height - 25,
    left: 0,
    display: 'flex',
    position: 'absolute',
    justifyContent: 'center',
    width: '100%',
  },
  statusContainer: {
    top: NODE_PROPS.height - 37,
    left: 0,
    display: 'flex',
    position: 'absolute',
    justifyContent: 'space-between',
    width: '100%',
    padding: '0px 5px',
    fontSize: '12px',
  },
  labelContainer: {
    top: 3,
    left: 0,
    display: 'flex',
    position: 'absolute',
    justifyContent: 'center',
    width: '100%',
    height: NODE_PROPS.height - 40,
    padding: '0px 10px',
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  checkOverflow: {
    position: 'absolute',
    left: '-5000px',
    top: '-5000px',
    width: NODE_PROPS.width - 23,
  },
}));
