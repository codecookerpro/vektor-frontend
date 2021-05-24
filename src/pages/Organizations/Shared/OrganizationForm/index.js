import React, { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Card, CardContent, Grid, Button, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

import * as organizationAPI from 'services/api-organization';
import { addOrganization, editOrganization, removeOrganization } from 'redux/actions/organizations';
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
  delete: {
    marginLeft: 'auto',
    backgroundColor: theme.custom.palette.red,
  },
}));

const schema = yup.object().shape({
  name: STRING_INPUT_VALID,
});

const OrganizationForm = ({ organization = {} }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { changeLoadingStatus } = useLoading();

  const [errorMessage, setErrorMessage] = useState('');

  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    changeLoadingStatus(true);
    try {
      let params = {
        name: data.name,
      };

      if (isEmpty(organization)) {
        const response = await organizationAPI.createOrganization(params);
        dispatch(addOrganization(response.data));
      } else {
        params = {
          _id: organization._id,
          ...params,
        };
        const response = await organizationAPI.updateOrganization(params);
        dispatch(editOrganization(response.data));
      }
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

  const deleteHandler = async () => {
    changeLoadingStatus(true);
    try {
      await organizationAPI.deleteOrganization({ _id: organization._id });
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
