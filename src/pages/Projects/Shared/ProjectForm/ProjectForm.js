import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { Controller } from 'react-hook-form';
import { Card, CardContent, Grid, Button, Typography } from '@material-ui/core';

import VektorTextField from 'components/UI/TextFields/VektorTextField';
import FilterSelect from 'components/UI/Selects/FilterSelect';
import UserTransfer from 'parts/UserTransfer';

import { useProjectFrom, useVisibilityBooleans } from './helpers';
import { useStyles } from './styles';

const ProjectForm = ({ project = {}, mode }) => {
  const classes = useStyles();
  const { errors, control, PMs, supervizors, filteresUsers, assignedUserList, organization, handleAssignedUsers, onSubmit, setCurrentOrganization } =
    useProjectFrom(project, mode);
  const { isOrganizationVisible, isSupervizorVisible } = useVisibilityBooleans(organization, mode);
  const { results: organizations } = useSelector(({ organizations }) => organizations);

  console.log('allOrgs', organizations);

  return (
    <Card>
      <CardContent>
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

            {isOrganizationVisible && (
              <Grid item xs={12} sm={6} md={3}>
                <Controller
                  as={<FilterSelect keys={{ label: 'name', value: '_id' }} />}
                  fullWidth
                  name="organization"
                  label="Organization"
                  placeholder="Select organization"
                  items={organizations}
                  error={errors.organization?.message}
                  control={control}
                  onClick={({ target }) => setCurrentOrganization(target?.value)}
                  defaultValue={project?.organization || ''}
                />
              </Grid>
            )}

            <Grid item xs={12} sm={6} md={isOrganizationVisible ? 3 : false}>
              <Controller
                as={<FilterSelect keys={{ label: 'name', value: '_id' }} />}
                fullWidth
                name="projectManager"
                label="PM"
                placeholder="Select PM"
                items={PMs}
                error={errors.pm?.message}
                control={control}
                defaultValue={project?.pm || ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              {isSupervizorVisible && (
                <Controller
                  as={<FilterSelect keys={{ label: 'name', value: '_id' }} />}
                  fullWidth
                  name="supervisor"
                  label="Supervisor"
                  placeholder="Select supervisor"
                  items={supervizors}
                  error={errors.supervisor?.message}
                  control={control}
                  defaultValue={project?.supervisor || ''}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              <UserTransfer users={filteresUsers} assignedUsers={assignedUserList} onAssignedUsers={handleAssignedUsers} />
            </Grid>
            <Grid item xs={12}>
              <div className={classes.buttonContainer}>
                <Button variant="contained" color="primary" onClick={onSubmit(false)}>
                  Save
                </Button>
                <Button color="primary" className={classes.addAnother} onClick={onSubmit(true)}>
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
