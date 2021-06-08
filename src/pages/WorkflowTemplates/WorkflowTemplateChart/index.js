import React, { memo, useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardActions, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Plus } from 'react-feather';
import ReactFlow, { removeElements, addEdge, MiniMap, Background, isNode } from 'react-flow-renderer';
import CustomFlowNode from './CustomFlowNode';
import CustomFlowEdge from './CustomFlowEdge';
import * as elementTypes from 'utils/constants/reactflow/custom-node-types';
import CHART_CONFIGS from 'utils/constants/reactflow/chart-configs';
import ObjectID from 'bson-objectid';
import dagre from 'dagre';

const { chartContainerHeight, nodeHeight, nodeWidth, defaultNodeMarginY, defaultNodeMarginX, lineNodeParams } = CHART_CONFIGS;

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

const WorkflowTemplateChart = ({ delivertables }) => {
  const classes = useStyles();
  const [nodes, setNodes] = useState(delivertables || []);
  const [zoomOnScroll, setZoomOnScroll] = useState(true);
  const [isDraggable, setIsDraggable] = useState(true);
  const [paneMoveable, setPaneMoveable] = useState(true);
  const [hasOpenedPopup, setHasOpenedPopup] = useState(false);
  const [arrowCustomized, setArrowCustomized] = useState(null);

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
    setNodes((nds) =>
      nds.map((n) =>
        n.id === id
          ? {
              ...n,
              data: {
                ...n.data,
                label: value,
              },
            }
          : n
      )
    );
  };

  const handleDeleteNode = (id, e) => {
    e.preventDefault();

    setNodes((nds) => {
      const nodeToRemove = nds.filter((nd) => nd.id === id);
      return removeElements(nodeToRemove, nds);
    });
  };

  const makeNode = () => {
    const nodeNum = nodes.length;
    const currentTimestamp = new Date().getTime();
    const objectId = ObjectID(currentTimestamp).toHexString();
    return {
      id: objectId,
      type: elementTypes.INPUT_NODE,
      data: {
        id: objectId,
        label: null,
        handleInputChange,
        handleDeleteNode,
        handleSwitchPopup: (isSet) => setHasOpenedPopup(isSet),
      },
      style: {
        border: '1.5px solid #4d84c0',
        borderRadius: '10px',
        padding: '21px 0',
        background: '#fff',
        width: nodeWidth + 'px',
        height: nodeHeight + 'px',
      },
      position: position(nodeNum),
    };
  };

  const onConnect = (conn) => {
    const newEdge = {
      ...conn,
      ...lineNodeParams,
      data: {
        removeEdge() {
          setNodes((nds) => nds.filter((nd) => nd.target !== conn.target || nd.source !== conn.source));
        },
      },
    };
    setNodes(addEdge(newEdge, nodes));
  };

  const onLayout = (direction) => {
    const layoutedElements = getLayoutedElements(nodes, direction);
    setNodes(layoutedElements);
  };

  const addDeliverable = () => {
    setNodes([...nodes, makeNode()]);
  };

  // change the marker sizes, written custom code, because module doesn't have ability to do this
  let marker = document.getElementById('react-flow__arrowclosed');

  useEffect(() => {
    if (arrowCustomized) {
      return;
    }
    if (marker) {
      marker.markerWidth.baseVal.value = 10;
      marker.markerHeight.baseVal.value = 10;
      setArrowCustomized(true);
    }
  }, [marker, arrowCustomized]);

  useEffect(() => {
    setIsDraggable(!hasOpenedPopup);
    setPaneMoveable(!hasOpenedPopup);
    setZoomOnScroll(!hasOpenedPopup);
  }, [hasOpenedPopup]);

  return (
    <Card className={classes.root}>
      <CardHeader title="Workflow Template Chart" />
      <CardContent className={classes.content}>
        <ReactFlow
          elements={nodes}
          elementsSelectable={false}
          onConnect={onConnect}
          deleteKeyCode={46}
          nodeTypes={{ [elementTypes.INPUT_NODE]: CustomFlowNode }}
          edgeTypes={{ [elementTypes.CUSTOM_EDGE]: CustomFlowEdge }}
          arrowHeadColor="#4d84c0"
          zoomOnScroll={zoomOnScroll}
          nodesDraggable={isDraggable}
          paneMoveable={paneMoveable}
          zoomOnDoubleClick={false}
        >
          <MiniMap />
          <Background gap={12} size={0.5} />
          <Background gap={16} />
        </ReactFlow>
      </CardContent>
      <CardActions>
        <Grid container justify="space-between">
          <Grid item xs={12} md={4}>
            <Button variant="contained" color="default" onClick={addDeliverable}>
              <Plus /> Add Deliverable
            </Button>
          </Grid>
          <Grid item xs={12} md={4}>
            <Grid container justify="flex-end">
              <Grid item>
                <Button size="small" color="primary" onClick={() => onLayout('TB')}>
                  Vertial Layout
                </Button>
              </Grid>
              <Grid item>
                <Button size="small" color="primary" onClick={() => onLayout('LR')}>
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
