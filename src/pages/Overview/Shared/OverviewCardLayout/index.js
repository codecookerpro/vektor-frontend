import React, { memo } from 'react';
import styled from 'styled-components/macro';
import {
  Box,
  Card,
  CardContent as MuiCardContent,
  Chip as MuiChip,
  Typography as MuiTypography,
} from '@material-ui/core';
import { spacing } from '@material-ui/system';

const Typography = styled(MuiTypography)(spacing);

const CardContent = styled(MuiCardContent)`
  position: relative;

  &:last-child {
    padding-bottom: ${(props) => props.theme.spacing(4)}px;
  }
`;

const Chip = styled(MuiChip)`
  position: absolute;
  top: 16px;
  right: 16px;
  height: 20px;
  padding: 4px 0;
  font-size: 85%;
  border-radius: 10px;
  background-color: ${(props) => props.theme.custom.palette.lightGreen};
  color: ${(props) => props.theme.palette.common.white};
  margin-bottom: ${(props) => props.theme.spacing(4)}px;

  span {
    padding-left: ${(props) => props.theme.spacing(2)}px;
    padding-right: ${(props) => props.theme.spacing(2)}px;
  }
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
