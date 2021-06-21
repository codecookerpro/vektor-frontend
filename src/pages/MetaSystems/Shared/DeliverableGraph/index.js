import React, { memo, useState } from 'react';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import WorkflowGraph from 'parts/WorkflowGraph';
import ContainedButton from 'components/UI/Buttons/ContainedButton';

const DeliverableGraph = ({ deliverables }) => {
  const [toggled, toggleGraph] = useState(false);

  return (
    <Card>
      <CardHeader
        title="Deliverables Graph"
        action={<ContainedButton onClick={() => toggleGraph(!toggled)}>{toggled ? 'Hide Graph' : 'See Graph'}</ContainedButton>}
      />
      {toggled ? (
        <CardContent>
          <WorkflowGraph editable={true} deliverables={deliverables} />
        </CardContent>
      ) : null}
    </Card>
  );
};

export default memo(DeliverableGraph);
