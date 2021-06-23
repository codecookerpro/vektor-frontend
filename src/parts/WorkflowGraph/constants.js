import { keyMirror } from 'utils/helpers/utility';

export const ELEMENT_TYPES = keyMirror({
  node: 'input_node',
  edge: 'CUSTOM_EDGE',
});

export const GRAPH_PROPS = keyMirror({
  arrowHeadColor: '#4d84c0',
  height: window.innerHeight > 1067 ? window.innerHeight - 617 : 350,
  zIndex: 1250,
});

export const NODE_PROPS = keyMirror({
  width: 149,
  height: 70,
  label: 'Deliverable',
  style: {
    border: '1.5px solid #4d84c0',
    borderRadius: '10px',
    padding: '21px 0',
    background: '#fff',
    width: '149px',
    height: '70px',
  },
  marginX: 15,
  marginY: 15,
});

export const EDGE_PROPS = keyMirror({
  type: ELEMENT_TYPES.edge,
  arrowHeadType: 'arrowclosed',
  style: {
    strokeWidth: 1,
    pointerEvents: 'all',
    stroke: GRAPH_PROPS.arrowHeadColor,
  },
});

export const LAYOUT_DIRS = keyMirror({
  vertical: 'TB',
  horizontal: 'LR',
});

export const IDENTIFIERS = keyMirror({
  targetLeft: 'target-left',
  targetTop: 'target-top',
  targetRight: 'target-right',
  targetBottom: 'target-bottom',

  sourceLeft: 'source-left',
  sourceTop: 'source-top',
  sourceRight: 'source-right',
  sourceBottom: 'source-bottom',
});

export const HANDLE_TYPES = keyMirror({
  target: null,
  source: null,
});

export const NODE_DIALOGS = keyMirror({
  edit: {
    type: 'edit',
    title: 'Edit',
    ignoreButton: 'Ignore',
    proceedButton: 'Approve',
  },
  delete: {
    type: 'delete',
    title: 'Delete',
    content: 'Are you sure you want to delete it? This action cannot be undone.',
    ignoreButton: 'No, Go back.',
    proceedButton: 'Yes, proceed.',
  },
});

export const GRAPH_EVENTS = keyMirror({
  graphInit: null,
  graphLayout: null,
  nodeCreate: null,
  nodeLabelChange: null,
  nodeDelete: null,
  edgeCreate: null,
  edgeDelete: null,
  nodePosChange: null,
});
