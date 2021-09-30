import React, { memo, useMemo } from 'react';
import { Box, Grid, makeStyles } from '@material-ui/core';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import PhaseBox from './PhaseBox';
import BufferBox from './PhaseBox/BufferBox';
import { round } from 'utils/helpers/utility';

const useStyles = makeStyles(() => ({
  container: {
    position: 'relative',
    overflowX: 'auto',
    flexWrap: 'nowrap',
    maxWidth: 'calc(100vw - 331px)',
  },
  phaseContainer: {
    paddingTop: 12,
    paddingRight: 12,
    '&:last-child': {
      paddingRight: 0,
    },
  },
}));

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

  return (
    <DndProvider backend={HTML5Backend}>
      <Box>
        <BufferBox systems={metaSystems.filter(({ projectPhase }) => !projectPhase)} />
      </Box>
      <Grid className={classes.container} container>
        {phases.map((phase) => (
          <Grid className={classes.phaseContainer} key={phase._id} item xs={12} sm={6} md={3}>
            <PhaseBox phase={phase} status={phase.status} systems={metaSystems.filter(({ projectPhase }) => phase._id === projectPhase)} />
          </Grid>
        ))}
      </Grid>
    </DndProvider>
  );
};

export default memo(PhasesListView);
