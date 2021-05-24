import React, { memo } from 'react';
import styled from 'styled-components/macro';
import { Helmet } from 'react-helmet';
import { Grid, Divider as MuiDivider, Typography as MuiTypography } from '@material-ui/core';
import { spacing } from '@material-ui/system';

import ContainedButton from 'components/UI/Buttons/ContainedButton';

const Divider = styled(MuiDivider)(spacing);

const Typography = styled(MuiTypography)(spacing);

function OverviewHeader() {
  return (
    <>
      <Helmet title="Analytics Dashboard" />
      <Grid justify="space-between" container spacing={6}>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            Welcome to Vektor DynamixE, real-time Project Status Panel
          </Typography>
        </Grid>

        <Grid item>
          <ContainedButton>New Action</ContainedButton>
        </Grid>
      </Grid>

      <Divider my={6} />
    </>
  );
}

export default memo(OverviewHeader);
