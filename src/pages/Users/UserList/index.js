import React, { memo, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Plus } from 'react-feather';

import ContainedButton from 'components/UI/Buttons/ContainedButton';
import PageHeader from 'parts/PageHeader';
import UsersTable from './UsersTable';
import LINKS from 'utils/constants/links';

const NAV_LINKS = [LINKS.USER_MANAGEMENT];

const UserList = () => {
  const history = useHistory();

  const addHandler = useCallback(() => {
    history.push(LINKS.ADD_USER.HREF);
  }, [history]);

  return (
    <>
      <PageHeader
        title={LINKS.USERS.TITLE}
        links={NAV_LINKS}
        leftElement={
          <ContainedButton onClick={addHandler}>
            <Plus /> Add New User
          </ContainedButton>
        }
      />
      <UsersTable />
    </>
  );
};

export default memo(UserList);
