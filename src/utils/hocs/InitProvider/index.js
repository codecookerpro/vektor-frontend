import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setAccessToken, setRefreshToken, setCurrentUser } from 'redux/actions/authActions';
import { getUsers } from 'redux/actions/users';
import { getOrganizations } from 'redux/actions/organizations';
import { PERMISSION_TYPES } from 'utils/constants';
import { getFilteringData } from 'redux/actions/dashboards';

const InitProvider = () => {
  const dispatch = useDispatch();

  const { accessToken, permissions, organization } = useSelector(({ auth }) => {
    const { accessToken, currentUser } = auth;
    const { permissions, organization } = currentUser;

    return { accessToken, permissions, organization };
  });

  useEffect(() => {
    const remembered = localStorage.accessToken && localStorage.refreshToken;
    const accessToken = localStorage.accessToken || sessionStorage.accessToken;
    const refreshToken = localStorage.refreshToken || sessionStorage.refreshToken;
    const currentUser = localStorage.currentUser;

    if (!!accessToken) {
      dispatch(setAccessToken(accessToken, remembered));
    }

    if (!!refreshToken) {
      dispatch(setRefreshToken(refreshToken, remembered));
    }

    if (!!currentUser) {
      dispatch(setCurrentUser(JSON.parse(currentUser)));
    }
  }, [dispatch]);

  useEffect(() => {
    if (accessToken) {
      dispatch(getUsers());
      dispatch(getFilteringData());
      if (permissions === PERMISSION_TYPES.admin) {
        dispatch(getOrganizations());
      }
    }
  }, [dispatch, accessToken, organization, permissions]);

  return <div />;
};

export default memo(InitProvider);
