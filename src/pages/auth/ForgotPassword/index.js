import React, { memo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { joiResolver } from '@hookform/resolvers/joi';
import joi from 'joi';

import { TextField } from '@material-ui/core';

import * as authAPI from 'services/api-auth';
import ContainedButton from 'components/UI/Buttons/ContainedButton';
import LinkButton from 'components/UI/Buttons/LinkButton';
import AuthWrapper, { authPageStyles } from '../Shared/AuthWrapper';
import { EMAIL_VALID } from 'utils/constants/validations';
import { setPopup } from 'redux/actions/popupActions';
import { POPUP_TYPE } from 'utils/constants/popupType';
import { POPUP_TEXT } from 'utils/constants/popupText';

const schema = joi.object().keys({
  email: EMAIL_VALID,
});

function ForgotPassword() {
  const dispatch = useDispatch();
  const classes = authPageStyles();

  const [errorMessage, setErrorMessage] = useState('');

  const { control, handleSubmit, errors } = useForm({
    resolver: joiResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const params = {
        email: data.email,
      };
      await authAPI.restorePassword(params);
      dispatch(setPopup({ popupType: POPUP_TYPE.INFO, popupText: POPUP_TEXT.INFO.FORGOT_PASSWORD }));
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

export default memo(ForgotPassword);
