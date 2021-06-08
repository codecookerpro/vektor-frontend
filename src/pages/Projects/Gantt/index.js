import { Typography } from '@material-ui/core';
import { deliverables, header, options } from './helper';
import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chart from 'react-google-charts';

import PageHeader from 'parts/PageHeader';
import LINKS from 'utils/constants/links';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  chartContainer: {},
}));

const NAV_LINKS = [LINKS.PROJECT_MANAGEMENT];

const chartEvents = [
  {
    callback: ({ chartWrapper, google }) => {
      const chart = chartWrapper.getChart();
      chart.container.addEventListener('click', (ev) => console.log(ev));
      chart.container.addEventListener('select', (ev) => console.log(ev));
    },
    eventName: 'ready',
  },
];

const Gantt = () => {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      <PageHeader title={LINKS.PROJECT_GANTT.TITLE} links={NAV_LINKS} />
      <div className={classes.chartContainer}>
        <Typography variant="h3" color="textPrimary">
          System 1
        </Typography>
        <Chart
          chartType="Gantt"
          height={deliverables.length * 45 + 'px'}
          loader={<div>Loading Chart</div>}
          data={[header, ...deliverables]}
          options={options}
          chartEvents={chartEvents}
        />
        <Typography variant="h3" color="textPrimary">
          System 2
        </Typography>
        <Chart
          chartType="Gantt"
          height={deliverables.length * 45 + 'px'}
          loader={<div>Loading Chart</div>}
          data={[header, ...deliverables]}
          options={options}
          chartEvents={chartEvents}
        />
      </div>
    </main>
  );
};

export default memo(Gantt);
