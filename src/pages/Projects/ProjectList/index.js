import React, { memo, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Plus } from 'react-feather';

import ContainedButton from 'components/UI/Buttons/ContainedButton';
import PageHeader from 'parts/PageHeader';

import ProjectsTable from './ProjectsTable';
import LINKS from 'utils/constants/links';
import { PERMISSION_TYPES } from 'utils/constants';
import { useUserPermission } from 'utils/hooks';

const NAV_LINKS = [LINKS.PROJECT_MANAGEMENT];

const ProjectList = () => {
  const history = useHistory();
  const { included } = useUserPermission([PERMISSION_TYPES.admin, PERMISSION_TYPES.supervisor]);

  const addHandler = useCallback(() => {
    history.push(LINKS.ADD_PROJECT.HREF);
  }, [history]);

  const renderAddProjectButton = () => (
    <ContainedButton onClick={addHandler}>
      <Plus /> Add Project
    </ContainedButton>
  );

  return (
    <>
      <PageHeader title={LINKS.PROJECTS.TITLE} links={NAV_LINKS} leftElement={included && renderAddProjectButton()} />
      <ProjectsTable />
    </>
  );
};

export default memo(ProjectList);
