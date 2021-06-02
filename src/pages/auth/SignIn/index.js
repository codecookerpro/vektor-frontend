import React, { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import joi from 'joi';

import { Checkbox, FormControlLabel, TextField } from '@material-ui/core';

import * as authAPI from 'services/api-auth';
import { setUserToken } from 'redux/actions/authActions';
import ContainedButton from 'components/UI/Buttons/ContainedButton';
import LinkButton from 'components/UI/Buttons/LinkButton';
import { errorCode2Message } from 'utils/helpers/errorCode2Message';
import AuthWrapper, { authPageStyles } from '../Shared/AuthWrapper';
import { EMAIL_VALID, PASSWORD_VALID } from 'utils/constants/validations';
import LINKS from 'utils/constants/links';
import { LOCAL_SIGN_IN_ERRORS } from 'utils/constants/error-codes';
import { setPopup } from 'redux/actions/popupActions';
import { POPUP_TYPE } from 'utils/constants/popupType';

const schema = joi.object().keys({
  email: EMAIL_VALID,
  password: PASSWORD_VALID,
});

function SignIn() {
  const classes = authPageStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [errorMessage] = useState('');
  const [remember, setRemember] = useState(false);
  const { control, handleSubmit, errors, reset } = useForm({ resolver: joiResolver(schema) });

  const onSubmit = async (data) => {
    await authAPI
      .login(data)
      .then((resp) => {
        const { accessToken, refreshToken, data: user } = resp;
        dispatch(setUserToken({ accessToken, refreshToken, user, remember }));
        history.push(LINKS.OVERVIEW.HREF);
      })
      .catch((err) => {
        dispatch(setPopup({ popupType: POPUP_TYPE.ERROR, popupText: errorCode2Message(err?.response?.data?.code, LOCAL_SIGN_IN_ERRORS) }));
        reset({ email: '', password: '' });
      });
  };

  return (
    <AuthWrapper helmet="Sign In" title="Welcome back!" subtitle="Sign in to your account to continue" errorMessage={errorMessage}>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Controller
          as={<TextField />}
          fullWidth
          type="email"
          name="email"
          label="Email Address"
          my={2}
          error={!!errors.email?.message}
          helperText={errors.email?.message}
          control={control}
          className={classes.input}
          defaultValue=""
        />
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
        <FormControlLabel
          control={<Checkbox value={remember} color="primary" onChange={(event) => setRemember(event.target.checked)} />}
          label="Remember me"
          className={classes.input}
        />
        <ContainedButton fullWidth type="submit">
          Sign in
        </ContainedButton>
        <LinkButton fullWidth to="/auth/forgot-password" className={classes.link}>
          Forgot password
        </LinkButton>
      </form>
    </AuthWrapper>
  );
}

export default memo(SignIn);
