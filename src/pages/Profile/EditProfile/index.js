import React, { memo } from 'react';
import ProfileForm from './ProfileForm';
import styled from 'styled-components/macro';
import { Helmet } from 'react-helmet';
import { Grid, Divider as MuiDivider, Typography as MuiTypography } from '@material-ui/core';
import { spacing } from '@material-ui/system';

const Divider = styled(MuiDivider)(spacing);

const Typography = styled(MuiTypography)(spacing);

const EditProfile = () => {
  return (
    <>
      <>
        <Helmet title="Analytics Dashboard" />
        <Grid justify="space-between" container spacing={6}>
          <Grid item>
            <Typography variant="h3" gutterBottom>
              Update profile
            </Typography>
          </Grid>
        </Grid>
        <Divider my={6} />
        <ProfileForm />
      </>
    </>
  );
};

export default memo(EditProfile);
