import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Plus } from 'react-feather';

import { getProjects } from 'redux/actions/projects';
import ContainedButton from 'components/UI/Buttons/ContainedButton';
import PageHeader from 'parts/PageHeader';
import OrganizationFilter from './OrganizationFilter';
import ProjectsTable from './ProjectsTable';
import LINKS from 'utils/constants/links';

const NAV_LINKS = [LINKS.PROJECT_MANAGEMENT];

const ProjectList = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [organization, setOrganization] = useState('');

  useEffect(() => {
    dispatch(getProjects({ organization }));
  }, [dispatch, organization]);

  const addHandler = useCallback(() => {
    history.push(LINKS.ADD_PROJECT.HREF);
  }, [history]);

  return (
    <>
      <PageHeader
        title={LINKS.PROJECTS.TITLE}
        links={NAV_LINKS}
        leftElement={
          <ContainedButton onClick={addHandler}>
            <Plus /> Add Project
          </ContainedButton>
        }
      />
      <OrganizationFilter organization={organization} setOrganization={setOrganization} />
      <ProjectsTable />
    </>
  );
};

export default memo(ProjectList);
