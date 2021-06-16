import React, { memo, useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Plus } from 'react-feather';
import ReactFlow, { removeElements, addEdge, MiniMap, Background, Controls } from 'react-flow-renderer';
import CustomFlowNode from './CustomFlowNode';
import CustomFlowEdge from './CustomFlowEdge';
import { GRAPH_PROPS, NODE_PROPS, EDGE_PROPS, LAYOUT_DIRS, ELEMENT_TYPES } from './constants';
import {
  createWorkflowTemplateDeliverable as createAPI,
  updateWorkflowTemplateDeliverable as updateAPI,
  deleteWorkflowTemplateDeliverable as deleteAPI,
  updateWTDPosition as updatePositionAPI,
} from 'services/api-workflow-template';
import { createWTD, updateWTD } from 'redux/actions/workflowTemplates';
import { nodeToDeliverable, validateElements, makeNode, getLayoutedElements, elementsToDeliverables } from './helper';

const useStyles = makeStyles((theme) => ({
  graphContent: {
    height: GRAPH_PROPS.height + 'px',
  },
  graphContainer: {
    // padding: '0px 15px 15px 15px'
  },
  buttonContainer: {
    marginTop: theme.spacing(1),
  },
}));

const WorkflowGraph = ({ elements = [], editable = true, setElements = () => {}, templateId = null }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [zoomOnScroll, setZoomOnScroll] = useState(true);
  const [isDraggable, setIsDraggable] = useState(true);
  const [paneMoveable, setPaneMoveable] = useState(true);
  const [hasOpenedPopup, setHasOpenedPopup] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const bodyStyleRef = useRef(null);
  const boardStyleRef = useRef(null);

  const handleInputChange = (id, value) => {
    setElements((els) => {
      els = els.map((n) =>
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

      if (editable && templateId) {
        updateAPI(nodeToDeliverable(id, els, templateId)).then(({ data }) => dispatch(updateWTD(data)));
      }

      return els;
    });
  };

  const handleDeleteNode = (id) => {
    setElements((els) => {
      const nodeToRemove = els.filter((nd) => nd.id === id);
      const removed = removeElements(nodeToRemove, els);

      if (editable && templateId) {
        deleteAPI({
          mainId: templateId,
          _id: nodeToRemove[0].data._id,
        }).then(({ data }) => dispatch(updateWTD(data)));
      }

      return removed;
    });
  };

  const handleRemoveEdge = (node) => () => {
    setElements((els) => {
      const { source, target } = node;
      els = els.filter((nd) => nd.target !== target || nd.source !== source);

      if (editable && templateId) {
        updateAPI(nodeToDeliverable(target, els, templateId)).then(({ data }) => dispatch(updateWTD(data)));
      }

      return els;
    });
  };

  const eventHandlers = {
    handleInputChange,
    handleDeleteNode,
    handleRemoveEdge,
    handleSwitchPopup: setHasOpenedPopup,
  };

  const createDeliverable = async () => {
    const newNode = makeNode(elements.length, templateId ? NODE_PROPS.label : null, eventHandlers);

    if (editable && templateId) {
      const { data } = await createAPI({
        mainId: templateId,
        name: NODE_PROPS.label,
        chartData: {
          ...newNode,
        },
      });

      dispatch(createWTD(data));

      const createdId = data.deliverables.find((d) => d.chartData.id === newNode.id)._id;
      newNode.data._id = createdId;
    }

    return newNode;
  };

  const handleCreateDeliverable = async () => {
    setElements([...elements, await createDeliverable()]);
  };

  const handleConnect = (conn) => {
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
      return;
    }

    const newEdge = {
      ...conn,
      ...EDGE_PROPS,
      data: {
        editable: true,
        removeEdge() {
          setElements((els) => els.filter((nd) => nd.target !== conn.target || nd.source !== conn.source));
        },
      },
    };

    const updatedElements = addEdge(newEdge, elements);

    if (editable && templateId) {
      updateAPI(nodeToDeliverable(target, updatedElements, templateId)).then(({ data }) => dispatch(updateWTD(data)));
    }

    setElements(updatedElements);
  };

  const handleLayout = (direction) => {
    const layoutedElements = getLayoutedElements(elements, direction);
    setElements(layoutedElements);

    if (editable && templateId) {
      const deliverables = elementsToDeliverables(layoutedElements).map(({ _id, chartData }) => ({ _id, chartData }));
      updatePositionAPI({ _id: templateId, deliverables }).then(({ data }) => dispatch(updateWTD(data)));
    }
  };

  const handleNodeDragStop = (e, node) => {
    e.preventDefault();

    if (editable && templateId) {
      updateAPI(
        nodeToDeliverable(
          node.id,
          elements.map((n) => (n.id === node.id ? { ...n, position: node.position } : n)),
          templateId
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
    const fullScreenButton = document.getElementsByClassName('react-flow__controls-button react-flow__controls-fitview')[0];
    const board = document.getElementsByClassName('react-flow')[0];

    if (fullScreenButton && board) {
      bodyStyleRef.current = document.body.style;
      boardStyleRef.current = board.style;

      fullScreenButton.onclick = (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (fullscreen) {
          document.body.style = bodyStyleRef.current;
          board.style = boardStyleRef.current;
        } else {
          document.body.style.overflow = 'hidden';
          board.style.position = 'absolute';
          board.style.zIndex = 9999999;
          board.style.top = '0px';
          board.style.left = '0px';
          board.style.background = 'white';
        }

        setFullscreen(!fullscreen);
      };

      window.onkeydown = (e) => {
        if (fullscreen && e.key === 'Escape') {
          document.body.style = bodyStyleRef.current;
          board.style = boardStyleRef.current;
          setFullscreen(false);
        }
      };
    }
  });

  return (
    <Box className={classes.graphContainer}>
      <Box className={classes.graphContent}>
        <ReactFlow
          elements={validateElements(elements, eventHandlers)}
          elementsSelectable={false}
          onConnect={handleConnect}
          onNodeDragStop={handleNodeDragStop}
          deleteKeyCode={46}
          nodeTypes={{ [ELEMENT_TYPES.node]: CustomFlowNode }}
          edgeTypes={{ [ELEMENT_TYPES.edge]: CustomFlowEdge }}
          arrowHeadColor={GRAPH_PROPS.arrowHeadColor}
          zoomOnScroll={zoomOnScroll}
          nodesDraggable={isDraggable && editable}
          paneMoveable={paneMoveable}
          zoomOnDoubleClick={false}
        >
          <MiniMap />
          <Controls />
          <Background gap={12} size={0.5} />
          <Background gap={16} />
        </ReactFlow>
      </Box>
      <Grid container justify={editable ? 'space-between' : 'flex-end'} className={classes.buttonContainer}>
        {editable ? (
          <Grid item xs={12} md={4}>
            <Button variant="contained" color="default" onClick={handleCreateDeliverable}>
              <Plus /> Add Deliverable
            </Button>
          </Grid>
        ) : null}
        <Grid item xs={12} md={4}>
          <Grid container justify="flex-end">
            <Grid item>
              <Button size="small" color="primary" onClick={() => handleLayout(LAYOUT_DIRS.vertical)}>
                Vertical Layout
              </Button>
            </Grid>
            <Grid item>
              <Button size="small" color="primary" onClick={() => handleLayout(LAYOUT_DIRS.horizontal)}>
                Horizontal Layout
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default memo(WorkflowGraph);
