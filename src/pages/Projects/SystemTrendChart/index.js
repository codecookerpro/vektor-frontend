import React, { memo, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardContent, IconButton } from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { makeStyles } from '@material-ui/core/styles';
import { MoreVertical } from 'react-feather';
import { Line } from 'react-chartjs-2';

import PageHeader from 'parts/PageHeader';
import LINKS from 'utils/constants/links';
import results from 'utils/temp/projects';
import theme from 'theme';

const data = (canvas) => {
  const ctx = canvas.getContext('2d');

  const gradient = ctx.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, fade(theme.palette.secondary.main, 0.0875));
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

  return {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Sales ($)',
        fill: true,
        backgroundColor: gradient,
        borderColor: theme.palette.secondary.main,
        data: [2115, 1562, 1584, 1892, 1587, 1923, 2566, 2448, 2805, 3438, 2917, 3327],
      },
    ],
  };
};

const options = {
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  tooltips: {
    intersect: false,
  },
  hover: {
    intersect: true,
  },
  plugins: {
    filler: {
      propagate: false,
    },
  },
  scales: {
    xAxes: [
      {
        reverse: true,
        gridLines: {
          color: 'rgba(0,0,0,0.0)',
        },
        ticks: {
          fontColor: theme.palette.text.secondary,
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          stepSize: 500,
          fontColor: theme.palette.text.secondary,
        },
        display: true,
        borderDash: [5, 5],
        gridLines: {
          color: 'rgba(0,0,0,0.0375)',
          fontColor: '#fff',
        },
      },
    ],
  },
};

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(7.5),
  },
}));

const SystemTrendChart = () => {
  const classes = useStyles();
  const { id } = useParams();

  const project = useMemo(() => results.find((item) => item.id === id), [id]);
  const NAV_LINKS = [
    LINKS.PROJECT_MANAGEMENT,
    LINKS.PROJECTS,
    {
      HREF: LINKS.EDIT_PROJECT.HREF.replace(':id', id),
      TITLE: project?.name || 'Not Found',
    },
  ];

  return (
    <>
      <PageHeader title={`${LINKS.SYSTEM_TREND_CHART.TITLE}: ${project?.name || 'Not Found'}`} links={NAV_LINKS} />
      <Card className={classes.root}>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVertical />
            </IconButton>
          }
          title="System Trend Chart"
        />
        <CardContent>
          <div>
            <Line data={data} options={options} />
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default memo(SystemTrendChart);
