import React, { memo, useState } from 'react';
import { Card, CardContent, CardHeader, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import DashboardChart from './DashboardChart';
import DashboardTable from './DashboardTable';
import { ColorButton } from 'components/UI/Buttons';
import LineProgress from 'parts/LineProgress';

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2, 0),
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const DashboardCard = ({ item }) => {
  const classes = useStyles();
  const [toggledDetail, toggleDetail] = useState(false);

  const detailHandler = () => {
    toggleDetail(!toggledDetail);
  };

  return (
    <Grid item xs={12} md={6} lg={toggledDetail ? 6 : 3}>
      <Grid container spacing={6}>
        <Grid item xs={toggledDetail ? 6 : 12}>
          <Card mb={3} className={classes.card}>
            <CardHeader title={item.name} />
            <CardContent className={classes.cardContent}>
              <DashboardChart />
              <DashboardTable />
              <ColorButton className={classes.button} colour="lightGreen" onClick={detailHandler}>
                {toggledDetail ? 'Hide Details' : 'More Details'}
              </ColorButton>
            </CardContent>
          </Card>
        </Grid>
        {toggledDetail && (
          <Grid item xs={6}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <LineProgress label="Completed vs Total Systems" completed={1} total={2} />
              </Grid>
              <Grid item xs={12}>
                <LineProgress label="Worked vs Planned Hours" completed={12} total={16} />
              </Grid>
              <Grid item xs={12}>
                <LineProgress label="Milestones" completed={3} total={4} />
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default memo(DashboardCard);
