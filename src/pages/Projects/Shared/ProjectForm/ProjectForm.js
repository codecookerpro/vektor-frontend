import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { Controller } from 'react-hook-form';
import { Card, CardContent, Grid, Button, Typography } from '@material-ui/core';

import { ColorButton } from 'components/UI/Buttons';
import VektorTextField from 'components/UI/TextFields/VektorTextField';
import FilterSelect from 'components/UI/Selects/FilterSelect';
import UserTransfer from 'parts/UserTransfer';

import { useProjectFrom, useVisibilityBooleans } from './helpers';
import { PROJECT_DEFAULT_VALUES } from './constants';
import useStyles from './styles';

const ProjectForm = ({ project = PROJECT_DEFAULT_VALUES, mode }) => {
  const classes = useStyles();
  const {
    errors,
    control,
    PMs,
    supervisors,
    filteresUsers,
    assignedUserList,
    organization,
    handleAssignedUsers,
    onSubmit,
    onDeleteProject,
    setCurrentOrganization,
  } = useProjectFrom(project, mode);
  const { isOrganizationVisible, isSupervisorVisible, isViewingMode, isCreationMode, isButtonEnabled } = useVisibilityBooleans(organization, mode);
  const { results: organizations } = useSelector(({ organizations }) => organizations);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" className={classes.name}>
          {project.name || 'New Project'}
        </Typography>

        <form noValidate className={classes.form}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6}>
              <Controller
                id="name"
                as={<VektorTextField />}
                fullWidth
                name="name"
                label="Name"
                placeholder="Name"
                error={errors.name?.message}
                control={control}
                defaultValue={project.name}
                disabled={isViewingMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                id="number"
                as={<VektorTextField />}
                fullWidth
                name="number"
                label="Number"
                placeholder="Number"
                error={errors.number?.message}
                control={control}
                defaultValue={project.number}
                disabled={isViewingMode}
              />
            </Grid>

            {isOrganizationVisible && (
              <Grid item xs={12} sm={6} md={3}>
                <Controller
                  id="organization"
                  as={<FilterSelect keys={{ label: 'name', value: '_id' }} />}
                  fullWidth
                  name="organization"
                  label="Organization"
                  placeholder="Select organization"
                  items={organizations}
                  error={errors.organization?.message}
                  control={control}
                  onClick={({ target }) => setCurrentOrganization(target?.value)}
                  defaultValue={project.organization}
                  disabled={isViewingMode}
                />
              </Grid>
            )}

            <Grid item xs={12} sm={6} md={isOrganizationVisible ? 3 : false}>
              <Controller
                id="projectManager"
                as={<FilterSelect keys={{ label: 'name', value: '_id' }} />}
                fullWidth
                name="projectManager"
                label="PM"
                placeholder="Select PM"
                items={PMs}
                error={errors.pm?.message}
                control={control}
                defaultValue={project.projectManager}
                disabled={isViewingMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              {isSupervisorVisible && (
                <Controller
                  id="supervisor"
                  as={<FilterSelect keys={{ label: 'name', value: '_id' }} />}
                  fullWidth
                  name="supervisor"
                  label="Supervisor"
                  placeholder="Select supervisor"
                  items={supervisors}
                  error={errors.supervisor?.message}
                  control={control}
                  defaultValue={project.supervisor}
                  disabled={isViewingMode}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              <UserTransfer
                users={filteresUsers}
                assignedUsers={assignedUserList}
                onAssignedUsers={handleAssignedUsers}
                isViewingMode={isViewingMode}
              />
            </Grid>
            <Grid item xs={12}>
              {isButtonEnabled && (
                <div className={classes.buttonContainer}>
                  {!isViewingMode && (
                    <>
                      <Button variant="contained" color="primary" onClick={onSubmit(false)}>
                        Save
                      </Button>
                      <ColorButton className={classes.deleteButton} variant="contained" colour="red" onClick={onDeleteProject}>
                        Delete Project
                      </ColorButton>
                    </>
                  )}
                  {isCreationMode && (
                    <Button color="primary" className={classes.addAnother} onClick={onSubmit(true)}>
                      Save and add another
                    </Button>
                  )}
                </div>
              )}
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default memo(ProjectForm);
