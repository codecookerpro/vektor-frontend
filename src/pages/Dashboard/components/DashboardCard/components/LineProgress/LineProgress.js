import React, { memo } from 'react';
import styled from 'styled-components/macro';
import { Box, Card as MuiCard, CardContent, LinearProgress as MuiLinearProgress, Typography } from '@material-ui/core';
import { spacing } from '@material-ui/system';
import { makeStyles } from '@material-ui/core/styles';

const Card = styled(MuiCard)(spacing);

const LinearProgress = styled(MuiLinearProgress)(spacing);

const useStyles = makeStyles((theme) => ({
  barColorPrimary: {
    backgroundColor: theme.custom.palette.lightGreen,
  },
}));

const LineProgress = ({ label, completed, total }) => {
  const classes = useStyles();

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
            value={(completed * 100) / total}
            color="primary"
            mt={4}
            classes={{
              barColorPrimary: classes.barColorPrimary,
            }}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default memo(LineProgress);
