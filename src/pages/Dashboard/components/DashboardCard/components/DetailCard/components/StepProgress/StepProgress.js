import React, { memo } from 'react';
import { Box, Card, CardContent, Typography, Stepper } from '@material-ui/core';
import { StyledStep, StyledStepConnector, StyledStepLabel, CustomStepIcon } from './components';

const StepProgress = ({ label, activeStep = 0, steps = [] }) => {
  return (
    <Box position="relative">
      <Card mb={6} pt={2}>
        <CardContent>
          <Typography variant="h6" gutterBottom mt={3} mb={0}>
            {label}
          </Typography>
          <Box position="relative" style={{ margin: '30px 10px 0px  10px' }}>
            <Stepper activeStep={activeStep} connector={<StyledStepConnector steps={steps} />}>
              {steps.map((len) => (
                <StyledStep key={len} length={len}>
                  <StyledStepLabel StepIconComponent={CustomStepIcon} />
                </StyledStep>
              ))}
            </Stepper>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default memo(StepProgress);
