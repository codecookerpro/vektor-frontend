import React, { memo } from 'react';
import styled from 'styled-components/macro';
import { Box, Card as MuiCard, CardContent, Typography } from '@material-ui/core';
import { spacing } from '@material-ui/system';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import clsx from 'clsx';

const Card = styled(MuiCard)(spacing);

const CustomConnector = withStyles({
  alternativeLabel: {
    top: 8,
    left: 'calc(-50%)',
    right: 'calc(50%)',
  },
  active: {
    '& $line': {
      background: '#4d84c0',
    },
  },
  completed: {
    '& $line': {
      background: '#4d84c0',
    },
  },
  line: {
    height: 5,
    border: 0,
    backgroundColor: '#eaeaf0',
  },
})(StepConnector);

const useCustomStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 20,
    height: 20,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    background: '#a6b884',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    background: '#4d84c0',
  },
});

function CustomStepIcon(props) {
  const classes = useCustomStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    ></div>
  );
}

const useStyles = makeStyles((theme) => ({
  stepper: {
    padding: theme.spacing(6, 0),
  },
}));

const LineProgress = ({ label }) => {
  const steps = ['A', 'B', 'C', 'D'];
  const classes = useStyles();

  return (
    <Box position="relative">
      <Card mb={6} pt={2}>
        <CardContent>
          <Typography variant="h6" gutterBottom mt={3} mb={0}>
            {label}
          </Typography>
          <Stepper alternativeLabel activeStep={1} connector={<CustomConnector />} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={CustomStepIcon}>{label} </StepLabel>
              </Step>
            ))}
          </Stepper>
        </CardContent>
      </Card>
    </Box>
  );
};

export default memo(LineProgress);
