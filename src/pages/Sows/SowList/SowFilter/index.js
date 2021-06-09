import React, { memo, useEffect, useState } from 'react';
import { Card, CardContent } from '@material-ui/core';
import FilterSelect from 'components/UI/Selects/FilterSelect';
import { useSelector } from 'react-redux';
import { useStyles } from './styles';

const SowFilters = ({ filter, setFilter }) => {
  const classes = useStyles();
  const { results: organizations = [] } = useSelector((state) => state.organizations);
  const { results: projects = [] } = useSelector((state) => state.projects);

  const initFilter = (data) => {
    return data.map((item) => ({ LABEL: item.name, VALUE: item._id }));
  };
  const [organizationFilter, setOrganizationFilter] = useState(() => initFilter(organizations));
  const [projectFilter, setProjectFilter] = useState(() => initFilter(projects));

  useEffect(() => {
    const filterOrganizations = organizations.map((organization) => ({ LABEL: organization.name, VALUE: organization._id }));
    setOrganizationFilter(filterOrganizations);
  }, [setOrganizationFilter, organizations]);

  useEffect(() => {
    const filterProjects = projects.map((project) => ({ LABEL: project.name, VALUE: project._id }));
    setProjectFilter(filterProjects);
  }, [setProjectFilter, projects]);

  const inputHandler = (event) => {
    setFilter((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <div className={classes.container}>
          <FilterSelect
            label="By organization"
            placeholder="All organizations"
            name="organization"
            items={organizationFilter}
            value={filter?.organization || ''}
            onChange={inputHandler}
            className={classes.input}
          />
          <FilterSelect
            label="By project manager"
            placeholder="All project managers"
            name="projectManager"
            items={[]}
            keys={{
              label: 'name',
              value: 'id',
            }}
            value={filter?.projectManager || ''}
            onChange={inputHandler}
            className={classes.input}
          />
          <FilterSelect
            label="By project name"
            placeholder="All project name"
            name="project"
            items={projectFilter}
            value={filter?.project || ''}
            onChange={inputHandler}
            className={classes.input}
          />
          <FilterSelect
            label="By vendor name"
            placeholder="All vendor names"
            name="vendorName"
            items={[]}
            keys={{
              label: 'name',
              value: 'id',
            }}
            value={filter?.vendorName || ''}
            onChange={inputHandler}
            className={classes.input}
          />
          <FilterSelect
            label="By MSA#"
            placeholder="All by MSA#"
            name="msa"
            items={[]}
            keys={{
              label: 'name',
              value: 'id',
            }}
            value={filter?.msa || ''}
            onChange={inputHandler}
            className={classes.input}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default memo(SowFilters);
