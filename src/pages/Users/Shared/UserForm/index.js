import React, { memo, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { Card, CardContent, Grid, Button, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

import * as userAPI from 'services/api-user';
import { addUser, editUser, removeUser } from 'redux/actions/users';
import VektorTextField from 'components/UI/TextFields/VektorTextField';
import FilterSelect from 'components/UI/Selects/FilterSelect';
import LINKS from 'utils/constants/links';
import { PERMISSION_TYPES, PERMISSIONS } from 'utils/constants';
import useLoading from 'utils/hooks/useLoading';
import { isEmpty } from 'utils/helpers/utility';
import { FORM_MODE } from 'utils/constants';
import setSchema from './setSchema';

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

const UserForm = ({ user = {}, mode }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { changeLoadingStatus } = useLoading();

  const { results: organizations = [] } = useSelector((state) => state.organizations);
  const [errorMessage, setErrorMessage] = useState('');
  const [changePassword, setChangePassword] = useState(mode === FORM_MODE.create);
  const [selectPermission, setSelectPermission] = useState(user?.permissions || '');
  const [selectOrganization, setSelectOrganization] = useState(user?.organization || '');
  const [selectDepartment, setSelectDepartment] = useState(user?.department || '');
  const departments = useMemo(() => organizations.find((o) => o._id === selectOrganization)?.departments || [], [organizations, selectOrganization]);
  const schema = setSchema(changePassword, selectPermission, selectDepartment);

  const { control, handleSubmit, errors } = useForm({
    resolver: joiResolver(schema),
  });

  useEffect(() => {
    if (!departments.length) {
      control.setValue('department', '');
    } else {
      control.setValue('department', user?.department);
    }
  }, [departments, control, user]);

  const onSubmit = async (data) => {
    changeLoadingStatus(true);
    try {
      let params = {
        email: data.email,
        name: data.name,
        organization: data.organization,
        permissions: data.permissions,
        department: data.department,
      };
      if (data.permissions === PERMISSION_TYPES.admin && selectOrganization) params.organization = selectOrganization;
      if (data.password) {
        params = {
          ...params,
          password: data.password,
        };
      }
      if (isEmpty(user)) {
        const response = await userAPI.createUser(params);
        dispatch(addUser(response.data));
      } else {
        params = {
          _id: user._id,
          ...params,
        };
        const response = await userAPI.updateUser(params);
        dispatch(editUser(response.data));
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
    changeLoadingStatus(false);
  };

  const deleteHandler = async () => {
    changeLoadingStatus(true);
    try {
      await userAPI.deleteUser({ _id: user._id });
      dispatch(removeUser(user));
      history.push(LINKS.USERS.HREF);
    } catch (error) {
      if (error.response) {
        const {
          data: { message },
        } = error.response;
        setErrorMessage(message);
      }
    }
    changeLoadingStatus(false);
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
          {user?.name || 'New user'}
        </Typography>
        <form noValidate className={classes.form}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6} md={3}>
              <Controller
                as={<VektorTextField />}
                id="email"
                fullWidth
                name="email"
                label="Email"
                placeholder="Email"
                error={errors.email?.message}
                control={control}
                defaultValue={user?.email || ''}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Controller
                as={<VektorTextField />}
                id="name"
                fullWidth
                name="name"
                label="Name"
                placeholder="Name"
                error={errors.name?.message}
                control={control}
                defaultValue={user?.name || ''}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Controller
                as={<FilterSelect />}
                fullWidth
                name="permissions"
                label="Group"
                placeholder="Select Group"
                items={PERMISSIONS}
                error={errors.permissions?.message}
                control={control}
                onClick={({ target }) => setSelectPermission(target?.value)}
                defaultValue={selectPermission}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              {selectPermission === PERMISSION_TYPES.admin ? (
                <FilterSelect
                  fullWidth
                  name="organization"
                  label="Organization"
                  placeholder="Select organization"
                  items={organizations}
                  keys={{
                    label: 'name',
                    value: '_id',
                  }}
                  value={selectOrganization}
                  onClick={({ target }) => setSelectOrganization(target?.value)}
                />
              ) : (
                <Controller
                  as={<FilterSelect />}
                  fullWidth
                  name="organization"
                  label="Organization"
                  placeholder="Select organization"
                  items={organizations}
                  keys={{
                    label: 'name',
                    value: '_id',
                  }}
                  error={errors.organization?.message}
                  control={control}
                  onClick={({ target }) => setSelectOrganization(target?.value)}
                  defaultValue={selectOrganization}
                />
              )}
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Controller
                as={<FilterSelect />}
                fullWidth
                name="department"
                label="Department"
                placeholder="Select department"
                items={departments}
                keys={{
                  label: 'label',
                  value: '_id',
                }}
                error={errors.department?.message}
                control={control}
                onClick={({ target }) => setSelectDepartment(target?.value)}
                defaultValue={selectDepartment}
              />
            </Grid>

            {mode === FORM_MODE.update && (
              <Grid item xs={12}>
                <Button variant="outlined" color="primary" onClick={() => setChangePassword(!changePassword)}>
                  {changePassword ? 'Hide password' : 'Change password'}
                </Button>
              </Grid>
            )}

            {changePassword && (
              <Grid item xs={12} sm={6} md={3}>
                <Controller
                  as={<VektorTextField />}
                  id="password"
                  fullWidth
                  name="password"
                  label="Password"
                  placeholder="Password"
                  error={errors.password?.message}
                  control={control}
                  defaultValue={''}
                />
              </Grid>
            )}

            <Grid item xs={12}>
              <div className={classes.buttonContainer}>
                <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
                  Save
                </Button>
                {!isEmpty(user) && (
                  <Button color="primary" variant="contained" className={classes.delete} onClick={deleteHandler}>
                    Delete
                  </Button>
                )}
              </div>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default memo(UserForm);
