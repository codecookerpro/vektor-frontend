import React, { memo, useState } from 'react';

import PageHeader from 'parts/PageHeader';
import WorkflowTemplateForm from '../Shared/WorkflowTemplateForm';
import LINKS from 'utils/constants/links';
import WorkflowTemplateChart from '../WorkflowTemplateChart';

const NAV_LINKS = [LINKS.WORKFLOW_TEMPLATES];

const AddWorkflowTemplate = () => {
  const [elements, setElements] = useState([]);
  const handleGraphEvent = (event, elements) => {
    setElements(elements);
  };

  return (
    <>
      <PageHeader title={LINKS.ADD_WORKFLOW_TEMPLATE.TITLE} links={NAV_LINKS} />
      <WorkflowTemplateForm nodes={elements} />
      <WorkflowTemplateChart onGraphEvent={handleGraphEvent} editable={true} />
    </>
  );
};

export default memo(AddWorkflowTemplate);
