import dagre from 'dagre';
import { isNode } from 'react-flow-renderer';
import { GRAPH_PROPS, NODE_PROPS, EDGE_PROPS, LAYOUT_DIRS, ELEMENT_TYPES, IDENTIFIERS } from './constants';
import ObjectID from 'bson-objectid';
import { isEmpty } from 'utils/helpers/utility';

export const nodeToDeliverable = (nodeId, nodes, mainId) => {
  const node = nodes.find((n) => n.id === nodeId);
  const nodeIds = nodes.filter((el) => el.type === ELEMENT_TYPES.node).map((nd) => nd.id);
  const edges = nodes
    .filter((c) => c.type === ELEMENT_TYPES.edge)
    .filter(({ source, target }) => nodeIds.includes(source) && nodeIds.includes(target))
    .map((c) => ({
      source: c.source,
      sourceHandle: c.sourceHandle,
      target: c.target,
      targetHandle: c.targetHandle,
    }));

  if (!node) {
    return null;
  }

  const {
    id,
    type,
    position,
    data: { label, start, end, completion, status, plannedHours, workedHours },
  } = node;
  const deliverable = {
    _id: id,
    mainId,
    name: label,
    start,
    end,
    completion,
    status,
    plannedHours,
    workedHours,
    predecessors: edges.filter((c) => c.target === node.id).map((c) => c.source),
    chartData: {
      type,
      position,
      edges: edges.filter((e) => e.target === node.id),
    },
  };

  return deliverable;
};

export const elementsToDeliverables = (elements, templateId) =>
  elements.filter((el) => el.type === ELEMENT_TYPES.node).map((node) => nodeToDeliverable(node.id, elements, templateId));

export const makeEdgeId = (srcId, srcHandle, tarId, tarHandle) => `reactflow__edge-${srcId}${srcHandle}-${tarId}${tarHandle}`;

export const deliverablesToElements = (deliverables, editable = true) => {
  if (isEmpty(deliverables)) {
    return [];
  }

  let shouldMigrate = false;
  let elements = deliverables.reduce((acc, deliverable, idx) => {
    let {
      chartData: { position, edges } = {},
      _id,
      name,
      start,
      end,
      completion,
      status,
      plannedHours,
      workedHours,
      predecessors,
      calculated,
    } = deliverable;
    shouldMigrate = shouldMigrate || !position || !edges;

    if (shouldMigrate) {
      const sourceHandle = IDENTIFIERS.sourceBottom;
      const targetHandle = IDENTIFIERS.targetTop;
      edges = predecessors.map((source) => ({
        id: makeEdgeId(source, sourceHandle, _id, targetHandle),
        source,
        sourceHandle,
        target: _id,
        targetHandle,
        ...EDGE_PROPS,
        data: { editable },
      }));
    } else {
      edges = edges.map((e) => ({
        ...e,
        id: makeEdgeId(e.source, e.sourceHandle, e.target, e.targetHandle),
        ...EDGE_PROPS,
        data: {
          ...e.data,
          editable,
          sourceNodeData: deliverables.find((d) => d._id === e.source),
          calculated,
        },
      }));
    }

    const node = {
      id: _id,
      type: ELEMENT_TYPES.node,
      position: position || makeNodePos(idx),
      data: { label: name, start, end, completion, status, plannedHours, workedHours, editable, calculated },
      style: NODE_PROPS.style,
    };

    return [...acc, node, ...edges];
  }, []);

  if (shouldMigrate) {
    elements = getLayoutedElements(elements, LAYOUT_DIRS.horizontal);
  }

  return elements;
};

export const makeNodePos = (num) => {
  const nNumY = GRAPH_PROPS.height / (NODE_PROPS.height + NODE_PROPS.marginY);

  let x = (num + 1) / nNumY >= 1 ? Math.floor((num + 1) / nNumY) * (NODE_PROPS.width + NODE_PROPS.marginX) : 0;
  let y = num === 0 ? NODE_PROPS.marginY : (((num + 1) % nNumY) - 1) * (NODE_PROPS.height + NODE_PROPS.marginY) + NODE_PROPS.marginY;

  if ((num + 1) % nNumY === 0) {
    y = NODE_PROPS.marginY;
  }

  return { x, y };
};

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

