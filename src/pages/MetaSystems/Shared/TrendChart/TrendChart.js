import React, { memo, useState } from 'react';

import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import Chart from 'react-google-charts';

import { useTrendChartData } from './helpers';
import { CHART_OPTIONS } from './constants';
import { ColorButton } from 'components/UI/Buttons';

const TrendChart = () => {
  const [toggled, toggleChart] = useState(false);
  const { projectId, systemId } = useParams();
  const { chartData } = useTrendChartData(projectId, systemId);

  return (
    <Card>
      <CardHeader
        title="Gantt Chart"
        action={
          <ColorButton colour="lightGreen" level={300} onClick={() => toggleChart(!toggled)}>
            {toggled ? 'Hide Chart' : 'See Chart'}
          </ColorButton>
        }
      />
      {toggled ? (
        <CardContent>
          {chartData.length > 0 ? (
            <Chart width="100%" height="600px" chartType="LineChart" loader={<div>Loading Chart</div>} data={chartData} options={CHART_OPTIONS} />
          ) : (
            'No data'
          )}
        </CardContent>
      ) : null}
    </Card>
  );
};

export default memo(TrendChart);
