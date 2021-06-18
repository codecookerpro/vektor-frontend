import React, { memo, useEffect, useState } from 'react';
import { useStyles } from './styles';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import { Controller } from 'react-hook-form';
import VektorTextField from 'components/UI/TextFields/VektorTextField';
import FilterSelect from 'components/UI/Selects/FilterSelect';
import { useSelector } from 'react-redux';
import { FORM_MODE } from 'utils/constants';

const NewSow = ({ mode, sow = {}, control, errors, isOrganizationVisible }) => {
  const classes = useStyles();
  const { results: projects, organization } = useSelector(({ projects }) => projects);
  const { results: organizations } = useSelector(({ organizations }) => organizations);
  const [filterSystems, setFilterSystems] = useState([]);

  useEffect(() => {
    if (mode === FORM_MODE.update) {
      setCurrentOrganization(sow.organization);
    }
    // eslint-disable-next-line
  }, [sow]);

  useEffect(() => {
    if (!isOrganizationVisible) {
      let filterSystem = [];
      projects.forEach((project) => {
        const { name, metaSystems, _id } = project;
        filterSystem = [...filterSystem, ...metaSystems.map((system) => ({ name: `${name}-${system}`, id: `${system}/${_id}` }))];
      });
      setFilterSystems(filterSystem);
    }
  }, [isOrganizationVisible, projects]);

  const setCurrentOrganization = (event) => {
    const filterProjects = projects.filter((project) => project.organization === event);
    let filterSystem = [];
    filterProjects.forEach((project) => {
      const { name, metaSystems, _id } = project;
      filterSystem = [...filterSystem, ...metaSystems.map((system) => ({ name: `${name}-${system}`, id: `${system}/${_id}` }))];
    });
    setFilterSystems(filterSystem);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h6" className={classes.name}>
          {sow.name || 'New SOW'}
        </Typography>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6} md={4}>
            <Controller
              as={<VektorTextField />}
              fullWidth
              name="name"
              label="Name"
              placeholder="Name"
              error={errors.name?.message}
              control={control}
              defaultValue={sow?.name || ''}
            />
          </Grid>

          {isOrganizationVisible && mode === FORM_MODE.create && (
            <Grid item xs={12} sm={6} md={4}>
              <Controller
                as={<FilterSelect />}
                fullWidth
                name="organization"
                label="Organization"
                placeholder="Select organization"
                keys={{ label: 'name', value: '_id' }}
                items={organizations}
                error={errors.organization?.message}
                control={control}
                onClick={({ target }) => setCurrentOrganization(target?.value)}
                defaultValue={sow?.organization || isOrganizationVisible ? '' : organization}
              />
            </Grid>
          )}

          <Grid item xs={12} sm={6} md={4}>
            <Controller
              as={<FilterSelect />}
              fullWidth
              name="metaSystem"
              label="System"
              placeholder="Select system"
              keys={{ label: 'name', value: 'id' }}
              items={filterSystems}
              error={errors.metaSystem?.message}
              control={control}
              defaultValue={`${sow?.metaSystem}/${sow?.project}` || ''}
              disabled={!filterSystems.length}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default memo(NewSow);
