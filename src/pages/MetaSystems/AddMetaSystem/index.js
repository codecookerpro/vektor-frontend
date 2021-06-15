import React, { memo } from 'react';

import PageHeader from 'parts/PageHeader';
import MetaSystemForm from '../Shared/MetaSystemForm';
import LINKS from 'utils/constants/links';
import { FORM_MODE } from 'utils/constants';

const NAV_LINKS = [LINKS.PROJECT_MANAGEMENT, LINKS.EDIT_PROJECT];

const AddMetaSystem = () => {
  return (
    <>
      <PageHeader title={LINKS.ADD_META_SYSTEM.TITLE} links={NAV_LINKS} />
      <MetaSystemForm mode={FORM_MODE.create} />
    </>
  );
};

export default memo(AddMetaSystem);
