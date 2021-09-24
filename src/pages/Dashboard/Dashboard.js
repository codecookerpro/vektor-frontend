import React, { memo, useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid } from '@material-ui/core';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { arrayMoveImmutable } from 'array-move';

import PageHeader from 'parts/PageHeader';
import LINKS from 'utils/constants/links';
import { getDashboards } from 'redux/actions/dashboards';
import { DashboardCard } from './components';
import { useFilter } from 'utils/hooks';
import { editProject } from 'redux/actions/projects';

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
      dashboards
        .filter((d) => {
          if (orgFilter) {
            if (projFilter.length) {
              return projFilter.includes(d._id);
            } else {
              return d.organization === orgFilter;
            }
          }
          return true;
        })
        .sort((a, b) => a.orderIndex - b.orderIndex),
    [dashboards, projFilter, orgFilter]
  );
  const [cards, setCards] = useState(filteredDashboards);

  const moveCard = (dragId, hoverId) => {
    setCards((cards) => {
      const dragIndex = cards.findIndex((c) => c._id === dragId);
      const hoverIndex = cards.findIndex((c) => c._id === hoverId);
      return arrayMoveImmutable(cards, dragIndex, hoverIndex);
    });
  };

  const handleDrop = () => {
    cards
      .map((c, idx) => ({ ...c, tmpOrderIndex: idx }))
      .filter((c, idx) => c.orderIndex !== idx)
      .forEach(({ _id, tmpOrderIndex }) => dispatch(editProject({ _id, orderIndex: tmpOrderIndex })));
    setCards(cards.map((c, idx) => ({ ...c, orderIndex: idx })));
  };

  useEffect(() => {
    dispatch(getDashboards());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const orderSum = filteredDashboards.reduce((sum, d) => sum + d.orderIndex, 0);
      setCards(orderSum ? filteredDashboards : filteredDashboards.map((d, idx) => ({ ...d, orderIndex: idx })));
    });
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
          {cards.map((data) => (
            <DashboardCard data={data} key={data._id} moveCard={moveCard} onDrop={handleDrop} />
          ))}
        </Grid>
      </DndProvider>
    </main>
  );
};

export default memo(DashboardList);
