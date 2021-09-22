import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid } from '@material-ui/core';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

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
  const [projFilterComp, projFilter] = useFilter({ items: filteredProjects, label: 'project', multiple: true, resetField: orgFilter });
  const filteredDashboards = useMemo(
    () =>
      dashboards.filter((d) => {
        if (orgFilter) {
          if (projFilter.length) {
            return projFilter.includes(d._id);
          } else {
            return d.organization === orgFilter;
          }
        }
        return true;
      }),
    [dashboards, projFilter, orgFilter]
  );
  const [cards, setCards] = useState(filteredDashboards);

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = cards[dragIndex];
      cards.splice(dragIndex, 1);
      cards.splice(hoverIndex, 0, dragCard);
      setCards(cards);
    },
    [cards]
  );

  useEffect(() => {
    dispatch(getDashboards());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setTimeout(() => setCards(filteredDashboards));
  }, [filteredDashboards]);

  return (
    <main className={classes.root}>
      <PageHeader title={LINKS.DASHBOARD.TITLE} links={NAV_LINKS} />
      <Box display="flex" alignItems="center" justifyContent="flex-end" mb={4}>
        <Box>{orgFilterComp}</Box>
        <Box ml={4}>{projFilterComp}</Box>
      </Box>

      <DndProvider backend={HTML5Backend}>
        <Grid container spacing={6}>
          {cards.map((data, index) => (
            <DashboardCard data={data} id={data._id} key={data._id} index={index} moveCard={moveCard} />
          ))}
        </Grid>
      </DndProvider>
    </main>
  );
};

export default memo(DashboardList);
