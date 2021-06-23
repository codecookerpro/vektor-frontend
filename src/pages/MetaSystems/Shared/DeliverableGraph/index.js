import React, { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import WorkflowGraph from 'parts/WorkflowGraph';
import { ColorButton } from 'components/UI/Buttons';

import { GRAPH_EVENTS } from 'parts/WorkflowGraph/constants';
import { nodeToDeliverable, elementsToDeliverables } from 'parts/WorkflowGraph/helper';
import { createDeliverable, updateDeliverable, deleteDeliverable, updateDeliverablePositions } from 'redux/actions/metaSystem';
import { restrict } from 'utils/helpers/utility';

const DeliverableGraph = ({ editable, mainSystem }) => {
  const dispatch = useDispatch();
  const [toggled, toggleGraph] = useState(false);

  const handleGraphEvent = (event, elements, nodeId) => {
    const mainId = mainSystem._id;
    switch (event) {
      case GRAPH_EVENTS.nodeCreate:
        dispatch(createDeliverable(nodeToDeliverable(nodeId, elements, mainId)));
        break;
      case GRAPH_EVENTS.nodeDelete:
        dispatch(deleteDeliverable({ mainId, _id: nodeId }));
        break;
      case GRAPH_EVENTS.nodeLabelChange:
      case GRAPH_EVENTS.edgeCreate:
      case GRAPH_EVENTS.edgeDelete:
      case GRAPH_EVENTS.nodePosChange:
        dispatch(updateDeliverable(nodeToDeliverable(nodeId, elements, mainId)));
        break;
      case GRAPH_EVENTS.graphLayout:
        const deliverables = elementsToDeliverables(elements).map((d) => restrict(d, ['_id', 'chartData']));
        dispatch(updateDeliverablePositions({ _id: mainId, deliverables }));
        break;

      default:
        break;
    }
  };

  return (
    <Card>
      <CardHeader
        title="Deliverables Graph"
        action={
          <ColorButton colour="lightGreen" onClick={() => toggleGraph(!toggled)}>
            {toggled ? 'Hide Graph' : 'See Graph'}
          </ColorButton>
        }
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
