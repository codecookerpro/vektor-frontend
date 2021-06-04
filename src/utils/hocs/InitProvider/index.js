import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setAccessToken, setRefreshToken, setCurrentUser } from 'redux/actions/authActions';
import { getUsers } from 'redux/actions/users';
import { getOrganizations } from 'redux/actions/organizations';
import { getProjects } from 'redux/actions/projects';
import { PERMISSION_TYPE } from 'utils/constants/permissions';

const InitProvider = () => {
  const dispatch = useDispatch();

  const { accessToken, permissions, organization } = useSelector(({ auth }) => {
    const { accessToken, currentUser } = auth;
    const { permissions, organization } = currentUser;

    return { accessToken, permissions, organization };
  });

  useEffect(() => {
    const accessToken = localStorage.accessToken;
    const refreshToken = localStorage.refreshToken;
    const currentUser = localStorage.currentUser;

    if (!!accessToken) {
      dispatch(setAccessToken(accessToken));
    }

    if (!!refreshToken) {
      dispatch(setRefreshToken(refreshToken));
    }

    if (!!currentUser) {
      dispatch(setCurrentUser(JSON.parse(currentUser)));
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      dispatch(getUsers());
      if (permissions === PERMISSION_TYPE.ADMIN) {
        dispatch(getOrganizations());
        dispatch(getProjects());
      } else {
        dispatch(getProjects({ organization }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  return <div />;
};

export default memo(InitProvider);
