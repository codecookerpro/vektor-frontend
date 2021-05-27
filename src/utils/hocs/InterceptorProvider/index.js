import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'services/axios';
import * as authAPI from 'services/api-auth';
import { logoutUser, setUserToken } from 'redux/actions/authActions';
import { GENERIC_ERRORS } from 'utils/constants/error-codes';
import { setErrorPopup, setErrorPopupText } from 'redux/actions/errorsActions';

const InterceptorProvider = () => {
  const { accessToken, passwordResetToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response) {
          const { data } = error.response;
          const { code } = data;
          switch (code) {
            case GENERIC_ERRORS.VALIDATION:
              if (process.env.NODE_ENV !== 'production') {
                const { errors: errorsResponse = [] } = data;
                let messages = '[DEBUG] \n';
                errorsResponse.forEach((error) => {
                  const { message } = error;
                  messages += message + ' \n';
                });
                dispatch(setErrorPopupText(messages));
                dispatch(setErrorPopup(true));
              }
              break;
            case GENERIC_ERRORS.AUTH:
            case GENERIC_ERRORS.ACCESS_TOKEN_EXP:
              const params = { refreshToken: localStorage.refreshToken };
              const { accessToken, refreshToken, data: user } = await authAPI.refreshToken(params);
              dispatch(
                setUserToken({
                  accessToken,
                  refreshToken,
                  user,
                })
              );
              window.location.reload();
              break;
            case GENERIC_ERRORS.REFRESH_TOKEN:
              dispatch(logoutUser());
              window.location.reload();
              break;
            default:
              return Promise.reject(error);
          }
        }
      }
    );
  }, [dispatch]);

  useEffect(() => {
    axios.interceptors.request.use(
      (config) => {
        const accessToken = localStorage.accessToken;
        const passwordResetToken = localStorage.passwordResetToken;
        const authorization = accessToken ? accessToken : passwordResetToken ? passwordResetToken : '';

        config.headers['Authorization'] = `Bearer ${authorization}`;
        config.headers['Content-Type'] = 'application/json; charset=utf-8';
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }, [accessToken, passwordResetToken]);

  return <div />;
};

export default memo(InterceptorProvider);
