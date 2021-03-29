
import React, { memo } from "react";

import PageHeader from "parts/PageHeader";
import WorkflowTemplateForm from "../Shared/WorkflowTemplateForm";
import LINKS from "utils/constants/links";

const NAV_LINKS = [LINKS.PROJECT_TEMPLATE, LINKS.WORKFLOW_TEMPLATES];

const AddWorkflowTemplate = () => {
  return (
    <>
      <PageHeader title={LINKS.ADD_WORKFLOW_TEMPLATE.TITLE} links={NAV_LINKS} />
      <WorkflowTemplateForm />
    </>
  );
};

export default memo(AddWorkflowTemplate);
