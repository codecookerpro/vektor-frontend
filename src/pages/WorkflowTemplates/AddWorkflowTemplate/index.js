import React, { memo, useState } from 'react';

import PageHeader from 'parts/PageHeader';
import WorkflowTemplateForm from '../Shared/WorkflowTemplateForm';
import LINKS from 'utils/constants/links';
import WorkflowTemplateChart from '../WorkflowTemplateChart';

const NAV_LINKS = [LINKS.WORKFLOW_TEMPLATES];

const AddWorkflowTemplate = () => {
  // timely deliverables object for validation and las deliverables data generation for API structure
  const [timelyDeliverables, setTimelyDeliverables] = useState({});
  // nodes array for chart generation
  const [nodes, setNodes] = useState([]);
  // just for test
  return (
    <>
      <PageHeader title={LINKS.ADD_WORKFLOW_TEMPLATE.TITLE} links={NAV_LINKS} />
      <WorkflowTemplateForm timelyDeliverables={timelyDeliverables} nodes={nodes} />
      <WorkflowTemplateChart
        timelyDeliverables={timelyDeliverables}
        setTimelyDeliverables={setTimelyDeliverables}
        nodes={nodes}
        setNodes={setNodes}
      />
    </>
  );
};

export default memo(AddWorkflowTemplate);
