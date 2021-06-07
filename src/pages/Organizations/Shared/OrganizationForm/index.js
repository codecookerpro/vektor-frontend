import React, { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import joi from 'joi';
import { Card, CardContent, Grid, Button, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

import { createOrganization, removeOrganization, updateOrganization } from 'redux/actions/organizations';
import VektorTextField from 'components/UI/TextFields/VektorTextField';
import { STRING_INPUT_VALID } from 'utils/constants/validations';
import LINKS from 'utils/constants/links';
import { isEmpty } from 'utils/helpers/utility';
import useLoading from 'utils/hooks/useLoading';

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
  departmentsBtn: {
    marginTop: theme.spacing(3),
  },
  delete: {
    marginLeft: 'auto',
    backgroundColor: theme.custom.palette.red,
  },
  departmentInput: {
    marginTop: theme.spacing(6),
  },
  departmentsBlock: {
    marginBottom: theme.spacing(6),
    marginTop: theme.spacing(6),
    border: `1px solid ${theme.custom.palette.border}`,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
  },
}));

const schema = joi.object().keys({
  name: STRING_INPUT_VALID,
});

const OrganizationForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { changeLoadingStatus } = useLoading();
  const [errorMessage, setErrorMessage] = useState('');
  const { organization = {} } = useSelector((state) => {
    return state.organizations;
  });
  const { control, handleSubmit, errors } = useForm({
    resolver: joiResolver(schema),
  });

  const onSubmit = async (data) => {
    changeLoadingStatus(true);
    try {
      let params = {
        name: data.name,
      };
      if (isEmpty(organization)) {
        dispatch(createOrganization(params));
      } else {
        params = {
          _id: organization._id,
          ...params,
        };
        dispatch(updateOrganization(params));
      }
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
      dispatch(removeOrganization(organization));
      history.push(LINKS.ORGANIZATIONS.HREF);
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
          {organization?.name || 'New Organization'}
        </Typography>
        <form noValidate className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Controller
                as={<VektorTextField />}
                fullWidth
                name="name"
                label="Name"
                placeholder="Name"
                error={errors.name?.message}
                control={control}
                defaultValue={organization?.name || ''}
              />
            </Grid>
            <Grid item xs={12}>
              <div className={classes.buttonContainer}>
                <Button variant="contained" color="primary" type="submit">
                  Save Changes
                </Button>
                {!isEmpty(organization) && (
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

export default memo(OrganizationForm);
