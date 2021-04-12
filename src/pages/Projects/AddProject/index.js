import React, { memo, useState, useMemo } from 'react';

import PageHeader from 'parts/PageHeader';
import ProjectForm from '../Shared/ProjectForm';
import LINKS from 'utils/constants/links';
import users from 'utils/temp/users';

const NAV_LINKS = [LINKS.PROJECT_MANAGEMENT, LINKS.PROJECTS];

const AddProject = () => {
  const [selectedOrganization, setSelectedOrganization] = useState('');

  const userList = useMemo(
    () =>
      users.filter((user) => user?.organization.id === selectedOrganization),
    [selectedOrganization]
  );

  return (
    <>
      <PageHeader title={LINKS.ADD_PROJECT.TITLE} links={NAV_LINKS} />
      <ProjectForm
        users={userList}
        setSelectedOrganization={setSelectedOrganization}
      />
    </>
  );
};

export default memo(AddProject);
