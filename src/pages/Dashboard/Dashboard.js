import React, { memo, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid } from '@material-ui/core';

import { getDashboards } from 'redux/actions/dashboards';
import PageHeader from 'parts/PageHeader';
import { DashboardCard } from './components';
import LINKS from 'utils/constants/links';
import { useFilter } from 'utils/hooks';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

const NAV_LINKS = [LINKS.PROJECT_MANAGEMENT];

const DashboardList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const dashboards = useSelector((state) => state.dashboards.results);
  const projects = useSelector((state) => state.dashboards.projectList);
  const [orgFilterComp, orgFilter] = useFilter({ by: 'organizations.results', label: 'organization' });
  const filteredProjects = useMemo(() => projects.filter((p) => !orgFilter || p.organization === orgFilter), [projects, orgFilter]);
  const [projFilterComp, projFilter] = useFilter({ items: filteredProjects, label: 'project', multiple: true });
  const filteredDashboards = useMemo(
    () => dashboards.filter((d) => (!projFilter.length && (!orgFilter || d.organization === orgFilter)) || projFilter.includes(d._id)),
    [dashboards, projFilter, orgFilter]
  );

  useEffect(() => {
    dispatch(getDashboards());
    // eslint-disable-next-line
  }, []);

  return (
    <main className={classes.root}>
      <PageHeader title={LINKS.DASHBOARD.TITLE} links={NAV_LINKS} />
      <Box display="flex" alignItems="center" justifyContent="flex-end" mb={4}>
        <Box>{orgFilterComp}</Box>
        <Box ml={4}>{projFilterComp}</Box>
      </Box>
      <Grid container spacing={6}>
        {filteredDashboards.map((data, index) => (
          <DashboardCard data={data} key={index} />
        ))}
      </Grid>
    </main>
  );
};

export default memo(DashboardList);
