import React, { memo, useState } from 'react';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import Chart from 'react-google-charts';

import { useTrendChartData } from './helpers';
import { CHART_OPTIONS } from './constants';
import { ColorButton } from 'components/UI/Buttons';

const TrendChart = ({ title, projectId, systemId }) => {
  const [toggled, toggleChart] = useState(false);
  const { chartData } = useTrendChartData(projectId, systemId);

  return (
    <Card>
      <CardHeader
        title={title}
        action={
          <ColorButton colour="lightGreen" level={300} onClick={() => toggleChart(!toggled)}>
            {toggled ? 'Hide' : 'Show'}
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
