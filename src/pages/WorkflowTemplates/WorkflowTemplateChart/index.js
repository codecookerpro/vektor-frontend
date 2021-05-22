import React, { memo, useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Plus } from 'react-feather';
import ReactFlow, { isNode, isEdge, removeElements, addEdge, MiniMap, Controls, Background, ReactFlowProps } from 'react-flow-renderer';
import CustomFlowNode from './CustomFlowNode';
import * as customNodeTypes from '../../../utils/constants/reactflow/custom-node-types';
import { CHART_CONFIGS } from '../../../utils/constants/reactflow/chart-configs';

const WorkflowTemplateChart = () => {

	// to do, just note, need to be deleted later the nodes array nested objects is equal to the API request "deliverables.chartData", need to attach the node input value to the "deliverable.name"
	// deliverables array configured for API
	const [deliverables, setDeliverables] = useState([]);
	// nodes array for chart generation
	const [nodes, setNodes] = useState([]);
	
	const nodesCountY = () => {
		return CHART_CONFIGS.chartContainerHeight / (CHART_CONFIGS.nodeHeight + CHART_CONFIGS.defaultNodeMarginY)
	}
	const position = (nodesCount) => {
		let positionX = ((nodesCount + 1) / nodesCountY()) >= 1 ? (Math.floor((nodesCount + 1) / nodesCountY()) * (CHART_CONFIGS.nodeWidth + CHART_CONFIGS.defaultNodeMarginX)) : 0;
		let positionY = nodesCount === 0 ? CHART_CONFIGS.defaultNodeMarginY : (((((nodesCount + 1) % nodesCountY()) - 1) * (CHART_CONFIGS.nodeHeight + CHART_CONFIGS.defaultNodeMarginY))) + CHART_CONFIGS.defaultNodeMarginY;
		if ((nodesCount + 1) % nodesCountY() === 0) {
			positionY = CHART_CONFIGS.defaultNodeMarginY;
		}
		return {
			x: positionX,
			y: positionY,
		}
	}
	const node = (id, nodesCount) => {
		return {
			id: id,
			type: customNodeTypes.INPUT,
			data: {
				id: id,
				// placeholder of node input
				label: CHART_CONFIGS.label,
				handleInputChange: (id, e) => {
					e.preventDefault();
					// validation
					if (e.target.value) {
						setDeliverables([...deliverables, {
							id, id,
							name: e.target.value,
						}]);
					// if the validation doesn't passed, remove data from deliverables
					} else if (deliverables.includes(id)) {
						let removedFromDeliverable = deliverables.filter((el) => el.id !== id);
						setDeliverables(removedFromDeliverable);
					}
				},
				deliverables: () => {
					return deliverables
				},
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
		}
	}
	const handleConnectNodes = (params) => {
console.log('handleConnectNodes:params', params);
		setNodes((lineNodes) => addEdge({...params, ...CHART_CONFIGS.lineNodeParams}, lineNodes));
	}

	const useStyles = makeStyles((theme) => ({
		content: {
			height: CHART_CONFIGS.chartContainerHeight + 'px',
			marginBottom: theme.spacing(10),
		},
		buttonContainer: {
			display: 'flex',
		},
	}));

	const classes = useStyles();

	useEffect(() => {
		console.log('nodes: ', JSON.stringify(nodes));
	}, [nodes]);
	// const onElementsRemove = (elementsToRemove) => setElements((els) => removeElements(elementsToRemove, els));

	return (
		<>
			<Card>
				<CardHeader title="Workflow Chart" />
				<CardContent className={classes.content}>
					<ReactFlow 
						elements={nodes}
						// onElementsRemove={onElementsRemove}
						// onElementClick={onElementClick}
						onConnect={handleConnectNodes}
						deleteKeyCode={46}
						// the below params required
						nodeTypes={{ [customNodeTypes.INPUT]: CustomFlowNode }}
					>
						<MiniMap />
						<Controls />
						<Background gap={12} size={0.5} />
						<Background gap={16} />
					</ReactFlow>
					<Grid item xs={12}>
						<div className={classes.buttonContainer}>
							<Button variant='contained' color='default' onClick={() => setNodes([...nodes, node((nodes.length + 1).toString(), nodes.length)])}>
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
