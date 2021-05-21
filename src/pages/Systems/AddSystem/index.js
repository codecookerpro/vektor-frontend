import React, { memo } from 'react';

import PageHeader from 'parts/PageHeader';
import SystemForm from '../Shared/SystemForm';
import LINKS from 'utils/constants/links';

const NAV_LINKS = [LINKS.PROJECT_MANAGEMENT, LINKS.SYSTEMS];

const AddSystem = () => {
  return (
    <>
      <PageHeader title={LINKS.ADD_SYSTEM.TITLE} links={NAV_LINKS} />
      <SystemForm />
    </>
  );
};

export default memo(AddSystem);
