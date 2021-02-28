import React, { memo } from 'react';
import styled from 'styled-components/macro';
import {
  Box,
  Card,
  CardContent as MuiCardContent,
  Typography as MuiTypography,
} from '@material-ui/core';
import { spacing } from '@material-ui/system';

import VektorChip from 'components/VektorChip'

const Typography = styled(MuiTypography)(spacing);

const CardContent = styled(MuiCardContent)`
  position: relative;

  &:last-child {
    padding-bottom: ${(props) => props.theme.spacing(4)}px;
  }
`;

const Chip = styled(VektorChip)`
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 85%;
  margin-bottom: ${(props) => props.theme.spacing(4)}px;
`;

const OverviewProjectCard = ({
  title,
  description,
  chip,
  children,
}) => {
  return (
    <Card>
      <CardContent>
        <Chip label={chip} />
        <Typography variant='h6' mb={6} color='primary'>
          {title}
        </Typography>
        {
          !!description &&
          <Typography variant='h3' mb={6}>
            <Box fontWeight='fontWeightRegular'>{description}</Box>
          </Typography>
        }
        {children}
      </CardContent>
    </Card>
  );
};

export default memo(OverviewProjectCard);
