import React, { memo, useState } from 'react';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import WorkflowGraph from 'parts/WorkflowGraph';
import ContainedButton from 'components/UI/Buttons/ContainedButton';
import { deliverablesToElements } from 'parts/WorkflowGraph/helper';

const DeliverableGraph = ({ deliverables }) => {
  const [toggled, toggleGraph] = useState(false);
  const [elements, setElements] = useState(deliverablesToElements(deliverables));

  return (
    <Card>
      <CardHeader
        title="Deliverables Graph"
        action={<ContainedButton onClick={() => toggleGraph(!toggled)}>{toggled ? 'Hide Graph' : 'See Graph'}</ContainedButton>}
      />
      {toggled ? (
        <CardContent>
          <WorkflowGraph editable={false} elements={elements} setElements={setElements} />
        </CardContent>
      ) : null}
    </Card>
  );
};

export default memo(DeliverableGraph);
