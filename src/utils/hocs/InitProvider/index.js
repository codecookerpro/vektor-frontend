import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setAccessToken, setRefreshToken, setCurrentUser } from 'redux/actions/authActions';
import { getUsers } from 'redux/actions/users';
import { getOrganizations } from 'redux/actions/organizations';

const InitProvider = () => {
  const dispatch = useDispatch();

  const { accessToken } = useSelector((state) => state.auth);

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
      dispatch(getOrganizations());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  return <div />;
};

export default memo(InitProvider);
