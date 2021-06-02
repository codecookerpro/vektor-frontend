import React, { memo, useState } from 'react';

import PageHeader from 'parts/PageHeader';
import WorkflowTemplateForm from '../Shared/WorkflowTemplateForm';
import LINKS from 'utils/constants/links';
import WorkflowTemplateChart from '../WorkflowTemplateChart';

const NAV_LINKS = [LINKS.WORKFLOW_TEMPLATES];

const AddWorkflowTemplate = () => {
  // timely deliverables object for validation and las deliverables data generation for API structure
  const [timelyDeliverables, setTimelyDeliverables] = useState({});
  // nodes array for chart generation
  const [nodes, setNodes] = useState([]);
  const [nodesConnectionsInfoParents, setNodesConnectionsInfoParents] = useState({});
  const [nodesConnectionsInfoChildren, setNodesConnectionsInfoChildren] = useState({});

  return (
    <>
      <PageHeader title={LINKS.ADD_WORKFLOW_TEMPLATE.TITLE} links={NAV_LINKS} />
      <WorkflowTemplateForm timelyDeliverables={timelyDeliverables} nodes={nodes} nodesConnectionsInfoChildren={nodesConnectionsInfoChildren} />
      <WorkflowTemplateChart
        timelyDeliverables={timelyDeliverables}
        setTimelyDeliverables={setTimelyDeliverables}
        nodes={nodes}
        setNodes={setNodes}
        nodesConnectionsInfoParents={nodesConnectionsInfoParents}
        setNodesConnectionsInfoParents={setNodesConnectionsInfoParents}
        nodesConnectionsInfoChildren={nodesConnectionsInfoChildren}
        setNodesConnectionsInfoChildren={setNodesConnectionsInfoChildren}
      />
    </>
  );
};

export default memo(AddWorkflowTemplate);