export const getLayoutedElements = (elements, direction = LAYOUT_DIRS.vertical) => {
  const isHorizontal = direction === LAYOUT_DIRS.horizontal;
  dagreGraph.setGraph({ rankdir: direction });

  elements.forEach((el) => {
    if (isNode(el)) {
      dagreGraph.setNode(el.id, { width: NODE_PROPS.width, height: NODE_PROPS.height });
    } else {
      dagreGraph.setEdge(el.source, el.target);
    }
  });

  dagre.layout(dagreGraph);

  return elements.map((el) => {
    if (isNode(el)) {
      const nodeWithPosition = dagreGraph.node(el.id);
      el.targetPosition = isHorizontal ? IDENTIFIERS.targetLeft : IDENTIFIERS.targetTop;
      el.sourcePosition = isHorizontal ? IDENTIFIERS.sourceRight : IDENTIFIERS.sourceBottom;

      el.position = {
        x: nodeWithPosition.x - NODE_PROPS.width / 2 + Math.random() / 1000,
        y: nodeWithPosition.y - NODE_PROPS.height / 2,
      };
    } else {
      el.targetHandle = isHorizontal ? IDENTIFIERS.targetLeft : IDENTIFIERS.targetTop;
      el.sourceHandle = isHorizontal ? IDENTIFIERS.sourceRight : IDENTIFIERS.sourceBottom;
    }

    return el;
  });
};

export const makeNode = (nodeNum, eventHandlers, editable) => {
  const currentTimestamp = new Date().getTime();
  const objectId = ObjectID(currentTimestamp).toHexString();
  const node = {
    id: objectId,
    type: ELEMENT_TYPES.node,
    data: {
      label: NODE_PROPS.label,
      editable,
      ...eventHandlers,
    },
    style: NODE_PROPS.style,
    position: makeNodePos(nodeNum),
  };

  return node;
};

export const checkConnectionValid = (elements, conn) => {
  const { source, target } = conn;

  if (source === target) {
    return false;
  }

  const connections = elements.filter((el) => el.type === ELEMENT_TYPES.edge);

  const checkCycle = (src, tar) => {
    const children = connections.filter((cn) => cn.source === tar).map((cn) => cn.target);

    if (children.includes(src)) {
      return true;
    } else if (children.reduce((acc, ch) => acc || checkCycle(src, ch), false)) {
      return true;
    }

    return false;
  };

  const doubled = connections.filter((cn) => cn.source === source && cn.target === target).length;

  if (checkCycle(source, target) || doubled) {
    return false;
  }

  return true;
};

export const makeEdge = (conn, eventHandlers, editable) => {
  const newEdge = {
    ...conn,
    ...EDGE_PROPS,
    data: {
      handleRemoveEdge: eventHandlers.handleRemoveEdge(conn),
      editable,
    },
  };

  return newEdge;
};

export const validateElements = (nodes, eventHandlers) => {
  const nodeIds = nodes.filter((el) => el.type === ELEMENT_TYPES.node).map((nd) => nd.id);
  const elements = nodes
    .map((node) => {
      if (node.type === ELEMENT_TYPES.node) {
        node.data.handleDeleteNode = eventHandlers.handleDeleteNode;
        node.data.handleInputChange = eventHandlers.handleInputChange;
        node.data.handleSwitchPopup = eventHandlers.handleSwitchPopup;
        node.data.isValidConnection = eventHandlers.isValidConnection;
      } else {
        node.data.handleRemoveEdge = eventHandlers.handleRemoveEdge(node);
      }

      return node;
    })
    .filter((el) => {
      if (el.type === ELEMENT_TYPES.node) {
        return true;
      } else if (nodeIds.includes(el.source) && nodeIds.includes(el.target)) {
        return true;
      }
      return false;
    });

  return elements;
};
