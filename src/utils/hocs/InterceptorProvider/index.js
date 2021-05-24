
import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";

import axios from 'services/axios'
import * as authAPI from "../../../services/api-auth";
import { logoutUser, setUserToken } from "../../../redux/actions/authActions";

const InterceptorProvider = () => {
  const { accessToken, passwordResetToken } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response) {
          const { data, config } = error.response;
          const refreshUrl = "/api/users/refresh"
          if (config.url === refreshUrl ) {
            dispatch(logoutUser());
            window.location.reload();
          }
          if ( data.code === 1002 || data.code === 1001) {
              const refreshToken = localStorage.refreshToken;
              const params = {
                refreshToken,
              }
              authAPI.refreshToken(params).then( (response) => {
                const {accessToken, refreshToken, data: user} = response;
                dispatch(
                  setUserToken({
                    accessToken,
                    refreshToken,
                    user
                  })
                );
              })
          }
          return Promise.reject(error);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
