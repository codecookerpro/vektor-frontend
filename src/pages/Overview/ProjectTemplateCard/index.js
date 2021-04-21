import React, { memo } from 'react';

import OverviewCardLayout from '../Shared/OverviewCardLayout'
import OverviewCardItem from '../Shared/OverviewCardItem'
import LINKS from 'utils/constants/links'

const ProjectTemplateCard = () => {
  return (
    <OverviewCardLayout title='Project Template'>
      <OverviewCardItem
        title='Workflow Templates'
        add={LINKS.ADD_WORKFLOW_TEMPLATE.HREF}
        change={LINKS.WORKFLOW_TEMPLATES.HREF}
      />
      <OverviewCardItem
        title='Phase Templates'
        add={LINKS.ADD_PHASE_TEMPLATE.HREF}
        change={LINKS.PHASE_TEMPLATES.HREF}
      />
    </OverviewCardLayout>
  );
}

export default memo(ProjectTemplateCard);
