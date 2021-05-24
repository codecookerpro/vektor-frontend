import React, { memo, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import { getUsers } from 'redux/actions/users';
import ContainedButton from 'components/UI/Buttons/ContainedButton';
import PageHeader from 'parts/PageHeader';
import UserForm from '../Shared/UserForm';
import LINKS from 'utils/constants/links';
import { isEmpty } from 'utils/helpers/utility';

const NAV_LINKS = [LINKS.USER_MANAGEMENT, LINKS.USERS];

const EditUser = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const { results = [] } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const user = useMemo(() => results.find((item) => item._id === id), [id, results]);

  const historyHandler = () => {
    history.push(LINKS.USER_HISTORY.HREF.replace(':id', id));
  };

  return (
    <>
      <PageHeader title={LINKS.EDIT_USER.TITLE} links={NAV_LINKS} leftElement={<ContainedButton onClick={historyHandler}>History</ContainedButton>} />
      {!isEmpty(user) && <UserForm user={user} />}
    </>
  );
};

export default memo(EditUser);
