import React, { memo, useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import PhaseItem from './PhaseItem';
import PhaseBox from './PhaseBox';
import { getCondition } from './helpers';
import useStyles from './styles';

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

  return (
    <DndProvider backend={HTML5Backend}>
      <Grid className={classes.container} container>
        <Grid className={classes.phaseContainer} item xs={12} sm={6} md={3}>
          <PhaseBox phase={{ orderIndex: 0, name: 'Buffer phase' }} fields={returnItemsForColumn()} />
        </Grid>
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
