import React, { memo } from 'react';

import PageHeader from 'parts/PageHeader';
import SowForm from '../Shared/SowForm';
import LINKS from 'utils/constants/links';
import { FORM_MODE } from 'utils/constants';

const NAV_LINKS = [LINKS.SOWS];

const SowAdd = () => (
  <>
    <PageHeader title={LINKS.ADD_SOW.TITLE} links={NAV_LINKS} />
    <SowForm mode={FORM_MODE.create} />
  </>
);

export default memo(SowAdd);
