import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import {
  Paper,
  Typography,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles'

import Logo from 'components/Logo';

const authPageStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  input: {
    margin: theme.spacing(2, 0),
    whiteSpace: 'pre-line',
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    backgroundColor: theme.palette.primary.main,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    padding: theme.spacing(4, 0)
  },
  container: {
    padding: theme.spacing(10),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(6)
    }
  },
  link: {
    marginTop: theme.spacing(2),
    color: theme.custom.palette.lightGreen
  }
}));

const AuthWrapper = ({
  helmet = '',
  title = '',
  subtitle = '',
  errorMessage = '',
  children
}) => {
  const classes = authPageStyles();

  return (
    <Paper className={classes.root}>
      <Helmet title={helmet} />
      <div className={classes.logoContainer}>
        <Logo />
      </div>

      <div className={classes.container}>
        <Typography component='h1' variant='h4' align='center' gutterBottom>
          {title}
        </Typography>
        <Typography component='h2' variant='body1' align='center'>
          {subtitle}
        </Typography>

        {errorMessage && (
          <Alert mt={2} mb={1} severity='warning' className={classes.input}>
            {errorMessage}
          </Alert>
        )}

        {children}
      </div>
    </Paper>
  );
}

export { authPageStyles };
export default memo(AuthWrapper);
