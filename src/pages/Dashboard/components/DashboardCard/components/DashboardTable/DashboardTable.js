import React, { memo, useMemo } from 'react';
import { Grid, Box } from '@material-ui/core';
import { isEmpty } from 'utils/helpers/utility';

const DashboardTable = ({ phases }) => {
  const noPhase = useMemo(() => isEmpty(phases) || phases.length === 0, [phases]);

  return (
    <Box my={3}>
      <Grid container spacing={1} direction="column" justify="center" alignItems="center">
        <Grid item>
          <Box component="h3">{noPhase ? 'NO PHASES' : phases[0].name}</Box>
        </Grid>
        {phases.map((p) => (
          <Grid item key={p.name}>
            {p.name}: {p.nMetaSystems}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default memo(DashboardTable);
