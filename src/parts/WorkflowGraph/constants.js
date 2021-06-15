export const ELEMENT_TYPES = Object.freeze({
  node: 'input_node',
  edge: 'CUSTOM_EDGE',
});

export const GRAPH_PROPS = Object.freeze({
  arrowHeadColor: '#4d84c0',
  height: window.innerHeight > 1067 ? window.innerHeight - 617 : 350,
});

export const NODE_PROPS = Object.freeze({
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

export const EDGE_PROPS = Object.freeze({
  type: ELEMENT_TYPES.edge,
  arrowHeadType: 'arrowclosed',
  style: {
    strokeWidth: 1,
    pointerEvents: 'all',
    stroke: GRAPH_PROPS.arrowHeadColor,
  },
});

export const LAYOUT_DIRS = Object.freeze({
  vertical: 'TB',
  horizontal: 'LR',
});

export const HANDLE_COLORS = Object.freeze({
  target: '#6283B6',
  source: '#99BD6B',
});

export const IDENTIFIERS = Object.freeze({
  TARGET_LEFT: 'target-left',
  TARGET_TOP: 'target-top',
  TARGET_RIGHT: 'target-right',
  TARGET_BOTTOM: 'target-bottom',

  SOURCE_LEFT: 'source-left',
  SOURCE_TOP: 'source-top',
  SOURCE_RIGHT: 'source-right',
  SOURCE_BOTTOM: 'source-bottom',
});

export const HANDLE_TYPES = Object.freeze({
  TARGET: 'target',
  SOURCE: 'source',
});

export const NODE_DIALOGS = Object.freeze({
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
