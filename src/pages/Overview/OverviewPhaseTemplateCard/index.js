import React, { memo } from 'react';

import OverviewCardLayout from '../Shared/OverviewCardLayout'
import OverviewCardAction from '../Shared/OverviewCardAction'
import LINKS from 'utils/constants/links';

function OverviewPhaseTemplateCard() {
  return (
    <OverviewCardLayout
      title='Phase Templates'
      description='29 Phase Templates'
      chip='Project Management'
    >
      <OverviewCardAction
        mainLabel='Add New'
        mainLink={LINKS.ADD_PHASE_TEMPLATE.HREF}
        subLabel='Go to all templates'
        subLink={LINKS.PHASE_TEMPLATES.HREF}
      />
    </OverviewCardLayout>
  );
}

export default memo(OverviewPhaseTemplateCard);
