import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { Badge, Grid, Avatar, Typography } from '@material-ui/core';

const Footer = styled.div`
  background-color: ${(props) => props.theme.sidebar.footer.background} !important;
  padding: ${(props) => props.theme.spacing(2.75)}px ${(props) => props.theme.spacing(4)}px;
  border-right: 1px solid rgba(0, 0, 0, 0.12);
`;

const SidebarFooterText = styled(Typography)`
  color: ${(props) => props.theme.sidebar.footer.color};
`;

const SidebarFooterSubText = styled(Typography)`
  color: ${(props) => props.theme.sidebar.footer.color};
  font-size: 0.7rem;
  display: block;
  padding: 1px;
`;

const SidebarFooterBadge = styled(Badge)`
  margin-right: ${(props) => props.theme.spacing(1)}px;
  span {
    background-color: ${(props) => props.theme.sidebar.footer.online.background};
    border: 1.5px solid ${(props) => props.theme.palette.common.white};
    height: 12px;
    width: 12px;
    border-radius: 50%;
  }
`;

const SidebarFooter = () => {
  const { currentUser } = useSelector((state) => state.auth);

  return (
    <Footer>
      <Grid container spacing={2}>
        <Grid item>
          <SidebarFooterBadge
            overlap="circle"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            variant="dot"
          >
            <Avatar alt="Lucy Lavender" src="" />
          </SidebarFooterBadge>
        </Grid>
        <Grid item>
          <SidebarFooterText variant="body2">{currentUser.email}</SidebarFooterText>
          <SidebarFooterSubText variant="caption">{currentUser.permissions}</SidebarFooterSubText>
        </Grid>
      </Grid>
    </Footer>
  );
};

export default memo(SidebarFooter);
