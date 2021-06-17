import React, { memo } from 'react';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import WorkflowGraph from 'parts/WorkflowGraph';

const WorkflowTemplateChart = ({ deliverables = [], editable = true, onGraphEvent = () => {} }) => {
  return (
    <Card>
      <CardHeader title="Workflow Template Chart" />
      <CardContent>
        <WorkflowGraph deliverables={deliverables} editable={editable} onGraphEvent={onGraphEvent} />
      </CardContent>
    </Card>
  );
};

export default memo(WorkflowTemplateChart);
