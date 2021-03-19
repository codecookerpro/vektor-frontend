import { memo, useEffect } from "react";
import { useDispatch } from "react-redux";

import { setAccessToken, setRefreshToken, setCurrentUser } from "redux/actions/authActions";

const InitProvider = () => {
  const dispatch = useDispatch();

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

  return <div />;
};

export default memo(InitProvider);
