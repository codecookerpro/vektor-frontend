import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setAccessToken, setRefreshToken, setCurrentUser } from "redux/actions/authActions";
import { getOrganizations } from "redux/actions/organizations";

const InitProvider = () => {
  const dispatch = useDispatch();

  const { accessToken } = useSelector(state => state.auth)

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
  }, [dispatch]);

  useEffect(() => {
    if (accessToken) {
      dispatch(getOrganizations())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  return <div />;
};

export default memo(InitProvider);
