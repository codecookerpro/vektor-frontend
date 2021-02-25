import React, { memo } from 'react';

import OverviewCardLayout from '../Shared/OverviewCardLayout'
import OverviewCardAction from '../Shared/OverviewCardAction'
import LINKS from 'utils/constants/links';

function OverviewWorkflowTemplateCard() {
  return (
    <OverviewCardLayout
      title='Workflow Templates'
      description='48 Workflow Templates'
      chip='Project Management'
    >
      <OverviewCardAction
        mainLabel='Add New'
        mainLink={LINKS.ADD_WORKFLOW_TEMPLATE.HREF}
        subLabel='Go to all templates'
        subLink={LINKS.WORKFLOW_TEMPLATES.HREF}
      />
    </OverviewCardLayout>
  );
}

export default memo(OverviewWorkflowTemplateCard);
