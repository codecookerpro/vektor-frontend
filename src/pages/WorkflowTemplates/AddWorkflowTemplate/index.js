import React, { memo, useState } from 'react';

import PageHeader from 'parts/PageHeader';
import WorkflowTemplateForm from '../Shared/WorkflowTemplateForm';
import LINKS from 'utils/constants/links';
import WorkflowTemplateChart from '../WorkflowTemplateChart';

const NAV_LINKS = [LINKS.WORKFLOW_TEMPLATES];

const AddWorkflowTemplate = () => {
  const [nodes, setNodes] = useState([]);

  return (
    <>
      <PageHeader title={LINKS.ADD_WORKFLOW_TEMPLATE.TITLE} links={NAV_LINKS} />
      <WorkflowTemplateForm nodes={nodes} />
      <WorkflowTemplateChart nodes={nodes} setNodes={setNodes} editable={true} />
    </>
  );
};

export default memo(AddWorkflowTemplate);
