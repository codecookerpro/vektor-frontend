import React, { memo } from 'react';
import styled from 'styled-components/macro';
import { ListItem } from '@material-ui/core';

import Logo from 'components/Logo';

const Brand = styled(ListItem)`
  background-color: ${(props) => props.theme.sidebar.header.background};
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

const SidebarHeader = () => {
  return (
    <Brand button>
      <Logo />
    </Brand>
  );
};

export default memo(SidebarHeader);
