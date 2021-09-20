import React, { memo, useState, useEffect, useMemo } from 'react';
import { Box, Grid } from '@material-ui/core';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import PhaseItem from './PhaseItem';
import PhaseBox from './PhaseBox';
import { getCondition } from './helpers';
import useStyles from './styles';
import BufferBox from './PhaseBox/BufferBox';

const PhasesListView = ({ project, metaSystems }) => {
  const classes = useStyles();
  const [metasystems, setMetasystems] = useState([]);

  useEffect(() => {
    setMetasystems(metaSystems);
  }, [metaSystems]);

  const returnItemsForColumn = (newProjectPhase) =>
    metasystems
      .filter(({ projectPhase }) => getCondition(projectPhase, newProjectPhase))
      .map((ms) => (
        <Grid key={ms._id} item xs={12}>
          <PhaseItem item={ms} projectId={project._id} setItems={setMetasystems} />
        </Grid>
      ));

  const unassignedSystems = useMemo(
    () =>
      metasystems
        .filter(({ projectPhase }) => !projectPhase)
        .map((ms) => (
          <Grid key={ms._id} item xs={2}>
            <PhaseItem item={ms} projectId={project._id} setItems={setMetasystems} />
          </Grid>
        )),
    [metasystems, project]
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <Box>
        <BufferBox fields={unassignedSystems} />
      </Box>
      <Grid className={classes.container} container>
        {project.phases.length > 0 &&
          project.phases.map((phase) => (
            <Grid className={classes.phaseContainer} key={phase._id} item xs={12} sm={6} md={3}>
              <PhaseBox phase={phase} fields={returnItemsForColumn(phase._id)} />
            </Grid>
          ))}
      </Grid>
    </DndProvider>
  );
};

export default memo(PhasesListView);
