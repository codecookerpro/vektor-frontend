import React, { memo } from 'react';

import PageHeader from 'parts/PageHeader';
import SowForm from '../Shared/SowForm';
import LINKS from 'utils/constants/links';
import { PROJECT_MODES } from 'utils/constants/projectModes';

const NAV_LINKS = [LINKS.SOWS];

const SowAdd = () => (
  <>
    <PageHeader title={LINKS.ADD_SOW.TITLE} links={NAV_LINKS} />
    <SowForm mode={PROJECT_MODES.CREATION} />
  </>
);

export default memo(SowAdd);
