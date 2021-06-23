import { Position } from 'react-flow-renderer';
import dagre from 'dagre';
import { isNode } from 'react-flow-renderer';
import { GRAPH_PROPS, NODE_PROPS, EDGE_PROPS, LAYOUT_DIRS, ELEMENT_TYPES, IDENTIFIERS } from './constants';
import ObjectID from 'bson-objectid';
import { isEmpty } from 'utils/helpers/utility';

const bottomLeftCorner = (x, y, size) => `L ${x},${y - size}Q ${x},${y} ${x + size},${y}`;
const leftBottomCorner = (x, y, size) => `L ${x + size},${y}Q ${x},${y} ${x},${y - size}`;
const bottomRightCorner = (x, y, size) => `L ${x},${y - size}Q ${x},${y} ${x - size},${y}`;
const rightBottomCorner = (x, y, size) => `L ${x - size},${y}Q ${x},${y} ${x},${y - size}`;
const leftTopCorner = (x, y, size) => `L ${x + size},${y}Q ${x},${y} ${x},${y + size}`;
const topLeftCorner = (x, y, size) => `L ${x},${y + size}Q ${x},${y} ${x + size},${y}`;
const topRightCorner = (x, y, size) => `L ${x},${y + size}Q ${x},${y} ${x - size},${y}`;
const rightTopCorner = (x, y, size) => `L ${x - size},${y}Q ${x},${y} ${x},${y + size}`;

const LeftOrRight = [Position.Left, Position.Right];

export const getCenter = ({ sourceX, sourceY, targetX, targetY, sourcePosition = Position.Bottom, targetPosition = Position.Top }) => {
  const sourceIsLeftOrRight = LeftOrRight.includes(sourcePosition);
  const targetIsLeftOrRight = LeftOrRight.includes(targetPosition);

  // we expect flows to be horizontal or vertical (all handles left or right respectively top or bottom)
  // a mixed edge is when one the source is on the left and the target is on the top for example.
  const mixedEdge = (sourceIsLeftOrRight && !targetIsLeftOrRight) || (targetIsLeftOrRight && !sourceIsLeftOrRight);

  if (mixedEdge) {
    const xOffset = sourceIsLeftOrRight ? Math.abs(targetX - sourceX) : 0;
    const centerX = sourceX > targetX ? sourceX - xOffset : sourceX + xOffset;

    const yOffset = sourceIsLeftOrRight ? 0 : Math.abs(targetY - sourceY);
    const centerY = sourceY < targetY ? sourceY + yOffset : sourceY - yOffset;

    return [centerX, centerY, xOffset, yOffset];
  }

  const xOffset = Math.abs(targetX - sourceX) / 2;
  const centerX = targetX < sourceX ? targetX + xOffset : targetX - xOffset;

  const yOffset = Math.abs(targetY - sourceY) / 2;
  const centerY = targetY < sourceY ? targetY + yOffset : targetY - yOffset;

  return [centerX, centerY, xOffset, yOffset];
};

