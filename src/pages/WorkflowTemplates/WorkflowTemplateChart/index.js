import React, { memo } from 'react';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import WorkflowGraph from 'parts/WorkflowGraph';

const WorkflowTemplateChart = ({ nodes = [], editable = true, setNodes = () => {}, workflowTemplateId = null }) => {
  return (
    <Card>
      <CardHeader title="Workflow Template Chart" />
      <CardContent>
        <WorkflowGraph elements={nodes} editable={editable} setElements={setNodes} templateId={workflowTemplateId} />
      </CardContent>
    </Card>
  );
};

export default memo(WorkflowTemplateChart);
