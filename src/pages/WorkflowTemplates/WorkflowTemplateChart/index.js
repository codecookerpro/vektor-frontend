import React, { memo, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardHeader, CardContent, CardActions, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Plus } from 'react-feather';
import ReactFlow, { removeElements, addEdge, MiniMap, Background, isNode } from 'react-flow-renderer';
import CustomFlowNode from './CustomFlowNode';
import CustomFlowEdge from './CustomFlowEdge';
import { INPUT_NODE, CUSTOM_EDGE, IDENTIFIERS } from 'utils/constants/reactflow/custom-node-types';
import {
  arrowHeadColor,
  chartContainerHeight,
  nodeHeight,
  nodeWidth,
  defaultNodeMarginY,
  defaultNodeMarginX,
  edgeDefaultProps,
  nodeStyle,
  label,
} from 'utils/constants/reactflow/chart-configs';
import ObjectID from 'bson-objectid';
import dagre from 'dagre';
import {
  createWorkflowTemplateDeliverable,
  updateWorkflowTemplateDeliverable,
  deleteWorkflowTemplateDeliverable,
} from 'services/api-workflow-template';
import { createWTD, updateWTD } from 'redux/actions/workflowTemplates';
import { LAYOUT_DIR } from 'utils/constants';

const maxChartHeight = window.innerHeight - 617;
const chartHeight = maxChartHeight > chartContainerHeight ? maxChartHeight : chartContainerHeight;

