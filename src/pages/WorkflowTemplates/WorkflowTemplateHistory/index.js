import React, { memo, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import PageHeader from 'parts/PageHeader';
import HistoryTableCard from 'parts/HistoryTableCard';
import LINKS from 'utils/constants/links';
import systems from 'utils/temp/systems';
import results from 'utils/temp/project-history';

const WorkflowTemplateHistory = () => {
  const { id } = useParams();

  const workflowTemplate = useMemo(() => systems.find((item) => item.id === id), [id]);

  const NAV_LINKS = [
    LINKS.PROJECT_TEMPLATE,
    LINKS.WORKFLOW_TEMPLATES,
    {
      HREF: LINKS.EDIT_WORKFLOW_TEMPLATE.HREF.replace(':id', id),
      TITLE: workflowTemplate?.name || 'Not Found',
    },
  ];

  return (
    <>
      <PageHeader title={`${LINKS.WORKFLOW_TEMPLATE_HISTORY.TITLE}: ${workflowTemplate?.name || 'Not Found'}`} links={NAV_LINKS} />
      <HistoryTableCard title="Workflow Template" results={results} />
    </>
  );
};

export default memo(WorkflowTemplateHistory);
