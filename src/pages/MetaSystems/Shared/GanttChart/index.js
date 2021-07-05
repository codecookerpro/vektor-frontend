import React, { memo, useState, useMemo, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import GoogleChart from 'react-google-charts';
import { ColorButton } from 'components/UI/Buttons';

import { deliverablesToGanttData } from './helper';
import { GANTT_HEADER, GANTT_OPTIONS } from './constants';
import { isEmpty } from 'utils/helpers/utility';

const GanttChart = ({ deliverables }) => {
  const [toggled, toggleChart] = useState(false);
  const chartData = useMemo(() => deliverablesToGanttData(deliverables), [deliverables]);
  const chartHeight = useMemo(() => `${deliverables.length * 45}px`, [deliverables]);
  const disabled = useMemo(() => isEmpty(chartData), [chartData]);
  useEffect(() => disabled && toggleChart(false), [disabled]);

  return (
    <Card>
      <CardHeader
        title="Gantt Chart"
        action={
          <ColorButton colour="lightGreen" onClick={() => toggleChart(!toggled)} disabled={disabled}>
            {disabled ? 'No data' : toggled ? 'Hide' : 'Show'}
          </ColorButton>
        }
      />
      {toggled ? (
        <CardContent>
          <GoogleChart
            chartType="Gantt"
            height={chartHeight}
            loader={<div>Loading Chart</div>}
            data={[GANTT_HEADER, ...chartData]}
            options={GANTT_OPTIONS}
          />
        </CardContent>
      ) : null}
    </Card>
  );
};

export default memo(GanttChart);