const useStyles = makeStyles(() => ({
  content: {
    height: chartHeight + 'px',
  },
  buttonContainer: {
    display: 'flex',
  },
}));

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (elements, direction = LAYOUT_DIR.vertical) => {
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

const WorkflowTemplateChart = ({ nodes = [], editable = true, setNodes = () => {}, workflowTemplateId = null }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [zoomOnScroll, setZoomOnScroll] = useState(true);
  const [isDraggable, setIsDraggable] = useState(true);
  const [paneMoveable, setPaneMoveable] = useState(true);
  const [hasOpenedPopup, setHasOpenedPopup] = useState(false);

  const position = (nodeNum) => {
    const nNumY = chartHeight / (nodeHeight + defaultNodeMarginY);

    let x = (nodeNum + 1) / nNumY >= 1 ? Math.floor((nodeNum + 1) / nNumY) * (nodeWidth + defaultNodeMarginX) : 0;
    let y = nodeNum === 0 ? defaultNodeMarginY : (((nodeNum + 1) % nNumY) - 1) * (nodeHeight + defaultNodeMarginY) + defaultNodeMarginY;

    if ((nodeNum + 1) % nNumY === 0) {
      y = defaultNodeMarginY;
    }

    return { x, y };
  };

  const nodeToDeliverable = (id, nodes) => {
    const node = nodes.find((n) => n.id === id);
    const edges = nodes.filter((c) => c.type === CUSTOM_EDGE);

    if (!node || !workflowTemplateId) {
      return null;
    }

    return {
      mainId: workflowTemplateId,
      _id: node.data._id,
      name: node.data.label,
      predecessors: edges.filter((c) => c.target === node.id).map((c) => c.source),
      chartData: {
        ...node,
        edges: edges.filter((e) => e.target === node.id),
      },
    };
  };

  const handleInputChange = (id, value) => {
    setNodes((nds) => {
      nds = nds.map((n) =>
        n.id === id
          ? {
              ...n,
              data: {
                ...n.data,
                label: value,
              },
            }
          : n
      );

      if (editable && workflowTemplateId) {
        updateWorkflowTemplateDeliverable(nodeToDeliverable(id, nds)).then(({ data }) => dispatch(updateWTD(data)));
      }

      return nds;
    });
  };

  const handleDeleteNode = (id) => {
    setNodes((nds) => {
      const nodeToRemove = nds.filter((nd) => nd.id === id);
      const removed = removeElements(nodeToRemove, nds);

      if (editable && workflowTemplateId) {
        deleteWorkflowTemplateDeliverable({
          mainId: workflowTemplateId,
          _id: nodeToRemove[0].data._id,
        }).then(({ data }) => dispatch(updateWTD(data)));

        nds
          .filter((n) => n.source === id)
          .forEach(({ target }) => {
            updateWorkflowTemplateDeliverable(nodeToDeliverable(target, removed)).then(({ data }) => dispatch(updateWTD(data)));
          });
      }

      return removed;
    });
  };

  const makeNode = async () => {
    const nodeNum = nodes.length;
    const currentTimestamp = new Date().getTime();
    const objectId = ObjectID(currentTimestamp).toHexString();
    const node = {
      id: objectId,
      type: INPUT_NODE,
      data: {
        label: workflowTemplateId ? label : null,
        editable: true,
        handleInputChange,
        handleDeleteNode,
        handleSwitchPopup: setHasOpenedPopup,
      },
      style: nodeStyle,
      position: position(nodeNum),
    };

    if (editable && workflowTemplateId) {
      const { data } = await createWorkflowTemplateDeliverable({
        mainId: workflowTemplateId,
        name: label,
        chartData: {
          ...node,
        },
      });

      dispatch(createWTD(data));

      const createdId = data.deliverables.find((d) => d.chartData.id === node.id)._id;
      node.data._id = createdId;
    }

    return node;
  };

  const onConnect = (conn) => {
    const { source, target } = conn;
    const connections = nodes.filter((el) => el.type === CUSTOM_EDGE);

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
      return;
    }

    const newEdge = {
      ...conn,
      ...edgeDefaultProps,
      data: {
        editable: true,
        removeEdge() {
          setNodes((nds) => nds.filter((nd) => nd.target !== conn.target || nd.source !== conn.source));
        },
      },
    };

    const updatedNodes = addEdge(newEdge, nodes);

    if (editable && workflowTemplateId) {
      updateWorkflowTemplateDeliverable(nodeToDeliverable(target, updatedNodes)).then(({ data }) => dispatch(updateWTD(data)));
    }

    setNodes(updatedNodes);
  };

  const onLayout = (direction) => {
    const layoutedElements = getLayoutedElements(nodes, direction);
    setNodes(layoutedElements);
  };

  const onNodeDragStop = (e, node) => {
    e.preventDefault();

    if (editable && workflowTemplateId) {
      updateWorkflowTemplateDeliverable(
        nodeToDeliverable(
          node.id,
          nodes.map((n) => (n.id === node.id ? { ...n, position: node.position } : n))
        )
      ).then(({ data }) => dispatch(updateWTD(data)));
    }
  };

  useEffect(() => {
    setIsDraggable(!hasOpenedPopup);
    setPaneMoveable(!hasOpenedPopup);
    setZoomOnScroll(!hasOpenedPopup);
  }, [hasOpenedPopup]);

  useEffect(() => {
    nodes = nodes.map((node) => {
      if (node.type === INPUT_NODE) {
        node.data.handleDeleteNode = handleDeleteNode;
        node.data.handleInputChange = handleInputChange;
        node.data.handleSwitchPopup = setHasOpenedPopup;
      } else {
        node.data.removeEdge = () => {
          setNodes((nds) => {
            const { source, target } = node;
            nds = nds.filter((nd) => nd.target !== target || nd.source !== source);

            if (editable && workflowTemplateId) {
              updateWorkflowTemplateDeliverable(nodeToDeliverable(target, nds)).then(({ data }) => dispatch(updateWTD(data)));
            }

            return nds;
          });
        };
      }

      return node;
    });
  }, [nodes]);

  return (
    <Card className={classes.root}>
      <CardHeader title="Workflow Template Chart" />
      <CardContent className={classes.content}>
        <ReactFlow
          elements={nodes}
          elementsSelectable={false}
          onConnect={onConnect}
          onNodeDragStop={onNodeDragStop}
          deleteKeyCode={46}
          nodeTypes={{ [INPUT_NODE]: CustomFlowNode }}
          edgeTypes={{ [CUSTOM_EDGE]: CustomFlowEdge }}
          arrowHeadColor={arrowHeadColor}
          zoomOnScroll={zoomOnScroll}
          nodesDraggable={isDraggable && editable}
          paneMoveable={paneMoveable}
          zoomOnDoubleClick={false}
        >
          <MiniMap />
          <Background gap={12} size={0.5} />
          <Background gap={16} />
        </ReactFlow>
      </CardContent>
      <CardActions>
        <Grid container justify={editable ? 'space-between' : 'flex-end'}>
          {editable ? (
            <Grid item xs={12} md={4}>
              <Button variant="contained" color="default" onClick={async () => setNodes([...nodes, await makeNode()])}>
                <Plus /> Add Deliverable
              </Button>
            </Grid>
          ) : null}
          <Grid item xs={12} md={4}>
            <Grid container justify="flex-end">
              <Grid item>
                <Button size="small" color="primary" onClick={() => onLayout(LAYOUT_DIR.vertical)}>
                  Vertical Layout
                </Button>
              </Grid>
              <Grid item>
                <Button size="small" color="primary" onClick={() => onLayout(LAYOUT_DIR.horizontal)}>
                  Horizontal Layout
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default memo(WorkflowTemplateChart);
