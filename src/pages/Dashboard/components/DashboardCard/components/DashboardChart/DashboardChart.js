import React, { memo } from 'react';
import styled, { withTheme } from 'styled-components/macro';
import { orange, red } from '@material-ui/core/colors';
import { Typography } from '@material-ui/core';
import { Doughnut } from 'react-chartjs-2';

const ChartWrapper = styled.div`
  height: 168px;
  position: relative;
`;

const DoughnutInner = styled.div`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 0;
  margin-top: -22px;
  text-align: center;
  z-index: 0;
`;

const DashboardChart = ({ theme }) => {
  const data = {
    labels: ['Social', 'Search Engines', 'Direct', 'Other'],
    datasets: [
      {
        data: [260, 125, 54, 146],
        backgroundColor: [theme.palette.secondary.main, red[500], orange[500], theme.palette.grey[200]],
        borderWidth: 5,
        borderColor: theme.palette.background.paper,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    cutoutPercentage: 80,
  };

  return (
    <ChartWrapper>
      <DoughnutInner variant="h4">
        <Typography variant="h4">+27%</Typography>
        <Typography variant="caption">more sales</Typography>
      </DoughnutInner>
      <Doughnut data={data} options={options} />
    </ChartWrapper>
  );
};

export default memo(withTheme(DashboardChart));
