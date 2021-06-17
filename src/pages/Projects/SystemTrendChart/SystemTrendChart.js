import React, { memo } from 'react';

import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardContent, IconButton } from '@material-ui/core';
import { MoreVertical } from 'react-feather';
import Chart from 'react-google-charts';

import PageHeader from 'parts/PageHeader';
import LINKS from 'utils/constants/links';

import useStyles from './styles';
import { useSystemTrendChartData, getNavLinks } from './helpers';
import { CHART_OPTIONS } from './constants';

const SystemTrendChart = () => {
  const classes = useStyles();
  const { id } = useParams();
  const { name, chartData } = useSystemTrendChartData(id);

  return (
    <>
      <PageHeader title={`${LINKS.SYSTEM_TREND_CHART.TITLE}: ${name || 'Not Found'}`} links={getNavLinks(name, id)} />
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
          {chartData.length > 1 ? (
            <Chart width="100%" height="600px" chartType="LineChart" loader={<div>Loading Chart</div>} data={chartData} options={CHART_OPTIONS} />
          ) : (
            'No data'
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default memo(SystemTrendChart);
