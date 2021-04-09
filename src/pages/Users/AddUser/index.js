
import React, { memo } from 'react';

import PageHeader from 'parts/PageHeader';
import UserForm from '../Shared/UserForm';
import LINKS from 'utils/constants/links';

const NAV_LINKS = [LINKS.USER_MANAGEMENT, LINKS.USERS];

const AddUser = () => {
  return (
    <>
      <PageHeader title={LINKS.ADD_USER.TITLE} links={NAV_LINKS} />
      <UserForm />
    </>
  );
};

export default memo(AddUser);
