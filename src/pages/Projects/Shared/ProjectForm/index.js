import React, { memo, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import joi from 'joi';
import { Card, CardContent, Grid, Button, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

import VektorTextField from 'components/UI/TextFields/VektorTextField';
import FilterSelect from 'components/UI/Selects/FilterSelect';
import UserTransfer from 'parts/UserTransfer';
import { STRING_INPUT_VALID, SELECT_VALID, INTEGER_VALID } from 'utils/constants/validations';
import LINKS from 'utils/constants/links';
import ORGANIZATIONS from 'utils/temp/organizations';

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
}));

const schema = joi.object().keys({
  name: STRING_INPUT_VALID,
  number: INTEGER_VALID,
  organization: SELECT_VALID,
  pm: SELECT_VALID,
  supervisor: SELECT_VALID,
  template: SELECT_VALID,
});

const ProjectForm = ({ users = [], project = {}, setSelectedOrganization }) => {
  const classes = useStyles();
  const history = useHistory();

  const [errorMessage, setErrorMessage] = useState('');

  const { control, handleSubmit, errors, reset, watch } = useForm({
    resolver: joiResolver(schema),
  });

  const watchOrganization = watch('organization');

  const onSubmit = (addNew) => async (data) => {
    try {
      const params = {
        name: data.name,
        number: data.number,
        organization: data.organization,
        pm: data.pm,
        supervisor: data.supervisor,
        template: data.template,
      };

      if (addNew) {
        reset({
          name: '',
          number: '',
          organization: '',
          pm: '',
          supervisor: '',
          template: '',
        });
      } else {
        history.push(LINKS.PROJECTS.HREF);
      }
    } catch (error) {
      if (error.response) {
        const {
          data: { message },
        } = error.response;
        setErrorMessage(message);
      }
    }
  };

  useEffect(() => {
    setSelectedOrganization(watchOrganization);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchOrganization]);

  return (
    <Card>
      <CardContent>
        {errorMessage && (
          <Alert mt={2} mb={1} severity="warning" className={classes.alert}>
            {errorMessage}
          </Alert>
        )}

        <Typography variant="h6" className={classes.name}>
          {project?.name || 'New Project'}
        </Typography>

        <form noValidate className={classes.form}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6}>
              <Controller
                as={<VektorTextField />}
                fullWidth
                name="name"
                label="Name"
                placeholder="Name"
                error={errors.name?.message}
                control={control}
                defaultValue={project?.name || ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                as={<VektorTextField />}
                fullWidth
                name="number"
                label="Number"
                placeholder="Number"
                error={errors.number?.message}
                control={control}
                defaultValue={project?.number || ''}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Controller
                as={<FilterSelect />}
                fullWidth
                name="organization"
                label="Organization"
                placeholder="Select organization"
                items={ORGANIZATIONS}
                error={errors.organization?.message}
                control={control}
                defaultValue={project?.organization?.id || ''}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Controller
                as={<FilterSelect />}
                fullWidth
                name="pm"
                label="PM"
                placeholder="Select PM"
                items={ORGANIZATIONS}
                error={errors.pm?.message}
                control={control}
                defaultValue={project?.pm || ''}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Controller
                as={<FilterSelect />}
                fullWidth
                name="supervisor"
                label="Supervisor"
                placeholder="Select supervisor"
                items={ORGANIZATIONS}
                error={errors.supervisor?.message}
                control={control}
                defaultValue={project?.supervisor || ''}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Controller
                as={<FilterSelect />}
                fullWidth
                name="template"
                label="Phase set template:"
                placeholder="Select template"
                items={ORGANIZATIONS}
                error={errors.template?.message}
                control={control}
                defaultValue={project?.template || ''}
              />
            </Grid>
            <Grid item xs={12}>
              <UserTransfer users={users} />
            </Grid>
            <Grid item xs={12}>
              <div className={classes.buttonContainer}>
                <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit(false))}>
                  Save
                </Button>
                <Button color="primary" className={classes.addAnother} onClick={handleSubmit(onSubmit(true))}>
                  Save and add another
                </Button>
              </div>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default memo(ProjectForm);
