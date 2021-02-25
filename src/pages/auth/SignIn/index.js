import React, { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import {
  Checkbox,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles'

import { setUserToken } from 'redux/actions/authActions';
import Logo from 'components/Logo';
import ContainedButton from 'components/UI/Buttons/ContainedButton'
import LinkButton from 'components/UI/Buttons/LinkButton'
import {
  EMAIL_VALID,
  PASSWORD_VALID
} from 'utils/constants/validations';
import LINKS from 'utils/constants/links';

const useStyles = makeStyles((theme) => ({
  input: {
    margin: theme.spacing(2, 0)
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    backgroundColor: theme.palette.primary.main,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    padding: theme.spacing(4, 0)
  },
  container: {
    padding: theme.spacing(10),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(6)
    }
  },
  forget: {
    color: theme.custom.palette.lightGreen
  }
}));

const schema = yup.object().shape({
  email: EMAIL_VALID,
  password: PASSWORD_VALID
});

function SignIn() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [errorMessage, setErrorMessage] = useState('');
  const [remember, setRemember] = useState(false);

  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      const params = {
        email: data.email,
        password: data.password
      }

      console.log(params);
      const accessToken = 'Bearer dfasdfafeoeifjeofjeofjeofjeofjoejfoejfoefjoeif'
      const user = {
        email: data.email,
        name: 'Admin',
        password: data.password
      }
      await dispatch(
        setUserToken({
          accessToken,
          user
        })
      );
      history.push(LINKS.OVERVIEW.HREF);
    } catch (error) {
      if (error.response) {
        const { data: { message } } = error.response;
        setErrorMessage(message);
      }
    }
  };

  return (
    <Paper>
      <Helmet title='Sign In' />
      <div className={classes.logoContainer}>
        <Logo />
      </div>

      <div className={classes.container}>
        <Typography component='h1' variant='h4' align='center' gutterBottom>
          Welcome back!
        </Typography>
        <Typography component='h2' variant='body1' align='center'>
          Sign in to your account to continue
        </Typography>

        {errorMessage && (
          <Alert mt={2} mb={1} severity='warning' className={classes.input}>
            {errorMessage}
          </Alert>
        )}

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
          <Controller
            as={<TextField />}
            fullWidth
            type='password'
            name='password'
            label='Password'
            my={2}
            error={!!errors.password?.message}
            helperText={errors.password?.message}
            control={control}
            className={classes.input}
            defaultValue=''
          />
          <FormControlLabel
            control={
              <Checkbox
                value={remember}
                color='primary'
                onChange={(event) => setRemember(event.target.checked)}
              />
            }
            label='Remember me'
            className={classes.input}
          />
          <ContainedButton
            fullWidth
            type='submit'
          >
            Sign in
          </ContainedButton>
          <LinkButton
            fullWidth
            to='/auth/reset-password'
            className={classes.forget}
          >
            Forgot password
          </LinkButton>
        </form>
      </div>
    </Paper>
  );
}

export default memo(SignIn);
