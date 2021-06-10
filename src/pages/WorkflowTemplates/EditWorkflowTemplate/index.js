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

const NAV_LINKS = [LINKS.WORKFLOW_TEMPLATES];

const EditWorkflowTemplate = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [nodes, setNodes] = useState([]);
  const [editable, setEditable] = useState(false);

  const { results = [] } = useSelector((state) => state.workflowTemplates);

  useEffect(() => {
    dispatch(getWorkflowTemplates());
  }, [dispatch]);

  const workflowTemplate = results.find((item) => item._id === id);

  const historyHandler = () => {
    history.push(LINKS.WORKFLOW_TEMPLATE_HISTORY.HREF.replace(':id', id));
  };

  useEffect(() => {
    if (isEmpty(workflowTemplate)) {
      return;
    }

    const { deliverables } = workflowTemplate;
    const nodes = deliverables.reduce((acc, deliverable) => {
      const {
        chartData: { id, type, data, style, position, edges },
        _id,
      } = deliverable;
      return [
        ...acc,
        { id, type, data: { ...data, _id, editable }, style, position },
        ...(edges ? edges.map((e) => ({ ...e, data: { ...e.data, editable } })) : []),
      ];
    }, []);

    setTimeout(() => setNodes(nodes));
  }, [workflowTemplate, editable]);

  return (
    <>
      <PageHeader
        title={LINKS.EDIT_WORKFLOW_TEMPLATE.TITLE}
        links={NAV_LINKS}
        leftElement={<ContainedButton onClick={historyHandler}>History</ContainedButton>}
      />
      {isEmpty(workflowTemplate) || (
        <>
          <WorkflowTemplateForm nodes={nodes} workflowTemplate={workflowTemplate} onEdit={setEditable} />
          <WorkflowTemplateChart nodes={nodes} setNodes={setNodes} editable={editable} workflowTemplateId={workflowTemplate._id} />
        </>
      )}
    </>
  );
};

export default memo(EditWorkflowTemplate);
