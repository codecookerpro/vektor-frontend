import React, { memo, useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { DashboardChart, DashboardTable, DetailCard } from './components';
import { ColorButton } from 'components/UI/Buttons';

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2, 0),
  },
  cardNoPhases: {
    padding: theme.spacing(2, 0),
    '& *': {
      color: 'lightgray',
    },
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '400px',
  },
  button: {
    marginTop: 'auto',
  },
}));

const DashboardCard = ({ data }) => {
  const classes = useStyles();
  const [toggledDetail, toggleDetail] = useState(false);
  const noPhases = useMemo(() => data.phases.length === 0, [data]);

  const detailHandler = () => {
    toggleDetail(!toggledDetail);
  };

  return (
    <Grid item xs={toggledDetail ? 12 : 6} md={toggledDetail ? 9 : 3} lg={toggledDetail ? 6 : 2}>
      <Grid container spacing={6}>
        <Grid item xs={toggledDetail ? 4 : 12}>
          <Card mb={3} className={noPhases ? classes.cardNoPhases : classes.card}>
            <CardHeader title={data.name} />
            <CardContent className={classes.cardContent}>
              <DashboardChart data={data} />
              <DashboardTable phases={data.phases} />
              {noPhases === false && (
                <ColorButton className={classes.button} colour="lightGreen" onClick={detailHandler}>
                  {toggledDetail ? 'Hide Details' : 'More Details'}
                </ColorButton>
              )}
            </CardContent>
          </Card>
        </Grid>
        {toggledDetail && (
          <Grid item xs={8}>
            <DetailCard data={data} />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default memo(DashboardCard);
