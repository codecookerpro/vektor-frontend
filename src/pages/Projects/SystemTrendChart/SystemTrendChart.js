import React, { memo } from 'react';

import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardContent, IconButton } from '@material-ui/core';
import { MoreVertical } from 'react-feather';
import Chart from 'react-google-charts';

import PageHeader from 'parts/PageHeader';

import useStyles from './styles';
import { useTrendChartData, getNavLinks } from './helpers';
import { CHART_OPTIONS } from './constants';

const SystemTrendChart = () => {
  const classes = useStyles();
  const { projectId, systemId } = useParams();
  const { projectName, systemName, title, chartData } = useTrendChartData(projectId, systemId);

  return (
    <>
      <PageHeader title={`${title}: ${projectName || 'Not Found'}`} links={getNavLinks(projectName, projectId, systemName, systemId)} />
      <Card className={classes.root}>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVertical />
            </IconButton>
          }
          title={title}
        />
        <CardContent>
          {chartData.length > 0 ? (
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
