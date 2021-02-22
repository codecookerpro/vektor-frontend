import React, { memo } from 'react';
import styled from 'styled-components/macro';
import { NavLink } from 'react-router-dom';
import { spacing } from '@material-ui/system';
import {
  Box as MuiBox,
  ListItem,
} from '@material-ui/core';

import { ReactComponent as Logo } from 'vendor/logo.svg';

const Box = styled(MuiBox)(spacing);

const Brand = styled(ListItem)`
  font-size: ${(props) => props.theme.typography.h5.fontSize};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
  color: ${(props) => props.theme.sidebar.header.color};
  background-color: ${(props) => props.theme.sidebar.header.background};
  font-family: ${(props) => props.theme.typography.fontFamily};
  min-height: 56px;
  padding-left: ${(props) => props.theme.spacing(6)}px;
  padding-right: ${(props) => props.theme.spacing(6)}px;
  justify-content: center;
  cursor: pointer;

  ${(props) => props.theme.breakpoints.up('sm')} {
    min-height: 64px;
  }

  &:hover {
    background-color: ${(props) => props.theme.sidebar.header.background};
  }
`;

const BrandIcon = styled(Logo)`
  margin-right: ${(props) => props.theme.spacing(2)}px;
  color: ${(props) => props.theme.sidebar.header.brand.color};
  fill: ${(props) => props.theme.sidebar.header.brand.color};
  width: 32px;
  height: 32px;
`;

const SidebarHeader = () => {
  return (
    <Brand component={NavLink} to='/' button>
      <BrandIcon />{' '}
      <Box ml={1}>
        Vektor DynamixE
      </Box>
    </Brand>
  );
};

export default memo(SidebarHeader);
