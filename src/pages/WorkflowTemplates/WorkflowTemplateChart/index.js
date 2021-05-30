import React, { memo, useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardContent, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Plus } from 'react-feather';
import ReactFlow, { removeElements, addEdge, MiniMap, Background } from 'react-flow-renderer';
import CustomFlowNode from './CustomFlowNode';
import * as customNodeTypes from 'utils/constants/reactflow/custom-node-types';
import { CHART_CONFIGS } from 'utils/constants/reactflow/chart-configs';
// to do, should be used for chart layout (horizontal, vertical)
// import dagre from 'dagre';

const useStyles = makeStyles((theme) => ({
  content: {
    height: CHART_CONFIGS.chartContainerHeight + 'px',
    marginBottom: theme.spacing(10),
  },
  buttonContainer: {
    display: 'flex',
  },
}));

const WorkflowTemplateChart = ({ timelyDeliverables, setTimelyDeliverables, nodes, setNodes }) => {
  const classes = useStyles();
  const [zoomOnScroll, setZoomOnScroll] = useState(true);
  const [isDraggable, setIsDraggable] = useState(true);
  const [paneMoveable, setPaneMoveable] = useState(true);
  const [hasOpenedPopup, setHasOpenedPopup] = useState(false);
  const [markerSizesCustomized, setMarkerSizesCustomized] = useState(null);
  const [nodesConnectionsInfoParents, setNodesConnectionsInfoParents] = useState({});
  const [nodesConnectionsInfoChildren, setNodesConnectionsInfoChildren] = useState({});
  const countRefTimelyDeliverables = useRef(timelyDeliverables);
  countRefTimelyDeliverables.current = timelyDeliverables;
  const countRefNodes = useRef(nodes);
  countRefNodes.current = nodes;

  const nodesCountY = () => {
    return CHART_CONFIGS.chartContainerHeight / (CHART_CONFIGS.nodeHeight + CHART_CONFIGS.defaultNodeMarginY);
  };
  const position = (nodesCount) => {
    let positionX =
      (nodesCount + 1) / nodesCountY() >= 1
        ? Math.floor((nodesCount + 1) / nodesCountY()) * (CHART_CONFIGS.nodeWidth + CHART_CONFIGS.defaultNodeMarginX)
        : 0;
    let positionY =
      nodesCount === 0
        ? CHART_CONFIGS.defaultNodeMarginY
        : (((nodesCount + 1) % nodesCountY()) - 1) * (CHART_CONFIGS.nodeHeight + CHART_CONFIGS.defaultNodeMarginY) + CHART_CONFIGS.defaultNodeMarginY;
    if ((nodesCount + 1) % nodesCountY() === 0) {
      positionY = CHART_CONFIGS.defaultNodeMarginY;
    }
    return {
      x: positionX,
      y: positionY,
    };
  };
  const node = (id, nodesCount) => {
    return {
      id: id,
      type: customNodeTypes.INPUT_NODE,
      data: {
        id: id,
        // placeholder of node input
        label: CHART_CONFIGS.label,
        handleInputChange: (id, value) => {
          setTimelyDeliverables({ ...countRefTimelyDeliverables.current, [id]: { name: value } });
        },
        handleDeleteNode: (id, e) => {
          e.preventDefault();
          let elementsToBeRemoved = countRefNodes.current.filter((node) => {
            return node.id === id;
          });
          setNodes((updatedNodes) => removeElements(elementsToBeRemoved, updatedNodes));
        },
        handleSwitchPopup: (isSet) => setHasOpenedPopup(isSet),
      },
      style: {
        border: '1.5px solid #4d84c0',
        borderRadius: '10px',
        padding: '21px 0',
        background: '#fff',
        width: CHART_CONFIGS.nodeWidth + 'px',
        height: CHART_CONFIGS.nodeHeight + 'px',
      },
      position: position(nodesCount),
    };
  };

  const handleConnectNodes = (params) => {
    let currentSourceNodeChildNodes = nodesConnectionsInfoParents[params.source];
    // when the current node(source) have child nodes(target)
    // when node(target) is already child of the current node(source)
    const targetIsSourceChild =
      Array.isArray(currentSourceNodeChildNodes) && currentSourceNodeChildNodes.length && currentSourceNodeChildNodes.includes(params.target);
    if (targetIsSourceChild) {
      return;
    }

    let currentTargetNodeChildNodes = nodesConnectionsInfoParents[params.target];
    // when the current node(target) have child nodes(target)
    // when the child node(target) is already parent of the current node(source)
    const targetIsSourceParent =
      Array.isArray(currentTargetNodeChildNodes) && currentTargetNodeChildNodes.length && currentTargetNodeChildNodes.includes(params.source);
    if (targetIsSourceParent) {
      return;
    }

    let childNodes = [];
    if (Array.isArray(nodesConnectionsInfoParents[params.source])) {
      childNodes = [
        ...nodesConnectionsInfoParents[params.source],
        ...(Array.isArray(nodesConnectionsInfoParents[params.target])
          ? [...nodesConnectionsInfoParents[params.target], params.target]
          : [params.target]),
      ];
      childNodes = [...new Set(childNodes)];
    } else if (Array.isArray(nodesConnectionsInfoParents[params.target])) {
      childNodes = [...nodesConnectionsInfoParents[params.target], params.target];
    } else {
      childNodes = [params.target];
    }

    // when the current source have parents
    const sourceHasParents = Array.isArray(nodesConnectionsInfoChildren[params.source]);
    if (sourceHasParents) {
      for (let parentId of nodesConnectionsInfoChildren[params.source]) {
        if (Array.isArray(nodesConnectionsInfoParents[parentId])) {
          if (!nodesConnectionsInfoParents[parentId].includes(params.target)) {
            nodesConnectionsInfoParents[parentId] = [...nodesConnectionsInfoParents[parentId], params.target];
          }
        } else {
          nodesConnectionsInfoParents[parentId] = [params.target];
        }
      }
    }

    setNodesConnectionsInfoParents({
      ...nodesConnectionsInfoParents,
      [params.source]: childNodes,
    });

    let parentNodes = [];
    if (Array.isArray(nodesConnectionsInfoChildren[params.target])) {
      parentNodes = [
        ...nodesConnectionsInfoChildren[params.target],
        ...(sourceHasParents ? [...nodesConnectionsInfoChildren[params.source], params.source] : [params.source]),
      ];
      parentNodes = [...new Set(parentNodes)];
    } else if (sourceHasParents) {
      parentNodes = [...nodesConnectionsInfoChildren[params.source], params.source];
    } else {
      parentNodes = [params.source];
    }

    // when the current target have children, add current source as parent for each child of target
    if (Array.isArray(nodesConnectionsInfoParents[params.target])) {
      for (let childId of nodesConnectionsInfoParents[params.target]) {
        if (Array.isArray(nodesConnectionsInfoChildren[childId])) {
          if (!nodesConnectionsInfoChildren[childId].includes(params.source)) {
            nodesConnectionsInfoChildren[childId] = [...nodesConnectionsInfoChildren[childId], params.source];
          }
        } else {
          nodesConnectionsInfoChildren[childId] = [params.source];
        }
      }
    }

    setNodesConnectionsInfoChildren({
      ...nodesConnectionsInfoChildren,
      [params.target]: parentNodes,
    });

    setNodes((lineNodes) => addEdge({ ...params, ...CHART_CONFIGS.lineNodeParams }, lineNodes));
  };

  // to do, the below commented code should be used for chart graph
  // const dagreGraph = new dagre.graphlib.Graph();
  // dagreGraph.setDefaultEdgeLabel(() => ({}));

  // const layoutedElements = getLayoutedElements(nodes);
  // const getLayoutedElements = (elements, direction = 'TB') => {
  // 	const isHorizontal = direction === 'LR';
  // 	dagreGraph.setGraph({ rankdir: direction });

  // 	elements.forEach((el) => {
  // 		if (isNode(el)) {
  // 			dagreGraph.setNode(el.id, { width: CHART_CONFIGS.nodeWidth, height: CHART_CONFIGS.nodeHeight });
  // 		} else {
  // 			dagreGraph.setEdge(el.source, el.target);
  // 		}
  // 	});
  // }

  // const onLayout = useCallback(
  // 	(direction) => {
  // 		const layoutedElements = getLayoutedElements(nodes, direction);
  // 		setNodes(layoutedElements);
  // 	},[nodes]
  // );
  // const onElementsRemove = (elementsToRemove) => setElements((els) => removeElements(elementsToRemove, els));

  // change the marker sizes, written custom code, because module doesn't have ability to do this
  let marker = document.getElementById('react-flow__arrowclosed');

  useEffect(() => {
    if (markerSizesCustomized) {
      return;
    }
    if (marker) {
      marker.markerWidth.baseVal.value = 30;
      marker.markerHeight.baseVal.value = 30;
      setMarkerSizesCustomized(true);
    }
  }, [marker, markerSizesCustomized]);

  useEffect(() => {
    setIsDraggable(!hasOpenedPopup);
    setPaneMoveable(!hasOpenedPopup);
    setZoomOnScroll(!hasOpenedPopup);
  }, [hasOpenedPopup]);

  return (
    <>
      <Card className={classes.root}>
        <CardHeader title="Workflow Template Chart" />
        <CardContent className={classes.content}>
          <ReactFlow
            elements={nodes}
            onConnect={handleConnectNodes}
            deleteKeyCode={46}
            nodeTypes={{ [customNodeTypes.INPUT_NODE]: CustomFlowNode }}
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
          <Grid item xs={12}>
            <div className={classes.buttonContainer}>
              <Button variant="contained" color="default" onClick={() => setNodes([...nodes, node((nodes.length + 1).toString(), nodes.length)])}>
                <Plus /> Add Deliverable
              </Button>
            </div>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default memo(WorkflowTemplateChart);
