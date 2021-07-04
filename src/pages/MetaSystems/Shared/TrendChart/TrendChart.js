import React, { memo, useEffect, useState, useMemo } from 'react';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import Chart from 'react-google-charts';

import { useTrendChartData } from './helpers';
import { CHART_OPTIONS } from './constants';
import { ColorButton } from 'components/UI/Buttons';
import { isEmpty } from 'utils/helpers/utility';

const TrendChart = ({ title, projectId, systemId }) => {
  const [toggled, toggleChart] = useState(false);
  const { chartData } = useTrendChartData(projectId, systemId);
  const disabled = useMemo(() => isEmpty(chartData), [chartData]);

  useEffect(() => disabled && toggleChart(false), [disabled]);

  return (
    <Card>
      <CardHeader
        title={title}
        action={
          <ColorButton colour="lightGreen" onClick={() => toggleChart(!toggled)} disabled={disabled}>
            {disabled ? 'No data' : toggled ? 'Hide' : 'Show'}
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
