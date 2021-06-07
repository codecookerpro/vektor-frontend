import React, { memo } from 'react';

import PageHeader from 'parts/PageHeader';
import OrganizationForm from '../Shared/OrganizationForm';
import LINKS from 'utils/constants/links';
import DepartmentForm from '../Shared/DepartmentForm';

const NAV_LINKS = [LINKS.USER_MANAGEMENT, LINKS.ORGANIZATIONS];

const AddOrganization = () => {
  return (
    <>
      <PageHeader title={LINKS.ADD_ORGANIZATION.TITLE} links={NAV_LINKS} />
      <OrganizationForm />
      <DepartmentForm />
    </>
  );
};

export default memo(AddOrganization);
