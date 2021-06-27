import React, { memo, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import { getWorkflowTemplates } from 'redux/actions/workflowTemplates';
import ContainedButton from 'components/UI/Buttons/ContainedButton';
import PageHeader from 'parts/PageHeader';
import WorkflowTemplateChart from '../WorkflowTemplateChart';
import WorkflowTemplateForm from '../Shared/WorkflowTemplateForm';
import LINKS from 'utils/constants/links';
import { isEmpty, restrict } from 'utils/helpers/utility';
import { GRAPH_EVENTS } from 'parts/WorkflowGraph/constants';
import { nodeToDeliverable, elementsToDeliverables } from 'parts/WorkflowGraph/helper';
import { createWTD, updateWTD, deleteWTD, updateWTDPositions } from 'redux/actions/workflowTemplates';
import { FORM_MODE } from 'utils/constants';

const NAV_LINKS = [LINKS.WORKFLOW_TEMPLATES];

const EditWorkflowTemplate = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const templates = useSelector((state) => state.workflowTemplates.results);
  const template = useMemo(() => templates.find((item) => item._id === id), [id, templates]);

  useEffect(() => dispatch(getWorkflowTemplates()));

  const historyHandler = () => {
    history.push(LINKS.WORKFLOW_TEMPLATE_HISTORY.HREF.replace(':id', id));
  };

  const handleGraphEvent = (event, elements, nodeId) => {
    switch (event) {
      case GRAPH_EVENTS.nodeCreate:
        dispatch(createWTD(nodeToDeliverable(nodeId, elements, id)));
        break;
      case GRAPH_EVENTS.nodeDelete:
        dispatch(deleteWTD({ mainId: id, _id: nodeId }));
        break;
      case GRAPH_EVENTS.nodeLabelChange:
      case GRAPH_EVENTS.edgeCreate:
      case GRAPH_EVENTS.edgeDelete:
      case GRAPH_EVENTS.nodePosChange:
        dispatch(updateWTD(nodeToDeliverable(nodeId, elements, id)));
        break;
      case GRAPH_EVENTS.graphLayout:
      case GRAPH_EVENTS.graphMigrate:
        const deliverables = elementsToDeliverables(elements).map((d) => restrict(d, ['_id', 'chartData']));
        dispatch(updateWTDPositions({ _id: id, deliverables }));
        break;

      default:
        break;
    }
  };

  return (
    <>
      <PageHeader
        title={LINKS.EDIT_WORKFLOW_TEMPLATE.TITLE}
        links={NAV_LINKS}
        leftElement={<ContainedButton onClick={historyHandler}>History</ContainedButton>}
      />
      {isEmpty(template) || (
        <>
          <WorkflowTemplateForm workflowTemplate={template} mode={FORM_MODE.update} />
          <WorkflowTemplateChart deliverables={template.deliverables} editable={true} onGraphEvent={handleGraphEvent} />
        </>
      )}
    </>
  );
};

export default memo(EditWorkflowTemplate);
