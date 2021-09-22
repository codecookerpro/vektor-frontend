import React, { memo, useMemo } from 'react';
import { Box, Grid } from '@material-ui/core';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import PhaseItem from './PhaseItem';
import PhaseBox from './PhaseBox';
import { getCondition } from './helpers';
import useStyles from './styles';
import BufferBox from './PhaseBox/BufferBox';
import { round } from 'utils/helpers/utility';

const PhasesListView = ({ project, metaSystems }) => {
  const classes = useStyles();
  const phases = useMemo(
    () =>
      (project?.phases || []).map((p) => {
        const phaseSystems = metaSystems.filter((m) => m.projectPhase === p._id);
        if (phaseSystems.length) {
          const sum = phaseSystems.reduce((acc, system) => acc + parseFloat(system.mainSystem.status), 0);
          return {
            ...p,
            status: round(sum / phaseSystems.length, 2),
          };
        } else {
          return { ...p, status: 0 };
        }
      }),
    [project, metaSystems]
  );

  const returnItemsForColumn = (newProjectPhase) =>
    metaSystems
      .filter(({ projectPhase }) => getCondition(projectPhase, newProjectPhase))
      .map((ms) => (
        <Grid key={ms._id} item xs={12}>
          <PhaseItem item={ms} projectId={project._id} />
        </Grid>
      ));

  const unassignedSystems = useMemo(
    () =>
      metaSystems
        .filter(({ projectPhase }) => !projectPhase)
        .map((ms) => (
          <Grid key={ms._id} item xs={2}>
            <PhaseItem item={ms} projectId={project._id} />
          </Grid>
        )),
    [metaSystems, project]
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <Box>
        <BufferBox fields={unassignedSystems} />
      </Box>
      <Grid className={classes.container} container>
        {phases.map((phase) => (
          <Grid className={classes.phaseContainer} key={phase._id} item xs={12} sm={6} md={3}>
            <PhaseBox phase={phase} status={phase.status} fields={returnItemsForColumn(phase._id)} />
          </Grid>
        ))}
      </Grid>
    </DndProvider>
  );
};

export default memo(PhasesListView);
