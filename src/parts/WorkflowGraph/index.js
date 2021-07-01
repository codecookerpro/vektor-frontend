import React, { memo, useRef, useState } from 'react';
import { Button, Grid, Box } from '@material-ui/core';
import { Plus } from 'react-feather';
import ReactFlow, { MiniMap, Background, Controls } from 'react-flow-renderer';

import { CustomFlowEdge, CustomFlowNodeFactory } from './components';
import { GRAPH_PROPS, LAYOUT_DIRS, ELEMENT_TYPES } from './constants';
import useGraphLogic from './hook';
import useStyles from './styles';

const WorkflowGraph = ({ editable, deliverables, onGraphEvent }) => {
  const [connectInProgress, setConnectInProgress] = useState(false);
  const boardRef = useRef(null);

  const classes = useStyles({ connectInProgress });

  const { elements, dialogToggled, handleConnect, handleNodeDragStop, handleCreate, handleLayout } = useGraphLogic({
    editable,
    deliverables,
    onGraphEvent,
    boardRef,
  });

  return (
    <Box className={classes.graphContainer}>
      <Box className={classes.graphContent}>
        <ReactFlow
          elements={elements}
          elementsSelectable={false}
          onConnect={handleConnect}
          onConnectStart={() => setConnectInProgress(true)}
          onConnectStop={() => setConnectInProgress(false)}
          onNodeDragStop={handleNodeDragStop}
          deleteKeyCode={46}
          nodeTypes={{ [ELEMENT_TYPES.node]: CustomFlowNodeFactory(classes.tClass, classes.sClass) }}
          edgeTypes={{ [ELEMENT_TYPES.edge]: CustomFlowEdge }}
          arrowHeadColor={GRAPH_PROPS.arrowHeadColor}
          zoomOnScroll={!dialogToggled}
          nodesDraggable={!dialogToggled && editable}
          paneMoveable={!dialogToggled}
          zoomOnDoubleClick={false}
          nodesConnectable={true}
          ref={boardRef}
          className={classes.reactflow}
        >
          <MiniMap />
          <Controls />
          <Background gap={12} size={0.5} />
          <Background gap={16} />
        </ReactFlow>
      </Box>
      <Grid container justify={editable ? 'space-between' : 'flex-end'} className={classes.buttonContainer}>
        {editable && (
          <Grid item xs={12} md={4}>
            <Button variant="contained" color="default" onClick={handleCreate}>
              <Plus /> Add Deliverable
            </Button>
          </Grid>
        )}
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
