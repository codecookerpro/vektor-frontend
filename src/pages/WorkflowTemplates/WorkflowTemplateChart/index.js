import React, { memo, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardHeader, CardContent, CardActions, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Plus } from 'react-feather';
import ReactFlow, { removeElements, addEdge, MiniMap, Background, isNode } from 'react-flow-renderer';
import CustomFlowNode from './CustomFlowNode';
import CustomFlowEdge from './CustomFlowEdge';
import { INPUT_NODE, CUSTOM_EDGE } from 'utils/constants/reactflow/custom-node-types';
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
import { createWTD, updateWTD, removeWTD } from 'redux/actions/workflowTemplates';

const useStyles = makeStyles(() => ({
  content: {
    height: chartContainerHeight + 'px',
  },
  buttonContainer: {
    display: 'flex',
  },
}));

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (elements, direction = 'TB') => {
  const isHorizontal = direction === 'LR';
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
      el.targetPosition = isHorizontal ? 'left' : 'top';
      el.sourcePosition = isHorizontal ? 'right' : 'bottom';

      el.position = {
        x: nodeWithPosition.x - nodeWidth / 2 + Math.random() / 1000,
        y: nodeWithPosition.y - nodeHeight / 2,
      };
    } else {
      el.targetHandle = isHorizontal ? 'left' : 'top';
      el.sourceHandle = isHorizontal ? 'right' : 'bottom';
    }

    return el;
  });
};

const WorkflowTemplateChart = ({ nodes = [], editable = false, setNodes = () => {}, workflowTemplateId = null }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [zoomOnScroll, setZoomOnScroll] = useState(true);
  const [isDraggable, setIsDraggable] = useState(true);
  const [paneMoveable, setPaneMoveable] = useState(true);
  const [hasOpenedPopup, setHasOpenedPopup] = useState(false);

  const position = (nodeNum) => {
    const nNumY = chartContainerHeight / (nodeHeight + defaultNodeMarginY);

    let x = (nodeNum + 1) / nNumY >= 1 ? Math.floor((nodeNum + 1) / nNumY) * (nodeWidth + defaultNodeMarginX) : 0;
    let y = nodeNum === 0 ? defaultNodeMarginY : (((nodeNum + 1) % nNumY) - 1) * (nodeHeight + defaultNodeMarginY) + defaultNodeMarginY;

    if ((nodeNum + 1) % nNumY === 0) {
      y = defaultNodeMarginY;
    }

    return { x, y };
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
        const edges = nds.filter((c) => c.type === CUSTOM_EDGE);
        const node = nds.find((n) => n.id === id);

        updateWorkflowTemplateDeliverable({
          mainId: workflowTemplateId,
          _id: node.data._id,
          name: node.data.label,
          predecessors: edges.filter((c) => c.target === node.id).map((c) => c.source),
          chartData: {
            ...node,
            edges: edges.filter((e) => e.target === node.id),
          },
        }).then(({ data }) => dispatch(updateWTD(data)));
      }

      return nds;
    });
  };

  const handleDeleteNode = (id) => {
    if (editable && workflowTemplateId) {
      deleteWorkflowTemplateDeliverable({
        mainId: workflowTemplateId,
        _id: nodes.find((n) => n.id === id).data._id,
      }).then(({ data }) => dispatch(removeWTD(data)));
    }

    setNodes((nds) => {
      const nodeToRemove = nds.filter((nd) => nd.id === id);
      return removeElements(nodeToRemove, nds);
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
        label,
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
    const updatedConns = updatedNodes.filter((el) => el.type === CUSTOM_EDGE);

    if (editable && workflowTemplateId) {
      const edges = updatedConns.filter((c) => c.target === target);
      const node = updatedNodes.find((n) => n.id === target);
      const predecessors = updatedConns.filter((c) => c.target === node.id).map((c) => c.source);

      updateWorkflowTemplateDeliverable({
        mainId: workflowTemplateId,
        _id: node.data._id,
        name: node.data.label,
        predecessors,
        chartData: { ...node, edges },
      }).then(({ data }) => dispatch(updateWTD(data)));
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
      const edges = nodes.filter((c) => c.type === CUSTOM_EDGE);

      updateWorkflowTemplateDeliverable({
        mainId: workflowTemplateId,
        _id: node.data._id,
        name: node.data.label,
        predecessors: edges.filter((c) => c.target === node.id).map((c) => c.source),
        chartData: {
          ...nodes.find((n) => n.id === node.id),
          position: node.position,
          edges: edges.filter((e) => e.target === node.id),
        },
      }).then(({ data }) => dispatch(updateWTD(data)));
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
              const tarNode = nds.find((n) => n.id === target);
              const conns = nds.filter((n) => n.type === CUSTOM_EDGE);
              const predecessors = conns.filter((c) => c.target === tarNode.id).map((c) => c.source);
              const edges = conns.filter((c) => c.target === tarNode.id);

              updateWorkflowTemplateDeliverable({
                mainId: workflowTemplateId,
                _id: tarNode.data._id,
                name: tarNode.data.name,
                predecessors,
                chartData: { ...tarNode, edges },
              }).then(({ data }) => dispatch(updateWTD(data)));
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
                <Button size="small" color="primary" onClick={() => onLayout('LR')}>
                  Vertial Layout
                </Button>
              </Grid>
              <Grid item>
                <Button size="small" color="primary" onClick={() => onLayout('TB')}>
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
