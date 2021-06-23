import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Plus } from 'react-feather';

import { getProjects } from 'redux/actions/projects';
import ContainedButton from 'components/UI/Buttons/ContainedButton';
import PageHeader from 'parts/PageHeader';
import { PERMISSION_TYPES } from 'utils/constants';

import OrganizationFilter from './OrganizationFilter';
import ProjectsTable from './ProjectsTable';
import LINKS from 'utils/constants/links';

const NAV_LINKS = [LINKS.PROJECT_MANAGEMENT];

const ProjectList = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { permissions } = useSelector(({ auth }) => auth.currentUser);
  const isAddProjectButtonVisible = permissions === PERMISSION_TYPES.admin || permissions === PERMISSION_TYPES.supervisor;
  const isOrganizationFilterVisible = permissions === PERMISSION_TYPES.admin;

  const [organization, setOrganization] = useState('');

  useEffect(() => {
    if (permissions === PERMISSION_TYPES.admin) {
      dispatch(getProjects({ organization }));
    }
  }, [dispatch, organization, permissions]);

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
      <PageHeader title={LINKS.PROJECTS.TITLE} links={NAV_LINKS} leftElement={isAddProjectButtonVisible && renderAddProjectButton()} />
      {isOrganizationFilterVisible && <OrganizationFilter organization={organization} setOrganization={setOrganization} />}
      <ProjectsTable />
    </>
  );
};

export default memo(ProjectList);
