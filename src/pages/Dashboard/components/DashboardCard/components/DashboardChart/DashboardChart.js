import React, { memo, useMemo } from 'react';
import styled, { withTheme } from 'styled-components/macro';
import { grey, orange, red, yellow } from '@material-ui/core/colors';
import { Typography } from '@material-ui/core';
import { Doughnut } from 'react-chartjs-2';
import moment from 'moment';
import { DASHBOARD_CHART_OPTIONS } from './constants';

const ChartWrapper = styled.div`
  height: 150px;
  position: relative;
`;

const DoughnutInner = styled.div`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 0;
  margin-top: -11px;
  text-align: center;
  z-index: 0;
`;

const DashboardChart = ({ theme, data }) => {
  const { phases = [], status = 0 } = data;
  const color = useMemo(() => {
    if (phases.length === 0) {
      return grey[200];
    }

    let currentPhase = phases[0];
    phases.reverse().forEach((p) => {
      if (p.plannedValue >= status) {
        currentPhase = p;
      }
    });

    const today = moment().startOf('day');
    const endDate = moment(currentPhase.end);

    if (currentPhase.plannedValue > status && endDate >= today) {
      return yellow[500];
    } else if (currentPhase.plannedValue > status && endDate < today) {
      return red[500];
    } else {
      return orange[500];
    }
  }, [phases, status]);

  const chartData = {
    labels: ['Total', 'Complated'],
    datasets: [
      {
        data: [status, 100 - status],
        backgroundColor: [color, grey[200]],
        borderWidth: 5,
        borderColor: theme.palette.background.paper,
      },
    ],
  };

  return (
    <ChartWrapper>
      <DoughnutInner variant="h4">
        <Typography variant="h4">{status}%</Typography>
      </DoughnutInner>
      <Doughnut data={chartData} options={DASHBOARD_CHART_OPTIONS} />
    </ChartWrapper>
  );
};

export default memo(withTheme(DashboardChart));
