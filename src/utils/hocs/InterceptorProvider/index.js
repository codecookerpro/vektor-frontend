import React, { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';

import axios from 'services/axios';

const InterceptorProvider = () => {
  const { accessToken, passwordResetToken } = useSelector((state) => state.auth);

  useEffect(() => {
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          return Promise.reject(error);
        }
      }
    );
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
