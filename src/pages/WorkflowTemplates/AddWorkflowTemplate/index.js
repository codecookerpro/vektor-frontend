import React, { memo, useRef } from 'react';
import { useSelector } from 'react-redux';
import PageHeader from 'parts/PageHeader';
import WorkflowTemplateForm from '../Shared/WorkflowTemplateForm';
import LINKS from 'utils/constants/links';
import WorkflowTemplateChart from '../WorkflowTemplateChart';
import { FORM_MODE } from 'utils/constants';

const NAV_LINKS = [LINKS.WORKFLOW_TEMPLATES];

const AddWorkflowTemplate = () => {
  const elementsRef = useRef([]);
  const templateClone = useSelector((state) => state.workflowTemplates.templateClone);
  const handleGraphEvent = (event, elements) => {
    elementsRef.current = elements;
  };
  const getElements = () => elementsRef.current;

  return (
    <>
      <PageHeader title={LINKS.ADD_WORKFLOW_TEMPLATE.TITLE} links={NAV_LINKS} />
      <WorkflowTemplateForm getElements={getElements} mode={FORM_MODE.create} workflowTemplate={templateClone} />
      <WorkflowTemplateChart onGraphEvent={handleGraphEvent} deliverables={templateClone?.deliverables} editable={true} />
    </>
  );
};

export default memo(AddWorkflowTemplate);
