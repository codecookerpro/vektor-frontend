import React, { memo } from 'react';

import PageHeader from 'parts/PageHeader';
import ProjectForm from '../Shared/ProjectForm';
import LINKS from 'utils/constants/links';
import { PROJECT_MODES } from '../constants';

const NAV_LINKS = [LINKS.PROJECT_MANAGEMENT, LINKS.PROJECTS];

const AddProject = () => (
  <>
    <PageHeader title={LINKS.ADD_PROJECT.TITLE} links={NAV_LINKS} />
    <ProjectForm mode={PROJECT_MODES.CREATION} />
  </>
);

export default memo(AddProject);
