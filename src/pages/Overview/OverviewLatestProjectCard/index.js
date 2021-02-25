import React, { memo } from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

import ContainedButton from 'components/UI/Buttons/ContainedButton'
import DashboardChart from 'parts/DashboardCard/DashboardChart'
import OverviewCardLayout from '../Shared/OverviewCardLayout'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(6)
  },
  title: {
    padding: theme.spacing(6, 0)
  }
}));

function OverviewLatestProjectCard() {
  const classes = useStyles();

  return (
    <OverviewCardLayout
      title='Latest Project'
      description='Genzyme'
      chip='Project Management'
    >
      <div className={classes.container}>
        <DashboardChart />
        <Typography
          variant='body2'
          align='center'
          className={classes.title}
        >
          Design/Engineering
        </Typography>
        <ContainedButton>
          More Detail
        </ContainedButton>
      </div>
    </OverviewCardLayout>
  );
}

export default memo(OverviewLatestProjectCard);
