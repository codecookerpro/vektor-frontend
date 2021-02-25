import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

import ContainedButton from 'components/UI/Buttons/ContainedButton'
import DashboardChart from './DashboardChart'
import DashboardTable from './DashboardTable'
import LINKS from 'utils/constants/links';

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2, 0)
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  button: {
    marginTop: theme.spacing(2),
  }
}));

const DashboardCard = ({
  showButton = false
}) => {
  const classes = useStyles();
  const history = useHistory()

  const detailHandler = () => {
    history.push(LINKS.DASHBOARD_DETAIL.HREF.replace(':id', 'Voxsync'))
  }

  return (
    <Card mb={3} className={classes.card}>
      <CardHeader title='Voxsync' />
      <CardContent className={classes.cardContent}>
        <DashboardChart />
        <DashboardTable />
        {
          showButton &&
          <ContainedButton
            className={classes.button}
            onClick={detailHandler}
          >
            More Detail
          </ContainedButton>
        }
      </CardContent>
    </Card>
  );
};

export default memo(DashboardCard);
