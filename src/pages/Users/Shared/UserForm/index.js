import React, { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Card, CardContent, Grid, Button, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

import * as userAPI from 'services/api-user'
import {
  addUser,
  editUser,
  removeUser
} from 'redux/actions/users';
import VektorTextField from 'components/UI/TextFields/VektorTextField';
import FilterSelect from 'components/UI/Selects/FilterSelect';
import {
  STRING_INPUT_VALID,
  SELECT_VALID,
  EMAIL_VALID,
  PASSWORD_VALID
} from 'utils/constants/validations';
import LINKS from 'utils/constants/links';
import useLoading from 'utils/hooks/useLoading'
import { isEmpty } from 'utils/helpers/utility'

const useStyles = makeStyles((theme) => ({
  alert: {
    marginBottom: theme.spacing(4),
  },
  name: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: theme.spacing(3),
  },
  form: {
    marginBottom: theme.spacing(6),
  },
  buttonContainer: {
    display: 'flex',
  },
  delete: {
    marginLeft: 'auto',
    backgroundColor: theme.custom.palette.red,
  },
}));

const schema = yup.object().shape({
  email: EMAIL_VALID,
  name: STRING_INPUT_VALID,
  organization: SELECT_VALID,
  group: SELECT_VALID,
  password: PASSWORD_VALID,
});

const UserForm = ({ user = {} }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { changeLoadingStatus } = useLoading()

  const { results: organizations = [] } = useSelector(state => state.organizations);
  const [errorMessage, setErrorMessage] = useState('');

  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    changeLoadingStatus(true)
    try {
      let params = {
        email: data.email,
        name: data.name,
        organization: data.organization,
        password: data.password,
      };

      if (isEmpty(user)) {
        const response = await userAPI.createUser(params);
        dispatch(addUser(response.data))
      } else {
        params = {
          _id: user._id,
          ...params
        }
        const response = await userAPI.updateUser(params);
        dispatch(editUser(response.data))
      }
      history.push(LINKS.USERS.HREF);
    } catch (error) {
      if (error.response) {
        const {
          data: { message },
        } = error.response;
        setErrorMessage(message);
      }
    }
    changeLoadingStatus(false)
  };

  const deleteHandler = async () => {
    changeLoadingStatus(true)
    try {
      await userAPI.deleteUser({ _id: user._id });
      dispatch(removeUser(user))
      history.push(LINKS.USERS.HREF);
    } catch (error) {
      if (error.response) {
        const {
          data: { message },
        } = error.response;
        setErrorMessage(message);
      }
    }
    changeLoadingStatus(false)
  };

  return (
    <Card>
      <CardContent>
        {errorMessage && (
          <Alert mt={2} mb={1} severity='warning' className={classes.alert}>
            {errorMessage}
          </Alert>
        )}
        <Typography variant='h6' className={classes.name}>
          {user?.name || 'New user'}
        </Typography>
        <form noValidate className={classes.form}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6} md={3}>
              <Controller
                as={<VektorTextField />}
                fullWidth
                name='email'
                label='Email'
                placeholder='Email'
                error={errors.email?.message}
                control={control}
                defaultValue={user?.email || ''}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Controller
                as={<FilterSelect />}
                fullWidth
                name='organization'
                label='Organization'
                placeholder='Select organization'
                items={organizations}
                keys={{
                  label: 'name',
                  value: '_id',
                }}
                error={errors.organization?.message}
                control={control}
                defaultValue={user?.organization || ''}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Controller
                as={<VektorTextField />}
                fullWidth
                name='name'
                label='Name'
                placeholder='Name'
                error={errors.name?.message}
                control={control}
                defaultValue={user?.name || ''}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Controller
                as={<FilterSelect />}
                fullWidth
                name='group'
                label='Group'
                placeholder='Select Group'
                items={organizations}
                keys={{
                  label: 'name',
                  value: '_id',
                }}
                error={errors.group?.message}
                control={control}
                defaultValue={user?.group || ''}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Controller
                as={<VektorTextField />}
                fullWidth
                name='password'
                label='Password'
                placeholder='Password'
                error={errors.password?.message}
                control={control}
                defaultValue={user?.password || ''}
              />
            </Grid>
            <Grid item xs={12}>
              <div className={classes.buttonContainer}>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={handleSubmit(onSubmit)}
                >
                  Save
                </Button>
                {
                  !isEmpty(user) &&
                  <Button
                    color='primary'
                    variant='contained'
                    className={classes.delete}
                    onClick={deleteHandler}
                  >
                    Delete
                  </Button>
                }
              </div>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default memo(UserForm);
