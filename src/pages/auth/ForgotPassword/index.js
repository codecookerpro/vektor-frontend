import React, { memo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { TextField } from '@material-ui/core';

import * as authAPI from 'services/api-auth';
import ContainedButton from 'components/UI/Buttons/ContainedButton'
import LinkButton from 'components/UI/Buttons/LinkButton'
import AuthWrapper, { authPageStyles } from '../Shared/AuthWrapper'
import { EMAIL_VALID } from 'utils/constants/validations';
import LINKS from 'utils/constants/links';

const schema = yup.object().shape({
  email: EMAIL_VALID,
});

function ForgotPassword() {
  const classes = authPageStyles();
  const history = useHistory();

  const [errorMessage, setErrorMessage] = useState('');

  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      const params = {
        email: data.email,
      }

      await authAPI.restorePassword(params);
      history.push(LINKS.RESET_PASSWORD.HREF);
    } catch (error) {
      if (error.response) {
        const { data: { message } } = error.response;
        setErrorMessage(message);
      }
    }
  };

  return (
    <AuthWrapper
      helmet='Reset Password'
      title='Reset Password'
      errorMessage={errorMessage}
    >
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Controller
          as={<TextField />}
          fullWidth
          type='email'
          name='email'
          label='Email Address'
          my={2}
          error={!!errors.email?.message}
          helperText={errors.email?.message}
          control={control}
          className={classes.input}
          defaultValue=''
        />
        <ContainedButton
          fullWidth
          type='submit'
        >
          Send
        </ContainedButton>
        <LinkButton
          fullWidth
          to='/auth/sign-in'
          className={classes.link}
        >
          Log In
        </LinkButton>
      </form>
    </AuthWrapper>
  );
}

export default memo(ForgotPassword);
