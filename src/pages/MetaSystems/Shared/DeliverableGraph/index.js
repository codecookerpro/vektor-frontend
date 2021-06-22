import React, { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import WorkflowGraph from 'parts/WorkflowGraph';
import ContainedButton from 'components/UI/Buttons/ContainedButton';

import { GRAPH_EVENTS } from 'parts/WorkflowGraph/constants';
import { nodeToDeliverable, elementsToDeliverables } from 'parts/WorkflowGraph/helper';
import { createWTD, updateWTD, deleteWTD, updateWTDPositions } from 'redux/actions/workflowTemplates';

const DeliverableGraph = ({ editable, mainSystem }) => {
  const dispatch = useDispatch();
  const [toggled, toggleGraph] = useState(false);
  const id = 0;

  const handleGraphEvent = (event, elements, nodeId, data) => {
    switch (event) {
      case GRAPH_EVENTS.nodeCreate: {
        dispatch(createWTD(nodeToDeliverable(nodeId, elements)));
        break;
      }
      case GRAPH_EVENTS.nodeDelete: {
        dispatch(deleteWTD({ mainId: id, _id: nodeId }));
        break;
      }
      case GRAPH_EVENTS.nodeLabelChange:
      case GRAPH_EVENTS.edgeCreate:
      case GRAPH_EVENTS.edgeDelete: {
        dispatch(updateWTD(nodeToDeliverable(nodeId, elements)));
        break;
      }
      case GRAPH_EVENTS.nodePosChange: {
        dispatch(
          updateWTD(
            nodeToDeliverable(
              nodeId,
              elements.map((n) => (n.id === nodeId ? { ...n, position: data } : n)),
              id
            )
          )
        );
        break;
      }
      case GRAPH_EVENTS.graphLayout: {
        const deliverables = elementsToDeliverables(elements).map(({ _id, chartData }) => ({ _id, chartData }));
        dispatch(updateWTDPositions({ _id: id, deliverables }));
        break;
      }

      default:
        break;
    }
  };

  return (
    <Card>
      <CardHeader
        title="Deliverables Graph"
        action={<ContainedButton onClick={() => toggleGraph(!toggled)}>{toggled ? 'Hide Graph' : 'See Graph'}</ContainedButton>}
      />
      {toggled ? (
        <CardContent>
          <WorkflowGraph editable={editable} deliverables={mainSystem.deliverables} onGraphEvent={handleGraphEvent} />
        </CardContent>
      ) : null}
    </Card>
  );
};

export default memo(DeliverableGraph);
