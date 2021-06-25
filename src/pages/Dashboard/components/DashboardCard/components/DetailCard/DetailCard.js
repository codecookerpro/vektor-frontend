import React, { memo, useMemo } from 'react';
import { Grid } from '@material-ui/core';
import { LineProgress, StepProgress } from './components';

const DetailCard = ({ data }) => {
  const { phases, nMetaSystems, nCompletedMetaSystems, plannedHours, workedHours } = data;
  const { steps, activeStep } = useMemo(() => {
    const currentDate = new Date().getTime();
    const milestones = [...phases.map(({ end }) => new Date(end).getTime()), currentDate].sort();
    const activeStep = milestones.findIndex((m) => m === currentDate);
    let steps = milestones.map((m) => m - milestones[0]);
    steps = steps.map((s) => (s * 100) / steps[steps.length - 1]);

    return { steps, activeStep };
  }, [phases]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <LineProgress label="Completed vs Total Systems" completed={nCompletedMetaSystems} total={nMetaSystems} />
      </Grid>
      <Grid item xs={12}>
        <LineProgress label="Worked vs Planned Hours" completed={workedHours} total={plannedHours} />
      </Grid>
      <Grid item xs={12}>
        <StepProgress label="Milestones" steps={steps} activeStep={activeStep} />
      </Grid>
    </Grid>
  );
};

export default memo(DetailCard);
