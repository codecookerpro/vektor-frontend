import React, { memo, useState, useMemo } from 'react';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import GoogleChart from 'react-google-charts';
import { ColorButton } from 'components/UI/Buttons';

import { deliverablesToGanttData } from './helper';
import { GANTT_HEADER, GANTT_OPTIONS } from './constants';

const GanttChart = ({ deliverables }) => {
  const [toggled, toggleChart] = useState(false);
  const chartData = useMemo(() => deliverablesToGanttData(deliverables), [deliverables]);
  const chartHeight = useMemo(() => `${deliverables.length * 45}px`, [deliverables]);

  return (
    <Card>
      <CardHeader
        title="Gantt Chart"
        action={
          <ColorButton colour="lightGreen" level={300} onClick={() => toggleChart(!toggled)}>
            {toggled ? 'Hide' : 'Show'}
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