export function getSmoothStepPathPatched({
  sourceX,
  sourceY,
  sourcePosition = Position.Bottom,
  targetX,
  targetY,
  targetPosition = Position.Top,
  borderRadius = 5,
  centerX,
  centerY,
}) {
  const [_centerX, _centerY, offsetX, offsetY] = getCenter({ sourceX, sourceY, targetX, targetY });
  const cornerWidth = Math.min(borderRadius, Math.abs(targetX - sourceX));
  const cornerHeight = Math.min(borderRadius, Math.abs(targetY - sourceY));
  const cornerSize = Math.min(cornerWidth, cornerHeight, offsetX, offsetY);
  const leftAndRight = [Position.Left, Position.Right];
  const cX = typeof centerX !== 'undefined' ? centerX : _centerX;
  const cY = typeof centerY !== 'undefined' ? centerY : _centerY;

  let firstCornerPath = null;
  let secondCornerPath = null;

  if (sourceX <= targetX) {
    firstCornerPath = sourceY <= targetY ? bottomLeftCorner(sourceX, cY, cornerSize) : topLeftCorner(sourceX, cY, cornerSize);
    secondCornerPath = sourceY <= targetY ? rightTopCorner(targetX, cY, cornerSize) : rightBottomCorner(targetX, cY, cornerSize);
  } else {
    firstCornerPath = sourceY < targetY ? bottomRightCorner(sourceX, cY, cornerSize) : topRightCorner(sourceX, cY, cornerSize);
    secondCornerPath = sourceY < targetY ? leftTopCorner(targetX, cY, cornerSize) : leftBottomCorner(targetX, cY, cornerSize);
  }

  if (leftAndRight.includes(sourcePosition) && leftAndRight.includes(targetPosition)) {
    if (sourceX <= targetX) {
      firstCornerPath = sourceY <= targetY ? rightTopCorner(cX, sourceY, cornerSize) : rightBottomCorner(cX, sourceY, cornerSize);
      secondCornerPath = sourceY <= targetY ? bottomLeftCorner(cX, targetY, cornerSize) : topLeftCorner(cX, targetY, cornerSize);
    } else {
      firstCornerPath = sourceY <= targetY ? leftTopCorner(cX, sourceY, cornerSize) : leftBottomCorner(cX, sourceY, cornerSize);
      secondCornerPath = sourceY <= targetY ? bottomRightCorner(cX, targetY, cornerSize) : topRightCorner(cX, targetY, cornerSize);
    }
  } else if (leftAndRight.includes(sourcePosition) && !leftAndRight.includes(targetPosition)) {
    if (sourceX <= targetX) {
      firstCornerPath = sourceY <= targetY ? rightTopCorner(targetX, sourceY, cornerSize) : rightBottomCorner(targetX, sourceY, cornerSize);
    } else {
      firstCornerPath = sourceY <= targetY ? leftTopCorner(targetX, sourceY, cornerSize) : leftBottomCorner(targetX, sourceY, cornerSize);
    }
    secondCornerPath = '';
  } else if (!leftAndRight.includes(sourcePosition) && leftAndRight.includes(targetPosition)) {
    if (sourceX <= targetX) {
      firstCornerPath = sourceY <= targetY ? bottomLeftCorner(sourceX, targetY, cornerSize) : topLeftCorner(sourceX, targetY, cornerSize);
    } else {
      firstCornerPath = sourceY <= targetY ? bottomRightCorner(sourceX, targetY, cornerSize) : topRightCorner(sourceX, targetY, cornerSize);
    }
    secondCornerPath = '';
  }

  return `M ${sourceX},${sourceY}${firstCornerPath}${secondCornerPath}L ${targetX},${targetY}`;
}

export const nodeToDeliverable = (nodeId, nodes, mainId) => {
  const node = nodes.find((n) => n.id === nodeId);
  const nodeIds = nodes.filter((el) => el.type === ELEMENT_TYPES.node).map((nd) => nd.id);
  const edges = nodes
    .filter((c) => c.type === ELEMENT_TYPES.edge)
    .filter(({ source, target }) => nodeIds.includes(source) && nodeIds.includes(target))
    .map((c) => ({
      id: c.id,
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

export const deliverablesToElements = (deliverables, editable = true) => {
  if (isEmpty(deliverables)) {
    return [];
  }

  return deliverables.reduce((acc, deliverable) => {
    let { chartData: { type, position, edges } = {}, _id, name, start, end, completion, status, plannedHours, workedHours } = deliverable;
    edges = edges
      ? edges.map((e) => ({
          ...e,
          ...EDGE_PROPS,
          data: {
            ...e.data,
            editable,
          },
        }))
      : [];
    const node = {
      id: _id,
      type,
      position,
      data: { label: name, start, end, completion, status, plannedHours, workedHours, editable },
      style: NODE_PROPS.style,
    };

    return [...acc, node, ...edges];
  }, []);
};

export const position = (num) => {
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
    position: position(nodeNum),
  };

  return node;
};

export const makeEdge = (conn, elements, eventHandlers, editable) => {
  const { source, target } = conn;
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
    return null;
  }

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
