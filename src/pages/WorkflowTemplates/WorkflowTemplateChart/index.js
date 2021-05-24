import React, { memo, useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardContent, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Plus } from 'react-feather';
import ReactFlow, { isNode, isEdge, removeElements, addEdge, MiniMap, Controls, Background, ReactFlowProps } from 'react-flow-renderer';
import CustomFlowNode from './CustomFlowNode';
import * as customNodeTypes from '../../../utils/constants/reactflow/custom-node-types';
import { CHART_CONFIGS } from '../../../utils/constants/reactflow/chart-configs';

const useStyles = makeStyles((theme) => ({
	content: {
		height: CHART_CONFIGS.chartContainerHeight + 'px',
		marginBottom: theme.spacing(10),
	},
	buttonContainer: {
		display: 'flex',
	},
}));

const WorkflowTemplateChart = ({timelyDeliverables, setTimelyDeliverables, nodes, setNodes}) => {
	const [magicWayDependency, setMagicWayDependency] = useState(';1,3,5,4;5,7;10,15,3,4;');
	const [markerSizesCustomized, setMarkerSizesCustomized] = useState(null);
	const [nodesConnectionsInfo, setNodesConnectionsInfo] = useState({});
	const countRef = useRef(timelyDeliverables);
	countRef.current = timelyDeliverables;

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
					setTimelyDeliverables({...countRef.current, [id]: {name: e.target.value}});
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
		/*
console.log('params: ', params);
/////////////////////////////////////////////
	params.source = 4; // for example
		//let dependencyStr = magicWayDependency + ';' + params.source + ',' + params.target;
		// let magicPattern = /[;]((?!(;)).)*[4;]/g;
		let magicPattern = new RegExp("[;]((?!(;)).)*[" + params.source + ";]", "g");
		let lineages = magicWayDependency.match(magicPattern); //.toString()

console.log('lineages: ', lineages);
//		setMagicWayDependency()
*/
///////////////////////////////////////////
		let currentSourceNodeChildNodes = nodesConnectionsInfo[params.source];
		// when the current node(source) have child nodes(target)
		// when node(target) is already child of the current node(source)
		if (Array.isArray(currentSourceNodeChildNodes) && currentSourceNodeChildNodes.length && currentSourceNodeChildNodes.includes(params.target)) {
			return;
		}

		let currentTargetNodeChildNodes = nodesConnectionsInfo[params.target];
		// when the current node(target) have child nodes(target)
		// when the child node(target) is already parent of the current node(source)
		if (Array.isArray(currentTargetNodeChildNodes) && currentTargetNodeChildNodes.length && currentTargetNodeChildNodes.includes(params.source)) {
			return;
		}

		// all parent nodes
		let allParentNodes = Object.keys(nodesConnectionsInfo);
		let allChildsNodes = Object.values(nodesConnectionsInfo).map
console.log('allParentNodes: ', allParentNodes);
		let wantToBeParentOfNode = params.target;
		// check if wantToBeParentOfNodeNode is parent of someone
		if (allParentNodes.includes(wantToBeParentOfNode)) {
console.log('this child: ', wantToBeParentOfNode, ' already has childs: ', nodesConnectionsInfo[wantToBeParentOfNode]);
			let childsOfwantToBeParentOfNode = nodesConnectionsInfo[wantToBeParentOfNode];
			// when the expected child has childs
			if (Array.isArray(childsOfwantToBeParentOfNode) && childsOfwantToBeParentOfNode.length) {
console.log('when the expected child has childs');
				// find childs for each child // level 3
				let isThirdLevelChild = false;
				for (childNodes of childsOfwantToBeParentOfNode) {
					if (childNodes.includes(params.source)) {
						isThirdLevelChild = true;
						break;
					}
				}
				if (isThirdLevelChild) {
					return;
				}
			}
		}

		let childNodes = [params.target];
		if (Array.isArray(nodesConnectionsInfo[params.source])) {
			childNodes = [...nodesConnectionsInfo[params.source], params.target];
		}
		setNodesConnectionsInfo({
			...nodesConnectionsInfo,
			[params.source]: childNodes,
		});

		setNodes((lineNodes) => addEdge({...params, ...CHART_CONFIGS.lineNodeParams}, lineNodes));
	}

	const classes = useStyles();
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
	}, [marker]);

	useEffect(() => {
		console.log('nodesConnectionsInfo: ', nodesConnectionsInfo);
	}, [nodesConnectionsInfo]);

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
						arrowHeadColor='#4d84c0'
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
