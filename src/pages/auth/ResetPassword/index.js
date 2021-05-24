import React, { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField } from '@material-ui/core';

import * as authAPI from 'services/api-auth';
import { setPasswordResetToken } from 'redux/actions/authActions';
import ContainedButton from 'components/UI/Buttons/ContainedButton';
import LinkButton from 'components/UI/Buttons/LinkButton';
import AuthWrapper, { authPageStyles } from '../Shared/AuthWrapper';
import { PASSWORD_VALID } from 'utils/constants/validations';
import LINKS from 'utils/constants/links';

const schema = yup.object().shape({
  password: PASSWORD_VALID,
});

function ResetPassword() {
  const classes = authPageStyles();
  const dispatch = useDispatch();
  const { passwordResetToken } = useParams();
  const history = useHistory();

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    dispatch(setPasswordResetToken(passwordResetToken));
  }, [dispatch, passwordResetToken]);

  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const params = {
        newPassword: data.password,
      };

      await authAPI.changePassword(params);
      history.push(LINKS.SIGN_IN.HREF);
    } catch (error) {
      if (error.response) {
        const {
          data: { message },
        } = error.response;
        setErrorMessage(message);
      }
    }
  };

  return (
    <AuthWrapper helmet="Reset Password" title="Reset Password" errorMessage={errorMessage}>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Controller
          as={<TextField />}
          fullWidth
          type="password"
          name="password"
          label="Password"
          my={2}
          error={!!errors.password?.message}
          helperText={errors.password?.message}
          control={control}
          className={classes.input}
          defaultValue=""
        />
        <ContainedButton fullWidth type="submit">
          Send
        </ContainedButton>
        <LinkButton fullWidth to="/auth/sign-in" className={classes.link}>
          Log In
        </LinkButton>
      </form>
    </AuthWrapper>
  );
}

export default memo(ResetPassword);
