import { Position } from 'react-flow-renderer';
import dagre from 'dagre';
import { isNode } from 'react-flow-renderer';
import {
  nodeHeight,
  nodeWidth,
  nodeStyle,
  label,
  defaultNodeMarginX,
  defaultNodeMarginY,
  chartContainerHeight,
  edgeDefaultProps,
} from 'utils/constants/reactflow/chart-configs';
import { INPUT_NODE, CUSTOM_EDGE, IDENTIFIERS } from 'utils/constants/reactflow/custom-node-types';
import { LAYOUT_DIR } from 'utils/constants';
import ObjectID from 'bson-objectid';

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

const maxChartHeight = window.innerHeight - 617;
export const chartHeight = maxChartHeight > chartContainerHeight ? maxChartHeight : chartContainerHeight;

export const nodeToDeliverable = (nodeId, nodes, mainId) => {
  const node = nodes.find((n) => n.id === nodeId);
  const nodeIds = nodes.filter((el) => el.type === INPUT_NODE).map((nd) => nd.id);
  const edges = nodes
    .filter((c) => c.type === CUSTOM_EDGE)
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
    data: { label },
  } = node;
  const deliverable = {
    name: node.data.label,
    predecessors: edges.filter((c) => c.target === node.id).map((c) => c.source),
    chartData: {
      id,
      type,
      position,
      data: { label },
      edges: edges.filter((e) => e.target === node.id),
    },
  };

  if (mainId) {
    deliverable.mainId = mainId;
  }

  if (node.data._id) {
    deliverable._id = node.data._id;
  }

  return deliverable;
};

export const deliverablesToElements = (deliverables) =>
  deliverables.reduce((acc, deliverable) => {
    let {
      chartData: { id, type, data, position, edges },
      _id,
    } = deliverable;
    edges = edges
      ? edges.map((e) => ({
          ...e,
          ...edgeDefaultProps,
          data: {
            ...e.data,
            editable: true,
          },
        }))
      : [];
    const node = {
      id,
      type,
      position,
      data: { ...data, _id, editable: true },
      style: nodeStyle,
    };

    return [...acc, node, ...edges];
  }, []);

export const position = (nodeNum) => {
  const nNumY = chartHeight / (nodeHeight + defaultNodeMarginY);

  let x = (nodeNum + 1) / nNumY >= 1 ? Math.floor((nodeNum + 1) / nNumY) * (nodeWidth + defaultNodeMarginX) : 0;
  let y = nodeNum === 0 ? defaultNodeMarginY : (((nodeNum + 1) % nNumY) - 1) * (nodeHeight + defaultNodeMarginY) + defaultNodeMarginY;

  if ((nodeNum + 1) % nNumY === 0) {
    y = defaultNodeMarginY;
  }

  return { x, y };
};

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

export const getLayoutedElements = (elements, direction = LAYOUT_DIR.vertical) => {
  const isHorizontal = direction === LAYOUT_DIR.horizontal;
  dagreGraph.setGraph({ rankdir: direction });

  elements.forEach((el) => {
    if (isNode(el)) {
      dagreGraph.setNode(el.id, { width: nodeWidth, height: nodeHeight });
    } else {
      dagreGraph.setEdge(el.source, el.target);
    }
  });

  dagre.layout(dagreGraph);

  return elements.map((el) => {
    if (isNode(el)) {
      const nodeWithPosition = dagreGraph.node(el.id);
      el.targetPosition = isHorizontal ? IDENTIFIERS.TARGET_LEFT : IDENTIFIERS.TARGET_TOP;
      el.sourcePosition = isHorizontal ? IDENTIFIERS.SOURCE_RIGHT : IDENTIFIERS.SOURCE_BOTTOM;

      el.position = {
        x: nodeWithPosition.x - nodeWidth / 2 + Math.random() / 1000,
        y: nodeWithPosition.y - nodeHeight / 2,
      };
    } else {
      el.targetHandle = isHorizontal ? IDENTIFIERS.TARGET_LEFT : IDENTIFIERS.TARGET_TOP;
      el.sourceHandle = isHorizontal ? IDENTIFIERS.SOURCE_RIGHT : IDENTIFIERS.SOURCE_BOTTOM;
    }

    return el;
  });
};

export const makeNode = (nodeNum, mainId, eventHandlers) => {
  const currentTimestamp = new Date().getTime();
  const objectId = ObjectID(currentTimestamp).toHexString();
  const node = {
    id: objectId,
    type: INPUT_NODE,
    data: {
      label: mainId ? label : null,
      editable: true,
      ...eventHandlers,
    },
    style: nodeStyle,
    position: position(nodeNum),
  };

  return node;
};

export const validateElements = (nodes, eventHandlers) => {
  const nodeIds = nodes.filter((el) => el.type === INPUT_NODE).map((nd) => nd.id);
  const elements = nodes
    .map((node) => {
      if (node.type === INPUT_NODE) {
        node.data.handleDeleteNode = eventHandlers.handleDeleteNode;
        node.data.handleInputChange = eventHandlers.handleInputChange;
        node.data.handleSwitchPopup = eventHandlers.handleSwitchPopup;
      } else {
        node.data.handleRemoveEdge = eventHandlers.handleRemoveEdge(node);
      }

      return node;
    })
    .filter((el) => {
      if (el.type === INPUT_NODE) {
        return true;
      } else if (nodeIds.includes(el.source) && nodeIds.includes(el.target)) {
        return true;
      }
      return false;
    });

  return elements;
};
