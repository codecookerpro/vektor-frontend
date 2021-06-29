import React, { memo, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Plus } from 'react-feather';

import ContainedButton from 'components/UI/Buttons/ContainedButton';
import PageHeader from 'parts/PageHeader';
import WorkflowTemplatesTable from './WorkflowTemplatesTable';
import LINKS from 'utils/constants/links';

const NAV_LINKS = [];

const WorkflowTemplateList = () => {
  const history = useHistory();

  const addHandler = useCallback(() => {
    history.push(LINKS.ADD_WORKFLOW_TEMPLATE.HREF);
  }, [history]);

  return (
    <>
      <PageHeader
        title={LINKS.WORKFLOW_TEMPLATES.TITLE}
        links={NAV_LINKS}
        leftElement={
          <ContainedButton onClick={addHandler}>
            <Plus /> Add Workflow Template
          </ContainedButton>
        }
      />
      <WorkflowTemplatesTable />
    </>
  );
};

export default memo(WorkflowTemplateList);
