import React, { memo, useMemo } from 'react';
import styled from 'styled-components/macro';
import { Box, Card as MuiCard, CardContent, LinearProgress as MuiLinearProgress, Typography } from '@material-ui/core';
import { spacing } from '@material-ui/system';
import { makeStyles } from '@material-ui/core/styles';

const Card = styled(MuiCard)(spacing);

const LinearProgress = styled(MuiLinearProgress)(spacing);

const useStyles = makeStyles((theme) => ({
  normal: {
    backgroundColor: theme.custom.palette.lightGreen,
  },
  overflow: {
    backgroundColor: theme.custom.palette.red,
  },
}));

const LineProgress = ({ label, completed, total }) => {
  const classes = useStyles();
  const percent = useMemo(() => {
    const value = (completed * 100) / total;
    return value > 100 ? 100 : value;
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
              barColorPrimary: total < completed ? classes.overflow : classes.normal,
            }}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default memo(LineProgress);
