import React, { memo } from 'react';
import styled, { withTheme } from 'styled-components/macro';
import { Grid as MuiGrid } from '@material-ui/core';
import { spacing } from '@material-ui/system';
import {
  Briefcase,
  User,
  Users
} from 'react-feather';

import OverviewCardLayout from '../Shared/OverviewCardLayout'

const Grid = styled(MuiGrid)(spacing);

const AboutIcon = styled.span`
  display: flex;
  padding-right: ${(props) => props.theme.spacing(2)}px;

  svg {
    width: 14px;
    height: 14px;
  }
`;

function OverviewUserCard() {

  return (
    <OverviewCardLayout
      title='Users'
      chip='User Management'
    >
      <Grid container direction='row' alignItems='center' mb={2}>
        <Grid item>
          <AboutIcon>
            <User />
          </AboutIcon>
        </Grid>
        <Grid item>
          38 Users
        </Grid>
      </Grid>
      <Grid container direction='row' alignItems='center' mb={2}>
        <Grid item>
          <AboutIcon>
            <Briefcase />
          </AboutIcon>
        </Grid>
        <Grid item>
          12 Organizations
        </Grid>
      </Grid>
      <Grid container direction='row' alignItems='center'>
        <Grid item>
          <AboutIcon>
            <Users />
          </AboutIcon>
        </Grid>
        <Grid item>
          5 Groups
        </Grid>
      </Grid>
    </OverviewCardLayout>
  );
}

export default memo(withTheme(OverviewUserCard));
