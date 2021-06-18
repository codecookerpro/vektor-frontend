import React, { memo, useRef } from 'react';

import PageHeader from 'parts/PageHeader';
import WorkflowTemplateForm from '../Shared/WorkflowTemplateForm';
import LINKS from 'utils/constants/links';
import WorkflowTemplateChart from '../WorkflowTemplateChart';

const NAV_LINKS = [LINKS.WORKFLOW_TEMPLATES];

const AddWorkflowTemplate = () => {
  const elementsRef = useRef([]);
  const handleGraphEvent = (event, elements) => {
    elementsRef.current = elements;
  };
  const getElements = () => elementsRef.current;

  return (
    <>
      <PageHeader title={LINKS.ADD_WORKFLOW_TEMPLATE.TITLE} links={NAV_LINKS} />
      <WorkflowTemplateForm getElements={getElements} />
      <WorkflowTemplateChart onGraphEvent={handleGraphEvent} editable={true} />
    </>
  );
};

export default memo(AddWorkflowTemplate);
