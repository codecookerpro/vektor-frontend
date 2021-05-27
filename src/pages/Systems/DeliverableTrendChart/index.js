import React, { memo, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@material-ui/core';

import PageHeader from 'parts/PageHeader';
import ChartCard from './ChartCard';
import LegendCard from './LegendCard';
import LINKS from 'utils/constants/links';
import results from 'utils/temp/systems';

const DeliverableTrendChart = () => {
  const { id } = useParams();

  const system = useMemo(() => results.find((item) => item.id === id), [id]);
  const NAV_LINKS = [
    LINKS.PROJECT_MANAGEMENT,
    LINKS.SYSTEMS,
    {
      HREF: LINKS.EDIT_SYSTEM.HREF.replace(':id', id),
      TITLE: system?.name || 'Not Found',
    },
  ];

  return (
    <>
      <PageHeader title={`${LINKS.SYSTEM_TREND_CHART.TITLE}: ${system?.name || 'Not Found'}`} links={NAV_LINKS} />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <ChartCard />
        </Grid>
        <Grid item xs={12}>
          <LegendCard />
        </Grid>
      </Grid>
    </>
  );
};

export default memo(DeliverableTrendChart);
