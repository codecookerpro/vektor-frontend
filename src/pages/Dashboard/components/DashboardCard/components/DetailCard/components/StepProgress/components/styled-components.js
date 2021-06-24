import { withStyles } from '@material-ui/core/styles';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';

export const StyledStepConnector = withStyles({
  root: {
    position: 'absolute',
    left: ({ steps, index }) => `calc(${steps[index - 1]}%)`,
    width: ({ steps, index }) => `calc(${steps[index] - steps[index - 1]}%)`,
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

export const StyledStep = withStyles({
  root: {
    position: 'absolute',
    left: ({ length }) => `calc(${length}% - 10px)`,
  },
  horizontal: {
    padding: 0,
  },
})(Step);

export const StyledStepLabel = withStyles({
  iconContainer: {
    padding: 0,
  },
})(StepLabel);
