import React, { memo, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Plus } from 'react-feather';

import ContainedButton from 'components/UI/Buttons/ContainedButton';
import PageHeader from 'parts/PageHeader';
import WorkflowTemplateActions from './WorkflowTemplateActions';
import WorkflowTemplatesTable from './WorkflowTemplatesTable';
import LINKS from 'utils/constants/links';

const NAV_LINKS = [LINKS.PROJECT_TEMPLATE];

const WorkflowTemplateList = () => {
  const history = useHistory();

  const [action, setAction] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);

  const actionHandler = useCallback(() => {
    console.log('action go');
  }, []);

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
      <WorkflowTemplateActions action={action} setAction={setAction} onAction={actionHandler} />
      <WorkflowTemplatesTable selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
    </>
  );
};

export default memo(WorkflowTemplateList);
