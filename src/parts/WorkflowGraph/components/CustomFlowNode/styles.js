import { makeStyles } from '@material-ui/core/styles';
import { GRAPH_PROPS } from 'parts/WorkflowGraph/constants';

export const useStyles = makeStyles((theme) => ({
  nodeContent: {
    padding: '0px 6px 0px 6px',
  },
  name: {
    width: '100%',
    margin: '0',
    overflowX: 'hidden',
    overflowY: 'auto',
    textOverflow: 'ellipsis',
    maxHeight: '100%',
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
    top: 45,
    left: 0,
    display: 'flex',
    position: 'absolute',
    justifyContent: 'center',
    width: '100%',
  },
}));
