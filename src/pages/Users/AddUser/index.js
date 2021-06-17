import React, { memo } from 'react';

import PageHeader from 'parts/PageHeader';
import UserForm from '../Shared/UserForm';
import LINKS from 'utils/constants/links';
import { FORM_MODE } from 'utils/constants';

const NAV_LINKS = [LINKS.USER_MANAGEMENT, LINKS.USERS];

const AddUser = () => {
  return (
    <>
      <PageHeader title={LINKS.ADD_USER.TITLE} links={NAV_LINKS} />
      <UserForm mode={FORM_MODE.create} />
    </>
  );
};

export default memo(AddUser);
