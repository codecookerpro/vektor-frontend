import React, { memo, useMemo } from 'react';
import styled from 'styled-components/macro';
import { Box, Card as MuiCard, CardContent, LinearProgress as MuiLinearProgress, Typography } from '@material-ui/core';
import { spacing } from '@material-ui/system';
import { makeStyles } from '@material-ui/core/styles';

const Card = styled(MuiCard)(spacing);

const LinearProgress = styled(MuiLinearProgress)(spacing);

const useStyles = makeStyles((theme) => ({
  green: {
    backgroundColor: theme.custom.palette.lightGreen,
  },
  red: {
    backgroundColor: theme.custom.palette.red,
  },
}));

const LineProgress = ({ label, completed, total }) => {
  const classes = useStyles();
  const overflowed = useMemo(() => completed > total, [completed, total]);
  const percent = useMemo(() => {
    const offset = completed - total;
    if (offset > 0) {
      return (offset * 100) / completed;
    } else {
      return (completed * 100) / total;
    }
  }, [completed, total]);

  return (
    <Box position="relative">
      <Card mb={6} pt={2}>
        <CardContent>
          <Typography variant="h6" gutterBottom mt={3} mb={0}>
            {label}
          </Typography>
          <Typography variant="body2" gutterBottom mt={3} mb={0}>
            {`${completed} / ${total}`}
          </Typography>

          <LinearProgress
            variant="determinate"
            value={percent}
            color="primary"
            mt={4}
            classes={{
              barColorPrimary: overflowed ? classes.red : classes.green,
              colorPrimary: overflowed ? classes.green : null,
            }}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default memo(LineProgress);
