import React, { memo } from 'react';
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    alignItems: 'center',
  },
  assetsId: {
    width: 30,
    height: 30,
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.spacing(2),
    margin: theme.spacing(2),
  },
  summeryReport: {
    width: 30,
    height: 30,
    backgroundColor: theme.custom.palette.lightGreen,
    borderRadius: theme.spacing(2),
    margin: theme.spacing(2),
  },
}));

const LegendCard = () => {
  const classes = useStyles();

  return (
    <Card>
      <CardHeader title="Legend" />
      <CardContent className={classes.content}>
        <div className={classes.assetsId} />
        <Typography variant="body2" color="textSecondary">
          Asset Id
        </Typography>
        <div className={classes.summeryReport} />
        <Typography variant="body2" color="textSecondary">
          Summery Report
        </Typography>
      </CardContent>
    </Card>
  );
};

export default memo(LegendCard);
