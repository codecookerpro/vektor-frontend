import React, { memo, useMemo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import { getWorkflowTemplates } from 'redux/actions/workflowTemplates';
import ContainedButton from 'components/UI/Buttons/ContainedButton';
import PageHeader from 'parts/PageHeader';
import WorkflowTemplateChart from '../WorkflowTemplateChart';
import WorkflowTemplateForm from '../Shared/WorkflowTemplateForm';
import LINKS from 'utils/constants/links';
import { isEmpty } from 'utils/helpers/utility';
import { edgeDefaultProps } from 'utils/constants/reactflow/chart-configs';

const NAV_LINKS = [LINKS.WORKFLOW_TEMPLATES];

const EditWorkflowTemplate = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [nodes, setNodes] = useState([]);

  const { results = [] } = useSelector((state) => state.workflowTemplates);

  useEffect(() => {
    dispatch(getWorkflowTemplates());
  }, [dispatch]);

  const workflowTemplate = useMemo(() => results.find((item) => item._id === id), [id, results]);

  const historyHandler = () => {
    history.push(LINKS.WORKFLOW_TEMPLATE_HISTORY.HREF.replace(':id', id));
  };

  useEffect(() => {
    if (isEmpty(workflowTemplate)) {
      return;
    }

    const { deliverables } = workflowTemplate;
    const nodes = deliverables.reduce((acc, deliverable) => {
      const { id, type, data, style, position, edges } = deliverable.chartData;
      data.editable = true;
      return [...acc, { id, type, data, style, position }, ...(edges || [])];
    }, []);

    setTimeout(() => setNodes(nodes));
  }, [workflowTemplate]);

  return (
    <>
      <PageHeader
        title={LINKS.EDIT_WORKFLOW_TEMPLATE.TITLE}
        links={NAV_LINKS}
        leftElement={<ContainedButton onClick={historyHandler}>History</ContainedButton>}
      />
      {isEmpty(workflowTemplate) || (
        <>
          <WorkflowTemplateForm nodes={nodes} workflowTemplate={workflowTemplate} />
          <WorkflowTemplateChart nodes={nodes} setNodes={setNodes} editable={true} />
        </>
      )}
    </>
  );
};

export default memo(EditWorkflowTemplate);
