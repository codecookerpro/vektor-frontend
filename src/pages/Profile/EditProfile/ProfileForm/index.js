import React, { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import joi from 'joi';
import { Card, CardContent, Grid, Typography, InputAdornment, IconButton } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import * as userAPI from 'services/api-user';
import VektorTextField from 'components/UI/TextFields/VektorTextField';
import { PASSWORD_VALID } from 'utils/constants/validations';
import { errorCode2Message } from 'utils/helpers/errorCode2Message';
import useLoading from 'utils/hooks/useLoading';
import ContainedButton from 'components/UI/Buttons/ContainedButton';
import { setErrorPopup, setErrorPopupText } from 'redux/actions/errorsActions';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { LOCAL_CHANGE_PASSWORD_ERRORS } from 'utils/constants/error-codes';

const useStyles = makeStyles((theme) => ({
  alert: {
    marginBottom: theme.spacing(4),
  },
  name: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: theme.spacing(6),
  },
  form: {
    marginBottom: theme.spacing(6),
  },
  buttonContainer: {
    width: '100%',
  },
  formInput: {
    marginBottom: theme.spacing(2),
  },
}));

const schema = joi.object().keys({
  oldPassword: PASSWORD_VALID,
  newPassword: PASSWORD_VALID,
  repeatNewPassword: PASSWORD_VALID,
});

const TYPES_INPUT = [
  {
    LABEL: 'Old password',
    VALUE: 'oldPassword',
  },
  {
    LABEL: 'New password',
    VALUE: 'newPassword',
  },
  {
    LABEL: 'Repeat new password',
    VALUE: 'repeatNewPassword',
  },
];

const ProfileForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { changeLoadingStatus } = useLoading();

  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState({ oldPassword: false, newPassword: false, repeatNewPassword: false });

  const { control, handleSubmit, errors, reset } = useForm({ resolver: joiResolver(schema) });

  const onSubmit = async (data) => {
    changeLoadingStatus(true);
    const { oldPassword = '', newPassword = '', repeatNewPassword = '' } = data;

    if (newPassword !== repeatNewPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    const params = { password: oldPassword, newPassword };
    setErrorMessage('');

    await userAPI
      .changeUserPassword(params)
      .then(() => {
        // toDo: update error popup - make it a generic popup, add types (INVISIBLE (i.e. false in current implementation), ERROR, INFO) + add action that combines setText and setPopup to simplify code
        dispatch(setErrorPopupText('Password was changed'));
        dispatch(setErrorPopup(true));
      })
      .catch((err) => {
        dispatch(setErrorPopupText(errorCode2Message(err?.response?.data?.code, LOCAL_CHANGE_PASSWORD_ERRORS)));
        dispatch(setErrorPopup(true));
      });

    reset({ oldPassword: '', newPassword: '', repeatNewPassword: '' });
    setShowPassword({ oldPassword: false, newPassword: false, repeatNewPassword: false });

    changeLoadingStatus(false);
  };

  const handleClickShowPassword = (type) => {
    setShowPassword({ ...showPassword, [type]: !showPassword[type] });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Card>
      <CardContent>
        {errorMessage && (
          <Alert mt={2} mb={1} severity="warning" className={classes.alert}>
            {errorMessage}
          </Alert>
        )}
        <Typography variant="h6" className={classes.name}>
          Set new password
        </Typography>
        <form noValidate className={classes.form}>
          {TYPES_INPUT.map((input) => (
            <Grid container spacing={6}>
              <Grid item xs={12} sm={6} md={3}>
                <Controller
                  as={<VektorTextField />}
                  fullWidth
                  name={input.VALUE}
                  type={showPassword[input.VALUE] ? 'text' : 'password'}
                  placeholder={input.LABEL}
                  error={errors[input.VALUE]?.message}
                  control={control}
                  defaultValue={''}
                  className={classes.formInput}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => handleClickShowPassword(input.VALUE)}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword[input.VALUE] ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          ))}
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6} md={3}>
              <ContainedButton className={classes.buttonContainer} onClick={handleSubmit(onSubmit)}>
                Save changes
              </ContainedButton>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default memo(ProfileForm);
